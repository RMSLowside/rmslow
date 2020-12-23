# Pedigree and Lineage Service
The Pedigree And Lineage (P&L) service is a common component that stores a record of an objects cradle to grave ancestry.

The P&L service consists of the following components:

- The P&L service datastore
- The P&L service API
- The P&L service SDK
- The P&L service UI

#Components
## Datastore
A P&L service holds the complete lineage of an object but does not store the actual metadata. The datastore hosted on **TBD**
will hold the following information...

```json5
{
  guide: "guide",
  clonedGuide: "Only used when event is OBJECT_CLONED. Links to new objects GUIDE",
  eventDateTime: "yyyy-MM-ddTHH:mm:ss The dateTime the event took place",
  eventType: "A valid eventType from internal list defined in P&L",
  eventNote: "A short description of what happened in the event. ex: Object added to RMM/Object downloaded/Object Deleted",
  eventCN: "The CN of the user/system that should be associated with the event.",
  eventSystemGuide: "THe GUIDE of the system where the event took place.",
  eventReferenceMetadataUrl: "Optional URL provided by System that can be called for metadata about the event",
  cn: "CN grabbed from the API/SDK request.",
  dateTime: "yyyy-MM-ddTHH:mm:ss Datetime the API/SDK sent the request"
}
```

Valid Event Types
```
OBJECT_CREATE
OBJECT_DELETE
OBJECT_UPDATE
OBJECT_CLONE
METADATA_ADD
METADATA_UPDATE
METADATA_DELETE
LOCATION_UPDATE
```

## API
The P&L Service will be kept simple as possible to handle the large quantity of objects and api calls coming from 
various system integrated with it.

#### Add event
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
      * Verify the clonedGuide exists in P&L. This puts the work on the calling system/SDK to first create a OBJECT_CREATE event in the system prior to OBJECT_CLONE event.
    * **METADATA_ADD**
* Verify POJO fields
* Add row to datastore
* Return code

#### Register system
```
ngimws/pl/systems
RequestType = POST
RequestParms = {systemGuide} {systemName} {systemCertificate(s)}
```
* Allows systems to register on the fly with the P&L service
* Systems must register before they can be reference in the **eventSystemGuide**

## SDK

## UI
Reference draw.io here: [Draw.io](https://github.com/RMSLowside/rmslow/blob/master/Drawings/PandL/P%26L.drawio)




