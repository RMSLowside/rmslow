# Holds

This is a mechanism for allowing a user to place a hold on one or more documents at a time.

# Holds Components

- Holds UI
- Hold datastore
- Hold service

## Holds UI
- Dashboard draw.io
here: [Draw.io Source](https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FHolds%2FHolds.drawio)

## Assumptions

Implementation of this system is based on a few key assumptions in order for this to work:

1. Every document must be registered with Guide, since we track based on guide #.
2. Systems that deal with documents with holds will always call us to check a document's hold status before attempting to update or delete said document.
3. (A sort of follow-up to #2) Every system that has a held document has to be able to access our system, to do the check described above.

If we start small, with systems that we know satisfy these assumptions, it'll be fine. But the more systems this holds structure is meant to manage, the more important this set of assumptions becomes.

## Hold Store

The Hold service stores the hold information tied to a record. Think of a hold as a dataset, except that instead of noting on the record what dataset it belongs to, we instead note on the dataset (the hold) what records belong to it.

The following information represents a single Hold:

#### Metadata
```json5
{
  system: "",
  notes: "long-form description of systems searched against, queries used, etc.",
  holdCaseNumber: "",
  holdRequestingOrg: "",
  holdJustification: "",
  holdSupervisor: ""
}
```

We wouldn't actually run the queries listed here ourselves; it would be on the user to run those queries and select which documents are on hold.

As for what is stored in the actual database, there are two tables: one that stores the hold case information, then another lookup table for the documents.

### Hold Case table record:
```
  id
  case_number
  system_name
  notes
  requesting_org
  justification
  supervisor
```

### Document Lookup table record:
```
  hold_id (FK)
  doc_guide
```

## Eva Hold API
The Hold web service will be written in Java and hosted inside a EC2 Apache Tomcat instance.
The endpoints below will be open to use by systems that have registered their system certificates with the Hold service.

### Add Hold
```
ngimws/hold
RequestType = POST
RequestBody = Hold POJO
ResponseType = Hold POJO
```
* Adds hold for a record
* Returns record added (to be opened)

### Get Hold by Guide
```
ngimws/hold/{guide}
RequestType = GET
PathParamter = {guide}
ResponseType = Hold POJO
```
* Get a specific hold from the database

### Update Hold by Guide
```
ngimws/hold/{guide}
RequestType = UPDATE
RequestBody = Hold POJO
ResponseType = Hold POJO
```
* Updates a existing hold
* Returns updated hold

### Delete Hold by Guide
```
ngimws/hold/{guide}
RequestType = DELETE
ResponseType = Response wrapper with status 200/500/etc
```
* Deletes hold from DB
* Removes all holds from lookup table associated with that hold

### Get Documents by Hold
```
ngimws/hold/docs/{guide}
RequestType = GET
PathParamter = {guide}
ResponseType = ArrayList<File Pojo>
```
* Get a list of documents pretaining to a particular hold

### Update Document Holds
```
ngimws/hold/docs/{guide}
RequestType = UPDATE
PathParamter = {guide}
RequestBody = ArrayList<String> (of document guides)
ResponseType = ArrayList<File Pojo>
```
* Add list of documents with associated hold to the lookup table

### Search Holds
```
ngimws/hold/search
RequestType = GET
PathParameter = {query}
ResponseType = ArrayList<Hold POJO>
```
* returns set of holds based on query

## Drawings
- Dashboard draw.io
here: [Draw.io Source](https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FHolds%2FHolds.drawio)


## **Software Development Requirements**



## Who:
Data Lifecycle Personnel 


## What:
Provide a service to apply and track a document hold in compliance with business or legal directives.  

1. Build a user interface:
  - that provides notification that responsive documents require a hold.
  - allows a search by GUIDE,  applies a ‘Hold’ flag, and other details such as hold expiration date to individual objects.
  - allows a search by GUIDE, removes the ‘Hold’ flag, and other details.
  
2. Build a service that updates the Records Management Metadata service:
  - To apply or remove holds from specific object(s). 
  - Provide a notification to the source system of the hold or hold removal, and other pertinent details.
  - Allow the source system to check hold status if an update/delete is attempted on the object.
  - Provide role based access control for hold assignment/removal.
  
3. Store the hold or hold removal and acknowledgement from the source system in Records Management Metadata.
4. In Production



## Why: 
Documents are subject to a variety of holds stemming from FOIA cases to legal action.  Documents subject to these holds should not be edited, deleted, or transferred while the hold applies to the objects.  The Data Lifecycle personnel needs to be able to ensure documents responsive to a hold are not altered.  


## Acceptance Criteria:

1.  A user interface:
    - that provides notification of responsive documents requiring a hold
    - that allows a search by GUIDE
    - that applies or removes hold to object(s) in Records Management Metadata
2. Successful notification to a source system with objects to be held, other details and their acknowledgement.
3. Details of the hold stored in Records Management Metadata.
3. Successful demonstration that an object cannot be updated or deleted when a hold has been applied.
4. Role based access control established
5. Successful functional and regression testing
6. Deployed to Production


