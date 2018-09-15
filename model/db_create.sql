/* --------- Query to delete "USERS" table if exists and create it doesn't --------- */

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usercod` varchar(20) NOT NULL DEFAULT '',
  `pid` varchar(1000) NOT NULL DEFAULT '',
  `name` varchar(1000) NOT NULL DEFAULT '',
  `login` varchar(20) NOT NULL DEFAULT '',
  `spent_time` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


/* Query to Select only "Mouse-Click" into a "USER1" table */
SELECT * FROM USER1 WHERE all_act LIKE 'm-c%'

/* ========================================================== */
/* --------- QUERY TO PROCESS "USERS" TABLE --------- */
/* Query to DELETE columns */
ALTER TABLE users
  DROP COLUMN login_time,
  DROP COLUMN spent_time_sec;

/* QUERY to GET Login_time (Login_time) */
ALTER TABLE users ADD COLUMN (calc DECIMAL);
UPDATE users SET calc=login/1000;
ALTER TABLE users ADD COLUMN (login_time DATETIME);
UPDATE users SET login_time = from_unixtime(calc);
ALTER TABLE users DROP COLUMN calc;

/* QUERY TO GET the Spent time ‘SPENT_TIME_SEC’ in seconds */
ALTER TABLE users ADD COLUMN (spent_time_sec DECIMAL);
UPDATE users SET spent_time_sec = spent_time/1000;
/* ================================================= */
