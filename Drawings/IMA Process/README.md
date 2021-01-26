 
# **Information Management Approval Service**

The Information Management Approval Service is a common component service that facilitates the approval of an enterprise system to create, process, store, and disposition electronic records as mandated by federal regulations.

The Information Management Approval service will consist of the following components:
- The IMA service datastore
- The IMA service API
- The IMA service UI

## **Components**

   Datastore

The IMA service datastore holds:
* system name
* A&A number
* system POCs
* system email address
* directorate
* ISSM
* workflow step
* current status
* previous workflow step status 
* assignee
* workflow step start/stop time
* review type
* questionnaire responses
* PII details
* Record schedule(s)

Metrics are generated is real-time using MySQL SELECT statements.

The datastore will be hosted on AWS RDS MySQL:
* IMA will likely store thousands of rows in a single table, so a general-purpose AWS EC2 server is sufficient for hosting.

The following information will be stored.


## **API**

The IMA Service currently interacts with the enterprise authentication service, Records Control Schedule service.  Future development will extend the API to the Rules Engine service, and the System X/Green system.

The IMA web service will be written in Java and hosted inside a EC2 Apache Tomcat instance. Endpoint access is granted to systems that have been authorized and system certificates registered.  
Endpoints are listed below:


## **UI**
Source draw.io here: Draw.io Source
View Only draw.io here: Draw.io export

## Drawings
- Dashboard draw.io
here: [Draw.io Source](https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FIMA%20Process%2FIMA%20Process.drawio)



