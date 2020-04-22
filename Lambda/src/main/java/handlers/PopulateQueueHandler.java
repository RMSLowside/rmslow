package handlers;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.sqs.AmazonSQS;
import com.amazonaws.services.sqs.AmazonSQSClientBuilder;
import com.amazonaws.services.sqs.model.SendMessageBatchRequest;
import com.amazonaws.services.sqs.model.SendMessageBatchRequestEntry;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.RulesInputMessage;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

public class PopulateQueueHandler implements RequestHandler<Object, String> {

    private static final ObjectMapper mapper = new ObjectMapper();
    private static final ArrayList<String> producers = new ArrayList<>(Arrays.asList("Amazon", "Alphabet", "Microsoft", "Apple", "SpaceX", "Walmart", "Costco", "UnitedHealth"));

    @Override
    public String handleRequest(Object input, Context context) {
        AmazonSQS sqs = AmazonSQSClientBuilder.defaultClient();

        // Send messages to Direct Queue...
        int numberOfMessages = new Random().nextInt(200);
        context.getLogger().log("Adding " + numberOfMessages + " messages to 'records-ingest-queue'");

        ArrayList<SendMessageBatchRequestEntry> queueMessages = new ArrayList<>();
        for (int i = 0; i < numberOfMessages; i++) {
            int randomIndex = (int) (Math.random() * producers.size());
            String aProducer = producers.get(randomIndex);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date firstDate = null;
            Date lastDate = null;
            try {
                firstDate = sdf.parse("1950-01-01");
                lastDate = sdf.parse("2020-01-01");
            } catch (ParseException e) {
                return "Failed to generate dates due to " + e.getMessage();
            }
            long random = ThreadLocalRandom.current().nextLong(firstDate.getTime(), lastDate.getTime());
            Date date = new Date(random);

            RulesInputMessage rim = new RulesInputMessage();
            rim.setGuide(UUID.randomUUID().toString());
            rim.setProducer(aProducer);
            rim.setCreateDate(sdf.format(date));

            SendMessageBatchRequestEntry message = new SendMessageBatchRequestEntry();
            try {
                message.setId(UUID.randomUUID().toString());
                message.setMessageBody(mapper.writeValueAsString(rim));
            } catch (JsonProcessingException e) {
                return "Failed to generate dates due to " + e.getMessage();
            }

            queueMessages.add(message);
            if (queueMessages.size() % 10 == 0) {
                SendMessageBatchRequest smbr = new SendMessageBatchRequest();
                smbr.setQueueUrl("https://sqs.us-east-2.amazonaws.com/055276781719/records-ingest-queue");
                smbr.setEntries(queueMessages);
                sqs.sendMessageBatch(smbr);

                queueMessages = new ArrayList<>();
            }
        }

        if (queueMessages.size() > 0) {
            SendMessageBatchRequest smbr = new SendMessageBatchRequest();
            smbr.setQueueUrl("https://sqs.us-east-2.amazonaws.com/055276781719/records-ingest-queue");
            smbr.setEntries(queueMessages);
            sqs.sendMessageBatch(smbr);
        }

        // Send to Fake queue
        numberOfMessages = new Random().nextInt(200);
        context.getLogger().log("Adding " + numberOfMessages + " messages to 'fake-outside-queue'");

        queueMessages = new ArrayList<>();
        for (int i = 0; i < numberOfMessages; i++) {
            SendMessageBatchRequestEntry message = new SendMessageBatchRequestEntry();
            message.setId(UUID.randomUUID().toString());
            message.setMessageBody("{\"documentId\": \"1234\",\t\"docUrl\": \"https://aFile.xml\" }");

            queueMessages.add(message);
            if (queueMessages.size() % 10 == 0) {
                SendMessageBatchRequest smbr = new SendMessageBatchRequest();
                smbr.setQueueUrl("https://sqs.us-east-2.amazonaws.com/055276781719/fake-outside-queue");
                smbr.setEntries(queueMessages);
                sqs.sendMessageBatch(smbr);

                queueMessages = new ArrayList<>();
            }
        }

        if (queueMessages.size() > 0) {
            SendMessageBatchRequest smbr = new SendMessageBatchRequest();
            smbr.setQueueUrl("https://sqs.us-east-2.amazonaws.com/055276781719/fake-outside-queue");
            smbr.setEntries(queueMessages);
            sqs.sendMessageBatch(smbr);
        }

        return "ALL DONE";
    }
}
