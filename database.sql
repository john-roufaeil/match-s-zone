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
	password VARCHAR(20) NOT NULL,
	PRIMARY KEY(username)
);
CREATE TABLE fan (
	national_id VARCHAR(20),
	name VARCHAR(20),
	birthDate DATE,
	address VARCHAR(20),
	phoneNumber INT,
	status BIT,
	username VARCHAR(20),
	PRIMARY KEY (national_id),
	FOREIGN KEY (username) REFERENCES systemUser ON DELETE CASCADE ON UPDATE CASCADE
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
	FOREIGN KEY (username) REFERENCES systemUser ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (stadium_id) REFERENCES stadium ON DELETE CASCADE ON UPDATE CASCADE
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
	FOREIGN KEY	(username) REFERENCES systemUser  ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY	(club_id) REFERENCES club  ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE sportsAssociationManager (
	id INT IDENTITY,
	name VARCHAR(20),
	username VARCHAR(20),
	PRIMARY KEY (id),
	FOREIGN KEY (username) REFERENCES systemUser ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE systemAdmin (
	id INT IDENTITY,
	name VARCHAR(20),
	username VARCHAR(20),
	PRIMARY KEY (id),
	FOREIGN KEY (username) REFERENCES systemUser ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE match (
	id INT IDENTITY,
	startTime DATETIME,
	endTime DATETIME,
	hostClub_id INT,
	guestClub_id INT,
	stadium_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (hostClub_id) REFERENCES club ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (guestClub_id) REFERENCES club ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (stadium_id) REFERENCES stadium ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE ticket (
	id INT IDENTITY,
	status BIT,
	match_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (match_id) REFERENCES match  ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE ticketBuyingTransaction (
	fanNational_id INT, 
	ticket_id INT,
	FOREIGN KEY (fanNational_id) REFERENCES fan  ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (ticket_id) REFERENCES ticket  ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE hostRequest (
	id INT IDENTITY,
	representative_id INT,
	manager_id INT,
	match_id INT,
	status VARCHAR(20) DEFAULT 'unhandled',
	PRIMARY KEY (id),
	FOREIGN KEY (representative_id) REFERENCES clubRepresentative ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (manager_id) REFERENCES stadiumManager ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (match_id) REFERENCES match ON DELETE CASCADE ON UPDATE CASCADE
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
SELECT DISTINCT CR.username, SU.password, CR.name, C.name clubName
FROM clubRepresentative CR
INNER JOIN systemUser SU ON CR.username = SU.username
INNER JOIN club C ON CR.club_id = C.id;
GO;

--> 2.2c allStadiumManagers
CREATE VIEW allStadiumManagers AS
SELECT DISTINCT SM.username, SU.password, SM.name, S.name stadiumName
FROM stadiumManager SM
INNER JOIN systemUser SU ON SM.username = SU.username
INNER JOIN stadium S ON stadiumManager.stadium_id = S.id;
GO;

--> 2.2d allFans
CREATE VIEW allFans AS
SELECT DISTINCT F.username, SU.password, F.name, F.national_id, F.birthDate, 
CASE 
	WHEN F.status=0 THEN 'blocked' 
	ELSE 'unblocked' 
END AS status
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
SELECT DISTINCT S.name, S.location, S.capacity, 
CASE 
	WHEN S.status=0 THEN 'unavailable' 
	ELSE 'available' 
END AS status
FROM stadium S;
GO;

--> 2.2i allRequests Fetches the username of the club representative sending the request, username of the stadium manager receiving the request and the status of the request for all requests.
CREATE VIEW allRequests AS
SELECT DISTINCT CR.username clubRepresentative, SM.username stadiumManager, HR.status
FROM hostRequest HR
INNER JOIN clubRepresentative CR ON HR.representative_id = CR.id
INNER JOIN stadiumManager SM ON HR.manager_id = SM.id;
GO;





--| 2.3 All Other Requirements |-------------------------------------------------------------------
--\ ADDITIONS \--
--> TESTME 2.3i addAssociationManager
CREATE PROCEDURE addAssociationManager @name VARCHAR(20), @user VARCHAR(20), @pw VARCHAR(20) AS
-- TODO CREATE USER "@username" WITH PASSWORD = '@password';
IF NOT EXISTS (SELECT username FROM systemUser WHERE @user = systemUser.username)
INSERT INTO systemUser VALUES (@user, @pw);
INSERT INTO sportsAssociationManager VALUES (@name, @user);
DROP PROCEDURE addAssociationManager;
EXEC addAssociationManager 'john', 'jj', '123';
GO;

--> TESTME 2.3ii addNewMatch 
CREATE PROCEDURE addNewMatch @hostClubName VARCHAR(20), @guestClubName VARCHAR(20), @startTime DATETIME, @endTime DATETIME AS
DECLARE @host_id INT;
DECLARE @guest_id INT;
SELECT @host_id=C1.id FROM club C1 WHERE C1.name = @hostClubName;
SELECT @guest_id=C2.id FROM club C2 WHERE C2.name = @guestClubName;
INSERT INTO match VALUES (@startTime, @endTime, @host_id, @guest_id, NULL);
DROP PROCEDURE addNewMatch;
EXEC addNewMatch 'arsenal', 'barcelona', '1-1-2022', '1-1-2022';
GO;

--> TESTME 2.3vi addClub 
CREATE PROCEDURE addClub @name VARCHAR(20), @location VARCHAR(20) AS
INSERT INTO club VALUES (@name, @location);
DROP PROCEDURE addClub;
EXEC addClub 'barcelona', 'BRC';
GO;

--> TESTME 2.3vii addTicket 
CREATE PROCEDURE addTicket @hostClubName VARCHAR(20), @guestClubName VARCHAR(20), @startTime DATETIME AS
DECLARE @match_id INT;
DECLARE @host_id INT;
DECLARE @guest_id INT;
SELECT @host_id=C1.id FROM club C1 WHERE C1.name = @hostClubName;
SELECT @guest_id=C2.id FROM club C2 WHERE C2.name = @guestClubName;
SELECT @match_id=M.id FROM match M WHERE M.startTime = @startTime AND M.hostClub_id = @host_id AND M.guestClub_id = @guest_id;
INSERT INTO ticket VALUES (1, @match_id);
DROP PROCEDURE addTicket;
EXEC addTicket 'arsenal', 'barcelona', '1-1-2022';
GO;

--> TESTME 2.3ix addStadium 
CREATE PROCEDURE addStadium @name VARCHAR(20), @loc VARCHAR(20), @cap INT AS
INSERT INTO stadium VALUES (@name, @loc, @cap, 1);
DROP PROCEDURE addStadium;
EXEC addStadium 'kahera', 'CAI', 3000;
GO;

--> TESTME 2.3xiii addRepresentative 
CREATE PROCEDURE addRepresentative @name VARCHAR(20), @c_name VARCHAR(20), @user VARCHAR(20), @pw VARCHAR(20) AS
DECLARE @club_id INT;
SELECT @club_id=C.id FROM club C WHERE C.name = @c_name;
-- TODO CREATE USER
INSERT INTO systemUser VALUES (@user, @pw);
INSERT INTO clubRepresentative VALUES (@name, @club_id, @user);
DROP PROCEDURE addRepresentative;
EXEC addRepresentative 'metwally', 'fari2gamed', 'mm', '123';
GO;



--\ DELETIONS \--
--> TESTME 2.3iv deleteMatch 
CREATE PROCEDURE deleteMatch @hostClubName VARCHAR(20), @guestClubName VARCHAR(20) AS
DECLARE @host_id INT;
DECLARE @guest_id INT;
SELECT @host_id=C1.id FROM club C1 WHERE C1.name = @hostClubName;
SELECT @guest_id=C2.id FROM club C2 WHERE C2.name = @guestClubName;
DELETE FROM match
WHERE match.hostClub_id = @host_id AND match.guestClub_id = @guest_id;
DROP PROCEDURE deleteMatch;
EXEC deleteMatch;
GO;

--> TESTME 2.3v deleteMatchesOnStadium 
CREATE PROCEDURE deleteMatchesOnStadium @stadium VARCHAR(20) AS
DECLARE @s_id INT;
SELECT @s_id=S.id FROM stadium S WHERE S.name = @stadium;
DELETE FROM match
WHERE match.stadium_id = @s_id AND CURRENT_TIMESTAMP < match.startTime;
DROP PROCEDURE deleteMatchesOnStadium;
EXEC deleteMatchesOnStadium;
GO;

--> TESTME 2.3viii deleteClub 
CREATE PROCEDURE deleteClub @name VARCHAR(20) AS
DECLARE @club_id INT;
DECLARE @user VARCHAR(20);
SELECT @club_id=C.id FROM club C WHERE C.name = @name;
--SELECT @user= 
DELETE FROM club 
WHERE club.name = @name;
DELETE FROM clubRepresentative
WHERE clubRepresentative.club_id = @club_id;
DROP PROCEDURE deleteClub;
EXEC deleteClub;
GO;

--> TESTME 2.3x deleteStadium 
CREATE PROCEDURE deleteStadium @name VARCHAR(20) AS
DELETE FROM stadium
WHERE stadium.name = @name;
GO;


--\ ADMINSTRATION \--
--> TESTME 2.3iii clubsWithNoMatches
CREATE VIEW clubsWithNoMatches AS
SELECT DISTINCT C.name
FROM club C
WHERE NOT EXISTS (SELECT * FROM match M WHERE M.hostClub_id = C.id OR M.guestClub_id = C.id);
GO;
DROP VIEW clubsWithNoMatches;
--
GO;

--> TESTME 2.3xi blockFan
CREATE PROCEDURE blockFan @n_id VARCHAR(20) AS
UPDATE fan
SET fan.status = 0
WHERE fan.national_id = @n_id;
DROP PROCEDURE blockFan;
EXEC blockFan 123456789;
GO;

--> TESTME 2.3xii unblockFan
CREATE PROCEDURE unblockFan @n_id VARCHAR(20) AS
UPDATE fan
SET fan.status = 1
WHERE fan.national_id = @n_id;
DROP PROCEDURE unblockFan;
EXEC unblockFan 123456789;
GO;

--> TESTME 2.3xiv viewAvailableStadiumsOn 
CREATE FUNCTION viewAvailableStadiumsOn(@date DATETIME)
RETURNS TABLE AS
RETURN
	SELECT DISTINCT SA.name, SA.location, SA.capacity
	FROM Stadium SA
	EXCEPT 
	(SELECT DISTINCT S.name, S.location, S.capacity
	FROM stadium S
	INNER JOIN match M ON S.id = M.stadium_id
	WHERE M.startTime = @date);
GO;














--| SCHEMA |---------------------------------------------------------------------------------------

-- TABLES:		systemUser				(*username, password)
--				fan						(*national_id, name, birthDate, address, phoneNumber, status, .username)
--				stadiumManager			(*id, name, .stadium_id, .username)
--				clubRepresentative		(*id, name, .club_id, .username) 
--				sportsAssociationManager(*id, name, .username)
--				systemAdmin				(*id, name, .username)
--				stadium					(*id, name, location, capacity, status)
--				club					(*id, name, location)
--				ticket					(*id, status, .match_id)
--				match					(*id, startTime, endTime, .hostClub_id, .guestClub_id, .stadium_id)
--				ticketBuyingTransaction	(.fanNational_id, .ticket_id)
--				hostRequest				(*id, .representative_id, .manager_id, .match_id, status)

-- REFERENCES:	fan.username						REFERENCES			systemUser.username			OK
--				stadiumManager.username				REFERENCES			systemUser.username			OK
--				stadiumManager.stadium_id			REFERENCES			stadium.id					OK
--				clubRepresentative.username			REFERENCES			systemUser.username			OK
--				clubRepresentative.club_id			REFERENCES			club.id						OK	
--				sportsAssociationManager.username	REFERENCES			systemUser.username			OK
-- 				systemAdmin.username				REFERENCES			systemUser.username			OK
--				match.hostClub_id					REFERENCES			club.id						OK
--				match.guestClub_id					REFERENCES			club.id						OK
--				match.stadium_id					REFERENCES			stadium.id					OK
--				ticket.match_id						REFERENCES			match.id					OK	
--				ticketBuyTransaction.fanNational_id REFERENCES			fan.national_id				OK
--				ticketBuyTransaction.ticket_id		REFERENCES			ticket.id					OK
--				hostRequest.representative_id		REFERENCES			clubRepresentative.id,		OK
--				hostRequest.manager_id				REFERENCES			stadiumManager.id			OK
--				hostRequest.match_id				REFERENCES			match.id					OK

-- SUPER:		systemUser.username					NECESSARY FOR		fan, stadiumManager, clubRepresentative, sportsAssociationManager,systemAdmin
--				stadium.id							NECESSARY FOR		stadiumManager, match
--				club.id								NECESSARY FOR		clubRepresentative, match
--				match.id							NECESSARY FOR		ticket, hostRequest
--				fan.national_id						NECESSARY FOR		ticketBuyTransaction
--				ticket.id							NECESSARY FOR		ticketBuyTransaction
--				clubRepresentative.id				NECESSARY FOR		hostRequest				
--				stadiumManager.id					NECESSARY FOR		hostRequest





--| TESTING |--------------------------------------------------------------------------------------





--| TODO |-----------------------------------------------------------------------------------------

-- make sure delete[x] deletes what is based on x
-- make sure y exists when add[x] if x depends on y