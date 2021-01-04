# Notification Service

The Notification Service is a common component that enables teams to send notifications to a variety of endpoints while
also tracking the history of all events sent through it.

The Notification service consists of the following components:

- The Notification service datastore
- The Notification service API
- The Notification service SDK
- The Notification service UI

# Components

## Datastore

The Notification service contains multiple tables hosted on AWS Aurora MySQL.

The following information will be stored.

#### users

The users table is used as the access control point for the notification service. Every endpoint type (
SQS,EMAIL,SKYPE,etc)
can be controlled through the use of endpointIds. Every System/User can have multiple entries in the table to allow for
customized access to the Notification service.

```json5
{
  cn: "The system/users unique CN",
  endpointId: "Authorized endpoint"
}
```

#### endpoints

The list of endpoint types that the Notification service can send to.

```json5
{
  uuid: "Internal UUID for endpoint type",
  endpoint: "Skype/Email/SNS/SQS/etc"
}
```

#### notifications

```json5
{
  uuid: "Internal UUID for notification event",
  title: "The title for the notification",
  description: "A short description of what the notification is for",
  message: "The message to be sent to the endpoint",
  endpointId: "Link back to endpoints table",
  recipientList: "Comma delimited list of recipients to send to.",
  recurrence: "NOW/ONCE/DAILY/WEEKLY/MONTHLY/YEARLY",
  startDate: "The date to start sending notifications",
  endDate: "The date to stop sending notifications. This is nullable (no end date)",
  time: "The time of day to send the notification out.",
  cn: "The CN of the user/system that created this notification"
}
```

#### currentNotifications

Notifications that need to go out today. This table is generated nightly by the service and is checked every minute for
events that meet the criteria to be sent out.

```json5
{
  notificationId: "Link to the notification table uuid",
  time: "The time of day the notification should be sent."
}
```

#### notificationHistory

Every event that is sent directly through the notification service.

```json5
{
  notificationId: "Link to the notification table uuid",
  status: "COMPLETED/FAILED",
  information: "Short message related to the status. Gives more insight into errors.",
  date: "The date the event went out",
  time: "The time the event went out"
}
```

## API
The Notification web service will be written in Java and hosted inside a EC2 Apache Tomcat instance.
The endpoints below will be open to use by systems that have registered their system certificates with the Notification service.

### Add Notification
```
ngimws/ns/notification
RequestType = POST
RequestBody = Notifications POJO
```
* Creates a new notification
* If recurrence == NOW
    * Put notification in currentNotifications table
* If startDate == today's date
    * Put notification in currentNotifications table

### Get Notification
```
ngimws/ns/notification/{uuid}
RequestType = GET
PathParamter = {uuid}
```
* Get a specific notification and from the database

### Get Notification History
```
ngimws/ns/history/{uuid}
RequestType = GET
PathParamter = {uuid}
```
* Get a specific notification's historical events and from the database

### Search Notifications
```
ngimws/ns/notification
RequestType = GET
RequestBody = Advanced search POJO
```
* Search for matching notifications

### Update Notification
```
ngimws/ns/notification
RequestType = UPDATE
RequestBody = Notifications POJO
```
* Updates a existing notification
* If the event is in the currentNotifications table. Remove if it no longer meets the criteria.

### Delete Notification
```
ngimws/ns/notification
RequestType = DELETE
RequestParms = {uuid}
```
* Delete notifications table if exists.
* Delete from currentNotifications table if exists.

## SDK
If integrated systems do not want to write their own code to integrate with the Notification web service API, an SDK will be made available
for download from Artifactory and the Notification Service UI.

A SDK will be available for the following languages:

- Java

The SDK will have the following software framework.

- Create local Notification object.
```java
// Create a local Notification object that can be submitted to the Notification API.
Notification n = new NotificationBuilder()
        .setTitle("ITS LUNCH TIME")
        .setDescription("Let Bryan know its time for lunch")
        .setMessage("It's lunch time!")
        .setEndpointId(Endpoints.SKYPE)
        .setRecipientList("kimmela.skypeexchange.org,hoggeb.skypeexchange.org")
        .setRecurrence(Recurrence.DAILY)
        .setStartDate("2021-01-01")
        .setTime("10:59:59");
        .build();
```

- Validate Notification object.
```java
// Returns all errors with the local Notification object. The validate method can return an empty list.
ArrayList<NotificationError> errors = n.validate();
for(NotificationError error: errors){
    System.out.println(error.getErrorMessage());
}
```

- Create Service connector.
```java
NotificationServiceConnector connector = new NotificationServiceConnector("/path/to/jks", "aRealp4ss", "/path/to/trustjks", "anotherR34lP4ss");
```

- Send local Notification object to Notification service.
```java
NotificationServiceResult nsr = connector.sendNotification(p);
```

- Other SDK uses.
```java
// Get single notification.
Notification notification = connector.getNotification("1234-1234-1234");

// Get notification history.
ArrayList<NotificationHistory> history = connector.getNotificationHistory("1234-1234-1234");
```

## UI

Source draw.io
here: [Draw.io Source](https://app.diagrams.net/#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FNotificationService%2FNotificationService.drawio)

View Only draw.io here: [Draw.io export](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&page-id=uFDXrdoMcbQE_zLRZp2q&title=NotificationService.drawio#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FNotificationService%2FNotificationService.drawio)
