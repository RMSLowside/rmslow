This script will setup the following software on a EC2 instances:

* MySQL
* Apache Nifi
* Crontab (start/stop instance)

Currently we are running one EC2 instance in the GD AWS Account. Its Public IP is **18.221.167.233** and you can use
the ppk from the security bucket to login to the box.

To setup a new box simply login to the desired box and run the following commands:
```
sudo su
aws s3 cp s3://rmslowdeployment/setupEc2.sh .
bash setupEc2.sh
```
