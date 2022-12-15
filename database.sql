													--| Guide |--

-- "-->" point from the milestone description
-- "--| |--" section

										--| Basic Structure of the Database |--

--> 2.1a createAllTables
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
);
CREATE TABLE clubRepresentative (
	id INT IDENTITY,
	name VARCHAR(20),
	club_id INT,
	username VARCHAR(20),
	PRIMARY KEY (id),
	FOREIGN KEY	(username) REFERENCES systemUser,
	FOREIGN KEY	(club_id) REFERENCES club
);
CREATE TABLE sportsAssociationManager (
	id INT IDENTITY,
	name VARCHAR(20),
	username VARCHAR(20),
	PRIMARY KEY (id),
	FOREIGN KEY (username) REFERENCES systemUser
);
CREATE TABLE systemAdmin (
	id INT IDENTITY,
	name VARCHAR(20),
	username VARCHAR(20),
	PRIMARY KEY (id),
	FOREIGN KEY (username) REFERENCES systemUser
);

-- OTHER ENTITIES
CREATE TABLE stadium (
	id INT IDENTITY,
	name VARCHAR(20),
	location VARCHAR(20),
	capacity INT,
	status BIT,
	PRIMARY KEY (id)
);
CREATE TABLE club (
	id INT IDENTITY,
	name VARCHAR(20),
	location VARCHAR(20),
	PRIMARY KEY (id)
);
CREATE TABLE ticket (
	id INT IDENTITY,
	status BIT,
	match_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (match_id) REFERENCES match
);
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
);

-- RELATIONS
CREATE TABLE ticketBuyingTransaction (
	fanNational_id INT, 
	ticket_id INT,
	FOREIGN KEY (fanNational_id) REFERENCES fan,
	FOREIGN KEY (ticket_id) REFERENCES ticket
);
CREATE TABLE hostRequest (
	id INT IDENTITY,
	name VARCHAR(20),
	location VARCHAR(20),
	capacity INT,
	status BIT,
	PRIMARY KEY (id)
);
GO;

--> 2.1b dropAllTables
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

--> 2.1c dropAllProceduresFunctionsViews
CREATE PROCEDURE dropAllProceduresFunctionsViews
AS
-- TODO
GO;

--> 2.1d clearAllTables
CREATE PROCEDURE clearAllTables
AS
TRUNCATE TABLE systemUser;
TRUNCATE TABLE fan;
TRUNCATE TABLE stadiumManager;
TRUNCATE TABLE clubRepresentative;
TRUNCATE TABLE sportsAssociationManager;
TRUNCATE TABLE systemAdmin;
TRUNCATE TABLE stadium;
TRUNCATE TABLE club;
TRUNCATE TABLE ticket;
TRUNCATE TABLE match;
TRUNCATE TABLE ticketBuyingTransaction;
TRUNCATE TABLE hostRequest;
GO;

EXEC createAllTables;
EXEC dropAllTables;
EXEC dropAllProcedureFunctionsViews;
EXEC clearAllTables;
GO;

												--|Basic Data Retrieval|--

--> 2.2a allAssocManagers
CREATE VIEW allAssocManagers AS
SELECT username, password, name
FROM sportsAssociationManager;
GO;
--> 2.2b allClubRepresentatives
CREATE VIEW allClubRepresentatives AS
SELECT username,password, name, 



														--|REFERENCE|--

-- TABLES:	systemUser				(*username, password)
--			fan						(*nationa_id, name, birthDate, address, phoneNumber, status, .username)
--			stadiumManager			(*id, name, .stadium_id, .username)
--			clubRepresentative		(*id, name, .club_id, .username) 
--			sportsAssociationManager(*id, name, .username)
--			systemAdmin				(*id, name, .username)
--			stadium					(*id, name, location, capacity, status)
--			club					(*id, name, location)
--			ticket					(*id, status, .match_id)
--			match					(*id, startTime, endTime, .hostClub_id, .guestClub_id, .stadium_id)
--			ticketBuyingTransaction	(.fanNational_id, .ticket_id)
--			hostRequest				(*id, name, location, capacity, status)