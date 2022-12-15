CREATE PROCEDURE createAllTables
AS

-- USERS
CREATE TABLE systemUser (
	username VARCHAR(20),
	password VARCHAR(20),
	PRIMARY KEY(username)
);

CREATE TABLE fan (
	national_id INT,
	name VARCHAR(20),
	birthDate DATE,
	address VARCHAR(20),
	phoneNumber INT,
	status BIT,
	username VARCHAR(20),
	PRIMARY KEY (nationalId),
	FOREIGN KEY (username) REFERENCES systemUser
);

CREATE TABLE stadiumManager (
	id INT IDENTITY,
	name VARCHAR(20),
	stadium_id INT,
	username VARCHAR(20),
	PRIMARY KEY (id),
	FOREIGN KEY (username) REFERENCES systemUser,
	FOREIGN KEY (stadium_id) REFERENCES stadium
)

CREATE TABLE clubRepresentative (
	id INT IDENTITY,
	name VARCHAR(20),
	club_id INT,
	username VARCHAR(20),
	PRIMARY KEY (id),
	FOREIGN KEY	(username) REFERENCES systemUser,
	FOREIGN KEY	(club_id) REFERENCES club
)

CREATE TABLE sportsAssociationManager (
	id INT IDENTITY,
	name VARCHAR(20),
	username VARCHAR(20),
	PRIMARY KEY (id),
	FOREIGN KEY (username) REFERENCES systemUser
)

CREATE TABLE systemAdmin (
	id INT IDENTITY,
	name VARCHAR(20),
	username VARCHAR(20),
	PRIMARY KEY (id),
	FOREIGN KEY (username) REFERENCES systemUser
)

-- OTHER ENTITIES
CREATE TABLE stadium (
	id INT IDENTITY,
	name VARCHAR(20),
	location VARCHAR(20),
	capacity INT,
	status BIT,
	PRIMARY KEY (id)
)

CREATE TABLE club (
	id INT IDENTITY,
	name VARCHAR(20),
	location VARCHAR(20),
	PRIMARY KEY (id)
)

CREATE TABLE ticket (
	id INT IDENTITY,
	status BIT,
	match_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (match_id) REFERENCES match
)

CREATE TABLE match (
	id INT IDENTITY,
	startTime DATETIME,
	endtime DATETIME,
	hostClub_id INT,
	guestClub_id INT,
	stadium_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (hostClub_id) REFERENCES club,
	FOREIGN KEY (guestClub_id) REFERENCES club,
	FOREIGN KEY (stadium_id) REFERENCES stadium 
)

-- RELATIONS
CREATE TABLE ticketBuyingTransaction (
	id INT IDENTITY,
	name VARCHAR(20),
	location VARCHAR(20),
	capacity INT,
	status BIT,
	PRIMARY KEY (id)
)

CREATE TABLE hostRequest (
	id INT IDENTITY,
	name VARCHAR(20),
	location VARCHAR(20),
	capacity INT,
	status BIT,
	PRIMARY KEY (id)
)
GO;

CREATE PROCEDURE dropAllTables
AS
DROP TABLE systemUser;
DROP TABLE fan;
DROP TABLE stadiumManager;
DROP TABLE clubRepresentative;
DROP TABLE sportsAssociationManager;
DROP TABLE systemAdmin;
DROP TABLE stadium;
DROP TABLE club;
DROP TABLE ticket;
DROP TABLE match;
DROP TABLE ticketBuyingTransaction;
DROP TABLE hostRequest;
GO;

EXEC createAllTables;
