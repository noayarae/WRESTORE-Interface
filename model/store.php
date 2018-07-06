<?xml version="1.0" encoding="UTF-8"?>
<?php
header('Access-Control-Allow-Origin: *');
//========================================================================================
/*
// Short code to verify connection
$conexion=mysqli_connect('localhost','root','','test');
$sql="INSERT into usuarios (nombre,apellido,usuario,password) values ('MMM','Noa','mish','wilson')";
echo mysqli_query($conexion,$sql);
mysqli_close($conexion);
*/
//====================================================================================

// ------------------------------------------------------------------
require_once('config.php'); echo "<br>"; // GIVE A ERROR CHECK IT
/*
$dbhost = 'localhost';
$dbname = 'test';//'mt';
$dbuser = 'root';
$dbpass = ''; //*/
// ----------------------
/* Gets variables from 'mt_config' javascript file either by _GET or _POST.
 * @param string $default Default value in case no value is retrieved for the variable. Defaults itself to an empty string ('').
 * @return string */
function getvar($var, $default=''){
    if (isset($_POST[$var])) {
        return trim($_POST[$var]); }
    elseif (isset($_GET[$var])) {
        return trim($_GET[$var]); }
    else {
        return trim($default); }
}
// --------------------------------------------------------------------
// We obtain the data coming from the request.
$pid = getvar('pid', '');			// Participant ID.
$name = getvar('name', '');			// Name of this 'project' (optional)
$content = getvar('content', '');	// Whole record of mouse-tracking data.
$cont_array = explode("#",$content); // Content is exploted to get as ARRAY
//$agent = getvar('agent', '');

// --------------------------------------------------------------------
// We open a connection to the database where everything will be kept.
$con1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
$con2 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
$con3 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
//$con3 = mysqli_connect('localhost','root','','test');

// -------- Insert data into 'USERS' table
$query_ins = "INSERT INTO users (pid,name) VALUES ('$pid','$name');";
$query_ins .= "SELECT @mid := MAX(id) AS MMMM FROM users;";
$query_ins .= "UPDATE users SET usercod = (CONCAT('user',@mid)) WHERE ID = @mid;";
//mysqli_multi_query($con2,$query_ins);
mysqli_multi_query($con1,$query_ins);
mysqli_close($con1);

// --------- Get max id value generated by 'AUTO INCREMENT'
$q_maxval_id = mysqli_query($con2,"SELECT MAX(id) AS maxv FROM users");
$maxid = mysqli_fetch_assoc($q_maxval_id);

$last_id = $maxid["maxv"]; //echo ("Last id: ". $last_id); echo "<br>";
$table_name = "user".$last_id; // Get table-name to create
echo ("table name: ". $table_name);  echo "<br>";

$query_ins2 = "DROP TABLE IF EXISTS `".$table_name."`;";
$query_ins2 .= "CREATE TABLE `".$table_name."` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `usercod` varchar(20) NOT NULL DEFAULT '',
            `pid` varchar(1000) NOT NULL DEFAULT '',
            `name` varchar(1000) NOT NULL DEFAULT '',
            `time` varchar(1000) NOT NULL DEFAULT '',
            `all_act` varchar(1000) NOT NULL DEFAULT '',
            PRIMARY KEY (`id`)
            ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;";
mysqli_multi_query($con2,$query_ins2);
mysqli_close($con2);
//$con1->multi_query($query_ins);

// --------- Insert mouse track data into '$table_name' table
$count = 1;
foreach ($cont_array as $row){
	$element = explode(':', $row, 2);
//	$q_insert_array = "INSERT INTO `".$table_name."` (usercod,pid,name,time,all_act) VALUES
//	('".$table_name."','".$pid."','".$name."','".$element[0]."','".$element[1]."')";
	$q_insert_array = "INSERT INTO `".$table_name."` (usercod,pid,name,time,all_act) VALUES
	('".$table_name."','".$pid."','".$name."','".$element[0]."','".$element[1]."')";
	$count = $count + 1;
	
	mysqli_query($con3,$q_insert_array);
//	$count = $count + 1;
}

//mysqli_close($con3);
//*/


/*
	// And some additional variables.
	$error = 0;
	$errormsg = '';
	$ret = 0;
	$additional = '';
    echo ("pid 129: " . $pid); echo "<br>";
	// If we receive no pid, we complain.
	if ($pid=='')
	{
		$error = 1;
		$errormsg = 'No participant id in URL';
	}

	// If there is no content to store, we don't bother trying.
	else if ($content=='')
	{
		$error = 2;
		$errormsg = 'No tracking data to store';
	}

	// We finally try to insert. If we fail, we complain.
	else if (!$db->qInsert("insert into track (`pid`,`name`,`content`,`agent`)
            values ('$pid','$name','".$db->escape($content)."','".$db->escape($agent)."')"))
	
	
	{
		$error = 3;
		$errormsg = 'Insertion in database failed';
		$additional = $db->error();
	}

	// If we get to this point, everything went well.
	else
		$errormsg = 'OK';
    echo ("error # : " . $error); echo "<br>";
    echo ("error msm: " . $errormsg);
*/
?>
