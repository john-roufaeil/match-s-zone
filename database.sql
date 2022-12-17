CREATE DATABASE testing1;
GO;
--| Guide |----------------------------------------------------------------------------------------
-- "-->" point from the milestone description
-- "--| |--" section





--| 2.1 Basic Structure of the Database |----------------------------------------------------------
--> 2.1a 
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
	FOREIGN KEY (guestClub_id) REFERENCES club, -- cannot cascade on two foreign keys referencing same attribute >> manual override in 2.3viii
	FOREIGN KEY (stadium_id) REFERENCES stadium ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE ticket (
	id INT IDENTITY,
	status BIT,
	match_id INT,
	PRIMARY KEY (id),
	FOREIGN KEY (match_id) REFERENCES match ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE ticketBuyingTransaction (
	fanNational_id VARCHAR(20), 
	ticket_id INT,
	PRIMARY KEY (fanNational_id, ticket_id),
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
	FOREIGN KEY (representative_id) REFERENCES clubRepresentative, -- gives multiple cascade error; not required in milestone anyway
	FOREIGN KEY (manager_id) REFERENCES stadiumManager, -- gives multiple cascade error; not required in milestone anyway
	FOREIGN KEY (match_id) REFERENCES match ON DELETE CASCADE ON UPDATE CASCADE
);
EXEC createAllTables;
DROP PROCEDURE createAllTables;
GO;

--> 2.1b 
CREATE PROCEDURE dropAllTables AS
DROP TABLE hostRequest;
DROP TABLE ticketBuyingTransaction;
DROP TABLE ticket;
DROP TABLE match;
DROP TABLE sportsAssociationManager;
DROP TABLE clubRepresentative;
DROP TABLE stadiumManager;
DROP TABLE systemAdmin;
DROP TABLE fan;
DROP TABLE stadium;
DROP TABLE club;
DROP TABLE systemUser;
EXEC dropAllTables;
DROP PROCEDURE dropAllTables;
GO;

--> 2.1c 
CREATE PROCEDURE dropAllProceduresFunctionsViews AS
-- TODO
EXEC dropAllProceduresFunctionsViews;
DROP PROCEDURE dropAllProceduresFunctionsViews;
GO;

--> 2.1d 
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
EXEC clearAllTables;
DROP PROCEDURE clearAllTables;
GO;





--| 2.2 Basic Data Retrieval |---------------------------------------------------------------------
--> 2.2a 
CREATE VIEW allAssocManagers AS
SELECT DISTINCT SPA.username, SU.password, SPA.name
FROM sportsAssociationManager SPA 
INNER JOIN systemUser SU ON SPA.username = SU.username;
GO;

--> 2.2b 
CREATE VIEW allClubRepresentatives AS
SELECT DISTINCT CR.username, SU.password, CR.name, C.name clubName
FROM clubRepresentative CR
INNER JOIN systemUser SU ON CR.username = SU.username
INNER JOIN club C ON CR.club_id = C.id;
GO;

--> 2.2c 
CREATE VIEW allStadiumManagers AS
SELECT DISTINCT SM.username, SU.password, SM.name, S.name stadiumName
FROM stadiumManager SM
INNER JOIN systemUser SU ON SM.username = SU.username
INNER JOIN stadium S ON stadiumManager.stadium_id = S.id;
GO;

--> 2.2d 
CREATE VIEW allFans AS
SELECT DISTINCT F.username, SU.password, F.name, F.national_id, F.birthDate, 
CASE 
	WHEN F.status=0 THEN 'blocked' 
	ELSE 'unblocked' 
END AS status
FROM fan F
INNER JOIN systemUser SU ON F.username = SU.username;
GO;

--> 2.2e 
CREATE VIEW allMatches AS
SELECT DISTINCT C1.name hostClub, C2.name guestClub, M.startTime
FROM match M
INNER JOIN club C1 ON C1.id = M.hostClub_id
INNER JOIN club C2 ON C2.id = M.guestClub_id;
GO;

--> 2.2f 
CREATE VIEW allTickets AS
SELECT DISTINCT C1.name hostClub, C2.name guestClub, S.name stadium, M.startTime time
FROM ticket T
INNER JOIN match M	 ON T.match_id = M.id
INNER JOIN club C1	 ON M.hostClub_id = C1.id
INNER JOIN club C2	 ON M.guestClub_id = C2.id
INNER JOIN stadium S ON M.stadium_id = S.id;
GO;

--> 2.2g
CREATE VIEW allClubs AS
SELECT DISTINCT C.name, C.location
FROM club C;
GO;

--> 2.2h 
CREATE VIEW allStadiums AS
SELECT DISTINCT S.name, S.location, S.capacity, 
CASE 
	WHEN S.status=0 THEN 'unavailable' 
	ELSE 'available' 
END AS status
FROM stadium S;
GO;

--> 2.2i
CREATE VIEW allRequests AS
SELECT DISTINCT CR.username clubRepresentative, SM.username stadiumManager, HR.status
FROM hostRequest HR
INNER JOIN clubRepresentative CR ON HR.representative_id = CR.id
INNER JOIN stadiumManager SM ON HR.manager_id = SM.id;
GO;





--| 2.3 All Other Requirements |----------------------------------------------------\ ADDITIONS \--

--> TESTME 2.3i 
CREATE PROCEDURE addAssociationManager @name VARCHAR(20), @user VARCHAR(20), @pw VARCHAR(20) AS
-- TODO CREATE USER "@username" WITH PASSWORD = '@password';
IF NOT EXISTS (SELECT 1 FROM systemUser SU WHERE SU.username=@user)
BEGIN 
INSERT INTO systemUser VALUES (@user, @pw); 
END
INSERT INTO sportsAssociationManager VALUES (@name, @user);
EXEC addAssociationManager 'john', 'jj', '123';
DROP PROCEDURE addAssociationManager;
GO;

--> TESTME 2.3ii  
CREATE PROCEDURE addNewMatch @hostClubName VARCHAR(20), @guestClubName VARCHAR(20), @startTime DATETIME, @endTime DATETIME AS
IF NOT EXISTS (SELECT 1 FROM club C WHERE C.name=@hostClubName)
BEGIN 
INSERT INTO club VALUES (@hostClubName, NULL); 
END
IF NOT EXISTS (SELECT 1 FROM club C WHERE C.name=@guestClubName)
BEGIN 
INSERT INTO club VALUES (@guestClubName, NULL); 
END
DECLARE @host_id INT;
DECLARE @guest_id INT;
SELECT @host_id=C1.id FROM club C1 WHERE C1.name = @hostClubName;
SELECT @guest_id=C2.id FROM club C2 WHERE C2.name = @guestClubName;
INSERT INTO match VALUES (@startTime, @endTime, @host_id, @guest_id, NULL);
EXEC addNewMatch 'arsenal', 'barcelona', '1-1-2022', '1-1-2022';
DROP PROCEDURE addNewMatch;
GO;

--> TESTME 2.3vi  
CREATE PROCEDURE addClub @name VARCHAR(20), @location VARCHAR(20) AS
INSERT INTO club VALUES (@name, @location);
EXEC addClub 'barcelona', 'BRC';
DROP PROCEDURE addClub;
GO;

--> TESTME 2.3vii  
CREATE PROCEDURE addTicket @hostClubName VARCHAR(20), @guestClubName VARCHAR(20), @startTime DATETIME AS
--IF NOT EXISTS (SELECT 1 FROM match M WHERE M.id=@match_id)
--BEGIN 
--INSERT INTO match VALUES (@startTime, NULL, @host_id, @guest_id, NULL); 
--END
DECLARE @match_id INT;
DECLARE @host_id INT;
DECLARE @guest_id INT;
SELECT @host_id=C1.id FROM club C1 WHERE C1.name = @hostClubName;
SELECT @guest_id=C2.id FROM club C2 WHERE C2.name = @guestClubName;
SELECT @match_id=M.id FROM match M WHERE M.startTime = @startTime AND M.hostClub_id = @host_id AND M.guestClub_id = @guest_id;
INSERT INTO ticket VALUES (1, @match_id);
EXEC addTicket 'arsenal', 'barcelona', '1-1-2022';
DROP PROCEDURE addTicket;
GO;

--> TESTME 2.3ix  
CREATE PROCEDURE addStadium @name VARCHAR(20), @loc VARCHAR(20), @cap INT AS
INSERT INTO stadium VALUES (@name, @loc, @cap, 1);
EXEC addStadium 'kahera', 'CAI', 3000;
DROP PROCEDURE addStadium;
GO;

--> TESTME 2.3xiii  
CREATE PROCEDURE addRepresentative @name VARCHAR(20), @c_name VARCHAR(20), @user VARCHAR(20), @pw VARCHAR(20) AS
IF NOT EXISTS (SELECT 1 FROM systemUser SU WHERE SU.username=@user)
BEGIN 
INSERT INTO systemUser VALUES (@user, @pw);
END
IF NOT EXISTS (SELECT 1 FROM club C WHERE C.name=@c_name)
BEGIN 
INSERT INTO club VALUES (@c_name, NULL);
END
DECLARE @club_id INT;
SELECT @club_id=C.id FROM club C WHERE C.name = @c_name;
INSERT INTO clubRepresentative VALUES (@name, @club_id, @user);
DROP PROCEDURE addRepresentative;
EXEC addRepresentative 'metwally', 'fari2gamed', 'mm', '123';
GO;

--> TESTME 2.3xv 
CREATE PROCEDURE addHostRequest @clubName VARCHAR(20), @stadiumName VARCHAR(20), @startTime DATETIME AS
DECLARE @rep_id INT;
DECLARE @mgr_id INT;
DECLARE @m_id INT;
DECLARE @c_id INT;
DECLARE @s_id INT;
SELECT @c_id=C.id FROM club C WHERE C.name = @clubName;
SELECT @rep_id=CR.id FROM clubRepresentative CR WHERE CR.club_id = @c_id;
SELECT @s_id=S.id FROM stadium S WHERE S.name = @stadiumName;
SELECT @mgr_id=SM.id FROM stadiumManager SM WHERE SM.stadium_id = @s_id;
SELECT @m_id=M.id FROM match M WHERE @c_id=M.hostClub_id AND @startTime=M.startTime AND @s_id=M.stadium_id;
INSERT INTO hostRequest (representative_id, manager_id, match_id) VALUES (@rep_id, @mgr_id, m_id);
DROP PROCEDURE addHostRequest;
EXEC addHostRequest 'arsenal', 'kahera', '1-1-2022';
GO;

--> TESTME 2.3xvii 
CREATE PROCEDURE addStadiumManager(@name VARCHAR(20), @stadiumName VARCHAR(20), @user VARCHAR(20), @pw VARCHAR(20)) AS
IF NOT EXISTS (SELECT 1 FROM systemUser SU WHERE SU.username=@user)
BEGIN 
INSERT INTO systemUser VALUES (@user, @pw); 
END
IF NOT EXISTS (SELECT 1 FROM stadium S WHERE S.name=@stadiumName)
BEGIN 
INSERT INTO stadium VALUES (@stadiumName, NULL, NULL, 1); 
END
DECLARE @stadium_id INT;
SELECT @stadium_id=S.id FROM stadium S WHERE @stadiumName = S.name;
INSERT INTO stadiumManager VALUES (@name, @stadium_id, @user);
EXEC addStadiumManager 'slim', 'kahera', 'balabizo', 'balabizoawi';
DROP PROCEDURE addStadiumManager;
GO;

--> TESTME 2.3xxi
CREATE PROCEDURE addFan (@name VARCHAR(20), @user VARCHAR(20), @pw VARCHAR(20), @nat_id VARCHAR(20), @bdate DATETIME, @address VARCHAR(20), @phone INT) AS
IF NOT EXISTS (SELECT 1 FROM systemUser SU WHERE SU.username=@user)
BEGIN 
INSERT INTO systemUser VALUES (@user, @pw);
END
INSERT INTO fan VALUES (@nat_id, @name, @bdate, @address, @phone, 1, @user);
DROP PROCEDURE addFan;
EXEC addFan 'janjoon', 'j123', 'j123', '123457', '20000101 12:12:12 AM', 'share3', 012;
GO;


--| 2.3 All Other Requirements |----------------------------------------------------\ DELETIONS \--

--> TESTME 2.3iv  
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

--> TESTME 2.3v  
CREATE PROCEDURE deleteMatchesOnStadium @stadium VARCHAR(20) AS
DECLARE @s_id INT;
SELECT @s_id=S.id FROM stadium S WHERE S.name = @stadium;
DELETE FROM match
WHERE match.stadium_id = @s_id AND CURRENT_TIMESTAMP < match.startTime;
DROP PROCEDURE deleteMatchesOnStadium;
EXEC deleteMatchesOnStadium;
GO;

--> TESTME 2.3viii  
CREATE PROCEDURE deleteClub @name VARCHAR(20) AS
DECLARE @club_id INT;
SELECT @club_id=C.id FROM club C WHERE C.name = @name;
DELETE FROM match
WHERE match.guestClub_id = @club_id;
DELETE FROM club 
WHERE club.name = @name;
--DELETE FROM clubRepresentative
--WHERE clubRepresentative.club_id = @club_id;
DROP PROCEDURE deleteClub;
EXEC deleteClub;
GO;

--> TESTME 2.3x 
CREATE PROCEDURE deleteStadium @name VARCHAR(20) AS
DELETE FROM stadium
WHERE stadium.name = @name;
GO;

--| 2.3 All Other Requirements |------------------------------------------------\ ADMINSTRATION \--

--> TESTME 2.3iii
CREATE VIEW clubsWithNoMatches AS
SELECT DISTINCT C.name
FROM club C
WHERE NOT EXISTS (SELECT * FROM match M WHERE M.hostClub_id = C.id OR M.guestClub_id = C.id);
GO;
DROP VIEW clubsWithNoMatches;
--
GO;

--> TESTME 2.3xi
CREATE PROCEDURE blockFan @n_id VARCHAR(20) AS
UPDATE fan
SET fan.status = 0
WHERE fan.national_id = @n_id;
DROP PROCEDURE blockFan;
EXEC blockFan 123456789;
GO;

--> TESTME 2.3xii
CREATE PROCEDURE unblockFan @n_id VARCHAR(20) AS
UPDATE fan
SET fan.status = 1
WHERE fan.national_id = @n_id;
DROP PROCEDURE unblockFan;
EXEC unblockFan 123456789;
GO;

--> TESTME 2.3xiv
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

--> TESTME 2.3xvi
CREATE FUNCTION allUnassignedMatches(@hostClubName VARCHAR(20))
RETURNS TABLE AS
RETURN 
	SELECT GC.name guestClubName, M.startTime
	FROM match M 
	INNER JOIN club HC ON M.hostClub_id	 = HC.id
	INNER JOIN club GC ON M.guestClub_id = GC.id
	WHERE HC.name = @hostClubName AND M.stadium_id = NULL;
GO;

--> TESTME 2.3xviii
CREATE FUNCTION allPendingRequests(@userStadiumManager VARCHAR(20))
RETURNS TABLE AS
RETURN 
	SELECT CR.name clubRepresentative, GC.name guestClub, M.startTime
	FROM hostRequest HR 
	INNER JOIN clubRepresentative CR ON HR.representative_id = CR.id
	INNER JOIN match M ON HR.match_id = M.id
	INNER JOIN club GC ON M.guestClub_id = GC.id
	INNER JOIN stadiumManager SM ON HR.manager_id = SM.id
	WHERE (HR.status IS NULL OR HR.status = 'unhandled') AND @userStadiumManager = SM.username;
GO;

--> TESTME 2.3xix
CREATE PROCEDURE acceptRequest(@SM_user VARCHAR(20), @HC_name VARCHAR(20), @GC_name VARCHAR(20), @startTime DATETIME) AS
DECLARE @SM_id INT, @HC_id INT, @GC_id INT, @M_id INT, @S_id INT, @HCR_id INT;
SELECT @SM_id=SM.id FROM stadiumManager SM WHERE SM.username = @SM_user;
SELECT @HC_id=HC.id FROM club HC WHERE HC.name = @HC_name;
SELECT @GC_id=GC.id FROM club GC WHERE GC.name = @GC_name;
SELECT @M_id=M.id FROM match M WHERE M.hostClub_id = @HC_id AND M.guestClub_id = @GC_id AND M.startTime = @startTime;
SELECT @S_id=SM.stadium_id FROM stadiumManager SM WHERE SM.id = @SM_id;
SELECT @HCR_id=CR.id FROM clubRepresentative CR INNER JOIN club C ON C.id=CR.club_id WHERE C.name=@HC_name;
UPDATE hostRequest
SET hostRequest.status = 'accepted'
WHERE hostRequest.manager_id = @SM_id AND hostRequest.match_id = @M_id AND hostRequest.representative_id = @HCR_id;
UPDATE match
SET match.stadium_id = @S_id
WHERE match.id = @M_id;
DECLARE @i INT = 0, @tickets INT = (SELECT S.capacity FROM stadium S WHERE @S_id = S.id);
WHILE @i < @tickets
BEGIN
EXEC addTicket @HC_name, @GC_name, @startTime;
SET @i  = @i + 1;
END;
DROP PROCEDURE acceptRequest;
EXEC acceptRequest 'jjjj', 'barcelona', 'arsenal', '2-2-2021';
GO;

--> TESTME 2.3xx 
CREATE PROCEDURE rejectRequest (@SM_user VARCHAR(20), @HC_name VARCHAR(20), @GC_name VARCHAR(20), @startTime DATETIME) AS
DECLARE @SM_id INT, @HC_id INT, @GC_id INT, @M_id INT, @S_id INT, @HCR_id INT;
SELECT @SM_id=SM.id FROM stadiumManager SM WHERE SM.username = @SM_user;
SELECT @HC_id=HC.id FROM club HC WHERE HC.name = @HC_name;
SELECT @GC_id=GC.id FROM club GC WHERE GC.name = @GC_name;
SELECT @M_id=M.id FROM match M WHERE M.hostClub_id = @HC_id AND M.guestClub_id = @GC_id AND M.startTime = @startTime;
SELECT @HCR_id=CR.id FROM clubRepresentative CR INNER JOIN club C ON C.id=CR.club_id WHERE C.name=@HC_name;
UPDATE hostRequest
SET hostRequest.status = 'rejected'
WHERE hostRequest.manager_id = @SM_id AND hostRequest.match_id = @M_id AND hostRequest.representative_id = @HCR_id;
DROP PROCEDURE rejectRequest;
EXEC acceptRequest 'jjjj', 'barcelona', 'arsenal', '2-2-2021';
GO;

--> TESTME 2.3xxii
CREATE FUNCTION upcomingMatchesOfClub (@clubName VARCHAR(20))
RETURNS TABLE AS
RETURN
	(SELECT C1.name club, C2.name competent, M.startTime, S.name
	FROM match M
	INNER JOIN club C1 ON M.hostClub_id	 = C1.id
	INNER JOIN club C2 ON M.guestClub_id = C2.id
	INNER JOIN stadium S ON S.id = M.stadium_id
	WHERE M.startTime > CURRENT_TIMESTAMP AND C1.name = @clubName)
	UNION
	(SELECT C1.name club, C2.name competent, M.startTime, S.name
	FROM match M
	INNER JOIN club C1 ON M.guestClub_id = C1.id
	INNER JOIN club C2 ON M.hostClub_id  = C2.id
	INNER JOIN stadium S ON S.id = M.stadium_id
	WHERE M.startTime > CURRENT_TIMESTAMP AND C1.name = @clubName)
GO;
DROP FUNCTION upcomingMatchesOfClub;
GO;

--> TESTME 2.3xxiii
CREATE FUNCTION availableMatchesToAttend (@DT DATETIME)
RETURNS TABLE AS
RETURN	
	SELECT HC.name hostClubName, GC.name guestClubName, M.startTime, S.name
	FROM match M
	INNER JOIN club HC ON M.hostClub_id  = HC.id
	INNER JOIN club GC ON M.guestClub_id = GC.id
	INNER JOIN stadium S ON M.stadium_id = S.id
	INNER JOIN ticket T ON M.id = T.match_id
	WHERE M.startTime >= @DT and T.status=1;
GO;
DROP FUNCTION availableMatchesToAttend;
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

-- DEPENDENCY:	fan									DEPENDS ON			systemUser
--				stadiumManager						DEPENDS ON			systemuser, stadium
--				clubRepresentative					DEPENDS ON			systemUser, club
--				sportsAssociationManager			DEPENDS ON			systemUser
--				systemAdmin							DEPENDS ON			systemUser
--				match								DEPENDS ON			club (host and guest)
--				ticket								DEPENDS ON			match
--				ticketBuyingTransaction				DEPENDS ON			fan, ticket
--				hostRequest							DEPENDS ON			match, clubRepresentative, stadiumManager




--| TESTING |--------------------------------------------------------------------------------------
EXEC createAllTables;
EXEC dropAllTables;
EXEC dropAllProcedureFunctionsViews;
EXEC clearAllTables;




--| TODO |-----------------------------------------------------------------------------------------

-- make sure delete[x] deletes what is based on x
-- make sure y exists when add[x] if x depends on y
-- make sure of restrictions on tables