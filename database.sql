CREATE DATABASE testing1;
GO;
--| Guide |----------------------------------------------------------------------------------------
-- "-->" point from the milestone description
-- "--| |--" section





--| 2.1 Basic Structure of the Database |----------------------------------------------------------
--> 2.1a createAllTables
CREATE PROCEDURE createAllTables AS
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
	PRIMARY KEY (national_id),
	FOREIGN KEY (username) REFERENCES systemUser
);
CREATE TABLE stadium (
	id INT IDENTITY,
	name VARCHAR(20),
	location VARCHAR(20),
	capacity INT,
	status BIT,
	PRIMARY KEY (id)
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
CREATE TABLE club (
	id INT IDENTITY,
	name VARCHAR(20),
	location VARCHAR(20),
	PRIMARY KEY (id)
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
CREATE TABLE match (
	id INT IDENTITY,
	startTime DATETIME,
	endTime DATETIME,
	hostClub_id INT,
	guestClub_id INT,
	stadium_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (hostClub_id) REFERENCES club,
	FOREIGN KEY (guestClub_id) REFERENCES club,
	FOREIGN KEY (stadium_id) REFERENCES stadium 
);
CREATE TABLE ticket (
	id INT IDENTITY,
	status BIT,
	match_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (match_id) REFERENCES match
);
CREATE TABLE ticketBuyingTransaction (
	fanNational_id INT, 
	ticket_id INT,
	FOREIGN KEY (fanNational_id) REFERENCES fan,
	FOREIGN KEY (ticket_id) REFERENCES ticket
);
CREATE TABLE hostRequest (
	id INT IDENTITY,
	representative_id INT,
	manager_id INT,
	match_id INT,
	status BIT,
	PRIMARY KEY (id),
	FOREIGN KEY (representative_id) REFERENCES clubRepresentative,
	FOREIGN KEY (manager_id) REFERENCES stadiumManager,
	FOREIGN KEY (match_id) REFERENCES match
);
GO;

--> 2.1b dropAllTables
CREATE PROCEDURE dropAllTables AS
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
CREATE PROCEDURE dropAllProceduresFunctionsViews AS
-- TODO
GO;

--> 2.1d clearAllTables
CREATE PROCEDURE clearAllTables AS
DELETE hostRequest;
DELETE ticketBuyingTransaction;
DELETE ticket;
DELETE match;
DELETE systemAdmin;
DELETE sportsAssociationManager;
DELETE clubRepresentative;
DELETE stadiumManager;
DELETE fan;
DELETE stadium;
DELETE club;
DELETE systemUser;
GO;

EXEC createAllTables;
EXEC dropAllTables;
EXEC dropAllProcedureFunctionsViews;
EXEC clearAllTables;
GO;





--| 2.2 Basic Data Retrieval |---------------------------------------------------------------------
--> 2.2a allAssocManagers
CREATE VIEW allAssocManagers AS
SELECT DISTINCT SPA.username, SU.password, SPA.name
FROM sportsAssociationManager SPA 
INNER JOIN systemUser SU ON SPA.username = SU.username;
GO;

--> 2.2b allClubRepresentatives
CREATE VIEW allClubRepresentatives AS
SELECT DISTINCT CR.username, SU.password, CR.name, CR.club_id
FROM clubRepresentative CR
INNER JOIN systemUser SU ON CR.username = SU.username;
GO;

--> 2.2c allStadiumManagers
CREATE VIEW allStadiumManagers AS
SELECT DISTINCT SM.username, SU.password, SM.name, SM.stadium_id
FROM stadiumManager SM
INNER JOIN systemUser SU ON SM.username = SU.username;
GO;

--> 2.2d allFans
CREATE VIEW allFans AS
SELECT DISTINCT F.username, SU.password, F.name, F.national_id, F.birthDate, F.status
FROM fan F
INNER JOIN systemUser SU ON F.username = SU.username;
GO;

--> 2.2e allMatches  Fetches the name of the host club, the name of the guest club and the start time for all matches.
CREATE VIEW allMatches AS
SELECT DISTINCT C1.name hostClub, C2.name guestClub, M.startTime
FROM match M
INNER JOIN club C1 ON C1.id = M.hostClub_id
INNER JOIN club C2 ON C2.id = M.guestClub_id;
GO;

--> 2.2f allTickets Fetches the name of the host club, the name of the guest club, the name of the stadium that will host the match and the start time of the match for all tickets.
CREATE VIEW allTickets AS
SELECT DISTINCT C1.name hostClub, C2.name guestClub, S.name stadium, M.startTime time
FROM ticket T
INNER JOIN match M	 ON T.match_id = M.id
INNER JOIN club C1	 ON M.hostClub_id = C1.id
INNER JOIN club C2	 ON M.guestClub_id = C2.id
INNER JOIN stadium S ON M.stadium_id = S.id;
GO;

--> 2.2g allCLubs Fetches the name and location for all clubs.
CREATE VIEW allClubs AS
SELECT DISTINCT C.name, C.location
FROM club C;
GO;

--> 2.2h allStadiums Fetches the name ,location, capacity and status (available or unavailable) for all stadiums.
CREATE VIEW allStadiums AS
SELECT DISTINCT S.name, S.location, S.capacity, S.status
FROM stadium S;
GO;

--> 2.2i allRequests Fetches the username of the club representative sending the request, username of the stadium manager receiving the request and the status of the request for all requests.
CREATE VIEW allRequests AS
SELECT DISTINCT CR.usernamee clubRepresentative, SM.username stadiumManager, HR.status
FROM hostRequest HR
INNER JOIN clubRepresentative CR ON HR.representative_id = CR.id
INNER JOIN stadiumManager SM ON HR.manager_id = SM.id;
GO;



--| 2.3 All Other Requirements |-------------------------------------------------------------------
--> 2.3i addAssociationManager
CREATE PROCEDURE addAssociationManager @name VARCHAR(20), @username VARCHAR(20), @password VARCHAR(20) AS
--TODO CREATE USER @username WITH PASSWORD = @password;
INSERT INTO systemUser VALUES (@username, @password);
INSERT INTO sportsAssociationManager VALUES (@name, @username);
GO;

--> 2.3ii addNewMatch
CREATE PROCEDURE addNewMatch @hostClubName VARCHAR(20), @guestClubName VARCHAR(20), @startTime DATETIME, @endTime DATETIME AS
--INSERT INTO match (startTime, endTime, hostClub_id) VALUES (@startTime, @endTime, SELECT C.name FROM club C WHERE C.name = @hostClubName);
--GO;

EXEC addAssociationManager @name="John", @password="123";

--| REFERENCE |------------------------------------------------------------------------------------

-- TABLES:	systemUser				(*username, password)
--			fan						(*national_id, name, birthDate, address, phoneNumber, status, .username)
--			stadiumManager			(*id, name, .stadium_id, .username)
--			clubRepresentative		(*id, name, .club_id, .username) 
--			sportsAssociationManager(*id, name, .username)
--			systemAdmin				(*id, name, .username)
--			stadium					(*id, name, location, capacity, status)
--			club					(*id, name, location)
--			ticket					(*id, status, .match_id)
--			match					(*id, startTime, endTime, .hostClub_id, .guestClub_id, .stadium_id)
--			ticketBuyingTransaction	(.fanNational_id, .ticket_id)
--			hostRequest				(*id, .representative_id, .manager_id, .match_id, status)



--| TESTING |--------------------------------------------------------------------------------------
