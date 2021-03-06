# Notification Service

The Notification Service is a common Service that enables applications to send notifications to a variety of endpoints

The Notification service consists of the following components:

- The Notification service API
- The Notification service SDK

# Components


## API
The Notification web service will be written in Java and hosted inside a EC2 Apache Tomcat instance.
The endpoints below will be open to use by systems that have registered their system certificates with the Notification service.
Notification service will route to the micro service for sending based on endpoint, email goes to the EmailService, Skype to SkypeService, and so on.
If no endpoint is specified, the service will check the UserPrefs service for the recipients, defaulting to email, and then routing the messages.

Version 1 single recipient it is on the caller to call multiple times. Version 1 no groups.

- Notification object.
```java
message:String,
title: String,
endpoint: String,
recipients: String,
classification: ?
```

### Send Notification
```
ngimws/ns/notification
RequestType = POST
RequestBody = Notifications POJO
```

#### Error Codes:
```
400 (Bad Request) : request object is in some way improperly formatted
500 (Internal Server Error) : Something happened in the respective messaging service
```

## SDK
If integrated systems do not want to write their own code to integrate with the Notification web service API, an SDK will be made available
for download from Artifactory.

A SDK will be available for the following languages:

- Java

The SDK will have the following software framework.

- Create local Notification object.
```java
// Create a local Notification object that can be submitted to the Notification API.
Notification n = new NotificationBuilder()
        .setMessage("It's lunch time!")
        .setTitle("title")
        .setClassification("classGoesHere")
        .setEndpoint(Endpoints.SKYPE)
        .setRecipients("123456")        
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

## UI

Source draw.io
here: [Draw.io Source](https://app.diagrams.net/?src=about#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FMicroservices%2FNotifications%2FNotificationService.drawio)

View Only draw.io here: [Draw.io export](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&page-id=uFDXrdoMcbQE_zLRZp2q&title=NotificationService.drawio#Uhttps%3A%2F%2Fraw.githubusercontent.com%2FRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FNotificationService%2FNotificationService.drawio)


## **Software Development Requirements**



### Who:
Tech Director Staff


### What:
Provide a service to standardize the ability of systems to send notification to a variety of platforms to include email, instant messenger, queues, and other platforms as they become relevant.  


### Why:
As a plug in play service the notification system will simplify the process for systems to send notification without requiring each integrated system to relearn how to send a notification on the instant message platform.  


### Acceptance Criteria:
1.	Ensure a simple registration process for systems planning to use the notification service.  
2.	Simplify the notification process by enabling systems to connect to a simple endpoint
3.	Ensure the message standard is defined and published in the API documentation.  
4.	Enable the notification system to send email messages
5.	Enable the notification system to send instant messenger messages
6.	Enable the notification system to send SNS and/or SQS messages.  
