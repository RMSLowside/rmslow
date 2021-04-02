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

```json5
  userId: "unique user id",
  prefState: "[
    {
      systemName: "name of system that the preferences apply to",     // perhaps have a "global" option?
      preferences: [
        {
          pref: "prefKey",
          value: "value selected by user"
        },
        ... // continue for each preference for this system
      ]
    },
    ...  // continue for each system
  ]"
```

(?) Would adding some sort of 'authorizedRoles' property to the Preferences ref. table (in the specific system pref store above) be a good idea? Perhaps we could authorize edits if it matches a certain group or role name as well as matching the the user id.

## API

### Get preferences for user
```
ngimws/preference/{userId}
RequestType = GET
PathParamter = {userId}
```
* get list of all preferences

### Update Preference for user
```
ngimws/preference/{userId}
RequestType = POST
PathParamter = {userId}
RequestBody = preference JSON
```
* update preference

### Delete preferences for user
```
ngimws/preference/userId
RequestType = DELETE
PathParamter = {userId}
```
* delete preference

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
