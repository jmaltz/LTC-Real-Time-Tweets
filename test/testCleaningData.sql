DROP TABLE IF EXISTS tweets;
CREATE TABLE tweets(
	timestamp Datetime,
	text VARCHAR(255),
	username VARCHAR(31),
	image VARCHAR(127),
	id BIGINT,
	PRIMARY KEY (id)
);

INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2011-05-01 00:00:00', 'negative one', 'Test #cleaning', 'undefined', -1);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2011-05-01 00:00:00', 'negative two', 'Test #cleaning', 'undefined', -2);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2011-05-01 00:00:00', 'negative three', 'Test #cleaning', 'undefined', -3);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2011-05-01 00:00:00', 'negative four', 'Test #cleaning', 'undefined', -4);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2011-05-01 00:00:00', 'negative six', 'Test #cleaning', 'undefined', -6);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2011-05-01 00:00:00', 'negative seven', 'Test #cleaning', 'undefined', -7);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2011-05-01 00:00:00', 'negative eight', 'Test #cleaning', 'undefined', -8);

