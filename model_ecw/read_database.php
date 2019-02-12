<?php
/**
 * Created by WRESTORE team. Modified by Efrain-NoaYarasca
 * Date: 2/7/2019; Time: 9:46 PM
 * This code read the data from MySQL, and write it into the webpage, which is hidden by a CSS function
 */

include ('data.php');

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

//E: The massive data from 'takefeedback' table is retrieved. I actually am going to write it out on the page in a table.
$query =("SELECT * FROM takefeedback where USERID = '$USERID'");//E: DB for "ecw"
//$query =("SELECT * FROM dmk_db1 where USERID = '$USERID'");//E: DB for Dairy-Mckay
$result = mysqli_query($connection, $query); //  ???
$row = mysqli_fetch_assoc($result); // E: Fetches (busca) a result row as an associative array.
$tableSize = mysqli_num_rows($result)+1; // E: Returns the 'number of rows + 1' from the result set
//E: The entire table of data is written and set with id='wholeTable'.
//E: The 'wholeTable' is hidden (escondido) with a css function. You can turn that css if you want to see it.

if (mysqli_num_rows($result)>0){
    print '<table border="2" id="wholeTable"><tr>';//E: 'tr' set a row
    // E: these lines read and set the names (headers) in the table
    print "<th>ID</th>";
    foreach($row as $name => $value) {
        print "<th>$name</th>";//E: 'th' sets a header
    }
    print '</tr>';

    while($row) {
        $ColCount=0;
        print '<tr>';
        print "<td>$count</td>";
        foreach($row as $value) {
            $ColCount=$ColCount+1;
            if ( $value ==''  ) {
                print "<td></td>";
            } else {
                print "<td>$value</td>";
            }
        }
        print '</tr>';
        $row = mysqli_fetch_assoc($result);
        $count = $count + 1;
    }


    // I am looking to see if we are left with an odd number of maps. If so, I add one line of fake data so that the
    // maps load properly on the last page.
    // E: If the number of rows (coming from mysql) is odd, the last map will not load properly. That is why, here a
    // row with data mostly zeros is added to have NO problems loading the last map.
    if ( $count%2 ){
        print '<tr>';
        print '<td>'.$count.'</td>';
        print '<td>'.$USERID.'</td>';
        print '<td>-1</td>';
        print '<td>0</td>';
        print '<td>0</td>';
        print '<td>0,0,0,0,0,0,0</td>';
        print '<td>1</td>';
        print '<td>0,0,0,0,0,0,0,0,0,0</td>';
        print '<td>0</td>';
        $i=0;
        while($i<=($ColCount-8)){
            print '<td>0,0,0,0,0,0</td>';
            $i++;
        }
        print '</tr>';
        //print $ColCount;
    };
    print '</table>';
}

// Looking in the session table so I can find out what session type they are in and color in the needed div in the
// Progress Bar.
$query1 =("SELECT * FROM session_info where USERID='$USERID'");
$result1 = mysqli_query($connection,$query1);
$row1 = mysqli_fetch_assoc($result1);
$session_type=$row1['SESSION_TYPE'];
$searchid=$row1['SEARCHID'];
$current_session=$row1['CURRENT_SESSION'];
$jump=$row1['JUMP'];
$writeThis=NULL;
//Write out the auto search has happend!
if ($jump==1){
    $writeThis='An automated search has occurred and this is why you have jumped one human guided search process';
};
mysqli_close($connection);
if ($session_type=="0")
{$thisCSS=".i".$current_session;
    $color="green";
}
else
{$thisCSS=".s".$searchid.$current_session;
    $color="yellow";
}
//You can echo the variable above if you want to see it value. I take the var color and write out some css
// using javascript in line 550 or so below.
//echo $thisCSS;


?>