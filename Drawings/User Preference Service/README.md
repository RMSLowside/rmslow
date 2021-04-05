# User Preference Service

The User Preferences Service will capture and store user preferences that would persist between sessions.  The service will allow users to manage personal preferences to tailor their working environment for an optimal application experience.  

## To Solve
User prefs is supposed to be a micro service that would support non-RMS apps.
- We need to define how we add a new service (particularly for non-RMS managed services)
- How those new features get onto the prefs UI.  Can the UI be built dynamically from a table or ______???
- Define standards for things like dark theme, rows on a table, etc.  



## **Components**
## Datastore
The following information will be stored.

### Preferences

Another take on this, using object structure without arrays:
```json5
  userId: "unique user id",
  preferences: "{
    iServices: {
      scgr: {
        gridColums: "title, description,....",
        pageSize: "15",
        ...
      },
      rcs:{
        gridColums: "title, description,....",
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
    communication: "email"
    
  }"
```

## API

### Get preferences for user
```
ngimws/preference/{userId}/{node || level}
RequestType = GET
PathParamter = {userId}
```
* get list of all preferences
* If no node or level is provided, entire object is returned
* If "iServices" is passed under block you would return the nodes atarting at Iservices
* If "iServices.scgr" is passed under block, you will get all nodes starting at scgr
* If 2 is passed at as a level you will get all nodes up to 2 depth
** In this example that would return:
```json5
  userId: "unique user id",
  preferences: "{
    iServices: {
      theme: "dark",
      Any other prefs at this level
    },
    system3: {
      pref: "val"
    },
    systemX: {
      pref: "val"
    },
    ...
    communication: "email"
    
  }"
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
* RequestBody: iServices.scgr.pageSize: 15
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
 * TO delete a pref you would send the node with no value: "iServices.scgr:null" would get rid of the block under scgr

## SDK
- Create local user preference object.
```java
// Create a local Notification object that can be submitted to the user preference API.
Preference n = new PreferenceBuilder()
        .setUserId("####")
        .setPreference("preference json block")
        .build();
```

## **UI**

## Drawings

Dashboard draw.io: [here](https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FUser%20Preference%20Service%2FUser%20Preference.drawio)

## **Software Development Requirements**



### Who: IMS TD



### What: Create a microservice that captures and stores user preferences in applications.


### Why: Provides a custom tailored application experience.


### Acceptance Criteria:
1.  As a user, I can set a preference and it persists from session to session.
2.  As a user, I can change a preference and it persists from session to session.
3.  As a user, I have a central place to view my user preferences.
4.  As a user, I have the ability to reset preferences to the default settings.
