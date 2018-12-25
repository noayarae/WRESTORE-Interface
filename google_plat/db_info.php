<?php
//$username="root";
//$password="";
//$database="test1";

define("SERVER", "localhost");
define("USERNAME", "root");
define("PASSWORD", "");
define("DATABASE", "test1");
$link =
	mysqli_connect (SERVER, USERNAME, PASSWORD, DATABASE, 3306)
or die("Unable to connect to server<br>\n");
//echo "Connected to database!<br><br>";

?>