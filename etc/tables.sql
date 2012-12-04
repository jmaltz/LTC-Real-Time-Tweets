CREATE TABLE tweets(
	timestamp Datetime,
	text VARCHAR(255),
	username VARCHAR(31),
	image VARCHAR(127),
	hashtag VARCHAR(25),
	id BIGINT,
	PRIMARY KEY (id)
);
