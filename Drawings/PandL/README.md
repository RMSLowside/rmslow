# Pedigree and Lineage Service
The Pedigree And Lineage (P&L) service is a common component that stores a record of an objects cradle to grave ancestry.

The P&L service consists of the following components:

- The P&L service datastore
- The P&L service API
- The P&L service SDK
- The P&L service UI

# Components

## Datastore
A P&L service holds the complete lineage of an object but does not store the actual metadata. Metrics can be generated through
MySQL events as needed.

The datastore will be hosted on AWS Aurora MySQL:

- No need for capacity planning. Scales as needed. P&L will likely store billions of rows in a single table.
    - The maximum table size for a table in an Aurora database is 64 TiB
- Write heavy workflow against single table.
    - **"Our tests with SysBench on r3.8xlarge instances show that Amazon Aurora delivers over 500,000 SELECTs/sec and 100,000 UPDATEs/sec, five times higher than MySQL running the same benchmark on the same hardware."**
    - https://d1.awsstatic.com/product-marketing/Aurora/RDS_Aurora_Performance_Assessment_Benchmarking_v1-2.pdf

The following information will be stored.

```json5
{
  uuid: "Internal database unique key",
  guide: "guide The objects GUIDE.",
  clonedFromGuide: "Only used when event is OBJECT_CLONED. Links to the old objects GUIDE.",
  eventDateTime: "yyyy-MM-ddTHH:mm:ss The dateTime the event took place.",
  eventType: "A valid eventType from internal list defined in P&L.",
  eventNote: "A short description of what happened in the event. ex: Object added to RMM/Object cloned to system X/Object Deleted",
  eventCN: "The CN of the user/system that should be associated with the event.",
  eventSystemGuide: "The GUIDE of the system where the event took place.",
  locationSystemGuide: "The physical/digital location of the object.",
  cn: "CN grabbed from the API/SDK request.",
  dateTime: "yyyy-MM-ddTHH:mm:ss Datetime the API/SDK sent the request"
}
```

Valid Event Types
```
OBJECT_CREATE - new object created.
OBJECT_DELETE - object deleted/dispositioned.
OBJECT_UPDATE - object was replaced by new version. (eg PDF update)
OBJECT_CLONE - object copied into new system. Object now exists in N+1 systems (eg IDL to IMAP)
OBJECT_METADATA - metadata was associated with the object has been updated/deleted
```

## API
The P&L Service will be kept simple as possible to handle the large quantity of objects and api calls coming from 
various system integrated with it.

The P&L web service will be written in Java and hosted inside a EC2 Apache Tomcat instance. 
The endpoints below will be open to use by systems that have registered their system certificates with P&L and have been approved.


### Add Event
```
ngimws/pl/events
RequestType = POST
RequestBody = P&L POJO
```
* Create new P&L entry for an object.
* Performs the following steps:
    * Validate requesters CN
        * Make sure they are an authorized system/user
* **??Checks GUIDE for existence of object??**
* Validates eventType
    * **OBJECT_CREATE**
        * Verify no OBJECT_CREATE exists in P&L already
    * **OBJECT_DELETE**
        * Verify OBJECT_CREATE exists and verify OBJECT_DELETE not exists
    * **OBJECT_UPDATE**
        * Verify OBJECT_CREATE exists and verify OBJECT_DELETE no exists
    * **OBJECT_CLONE**
      * Verify the clonedFromGuide exists in P&L. This puts the work on the calling system/SDK to first create a OBJECT_CREATE event in the system prior to OBJECT_CLONE event.
    * **METADATA_UPDATE**
        * Any metadata associated with the object is created/update/deleted. eventNote would be used to say what happened, but no actual metadata stored in P&L.
* Verify POJO fields
* Add row to datastore
* Return code

### Get Single Event
```
ngimws/pl/event/{uuid}
RequestType = GET
PathParamter = {uuid}
```
* Get a specific event from database

### Get All Events For GUIDE
```
ngimws/pl/events
RequestType = GET
RequestParms = {guide} {dateTimeStart:optional} {dateTimeEnd:optional}
```
* Get all events for a specific object by GUIDE in an optional dateTime range.

### Get Event Graph For GUIDE
```
ngimws/pl/events/graph
RequestType = GET
RequestParms = {guide}
```
* Get events in graph format.

### Get Events For GUIDE By System(s)
```
ngimws/pl/events
RequestType = GET
RequestParms = {guide} {systemGuide(s)} {dateTimeStart:optional} {dateTimeEnd:optional}
```
* Get all events in 1-N systems for a specific object by GUIDE in an optional dateTime range.

### Register System
```
ngimws/pl/systems
RequestType = POST
RequestParms = {systemGuide} {systemName} {systemCertificate(s)}
```
* Allows systems to register on the fly with the P&L service
* Systems must register before they can be reference in the **eventSystemGuide**

### Approve System
```
ngimws/pl/systems/approve
RequestType = POST
RequestParms = {systemGuide} {comment}
```
* Approves system integration with P&L

### Reject System
```
ngimws/pl/systems/reject
RequestType = POST
RequestParms = {systemGuide} {comment}
```
* Rejects system integration with P&L

### Get Systems
```
ngimws/pl/systems
RequestType = GET
```
* Return systems and their current operation status with P&L

### Get System
```
ngimws/pl/systems
RequestType = GET
RequestParms = {systemGuide}
```
* Return single systems and their current operation status with P&L

## SDK
If integrated systems do not want to write their own code to integrate with the P&L web service API, an SDK will be made available 
for download from Artifactory and the P&L UI.

A SDK will be available for the following languages:

- Java

The SDK will have the following software framework.

- Create local P&L object. 
```java
// Create a local P&L object that can be submitted to the P&L API.
Pedigree p = new PedigreeBuilder("guide://1234-1234-1234")
        .setClonedFromGuide("optional")
        .setEventDateTime("2020-01-22T01:01:01")
        .setEventType(PedigreeEventTypes.METADATA_UPDATE)
        .setEventNote("This is an example SDK use for creating a event in the P&L service.")
        .setEventCN("CN=kimmela.places.org")
        .setEventSystemGuide("guide://1111-1111-1111")
        .setLocationSystemGuide("guide://2222-2222-2222")
        .build();
```

- Validate P&L object.
```java
// Returns all errors with the local Pedigree object. The validate method can return an empty list.
ArrayList<PedigreeError> errors = p.validate();
for(PedigreError error: errors){
    System.out.println(error.getErrorMessage());
}
```

- Create Service connector.
```java
PedigreeServiceConnector connector = new PandLServiceConnector("/path/to/jks", "aRealp4ss", "/path/to/trustjks", "anotherR34lP4ss");
```

- Send local P&L object to P&L service.
```java
PedigreeServiceResult psr = connector.sendEvent(p);
```

- Other SDK uses.
```java
// Get all events for a given GUIDE.
ArrayList<Pedigree> events = connector.getGuideEvents("guide://1234-1234-1234");

// Get single event.
Pedigree event = connector.getEvent("1111-1111-1111");

// Register System with P&L
ArrayList<String> systemCertCns = new ArrayList<String>();
systemCertCns.add("CN=dev.systems.place");
systemCertCns.add("CN=test.systems.place");
PedigreeServiceResult psr = connector.registerSystem("guide://4444-4444-4444", "System Name", systemCertCns);
```

## UI
Source draw.io here: [Draw.io Source](https://app.diagrams.net/#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FPandL%2FP%26L.drawio)

Source draw.io here: [Draw.io export](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=P%26L.drawio#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FPandL%2FP%2526L.drawio)

Example Lineage Plot:
![Example plot framework](plot.png)