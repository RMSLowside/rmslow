# User Preference Service

The User Preferences Service will capture and store user preferences that would persist between sessions.  The service will allow users to manage personal preferences to tailor their working environment for an optimal application experience.  

## To Solve
User prefs is supposed to be a micro service that would support all apps.
- We need to define how we add a new service (particularly for non-RMS managed services)
- How those new features get onto the prefs UI.  Can the UI be built dynamically from a table or ______???
- Define standards for things like dark theme, rows on a table, etc.  



## **Components**
## Datastore
The following information will be stored.

### Preferences

Using object structure without arrays:
```json5
  userId: "unique user id",
  preferences: "{
    iServices: {
      scgr: {
        gridColumns: "title, description,....",
        pageSize: "15",
        ...
      },
      rcs:{
        gridColumns: "title, description,....",
        pageSize: "15",
        ...
      },
      eva: {
       prefKey: 'prefValue',
       ...
      },
      theme: "dark",
      ...  
    },
    system3: {...},
    systemX: {...},
    ...,
    global:{
      communication: "email"
    }
  }"
```

## Assumptions

* The service should not care what system is sending/getting preferences
* As long as it is coming from the correct user it should not matter if system3 tries to update iServices.scgr.pageSize
* For phase one we will have a proxy, application UI talks to application service, which talks to the user prefs service
* We are not validating a user exists more than does an id match a regex
* No special characters in prefences. camelCase keys at all levels

## API

### Get preferences for user
```
ngimws/preference/{userId}/{node}/{depth}
RequestType = GET
PathParamter = {userId}
```
* get list of all preferences
* Node is defaulted to 'root'
* If root is passed without a depth you will get all preferences
* If "iServices" is passed as node you would return the nodes starting at Iservices
* If "iServices.scgr" is passed as node, you will get all nodes starting at scgr
* If a node that does not exist is passed "iServices.scgr.testthing.anybodyHome" null would be returned. It would be up to the application to manage it's own defaults

#### Error Codes:
```
404 (Not Found) : A user with the given userId was not found OR user is null
```

### Update Preference for user
```
ngimws/preference/{userId}
RequestType = POST
PathParamter = {userId}
RequestBody = preference JSON
```
* update preference
* Example /pref/123456
* RequestBody: {node: "iServices.scgr.pageSize", value:"15"}
* This would create the node and any needed above so if nothing existed for the user they would have this block
```json5
  userId: "unique user id",
  preferences: "{
    iServices: {
      scgr: {
        pageSize: "15"
      }
    }
  }"
```

#### Error Codes:
```
403 (Forbidden) : node is null, cannot update root node
404 (Not Found) : A user with the given userId was not found
```

### delete Preference for user
```
ngimws/preference/{userId}
RequestType = DELETE
PathParamter = {userId}
RequestBody = preference JSON
```
* delete preference
* Example /pref/123456
* RequestBody: iServices.scgr
* Would delete everything under the scgr block for the user
* If preference doesn't exist, returns successfully with a message that says "This pref does not exist for this user"
* If user doesn't exist, returns an error

#### Error Codes:
```
400 (Bad Request) : node does not exist for this user's preferences
403 (Forbidden) : node is null, cannot delete root node
404 (Not Found) : A user with the given userId was not found OR user is null
```

## SDK
- Create local user preference object.
```java
// Create a local Notification object that can be submitted to the user preference API.

//Create
Preference n = new PreferenceBuilder()
        .setUserId("####")
        .setPreference("prefKey")
        .setValue("value")
        .build();

//Delete
Preference n = new PreferenceBuilder()
        .setUserId("####")
        .setPreference("prefKey")
        .delete()
        .build();
```

## **UI**

## Drawings

Source draw.io: [here](https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FMicroservices%2FUserPreferences%2FUser%20Preference.drawio)

## **Software Development Requirements**



### Who: IMS TD



### What: Create a microservice that captures and stores user preferences in applications.


### Why: Provides a custom tailored application experience.


### Acceptance Criteria:
1.  As a user, I can set a preference and it persists from session to session.
2.  As a user, I can change a preference and it persists from session to session.
3.  As a user, I have a central place to view my user preferences.
4.  As a user, I have the ability to reset preferences to the default settings.
