# Notification Service
The Notification Service is a common component that enables teams to send notifications to a variety of endpoints.

The Notification service consists of the following components:

- The Notification service datastore
- The Notification service API
- The Notification service SDK
- The Notification service UI

# Components
## Datastore
A Notification service holds no information other than registered user and systems. The datastore will be hosted on AWS Aurora MySQL.

The following information will be stored.

#### users
```json5
{
  cn: "The system/users unique CN",
  endpointId: "Authorized endpoint"
}
```

#### endpoints
```json5
{
  uuid: "Internal UUID for endpoint type",
  endpoint: "Skype/Email/SNS/SQS/etc"
}
```

## API
TODO

## SDK
TODO

## UI
Source draw.io here: [Draw.io Source](www.google.com)

View Only draw.io here: [Draw.io export](www.google.com)