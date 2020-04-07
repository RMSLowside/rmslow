#!/bin/bash

sudo yum update

cd /
rm -rf rms
mkdir rms

pushd rms

# Install Java
aws s3 cp s3://rmslowdeployment/software/jdk-8u241-linux-x64.tar.gz .
tar -xzvf jdk-8u241-linux-x64.tar.gz
rm jdk-8u241-linux-x64.tar.gz
mv jdk1.8.0_241 java
echo "export JAVA_HOME=/rms/java" >> ~/.bashrc
echo "export JRE_HOME=/rms/java/jre" >> ~/.bashrc
echo "export PATH=/rms/java/bin:$PATH" >> ~/.bashrc
source ~/.bashrc

# Install Git and checkout project
yum -y install git
git clone https://github.com/RMSLowside/rmslow.git

# Install Maven
wget https://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo
sed -i s/\$releasever/6/g /etc/yum.repos.d/epel-apache-maven.repo
yum install -y apache-maven

# Install NiFi
aws s3 cp s3://rmslowdeployment/software/nifi-1.11.4-bin.tar.gz .
tar -xzvf nifi-1.11.4-bin.tar.gz
rm nifi-1.11.4-bin.tar.gz
mv nifi-1.11.4 nifi
sed -i 's/-Xms512m/-Xms2048m/g' nifi/conf/bootstrap.conf
sed -i 's/-Xmx512m/-Xmx2048m/g' nifi/conf/bootstrap.conf
cp rmslow/NiFi/flows/flow.xml.gz nifi/conf/flow.xml.gz
pushd rmslow/NiFi
mvn clean install
cp rms-custom-nar/target/rms-custom-processors-nar-1.0-SNAPSHOT.nar nifi/lib/rms-custom-processors-nar-1.0-SNAPSHOT.nar
popd
bash nifi/bin/nifi.sh start

# Install MySQL
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
rpm -ivh mysql-community-release-el7-5.noarch.rpm
yum -y update
yum -y install mysql-server
systemctl start mysqld
rm -rf mysql-community-release-el7-5.noarch.rpm

# Setup Crontab
crontab -l > mycron
echo "*/10 * * * * aws s3 cp /rms/nifi/conf/flow.xml.gz s3://rmslowdeployment/flow.xml.gz" >> mycron
crontab mycron
rm mycron

popd
