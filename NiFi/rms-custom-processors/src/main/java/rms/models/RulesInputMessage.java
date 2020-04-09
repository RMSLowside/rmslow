package rms.models;

import rms.exceptions.RmsGeneralException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class RulesInputMessage {
    private String guide;
    private String producer;
    private String createDate;

    public String getGuide() {
        return guide;
    }

    public void setGuide(String guide) {
        this.guide = guide;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public void validate() throws RmsGeneralException {
        if (isNull(guide)) {
            throw new RmsGeneralException("GUIDE is null or empty");
        }

        if (isNull(producer)) {
            throw new RmsGeneralException("Producer is null or empty");
        }

        if (isNull(createDate)) {
            throw new RmsGeneralException("CreateDate is null or empty");
        } else {
            if (!checkDate(createDate)) {
                throw new RmsGeneralException("CreateDate does not match expected format of yyyy-MM-dd");
            }
        }
    }

    private boolean checkDate(String createDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        try {
            LocalDate ld = LocalDate.parse(createDate, formatter);
            String result = ld.format(formatter);
            return result.equals(createDate);
        } catch (DateTimeParseException e) {
            return false;
        }
    }

    private boolean isNull(String aString) {
        return aString == null || aString.equals("");
    }
}
