# Rules Engine

The Rules Engine is a key component in the suite of records management applications that supports the DLMD tenet for managing records in place.  It allows Data Management Officers to create, test, and execute rules to apply the appropriate records retention schedule on records; as well as comply with federal regulations for records dispositon.

## **Components**

  

## **API**



## **UI**




## Drawings

[Source draw.io here:]https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FRulesEngine%2FRulesEngine.drawio

View Only draw.io here:



## **Software Development Requirements**



### Who: IMS TD



### What:
Provide the business the ability to implement one or more rules against production data and take a defined action based on the rule outcome.  
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
