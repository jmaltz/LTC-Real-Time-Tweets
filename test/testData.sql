DROP TABLE IF EXISTS tweets;
CREATE TABLE tweets(
	timestamp Datetime,
	text VARCHAR(255),
	username VARCHAR(31),
	image VARCHAR(127),
	id BIGINT,
	PRIMARY KEY (id)
);

INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2015-05-01 00:00:00', 'negative one', 'Test #multiple', 'undefined', -1);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2015-05-01 00:00:00', 'negative two', 'Test #multiple', 'undefined', -2);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2015-05-01 00:00:00', 'negative three', 'Test #multiple', 'undefined', -3);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2015-05-01 00:00:00', 'negative four', 'Test #unique_hashtag', 'undefined', -4);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2015-05-01 00:00:00', 'negative six', 'Test #single', 'undefined', -6);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2015-05-01 00:00:00', 'negative seven', 'Test #camelCase', 'undefined', -7);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2015-05-01 00:00:00', 'negative eight', 'Test #camelcase', 'undefined', -8);

INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2012-05-01 00:00:00', 'negative ten', 'Test #timeStamp', 'undefined', -10);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2012-06-02 00:00:00', 'negative eleven', 'Test #timeStamp', 'undefined', -11);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2012-06-15 00:00:00', 'negative twelve', 'Test #timeStamp', 'undefined', -12);
INSERT INTO tweets (timestamp, username, text, image, id) VALUES ('2012-06-25 00:00:00', 'negative thirteen', 'Test #timeStamp', 'undefined', -13);


