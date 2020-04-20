--liquibase formatted sql

--changeset kimmela:rmsl-50
USE rmm;

CREATE TABLE record_system_metrics (
    runDate date NOT NULL,
    recordSystemGuide varchar(255) NOT NULL,
    recordCount int NOT NULL
);

CREATE INDEX runDate ON record_system_metrics (runDate);

CREATE TABLE rcs_metrics (
    runDate date NOT NULL,
    rcsId int NOT NULL,
    recordCount int NOT NULL
);

CREATE INDEX runDate ON rcs_metrics (runDate);

CREATE TABLE upcoming_dispositions_90_days (
    guide varchar(255) primary key,
    recordSystemGuide varchar(255) NOT NULL,
    dispositionDate date NOT NULL
);

CREATE TABLE upcoming_dispositions_30_days (
    guide varchar(255) primary key,
    recordSystemGuide varchar(255) NOT NULL,
    dispositionDate date NOT NULL
);

DELIMITER //
CREATE PROCEDURE populate_record_system_metrics()
BEGIN
    INSERT INTO record_system_metrics(runDate, recordSystemGuide, recordCount)
    SELECT CURDATE(), innerTable.recordSystemGuide, innerTable.count
    FROM (SELECT recordSystemGuide, COUNT(*) AS count FROM records GROUP BY recordSystemGuide) innerTable;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE populate_rcs_metrics()
BEGIN
    INSERT INTO rcs_metrics(runDate, rcsId, recordCount)
    SELECT CURDATE(), innerTable.rcsId, innerTable.count
    FROM (SELECT rcsId, COUNT(*) AS count FROM records GROUP BY rcsId) innerTable;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE populate_upcoming_dispositions_90_days()
BEGIN
    INSERT INTO upcoming_dispositions_90_days(guide, recordSystemGuide, dispositionDate)
    SELECT guide, recordSystemGuide, dispositionDate
    FROM records
    WHERE dispositionDate BETWEEN CURDATE() AND CURDATE() + INTERVAL 90 DAY;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE populate_upcoming_dispositions_30_days()
BEGIN
    INSERT INTO upcoming_dispositions_30_days(guide, recordSystemGuide, dispositionDate)
    SELECT guide, recordSystemGuide, dispositionDate
    FROM records
    WHERE dispositionDate BETWEEN CURDATE() AND CURDATE() + INTERVAL 30 DAY;
END//
DELIMITER ;
