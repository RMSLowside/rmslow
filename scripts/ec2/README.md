This script will setup the following software on a EC2 instances:

* Java
* Git
    * including the rmslow github project
* Apache Maven
* MySQL
* Apache Nifi
* Crontab

Currently we are running one EC2 instance in the GD AWS Account. It is on from 7am to 5pm daily. You can use
the ppk from the security bucket to login to the box.

The box is behind a public ELB found here: http://rmslow-nifi-570397140.us-east-2.elb.amazonaws.com:8080/nifi/

To setup a new box simply login to the desired box and run the following commands:
```
sudo su
aws s3 cp s3://rmslowdeployment/setupEc2.sh .
bash setupEc2.sh
```
