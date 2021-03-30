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
          name: "nice name for pref",
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

### Get all preferences
```
ngimws/preference
RequestType = GET
RequestBody = List<PreferenceOptions>
```
* get list of all preferences

### Get specific preference
```
ngimws/preference/{prefId}
RequestType = GET
RequestBody = List<PreferenceOptions>
```
* get a specific preference

### Add Preference
```
ngimws/preference
RequestType = POST
RequestBody = List<PreferenceOptions>
```
* add preference

### Update Preference
```
ngimws/preference
RequestType = POST
RequestBody = List<PreferenceOptions>
```
* update preference

### Delete Preference
```
ngimws/preference
RequestType = POST
RequestBody = List<PreferenceOptions>
```
* delete preference

### Add user preference
```
ngimws/preference/{userId}
RequestType = POST
RequestBody = Preference POJO
```
* add a new user preference

### Update user preferences
```
ngimws/preference/{userId}
RequestType = UPDATE
RequestParms = {userId}
RequrestBody = Preference POJO
```
* Update user preference

### Delete user preference
```
ngimws/preference/delete/{userId}
RequestType = POST
RequestBody = List<PreferenceOptions>
```
* delete user preference

### Get user preference for user
```
ngimws/preference/{userId}
RequestType = GET
RequestParms = {userId}
```
* Gets user preference

### Reset user preference
```
ngimws/preference/{userId}
RequestType = UPDATE
RequestParms = {userId}{appName}
```
* Reset user preference to default values for user

### Reset all user preference
```
ngimws/preference/{appName}
RequestType = UPDATE
RequestParms = {appName}
```
* Reset all user preference for application

## SDK

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
