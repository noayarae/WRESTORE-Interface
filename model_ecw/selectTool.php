<?php
//session_start();

//$exp_sessionid = $_GET["sId"];

$exp_connection = mysqli_connect('localhost', 'root', '','igmi2db');
//$connection = mysql_connect('IN-GEOL-ESAIG05.geology.iupui.edu', 'wrestore', //'swat2011', 'igmi2db');
//$connection = mysqli_connect('IN-GEOL-ESAIG06.geology.iupui.edu', 'wrestore', 'swat2011', 'igmi2db');

$query = sprintf("SELECT * FROM UserStartExperimentSession WHERE sessionid='%s'",
	mysqli_real_escape_string($exp_connection,$exp_sessionid));
// Perform Query
/* Select queries return a resultset */

$result = mysqli_query($exp_connection,$query);
$row = mysqli_fetch_assoc($result);
if (mysqli_num_rows($result)>0){
//login match!!! I turn their username and userID into a session variable so I can travel with it.
mysqli_free_result($result);
$_SESSION['var'] = $row["username"];
$_SESSION['USERID'] = $row["userid"];

$sql = "DELETE FROM UserStartExperimentSession WHERE sessionid=".$exp_sessionid;

if ($exp_connection->query($sql) === TRUE) {
} else {
    echo "Error deleting record: " . $exp_connection->error;
}


$exp_connection->close();

}

 
//if ( $_SESSION['var']=="" ) {
//	header('Location: login.php');
//}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset=utf-8>
<title>WRESTORE - Watershed REstoration using Spatio-Temporal Optimization of REsources</title>    
<link rel="stylesheet" type="text/css" href="style.css" media="all" />
<link href='http://fonts.googleapis.com/css?family=Oswald:400,300' rel='stylesheet' type='text/css'>
    <!--[if IE]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>
<body>
<!--[if lte IE 6]><script src="js/ie6/warning.js"></script><script>window.onload=function(){e("js/ie6/")}</script><![endif]-->
<div class="wrapper">
	<div class="row">
			<header id="siteHeader">
                
                	<div>
                        <hgroup>
                			<h1><a href="/">WRESTORE</a></h1>
                    		<h2>Watershed REstoration using Spatio-Temporal Optimization of REsources</h2>
                            <h3>Visualize & Design Your Watershed Landscape</h3>
                		</hgroup>
                    </div>
             	
			</header>
	</div><!-- end Main Site Header -->
    <div class="row" id="navRow"> <!-- Nav Row -->
    	<nav id="mainNav">
    		<ul>
        		<li><a href="http://wrestore.iupui.edu">Return to Mainpage</a></li>
                <li><a href="login.php">Back to Login</a></li>
    		</ul>
    	</nav>
        <!--<nav id="loginNav">
        	<a href="#">Register</a> | <a href="#">Login</a>
        </nav>-->
	</div><!-- End Nav Row -->
    <div class="row mainFrameRightBck" id="mainFrame">
    	<div id="mainCol">
        	<section id="content">
        		<header id="pageHeader">
            		<h1>Getting Started</h1>
					<p><h5>You have now entered the design workspace for identifying new types of conservation practices, along with their locations and sizes, in the Eagle Creek Watershed, Indiana. Multiple alternatives will be proposed to you, each of which will have a unique layout of the practices you want to explore. </h5></p>
					<p><h5>You will also be able to test the costs and benefits of alternatives for the baseline years 2005-2008. In other words, you will be able to test the impacts of the new practices, if they had existed on the farmland in the years 2005-2008 and if you had been enrolled in the USDA Conservation Reserve Program (CRP) during that period. </h5></p>
					<h5>Please select the options for practices and goals you want to explore, and then click on "Submit" button below to initiate the design process.</h5>
            	</header>
       		    <form id="form1" name="form1" method="post" action="sendToNewUser.php">
       		        <p>
                        <label for="USERID"></label>
                        <input name="USERID" type="hidden" id="USERID" value="<?php echo $_SESSION["USERID"]; ?>" />
                    </p>
                    <table width="100%" border="1" cellspacing="1" class="table-style">
                        <tr>
                            <td colspan="3" bgcolor='	#FFFFBD'><h4>>> Which conservation  practices or best management practices (BMPs) do you want to work with? </h4>
                                <p>(select one or more)</p></td>
                            <td colspan="2" bgcolor='	#FFFFBD'><h4>>> Which of these goals  are important to you?</h4>
                            <p>(select one or more)</p></td>
                        </tr>
                        <tr>
                            <td width="23%" bgcolor='#FFFFBD'>Strip Cropping</td>
                            <td width="10%" bgcolor='#FFFFBD'><input type="checkbox" class="bmp" name="bmp1" value="a" id="CheckboxGroup1_0" /></td>
                            <td width="15%" bgcolor='#FFFFBD'>&nbsp;</td>
                            <td width="43%" bgcolor='#FFFFBD'>Decrease net costs</td>
                            <td width="9%" bgcolor='#FFFFBD'><input type="checkbox" class="funct"  name="function2" value="b" id="function2"  /></td>
                        </tr>
                        <tr>
                            <td bgcolor='#FFFFBD'>Crop Rotation</td>
                            <td bgcolor='#FFFFBD'><input type="checkbox" class="bmp" name="bmp2" value="b" id="CheckboxGroup1_1" /></td>
                            <td bgcolor='#FFFFBD'>&nbsp;</td>
                            <td bgcolor='#FFFFBD'>Decrease flooding</td>
                            <td bgcolor='#FFFFBD'><input type="checkbox" class="funct" name="function3" value="c" id="function3"  /></td>
                        </tr>
                        <tr>
                            <td bgcolor='#FFFFBD'>Cover Crops</td>
                            <td bgcolor='#FFFFBD'><input type="checkbox" class="bmp" name="bmp3" value="c" id="CheckboxGroup1_2" /></td>
                            <td bgcolor='#FFFFBD'>&nbsp;</td>
                            <td bgcolor='#FFFFBD'>Decrease  fertilizer losses</td>
                            <td bgcolor='#FFFFBD'><input type="checkbox" class="funct" name="function4" value="d" id="function4" /></td>
                        </tr>
                        <tr>
                            <td bgcolor='#FFFFBD'>Filter Strips</td>
                            <td bgcolor='#FFFFBD'><input type="checkbox" class="bmp" name="bmp4" value="d" id="CheckboxGroup1_3" /></td>
                            <td bgcolor='#FFFFBD'>&nbsp;</td>
                            <td bgcolor='#FFFFBD'>Decrease  erosion losses</td>
                            <td bgcolor='#FFFFBD'><input type="checkbox" class="funct" name="function5" value="e" id="function5" /></td>
                        </tr>
                        <tr>
                            <td bgcolor='#FFFFBD'>Grassed Waterway</td>
                            <td bgcolor='#FFFFBD'><input type="checkbox" class="bmp" name="bmp5" value="e" id="CheckboxGroup1_4" /></td>
                            <td bgcolor='#FFFFBD'>&nbsp;</td>
                            <td bgcolor='#FFFFBD'>&nbsp;</td>
                            <td bgcolor='#FFFFBD'>&nbsp;</td>
                        </tr>
                        <tr>
                            <td bgcolor='#FFFFBD'>Conservation Tillage</td>
                            <td bgcolor='#FFFFBD'><input type="checkbox" class="bmp" name="bmp6" value="f" id="CheckboxGroup1_6" /></td>
                            <td bgcolor='#FFFFBD'>&nbsp;</td>
                            <td bgcolor='#FFFFBD'>&nbsp;</td>
                            <td bgcolor='#FFFFBD'>&nbsp;</td>
                        </tr>
                        <tr>
                            <td bgcolor='#FFFFBD'>Wetlands</td>
                            <td bgcolor='#FFFFBD'><input type="checkbox" class="bmp" name="bmp7" value="g" id="CheckboxGroup1_5" /></td>
                            <td bgcolor='#FFFFBD'>&nbsp;</td>
                            <td bgcolor='#FFFFBD'>&nbsp;</td>
                            <td bgcolor='#FFFFBD'>&nbsp;</td>
                        </tr>
                    </table>
                    <h2 class="error2"></h2>
                    <p>
                        <input type="button" name="button" id="button" value="Submit" onclick="check()" />
                    </p>
                    <p>
                        <i>Disclaimer: Please note that any information you provide to us via this website is kept confidential and not shared with anyone else. Only the primary members of the research team have access to this data. If any results from your participation are presented in research reports and publications, they will be presented in aggregate form and will be free of any identifiers. If you have any questions or concerns, please do not hesitate to contact us.</i>
                    </p>
                </form>
 
            </section>
        </div><!-- end main content column -->
        <!-- Right Side Column -->
        <div id="sideCol">
            <h1>Get Involved</h1>
            <p>We provide web-based tools for visualizing watershed and designing land use and runoff management alternatives on the landscape.</p>
            <div class="barButton"><a href="http://wrestore.iupui.edu/visualize-design/how-it-works/" target="_blank">How does Wrestore work?</a></div>
            <div class="barButton"><a href="http://wrestore.iupui.edu/partners/" target="_blank">Meet our partners</a></div>
            <div class="barButton"><a href="http://wrestore.iupui.edu/resources/" target="_blank">Learn about our tools</a></div>
            <div class="barButton"><a href="http://wrestore.iupui.edu/contact/" target="_blank">Questions? Contact us</a></div>
        </div>
        <div class="clear"></div>
    </div><!-- end mainFrame -->
    <div class="row footer">
        <div id="sponsorsCon">
        	<h2>Sponsors</h2>
          <a href="http://www.iupui.edu/" target="_blank"><img src="images/logoIUPUI.gif" width="200" height="76" alt="IUPUI" class="sponsorsLogos"></a>
          <a href="http://oregonstate.edu/" target="_blank"><img src="images/logoOsu.gif" width="200" height="76" alt="Oregon State University" class="sponsorsLogos"></a>
          <a href="http://www.nsf.gov/" target="_blank"><img src="images/logoNsf.gif" alt="NSF" width="75" height="76" class="sponsorsLogos"></a>
        </div><!-- end sponsorsCon -->
    </div>
</div><!-- end Wrapper -->

<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.js"></script>
<script type="text/javascript" src="js/jquery.maskedinput.js"></script>
<script type="text/javascript" src="js/jquery.keyfilter.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript">
	function check(){
		var n = $("input:checked.bmp").length;
		var p = $("input:checked.funct").length;
		if (n==0 || p==0){
			$('.error2').text("You must select at least one BMP and one Fitness Function");
		}else{
			$('#form1').submit();
		}
	}
</script>
</body>
</html>
