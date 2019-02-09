<?php
/**
 * Created by Efrain-NoaYarasca
 * Date: 2/7/2019; Time: 9:46 PM
 * This code read the data from MySQL. The data is converted in JSON format to send to javascript code (g2.php)
 */

//include ('data.php');

//This is a simple script that checks to see the session userID is even active. If not, that means someone is trying
// to access this page without loggin in and I throw them out.
/*session_set_cookie_params(3600);
session_start();
if ( $_SESSION['USERID']=="" ) {
    header('Location: login.php');
    }*/
// You can always override the session by just declaring it like I can do below if I wanted to test with userid=2.
$_SESSION['USERID']=111;
//$USERID = $_SESSION['USERID'];
$USERID = 111;

// E: This code tries to connect to the server. Arguments are called from 'data.php' included above in L-103.
$connection = mysqli_connect (DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME, 3306)
or die("Unable to connect to server<br>\n");
//echo "Connected to database!<br><br>";

$count = 0;

//E: I am grabbing the massive amount of data from the 'takefeedback' table. I actually am going to write it out on the
// page in a table.
$query2 =("SELECT * FROM takefeedback where USERID = '$USERID'");//E: DB for "ecw"
//$query =("SELECT * FROM dmk_db1 where USERID = '$USERID'");//E: DB for Dairy-Mckay
$result2 = mysqli_query($connection, $query2); //  ???
$jsonn_array = array();
$ccc = 0;

while($row2 = mysqli_fetch_assoc($result2) ){
    //    echo count($row2);
    //    $row2['ID'] =  "$ccc";//Get ID as string
    $row2['ID'] =  $ccc;//Get ID as number

    //E: These lines sort the array. From the end, ID is moved to the beginning
    $lastvalue_inrow = end($row2);
    $lastkey_inrow = key($row2);
    $arr_aux1 = array($lastkey_inrow => $lastvalue_inrow);
    array_pop($row2);
//    print_r ($lastkey_inrow); print_r ($lastvalue_inrow); print_r ($arr_aux1);

    $row2_sort = array_merge($arr_aux1,$row2);
//        print_r ($row2_sort);//print_r (key($row2));

    $jsonn_array[] = $row2_sort;
    $ccc ++;
}

//E: These lines encode the 'json_array', created in PHP, to be ready to send to javascript as variable
echo '<script>';
echo 'var json_from_mysql = ' . json_encode($jsonn_array) . ';';
echo '</script>';

?>