--liquibase formatted sql

--changeset kimmela:rmsl-48
CREATE DATABASE rmm;

CREATE table rmm.records (
    guide varchar(255) primary key,
    ruleId int NOT NULL,
    rcsId int NOT NULL,
    decisionDate date NOT NULL,
    documentCreateDate date NOT NULL,
    dispositionDate date NOT NULL,
    INDEX rule (ruleId),
    INDEX rcs (rcsId),
    INDEX disposition (dispositionDate)
)

CREATE table rmm.holds (
    guide varchar(255) primary key,
    releaseDate date,
    INDEX release (releaseDate)
)
