DROP TABLE IF EXISTS tweets;
CREATE TABLE tweets(
	timestamp Datetime,
	text VARCHAR(255),
	username VARCHAR(31),
	image VARCHAR(127),
	hashtag VARCHAR(25),
	id BIGINT,
	PRIMARY KEY (id)
);

INSERT INTO tweets (timestamp, text, username, image, hashtag, id) VALUES (0, 'Test', 'Test', 'undefined', 'test', -1);
INSERT INTO tweets (timestamp, text, username, image, hashtag, id) VALUES (0, 'Test', 'Test', 'undefined', 'test', -2);
INSERT INTO tweets (timestamp, text, username, image, hashtag, id) VALUES (0, 'Test', 'Test', 'undefined', 'test', -3);


