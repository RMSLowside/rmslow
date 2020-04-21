--liquibase formatted sql

--changeset kimmela:rmsl-50 endDelimiter://
USE rmm//

CREATE TABLE record_metrics (
    runDate date NOT NULL,
    recordCount int NOT NULL
)//

CREATE TABLE record_system_metrics (
    runDate date NOT NULL,
    recordSystemGuide varchar(255) NOT NULL,
    recordCount int NOT NULL
)//

CREATE INDEX runDate ON record_system_metrics (runDate)//

CREATE TABLE rcs_metrics (
    runDate date NOT NULL,
    rcsId int NOT NULL,
    recordCount int NOT NULL
)//

CREATE INDEX runDate ON rcs_metrics (runDate)//

CREATE TABLE upcoming_dispositions_90_days (
    guide varchar(255) primary key,
    recordSystemGuide varchar(255) NOT NULL,
    dispositionDate date NOT NULL
)//

CREATE TABLE upcoming_dispositions_30_days (
    guide varchar(255) primary key,
    recordSystemGuide varchar(255) NOT NULL,
    dispositionDate date NOT NULL
)//

CREATE TABLE past_due_dispositions (
    guide varchar(255) primary key,
    recordSystemGuide varchar(255) NOT NULL,
    dispositionDate date NOT NULL,
    daysOverDue int NOT NULL
)//

CREATE PROCEDURE populate_record_metrics()
BEGIN
    INSERT INTO record_metrics(runDate, recordCount)
    SELECT CURDATE(), COUNT(*) AS count
    FROM records;
END//

CREATE PROCEDURE populate_record_system_metrics()
BEGIN
    INSERT INTO record_system_metrics(runDate, recordSystemGuide, recordCount)
    SELECT CURDATE(), innerTable.recordSystemGuide, innerTable.count
    FROM (SELECT recordSystemGuide, COUNT(*) AS count FROM records GROUP BY recordSystemGuide) innerTable;
END//

CREATE PROCEDURE populate_rcs_metrics()
BEGIN
    INSERT INTO rcs_metrics(runDate, rcsId, recordCount)
    SELECT CURDATE(), innerTable.rcsId, innerTable.count
    FROM (SELECT rcsId, COUNT(*) AS count FROM records GROUP BY rcsId) innerTable;
END//

CREATE PROCEDURE populate_upcoming_dispositions_90_days()
BEGIN
    INSERT INTO upcoming_dispositions_90_days(guide, recordSystemGuide, dispositionDate)
    SELECT guide, recordSystemGuide, dispositionDate
    FROM records
    WHERE dispositionDate BETWEEN CURDATE() AND CURDATE() + INTERVAL 90 DAY;
END//

CREATE PROCEDURE populate_upcoming_dispositions_30_days()
BEGIN
    INSERT INTO upcoming_dispositions_30_days(guide, recordSystemGuide, dispositionDate)
    SELECT guide, recordSystemGuide, dispositionDate
    FROM records
    WHERE dispositionDate BETWEEN CURDATE() AND CURDATE() + INTERVAL 30 DAY;
END//

CREATE PROCEDURE populate_past_due_dispositions()
BEGIN
    TRUNCATE TABLE past_due_dispositions;

    INSERT INTO past_due_dispositions(guide, recordSystemGuide, dispositionDate, daysOverDue)
    SELECT guide, recordSystemGuide, dispositionDate, DATEDIFF(CURDATE(), dispositionDate)
    FROM records
    WHERE dispositionDate < CURDATE() AND dispositionAppliedBy IS NULL;
END//
