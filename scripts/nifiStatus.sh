#!/bin/bash

NIFI_PROCESSOR_LIST=('01711000-9763-1f4a-f2a0-aae356b1fd0b' '55b2b899-0171-1000-d60a-3834590dfe1a' '55b3528f-0171-1000-956c-414514569e1d'
'4f4a9763-0171-1000-d986-62156e304184' '5a238cc5-0171-1000-c5b7-a858633888b3' '5fa3daf6-0171-1000-4590-675dd5c4ee69' '599dfda2-0171-1000-91fc-933c7f60e5d8'
'01711008-9763-1f4a-6e8b-fe88c34501f0' '55ba1970-0171-1000-22a1-5ccc0d6af846' '55b9e9fa-0171-1000-086f-f823a60c5d09' '59e24bec-0171-1000-1399-c335d88ccb50');

NIFI_CONNECTIONS_LIST=('55b2ed50-0171-1000-406c-e738664c28e4' '55b36517-0171-1000-7a1a-1caf49d8a8a3' '55b37319-0171-1000-4daa-bf6888d752c8'
'54b0b4e2-0171-1000-5095-39fcc7a70360' '55b565dd-0171-1000-33fb-6e825bbb003a' '5fa3effd-0171-1000-1aae-21f54d9c2422' '5fa40309-0171-1000-d647-259bfb79247b'
'599f964d-0171-1000-d4aa-1968098e9afc' '55ba4e3f-0171-1000-d05e-d6abfa9eea0a' '55baa0dd-0171-1000-4896-aa37107d41de' '55badb21-0171-1000-5e3d-387c4ead9d2d');

echo "Checking all NiFi processors:";

for i in "${NIFI_PROCESSOR_LIST[@]}"
do
	RESULT="`wget -qO- http://rmslow-nifi-570397140.us-east-2.elb.amazonaws.com:8080/nifi-api/processors/${i}`"
  PROCESSOR_NAME=$(echo ${RESULT} | jq '.component.name');
  PROCESSOR_STATE=$(echo ${RESULT} | jq '.component.state');

  echo "Processor [ID: ${i}] [NAME: ${PROCESSOR_NAME}] [STATE: ${PROCESSOR_STATE}]";
done

echo "";
echo "Checking all NiFi connections:";

for i in "${NIFI_CONNECTIONS_LIST[@]}"
do
	RESULT="`wget -qO- http://rmslow-nifi-570397140.us-east-2.elb.amazonaws.com:8080/nifi-api/connections/${i}`"
  SOURCE_PROCESSOR_NAME=$(echo ${RESULT} | jq '.component.source.name');
  DESTINATION_PROCESSOR_NAME=$(echo ${RESULT} | jq '.component.destination.name');
  CONNECTION_QUEUED=$(echo ${RESULT} | jq '.status.aggregateSnapshot.flowFilesQueued');


  echo "Connection [ID: ${i}] [SOURCE PROCESSOR: ${SOURCE_PROCESSOR_NAME}] [DESTINATION PROCESSOR: ${DESTINATION_PROCESSOR_NAME}]";
  echo "     Files in queue: ${CONNECTION_QUEUED}"
done
