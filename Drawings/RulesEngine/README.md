# Rules Engine

The Rules Engine is a key component in the suite of records management applications that supports the DLMD tenet for managing records in place.  It allows Data Management Officers to create, test, and execute rules to apply the appropriate records retention schedule on records; as well as comply with federal regulations for records dispositon.

## **Components**
### Datastore

##### Rule

```json5
{
  uuid: "unique key",
  name: "rule name",
  system: "",
  conditions: "",
  action: "",
  status: ""
}
```


##### Rule History

```json5
{
  uuid: "primary key tied to rules table",
  date: "date of action",
  action: "created, approved, reviewed, archived",
  reviewer: "name of the person that reviewed the rule"  
}
```

##### Rule Matches

```json5
{
  uuid: "primary key tied to rules table",
  guideId: "guide id for matched system",
  date: "date of rule match"
}
```

## **API**

### Get Rules
```
ngimws/rules
RequestType = GET
```
* Gets all rules

### Get Rules By Filter
```
ngimws/rules/{query}
RequestType = GET
RequestParms = {query}
```
* Gets rules by filter

### Get Rules By System
```
ngimws/rules/{sysmtemId}
RequestType = GET
RequestParms = {sysmtemId}
```
* Gets rules for selected system

### Get Rule
```
ngimws/rules/{ruleId}
RequestType = GET
RequestParms = {ruleId}
```
* Gets rule detail

### Get Rule History
```
ngimws/rules/history/{ruleId}
RequestType = GET
RequestParms = {ruleId}
```
* Get 30 day rule history for selected rule.

### Get Recent Match
```
ngimws/rules/match/{ruleId}
RequestType = GET
RequestParms = {ruleId}
```
* Returns list of recent match rules

### Archive Rule
```
ngimws/rules/archive
RequestType = POST
RequestParms = {ruleId}
```
* Archive rule

### Approve Rule
```
ngimws/rules/approve
RequestType = POST
RequestParms = {ruleId}
```
* Approve rule


## SDK

## **UI**




## Drawings

[Source draw.io here:]https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FRulesEngine%2FRulesEngine.drawio

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
