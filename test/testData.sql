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

INSERT INTO tweets (timestamp, text, username, image, hashtag, id) VALUES (0, 'negative one', 'Test', 'undefined', 'multiple', -1);
INSERT INTO tweets (timestamp, text, username, image, hashtag, id) VALUES (0, 'negative two', 'Test', 'undefined', 'multiple', -2);
INSERT INTO tweets (timestamp, text, username, image, hashtag, id) VALUES (0, 'negative three', 'Test', 'undefined', 'multiple', -3);
INSERT INTO tweets (timestamp, text, username, image, hashtag, id) VALUES (0, 'Test', 'Test', 'undefined', 'unique_hashtag', -4);
INSERT INTO tweets (timestamp, text, username, image, hashtag, id) VALUES (0, 'Test', 'Test', 'undefined', 'hashtag with spaces', -5);
INSERT INTO tweets (timestamp, text, username, image, hashtag, id) VALUES (0, 'Test', 'Test', 'undefined', 'single', -6);
INSERT INTO tweets (timestamp, text, username, image, hashtag, id) VALUES (0, 'Test', 'Test', 'undefined', 'camelcase', -7);
INSERT INTO tweets (timestamp, text, username, image, hashtag, id) VALUES (0, 'Test', 'Test', 'undefined', 'camelCase', -8);

