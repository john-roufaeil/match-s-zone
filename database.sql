--| 2.1 Basic Structure of the Database |----------------------------------------------------------
--> 2.1a 
CREATE PROCEDURE createAllTables AS
CREATE TABLE systemUser (
	username VARCHAR(20),
	password VARCHAR(20) NOT NULL,
--	CHECK(LEN(password) >= 8)
	PRIMARY KEY(username)
);
CREATE TABLE fan (
	national_id VARCHAR(20),
	name VARCHAR(20) NOT NULL,
	birthDate DATETIME,
	address VARCHAR(20),
	phoneNumber INT,
	status BIT NOT NULL DEFAULT 1,
	username VARCHAR(20) NOT NULL UNIQUE,
--	CHECK(YEAR(CURRENT_TIMESTAMP) - YEAR(birthDate) > 16),
	PRIMARY KEY (national_id),
	FOREIGN KEY (username) REFERENCES systemUser ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE stadium (
	id INT IDENTITY,
	name VARCHAR(20) UNIQUE NOT NULL,
	location VARCHAR(20),
	capacity INT NOT NULL,
	status BIT NOT NULL DEFAULT 1,
	PRIMARY KEY (id)
);
CREATE TABLE stadiumManager (
	id INT IDENTITY,
	name VARCHAR(20) NOT NULL,
	stadium_id INT UNIQUE, -- each stadium managed by one and only one manager and each manager manages one and only one stadium
	username VARCHAR(20) NOT NULL UNIQUE NONCLUSTERED,
	PRIMARY KEY (id),
	FOREIGN KEY (username) REFERENCES systemUser ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (stadium_id) REFERENCES stadium ON DELETE SET NULL ON UPDATE CASCADE
); 
CREATE TABLE club (
	id INT IDENTITY (1,1),
	name VARCHAR(20) UNIQUE NOT NULL,
	location VARCHAR(20),
	PRIMARY KEY (id)
);
CREATE TABLE clubRepresentative (
	id INT IDENTITY,
	name VARCHAR(20) NOT NULL,
	club_id INT UNIQUE, -- each club represented by one and only one rep and each rep represents one and only one club
	username VARCHAR(20) NOT NULL UNIQUE NONCLUSTERED,
	PRIMARY KEY (id),
	FOREIGN KEY	(username) REFERENCES systemUser ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY	(club_id) REFERENCES club ON DELETE SET NULL ON UPDATE CASCADE
); 
CREATE TABLE sportsAssociationManager (
	id INT IDENTITY,
	name VARCHAR(20) NOT NULL,
	username VARCHAR(20) NOT NULL UNIQUE,
	PRIMARY KEY (id),
	FOREIGN KEY (username) REFERENCES systemUser ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE systemAdmin (
	id INT IDENTITY,
	name VARCHAR(20) NOT NULL,
	username VARCHAR(20) NOT NULL UNIQUE,
	PRIMARY KEY (id),
	FOREIGN KEY (username) REFERENCES systemUser ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE match (
	id INT IDENTITY,
	startTime DATETIME,
	endTime DATETIME,
	hostClub_id INT NOT NULL,
	guestClub_id INT NOT NULL,
	stadium_id INT,
	CHECK (endTime > startTime),
--	CHECK (hostclub_id != guestclub_id),
	PRIMARY KEY (id),
	FOREIGN KEY (hostClub_id) REFERENCES club ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (guestClub_id) REFERENCES club, -- cannot cascade on two foreign keys referencing same attribute >> manual override in 2.3viii
	FOREIGN KEY (stadium_id) REFERENCES stadium ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE ticket (
	id INT IDENTITY,
	status BIT NOT NULL DEFAULT 1,
	match_id INT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (match_id) REFERENCES match ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE ticketBuyingTransaction (
	fanNational_id VARCHAR(20), 
	ticket_id INT,
	PRIMARY KEY (fanNational_id, ticket_id),
	FOREIGN KEY (fanNational_id) REFERENCES fan ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (ticket_id) REFERENCES ticket ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE hostRequest (
	id INT IDENTITY,
	representative_id INT NOT NULL,
	manager_id INT NOT NULL,
	match_id INT NOT NULL,
	status VARCHAR(20) DEFAULT 'unhandled' CHECK(status IN ('accepted', 'rejected', 'unhandled')),
	PRIMARY KEY (id),
	FOREIGN KEY (representative_id) REFERENCES clubRepresentative, -- gives multiple cascade error to cascade; not required to delete representative in milestone anyway
	FOREIGN KEY (manager_id) REFERENCES stadiumManager, -- gives multiple cascade error to cascade; not required to delete manager in milestone anyway
	FOREIGN KEY (match_id) REFERENCES match ON DELETE CASCADE ON UPDATE CASCADE
);
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
GO;

--> 2.1c 
CREATE PROCEDURE dropAllProceduresFunctionsViews AS
DROP PROCEDURE	createAllTables;
DROP PROCEDURE	dropAllTables;
DROP PROCEDURE	clearAllTables;
DROP VIEW		allAssocManagers;
DROP VIEW		allClubRepresentatives;
DROP VIEW		allStadiumManagers;
DROP VIEW		allFans;
DROP VIEW		allMatches;
DROP VIEW		allTickets;
DROP VIEW		allCLubs;
DROP VIEW		allStadiums;
DROP VIEW		allRequests;
DROP PROCEDURE	addAssociationManager;
DROP PROCEDURE	addNewMatch;
DROP VIEW		clubsWithNoMatches;
DROP PROCEDURE	deleteMatch;
DROP PROCEDURE	deleteMatchesOnStadium;
DROP PROCEDURE	addClub;
DROP PROCEDURE	addTicket;
DROP PROCEDURE	deleteClub;
DROP PROCEDURE	addStadium;
DROP PROCEDURE	deleteStadium;
DROP PROCEDURE	blockFan;
DROP PROCEDURE	unblockFan;
DROP PROCEDURE	addRepresentative;
DROP FUNCTION	viewAvailableStadiumsOn;
DROP PROCEDURE	addHostRequest;
DROP FUNCTION	allUnassignedMatches;
DROP PROCEDURE	addStadiumManager;
DROP FUNCTION	allPendingRequests;
DROP PROCEDURE	acceptRequest;
DROP PROCEDURE	rejectRequest;
DROP PROCEDURE	addFan;
DROP FUNCTION	upcomingMatchesOfClub;
DROP FUNCTION	availableMatchesToAttend;
DROP PROCEDURE	purchaseTicket;
DROP PROCEDURE	updateMatchTiming;
DROP VIEW		matchesPerTeam;
DROP PROCEDURE	deleteMatchesOn;	
DROP VIEW		matchWithMostSoldTickets;
DROP VIEW		matchesRankedBySoldTickets;
DROP PROCEDURE	clubWithTheMostSoldTickets;
DROP VIEW		clubsRankedBySoldTickets;
DROP FUNCTION	stadiumsNeverPlayedOn;
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
GO;

--| 2.2 Basic Data Retrieval |---------------------------------------------------------------------
--> 2.2a 
CREATE VIEW allAssocManagers AS
SELECT DISTINCT SAM.username, SU.password, SAM.name
FROM sportsAssociationManager SAM 
INNER JOIN systemUser SU ON SAM.username = SU.username;
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
INNER JOIN stadium S ON SM.stadium_id = S.id;
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
SELECT DISTINCT HC.name hostClub, GC.name guestClub, M.startTime
FROM match M
INNER JOIN club HC ON HC.id = M.hostClub_id
INNER JOIN club GC ON GC.id = M.guestClub_id;
GO;

--> 2.2f 
CREATE VIEW allTickets AS
SELECT HC.name hostClub, GC.name guestClub, S.name stadium, M.startTime
FROM ticket T
INNER JOIN match M	 ON T.match_id = M.id
INNER JOIN club HC	 ON M.hostClub_id = HC.id
INNER JOIN club GC	 ON M.guestClub_id = GC.id
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
--> 2.3i 
CREATE PROCEDURE addAssociationManager @name VARCHAR(20), @user VARCHAR(20), @pw VARCHAR(20) AS
IF NOT EXISTS (SELECT 1 FROM systemUser SU WHERE SU.username=@user)
BEGIN 
--DECLARE @createLogin nvarchar(500); SET @createLogin = N'CREATE LOGIN ' + QUOTENAME(@user) + ' WITH PASSWORD = ' + QUOTENAME(@pw, ''''); EXEC(@createLogin);
--DECLARE @createUser nvarchar(500); SET @createUser = N'CREATE USER ' + QUOTENAME(@user) + ' FOR LOGIN ' + QUOTENAME(@user); EXEC(@createUser);
INSERT INTO systemUser VALUES (@user, @pw); 
END
INSERT INTO sportsAssociationManager VALUES (@name, @user);
--DECLARE @grant1 nvarchar(500); SET @grant1 = (N'GRANT EXECUTE ON addNewMatch TO ' + QUOTENAME(@user)); EXEC(@grant1);
--DECLARE @grant2 nvarchar(500); SET @grant2 = (N'GRANT EXECUTE ON deleteMatch TO ' + QUOTENAME(@user)); EXEC(@grant2);
--DECLARE @grant3 nvarchar(500); SET @grant3 = (N'GRANT SELECT, INSERT, DELETE, UPDATE ON match TO ' + QUOTENAME(@user)); EXEC(@grant3);
--DECLARE @grant4 nvarchar(500); SET @grant4 = (N'GRANT EXECUTE ON deleteMatchesOn TO ' + QUOTENAME(@user)); EXEC(@grant4);
--DECLARE @grant5 nvarchar(500); SET @grant5 = (N'GRANT SELECT ON allMatches TO ' + QUOTENAME(@user)); EXEC(@grant5);
--DECLARE @grant6 nvarchar(500); SET @grant6 = (N'GRANT SELECT ON allUnassignedMatches TO ' + QUOTENAME(@user)); EXEC(@grant6);
--DECLARE @grant7 nvarchar(500); SET @grant7 = (N'GRANT SELECT ON upcomingMatchesOfClub TO ' + QUOTENAME(@user)); EXEC(@grant7);
--DECLARE @grant8 nvarchar(500); SET @grant8 = (N'GRANT SELECT ON availableMatchesToAttend TO ' + QUOTENAME(@user)); EXEC(@grant8);
--DECLARE @grant9 nvarchar(500); SET @grant9 = (N'GRANT EXECUTE ON updateMatchTiming TO ' + QUOTENAME(@user)); EXEC(@grant9);
--DECLARE @grantA nvarchar(500); SET @grantA = (N'GRANT SELECT ON matchesPerTeam TO ' + QUOTENAME(@user)); EXEC(@grantA);
--DECLARE @grantB nvarchar(500); SET @grantB = (N'GRANT SELECT ON matchWithMostSoldTickets TO ' + QUOTENAME(@user)); EXEC(@grantB);
--DECLARE @grantC nvarchar(500); SET @grantC = (N'GRANT SELECT ON matchesRankedBySoldTickets TO ' + QUOTENAME(@user)); EXEC(@grantC);
GO;

--> 2.3ii 
CREATE PROCEDURE addNewMatch @hostClubName VARCHAR(20), @guestClubName VARCHAR(20), @startTime DATETIME, @endTime DATETIME AS
DECLARE @host_id INT, @guest_id INT;
IF NOT EXISTS (SELECT 1 FROM club C WHERE C.name=@hostClubName)
BEGIN 
INSERT INTO club VALUES (@hostClubName, NULL); 
END
IF NOT EXISTS (SELECT 1 FROM club C WHERE C.name=@guestClubName)
BEGIN 
INSERT INTO club VALUES (@guestClubName, NULL); 
END
SELECT @host_id=C1.id FROM club C1 WHERE C1.name = @hostClubName;
SELECT @guest_id=C2.id FROM club C2 WHERE C2.name = @guestClubName;
INSERT INTO match VALUES (@startTime, @endTime, @host_id, @guest_id, NULL);
GO;

--> 2.3vi 
CREATE PROCEDURE addClub @name VARCHAR(20), @location VARCHAR(20) AS
INSERT INTO club VALUES (@name, @location);
GO;

--> 2.3vii 
CREATE PROCEDURE addTicket @hostClubName VARCHAR(20), @guestClubName VARCHAR(20), @startTime DATETIME AS
DECLARE @match_id INT, @host_id INT, @guest_id INT;
SELECT @host_id=C1.id FROM club C1 WHERE C1.name = @hostClubName;
SELECT @guest_id=C2.id FROM club C2 WHERE C2.name = @guestClubName;
SELECT @match_id=M.id FROM match M WHERE M.startTime = @startTime AND M.hostClub_id = @host_id AND M.guestClub_id = @guest_id;
INSERT INTO ticket (match_id) VALUES (@match_id);
GO;

--> 2.3ix 
CREATE PROCEDURE addStadium @name VARCHAR(20), @loc VARCHAR(20), @cap INT AS
INSERT INTO stadium VALUES (@name, @loc, @cap, 1);
GO;

--> 2.3xiii
CREATE PROCEDURE addRepresentative @name VARCHAR(20), @c_name VARCHAR(20), @user VARCHAR(20), @pw VARCHAR(20) AS
IF NOT EXISTS (SELECT 1 FROM systemUser SU WHERE SU.username=@user)
BEGIN 
--DECLARE @createLogin nvarchar(500); SET @createLogin = N'CREATE LOGIN ' + QUOTENAME(@user) + ' WITH PASSWORD = ' + QUOTENAME(@pw, ''''); EXEC(@createLogin);
--DECLARE @createUser nvarchar(500); SET @createUser = N'CREATE USER ' + QUOTENAME(@user) + ' FOR LOGIN ' + QUOTENAME(@user); EXEC(@createUser);
INSERT INTO systemUser VALUES (@user, @pw);
END
IF NOT EXISTS (SELECT 1 FROM club C WHERE C.name=@c_name)
BEGIN 
INSERT INTO club VALUES (@c_name, NULL);
END
DECLARE @club_id INT;
SELECT @club_id=C.id FROM club C WHERE C.name = @c_name;
INSERT INTO clubRepresentative VALUES (@name, @club_id, @user);
--DECLARE @grant1 nvarchar(500); SET @grant1 = (N'GRANT EXECUTE ON addHostRequest TO ' + QUOTENAME(@user)); EXEC(@grant1);
--DECLARE @grant2 nvarchar(500); SET @grant2 = (N'GRANT SELECT ON viewAvailableStadiumsOn TO ' + QUOTENAME(@user)); EXEC(@grant2);
--DECLARE @grant3 nvarchar(500); SET @grant3 = (N'GRANT SELECT ON allUnassignedMatches TO ' + QUOTENAME(@user)); EXEC(@grant3);
GO;

--> 2.3xv 
CREATE PROCEDURE addHostRequest @clubName VARCHAR(20), @stadiumName VARCHAR(20), @startTime DATETIME AS
DECLARE @rep_id INT, @mgr_id INT, @m_id INT, @c_id INT, @s_id INT;
SELECT @c_id=C.id FROM club C WHERE C.name = @clubName;
SELECT @rep_id=CR.id FROM clubRepresentative CR WHERE CR.club_id = @c_id;
SELECT @s_id=S.id FROM stadium S WHERE S.name = @stadiumName;
SELECT @mgr_id=SM.id FROM stadiumManager SM WHERE SM.stadium_id = @s_id;
SELECT @m_id=M.id FROM match M WHERE @c_id=M.hostClub_id AND @startTime=M.startTime;
INSERT INTO hostRequest (representative_id, manager_id, match_id) VALUES (@rep_id, @mgr_id, @m_id);
GO;

--> 2.3xvii 
CREATE PROCEDURE addStadiumManager(@name VARCHAR(20), @stadiumName VARCHAR(20), @user VARCHAR(20), @pw VARCHAR(20)) AS
IF NOT EXISTS (SELECT 1 FROM systemUser SU WHERE SU.username=@user)
BEGIN 
--DECLARE @createLogin nvarchar(500); SET @createLogin = N'CREATE LOGIN ' + QUOTENAME(@user) + ' WITH PASSWORD = ' + QUOTENAME(@pw, ''''); EXEC(@createLogin);
--DECLARE @createUser nvarchar(500); SET @createUser = N'CREATE USER ' + QUOTENAME(@user) + ' FOR LOGIN ' + QUOTENAME(@user); EXEC(@createUser);
INSERT INTO systemUser VALUES (@user, @pw); 
END
IF NOT EXISTS (SELECT 1 FROM stadium S WHERE S.name=@stadiumName)
BEGIN 
INSERT INTO stadium VALUES (@stadiumName, NULL, NULL, 1); 
END
DECLARE @stadium_id INT;
SELECT @stadium_id=S.id FROM stadium S WHERE @stadiumName = S.name;
INSERT INTO stadiumManager VALUES (@name, @stadium_id, @user);
--DECLARE @grant1 nvarchar(500); SET @grant1 = (N'GRANT SELECT ON allPendingRequests TO ' + QUOTENAME(@user)); EXEC(@grant1);
--DECLARE @grant2 nvarchar(500); SET @grant2 = (N'GRANT EXECUTE ON acceptRequest TO ' + QUOTENAME(@user)); EXEC(@grant2);
--DECLARE @grant3	nvarchar(500); SET @grant3 = (N'GRANT EXECUTE ON rejectRequest TO ' + QUOTENAME(@user)); EXEC(@grant3);
--DECLARE @grant4	nvarchar(500); SET @grant4 = (N'GRANT EXECUTE ON deleteMatchesOnStadium TO ' + QUOTENAME(@user)); EXEC(@grant4);
--DECLARE @grant5	nvarchar(500); SET @grant5 = (N'GRANT SELECT ON allPendingRequests TO ' + QUOTENAME(@user)); EXEC(@grant5);
GO;

--> 2.3xxi
CREATE PROCEDURE addFan (@name VARCHAR(20), @user VARCHAR(20), @pw VARCHAR(20), @nat_id VARCHAR(20), @bdate DATETIME, @address VARCHAR(20), @phone INT) AS
IF NOT EXISTS (SELECT 1 FROM systemUser SU WHERE SU.username=@user)
BEGIN 
--DECLARE @createLogin nvarchar(500); SET @createLogin = N'CREATE LOGIN ' + QUOTENAME(@user) + ' WITH PASSWORD = ' + QUOTENAME(@pw, ''''); EXEC(@createLogin);
--DECLARE @createUser nvarchar(500); SET @createUser = N'CREATE USER ' + QUOTENAME(@user) + ' FOR LOGIN ' + QUOTENAME(@user); EXEC(@createUser);
INSERT INTO systemUser VALUES (@user, @pw);
END
INSERT INTO fan VALUES (@nat_id, @name, @bdate, @address, @phone, 1, @user);
--DECLARE @grant1 nvarchar(500); SET @grant1 = (N'GRANT SELECT ON upcomingMatchesOfClub TO ' + QUOTENAME(@user)); EXEC(@grant1);
--DECLARE @grant2 nvarchar(500); SET @grant2 = (N'GRANT EXECUTE ON availableMatchesToAttend TO ' + QUOTENAME(@user)); EXEC(@grant2);
--DECLARE @grant3	nvarchar(500); SET @grant3 = (N'GRANT EXECUTE ON purchaseTicket TO ' + QUOTENAME(@user)); EXEC(@grant3);
GO;

--| 2.3 All Other Requirements |----------------------------------------------------\ DELETIONS \--
--> 2.3iv 
CREATE PROCEDURE deleteMatch @hostClubName VARCHAR(20), @guestClubName VARCHAR(20) AS -- DELETE TICKETS
DECLARE @host_id INT;
DECLARE @guest_id INT;
SELECT @host_id=C1.id FROM club C1 WHERE C1.name = @hostClubName;
SELECT @guest_id=C2.id FROM club C2 WHERE C2.name = @guestClubName;
DELETE FROM match
WHERE match.hostClub_id = @host_id AND match.guestClub_id = @guest_id;
GO;

--> 2.3v 
CREATE PROCEDURE deleteMatchesOnStadium @stadium VARCHAR(20) AS -- will cascade delete to tickets and hostRequest of the match and ticketBuyingTransaction
DECLARE @s_id INT;
SELECT @s_id=S.id FROM stadium S WHERE S.name = @stadium;
DELETE FROM match
WHERE match.stadium_id = @s_id AND CURRENT_TIMESTAMP < match.startTime;
GO;

--> 2.3viii 
CREATE PROCEDURE deleteClub @name VARCHAR(20) AS
DECLARE @club_id INT;
SELECT @club_id=C.id FROM club C WHERE C.name = @name;
DELETE FROM match
WHERE match.guestClub_id = @club_id;
DELETE FROM club 
WHERE club.name = @name;
--DELETE FROM clubRepresentative
--WHERE clubRepresentative.club_id = @club_id;
GO;

--> 2.3x 
CREATE PROCEDURE deleteStadium @name VARCHAR(20) AS
DELETE FROM stadium
WHERE stadium.name = @name;
GO;

--> 2.3xxvii
CREATE PROCEDURE deleteMatchesOn (@DT DATETIME) AS -- will cascade delete to tickets and hostRequest of the match and ticketBuyingTransaction
DELETE FROM match
WHERE match.startTime = @DT;
GO;

--| 2.3 All Other Requirements |------------------------------------------------\ ADMINSTRATION \--
--> 2.3iii
CREATE VIEW clubsWithNoMatches AS
SELECT DISTINCT C.name
FROM club C
WHERE NOT EXISTS (SELECT * FROM match M WHERE M.hostClub_id = C.id OR M.guestClub_id = C.id);
GO;

--> 2.3xi
CREATE PROCEDURE blockFan @n_id VARCHAR(20) AS
UPDATE fan
SET fan.status = 0
WHERE fan.national_id = @n_id;
--UPDATE ticket
--SET status = 1
--FROM ticket T INNER JOIN ticketBuyingTransaction TBT ON T.id = TBT.ticket_id
--WHERE TBT.fanNational_id = @n_id
--DELETE FROM ticketBuyingTransaction
--WHERE fanNational_id = @n_id
GO;

--> 2.3xii
CREATE PROCEDURE unblockFan @n_id VARCHAR(20) AS
UPDATE fan
SET fan.status = 1
WHERE fan.national_id = @n_id;
GO;

--> 2.3xiv
CREATE FUNCTION viewAvailableStadiumsOn(@date DATETIME)
RETURNS TABLE AS
RETURN
	(SELECT DISTINCT SA.name, SA.location, SA.capacity
	FROM Stadium SA
	WHERE SA.status = 1)
	EXCEPT 
	(SELECT DISTINCT S.name, S.location, S.capacity
	FROM stadium S
	INNER JOIN match M ON S.id = M.stadium_id
	WHERE M.startTime = @date);
GO;

--> 2.3xvi
CREATE FUNCTION allUnassignedMatches(@hostClubName VARCHAR(20))
RETURNS TABLE AS
RETURN 
	SELECT GC.name guestClubName, M.startTime
	FROM match M 
	INNER JOIN club HC ON M.hostClub_id	 = HC.id
	INNER JOIN club GC ON M.guestClub_id = GC.id
	WHERE HC.name = @hostClubName AND M.stadium_id IS NULL;
GO;

--> 2.3xviii
CREATE FUNCTION allPendingRequests(@userStadiumManager VARCHAR(20))
RETURNS TABLE AS
RETURN 
	SELECT CR.name clubRepresentative, GC.name guestClub, M.startTime
	FROM hostRequest HR 
	INNER JOIN clubRepresentative CR ON HR.representative_id = CR.id
	INNER JOIN match M ON HR.match_id = M.id
	INNER JOIN club GC ON M.guestClub_id = GC.id
	INNER JOIN stadiumManager SM ON HR.manager_id = SM.id
	WHERE (HR.status = 'unhandled') AND @userStadiumManager = SM.username;
GO;

--> 2.3xix
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
WHERE hostRequest.manager_id = @SM_id AND hostRequest.match_id = @M_id AND hostRequest.representative_id = @HCR_id AND NOT hostRequest.status='accepted';
UPDATE match
SET match.stadium_id = @S_id
WHERE match.id = @M_id;
DECLARE @i INT = 0, @tickets INT = (SELECT S.capacity FROM stadium S WHERE @S_id = S.id);
WHILE @i < @tickets
BEGIN
EXEC addTicket @HC_name, @GC_name, @startTime;
SET @i = @i + 1;
END;
GO;

--> 2.3xx 
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
UPDATE match
SET match.stadium_id = NULL
WHERE match.id = @M_id
DELETE FROM ticket
WHERE ticket.match_id = @M_id;
GO;

--> 2.3xxii
CREATE FUNCTION upcomingMatchesOfClub (@clubName VARCHAR(20))
RETURNS TABLE AS
RETURN
	SELECT HC.name club, GC.name competent, M.startTime, S.name stadium
	FROM match M
	INNER JOIN club HC ON M.hostClub_id	 = HC.id
	INNER JOIN club GC ON M.guestClub_id = GC.id
	LEFT JOIN stadium S ON S.id = M.stadium_id
	WHERE (HC.name = @clubName OR GC.name = @clubName) AND M.startTime > CURRENT_TIMESTAMP 
GO;

--> 2.3xxiii
CREATE FUNCTION availableMatchesToAttend (@DT DATETIME)
RETURNS TABLE AS
RETURN	
	SELECT DISTINCT HC.name hostClubName, GC.name guestClubName, M.startTime, S.name
	FROM match M
	INNER JOIN club HC ON M.hostClub_id = HC.id
	INNER JOIN club GC ON M.guestClub_id = GC.id
	INNER JOIN stadium S ON M.stadium_id = S.id
	INNER JOIN ticket T ON M.id = T.match_id
	WHERE M.startTime >= @DT and T.status=1;
GO;

--> 2.3xxiv 
CREATE PROCEDURE purchaseTicket (@nat_id VARCHAR(20), @HCN VARCHAR(20), @GCN VARCHAR(20), @start DATETIME) AS
DECLARE @T_id INT, @M_id INT, @HC_id INT, @GC_id INT;
SELECT @HC_id=HC.id FROM club HC WHERE HC.name = @HCN;
SELECT @GC_id=GC.id FROM club GC WHERE GC.name = @GCN;
SELECT @M_id=M.id FROM match M WHERE M.startTime = @start AND M.hostClub_id = @HC_id AND M.guestClub_id = @GC_id;
SELECT @T_id=T.id FROM ticket T WHERE T.match_id = @M_id AND T.status = 1;
IF EXISTS (SELECT 1 FROM fan, ticket WHERE fan.status = 1 AND fan.national_id = @nat_id AND ticket.status = 1 AND ticket.id = @T_id)
AND NOT EXISTS (SELECT 1 FROM ticketBuyingTransaction TBT INNER JOIN ticket T ON TBT.ticket_id = T.id WHERE TBT.fanNational_id = @nat_id AND T.match_id = @M_id)
BEGIN 
UPDATE ticket 
SET ticket.status = 0
WHERE ticket.id = @T_id AND ticket.status = 1;
INSERT INTO ticketBuyingTransaction (ticket_id, fanNational_id) VALUES (@T_id, @nat_id)
--SET ticketBuyingTransaction.ticket_id = @T_id
--WHERE ticketBuyingTransaction.fanNational_id = @nat_id
END
GO;

--> 2.3xxv
CREATE PROCEDURE updateMatchTiming (@HCN VARCHAR(20), @GCN VARCHAR(20), @current_ST DATETIME, @new_ST DATETIME, @new_ET DATETIME) AS
DECLARE @HC_ID INT, @GC_ID INT;
SELECT @HC_ID=HC.id FROM club HC WHERE HC.name = @HCN;
SELECT @GC_ID=GC.id FROM club GC WHERE GC.name = @GCN;
UPDATE match 
SET match.endTime = @new_ET
WHERE match.startTime = @current_ST AND match.hostClub_id = @HC_ID AND match.guestClub_id = @GC_ID;
UPDATE match
SET match.startTime = @new_ST
WHERE match.startTime = @current_ST AND match.hostClub_id = @HC_ID AND match.guestClub_id = @GC_ID;
GO;


--> 2.3xxvi
CREATE VIEW matchesPerTeam AS
SELECT DISTINCT C.name, COUNT(M.id) matchCount
FROM club C
LEFT JOIN match M ON (C.id = M.guestClub_id OR C.id = M.hostClub_id) AND CURRENT_TIMESTAMP > M.startTime
GROUP BY C.name
GO;

--> AWI 2.3xxviii
CREATE VIEW matchWithMostSoldTickets AS
SELECT HC.name hostClubName, GC.name guestClubName
FROM match M
INNER JOIN club HC ON M.hostClub_id = HC.id
INNER JOIN club GC ON M.guestClub_id = GC.id
INNER JOIN ticket T ON M.id = T.match_id AND T.status = 0
GROUP BY HC.name, GC.name
HAVING COUNT(T.id) = 
(SELECT top 1 COUNT (T.id) tickets
FROM match M
INNER JOIN club HC ON M.hostClub_id = HC.id
INNER JOIN club GC ON M.guestClub_id = GC.id
INNER JOIN ticket T ON M.id = T.match_id AND T.status = 0
GROUP BY HC.name, GC.name
ORDER BY tickets DESC)
GO;

--> 2.3xxix
CREATE VIEW matchesRankedBySoldTickets AS
SELECT DISTINCT HC.name hostClubName, GC.name guestClubName, COUNT(T.id) sold_tickets
FROM match M
INNER JOIN club HC ON M.hostClub_id = HC.id
INNER JOIN club GC ON M.guestClub_id = GC.id
INNER JOIN ticket T ON M.id = T.match_id
WHERE T.match_id = M.id AND T.status=0
GROUP BY HC.name, GC.name
ORDER BY sold_tickets DESC OFFSET 0 ROWS;
GO;

--> 2.3xxx
CREATE PROCEDURE clubWithTheMostSoldTickets (@name VARCHAR(20) OUTPUT) AS
SELECT C.name
FROM club C
INNER JOIN match M ON M.guestClub_id = C.id OR M.hostClub_id = C.id
INNER JOIN ticket T ON T.match_id = M.id AND T.status = 0
group by c.name
having count(T.id) = 
(SELECT TOP 1 count(T.id) tickets 
FROM club C
INNER JOIN match M ON M.guestClub_id = C.id OR M.hostClub_id = C.id
INNER JOIN ticket T ON T.match_id = M.id AND T.status = 0
group by c.name
ORDER BY tickets DESC)
GO;

--> 2.3xxxi
CREATE VIEW clubsRankedBySoldTickets AS
SELECT C.name, COUNT(T.id) total_tickets_sold
FROM match M
INNER JOIN club C ON M.hostClub_id = C.id OR M.guestClub_id = C.id
INNER JOIN ticket T ON M.id = T.match_id
WHERE CURRENT_TIMESTAMP > M.stadium_id AND T.status = 0
GROUP BY C.name
ORDER BY total_tickets_sold DESC OFFSET 0 ROWS;
GO;

--> 2.3xxxii
CREATE FUNCTION stadiumsNeverPlayedOn (@name VARCHAR(20))
RETURNS TABLE AS
RETURN	
	(SELECT DISTINCT S.name, S.capacity
	FROM stadium S)
	EXCEPT
	((SELECT DISTINCT S.name, S.capacity
	FROM match M
	INNER JOIN stadium S ON M.stadium_id = S.id
	INNER JOIN club HC ON M.hostClub_id = HC.id
	WHERE HC.name = @name)
	UNION 
	(SELECT S.name, S.capacity
	FROM match M
	INNER JOIN stadium S ON M.stadium_id = S.id
	INNER JOIN club GC ON M.guestClub_id = GC.id
	WHERE GC.name = @name))
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

-- BASIC		createAllTables, dropAllTables, dropAllProceduresFunctionsViews, clearAllTables

-- DATA			allAssocManagers OK, allClubRepresentatives OK, allStadiumManagers OK, 
--				allFans OK, allMatches OK, allTickets OK, allCLubs OK, , allStadiums OK, allRequests OK

-- PROC	ADD		addAssociationManager OK, addNewMatch OK, addClub OK, addTicket, addStadium OK, addHostRequest OK,
--		ADD		addStadiumManager OK, addRepresentative OK, addFan OK
--		DEL		deleteClub, deleteMatch, deleteStadium, deleteMatchesOnStadium, deleteMatchesOn
--		ADM		acceptRequest, rejectRequest, purchaseTicket, updateMatchTiming, blockFan, unblockFan, clubWithTheMostSoldTickets

-- VIEW			clubsWithNoMatches OK, allUnassignedMatches, matchesPerTeam, matchWithMostSoldTickets, matchesRankedBySoldTickets,
--				clubsRankedBySoldTickets

-- FUNC			viewAvailableStadiumsOn, allPendingRequests, upcomingMatchesOfClub, availableMatchesToAttend, stadiumsNeverPlayedOn
