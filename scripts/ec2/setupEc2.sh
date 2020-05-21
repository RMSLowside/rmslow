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
sleep 10
git clone https://github.com/RMSLowside/rmslow.git
sleep 10
git clone https://github.com/RMSLowside/versioned_flows.git

# Install Maven
wget https://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo
sed -i s/\$releasever/6/g /etc/yum.repos.d/epel-apache-maven.repo
yum install -y apache-maven

# Set all environment variables for NiFi
echo "export PRIMARY_QUEUE=https://sqs.us-east-2.amazonaws.com/055276781719/fake-outside-queue" >> ~/.bashrc
echo "export SECONDARY_QUEUE=https://sqs.us-east-2.amazonaws.com/055276781719/records-ingest-queue" >> ~/.bashrc
echo "export ORIGINAL_RECORDS_TABLE_NAME=records-original-message" >> ~/.bashrc
source ~/.bashrc

# Install NiFi Registry
aws s3 cp s3://rmslowdeployment/software/nifi-registry-0.6.0.tar.gz .
tar -xzvf nifi-registry-0.6.0.tar.gz
rm nifi-registry-0.6.0.tar.gz
mv nifi-registry-0.6.0 nifi-registry
bash nifi-registry/bin/nifi-registry.sh start

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
cp rms-custom-nar/target/rms-custom-processors-nar-1.0-SNAPSHOT.nar /rms/nifi/lib/rms-custom-processors-nar-1.0-SNAPSHOT.nar
popd
mkdir /rms/nifi-input
cp -r nifi nifi2
sed -i 's/nifi.web.http.port=8080/nifi.web.http.port=9090/g' nifi2/conf/nifi.properties
sed -i 's/nifi.remote.input.host=/nifi.remote.input.host=localhost/g' nifi2/conf/nifi.properties
sed -i 's/nifi.remote.input.socket.port=/nifi.remote.input.socket.port=10000/g' nifi2/conf/nifi.properties
sed -i 's/nifi.remote.input.http.enabled=false/nifi.remote.input.http.enabled=true/g' nifi2/conf/nifi.properties
cp rmslow/NiFi/flows/flow2.xml.gz nifi2/conf/flow.xml.gz
bash nifi2/bin/nifi.sh start
sleep 10
bash nifi/bin/nifi.sh start

# Install MySQL
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
rpm -ivh mysql-community-release-el7-5.noarch.rpm
yum -y update
yum -y install mysql-server
systemctl start mysqld
rm -rf mysql-community-release-el7-5.noarch.rpm

pushd rmslow/liquibase
mvn clean install

popd
popd

# Setup Crontab
cd /rms
crontab -l > mycron
echo "*/10 * * * * aws s3 cp /rms/nifi/conf/flow.xml.gz s3://rmslowdeployment/flow.xml.gz" >> mycron
echo "*/10 * * * * aws s3 cp /rms/nifi2/conf/flow.xml.gz s3://rmslowdeployment/flow2.xml.gz" >> mycron
echo "0 * * * * mysql -u root -e 'use rmm; call populate_record_metrics();'" >> mycron
echo "1 * * * * mysql -u root -e 'use rmm; call populate_record_system_metrics();'" >> mycron
echo "2 * * * * mysql -u root -e 'use rmm; call populate_rcs_metrics();'" >> mycron
echo "3 * * * * mysql -u root -e 'use rmm; call populate_upcoming_dispositions_30_days();'" >> mycron
echo "4 * * * * mysql -u root -e 'use rmm; call populate_upcoming_dispositions_90_days();'" >> mycron
echo "5 * * * * mysql -u root -e 'use rmm; call populate_past_due_dispositions();'" >> mycron
crontab mycron
rm mycron

echo "Script done"
