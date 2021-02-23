# Rules Engine

The Rules Engine is a key component in the suite of records management applications that supports the DLMD tenet for managing records in place.  It allows Data Management Officers to create, test, and execute rules to apply the appropriate records retention schedule on records; as well as comply with federal regulations for records dispositon.

## **Components**
### Datastore

##### Rule

```json5
{
  uuid: "internal unique key",
  name: "name of the rule",
  system: "name of the system",
  description: "description of the rule",
  conditions: "conditions applied to the rule",
  status: "status of the rules: active, draft, pending",
  priority: "priority order of the rule"
}
```


##### Rule History

```json5
{
  uuid: "primary key",
  ruleId: "foreign key to rule table"
  date: "date of action",
  action: "created, approved, reviewed, archived",
  reviewer: "name of the user that reviewed the rule"
}
```

##### Rule Matches

```json5
{
  uuid: "primary key",
  ruleId: "foreign key to rule table",
  guideId: "guide id for matched system",
  date: "date of rule match"
}
```

## **API**

### Get Rules
```
ngimws/rules
RequestType = GET
ResponseType = Rule[]
```
* Gets all rules

### Get Rules Filtered
```
ngimws/rules/{query}
RequestType = GET
RequestParms = {query}
ResponseType = Rule[]
```
* Gets rules by facet

### Get Rules By System
```
ngimws/rules/{sysmtemId}
RequestType = GET
RequestParms = {systemId}
ResponseType = Rule[]
```
* Gets rules for selected system

### Get Rule by Id
```
ngimws/rules/{ruleId}
RequestType = GET
RequestParms = {ruleId}
ResponseType = Rule
```
* Gets rule detail

### Get Rule History
```
ngimws/rules/history/{ruleId}
RequestType = GET
RequestParms = {ruleId}{dateRange}
ResponseType = Json
```
* Get rule history for selected rule for the date range, default date range to 30 days

### Get Recent Match
```
ngimws/rules/match/{ruleId}
RequestType = GET
RequestParms = {ruleId}{count}
ResponseType = Json
```
* Returns list of x number of recent matches

### Create Rule
```
ngimws/rules/match/create
RequestType = POST
RequestBody = Rule{}
ResponseType = Rule
```

* Create a new rule

### Archive Rule
```
ngimws/rules/archive
RequestType = POST
RequestParms = {ruleId}
ResponseType = boolean (success / fail)
```
* Archive rule

### Approve Rule
```
ngimws/rules/approve
RequestType = POST
RequestParms = {ruleId}
ResponseType = Rule
```
* Approve rule


## SDK

## **UI**

## Drawings

Dashboard draw.io here: [draw.io here](https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FRulesEngine%2FRulesEngine.drawio)

View Only draw.io here:



## **Software Development Requirements**



### Who: IMS TD



### What:
Provide the business the ability to implement one or more rules against production data and take a defined action based on the rule outcome.  Users need the ability to draft rule and test these rules without impacting live production data.   
Some examples include:  
•	Records that match certain metadata and receive a defined records control schedule.  
•	Records coming from System Y are ignored
•	Records with this attribute are transferred to specific repository.  

### Why:
This will allow the business to automate the business process reducing the burden on the end users.  This automation is key to managing the scale of data in the various systems.


### Acceptance Criteria:

1.  As a DMO, I can create/edit/archives rule(s) for individual systems, including a system default rule and custom rules.
2.  As a DMO, I am presented with several options for rule conditions and actions.
3.  As a DMO, I can create/edit/delete/test rules in draft mode.
4.  As a DMO Manager, I can review and approve or deny a rule prior to records processing.
5.  As a DMO, I can test rules for matching accuracy.
6.  As a DMO, I can prioritize rules for each system.
7.  As a DMO, I can verify records have been tagged with the appropriate record control schedule.
8.  As a DMO, I can view various metrics regarding rules.
