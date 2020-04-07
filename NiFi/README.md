# Useful documentation
* https://guides.github.com/features/mastering-markdown/
* https://nifi.apache.org/

# Running NiFi locally
1. Download NiFi 1.11.4 binary release from: http://apache.mirrors.hoobly.com/nifi/1.11.4/nifi-1.11.4-bin.tar.gz
2. Untar the file to a location of your choice.
3. Add JAVA_HOME environment variable to your box.
4. Go to the /nifi-1.11.4/bin directory and start NiFi (On windows run the run-nifi.bat).
5. Go to http://localhost:8080/nifi/ to view the local running NiFi server.

# Building This Project
1. Download maven from https://maven.apache.org/download.cgi
2. Extract maven to a location of your choosing on your system and add that location to your PATH variable.
3. From the top level directory of this project perform a "mvn clean install"
4. Take the generated nar file from /rms-custom-nar/target/ and put it into your local NiFi server under /lib/

# Configuring NiFi for your system
The "flow" that you see through the UI is coming from the flow.xml.gz located in the /conf directory of your local NiFi installation. 
To start using the one I have created take the file from /flows directory and place it in your local NiFi server and then start it.

We have the ability to reuse and inject these flows with properties prior to deploying them like we do with our other services if that is a path
we want to take. For example we could have separate flows by network/environment or use the same one and just update the variables before deploying.

Most of the relevant configuration for NiFi can be found in either
* /conf/bootstrap.xml
    * Allocate memory
    * Define keys
* /conf/nifi.properties
    * Setup backups of the "flow"
    * Configuration for internal NiFi things
* /conf/bootstrap-notification-services.xml
    * Send email or other notifications on NiFi start/stop for monitoring.
    
# General ideas
1. Nifi has internal queues for managing workflow and state. Since we live in the AWS world we need to determine a way to ensure that either we maintain a box 
so NiFi can manage everything during shutdown/restart of the physical box OR use SQS to store/save documents at "important" moments. 
    * We should work with our "sister" teams who are already using NiFi and see how they manage this internally as they may have other solutions. 
    * By default NiFi uses a local Zookeeper to manage state but we could think about setting up a external persistent Zookeeper server to protect against data
     lose.
    * We could backup the "Snapshot" to S3 periodically and load from it if a server crashes.
2. NiFi supports user authentication via client certificates, via username/password and LDAP. I think we would at a minimum make the UI use HTTPS using our 
certificates and then integrate with LDAP if we can to only allow certain users in.
3. We can give roles based on certificate internally in NiFi. This would allow us to separate the duties, for example maybe Testers only have the power to 
view the UI while DEVS/Sys Admins could start/stop processors.
4. Encrypted Passwords in Configuration Files. In order to facilitate the secure setup of NiFi, you can use the encrypt-config command line utility to encrypt 
raw configuration values that NiFi decrypts in memory on startup. 
5. Nifi allows clustering...if we need that much processing power. At this point I dont think we would.
6. NiFi keeps a very granular level of detail about each piece of data that it ingests. As the data is processed through the system and is transformed, routed, 
split, aggregated, and distributed to other endpoints, this information is all stored within NiFi’s Provenance Repository. 
    * **This is a huge auditing/security win**
7. NiFi has a built in Drools rules engine processor. We would run the Drools UI that would allow people to manage the rules and then export them as a zip to be 
used inside on the NiFi Processor.
    * https://dzone.com/articles/apache-nifi-with-rule-engine
    * https://datamelt.weebly.com/blog/nifi-processor-ruleengine
    
# Processors
* NiFi comes out of the box with tons of available processors to use. A list can be found in /nifi-1.11.4/docs/html/getting-started.html#what-processors-are-available
* On top of what NiFi provides we can write custom processors to add to our Flows or extend what is already available.

# Reworking manage in place & rules engine
__*__ = This is a built in NiFi processor or we can rewrite for more control.

1. Processor(s) to read from various SQS*
2. Processor that creates standard RulesProcessor message from a source message by downloading the main message of the SQS message.
3. Processor that either CALLS the RulesEngine WS for a rules decision **OR** uses Drools internally in NiFi to makes rules decisions
    * https://github.com/alefbt/NiFi-Rule-engine-processor/blob/master/nifi-ruleengien-processor-processors/src/main/java/com/matrixbi/nifi/processor/RuleEngineProcessor.java
4. Processor that takes rules output and routes to 1-n different processors*
5. Processor that adds record to a MySQL table*
6. Processor that adds original message to Dynamo table*
7. Cron processor that sends SNS for disposition (Not sure we would need this in NiFi unless we want to build some type of workflow for disposition)
8. Processor to handle responses from customers about where they disposition documents. (If they did write to database, if they didnt send notification to management) 

# Best Practices
* Move the default location of the following properties OUT of the NiFi directory and give it its **OWN** high I/O disk.
    * nifi.flowfile.repository.directory
    * nifi.content.repository.directory.default
    * nifi.provenance.repository.directory.default
* Increase the initial and maximum heap memory allocations to at least 4GB but better at 8GB.
    * java.arg.2=-Xms8g
    * java.arg.3=-Xmx8g
* Some improvemnnts when running NiFi with Java 8 (Which we would).
    * java.arg.7=-XX:ReservedCodeCacheSize=256m
    * java.arg.8=-XX:CodeCacheMinimumFreeSpace=10m
    * java.arg.9=-XX:+UseCodeCacheFlushing
* Backup all configuration files periodically
* Do not have any processors at the root level of the UI. Instead make process groups to organize the flow better.

# Connecting to AWS resources
We can simply use a IAM credentials on a EC2 box to give our processor access to various AWS resources. Each Processing group can add
"Controller Services", the one we are interested in is called "AWSCredentialsProviderControllerService" and it supports multiple forms of
 authentication into AWS.