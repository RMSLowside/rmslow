# Email Service

The Email Service is a common Service that enables applications to send emails

The Email service consists of the following components:

- The Email service API

- Email Service draw.io
here: [Draw.io Source](https://app.diagrams.net/?title=Copy%20of%20PeopleService.drawio&client=1#HRMSLowside%2Frmslow%2Fmaster%2FDrawings%2FMicroservices%2FEmailService%2FEmailService.drawio)

# Components

## API
The Email web service will be written in Java and hosted inside a EC2 Apache Tomcat instance.
The endpoints below will be used by only the Notification Service.

Version 1 single recipient.

- Email object.
```java
message:String,
title: String,
recipient: String,
classification: ?
```

### Send Email
```
ngimws/es/email
RequestType = POST
RequestBody = Email POJO
```


## **Software Development Requirements**



### Who:
Tech Director Staff


### What:
Provide a service to standardize the ability of systems to send email.


### Why:
The email service will send emails routed to it by the notification service.  


### Acceptance Criteria:
1.	Enable the email system to send email messages
