#!/bin/bash

cd /
rm -rf /rms/
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

# Install NiFi
aws s3 cp s3://rmslowdeployment/software/nifi-1.11.4-bin.tar.gz .
tar -xzvf nifi-1.11.4-bin.tar.gz
rm nifi-1.11.4-bin.tar.gz
mv nifi-1.11.4 nifi
sed -i 's/-Xms512m/-Xms2048m/g' nifi/conf/bootstrap.conf
sed -i 's/-Xmx512m/-Xmx2048m/g' nifi/conf/bootstrap.conf
aws s3 cp s3://rmslowdeployment/nifi/flow.xml.gz nifi/conf/flow.xml.gz
aws s3 cp s3://rmslowdeployment/nifi/rms-custom-processors-nar-1.0-SNAPSHOT.nar nifi/lib/rms-custom-processors-nar-1.0-SNAPSHOT.nar
bash nifi/bin/nifi.sh start

# Install MySQL or Run on RDS?
#aws s3 cp s3://rmslowdeployment/software/mysql-5.7.29-linux-glibc2.12-x86_64.tar.gz .
#tar -xzvf mysql-5.7.29-linux-glibc2.12-x86_64.tar.gz
#rm mysql-5.7.29-linux-glibc2.12-x86_64.tar.gz
#mv mysql-5.7.29-linux-glibc2.12-x86_64 mysql

popd
