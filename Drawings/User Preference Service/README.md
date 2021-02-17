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

### preference
```json5
{
  uuid: "internal unique key",
  systemName: "Name of the system preference belongs to. ex. iServices ",
  applicationName: "Name of the application or sub category of preference. Global Preferences, RCS, IMA, Eva, SCGR, MarkId, etc",
  category: "preference category. Theme, profile, search, appearance etc"
}
```

### preferenceOptions
```json5
{
  uuid: "internal unique key",
  refId: "foreign key tied to reference table",
  type: "type of selection: dropdown, number etc. field will be used if external service will use our UI."
  options: "options applicable to the category"
}
```

### userPreference
```json5
{
  uuid: "internal unique key",
  refId: "foreign key tied to reference table",  
  userName: "user full name",
  userId: "",
  userCN: "",
  value: "value of users selection"
}
```

## API

### Add Preference
```
ngimws/preference
RequestType = POST
RequestParam
RequestBody = List<PreferenceOptions>
```
* add preference

### Get user preference for user
```
ngimws/preference/{userId}
RequestType = GET
RequestParms = {userId}
```
* Gets user preference

### Update user preferences
```
ngimws/preference/{userId}
RequestType = POST
RequestParms = {userId}
RequrestBody = Preference POJO
```
* Update user preference

## SDK

## **UI**

## Drawings

Dashboard draw.io: [here](https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FUser%20Preference%20Service%2FUser%20Preference.drawio)

View Only draw.io here:



## **Software Development Requirements**



### Who: IMS TD



### What: Create a microservice that captures and stores user preferences in applications.


### Why: Provides a custom tailored application experience.


### Acceptance Criteria:
1.  As a user, I can set a preference and it persists from session to session.
2.  As a user, I can change a preference and it persists from session to session.
3.  As a user, I have a central place to view my user preferences.
4.  As a user, I have the ability to reset preferences to the default settings.
