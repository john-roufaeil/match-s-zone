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
	birthDate DATE,
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
GO;

--/ System Admin /--
CREATE PROCEDURE SA_addClub @name VARCHAR(20), @location VARCHAR(20) AS
    INSERT INTO club VALUES (@name, @location);
GO;

CREATE PROCEDURE SA_deleteClub @name VARCHAR(20) AS -- cascade to delete representatives
    DECLARE @club_id INT;
    SELECT @club_id=C.id FROM club C WHERE C.name = @name;
    DELETE FROM match
    WHERE match.guestClub_id = @club_id;
    DELETE FROM club 
    WHERE club.name = @name;
GO;

CREATE PROCEDURE SA_addStadium @name VARCHAR(20), @loc VARCHAR(20), @cap INT AS
    INSERT INTO stadium VALUES (@name, @loc, @cap, 1);
GO;

CREATE PROCEDURE SA_deleteStadium @name VARCHAR(20) AS -- cascade to delete managers
    DELETE FROM stadium
    WHERE stadium.name = @name;
GO;

CREATE PROCEDURE SA_blockFan @n_id VARCHAR(20) AS
    UPDATE fan
    SET fan.status = 0
    WHERE fan.national_id = @n_id;
GO;

CREATE PROCEDURE SA_unblockFan @n_id VARCHAR(20) AS
    UPDATE fan
    SET fan.status = 1
    WHERE fan.national_id = @n_id;
GO;

CREATE PROCEDURE SA_viewStadiums AS 
    SELECT DISTINCT S.name, S.location, S.capacity
    FROM stadium S;
GO;

CREATE PROCEDURE SA_viewClubs AS 
    SELECT DISTINCT C.name, C.location
    FROM club C;
GO;

--/ Sports Association Manager /--
CREATE PROCEDURE SAM_addAssociationManager @name VARCHAR(20), @user VARCHAR(20), @pw VARCHAR(20) AS
    INSERT INTO systemUser VALUES (@user, @pw); 
    INSERT INTO sportsAssociationManager VALUES (@name, @user);
GO;

CREATE PROCEDURE SAM_addNewMatch @hostClubName VARCHAR(20), @guestClubName VARCHAR(20), @startTime DATETIME, @endTime DATETIME AS
    DECLARE @host_id INT, @guest_id INT;
    SELECT @host_id=C1.id FROM club C1 WHERE C1.name = @hostClubName;
    SELECT @guest_id=C2.id FROM club C2 WHERE C2.name = @guestClubName;
    INSERT INTO match VALUES (@startTime, @endTime, @host_id, @guest_id, NULL);
GO;

CREATE PROCEDURE SAM_deleteMatch @hostClubName VARCHAR(20), @guestClubName VARCHAR(20), @startTime DATETIME, @endTime DATETIME AS
    DECLARE @host_id INT, @guest_id INT;
    SELECT @host_id=C1.id FROM club C1 WHERE C1.name = @hostClubName;
    SELECT @guest_id=C2.id FROM club C2 WHERE C2.name = @guestClubName;
    DELETE FROM match 
    WHERE match.hostClub_id = @host_id AND match.guestClub_id = @guest_id AND match.startTime = @startTime AND match.endTime = @endTime;
GO;

CREATE PROCEDURE SAM_viewAllMatches AS 
    SELECT * FROM match;
GO;

CREATE PROCEDURE SAM_viewUpcomingMatches AS 
    SELECT HC.name, GC.name, M.startTime, M.endTime
    FROM match M
    INNER JOIN club HC ON M.hostClub_id = HC.id
    INNER JOIN club GC ON M.guestClub_id = GC.id
    WHERE CURRENT_TIMESTAMP <= M.startTime;
GO;

CREATE PROCEDURE SAM_viewPreviousMatches AS 
    SELECT HC.name, GC.name, M.startTime, M.endTime
    FROM match M
    INNER JOIN club HC ON M.hostClub_id = HC.id
    INNER JOIN club GC ON M.guestClub_id = GC.id
    WHERE CURRENT_TIMESTAMP > M.startTime;
GO;

--CREATE PROCEDURE viewClubsNotScheduledTogether --TODO



--/ Club Representative /--
CREATE PROCEDURE CR_addRepresentative @name VARCHAR(20), @c_name VARCHAR(20), @user VARCHAR(20), @pw VARCHAR(20) AS
    INSERT INTO systemUser VALUES (@user, @pw);
    DECLARE @club_id INT;
    SELECT @club_id=C.id FROM club C WHERE C.name = @c_name;
    INSERT INTO clubRepresentative VALUES (@name, @club_id, @user);
GO;

CREATE PROCEDURE CR_viewClubInfo @clubRepresentative_id INT AS
    DECLARE @club_id INT;
    SELECT @club_id=CR.club_id FROM clubRepresentative CR WHERE CR.id = @clubRepresentative_id;
    SELECT * 
    FROM club C 
    WHERE C.id = @club_id;
GO;

CREATE PROCEDURE CR_viewUpcomingMatchesOfClub (@clubName VARCHAR(20)) AS
	SELECT HC.name club, GC.name competent, M.startTime, M.endTime, S.name
	FROM match M
	INNER JOIN club HC ON M.hostClub_id	 = HC.id
	INNER JOIN club GC ON M.guestClub_id = GC.id
	LEFT JOIN stadium S ON S.id = M.stadium_id
	WHERE (HC.name = @clubName OR GC.name = @clubName) AND M.startTime > CURRENT_TIMESTAMP 
GO;

--View all available stadiums starting at a certain date (in a form of stadium name, location andcapacity).
CREATE PROCEDURE CR_viewAvailableStadiumsFrom (@date DATETIME) AS
	SELECT DISTINCT SA.name, SA.location, SA.capacity
	FROM Stadium SA
	WHERE SA.status = 1 AND CURRENT_TIMESTAMP >= @date;
GO;

-- CREATE PROCEDURE sendRequest  representative_id INT NOT NULL, TODO
--         manager_id INT NOT NULL,
--         match_id INT NOT NULL,



--/ Stadium Manager /--
CREATE PROCEDURE SM_addStadiumManager(@name VARCHAR(20), @stadiumName VARCHAR(20), @user VARCHAR(20), @pw VARCHAR(20)) AS
    INSERT INTO systemUser VALUES (@user, @pw); 
    DECLARE @stadium_id INT;
    SELECT @stadium_id=S.id FROM stadium S WHERE @stadiumName = S.name;
    INSERT INTO stadiumManager VALUES (@name, @stadium_id, @user);
GO;

CREATE PROCEDURE SM_viewStadiumInfo @stadiumManager_id INT AS
    DECLARE @stadium_id INT;
    SELECT @stadium_id=SM.stadium_id FROM stadiumManager SM WHERE SM.id = @stadiumManager_id;
    SELECT * 
    FROM stadium S
    WHERE S.id = @stadium_id;
GO;

CREATE PROCEDURE SM_viewAllRequests (@userStadiumManager VARCHAR(20)) AS
	SELECT CR.name clubRepresentative, HC.name, GC.name guestClub, M.startTime, M.endTime, HR.status
	FROM hostRequest HR 
	INNER JOIN clubRepresentative CR ON HR.representative_id = CR.id
	INNER JOIN match M ON HR.match_id = M.id
    INNER JOIN club HC ON M.hostClub_id = HC.id
	INNER JOIN club GC ON M.guestClub_id = GC.id
	INNER JOIN stadiumManager SM ON HR.manager_id = SM.id
	WHERE @userStadiumManager = SM.username;
GO;

CREATE PROCEDURE SM_acceptRequest(@SM_user VARCHAR(20), @HC_name VARCHAR(20), @GC_name VARCHAR(20), @startTime DATETIME) AS
    DECLARE @SM_id INT, @HC_id INT, @GC_id INT, @M_id INT, @S_id INT, @HCR_id INT;
    SELECT @SM_id=SM.id FROM stadiumManager SM WHERE SM.username = @SM_user;
    SELECT @HC_id=HC.id FROM club HC WHERE HC.name = @HC_name;
    SELECT @GC_id=GC.id FROM club GC WHERE GC.name = @GC_name;
    SELECT @M_id=M.id FROM match M WHERE M.hostClub_id = @HC_id AND M.guestClub_id = @GC_id AND M.startTime = @startTime;
    SELECT @S_id=SM.stadium_id FROM stadiumManager SM WHERE SM.id = @SM_id;
    SELECT @HCR_id=CR.id FROM clubRepresentative CR INNER JOIN club C ON C.id=CR.club_id WHERE C.name=@HC_name;
    UPDATE hostRequest
    SET hostRequest.status = 'accepted'
    WHERE hostRequest.manager_id = @SM_id AND hostRequest.match_id = @M_id AND hostRequest.representative_id = @HCR_id AND hostRequest.status='unhandled';
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

CREATE PROCEDURE SM_rejectRequest (@SM_user VARCHAR(20), @HC_name VARCHAR(20), @GC_name VARCHAR(20), @startTime DATETIME) AS
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



--/ Fan /-- 
CREATE PROCEDURE F_addFan (@name VARCHAR(20), @user VARCHAR(20), @pw VARCHAR(20), @nat_id VARCHAR(20), @bdate DATE, @address VARCHAR(20), @phone INT) AS
    INSERT INTO systemUser VALUES (@user, @pw);
    INSERT INTO fan VALUES (@nat_id, @name, @bdate, @address, @phone, 1, @user);
GO;

CREATE PROCEDURE F_availableMatchesToAttend (@DT DATETIME) AS
	SELECT DISTINCT HC.name hostClubName, GC.name guestClubName, S.name, S.location
	FROM match M
	INNER JOIN club HC ON M.hostClub_id = HC.id
	INNER JOIN club GC ON M.guestClub_id = GC.id
	INNER JOIN stadium S ON M.stadium_id = S.id
	INNER JOIN ticket T ON M.id = T.match_id
	WHERE M.startTime >= @DT and T.status=1;
GO;

CREATE PROCEDURE F_purchaseTicket (@nat_id VARCHAR(20), @HCN VARCHAR(20), @GCN VARCHAR(20), @start DATETIME) AS
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
    END
GO;