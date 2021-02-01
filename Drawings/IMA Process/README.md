 
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

The datastore will be hosted on AWS RDS MySQL. IMA will likely store thousands of rows in a single table, so a general-purpose AWS EC2 server is sufficient for hosting.

The following information will be stored.


## **API**

The IMA Service currently interacts with the enterprise authentication service, and the Records Control Schedule service.  Future development will extend the API to the Rules Engine service, and the System X/Green system.

The IMA web service is written in Java and hosted inside a EC2 Apache Tomcat instance. Endpoint access is granted to systems that have been authorized and system certificates registered.  

Endpoints are listed below:


## **UI**
Source draw.io here: Draw.io Source

View Only draw.io here: Draw.io export




## Drawings
- Dashboard draw.io
here: [Draw.io Source](https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FIMA%20Process%2FIMA%20Process.drawio)




## **Software Development Requirements**


## Who: 
DLMD Data Management SME


## What:
A new knowledgebase that will:
1. Phase I
   -	Centralize the coordination of IMA approvals between mission partner systems and DMOs
   -	Enable the capture and storage of mission partner system details, IMA requirement responses, and workflow details.
   -	Integration with the Records Control Schedule service
   -	Integration with the Enterprise Authentication service
   -	Basic metrics relating to the IMA process

2. Phase II
   - Enable mission partner systems the ability to view and edit responses
  
  
3. Phase III
   - Provide export of requirement responses in an acceptable format for import into System X.
  
  
4. Phase IV
   - Full integration between IMA and System X to send/receive data; including notification when a new system is added.

## Why: 

Currently the IMA process relies on a series of tools, applications, and files.  Information is exchanged via email, instant messenger, and other platforms.  Information is manually imported into enterprise tools where the DMOs have little oversite on.  Centralizing the IMA process into once interface for the DMOs where they are better able to map their inputs to the overall IMA process eliminates a number hurdles.  Additionally by eliminating the use of MS Excel spreadsheets and the overall manual process of coordination of tasks between DMOs and mission partner systems during system accreditation will only speed up the process.  Having the embedded metrics provides data lifecycle leadership with critical decision making capabilities.  



## Acceptance Criteria:

Phase I
   1. A centralized view of enterprise systems, their workflow step and status; and assigned DMO
   2.	A workflow of tasks, assigned POCs, and statuses has been established.
   3. IMA is integrated with the Records Control Schedule service to enable the assignment of active record schedule(s)
   4. DMOs can Create/Read/Update/Delete system and IMO review details.
   5. Various business metrics are available in a dashboard view or seperate tab. 
   6. Role based access control for data management officers is established.
   
Phase II
   1. Role based access control for mission system partners is established. 
   2. Mission System Partners can Create/Read/Update on requirement responses.
   
Phase III
   1. Requirements responses can be exported into a format that is acceptable by System X.


Phase IV
   1. The IMA Tool can send/receive data from System X including the notification of a newly added system.

