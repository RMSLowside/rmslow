--liquibase formatted sql

--changeset kimmela:rmsl-48
USE rmm;

CREATE TABLE records (
    guide varchar(255) primary key,
    ruleId int NOT NULL,
    rcsId int NOT NULL,
    decisionDate date NOT NULL,
    documentCreateDate date NOT NULL,
    dispositionDate date NOT NULL
);

CREATE INDEX rule ON records (ruleId);
CREATE INDEX rcs ON records (rcsId);
CREATE INDEX disposition ON records (dispositionDate);

CREATE TABLE holds (
    guide varchar(255) primary key,
    releaseDate date NOT NULL
);

CREATE INDEX releases ON holds (releaseDate);
