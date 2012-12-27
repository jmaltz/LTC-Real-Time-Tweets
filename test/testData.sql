DROP TABLE IF EXISTS tweets;
CREATE TABLE tweets(
	timestamp Datetime,
	text VARCHAR(255),
	username VARCHAR(31),
	image VARCHAR(127),
	id BIGINT,
	PRIMARY KEY (id)
);

INSERT INTO tweets (timestamp, username, text, image, id) VALUES (0, 'negative one', 'Test #multiple', 'undefined', -1);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES (0, 'negative two', 'Test #multiple', 'undefined', -2);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES (0, 'negative three', 'Test #multiple', 'undefined', -3);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES (0, 'negative four', 'Test #unique_hashtag', 'undefined', -4);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES (0, 'negative six', 'Test #single', 'undefined', -6);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES (0, 'negative seven', 'Test #camelCase', 'undefined', -7);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES (0, 'negative eight', 'Test #camelcase', 'undefined', -8);

