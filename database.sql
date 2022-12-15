CREATE PROCEDURE createAllTables
AS

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

GO;


EXEC createAllTables;
