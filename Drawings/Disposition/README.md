# Disposition

The Disposition Service is a common component that enables a central location to manage all customer records, and their
life cycles.

The disposition service is tightly coupled with the Holds Service, that would be called prior to every disposition
decision to ensure a record is not to be deleted.

The Disposition Service relies solely on RMM for disposition dates and additional information on the objects being sent for
disposition.

The Disposition service consists of the following components:

- The Disposition service datastore
- The Disposition service API
- The Disposition service SDK
- The Disposition service UI

# Components

## Datastore

The Disposition service contains multiple tables hosted on AWS Aurora MySQL. The disposition services relies on RMM as the
authoritative source of records in the customer space. RMM currently generates tables nightly that contain upcoming and past
due dispositions, the Disposition service would simply use those tables to determine which documents need work on a given time frame.

The following information will be stored.

#### systems

The systems table contains all unique guides that are registered in RMM and the endpoint that they receive disposition messages on.

```json5
{
  cn: "The system unique CN",
  sqsEndpoint: "The SQS endpoint to send disposition messages to for this system."
}
```

#### dispositions

The dispositions table contains all information regarding the status of a documents' disposition. (This may just live on the
RMM record, we will have to see if its worthwhile storing this information not in RMM itself.)

```json5
{
  guide: "Internal UUID for notification event",
  notifiedDate: "The date we sent the disposition message to the system.",
  actionDate: "The date we received acknowledgement that the system did something with the record",
  actionType: "DELETED/NOT DELETED/NOT FOUND/ETC",
  acknowledgeResponse : "A custom message the system can set to give more detials about the actionType"
}
```

## API
The Disposition web service will be written in Java and hosted inside a EC2 Apache Tomcat instance.

### Get Disposition information
```
ngimws/dispositions/object
RequestType = GET
RequestParms = {guide}
```
* Gets all disposition information for a given GUIDE. This may include some RMM data as well.

### Get Dispositions by System
```
ngimws/dispositions/systemObjects
RequestType = GET
RequestParms = {systemGuide} {days 90/60/30/0}
```
* Get all documents upcoming for disposition in a system. Or get all documents past due for disposition using 0.

## SDK
If integrated systems do not want to write their own code to integrate with the Disposition web service API, an SDK will be made available
for download from Artifactory and the Disposition Service UI.

A SDK will be available for the following languages:

- Java

The SDK will have the following software framework.

- Create local Disposition object.
```java
// Create a local Disposition object that can be submitted to the Disposition service official SQS.
Disposition d = new DispositionBuilder()
        .setGuide("guide://1234-1234-1234")
        .setActionType(DispositionResponseTypes.DELETED)
        .setAcknowledgeResponse("Object has purged from data lake")
        .build();
```

- Validate Disposition object.
```java
// Returns all errors with the local Disposition object. The validate method can return an empty list.
ArrayList<DispositionError> errors = d.validate();
for(DispositionError error: errors){
    System.out.println(error.getErrorMessage());
}
```

- Send local Disposition object to Disposition service SQS.
```java
DispositionServiceResult dsr = d.sendToQueue();
```

- Other SDK uses.
```java
// Create Service connector.
DispositionServiceConnector connector = new DispositionServiceConnector("/path/to/jks", "aRealp4ss", "/path/to/trustjks", "anotherR34lP4ss");

// Get single disposition.
Disposition disposition = connector.getDisposition("guide://1234-1234-1234");

// Get all dispositions for system.
ArrayList<Disposition> dispositionList = connector.getDispositionsForSystem("systemGuide", DispositionRangeType.OVERDUE);
```

## UI
- To edit diagram: [Draw.io Source](https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FDisposition%2FDisposition.drawio)
