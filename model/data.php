<?php
define("DB_SERVER", "localhost");
define("DB_USER", "root");
define("DB_PASSWORD", "");
define("DB_NAME", "igmi2db");
$link =
  mysqli_connect (DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME, 3306)
  or die("Unable to connect to server<br>\n");
//echo "Connected to database!<br><br>";
?>