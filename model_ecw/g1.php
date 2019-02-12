<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="height: 100vh; overflow: hidden; width: 100%;">
<!--<html xmlns="http://www.w3.org/1999/xhtml" style="height: 100vh">-->
<head>
    <meta charset=utf-8>
    <meta http-equiv="X-UA-Compatible" content="IE=8" />
    <title>WRESTORE - Watershed REstoration using Spatio-Temporal Optimization of REsources</title>

    <link rel="stylesheet" type="text/css" href="css/basic.css"/>
    <link rel="stylesheet" type="text/css" href="css/gdropdown.css"/>
    <!-- 'css/map_legend.css' was created for editing map-legends in STEP-3 -->
    <link rel="stylesheet" type="text/css" href="css/map_legend.css">
    <link rel="stylesheet" type="text/css" href="css/star.css"/>
    <!-- 'style1a.css' file encloses styles setup at the begginig of this file -->
    <link rel="stylesheet" type="text/css" href="css/style1a.css"/>
    <!-- 'style.css' file was renamed as 'css/style1b.css' -->
    <link rel="stylesheet" type="text/css" href="css/style1b.css"/>
    <!-- 'new/style.css' was moved to 'css/style2.css'  -->
    <link rel="stylesheet" type="text/css" href="css/style2.css"/>
    <link rel='stylesheet' type='text/css' href='css/styles.css'/>
    <link rel="stylesheet" type="text/css" href="css/visualize.css"/>
    <link rel="stylesheet" type="text/css" href="js/shadowbox/shadowbox.css"/>

<!--    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Oswald:400,300' type='text/css'>
<!--    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">-->
<!--    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>-->

    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVNzONb19t-556kuu-ebT5DUF0wCpEt-g&callback=initMap"
            type="text/javascript"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type='text/javascript' src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
    <!--[if IE]><![endif]-->
<!--    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>-->
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <script type="text/javascript" src="js/legend_DOM.js"></script>
    <script type="text/javascript" src="js/json2.js"></script>
<!--    <script type="text/javascript" src="js/jquery.collapsible.js"></script>-->
    <script type="text/javascript" src="js/bargraphcpy_g1.js"></script>
    <script type='text/javascript' src='js/fda.js'></script>
    <script type='text/javascript' src='js/mt_config.js'></script>
<!--    DATA    -->
    <script src="data/ecw_basemap.js"></script> <!-- Here goes the JS.File name. var "map_data" -->
    
    <script type="text/javascript">
        //window.onload(heatinitialize);
        google.load("visualization", "1", {packages:["corechart"]});
        google.setOnLoadCallback(subBasinGraph1);
    </script>
    
    <!--  Tracking module  -->
    <script type='text/javascript'>
        /* The automaton is: s_start --one--> s_one --two--> s_two --three--> s_end
		* In the transition between s_two and s_end, when three is clicked, we invoke the submitData()
		* method, to store all collected data up to the moment.
		*/
        //	  alert ("hello again");
        fda.addTransition('s_start', 'one', 's_one');
        fda.addTransition('s_one', 'two', 's_two');
        //fda.addTransition('s_two', 'three', 's_end', function() { submitData() });
        fda.addTransition('s_two', 'three', 's_end');

        var myObj = JSON.stringify(fda.data.s_start);

        // If we are also interested in knowing whether the browser window is resized, we set this to true.
        mt_detect_resize = true;

        // This function must be invoked, and it has to go last.
        $(document).ready(init);
    </script>

    
</head>
<!--  -------------------- START BODY -----------  -->
<body name="body">
<!--  E: This "WRAPPER" Div encloses the whole page, after "BODY" with out JavaScripts -->
<div class="wrapper"> <!-- style="background:#e6ffcc;" #e6ffcc; #99ff66; #e6ff0c; -->

<!--  E: This PHP reads/grabs the data from the DB and creates a "TABLE" Html-tag to save them on it -->
<?php
include ('data.php');
//echo $yellow;

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
$query =("SELECT * FROM takefeedback where USERID = '$USERID'");
$result = mysqli_query($connection, $query); //  ???
$row = mysqli_fetch_assoc($result); // E: Fetches (busca) a result row as an associative array.
$tableSize = mysqli_num_rows($result)+1; // E: Returns the 'number of rows + 1' from the result set
//E: I am writing out the entire table of data.  I have it hid (escondido) with css where the id 'wholeTable' is hidden.
// You can always turn that css to not hide if you want to see it.
//echo mysqli_num_rows($result); ???

if (mysqli_num_rows($result)>0){
	print '<table border="2" id="wholeTable"><tr>';
	// E: these lines read and set the names in the table
	print "<th>ID</th>";
	foreach($row as $name => $value) {
		print "<th>$name</th>";
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

<!--[if lte IE 6]><script src="js/ie6/warning.js"></script><script>window.onload=function(){e("js/ie6/")}</script><![endif]-->
<!--  ================= LINE-1: WRESTORE TITTLE  ===================== -->
<div id="line1" class="wrapper1">
    <div class="wrapper2">
        <header id="siteHeader">
            <hgroup>
                <h1 id='back-main-page' name="site_header1">WRESTORE</h1>
                <h2 name="site_header2" style="padding-top: 5px; color: black;">
                    Watershed Restoration using Spatio-Temporal Optimization of Resources
                </h2>
                <h3 name="site_header3" style="letter-spacing: 2px;">Visualize & Design Your Watershed Landscape</h3>
            </hgroup>
        </header>
    </div>
</div>
<!--<div class="skip"></div>-->

<!--  ================== LINE-2: "LET's VOTE" ================= -->
<div id="line2" class="wrapper1">
    <div id="mainFrame" class="wrapper2" >
        <div id="line2-col1">
            <section id="content">
                <p name="suggestionsNumberHeader" style="display: inline-block; font-size: 17px;">
                    Total number of <font color="#7d110c"><b>alternatives</b></font> (i.e., conservation
                    plans) recommended in this session: 20 | <font color="#7d110c"><strong>Page
                    <span class="currentPage">1</span> of <span class="totalPages">20</span></strong></font>
                </p>
            </section>
        </div>
        
        <div id="line2-col2">
            <div class="topnav">
                    <!--    MENU BAR as TEXT   -->
<!--                <a id="quit" class="trackable mainbuttons submitFeedbackJon" title="Option to quit current search-->
<!--                experiment" name="Quit" href="abort.html" rel="shadowbox;height=240;width=900">Quit</a>-->

<!--                <a id="save" class="trackable mainbuttons submitFeedbackJon" title="Option to save current design and-->
<!--                come back later" name="saveMapHeader" href="#" onclick="instruct();return false;">Save</a>-->

<!--                <a id="instructions" class="trackable mainbuttons submitFeedbackJon" title="Option to view instructions-->
<!--                again" name="InstructionsHeader" href="#" onclick="open_instruction();return false;">Instructions</a>-->

<!--                <a id="take_rest" class="trackable mainbuttons submitFeedbackJon" title="Option to stop the website-->
<!--                for a while" name="TakeRest" href="#" onclick="takeRest_function();return false;">Take a rest</a>-->

                <!--    MENU BAR as ICONS   -->
                <button id="instructions" class="trackable mainbuttons2 submitFeedbackJon" onclick="open_instruction
                ()" title="Option to view instructions" style="font-size:22px">
                    <i class="fa fa-info-circle"></i></button>

                <button id="pause" class="trackable mainbuttons2 submitFeedbackJon" onclick="pause_function()"
                        title="Option to pause the website for a while" style="font-size:22px">
                    <i class="fa fa-pause"></i></button>

                <button id="save" class="trackable mainbuttons2 submitFeedbackJon" onclick="save_msg_function
                ()" title="Option to save current design and come back later" style="font-size:22px">
                    <i class="fa fa-save"></i></button>


                <button id="quit" class="trackable mainbuttons2 submitFeedbackJon" onclick="exit_wrestore()"
                        title="Option to quit current search experiment" style="font-size:22px">
                    <i class="fa fa-sign-out"></i></button>
            </div>
        </div>
    </div>
</div>

<!--  ============== LINE-3: BMP BUTTONS (off for now) ================  -->
<div id="line3" class="containerhover" style="display: none">
    <div class="tools" name="tools" id="tools">
    </div>
    <!--                    <div class="toolpic" name="toolpic" id="toolpic">-->
</div>

<!--    ================ LINE-4: MAIN MAP (before STEP 1) ================================  -->
<div id="line4" class="wrapper1 container-fluid" style="display: block;">
<!--            <div class="displayStuffa">Click inside of any sub-basin to learn about practices proposed in a sub-basin.</div>-->
            <!-- <div class="displayStuffb" name="What Do They Mean"><a href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean"><strong><em name="What Do They Mean">What do these numbers mean?</em></strong></a></div>-->
            <!--pop up boxes will display this info-->
            <!-- <div class="displayStuff"></div>-->
    
    <form id="form1" class="wrapper2" name="form1" method="post" action="sendToUsersFeedback.php?id=<? print $thisCSS;
    ?>">
        <!--        =================================== STEP 1 ======================================  -->
        <!--Changed mapHolder to mapHolder1-->
        <div class="mapHolder1 map1">
            <div class="step_line" style="height: 26px;">
                <div id="step1" class="step_box"
                     title="Lear about recommended conservation decisions in this
alternative by clicking inside each sub-basin in the map.
The left panel shows maps of how this alternative effects
the costs and benefits over the watershed landscape">STEP 1:
                </div>
                <div>
                    <h4 class="step_title_text">Learn about <font color="#7d110c"><strong>Alternative <span
                                    class="oneMap"></span></strong></font></h4>
                </div>
            </div>
            
            <div id="mapHolderOne">
                <div id="map_canvas1" name="map_canvas1"></div>
                
                <!--   ++++++++++++++   inserting in STEP1 HeatMaps   ++++++++++++++  -->
<!--                <div class ="containerABC collapsed" name='step1_alter' style="position: relative; width: 250px;-->
<!--                left: 2px; top: -464px; z-index: 100; background-color: #ffffff; height: 470px; border: 1px solid-->
<!--                #999999;">-->
<!--                <div class ="heatmaps_frame1 collapsed" name='step1_alter'>-->
                <div class ="panel_1 collapsed" name='step1_alter'>
<!--                For testing   -->
<!--                <div name='step2collapse' class ="containerABC collapsed" style="position: relative; width: 250px;-->
<!--                left: 5px; top: 0px; z-index: 100; background-color: #ff9933; border: 2px solid black;">-->

<!--                    <div class="graph" style="height: inherit; width: inherit;">-->
<!--                    <div class="dropDownArea">-->
<!--                        <label style="margin: 0px 0px 0px 3px;">Choose a catchment of interest to you</label>-->
<!--                    </div>-->
                    
<!--                        <div class="altern_container">-->
                    <div id="tabs_hm" style="font-size: 12px; height: 450px; margin: 2px 0px 0px 0px;">
                        <ul class="tabs_heatmap">
                            <li><a id="step1_start" class="trackable" href="#info_heatmap">Start</a></li>
                            <li><a id="step1_PFR_tab" class="trackable" href="#tabs-PF">PFR</a></li>
                            <li style="width: 40px;"><a id="step1_P_tab" class="trackable" style="margin: 0px 0px 0px 4px;"
                                                        href="#tabs-RV">P</a></li>
                            <li><a id="step1_SR_tab" class="trackable" href="#tabs-SR">SR</a></li>
                            <li><a id="step1_NR_tab" class="trackable" href="#tabs-NR">NR</a></li>
                        </ul>
                        <div class="tab_container2">
                            <!--    ------------ (1b) tabs-Info of HeatMap  ------------   -->
                            <div id="info_heatmap" class='tab_content2' style="height: 345px; overflow: auto;">
<!--                            <div id="info_heatmap" class='tab_content2' style="height: 345px; overflow: auto; border: 1px solid red;">-->
                                <h4 style="font-size: 20px">Instructions </h4>
                                <p>Click on tabs to view how the performance(i.e., costs and benefits) of this
                                    alternative spatially varies over the landscape. </p>
                                <br>
                                <p>Also, note the following about the tabs:</p>
                                <ul>
                                    <li><p><b>PFR </b>is Peak Flow Reduction in cubic meters per second (cms)
                                            . This represents the benefit of reduced flooding in the
                                            landscape</p></li>
                                    <li><p><b>P </b>is Profit (Revenue-Cost) in US Dollars. This represents the
                                            expenses and revenue accrued from implementing proposed conservation
                                            decisions on the landscape.
                                        </p></li>
                                    <li><p><b>SR </b>is Sediment Reduction in tons. This represents the benefit of
                                            reduced erosion in the landscape.
                                        </p></li>
                                    <li><p><b>NR </b>is Nitrate Reduction in Kilograms (kg). This represents
                                            the benefit of reduced fertilizer loss in the landscape.</p></li>
                                </ul>
                            </div>
                            <!--    ------------ (2b) tabs-PF  ------------   -->
                            <div id="tabs-PF" class="map1">
                                <div class="tab-header2">
                                    <h4>Alternative <span class="oneMap"></span></h4>
                                    <!--                                    <div class="info1 trackable" id="tab_PF_map1_Legend"> Legend_*-->
                                    <!--    ----     <img  title="click for additional information" alt="click
									for additional information" src="images/info.png" width="14" height="14" alt=""/>-->
                                    <!--                                        <img id="imm1" class="playdown" title="click for additional information"-->
                                    <!--                                             alt="click for additional information" src="images/dropdown_arrow.png" width="14" height="14" alt=""/>-->
                                    <!--                                        <div id="oneMapPF" class="tip"></div>-->
                                    <!--                                    </div>-->
                                    <input id="fullscreen_heatmap1" class="trackable" type="button"
                                           title="Click here to display a fullscreen map" value="fullscreen PFR"/>

                                </div>
                                <div id="heatMapHolderOne">
                                    <div id="oneMapPF" class="tip"></div>
                                    <!--  It draws them map1 -->
                                    <div id="heatmap_canvasPF1" name="heatmap_canvasPF1"></div>
                                </div>
                            </div>
                            <div style="clear:both"></div>

                            <!--    ------------ (3b) tabs-RV  --------   -->
                            <div id="tabs-RV" class="map1">
                                <div class="tab-header2">
                                    <h4>Alternative <span class="oneMap"></span></h4>
                                    <!--                                    <div class="info3 trackable" id="tab_RV_map1_Legend"> Legend-->
                                    <!--                            <img title="click for additional information" alt="click for additional information" src="images/info.png" width="14" height="14" alt=""/>-->
                                    <!--                                        <img id="imm3" class="playdown" title="click for additional information" alt="click for-->
                                    <!--                                additional information" src="images/dropdown_arrow.png" width="14" height="14" alt=""/>-->
                                    <!--                                        <div id="oneMapRV" class="tip"></div>-->
                                    <!--                                    </div>-->

                                    <input id="fullscreen_heatmap2" class="trackable" type="button"
                                           title="Click here to display a fullscreen map" value="fullscreen P"/>
                                </div>
                                <div id="heatMapHolderOne">
                                    <div id="oneMapRV" class="tip"></div>
                                    <!--  It draws them map1 -->
                                    <div id="heatmap_canvasRV1" name="heatmap_canvasRV1"></div>
                                </div>
                            </div>
                            <div style="clear:both"></div>

                            <!--    ------------ (4b) tabs-SR  --------   -->
                            <div id="tabs-SR" class="map1">
                                <div class="tab-header2">
                                    <h4>Alternative <span class="oneMap"></span></h4>
                                    <!--                                    <div class="info5 trackable" id="tab_SR_map1_Legend"> Legend-->
                                    <!--                            <img title="click for additional information" alt="click for additional information" src="images/info.png" width="14" height="14" alt=""/>-->
                                    <!--                                        <img id="imm5" class="playdown" title="click for additional information" alt="click for-->
                                    <!--                                additional information" src="images/dropdown_arrow.png" width="14" height="14" alt=""/>-->
                                    <!--                                        <div id="oneMapSR" class="tip"></div>-->
                                    <!--                                    </div>-->

                                    <input id="fullscreen_heatmap3" class="trackable" type="button"
                                           title="Click here to display a fullscreen map" value="fullscreen SR"/>
                                </div>
                                <div id="heatMapHolderOne">
                                    <div id="oneMapSR" class="tip"></div>
                                    <!--  It draws them map1 -->
                                    <div id="heatmap_canvasSR1" name="heatmap_canvasSR1"></div>
                                </div>
                            </div>
                            <div style="clear:both"></div>

                            <!--    -----------  (5b)  tabs-NR  ------   -->
                            <div id="tabs-NR" class="map1">
                                <div class="tab-header2">
                                    <h4>Alternative <span class="oneMap"></span></h4>
                                    <!--                                    <div class="info7 trackable" id="tab_NR_map1_Legend"> Legend-->
                                    <!--                                <img title="click for additional information" alt="click for additional information" src="images/info.png" width="14" height="14" alt=""/>-->
                                    <!--                                        <img id="imm7" class="playdown" title="click for additional information" alt="click for-->
                                    <!--                                additional information" src="images/dropdown_arrow.png" width="14" height="14" alt=""/>-->
                                    <!--                                        <div id="oneMapNR" class="tip"></div>-->
                                    <!--                                    </div>-->

                                    <input id="fullscreen_heatmap4" class="trackable" type="button"
                                           title="Click here to display a fullscreen map" value="fullscreen NR"/>
                                </div>
                                <div id="heatMapHolderOne">
                                    <div id="oneMapNR" class="tip"></div>
                                    <!--  It draws them map1 -->
                                    <div id="heatmap_canvasNR1" name="heatmap_canvasNR1"></div>
                                </div>
                            </div>
                            <div style="clear:both"></div>
                        </div>
                    </div>

                    <!--                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    -->
                </div>
                <script>
                    $( function() {
                        $("#tabs_bp").tabs();
                    } );
                </script>
                <!--   +++++++++++   finish HeatMaps in Step 1 +++++++++++ -->
            
            </div>
        </div>

        <!--        =================================== STEP 2 ======================================  -->
        <!--   ++++++++++++++   inserting Barplots STEP2  (before HeatMaps)  ++++++++++++++  -->
        <!--        This 'div" is a false frame to positioning the 'heat-map' container    -->
        <div class="false_frame" style="margin: 4px 0px 4px 0px;">
            
            <!--                <div name='step3collapse' class ="containerABC collapsed" style="position: relative;float: right;-->
            <!--                width: 275px; height: 495px; right: 2px; top: -995px; z-index: 100; background-color: #ffffff;border:-->
            <!--                1px solid #999999;">-->

<!--            <div id="heatmaps_frame" name='step2_goals' style="width: 23.3%; right: 5px; top: 0px;">-->
            <div class="panel_2" name='step2_goals' style="width: 23.3%; right: 5px; top: 0px;">
<!--                <div class = "heatmap_header" style="height: 26px;">-->
                <div class = "step_line" style="height: 26px; margin: 0px 0px 3px 0px;">
                    <div id='step2' class="step_box" name="step2" style="width: 75px;"
                         title="Learn about how costs and benefits of this alternative
compare to those of other recommended alternatives
(on previous or following pages of this session)">
                        STEP 2:
                    </div>
                    <div>
                        <h4 class="step_title_text">Compare <font color="#7d110c"><strong>Alternative <span
                                class="oneMap"></span></strong></font> with others</h4>
                    </div>
                </div>

                <div class="graph" style="height: 464px">
                    <div class="dropDownArea">
                        <label style="margin: 0px 0px 0px 3px;">Choose a catchment of interest to you</label>
                        <select id="subDrop" title="Click here to select a sub-basin" name="subDrop"
                            style="margin: 0px 0px 0px 3px;" onchange='subBasinGraph1(); selected_option();'>
                            <option id="watershed" value="Watershed" selected="selected">Full Watershed</option>
                            <?php
                            $y=1;
                            while($y<=127){
                                print "<option id=SB-$y value=S$y>Subbasin $y</option>";
                                $y++;
                            }
                            ?>
                        </select>
                        <script>
                            function selected_option() {
                                var theSelect = subDrop;
                                report('m-clk**  ' , "Sub-basin " + theSelect[theSelect.selectedIndex].value , ';');
                            }
                        </script>
                    </div>

                    <div id="tabs_bp" style="font-size: 12px; height: 413px; /*; height: 87%*/">
                        <ul class="tabs_barplot">
                            <li><a id="step2-start" class="trackable" href="#start_barplot" > Start</a></li>
                            <li><a id="step2-PFR" class="trackable" href="#PFR_barplot" > PFR</a></li>
                            <li style="width: 40px;"><a id="step2-P" class="trackable" style="margin: 0px 0px 0px 4px;" href="#CR_barplot" >
                                    P</a></li>
                            <li><a id="step2-SR" class="trackable" href="#SR_barplot" > SR</a></li>
                            <li><a id="step2-NR" class="trackable" href="#NR_barplot"> NR</a></li>
                        </ul>
                        <div class="tab_container1">
                        <!--    ------------ (1a)  tabs-Info of HeatMap  ------------   -->
                        <div id="start_barplot" style="height: 370px; overflow: auto;">
<!--                        <div id="start_barplot" style="height: 406px; overflow: auto; border: 1px solid red">-->
                            <h4 style="font-size: 20px">Instructions </h4>
                            <p>Click on tabs to view bar plots that compare performance (i.e., costs and benefits) of
                                this alternative with others.</p>
                            <br>
                            <p>Also, note the following about the bar plots:</p>
                            <ol>
                                <li>The orange colored bar corresponds to the alternative you see on this page.</li>
                                <li>The length of the bar corresponds to an average value of a cost or benefit.
                                    When thin lines are present within the bars, they indicate the range (i.e.,
                                    minimum and maximum values) of the cost or benefit.</li>
                                <li><p>The acronym for costs and benefits stand for:</p>
                                    <ul style="list-style-type:disc">
                                        <li><p><b>PFR </b>is Peak Flow Reduction in cubic meters per second (cms)
                                                . This represents the benefit of reduced flooding in the
                                                landscape</p></li>
                                        <li><p><b>P </b>is Profit (Revenue-Cost) in US Dollars. This represents the
                                                expenses and revenue accrued from implementing proposed conservation
                                                decisions on the landscape.
                                            </p></li>
                                        <li><p><b>SR </b>is Sediment Reduction in tons. This represents the benefit of
                                                reduced erosion in the landscape.
                                            </p></li>
                                        <li><p><b>NR </b>is Nitrate Reduction in Kilograms (kg). This represents
                                                the benefit of reduced fertilizer loss in the landscape.</p></li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                        <!--    ------------ (2a)  tabs-PFR  ------------   -->
                        <div id="PFR_barplot">
                            <div id="chart_div1"></div>
                        </div>
                        <!--    ------------ (3a)  tabs-Cost  ------------   -->
                        <div id="CR_barplot">
                            <div id="chart_div2"></div>
                        </div>
                        <!--    ------------ (4a)  tabs-Sed. Reduction  ------------   -->
                        <div id="SR_barplot">
                            <div id="chart_div3"></div>
                        </div>
                        <!--    ------------ (5a)  tabs-Nit. Reduction  ------------   -->
                        <div id="NR_barplot">
                            <div id="chart_div4"></div>
                        </div>
                    </div>
                    </div>
                </div>

<!--                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    -->
            </div>
            <script>
                $( function() {
                    $("#tabs_hm").tabs();
                } );
            </script>

        </div>
        <!--    +++++++++++  finish inserting Barplots in STEP2  +++++++++++ -->
        
        <div style="clear:both"></div>
    </form>

</div>
    
    <div style="clear:both"></div>
    
        
<!--    =================================  STEP 3 (before step4)  ====================================    -->
    <!--     *******  Inserting RATING (STEP 3)  *********  -->
<div id="line5" class="wrapper1">
    <div class="wrapper2">
        <div class="vote_section" style="position: relative; /*left: 345px; top: -515px;*/ z-index: 100;">

<!--            <h2 name="step4">STEP 3: Time to vote! Provide a rating for the suggestion shown above.</h2>-->
            <div class="step_line">
                <div class="step_box" name="step3" title="Let's Vote!">STEP 3:</div>
<!--                <div class="displayStuffa">Provide a rating for the <b>alternative</b> shown above</div>-->

                <div class="map1" style="display: inline-flex; margin: 5px;">
                    <div>
                        <h4 class="step_title_text">Rate <font color="#7d110c"><strong>Alternative <span
                                            class="oneMap"></span></strong></font> based on its performance and
                            feasibility</h4>
                    </div>
<!--                    <div class="innerMapLinesHead">-->
<!--                        <h4>Rate the design and performance of this suggestion </h4>-->
<!--                    </div>-->

                    <div class="innerMapLines">
                        <div class="rating">
                            <input id='step3_star0' class="trackable" name="rating1"
                               type="radio" value="0" checked /><span id="hide"></span>
                            <input id='step3_star1' class="trackable" name="rating1"
                               type="radio" value="1" /><span></span>
                            <input id='step3_star2' class="trackable" name="rating1"
                               type="radio" value="2" /><span></span>
                            <input id='step3_star3' class="trackable" name="rating1"
                               type="radio" value="3" /><span></span>
                            <input id='step3_star4' class="trackable" name="rating1"
                               type="radio" value="4" /><span></span>
                            <input id='step3_star5' class="trackable" name="rating1"
                               type="radio" value="5" /><span></span>
                            <input name="rating1" type="text" class="padInput" id="rating1" size="2" />
                        </div>
                    </div>

                    <div class="innerMapLinesHead1">
                        <h4>How confident are you about your rating? (%)</h4>
                    </div>
                    <div class="innerMapLines1">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td width="22%"><input name="confidence1" type="text" id="confidence1" size="3" readonly="readonly"/></td>
                                <td width="78%"><div id="slider"></div></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    <!--   **************    Finish inserting RATING  ********  -->



<!--    ==========================================  STEP 5  ==========================================    -->
<!--<h2 name="step5">STEP 5: click on the blue buttons to see additional suggestions or click on the orange button if you have rated <b>all</b> of them.</h2>-->
<div style="clear:both"></div>

<div id="line6">
    <div id="move_alt" class="wrapper2" style="position: relative; top: -32px;">
<!--    For testing-->
<!--    <div id="move_alt" class="wrapper2">-->
        <div id="move_frame2" style="/*border: 1px solid; border-radius: 5px*/">
            <div class="l6_box" style="/*border: 1px solid; border-radius: 5px*/">
                <input id="Back" class="trackable barBlue moveBack" type="button" name="Back"
                       title="Click here to back to the previous alternative" value="&lt;&lt; Previous Alternative" />
            </div>
            <div class="l6_box" style="/*border: 1px solid; border-radius: 5px*/">
                <input id="button" class="trackable barOrange submitAll" type="button" name="Submit All Maps" value="Done with all the Ratings"
                       style="margin: 0px auto 0px auto;" />
            </div>
            <div class="l6_box" style="/*border: 1px solid; border-radius: 5px*/">
                <input id="Next" class="trackable barBlue moveNext" type="button" name="Next"
                       title="Click here to move to the next alternative" style="position:
                relative; float: right;" value="Next Alternative &gt;&gt;" />
            </div>
        </div>
    </div>
</div>


<!-- ===================================  END  STEP 5  =================================== -->

    <!--  VOLADIZOS  -->
    <!--  (1) Voladizo 1: Fullscreen Button  -->
    <!--    This lines add new icon in the main map for fullscreen -->
    <!--  For RIGHT side  -->
    <!--    <input type="button" id="fullscreen" value="Fullscreen" style="position: relative; top: -618px; left: 965px;-->
    <!--    z-index: 200; width: 90px; height: 25px; background-color: #ff9999; cursor: pointer" />-->
    <!--  For LEFT side  -->
    <input id="fullscreen" class="trackable" title="Click here to display a fullscreen map" type="button"
           value="Fullscreen" style="position: relative; top: -587px;
     left: 296px; z-index: 200; width: 90px; height: 25px;/* background-color: #ff9999*/; cursor: pointer" />
    <!--  For TESTING  -->
    <!--    <input type="button" id="fullscreen" value="Fullscreen" style="position: relative; z-index: 200; width: 90px; -->
    <!--    height: 25px; background-color: #ff9999; cursor: pointer" />-->

    <!--  (2) Voladizo 2: DataBase  -->
    <!--        <textarea name="JSONHolder" id="JSONHolder" cols="45" rows="5" style="display: none;"></textarea>-->
    <textarea name="JSONHolder" id="JSONHolder" cols="45" rows="5"></textarea>
    <div class="clear"></div>

    <!--  (3) Voladizo 3: SVG circle-shapes for representing Wetlands into the main map -->
    <!--  Start SVG  -->
    <!--  (width, height, cx,cy,r) = (box_width, box_height, coord_x, coord_y, radius)  -->
    <div id="div1">wetlands' Circles: r = 3.5, 4.5, 5.0, 5.5, 6.0, 7.0, 7.5</div>
    <svg id="svg1" width="7" height="7">
        <circle cx="3.5" cy="3.5" r="3.5" fill="#336699" />
        Sorry, your browser does not support inline SVG.
    </svg>
    <svg id="svg2" width="9" height="9">
        <circle cx="4.5" cy="4.5" r="4.5" fill="#e600e6" />
        Sorry, your browser does not support inline SVG.
    </svg>
    <svg id="svg3" width="10" height="10">
        <circle cx="5" cy="5" r="5" fill="#ff6666" />
        Sorry, your browser does not support inline SVG.
    </svg>
    <svg id="svg4" width="11" height="11">
        <circle cx="5.5" cy="5.5" r="5.5" fill="#00b300" />
        Sorry, your browser does not support inline SVG.
    </svg>
    <svg id="svg5" width="12" height="12">
        <circle cx="6" cy="6" r="6" fill="#e6b800" />
        Sorry, your browser does not support inline SVG.
    </svg>
    <svg id="svg6" width="14" height="14">
        <circle cx="7" cy="7" r="7" fill="#1ad1ff" />
        Sorry, your browser does not support inline SVG.
    </svg>
    <svg id="svg7" width="16" height="16">
        <!--        <circle cx="7.5" cy="7.5" r="7.5" stroke="black" stroke-width="1" fill="#ff3300" />-->
        <circle cx="7.5" cy="7.5" r="7.5" fill="#ff3300" />
        Sorry, your browser does not support inline SVG.
    </svg>
    <!--  End SVG  -->

    <!--  (4) Voladizo 4: Instructions BOX -->
    <!--  Start Instructions Box  -->
    <div id="shade_frame">
    </div>
    <div id="inst_box1">
        <div id="sb-title-inner" class="inst_base">
            WRESTORE Visualization Tool
        </div>
        <div id="message_box">
            <div id="ints_welcome-msg">
                <h2>Instructions</h2><br>
                <p>In this session, you will see multiple options for implementing new conservation practices on the
                    watershed landscape.</p>
                <br/>
                <p>In WRESTORE, an option is also called an <b>alternative</b> or a <b>conservation plan</b>. Every
                    alternative consists of multiple conservation decisions distributed over the landscape. Each
                    conservation decision describes the type of recommended conservation practice, location where the
                    practice is implemented, and other attributes such as size, etc.</p>
                <br/>
                <p>You are advise to first learn about decisions recommended by an alternative (i.e. <b>Step 1</b>), then
                    compare it with other alternatives (i.e. <b>Step 2</b>), and then finally evaluate the alternative based
                    on its overall performance, feasibility, and your own personal preferences (i.e. <b>Step 3</b>).</p>
                <br/>
                <p>Your feedback will help WRESTORE to identify how to create new alternatives that best meet your
                    preferences and constraints.</p>
            </div>
        </div>
        <div class="cross"><img id="close_instruction" class="trackable cross_img"  onclick="close_instruction();"
                                title="Close" src="images/cross_img_15.png" alt=""/></div>
    </div>
    <script type="text/javascript">
        function close_instruction(){
//            alert ("hello instruction open");
            document.getElementById("shade_frame").style.display = "none";
            document.getElementById("inst_box1").style.display = "none";
        }
    </script>
    <!--  End Instructions Box  -->

    <!--  (5) Voladizo 5: Take-Rest BOX -->
    <!--  Start Take-Rest Box  -->
    <div id="shade_frame">
    </div>
    <div id="inst_box1_tr">
        <div id="sb-title-inner" class="inst_base">
            WRESTORE Visualization Tool
        </div>
        <div id="message_box">
            <div id="ints_welcome-msg">
                <h2>Pause !</h2>
                <br>
                <p>You clicked on the Pause button. When you are ready to continue working with WRESTORE, please
                    close this window by clicking on the cross icon <img src="images/cross_img_15.png" style="width:
                    14px; height: 14px; border: 1px solid; border-radius: 50%"> (bottom right). </p>
                <br>
            </div>
        </div>
        <div class="cross"><img id="close_pause" class="trackable cross_img" onclick="close_tr_instruction();"
                                title="Close" src="images/cross_img_15.png" alt=""/></div>
    </div>
    <script type="text/javascript">
        function close_tr_instruction(){
//            alert ("hello instruction open");
            document.getElementById("shade_frame").style.display = "none";
            document.getElementById("inst_box1_tr").style.display = "none";
        }
    </script>
    <!--  End Take-Rest Box  -->


    <!--  (6a) Voladizo 6: Save-msg-function BOX -->
    <!--  Start Save-msg-function Box  -->
    <div id="shade_frame">
    </div>
    <div id="save_box1_tr">
        <div id="sb-title-inner" class="inst_base">
            WRESTORE Visualization Tool
        </div>
        <div id="message_box">
            <div id="ints_welcome-msg">
                <h2>Save</h2>
                <br>
                <p>Your work has been saved. Please, close this window by clicking on the cross icon <img
                            src="images/cross_img_15.png" style="width:
                    14px; height: 14px; border: 1px solid; border-radius: 50%"> (bottom right) to continue. </p>
                <br>
            </div>
        </div>
        <div class="cross"><img id="close_save" class="trackable cross_img" onclick="close_save_msg();"
                                title="Close" src="images/cross_img_15.png" alt=""/></div>
    </div>
    <script type="text/javascript">
        function close_save_msg(){
//            alert ("hello instruction open");
            document.getElementById("shade_frame").style.display = "none";
            document.getElementById("save_box1_tr").style.display = "none";
        }
    </script>
    <!--  End Save-msg-function Box  -->

    <!--  (6b) Voladizo 6: Inactive-time -->
    <!--  Start Inactive-time Box  -->
    <div id="shade_frame">
    </div>
    <div id="inst_box1_in">
        <div id="sb-title-inner" class="inst_base">
            WRESTORE Visualization Tool
        </div>
        <div id="message_box">
            <div id="ints_welcome-msg">
                <h2>Inactive time</h2>
                <br>
                <p>It appears you are inactive on this page. When you are ready to continue working with WRESTORE,
                    please close this window by clicking on the cross icon <img src="images/cross_img_15.png" style="width:
                    14px; height: 14px; border: 1px solid; border-radius: 50%"> (bottom right). </p>
                <br>
<!--                <button id="continue_after_inactive" class="trackable" onclick="cont_after_inactive()">Continue</button>-->
            </div>
        </div>
        <div class="cross"><img id="close_inactive" class="trackable cross_img" onclick="cont_after_inactive();"
                                title="Close" src="images/cross_img_15.png" alt=""/></div>
    </div>
    <script type="text/javascript">
        function cont_after_inactive(){
//            alert ("hello instruction open");
            document.getElementById("shade_frame").style.display = "none";
            document.getElementById("inst_box1_in").style.display = "none";
        }
    </script>
    <!--  End Inactive-time Box Box  -->

    <!--  (7) Voladizo 7:  -->
    <!--  Start   -->

    <!--  End   -->

    <!--  End VOLADIZOS -->
</div>
<!-- E: end the "wrapper" Div which holds the all page after "BODY" Div -->

<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
<link href="js/shadowbox/shadowbox.css" rel="stylesheet" type="text/css"/>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.js"></script>
<script type="text/javascript" src="http://filamentgroup.github.com/EnhanceJS/enhance.js"></script>

<script type="text/javascript" src="js/jquery.maskedinput.js"></script>
<script type="text/javascript" src="js/jquery.keyfilter.js"></script>
<script type="text/javascript" src="js/shadowbox/shadowbox.js"></script>
<script type="text/javascript" src="js/mapping_new_g1.js"></script>
<script type="text/javascript" src="js/heatmapnew1_g1.js"></script>
<script type="text/javascript" src="js/visualize.jQuery.js"></script>
<script type="text/javascript" src="js/excanvas.js"></script>
<script type="text/javascript" src="js/graphing.js"></script>
<script type="text/javascript" src="js/graphingSub.js"></script>

<script type="text/javascript">
    Shadowbox.init();
</script>

<!--  Start TOOLTIP TOOL TIP -->
<!--  This 'script' sets a message on some icons when hovering  -->
<script type="text/javascript">
    $(document).ready(function() {
        // Tooltip only Text
        $('.masterTooltip').hover(function(){
            // Hover over code
            var title = $(this).attr('title');
            $(this).data('tipText', title).removeAttr('title');
            $('<p class="tooltip"></p>')
                .text(title)
                .appendTo('body')
                .fadeIn('fast');
        }, function() {
            // Hover out code
            $(this).attr('title', $(this).data('tipText'));
            $('.tooltip').remove();
        }).mousemove(function(e) {
            var mousex = e.pageX + 20; //Get X coordinates
            var mousey = e.pageY + 10; //Get Y coordinates
            $('.tooltip')
                .css({ top: mousey, left: mousex })
        });
    });
</script>
<!--  End TOOLTIP TOOL TIP -->

<?php /*?><?
            //This grabs the incoming test type from Vidya and uses php to write out the jquery needed to style the progress bar. From Line 150 or so above
            echo "
            <script type=\"text/javascript\">
             $('".$thisCSS."').css('background','#e2e2e2');
             $('".$thisCSS."').css('color','".$color."');
             $('".$thisCSS."').css('font-weight','bold');
             $('.skip').html(".$writeThis.");
            </script>";
            ?><?php */?>

<script type="text/javascript">
    //The next chunk of code is simply parsing out all the data from the table at the top of the page and putting them in Arrays that we can access for all things. Also creates the answers array that we need to pass the answers. If you ever want to see any of these arrays you can use the structure // alert(JSON.stringify(arrayName)); where arrayName is the name of the array you want to see.
    var array = [];
    var headers = [];
    var answersArray=[];
    var chartArray=[];
    // alerta (JSON.stringify (arrayName));

    $('#wholeTable th').each(function(index, item) {
        headers[index] = $(item).html();
    });
    $('#wholeTable tr').has('td').each(function() {
        var arrayItem = {};
        var arrayItemAnswers = {};
        var chartArrayItems={};

        $('td', $(this)).each(function(index, item) {
            arrayItem[headers[index]] = $(item).html();
            //alert(JSON.stringify(headers[index]));
            //I am grabbing the incoming information to create the answers array. I will be replacing these numbers as they fill them out
            //themselves but for now we need all the originals.
            if(headers[index]=="USERID" || headers[index]=="INDVID" || headers[index]=="RATING"  || headers[index]=="CONFIDENCE" ){
                arrayItemAnswers[headers[index]] = $(item).html();
            }


            if(headers[index]=="F0" || headers[index]=="F1" || headers[index]=="F2"  || headers[index]=="F3"  || headers[index]=="F4"  || headers[index]=="F5" ){
                chartArrayItems[headers[index]] = $(item).html();
            }
        });

        arrayItemAnswers["stripCropping"]="0";
        arrayItemAnswers["cropRotation"]="0";
        arrayItemAnswers["coverCrops"]="0";
        arrayItemAnswers["filterStrips"]="0";
        arrayItemAnswers["grassedWaterways"]="0";
        arrayItemAnswers["conservationTillage"]="0";
        arrayItemAnswers["Wetlands"]="0";

        array.push(arrayItem);
        answersArray.push(arrayItemAnswers);
        chartArray.push(chartArrayItems);

    });

    //**********************************trying to enter the heatmap code***************************

    var heatpfra=new Array(); //HEAT-Peak-Flow-Reduction-Array
    var heatera=new Array();  //HEAT-Economic-Revenue-Array
    var heatseda=new Array(); //HEAT-SEDiment-Array
    var heatnita=new Array(); //HEAT-NITrate-Array
    var heatitera=1;
    var heatiter=1;

    $('#wholeTable tbody tr').has('td').each(function() {
        heatiter=1;
        var heatpfr=new Array();
        var heater=new Array();
        var heatsed=new Array();
        var heatnit=new Array();
        
        //		$('td:nth-child(15)').nextUntil('td:nth-child(143)').each(function() {
        $('td:gt(14):lt(127)',$(this)).each(function() {
            var subarr=[];

            subarr = JSON.parse("["+$(this).html()+"]");
            //   subarr=($(this).html()).split(',');
            //   console.log("************************************************")
            //   console.log(JSON.stringify(subarr[1][0]))
            heatpfr.push({name:heatiter, val:-subarr[1][0]});
            heater.push({name:heatiter, val:-subarr[2][0]});
            heatsed.push({name:heatiter, val:-subarr[3][0]});
            heatnit.push({name:heatiter, val:-subarr[4][0]});
            heatiter++;

        });

        heatpfr.sort( function (a, b) {
            if ((typeof b.val === 'undefined' && typeof a.val !== 'undefined') || a.val < b.val) {
                return -1;
            }
            if ((typeof a.val === 'undefined' && typeof b.val !== 'undefined') || a.val > b.val) {
                return 1;
            }
            return 0;
        });

        heater.sort(function (a, b) {
            if ((typeof b.val === 'undefined' && typeof a.val !== 'undefined') || a.val < b.val) {
                return -1;
            }
            if ((typeof a.val === 'undefined' && typeof b.val !== 'undefined') || a.val > b.val) {
                return 1;
            }
            return 0;
        });

        heatsed.sort(function (a, b) {
            if ((typeof b.val === 'undefined' && typeof a.val !== 'undefined') || a.val < b.val) {
                return -1;
            }
            if ((typeof a.val === 'undefined' && typeof b.val !== 'undefined') || a.val > b.val) {
                return 1;
            }

            return 0;
        });
        heatnit.sort(function (a, b) {
            if ((typeof b.val === 'undefined' && typeof a.val !== 'undefined') || a.val < b.val) {
                return -1;
            }
            if ((typeof a.val === 'undefined' && typeof b.val !== 'undefined') || a.val > b.val) {
                return 1;
            }

            return 0;
        });

        heatpfra.push({name:heatitera, val:heatpfr});
        heatera.push({name:heatitera, val:heater});
        heatseda.push({name:heatitera, val:heatsed});
        heatnita.push({name:heatitera, val:heatnit});
        heatitera++;
    });

    //console.log(JSON.stringify(heatpfra[1]));
    //console.log(heatpfra[1]);
    //console.log(heatpfra[1].val);
    var ressss=new Array();
    ressss= heatpfra[0].val.map(function(a) { return a.name;});

    //console.log(ressss.indexOf(Number(37)));
    console.log(JSON.stringify(ressss));
    //ressss= heatpfra[1].val.map(function(a) { return a.name;});
    //console.log(JSON.stringify(ressss));
    //console.log(heatpfra[1].val[0].val);
    //console.log(heatpfra[1].val[0].name);

    //**********************************trying to enter the heatmap code (2)***************************

    //expand collapse

    $(".tools").click(function () {

        $tools = $(this);
        //getting the next element
        $toolpic = $tools.next();
        //open up the toolpic needed - toggle the slide- if visible, slide up, if not slidedown.
        $toolpic.slideToggle(500, function () {
            //execute this after slideToggle is done
            //change text of tools based on visibility of toolpic div
            /*$tools.text(function () {
                 //change text based on condition
                 return $toolpic.is(":visible") ? "Collapse" : "Expand";
            });*/
        });
    });

    //empty the comment box div that are not corresponding to the BMP selection.
    var subBMP=[];
    subBMP = array[0].CHOSENBMP.split(','); //E: 'CHOSENBMP' is the binary number of ChosenBMP from the DDBB
    //alert ("array[].CHOSENBMP(949): " + array[0].CHOSENBMP);
//    alert ("subBMP(949): " + subBMP);
    console.log("L.1021 subBMP: " + subBMP);// E: It shows the selected BMP, ex: 1,1,1,1,1,1,0,1,1,0
    console.log("subBMP[0]: " + subBMP[0]);
    console.log("subBMP[6]: " + subBMP[6]);
    console.log("subBMP[7]: " + subBMP[7]);
    console.log("subBMP[9]: " + subBMP[9]);
    
    if(subBMP[0] != 1){$('#stripCropping.commentBoxQ').hide();}
    if(subBMP[1] != 1){$('#cropRotation.commentBoxQ').hide();}
    if(subBMP[2] != 1){$('#coverCrops.commentBoxQ').hide();}
    if(subBMP[3] != 1){$('#filterStrips.commentBoxQ').hide();}
    if(subBMP[4] != 1){$('#grassedWaterways.commentBoxQ').hide();}
    if(subBMP[5] != 1){$('#conservationTillage.commentBoxQ').hide();}
    if(subBMP[7] != 1){$('#Wetlands.commentBoxQ').hide();}
    
    //for star rating hover
    $('.rating input[type="radio"]').hover(function() {
        $(this).nextAll('span').removeClass().addClass('jshoverNext');
        $(this).next('span').removeClass().addClass('jshover');
        $(this).prevAll('span').removeClass().addClass('jshover');
    },function() {
        $('.rating input[type="radio"] + span').removeClass();
    });
    

    var totalLength=array.length;

//    var totalPages=Math.floor(totalLength/2);
    var totalPages=Math.floor(totalLength);
    var page = 1;
    var oneMap=0;// E: The DDBB is set in Array starting from 0. Ex: CHOSENBMP[0] to CHOSENBMP[19]. That is why
    // oneMap starts from zero, at each moveNext or moveBack it increases or decreases
    var twoMap=1;
    var subBasinArray=[];
    var subBasinArray2=[];
    //Shows what maps we are on. oneMap and twoMap are important variables.
    $( ".oneMap" ).html(oneMap+1);
    $( ".twoMap" ).html(twoMap+1);

    var map1;
    ///BEGIN FUNCTION FOR MAPPING IT IS CALLING THE MAPPING JS
    var forMapArray=[];
    var forMapArray2=[];
    var subBasinArrayStart=[];
    var subBasinArrayStart2=[];
    var bmpArray=[];
    var bmpArray2=[];
    var assArray=[];
    var assArray2=[];
    var session=0;
    var bmpArrayNames=["strip_cropping", "crop_rotation", "cover_crops", "filter_strips", "grassed_waterway", "conservation_tillage", "No", "variable_area_wetlands","variable_wetfr_wetlands"];
    //only call to graph based off of maps
    //graphIt();
    var instance = 0;
    colorChangeGraphIt(instance);

    //   **************  It goes until Line 2282  ********************* //
    $(document).ready(function() {
        //This is the function used to allow the user to stop in the middle of grading maps and come back later and  have the results saved.
        $('.submitFeedbackJon').live("click",function() {
            $.ajax({
                url: 'sendBackTakefeedback.php',
                type: 'post',
                //dataType: 'json',
                data:"JSONHolder=" + $('#JSONHolder').val(),
                success: function(data) {
                    Shadowbox.open({
                        content:    '<div id="welcome-msg"><h2>Maps Saved</h2>You may now close this window and continue this feedback or simply quit your browser and return later to continue.</div>',
                        player:     "html",
                        title:      "WRESTORE Visualization Tool ",
                        height:     450,
                        width:      550
                    });
                }
            });
        });


        $("body").click(function(e) {
            session = session+1;
            /*var obj3=$(e.target);
            obj4 = obj3.getAttribute("Height");
            //alert(session);
            var obj2=5;
            var obj2=$(e.target).naturalHeight;
            var obj1=$(e.target).naturalWidth;*/

            var obj1 = $(e.target).attr('name');
//            alert("obj1:  " + obj1);
            var obj8 = $(e.target).attr('width');
            var obj3 = $(e.target).attr('height');
            var objj = $(e.target).parents().eq(11);
            console.log($(e.target).parents().eq(11).attr('className'));

            if((obj3==492) && (obj8==59)){
                obj1= 'popupClose';
            }
            var answer='NULL';

            if(obj1=='stripCropping1'){
                var answer=document.querySelector('input[name="stripCropping1"]:checked').value;
            }

            if(obj1=='stripCropping2'){
                var answer=document.querySelector('input[name="stripCropping2"]:checked').value;
            }

            if(obj1=='cropRotation1'){
                var answer=document.querySelector('input[name="cropRotation1"]:checked').value;
            }

            if(obj1=='cropRotation2'){
                var answer=document.querySelector('input[name="cropRotation2"]:checked').value;
            }

            if(obj1=='coverCrops1'){
                var answer=document.querySelector('input[name="coverCrops1"]:checked').value;
            }

            if(obj1=='coverCrops2'){
                var answer=document.querySelector('input[name="coverCrops2"]:checked').value;
            }

            if(obj1=='filterStrips1'){
                var answer=document.querySelector('input[name="filterStrips1"]:checked').value;
            }

            if(obj1=='filterStrips2'){
                var answer=document.querySelector('input[name="filterStrips2"]:checked').value;
            }

            if(obj1=='grassedWaterways1'){
                var answer=document.querySelector('input[name="grassedWaterways1"]:checked').value;
            }

            if(obj1=='grassedWaterways2'){
                var answer=document.querySelector('input[name="grassedWaterways2"]:checked').value;
            }

            if(obj1=='conservationTillage1'){
                var answer=document.querySelector('input[name="conservationTillage1"]:checked').value;
            }

            if(obj1=='conservationTillage2'){
                var answer=document.querySelector('input[name="conservationTillage2"]:checked').value;
            }

            if(obj1=='Wetlands1'){
                var answer=document.querySelector('input[name="Wetlands1"]:checked').value;
            }

            if(obj1=='Wetlands2'){
                var answer=document.querySelector('input[name="Wetlands2"]:checked').value;
            }

            if(obj1=='rating1'){
                var answer=document.querySelector('input[name="rating1"]:checked').value;
            }

            if(obj1=='rating2'){
                var answer=document.querySelector('input[name="rating2"]:checked').value;
            }

            if(obj1=='subDrop'){
                var answer=document.getElementsByName('subDrop').item(0).value;
            }

            if(obj1=='bmpType'){
                var answer=$(e.target).val();
            }

            if(obj1=='heatDrop'){
                var answer='suggestion '+document.getElementsByName('heatDrop').item(0).value;
            }


            if (typeof obj1==="undefined" | typeof obj1==="");
            //alert ("bad");
            else(
                //alert(obj1);
                $.ajax({
                    url: 'sendToTime.php',
                    type: 'post',
                    data:"JSONHolder=" + obj1 + "," + page + "," + session+ "," + answer,
                    success: function(data) {
                        //alert(obj1);
                    }
                }));
            // Do whatever you want; the event that'd fire if the "special" element has been clicked on has been cancelled.
        });

        function goToTime(incoming) {
            session = session+1;
            //session= session+1;
            //alert(session);
            $.ajax({
                url: 'sendToTime.php',
                type: 'post',
                data:"JSONHolder=" + incoming + "," + page + "," + session,
                success: function(data) {
                    //alert(incoming);
                }
            });
            // Do whatever you want; the event that'd fire if the "special" element has been clicked on has been cancelled.
        }

        //Time to get our data. getSubBasins is called each time we need a new set of maps. oneMap and twoMap are the
        // variables that change on the click of the buttons. It causes us to move to the new rows in the giant dataset.
        // The maps then read the new materials and away we go. That (mapping) occurs in the initialize() function.

        function getSubBasins(){
            subBasinArray=[];
            subBasinArray2=[];
            bmpArray=array[oneMap].CHOSENBMP.split(',');

            ///////////////////////////////////////////////////////////////////

            var option = document.getElementById('subDrop').value;

            var rowlen;

            var data = new google.visualization.DataTable();

            data.addColumn('number', 'Individual');
            data.addColumn('number', 'Peak Flow');
            data.addColumn({id:'min', type:'number', role:'interval'});
            data.addColumn({id:'max', type:'number', role:'interval'});
            data.addColumn({type: 'string', role: 'style'});
            data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});

            var data1 = new google.visualization.DataTable();

            data1.addColumn('number', 'Individual');
            data1.addColumn('number', 'Revenue in $');
            data1.addColumn({id:'min', type:'number', role:'interval'});
            data1.addColumn({id:'max', type:'number', role:'interval'});
            data1.addColumn({type: 'string', role: 'style'});
            data1.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});

            var data2 = new google.visualization.DataTable();

            data2.addColumn('number', 'Individual');
            data2.addColumn('number', 'sediment red in tons');
            data2.addColumn({id:'min', type:'number', role:'interval'});
            data2.addColumn({id:'max', type:'number', role:'interval'});
            data2.addColumn({type: 'string', role: 'style'});
            data2.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});

            var data3 = new google.visualization.DataTable();

            data3.addColumn('number', 'Individual');
            data3.addColumn('number', 'nitrate red in kilograms');
            data3.addColumn({id:'min', type:'number', role:'interval'});
            data3.addColumn({id:'max', type:'number', role:'interval'});
            data3.addColumn({type: 'string', role: 'style'});
            data3.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});

            for(var i = 0; i < 24; i++) {
                colors[i] = 'gray';
            }

            var num1 = $(".oneMap").html();
            var n1 = parseInt(num1);
            var num2 = $(".twoMap").html();
            var n2 = parseInt(num2);

            colors[n1-1] = 'FA9A50';
            colors[n2-1] = 'DFFFA5';


            if (option=="Watershed")
            {
                for (rowlen = 0; rowlen < document.getElementById('wholeTable').rows.length-1; rowlen++) {

                    var m11=Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F1)[0])))
                    var min11=Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F1)[1])))
                    var max11=Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F1)[2])))
                    var perm11=Number(Math.abs(parseFloat(m11/(JSON.parse(chartArray[rowlen].F1)[0]))))*100

                    var m12=Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F2)[0])/1))
                    var min12=Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F2)[1])))
                    var max12=Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F2)[1])))
                    var perm12=Number(Math.abs(parseFloat(m12/(JSON.parse(chartArray[rowlen].F2)[0]))))*100

                    var m13=Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F3)[0])/1))
                    var min13=Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F3)[1])))
                    var max13=Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F3)[2])))
                    var perm13=Number(Math.abs(parseFloat(m13/(JSON.parse(chartArray[rowlen].F3)[0]))))*100

                    var m14=Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F4)[0])/1))
                    var min14=Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F4)[1])))
                    var max14=Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F4)[2])))
                    var perm14=Number(Math.abs(parseFloat(m14/(JSON.parse(chartArray[rowlen].F4)[0]))))*100

                    data.addRow([rowlen+1,m11,min11,max11,colors[rowlen],createCustomHTMLContent1(rowlen+1,'PFR',m11.toExponential(2),min11.toExponential(2),max11.toExponential(2))]);
                    data1.addRow([rowlen+1,m12,min12,max12,colors[rowlen],createCustomHTMLContent1(rowlen+1,'ER$',m12.toExponential(2),min12.toExponential(2),max12.toExponential(2))]);
                    data2.addRow([rowlen+1,m13,min13,max13,colors[rowlen],createCustomHTMLContent1(rowlen+1,'SRed',m13.toExponential(2),min13.toExponential(2),max13.toExponential(2))]);
                    data3.addRow([rowlen+1,m14,min14,max14,colors[rowlen],createCustomHTMLContent1(rowlen+1,'NRed',m14.toExponential(2),min14.toExponential(2),max14.toExponential(2))]);
                }

                var options = {
                    title: 'Peak flow reduction in cubic feet per ------- (PFR)',
                    focusTarget: 'category',
                    tooltip: { isHtml: true },
                    tooltip: { trigger: 'selection'},
                    vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 } , direction: -1},
                    intervals: { style: 'bars' , color: '#fff'},
                    hAxis: { textPosition: 'none' }
                };
                var options1 = {
                    title: 'Economic Revenue in Dollars ----- (ER)',
                    focusTarget: 'category',
                    tooltip: { isHtml: true },
                    tooltip: { trigger: 'selection'},
                    vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 } , direction: -1},
                    intervals: { style: 'bars' , color: '#fff'},
                    hAxis: { textPosition: 'none' }
                };
                var options2 = {
                    title: 'In-stream sediment reduction in ---- (SRed)',
                    focusTarget: 'category',
                    tooltip: { isHtml: true },
                    tooltip: { trigger: 'selection'},
                    vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 } , direction: -1},
                    intervals: { style: 'bars' , color: '#fff'},
                    hAxis: { textPosition: 'none' }
                };
                var options3 = {
                    title: 'In-stream nitrate reduction in ----- (NRed)',
                    focusTarget: 'category',
                    tooltip: { isHtml: true },
                    tooltip: { trigger: 'selection'},
                    vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 }, direction: -1 },
                    intervals: { style: 'bars' , color: '#fff'},
                    hAxis: { textPosition: 'none' }
                };

                chart = new google.visualization.BarChart(document.getElementById('chart_div1'));
                chart1 = new google.visualization.BarChart(document.getElementById('chart_div2'));
                chart2 = new google.visualization.BarChart(document.getElementById('chart_div3'));
                chart3 = new google.visualization.BarChart(document.getElementById('chart_div4'));

                chart.draw(data, options);
                chart1.draw(data1, options1);
                chart2.draw(data2, options2);
                chart3.draw(data3, options3);

                //the barclick event capturing is done here.
                google.visualization.events.addListener(chart, 'select', function goToTimeBar() {
                    var clickd=chart.getSelection();
                });

                google.visualization.events.addListener(chart1, 'select', function goToTimeBar() {
                    var clickd=chart1.getSelection();
                    console.log(clickd);
                });

                google.visualization.events.addListener(chart2, 'select', function goToTimeBar() {
                    var clickd=chart2.getSelection();
                });

                google.visualization.events.addListener(chart3, 'select', function goToTimeBar() {
                    var clickd=chart3.getSelection();
                });

                function createCustomHTMLContent1(row, dm, m, min, max) {
                    return '\n'+'Alternative: ' + row +'\n'+dm+': '+ m + "\n min:" + min +"\nmax:" + max;
                }
                $('.visualize').trigger('visualizeRefresh');
            }
            else {
                for (rowlen = 0; rowlen < document.getElementById('wholeTable').rows.length-1; rowlen++) {
                    var subChart=[];

                    $.each(array[rowlen], function(key, value) {
                        if (key==option){
                            subChart=JSON.parse("["+value+"]");
                        }
                    });
                    var m11=Number(parseFloat(Math.abs(subChart[1][0])));
                    var min11=Number(parseFloat(Math.abs(subChart[1][1])));
                    var max11=Number(parseFloat(Math.abs(subChart[1][2])));
                    var perm11=0.0006;
                    var perm11=Number(Math.abs(parseFloat(m11/(JSON.parse(chartArray[rowlen].F1)[0]))))*100;

                    var m12=Number(parseFloat(Math.abs(subChart[2][0])));
                    var min12=Number(parseFloat(Math.abs(subChart[2][1])));
                    var max12=Number(parseFloat(Math.abs(subChart[2][2])));
                    var perm12=0.0006;
                    var perm12=Number(Math.abs(parseFloat(m12/(JSON.parse(chartArray[rowlen].F2)[0]))))*100;

                    var m13=Number(parseFloat(Math.abs(subChart[3][0])));
                    var min13=Number(parseFloat(Math.abs(subChart[3][1])));
                    var max13=Number(parseFloat(Math.abs(subChart[3][2])));
                    var perm13=0.0006;
                    var perm13=Number(Math.abs(parseFloat(m13/(JSON.parse(chartArray[rowlen].F3)[0]))))*100;

                    var m14=Number(parseFloat(Math.abs(subChart[4][0])));
                    var min14=Number(parseFloat(Math.abs(subChart[4][1])));
                    var max14=Number(parseFloat(Math.abs(subChart[4][2])));
                    var perm14=0.0006;
                    var perm14=Number(Math.abs(parseFloat(m14/(JSON.parse(chartArray[rowlen].F4)[0]))))*100;

                    data.addRow([rowlen+1,m11,min11,max11,colors[rowlen],createCustomHTMLContent(rowlen+1,'PFR',m11.toExponential(2),min11.toExponential(2),max11.toExponential(2),'PFR wrt Watershed',perm11.toExponential(2))]);
                    data1.addRow([rowlen+1,m12,min12,max12,colors[rowlen],createCustomHTMLContent(rowlen+1,'ER$',m12.toExponential(2),min12.toExponential(2),max12.toExponential(2),'ER$ wrt Watershed',perm12.toExponential(2))]);
                    data2.addRow([rowlen+1,m13,min13,max13,colors[rowlen],createCustomHTMLContent(rowlen+1,'SRed',m13.toExponential(2),min13.toExponential(2),max13.toExponential(2),'SRed wrt Watershed',perm13.toExponential(2))]);
                    data3.addRow([rowlen+1,m14,min14,max14,colors[rowlen],createCustomHTMLContent(rowlen+1,'NRed',m14.toExponential(2),min14.toExponential(2),max14.toExponential(2),'NRed wrt Watershed',perm14.toExponential(2))]);
                }

                var options = {
                    title: 'Peak flow reduction in cfs (PFR)',
                    focusTarget: 'category',
                    tooltip: { isHtml: true },
                    tooltip: { trigger: 'selection'},
                    vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 } , direction: -1},
                    intervals: { style: 'bars' , color: '#fff'},
                    hAxis: { textPosition: 'none' }
                };

                var options1 = {
                    title: 'Economic Revenue in Dollars (ER$)',
                    focusTarget: 'category',
                    tooltip: { isHtml: true },
                    tooltip: { trigger: 'selection'},
                    vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 } , direction: -1},
                    intervals: { style: 'bars' , color: '#fff'},
                    hAxis: { textPosition: 'none' }
                };
                var options2 = {
                    title: 'In-stream sediment reduction in tons (SRed)',
                    focusTarget: 'category',
                    tooltip: { isHtml: true },
                    tooltip: { trigger: 'selection'},
                    vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 }, direction: -1 },
                    intervals: { style: 'bars' , color: '#fff'},
                    hAxis: { textPosition: 'none' }
                };
                var options3 = {
                    title: 'In-stream nitrate reduction in kilograms (NRed)',
                    focusTarget: 'category',
                    tooltip: { isHtml: true },
                    tooltip: { trigger: 'selection'},
                    vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 } , direction: -1},
                    intervals: { style: 'bars' , color: '#fff'},
                    hAxis: { textPosition: 'none' }
                };

                chart = new google.visualization.BarChart(document.getElementById('chart_div1'));
                chart1 = new google.visualization.BarChart(document.getElementById('chart_div2'));
                chart2 = new google.visualization.BarChart(document.getElementById('chart_div3'));
                chart3 = new google.visualization.BarChart(document.getElementById('chart_div4'));

                chart.draw(data, options);
                chart1.draw(data1, options1);
                chart2.draw(data2, options2);
                chart3.draw(data3, options3);

                google.visualization.events.addListener(chart, 'select', function goToTimeBar() {
                    var clickd=chart.getSelection();
                });

                google.visualization.events.addListener(chart1, 'select', function goToTimeBar() {
                    var clickd=chart1.getSelection();
                });

                google.visualization.events.addListener(chart2, 'select', function goToTimeBar() {
                    var clickd=chart2.getSelection();
                });

                google.visualization.events.addListener(chart3, 'select', function goToTimeBar() {
                    var clickd=chart3.getSelection();
                });

                function createCustomHTMLContent(row, dm , m, min, max, dpermw, permw) {
                    return '\n'+'Alternative: ' + row +'\n'+dm+': '+ m +"\nmin:"+ min + "\nmax:" + max + "\n" + dpermw +': '+permw+' %';
                }
                $('.visualize').trigger('visualizeRefresh');

            }
            /////////////end charting stuff

            subBasinArrayStart=array[oneMap].REGIONSUBBASINID.split(',');
            assArray=array[oneMap].ASSIGNMENTS.split(',');
            var count=0;
            $.each(subBasinArrayStart, function(index, value) {
                var subArrayItem={};
                subArrayItem["subbasinID"] = value;
                subBasinArray.push(subArrayItem);
                count=count+1;
            });

            $.each(bmpArray, function(index, value) {
                if (value=="1"){
                    bmpArray[index] = bmpArrayNames[index];
                }
            });

            bmpArray = jQuery.removeFromArray("0", bmpArray);
            //alert("bmpArray"+bmpArray);
            var count1=0;
            var count2=0;
            forMapArray=[];
            var wholeList="";

            $.each(bmpArray, function(index1, value1) {
                var words="";
                //Now I am going to push all the subbasins that need to be mapped into one spot
                var arrayItemMap={};
                arrayItemMap["Title"] = value1;
                forMapArray.push(arrayItemMap);
                //			  alert("arrayItemMap"+arrayItemMap);
                // alert(JSON.stringify(forMapArray));

                //build the whole SubBasinArray
                $.each(subBasinArray, function(index, value) {
                    subBasinArray[index][value1]=assArray[count1];
                    count1=count1+1;
                });

                //Here I am looping and finding out which values do not equal 0. I put them in an string and will stick that string into an Array. (BELOW)
                $.each(subBasinArray, function(index2, value2) {
                    if (subBasinArray[index2][value1]!=="0.0"){
                        words=words + subBasinArray[index2]["subbasinID"] + ",";
                    }
                });

                forMapArray[count2]["subs"]=words;
                //This one shows all the subbasins for the each bmp
                //alert(JSON.stringify(forMapArray));
                count2=count2+1;
            });
            /////// //Now I do this for the second group//////////////////////////////////////////////

            //We have created an array called forMapArray. We can call the IN statement from it by BMP Type, "subs"
            //console.log(JSON.stringify(forMapArray));
            //console.log(JSON.stringify(subBasinArray));//this contains all subabsin data for the maps

            bmpArray2=array[twoMap].CHOSENBMP.split(',');
            subBasinArrayStart2=array[twoMap].REGIONSUBBASINID.split(',');
            assArray2=array[twoMap].ASSIGNMENTS.split(',');
            var count=0;
            $.each(subBasinArrayStart2, function(index, value) {
                var subArrayItem2={};
                subArrayItem2["subbasinID"] = value;
                subBasinArray2.push(subArrayItem2);
                count=count+1;
                //alert (value);
            });

            //alert(JSON.stringify(subBasinArray2));
            $.each(bmpArray2, function(index, value) {
                if (value=="1"){
                    //alert(JSON.stringify(bmpArray2));
                    bmpArray2[index] = bmpArrayNames[index];
                }
            });

            bmpArray2 = jQuery.removeFromArray("0", bmpArray2);
            //alert(JSON.stringify(bmpArray2));
            //startmoving  bmpArray, adding values to it.
            var count1=0;
            var count2=0;
            forMapArray2=[];

            $.each(bmpArray2, function(index1, value1) {
                var words="";
                //Now I am going to push all the subbasins that need to be mapped into one spot
                // alert(value1);
                var arrayItemMap2={};
                arrayItemMap2["Title"] = value1;
                forMapArray2.push(arrayItemMap2);
                // alert(JSON.stringify(forMapArray2));
                //build the whole SubBasinArray
                $.each(subBasinArray2, function(index, value) {
                    subBasinArray2[index][value1]=assArray2[count1];
                    count1=count1+1;
                });

                //Here I am looping and finding out which values do not equal 0. I put them in an string and will stick that string into an Array. (BELOW)
                $.each(subBasinArray2, function(index2, value2) {
                    if (subBasinArray2[index2][value1]!=="0.0"){
                        words=words + subBasinArray2[index2]["subbasinID"] + ",";
                    }
                });
                forMapArray2[count2]["subs"]=words;
                //alert(JSON.stringify(forMapArray2));
                count2=count2+1;
            });

            //Now that I have all the data arranged for the incoming dataset (multiple arrays labeled 1 and 2)  I
            // initialize mapping. It is on mapping.js
//            initialize();//E: Original WRESTORE considers only this line, I added below line
            google.maps.event.addDomListener(window, 'load', initialize);
            
        }
        ////////////////////////////////END GET SUBBASINS////////////////////////////////////////////////
        
        
        //use this to remove all the 0s in the array above
        jQuery.removeFromArray = function(value, arr) {
            return jQuery.grep(arr, function(elem, index) {
                return elem !== value;
            });
        };

        //This grabs the information needed to get the radio buttons set up with new data
        function setUpRadio(){
            //Setting up the radio buttons
            var $radios = $('input:radio[name=rating1]');
            //alert(answersArray[oneMap].RATING);
            var ratingAnswer=answersArray[oneMap].RATING;
            $('input[name=rating1]').attr('checked', false);
            $radios.filter('[value='+ratingAnswer+']').attr('checked', true);
            //alert(rating1a);
            /*if(ratingAnswer !== "0") {
              $radios.filter('[value='+ratingAnswer+']').attr('checked', true);
              //$radios.filter('[rating1]').attr('checked', true);
          }*/

            var $radios2 = $('input:radio[name=rating2]');
            var ratingAnswer2=answersArray[twoMap].RATING;
            $('input[name=rating2]').attr('checked', false);
            //alert(rating1a);
            $radios2.filter('[value='+ratingAnswer2+']').attr('checked', true);
            /*if(ratingAnswer2 !== "0") {
              $radios2.filter('[value='+ratingAnswer2+']').attr('checked', true);

              //$radios.filter('[rating1]').attr('checked', true);
             }*/

            //setting up stripcropping one
            var $radios3 = $('input:radio[name=stripCropping1]');
            //alert(answersArray[oneMap].RATING);
            var stripCroppingAnswer1=answersArray[oneMap].stripCropping;
            $('input[name=stripCropping1]').attr('checked', false);
            $radios3.filter('[value='+stripCroppingAnswer1+']').attr('checked', true);
            //alert(rating1a);
            if(stripCroppingAnswer1 !== "0") {
                $radios3.filter('[value='+stripCroppingAnswer1+']').attr('checked', true);
                //$radios.filter('[rating1]').attr('checked', true);
            }

            //setting up stripcropping two
            var $radios4 = $('input:radio[name=stripCropping2]');
            //alert(answersArray[oneMap].RATING);
            var stripCroppingAnswer2=answersArray[twoMap].stripCropping;
            $('input[name=stripCropping2]').attr('checked', false);
            $radios4.filter('[value='+stripCroppingAnswer2+']').attr('checked', true);
            //alert(rating1a);
            if(stripCroppingAnswer2 !== "0") {
                $radios4.filter('[value='+stripCroppingAnswer2+']').attr('checked', true);
                //$radios.filter('[rating1]').attr('checked', true);
            }

            //setting up cropRotation one
            var $radios5 = $('input:radio[name=cropRotation1]');
            //alert(answersArray[oneMap].RATING);
            var cropRotationAnswer1=answersArray[oneMap].cropRotation;
            $('input[name=cropRotation1]').attr('checked', false);
            $radios5.filter('[value='+cropRotationAnswer1+']').attr('checked', true);
            //alert(rating1a);
            if(cropRotationAnswer1 !== "0") {
                $radios5.filter('[value='+cropRotationAnswer1+']').attr('checked', true);
                //$radios.filter('[rating1]').attr('checked', true);
            }

            //setting up cropRotation two
            var $radios6 = $('input:radio[name=cropRotation2]');
            //alert(answersArray[oneMap].RATING);
            var cropRotationAnswer2=answersArray[twoMap].cropRotation;
            $('input[name=cropRotation2]').attr('checked', false);
            $radios6.filter('[value='+cropRotationAnswer2+']').attr('checked', true);
            //alert(rating1a);
            if(cropRotationAnswer2 !== "0") {
                $radios6.filter('[value='+cropRotationAnswer2+']').attr('checked', true);
                //$radios.filter('[rating1]').attr('checked', true);
            }

            //setting up coverCrops one
            var $radios7 = $('input:radio[name=coverCrops1]');
            //alert(answersArray[oneMap].RATING);
            var coverCropsAnswer1=answersArray[oneMap].coverCrops;
            $('input[name=coverCrops1]').attr('checked', false);
            $radios7.filter('[value='+coverCropsAnswer1+']').attr('checked', true);
            //alert(rating1a);
            if(coverCropsAnswer1 !== "0") {
                $radios7.filter('[value='+coverCropsAnswer1+']').attr('checked', true);
                //$radios.filter('[rating1]').attr('checked', true);
            }

            //setting up coverCrops two
            var $radios8 = $('input:radio[name=coverCrops2]');
            //alert(answersArray[oneMap].RATING);
            var coverCropsAnswer2=answersArray[twoMap].coverCrops;
            $('input[name=coverCrops2]').attr('checked', false);
            $radios8.filter('[value='+coverCropsAnswer2+']').attr('checked', true);
            //alert(rating1a);
            if(coverCropsAnswer2 !== "0") {
                $radios8.filter('[value='+coverCropsAnswer2+']').attr('checked', true);
                //$radios.filter('[rating1]').attr('checked', true);
            }

            //setting up filterStrips one
            var $radios9 = $('input:radio[name=filterStrips1]');
            //alert(answersArray[oneMap].RATING);
            var filterStripsAnswer1=answersArray[oneMap].filterStrips;
            $('input[name=filterStrips1]').attr('checked', false);
            $radios9.filter('[value='+filterStripsAnswer1+']').attr('checked', true);
            //alert(rating1a);
            if(filterStripsAnswer1 !== "0") {
                $radios9.filter('[value='+filterStripsAnswer1+']').attr('checked', true);
                //$radios.filter('[rating1]').attr('checked', true);
            }

            //setting up filterStrips two
            var $radios10 = $('input:radio[name=filterStrips2]');
            //alert(answersArray[oneMap].RATING);
            var filterStripsAnswer2=answersArray[twoMap].filterStrips;
            $('input[name=filterStrips2]').attr('checked', false);
            $radios10.filter('[value='+filterStripsAnswer2+']').attr('checked', true);
            //alert(rating1a);
            if(filterStripsAnswer2 !== "0") {
                $radios10.filter('[value='+filterStripsAnswer2+']').attr('checked', true);
                //$radios.filter('[rating1]').attr('checked', true);
            }

            //setting up grassedWaterways one
            var $radios11 = $('input:radio[name=grassedWaterways1]');
            //alert(answersArray[oneMap].RATING);
            var grassedWaterwaysAnswer1=answersArray[oneMap].grassedWaterways;
            $('input[name=grassedWaterways1]').attr('checked', false);
            $radios11.filter('[value='+grassedWaterwaysAnswer1+']').attr('checked', true);
            //alert(rating1a);
            if(grassedWaterwaysAnswer1 !== "0") {
                $radios11.filter('[value='+grassedWaterwaysAnswer1+']').attr('checked', true);
                //$radios.filter('[rating1]').attr('checked', true);
            }

            //setting up grassedWaterways two
            var $radios12 = $('input:radio[name=grassedWaterways2]');
            //alert(answersArray[oneMap].RATING);
            var grassedWaterwaysAnswer2=answersArray[twoMap].grassedWaterways;
            $('input[name=grassedWaterways2]').attr('checked', false);
            $radios12.filter('[value='+grassedWaterwaysAnswer2+']').attr('checked', true);
//            alert("rating1a :: "+ grassedWaterwaysAnswer2);//E:
            if(grassedWaterwaysAnswer2 !== "0") {
                $radios12.filter('[value='+grassedWaterwaysAnswer2+']').attr('checked', true);
                //$radios.filter('[rating1]').attr('checked', true);
            }

            //setting up conservationTillage one
            var $radios13 = $('input:radio[name=conservationTillage1]');
            //alert(answersArray[oneMap].RATING);
            var conservationTillageAnswer1=answersArray[oneMap].conservationTillage;
            $('input[name=conservationTillage1]').attr('checked', false);
            $radios13.filter('[value='+conservationTillageAnswer1+']').attr('checked', true);
            //alert(rating1a);
            if(conservationTillageAnswer1 !== "0") {
                $radios13.filter('[value='+conservationTillageAnswer1+']').attr('checked', true);
                //$radios.filter('[rating1]').attr('checked', true);
            }

            //setting up conservationTillage two
            var $radios14 = $('input:radio[name=conservationTillage2]');
            //alert(answersArray[oneMap].RATING);
            var conservationTillageAnswer2=answersArray[twoMap].conservationTillage;
            $('input[name=conservationTillage2]').attr('checked', false);
            $radios14.filter('[value='+conservationTillageAnswer2+']').attr('checked', true);
            //alert(rating1a);
            if(conservationTillageAnswer2 !== "0") {
                $radios14.filter('[value='+conservationTillageAnswer2+']').attr('checked', true);
                //$radios.filter('[rating1]').attr('checked', true);
            }

            //setting up Wetlands one
            var $radios15 = $('input:radio[name=Wetlands1]');
            //alert(answersArray[oneMap].RATING);
            var WetlandsAnswer1=answersArray[oneMap].Wetlands;
//            alert("WetlandsAnswer1: "+ WetlandsAnswer1);//E:
//            alert("WetlandsAnswer1: "+ answersArray);//E:
            $('input[name=Wetlands1]').attr('checked', false);
            $radios15.filter('[value='+WetlandsAnswer1+']').attr('checked', true);
            //alert(rating1a);
            if(WetlandsAnswer1 !== "0") {
                $radios15.filter('[value='+WetlandsAnswer1+']').attr('checked', true);
                //$radios.filter('[rating1]').attr('checked', true);
            }

            //setting up Wetlands two
            var $radios16 = $('input:radio[name=Wetlands2]');
//            alert("rating"+answersArray[oneMap].RATING);//E:
            var WetlandsAnswer2=answersArray[twoMap].Wetlands;
            $('input[name=Wetlands2]').attr('checked', false);
            $radios16.filter('[value='+WetlandsAnswer2+']').attr('checked', true);
            //alert(rating1a);
            if(WetlandsAnswer2 !== "0") {
                $radios16.filter('[value='+WetlandsAnswer2+']').attr('checked', true);
                //$radios.filter('[rating1]').attr('checked', true);
            }
        }
        //  -----------------------------  END setting up radio buttons  ------------------------------//

        //  ----------------------------  Start setting radio(s)  ---------------------------
        //Putting radio button values in text area
        jQuery('input:radio[name=rating1]').change(function(){
            //var id = $(this).attr("value");
            $("#rating1").val(function () {
                return document.querySelector('input[name="rating1"]:checked').value;
            });
            //alert($(this).val());
        });

        jQuery('input:radio[name=rating2]').change(function(){
            //var id = $(this).attr("value");
            $("#rating2").val(function () {
                return document.querySelector('input[name="rating2"]:checked').value;
            });
            //alert($(this).val());
        });

        //setting up stripcropping radio
        jQuery('input:radio[name=stripCropping1]').change(function(){
            //var id = $(this).attr("value");
            $("#stripCropping1").val(function () {
                return document.querySelector('input[name="stripCropping1"]:checked').value;
            });
            //alert($(this).val());
        });

        jQuery('input:radio[name=stripCropping2]').change(function(){
            //var id = $(this).attr("value");
            $("#stripCropping2").val(function () {
                return document.querySelector('input[name="stripCropping2"]:checked').value;
            });
            //alert($(this).val());
        });

        //setting up cropRotation radio
        jQuery('input:radio[name=cropRotation1]').change(function(){
            //var id = $(this).attr("value");
            $("#cropRotation1").val(function () {
                return document.querySelector('input[name="cropRotation1"]:checked').value;
            });
            //alert($(this).val());
        });

        jQuery('input:radio[name=cropRotation2]').change(function(){
            //var id = $(this).attr("value");
            $("#cropRotation2").val(function () {
                return document.querySelector('input[name="cropRotation2"]:checked').value;
            });
            //alert($(this).val());
        });

        //setting up coverCrops radio
        jQuery('input:radio[name=coverCrops1]').change(function(){
            //var id = $(this).attr("value");
            $("#coverCrops1").val(function () {
                return document.querySelector('input[name="coverCrops1"]:checked').value;
            });
            //alert($(this).val());
        });

        jQuery('input:radio[name=coverCrops2]').change(function(){
            //var id = $(this).attr("value");
            $("#coverCrops2").val(function () {
                return document.querySelector('input[name="coverCrops2"]:checked').value;
            });
            //alert($(this).val());
        });

        //setting up filterStrips radio
        jQuery('input:radio[name=filterStrips1]').change(function(){
            //var id = $(this).attr("value");
            $("#filterStrips1").val(function () {
                return document.querySelector('input[name="filterStrips1"]:checked').value;
            });
            //alert($(this).val());
        });

        jQuery('input:radio[name=filterStrips2]').change(function(){
            //var id = $(this).attr("value");
            $("#filterStrips2").val(function () {
                return document.querySelector('input[name="filterStrips2"]:checked').value;
            });
            //alert($(this).val());
        });

        //setting up grassedWaterways radio
        jQuery('input:radio[name=grassedWaterways1]').change(function(){
            //var id = $(this).attr("value");
            $("#grassedWaterways1").val(function () {
                return document.querySelector('input[name="grassedWaterways1"]:checked').value;
            });
            //alert($(this).val());
        });

        jQuery('input:radio[name=grassedWaterways2]').change(function(){
            //var id = $(this).attr("value");
            $("#grassedWaterways2").val(function () {
                return document.querySelector('input[name="grassedWaterways2"]:checked').value;
            });
            //alert($(this).val());
        });

        //setting up conservationTillage radio
        jQuery('input:radio[name=conservationTillage1]').change(function(){
            //var id = $(this).attr("value");
            $("#conservationTillage1").val(function () {
                return document.querySelector('input[name="conservationTillage1"]:checked').value;
            });
            //alert($(this).val());
        });

        jQuery('input:radio[name=conservationTillage2]').change(function(){
            //var id = $(this).attr("value");
            $("#conservationTillage2").val(function () {
                return document.querySelector('input[name="conservationTillage2"]:checked').value;
            });
            //alert($(this).val());
        });

        //setting up wetlands radio
        jQuery('input:radio[name=Wetlands1]').change(function(){
            //var id = $(this).attr("value");
            $("#Wetlands1").val(function () {
                return document.querySelector('input[name="Wetlands1"]:checked').value;
            });
            //alert($(this).val());
        });

        jQuery('input:radio[name=Wetlands2]').change(function(){
            //var id = $(this).attr("value");
            $("#Wetlands2").val(function () {
                return document.querySelector('input[name="Wetlands2"]:checked').value;
            });
            //alert($(this).val());
        });
        //  ----------------------------  End setting radio(s)  --------------

        //Setting up the slider.
        $(function() {
            $( "#slider" ).slider({
                range: "min",
                value: answersArray[oneMap].CONFIDENCE,
                min: 1,
                max: 100,
                slide: function( event, ui ) {
                    $( "#confidence1" ).val( ui.value + "%" );
                },
                stop: function( event, ui ) {
                    goToTime("slider1");
                }
            });
            $( "#confidence1" ).val(answersArray[oneMap].CONFIDENCE + "%");

            $( "#slider1" ).slider({
                range: "min",
                value: answersArray[twoMap].CONFIDENCE,
                min: 0,
                max: 100,
                slide: function( event, ui ) {
                    $( "#confidence2" ).val( ui.value + "%" );
                },
                stop: function( event, ui ) {
                    goToTime("slider2");
                }
            });

            $( "#confidence2" ).val(answersArray[twoMap].CONFIDENCE + "%");
        });

        $( "#confidence1" ).val( $( "#slider" ).slider( "option","values"));
        
//        $("#JSONHolder").hide(); // It hides all the rating table
        $("#rating1").hide();
        $("#rating2").hide();

        $("#stripCropping1").hide();
        $("#stripCropping2").hide();
        $("#cropRotation1").hide();
        $("#cropRotation2").hide();
        $("#coverCrops1").hide();
        $("#coverCrops2").hide();
        $("#filterStrips1").hide();
        $("#filterStrips2").hide();
        $("#grassedWaterways1").hide();
        $("#grassedWaterways2").hide();
        $("#conservationTillage1").hide();
        $("#conservationTillage2").hide();
        $("#Wetlands1").hide();
        $("#Wetlands2").hide();

        $("#wholeTable").hide();
        $(".moveBack").fadeTo(1000,.2);
        //$('.submitAll').click(function() {
        //$.ajax({
        //type: "POST",
        //dataType: "json",
        //data:{'data':$('#JSONHolder').html()},
        //url: 'sendToUsersFeedback.php'
        //});
        //});

        $('.totalMaps').text(totalLength);
        $('.totalPages').text(totalPages);
        $('.currentPage').text(page);
        $("#rating1").val(answersArray[oneMap].RATING);
        $("#rating2").val(answersArray[twoMap].RATING);
        $("#stripCropping1").val(answersArray[oneMap].stripCropping);
        $("#stripCropping2").val(answersArray[twoMap].stripCropping);
        $("#cropRotation1").val(answersArray[oneMap].cropRotation);
        $("#cropRotation2").val(answersArray[twoMap].cropRotation);
        $("#coverCrops1").val(answersArray[oneMap].coverCrops);
        $("#coverCrops2").val(answersArray[twoMap].coverCrops);
        $("#filterStrips1").val(answersArray[oneMap].filterStrips);
        $("#filterStrips2").val(answersArray[twoMap].filterStrips);
        $("#grassedWaterways1").val(answersArray[oneMap].grassedWaterways);
        $("#grassedWaterways2").val(answersArray[twoMap].grassedWaterways);
        $("#conservationTillage1").val(answersArray[oneMap].conservationTillage);
        $("#conservationTillage2").val(answersArray[twoMap].conservationTillage);
        $("#Wetlands1").val(answersArray[oneMap].Wetlands);
        $("#Wetlands2").val(answersArray[twoMap].Wetlands);

        //$("#confidence1").val(answersArray[oneMap].CONFIDENCE);
        //$("#confidence2").val(answersArray[twoMap].CONFIDENCE);
        $("#JSONHolder").val(JSON.stringify(answersArray));
        setUpRadio();   //   < --------
        getSubBasins();


        //  ============== Start moveNext =============== //
        //This fires off each time someone hits the next button. It moves the data 2 spots and runs through the
        //new arrays that are created. The "if" statement stops it from doing anything if at the end of the set.
        // ----- 'page' goes from 1 to 20; 'oneMap' goes from 0 to 19 ----- //
        $(".moveNext").click(function() {
            $('.displayStuff').html("");
            // Load the answers into the answers array //
            $(".moveBack").fadeTo(1000,1);
            //$(".moveBack").show();
            answersArray[oneMap].RATING=$("#rating1").val();
//            alert ("last rate: " + answersArray[oneMap].RATING);// E: shows the last rating
            console.log("last-rate: " + answersArray[oneMap].RATING);
            //answersArray[oneMap].CONFIDENCE=$("#confidence1").val();
//            answersArray[twoMap].RATING=$("#rating2").val();
            //answersArray[twoMap].CONFIDENCE=$("#confidence2").val();
            var value1 = $( "#slider" ).slider( "option", "value" );
//            answersArray[oneMap].CONFIDENCE=value1;
//            var value2 = $( "#slider1" ).slider( "option", "value" );
//            answersArray[twoMap].CONFIDENCE=value2;

            answersArray[oneMap].stripCropping=$("#stripCropping1").val();
//            answersArray[twoMap].stripCropping=$("#stripCropping2").val();
//            alert ("stripCropping1: " + answersArray[oneMap].stripCropping);// E: Alert()
            console.log("stripCropping1: " + answersArray[oneMap].stripCropping);
            
            answersArray[oneMap].cropRotation=$("#cropRotation1").val();
//            answersArray[twoMap].cropRotation=$("#cropRotation2").val();
//            alert ("cropRotation: " + answersArray[oneMap].cropRotation);// E: Alert()
            console.log("cropRotation: " + answersArray[oneMap].cropRotation);
            
            answersArray[oneMap].coverCrops=$("#coverCrops1").val();
//            answersArray[twoMap].coverCrops=$("#coverCrops2").val();
            answersArray[oneMap].filterStrips=$("#filterStrips1").val();
//            answersArray[twoMap].filterStrips=$("#filterStrips2").val();
            answersArray[oneMap].grassedWaterways=$("#grassedWaterways1").val();
//            answersArray[twoMap].grassedWaterways=$("#grassedWaterways2").val();
            answersArray[oneMap].conservationTillage=$("#conservationTillage1").val();
//            answersArray[twoMap].conservationTillage=$("#conservationTillage2").val();
            answersArray[oneMap].Wetlands=$("#Wetlands1").val();
//            answersArray[twoMap].Wetlands=$("#Wetlands2").val();

//            JSONHolder holds rates obtained from users
            $("#JSONHolder").val(JSON.stringify(answersArray));
//            alert(JSON.stringify(answersArray));//E:

            //This gets new data
//            alert ("move-Next: current page: " + page + " of " + totalPages);//E: it gives the current page which is
            // same as # of suggestion
//            alert ("move-Next: current 'bmpArray' index: " + oneMap); //E: it gives the current 'bmpArray' index,
            // which goes from 0 to 19 (20 alternatives)
            
            if(page!=totalPages){ //'page' value starts at 1 an so on.
//                alert("here");
                if (page==totalPages-1){
                    $(".moveNext").fadeTo(1000,.2);
                }
                page = page + 1;
                $('.currentPage').text(page);//E: Set text content into the element with 'currentPAge' class
                //			 $(".moveNext").show();
//                alert("'oneMap' value: " + oneMap);
                bmpArray=array[page-1].CHOSENBMP;
//                bmpArray=array[page-1].CHOSENBMP;
//                alert("new 'bmpArray' to display: ["+ (page-1) +"]: " + bmpArray);//E: it provides the CHESENBMP from DDBB
//                oneMap=oneMap+2;
                oneMap=oneMap+1; // <---------------------------    oneMap = oneMap + 1
//                alert("new 'page': " + page);//E: 'page' was increased into 1 above
//                alert("move-Next: next 'bmpArray' index: " + oneMap);//E:
//                //twoMap=twoMap+2;
                $( ".oneMap" ).html(oneMap+1);
//                //$( ".twoMap" ).html(twoMap+1);
                //this next line will get new data and then map
                //Maps are still being created with new data
                getSubBasins();
                //MAP IT//////////
                //initialize();
                $( "#tabs" ).tabs("destroy");
//                alert("destroy 1 - in 'moveNext' button ");//E: it shows which button was clicked (moveNext or moveBack)
                heatinitialize();

                $("#rating1").val(answersArray[oneMap].RATING);
//                $("#rating2").val(answersArray[twoMap].RATING);
                $("#confidence1").val(answersArray[oneMap].CONFIDENCE);
                $( "#slider" ).slider("option","value",(answersArray[oneMap].CONFIDENCE));
//                $( "#slider1" ).slider("option","value",(answersArray[twoMap].CONFIDENCE));
                $("#confidence2").val(answersArray[twoMap].CONFIDENCE);

                $("#stripCropping1").val(answersArray[oneMap].stripCropping);
//                $("#stripCropping2").val(answersArray[twoMap].stripCropping);
                $("#cropRotation1").val(answersArray[oneMap].cropRotation);
//                $("#cropRotation2").val(answersArray[twoMap].cropRotation);
                $("#coverCrops1").val(answersArray[oneMap].coverCrops);
//                alert("alert: "+ answersArray[oneMap].cropRotation); //E:
//                $("#coverCrops2").val(answersArray[twoMap].coverCrops);
                $("#filterStrips1").val(answersArray[oneMap].filterStrips);
//                $("#filterStrips2").val(answersArray[twoMap].filterStrips);
                $("#grassedWaterways1").val(answersArray[oneMap].grassedWaterways);
//                $("#grassedWaterways2").val(answersArray[twoMap].grassedWaterways);
                $("#conservationTillage1").val(answersArray[oneMap].conservationTillage);
//                $("#conservationTillage2").val(answersArray[twoMap].conservationTillage);
                $("#Wetlands1").val(answersArray[oneMap].Wetlands);
//                alert("alert wetlands1: "+ answersArray); //E:
//                $("#Wetlands2").val(answersArray[twoMap].Wetlands);
                //This JSONHolder is just a hidden text field on the page where I am saving my giant array of answers. When the person is done, this field is submitted and we can grab all the data out of it.
                $("#JSONHolder").val(JSON.stringify(answersArray));
                setUpRadio();
                $(".map1").hide();
                $(".map1").fadeIn("slow");
//                $(".map2").hide();
//                $(".map2").fadeIn("slow");
                subBasinGraph1();
                
                //alert(JSON.stringify(bmpArray));
//                page = page + 1;
//                $('.currentPage').text(page);//E: Set text content into the element with 'currentPAge' class
            }
            else
            {
                $(".moveNext").fadeTo(1000,0.2);
//                alert("total pages DONE: ");//E: it alerts when all the 20 pages were displayed.
            }
        });
        // ============= End moveNext ================= //
    
        // ============= Start moveBack ================= //
        //This is fired when people are going backwards!
        $(".moveBack").click(function() {
//            alert("moving back: ");
            $('.displayStuff').html("");
            $(".moveNext").fadeTo(1000,1);
            answersArray[oneMap].RATING=$("#rating1").val();
            //answersArray[oneMap].CONFIDENCE=$("#confidence1").val();
//            answersArray[twoMap].RATING=$("#rating2").val();
            //answersArray[twoMap].CONFIDENCE=$("#confidence2").val();
            var value1 = $( "#slider" ).slider( "option", "value" );
            answersArray[oneMap].CONFIDENCE=value1;
//            var value2 = $( "#slider1" ).slider( "option", "value" );
//            answersArray[twoMap].CONFIDENCE=value2;

            answersArray[oneMap].stripCropping=$("#stripCropping1").val();
//            answersArray[twoMap].stripCropping=$("#stripCropping2").val();
            answersArray[oneMap].cropRotation=$("#cropRotation1").val();
//            answersArray[twoMap].cropRotation=$("#cropRotation2").val();
            answersArray[oneMap].coverCrops=$("#coverCrops1").val();
//            answersArray[twoMap].coverCrops=$("#coverCrops2").val();
            answersArray[oneMap].filterStrips=$("#filterStrips1").val();
//            answersArray[twoMap].filterStrips=$("#filterStrips2").val();
            answersArray[oneMap].grassedWaterways=$("#grassedWaterways1").val();
//            answersArray[twoMap].grassedWaterways=$("#grassedWaterways2").val();
            answersArray[oneMap].conservationTillage=$("#conservationTillage1").val();
//            answersArray[twoMap].conservationTillage=$("#conservationTillage2").val();
            answersArray[oneMap].Wetlands=$("#Wetlands1").val();
//            answersArray[twoMap].Wetlands=$("#Wetlands2").val();

            $("#JSONHolder").val(JSON.stringify(answersArray));
            //alert(JSON.stringify(answersArray));
//            alert("move Back: current page: "+ page);//E: it gives the current page, before to be decreased
            if(page>1){
                //write the answers in the fields to the AnswersArray
                $(".moveNext").fadeTo(1000,1);
                bmpArray=array[page-1].CHOSENBMP;
//                alert("current 'bmpArray': ["+ (page-1) +"]: " + bmpArray);//E: it provides the CHESENBMP
                // from DDBB
//                oneMap=oneMap-2;
//                alert("move Back: current 'bmpArray' index: "+ oneMap);//E: it displays the current
                // 'bmpArray' index
                oneMap=oneMap-1;
//                twoMap=twoMap-2;
//                alert("move Back: next 'bmpArray' index: "+ oneMap);//E: it displays the next index of 'bmpArray'.
                // Index goes from 0 to 19
                $( ".oneMap" ).html(oneMap+1);//E: 'oneMap' start from 0 to 19.
                
//                $( ".twoMap" ).html(twoMap+1);
                //this next line will get new data and then map
                getSubBasins();
                $( "#tabs" ).tabs("destroy");
//                alert("destroy 2");
                heatinitialize();
                //getSubBasins();
                $("#rating1").val(answersArray[oneMap].RATING);
//                $("#rating2").val(answersArray[twoMap].RATING);
                $( "#slider" ).slider("option","value",(answersArray[oneMap].CONFIDENCE));
//                $( "#slider1" ).slider("option","value",(answersArray[twoMap].CONFIDENCE));
                $("#confidence1").val(answersArray[oneMap].CONFIDENCE);
//                $("#confidence2").val(answersArray[twoMap].CONFIDENCE);

                $("#stripCropping1").val(answersArray[oneMap].stripCropping);
//                $("#stripCropping2").val(answersArray[twoMap].stripCropping);
                $("#cropRotation1").val(answersArray[oneMap].cropRotation);
//                $("#cropRotation2").val(answersArray[twoMap].cropRotation);
                $("#coverCrops1").val(answersArray[oneMap].coverCrops);
//                $("#coverCrops2").val(answersArray[twoMap].coverCrops);
                $("#filterStrips1").val(answersArray[oneMap].filterStrips);
//                $("#filterStrips2").val(answersArray[twoMap].filterStrips);
                $("#grassedWaterways1").val(answersArray[oneMap].grassedWaterways);


                $("#conservationTillage1").val(answersArray[oneMap].conservationTillage);
//                $("#conservationTillage2").val(answersArray[twoMap].conservationTillage);
                $("#Wetlands1").val(answersArray[oneMap].Wetlands);
//                $("#Wetlands2").val(answersArray[twoMap].Wetlands);

                setUpRadio();
                subBasinGraph1();
                
                //alert(JSON.stringify(bmpArray));
                page = page - 1;
                if (page==1){
                    $(".moveBack").fadeTo(1000,.2);
                }
                $('.currentPage').text(page);
            }else
            {
                $(".moveBack").fadeTo(1000,.2);
            }
        });
        //  =======================  End moveBack ================ //
        //  =======================  Start submit All ================ //
        //This sends all the data. I move the answers data into the id JSONHolder and then submit the form.
        $(".submitAll").click(function() {
            answersArray[oneMap].RATING=$("#rating1").val();
//            answersArray[twoMap].RATING=$("#rating2").val();
            var value1 = $( "#slider" ).slider( "option", "value" );
            answersArray[oneMap].CONFIDENCE=value1;
            var value2 = $( "#slider1" ).slider( "option", "value" );
//            answersArray[twoMap].CONFIDENCE=value2;
            $("#JSONHolder").val(JSON.stringify(answersArray));
            $('#form1').submit();
        });
        //  =======================  End submit All ================ //
    });

    window.onload = function() {
        heatinitialize(); // This function is located at 'heatmapnew1.js' file
        // open a welcome message as soon as the window loads
        Shadowbox.open({
            content:    '<div id="welcome-msg"><h2>Instructions</h2><br>' +
            '<p>In this session, you will see multiple options for implementing new conservation practices on the ' +
            'watershed landscape.</p>' + '<br>' +
            '<p>In WRESTORE, an option is also called an <b>alternative</b> or a <b>conservation plan</b>. Every ' +
            'alternative consists of multiple conservation decisions distributed over the landscape. Each ' +
            'conservation decision describes the type of recommended conservation practice, location where the ' +
            'practice is implemented, and other attributes such as size, etc.</p>' + '<br>' +
            '<p>You are advise to first learn about decisions recommended by an alternative (i.e. <b>Step 1</b>), ' +
            'then compare it with other alternatives (i.e. <b>Step 2</b>), and then finally evaluate the alternative '+
            'based on its overall performance, feasibility, and your own personal preferences (i.e. <b>Step 3</b>).</p>'+
            '<br>' +
            '<p>Your feedback will help WRESTORE to identify how to create new alternatives that best meet your ' +
            'preferences and constraints.</p></div>',
            player:     "html",
            title:      "WRESTORE Visualization Tool ",
            height:     450,
            width:      550
        });
    };

    function open_instruction() {
//        ////   WAY 1
//        // open a welcome message as soon as the window loads
//        Shadowbox.open({
//            content:    '<div id="welcome-msg"><h2>Instructions*</h2><ol><li>Please compare  alternatives based on ' +
//            'how the conservation practices are spatially distributed  in the watershed and based on the performance of these alternatives with  respect to the various goals or objectives you selected earlier. </li>' +
//            '<li>The bar-graphs at  the bottom of the page display how the various alternatives perform with respect  to the objectives. </li>' +
//            '<li>Then, please make  a judgment on the quality of the design of the various alternatives based on  any subjective criteria important to you. </li>' +
//            '<li>Once you have  compared the alternatives, please provide a rating on how much you like or dislike  a particular alternative.</li></ol></div>',
//            player:     "html",
//            title:      "WRESTORE Visualization Tool ",
//            height:     450,
//            width:      550
//        });

        ////   WAY 2
            // alert ("Open instruction");
            document.getElementById("shade_frame").style.display = "block";
            document.getElementById("inst_box1").style.display = "block";
    }

    function pause_function() {
//        //// Way 1. It has some CSS lines
//        // Source1: https://sweetalert.js.org/docs/#content
//        // Source2: https://sweetalert2.github.io/
//        swal({
//            title: "Rest time!",
//            text: "You press the option to take a rest. During this time the WRESTORE tool is stopped. When you are " +
//            "ready to continue press \'ok\'",
//            icon: "success",
//            button: "Continue!",
//            closeOnClickOutside: false,
//            closeOnEsc: false
//        });

        //// WAY 2. It has a own CSS file
//        Shadowbox.open({
//            content:    '<div msg-frame> <div id="takeRest-msg"><h2>Rest time</h2><ol><li>You press the option to take a rest .</li>' +
//            '<li>During this time the WRESTORE tool is stopped. When you are ready to continue press \'ok\' cross ' +
//            'icon at the right bottom.</li></ol></div> </div>',
//            player:     "html",
//            title:      "WRESTORE Visualization Tool* ",
//            height:     450,
//            width:      850
//        });

        ////   WAY 3
//        alert ("Open Take rest");
        document.getElementById("shade_frame").style.display = "block";
        document.getElementById("inst_box1_tr").style.display = "block";
    }

    function save_msg_function() {
        document.getElementById("shade_frame").style.display = "block";
        document.getElementById("save_box1_tr").style.display = "block";
    }

    function instruct1() {
        // open a welcome message as soon as the window loads
        Shadowbox.open({
            content:'<div id="welcome-msg"><h2>The Progress Bar</h2><p><img src="images/table.jpg"></p><p>The  ' +
            'progress ' +
            'bar shows you at what step of WRESTORE&#39s <strong>search-learn</strong> process  you currently are in. The <strong>search-learn</strong> process is divided into  consecutive sessions of interaction, during which you will get to see and  compare multiple alternatives. A colored box in the progress bar shows you  which session you currently are in. <strong>If you are in</strong> –</p><ul><li>an <strong>Introspection</strong> session, then you will get to see all of the  previously found alternatives that you have seen before and have rated as &ldquo;favorably&rdquo; solutions (except for Introspection session 1 that consist of  &ldquo;initial&rdquo; alternatives to help you become familiar with the designs). In the  introspection session you should reflect on why you liked the solutions that  you rated highly and whether you need to change your criteria for comparing or  rating alternatives.</li><li> a <strong>Human-guided Search (HS)</strong> session, then you are now actively involved  in helping the underlying WRESTORE tools to search for better alternatives. So,  you will see some &ldquo;bad&rdquo; alternatives and some &ldquo;good alternatives&rdquo;. Please use  your most current understanding of preferences and priorities to compare and  rate alternatives as they appear.</li><li><p> an <strong>Automated Search</strong> session, then the underlying WRESTORE tools  are searching for alternatives in an automated manner. In this session, you  will <strong><u>not</u></strong> be asked to compare and rate alternatives. Instead, the  feedbacks you gave in earlier sessions will be used to mechanically estimate  the ratings of the alternatives. <em>Note, that even though Automated Search is  currently shown to occur between the 4th and 5th  introspection sessions, it could also unexpectedly occur between any other  introspections sessions. But when that occurs in real-time, you will be  notified in the progress bar!</em></p></li></ul></div>',
            player:     "html",
            title:      "WRESTORE Visualization Tool ",
            height:     550,
            width:      920
        });
    }
</script>

<script type="text/javascript">
//    var togglecount = 0;
//    var toggleCountStep2 = 0;// Now it should be step1
//    var toggleCountStep3 = 0;// Now it should be step2
//    $(function(){
//        $('.header').click(function(){
//            togglecount++;
//            //Now 'panel_1', before was 'heatmaps_frame1'. Now 'heatmaps_frame1' was before 'containerABC'
//            $(this).closest('.panel_1').toggleClass('collapsed');
//            var a = $(this).parent().attr('name');
//            if(a==='step1_alter') toggleCountStep2++;// Before: step2collapse. Now it is: 'step1_alter'
//            if(a==='step2_goals') toggleCountStep3++;// Before: step3collapse. Now it is: 'step2_goals'
//            /*if(togglecount > 1 && toggleCountStep2 > 2 && toggleCountStep3 >2)*/
//            /* if(togglecount >1)*/
//            {
////                if(a==='step2collapse'){
//                if(a==='step1_alter'){
//                    var headstep= $("[name='step3collapse']");
//                    //var headchild= headstep.closest('.containerABC').toggleClass('collapsed');
//                    headstep.closest('.containerABC').toggleClass('collapsed');
//                }
//                if(a==='step3collapse'){
//                    var headstep= $("[name='step2collapse']");
//                    //var headchild= headstep.closest('.containerABC').toggleClass('collapsed');
//                    headstep.closest('.containerABC').toggleClass('collapsed');
//                }
//            }
//
//        });

        // -------------- This function contains ".info1" to ".info8" by ENoa ------------//
        // 'info1' to info8' work for creating 'legend' and 'dropdown' incon in heat maps.
//        $(function(){
//            $(".info1").click(function(){
//                $(".tip", this).toggle().css("z-index" , 999);
//                ////// --------- Switch drop and up icon is developed below by EN ------ //
//                var d_icon1 = document.getElementById("imm1").className;
//                if(d_icon1 == "playdown"){
//                    document.getElementById("imm1").src='images/dropup_arrow.png';//el.src='img/dropup_arrow.png';
//                    document.getElementById("imm1").className="playup";//el.className="pause";
//                }
//                else if(d_icon1 == "playup"){
//                    document.getElementById("imm1").src='images/dropdown_arrow.png';//el.src='img/dropdown_arrow.png';
//                    document.getElementById("imm1").className="playdown";//el.className="play";
//                }
//            });
//
//            $(".info2").click(function(){
//                $(".tip", this).toggle().css("z-index" , 999);
//                ////// --------- Switch drop and up icon for PF2-map is developed below by EN ------ //
//                var d_icon2 = document.getElementById("imm2").className;
//                if(d_icon2 == "playdown"){
//                    document.getElementById("imm2").src='images/dropup_arrow.png';//el.src='img/dropup_arrow.png';
//                    document.getElementById("imm2").className="playup";//el.className="pause";
//                }
//                else if(d_icon2 == "playup"){
//                    document.getElementById("imm2").src='images/dropdown_arrow.png';//el.src='img/dropdown_arrow.png';
//                    document.getElementById("imm2").className="playdown";//el.className="play";
//                }
//            });
//
//            $(".info3").click(function(){
//                $(".tip", this).toggle().css("z-index" , 999);
//                ////// --------- Switch drop and up icon for PF2-map is developed below by EN ------ //
//                var d_icon3 = document.getElementById("imm3").className;
//                if(d_icon3 == "playdown"){
//                    document.getElementById("imm3").src='images/dropup_arrow.png';//el.src='img/dropup_arrow.png';
//                    document.getElementById("imm3").className="playup";//el.className="pause";
//                }
//                else if(d_icon3 == "playup"){
//                    document.getElementById("imm3").src='images/dropdown_arrow.png';//el.src='img/dropdown_arrow.png';
//                    document.getElementById("imm3").className="playdown";//el.className="play";
//                }
//            });
//
//            $(".info4").click(function(){
//                $(".tip", this).toggle().css("z-index" , 999);
//                ////// --------- Switch drop and up icon for PF2-map is developed below by EN ------ //
//                var d_icon4 = document.getElementById("imm4").className;
//                if(d_icon4 == "playdown"){
//                    document.getElementById("imm4").src='images/dropup_arrow.png';//el.src='img/dropup_arrow.png';
//                    document.getElementById("imm4").className="playup";//el.className="pause";
//                }
//                else if(d_icon4 == "playup"){
//                    document.getElementById("imm4").src='images/dropdown_arrow.png';//el.src='img/dropdown_arrow.png';
//                    document.getElementById("imm4").className="playdown";//el.className="play";
//                }
//            });
//
//            $(".info5").click(function(){
//                $(".tip", this).toggle().css("z-index" , 999);
//                ////// --------- Switch drop and up icon for PF2-map is developed below by EN ------ //
//                var d_icon5 = document.getElementById("imm5").className;
//                if(d_icon5 == "playdown"){
//                    document.getElementById("imm5").src='images/dropup_arrow.png';//el.src='img/dropup_arrow.png';
//                    document.getElementById("imm5").className="playup";//el.className="pause";
//                }
//                else if(d_icon5 == "playup"){
//                    document.getElementById("imm5").src='images/dropdown_arrow.png';//el.src='img/dropdown_arrow.png';
//                    document.getElementById("imm5").className="playdown";//el.className="play";
//                }
//            });
//
//            $(".info6").click(function(){
//                $(".tip", this).toggle().css("z-index" , 999);
//                ////// --------- Switch drop and up icon for PF2-map is developed below by EN ------ //
//                var d_icon6 = document.getElementById("imm6").className;
//                if(d_icon6 == "playdown"){
//                    document.getElementById("imm6").src='images/dropup_arrow.png';//el.src='img/dropup_arrow.png';
//                    document.getElementById("imm6").className="playup";//el.className="pause";
//                }
//                else if(d_icon6 == "playup"){
//                    document.getElementById("imm6").src='images/dropdown_arrow.png';//el.src='img/dropdown_arrow.png';
//                    document.getElementById("imm6").className="playdown";//el.className="play";
//                }
//            });
//
//            $(".info7").click(function(){
//                $(".tip", this).toggle().css("z-index" , 999);
//                ////// --------- Switch drop and up icon for PF2-map is developed below by EN ------ //
//                var d_icon7 = document.getElementById("imm7").className;
//                if(d_icon7 == "playdown"){
//                    document.getElementById("imm7").src='images/dropup_arrow.png';//el.src='img/dropup_arrow.png';
//                    document.getElementById("imm7").className="playup";//el.className="pause";
//                }
//                else if(d_icon7 == "playup"){
//                    document.getElementById("imm7").src='images/dropdown_arrow.png';//el.src='img/dropdown_arrow.png';
//                    document.getElementById("imm7").className="playdown";//el.className="play";
//                }
//            });
//
//            $(".info8").click(function(){
//                $(".tip", this).toggle().css("z-index" , 999);
//                ////// --------- Switch drop and up icon for PF2-map is developed below by EN ------ //
//                var d_icon8 = document.getElementById("imm8").className;
//                if(d_icon8 == "playdown"){
//                    document.getElementById("imm8").src='images/dropup_arrow.png';//el.src='img/dropup_arrow.png';
//                    document.getElementById("imm8").className="playup";//el.className="pause";
//                }
//                else if(d_icon8 == "playup"){
//                    document.getElementById("imm8").src='images/dropdown_arrow.png';//el.src='img/dropdown_arrow.png';
//                    document.getElementById("imm8").className="playdown";//el.className="play";
//                }
//            });
//        });
//    });
</script>



<!--  #######################################################################  -->
<!--  ######## This js script detects the inactive time of the user ######### -->
<script>
    var timeoutID;

    function setup() {
        this.addEventListener("mousemove", resetTimer, false);
        this.addEventListener("mousedown", resetTimer, false);
        this.addEventListener("keypress", resetTimer, false);
        this.addEventListener("DOMMouseScroll", resetTimer, false);
        this.addEventListener("mousewheel", resetTimer, false);
        this.addEventListener("touchmove", resetTimer, false);
        this.addEventListener("MSPointerMove", resetTimer, false);
        startTimer();
    }
    setup();
    function startTimer() {
        // wait 2 seconds before calling goInactive
        timeoutID = window.setTimeout(goInactive, 600000); //E: Set the start of inactive time in mili-sec
    }
    function resetTimer(e) {
        window.clearTimeout(timeoutID);
        goActive();
    }
    function goInactive() {
        // do something
        report('m-clk* ', 'Wrestore page inactive');
        document.getElementById("shade_frame").style.display = "block";
        document.getElementById("inst_box1_in").style.display = "block";

//        alert("It appears you are inactive on this page."+"\n"+
//            "Press 'Ok' to keep working?");

//            var txt;
//            if (confirm("It appears you are inactive on this page."+"\n"+
//                "Press 'Ok' to keep working on this page?")) {
//                txt = "You pressed OK!";
//            } else {
//                txt = "You pressed Cancel!";
//            }
//            document.getElementById("demo").innerHTML = txt;
    }
    function goActive() {
        // do something
        startTimer();
    }
</script>

<!--  #####################  For buttons into map pannel  #######################  -->
<script>
    // E: This js script creates the button icon for LEGEND in the main map. This button displays even in fullscreen.
    // This works with code-lines from 86, after "map1 = new google.maps.Map(document.getElementById('map_canvas1')"
    // in mapping_new.js
    
    // ---- Function for button 'legend' into main map ----- //
    function buttonControl(options) {
        // Level 0
        var mainMapLegend_frame = document.createElement('DIV'); //E: main container of the main-map-legend pannel
        mainMapLegend_frame.className = "mainMapLegend_frame"; //E: class name for the created DIV
        
        // Level 1
        var mainMapLegend_container = document.createElement('DIV'); //E: main container of the main-map-legend pannel
        mainMapLegend_container.className = "mainMapLegend_container"; //E: class name for the created DIV
        
        // Level 1.a
        var mainMapLeg_button = document.createElement('DIV'); //E: legend-header (title) DIV is created here
        mainMapLeg_button.className = 'mainMapLegend_button';
        mainMapLeg_button.title = 'Click here to On/Off the legend';
        mainMapLeg_button.index = 1;

        // Level 1.a.1
        var mainMapLeg_title = document.createElement('DIV'); //E: legend-header (title) DIV is created here
        mainMapLeg_title.innerHTML = options.name;
        mainMapLeg_title.className = 'mainMapLegend_title';

        // Level 1.b
        var legend_contend = document.createElement('DIV'); //E: DIV is created to contain the legend features
        legend_contend.className = "feat_content"; //E: class name for the created DIV
        
        var lleggg = new mm_legend(); // E: It calls the function 'mm_legend" where the Legend-DOM is built
        legend_contend.appendChild(lleggg);
        
//        var bmp_icons = {
//            bmp1: {name: 'Crop Rotation*',icon: 'images/legend_imgs/img01_c.jpg'},
//            bmp2: {name: 'Cover Crop',icon: 'images/legend_imgs/img02_c.jpg'},
//            bmp3: {name: 'Strip Cropping',icon: 'images/legend_imgs/img03_c.jpg'},
//            bmp5: {name: 'Grass Waterways',icon: 'images/legend_imgs/img05_c.jpg'},
//            bmp6: {name: 'Conservation Tillage',icon: 'images/legend_imgs/img06_c.jpg'},
//            bmp4: {name: 'Filter Strip',icon: 'images/legend_imgs/img04_b.jpg'},
//            bmp7: {name: 'Wetland Area (acres)',icon: 'images/legend_imgs/img07_b.jpg'}
//        };
//        for (var key in bmp_icons) {
//            var type = bmp_icons[key];
//            var name = type.name;
//            var icon = type.icon;
//            var div = document.createElement('div');
////            div.innerHTML = name + "<br>" +'<img src="' + icon + '"> ';
//            div.innerHTML = '<div class="name_width">'+ name +'</div>' + '<img src="' + icon + '"> ';
//            var sep = document.createElement('DIV');
//            sep.className = "separatorDiv";
//            legend_contend.appendChild(div);
//            legend_contend.appendChild(sep);
//        }

        
        //Level 1.a.2
        var dropdown_arrow = document.createElement('DIV'); //E: DIV is created the dropdown arrow
        dropdown_arrow.className = "dropdown_img"; //E: class name for the created DIV
        dropdown_arrow.innerHTML = '<i style="font-size:20px" class="fa">&#xf103;</i>';
        
        //E: Links between DOM's created above
        mainMapLegend_frame.appendChild(mainMapLegend_container);
        
        mainMapLegend_container.appendChild(mainMapLeg_button);
        mainMapLegend_container.appendChild(legend_contend);

        mainMapLeg_button.appendChild(mainMapLeg_title);
        mainMapLeg_button.appendChild(dropdown_arrow);
        
        // Add the control to the map
        
        // options.gmap.controls[options.position].push(mainMapLeg_button);
        options.gmap.controls[options.position].push(mainMapLegend_frame);
        

        var mm_leg = 0;
        // When the button is clicked pan to sydney
//        google.maps.event.addDomListener(mainMapLegend_frame, 'click', options.action);
        google.maps.event.addDomListener(mainMapLegend_frame, 'click', function () {
//            report('m-clk*** ' , 'PFR Legend ');
            jQuery('.feat_content').toggle('show');
            var cond=(mm_leg%2) ? report('m-clk**','MM Legend NOactivated'):report('m-clk**','MM Legend activated');
            mm_leg++
//            options.action;
        });
        return mainMapLegend_frame;
    }

    // ---------------------------------------------------------------------------- //
    // ---------------- These LEGEND works for legend in heat-maps ---------------- //
    //  /////////////  FUNCTION for PFR-LEGEND button into the heat-map  ///////////
    function buttonControl_pfr(options, colorList, map, min_v, max_v) {
        min_v = Math.trunc(min_v);
//        alert("Line:2694-g2.php: " + "colors: " + Object.keys(colors).length + " map: " + map + "  min: " + min_v + "  max: " + max_v);
        
        // Level 0: extra frame to engañar to google map
        var hml_extraFrame = document.createElement('DIV'); //E: main container of the main-map-legend pannel
        hml_extraFrame.className = "hml_extraFrame"; //E: class name for the created DIV
        
        // Level 1: propper frame to show. It contains title and lengend-content
        var heatMapLegend_frame = document.createElement('DIV'); //E: main container of the main-map-legend pannel
        heatMapLegend_frame.className = "heatMapLegend_frame"; //E: class name for the created DIV

        // Level 1.a. Legend title or button
        var heatMapLegend_frameHead = document.createElement('DIV'); //E: legend-header (title) DIV is created here
        heatMapLegend_frameHead.className = 'mainMapLegend_button';
        heatMapLegend_frameHead.title = 'Click here to On/Off the legend';
        heatMapLegend_frameHead.index = 1;
        
        // Level 1.b. Legend displayable contain (contenido desplegable)
        var heatMapLegend_container_pfr = document.createElement('DIV'); //E: container of labels and square boxes
        heatMapLegend_container_pfr.className = "heatMapLegend_container_pfr"; //E: class name for the created DIV
        heatMapLegend_container_pfr.style.display="none";// Delete this to start displayind the leyend.

        // Level 1.a.1
        var heatMapLeg_title = document.createElement('DIV'); //E: legend-header (title) DIV is created here
        heatMapLeg_title.innerHTML = options.name;
        heatMapLeg_title.className = 'heatMapLegend_title';

        // Level 1.b.1
        var len_arr = Object.keys(colorList).length;
        var range2 = (max_v-min_v)/len_arr;
        var i = 0;
        
        for (var key in colorList) {
            var boxContainer = document.createElement("DIV");
            var box = document.createElement("DIV");
            var label = document.createElement("SPAN");

            var range_inf2 = min_v + Math.ceil(i*range2); // Get the low value of range
            var range_sup2 = min_v + Math.ceil((i+1)*range2); // Get the high value of range

            boxContainer.appendChild(box);
            boxContainer.appendChild(label);
            heatMapLegend_container_pfr.appendChild(boxContainer);

//            label.innerHTML = range_inf2 + ' to ' + range_sup2;// + ' cfs';
            label.innerHTML = range_inf2 + ' - ' + range_sup2;// + ' cfs';
            label.className = "label";
            box.className = "box";
            box.style.backgroundColor = colorList[key];
//            boxContainer.id = "box_container";
            boxContainer.className = "box_container";
            i += 1;
        }

        //Level 1.a.2
        var dropdown_arrow = document.createElement('DIV'); //E: DIV is created the dropdown arrow
        dropdown_arrow.className = "dropdown_img"; //E: class name for the created DIV
        dropdown_arrow.innerHTML = '<i style="font-size:20px" class="fa">&#xf103;</i>';
        
        //E: Links between DOM's created above
        hml_extraFrame.appendChild(heatMapLegend_frame);
        
        heatMapLegend_frame.appendChild(heatMapLegend_frameHead);
        heatMapLegend_frame.appendChild(heatMapLegend_container_pfr);

        heatMapLegend_frameHead.appendChild(heatMapLeg_title);
        heatMapLegend_frameHead.appendChild(dropdown_arrow);

        // Add the control to the map
        // options.gmap.controls[options.position].push(mainMapLeg_button);
        options.gmap.controls[options.position].push(hml_extraFrame);
        
        var pfr_leg = 0;
//        google.maps.event.addDomListener(hml_extraFrame, 'click', options.action);
        google.maps.event.addDomListener(hml_extraFrame, 'click', function () {
//            report('m-clk*** ' , 'PFR Legend ');
            jQuery('.heatMapLegend_container_pfr').toggle('show');
            var cond=(pfr_leg%2) ? report('m-clk**','PFR Legend NOactivated'):report('m-clk**','PFR Legend activated');
            pfr_leg++
//            options.action;
        });
        return hml_extraFrame;
    }
    
//  /////////////  FUNCTION for CR-LEGEND button into the heat-map  ///////////
    function buttonControl_cr(options, colorList, map, min_v, max_v) {
        min_v = Math.trunc(min_v);
//        alert("Line:2694-g2.php: " + "colors: " + Object.keys(colors).length + " map: " + map + "  min: " + min_v + "  max: " + max_v);

        // Level 0: extra frame to engañar to google map
        var hml_extraFrame = document.createElement('DIV'); //E: main container of the main-map-legend pannel
        hml_extraFrame.className = "hml_extraFrame"; //E: class name for the created DIV

        // Level 1: propper frame to show. It contains title and lengend-content
        var heatMapLegend_frame = document.createElement('DIV'); //E: main container of the main-map-legend pannel
        heatMapLegend_frame.className = "heatMapLegend_frame"; //E: class name for the created DIV

        // Level 1.a. Legend title or button
        var heatMapLegend_frameHead = document.createElement('DIV'); //E: legend-header (title) DIV is created here
        heatMapLegend_frameHead.className = 'mainMapLegend_button';
        heatMapLegend_frameHead.title = 'Click here to On/Off the legend';
        heatMapLegend_frameHead.index = 1;

        // Level 1.b. Legend displayable contain (contenido desplegable)
        var heatMapLegend_container_cr = document.createElement('DIV'); //E: container of labels and square boxes
        heatMapLegend_container_cr.className = "heatMapLegend_container_cr"; //E: class name for the created DIV
        heatMapLegend_container_cr.style.display="none";// Delete this to start displayind the leyend.
        
        // Level 1.a.1
        var heatMapLeg_title = document.createElement('DIV'); //E: legend-header (title) DIV is created here
        heatMapLeg_title.innerHTML = options.name;
        heatMapLeg_title.className = 'heatMapLegend_title';

        // Level 1.b.1
        var len_arr = Object.keys(colorList).length;
        var range2 = (max_v-min_v)/len_arr;
        var i = 0;

        for (var key in colorList) {
            var boxContainer = document.createElement("DIV");
            var box = document.createElement("DIV");
            var label = document.createElement("SPAN");

            var range_inf2 = min_v + Math.ceil(i*range2); // Get the low value of range
            var range_sup2 = min_v + Math.ceil((i+1)*range2); // Get the high value of range

            boxContainer.appendChild(box);
            boxContainer.appendChild(label);
            heatMapLegend_container_cr.appendChild(boxContainer);

//            label.innerHTML = range_inf2 + ' to ' + range_sup2;// + ' cfs';
            label.innerHTML = range_inf2 + ' - ' + range_sup2;// + ' cfs';
            label.className = "label";
            box.className = "box";
            box.style.backgroundColor = colorList[key];
//            boxContainer.id = "box_container";
            boxContainer.className = "box_container";
            i += 1;
        }

        //Level 1.a.2
        var dropdown_arrow = document.createElement('DIV'); //E: DIV is created the dropdown arrow
        dropdown_arrow.className = "dropdown_img"; //E: class name for the created DIV
        dropdown_arrow.innerHTML = '<i style="font-size:20px" class="fa">&#xf103;</i>';

        //E: Links between DOM's created above
        hml_extraFrame.appendChild(heatMapLegend_frame);

        heatMapLegend_frame.appendChild(heatMapLegend_frameHead);
        heatMapLegend_frame.appendChild(heatMapLegend_container_cr);

        heatMapLegend_frameHead.appendChild(heatMapLeg_title);
        heatMapLegend_frameHead.appendChild(dropdown_arrow);

        // Add the control to the map
        // options.gmap.controls[options.position].push(mainMapLeg_button);
        options.gmap.controls[options.position].push(hml_extraFrame);

        var cr_leg = 0;
//        google.maps.event.addDomListener(hml_extraFrame, 'click', options.action);
        google.maps.event.addDomListener(hml_extraFrame, 'click', function () {
            jQuery('.heatMapLegend_container_cr').toggle('show');
            var cond=(cr_leg%2) ? report('m-clk**','CR Legend NOactivated'):report('m-clk**','CR Legend activated');
            cr_leg++
        });
        
        return hml_extraFrame;
    }
    
    //   /////////////   FUNCTION for SR-LEGEND button into the heat-map  /////////////
    function buttonControl_sr(options, colorList, map, min_v, max_v) {
        min_v = Math.trunc(min_v);
//        alert("Line:2694-g2.php: " + "colors: " + Object.keys(colors).length + " map: " + map + "  min: " + min_v + "  max: " + max_v);

        // Level 0: extra frame to engañar to google map
        var hml_extraFrame = document.createElement('DIV'); //E: main container of the main-map-legend pannel
        hml_extraFrame.className = "hml_extraFrame"; //E: class name for the created DIV

        // Level 1: propper frame to show. It contains title and lengend-content
        var heatMapLegend_frame = document.createElement('DIV'); //E: main container of the main-map-legend pannel
        heatMapLegend_frame.className = "heatMapLegend_frame"; //E: class name for the created DIV

        // Level 1.a. Legend title or button
        var heatMapLegend_frameHead = document.createElement('DIV'); //E: legend-header (title) DIV is created here
        heatMapLegend_frameHead.className = 'mainMapLegend_button';
        heatMapLegend_frameHead.title = 'Click here to On/Off the legend';
        heatMapLegend_frameHead.index = 1;

        // Level 1.b. Legend displayable contain (contenido desplegable)
        var heatMapLegend_container_sr = document.createElement('DIV'); //E: container of labels and square boxes
        heatMapLegend_container_sr.className = "heatMapLegend_container_sr"; //E: class name for the created DIV
        heatMapLegend_container_sr.style.display="none";// Delete this to start displayind the leyend.

        // Level 1.a.1
        var heatMapLeg_title = document.createElement('DIV'); //E: legend-header (title) DIV is created here
        heatMapLeg_title.innerHTML = options.name;
        heatMapLeg_title.className = 'heatMapLegend_title';

        // Level 1.b.1
        var len_arr = Object.keys(colorList).length;
        var range2 = (max_v-min_v)/len_arr;
        var i = 0;

        for (var key in colorList) {
            var boxContainer = document.createElement("DIV");
            var box = document.createElement("DIV");
            var label = document.createElement("SPAN");

            var range_inf2 = min_v + Math.ceil(i*range2); // Get the low value of range
            var range_sup2 = min_v + Math.ceil((i+1)*range2); // Get the high value of range

            boxContainer.appendChild(box);
            boxContainer.appendChild(label);
            heatMapLegend_container_sr.appendChild(boxContainer);

//            label.innerHTML = range_inf2 + ' to ' + range_sup2;// + ' cfs';
            label.innerHTML = range_inf2 + ' - ' + range_sup2;// + ' cfs';
            label.className = "label";
            box.className = "box";
            box.style.backgroundColor = colorList[key];
//            boxContainer.id = "box_container";
            boxContainer.className = "box_container";
            i += 1;
        }

        //Level 1.a.2
        var dropdown_arrow = document.createElement('DIV'); //E: DIV is created the dropdown arrow
        dropdown_arrow.className = "dropdown_img"; //E: class name for the created DIV
        dropdown_arrow.innerHTML = '<i style="font-size:20px" class="fa">&#xf103;</i>';

        //E: Links between DOM's created above
        hml_extraFrame.appendChild(heatMapLegend_frame);

        heatMapLegend_frame.appendChild(heatMapLegend_frameHead);
        heatMapLegend_frame.appendChild(heatMapLegend_container_sr);

        heatMapLegend_frameHead.appendChild(heatMapLeg_title);
        heatMapLegend_frameHead.appendChild(dropdown_arrow);

        // Add the control to the map
        // options.gmap.controls[options.position].push(mainMapLeg_button);
        options.gmap.controls[options.position].push(hml_extraFrame);

        var sr_leg = 0;
//        google.maps.event.addDomListener(hml_extraFrame, 'click', options.action);
        google.maps.event.addDomListener(hml_extraFrame, 'click', function () {
            jQuery('.heatMapLegend_container_sr').toggle('show');
            var cond=(sr_leg%2)? report('m-clk**','SR Legend NOactivated'):report('m-clk**','SR Legend activated');
            sr_leg++
        });
        
        return hml_extraFrame;
    }

    //  /////////////  FUNCTION for NR-LEGEND button into the heat-map  /////////////
    function buttonControl_nr(options, colorList, map, min_v, max_v) {
        min_v = Math.trunc(min_v);
//        alert("Line:2694-g2.php: " + "colors: " + Object.keys(colors).length + " map: " + map + "  min: " + min_v + "  max: " + max_v);

        // Level 0: extra frame to engañar to google map
        var hml_extraFrame = document.createElement('DIV'); //E: main container of the main-map-legend pannel
        hml_extraFrame.className = "hml_extraFrame"; //E: class name for the created DIV

        // Level 1: propper frame to show. It contains title and lengend-content
        var heatMapLegend_frame = document.createElement('DIV'); //E: main container of the main-map-legend pannel
        heatMapLegend_frame.className = "heatMapLegend_frame"; //E: class name for the created DIV

        // Level 1.a. Legend title or button
        var heatMapLegend_frameHead = document.createElement('DIV'); //E: legend-header (title) DIV is created here
        heatMapLegend_frameHead.className = 'mainMapLegend_button';
        heatMapLegend_frameHead.title = 'Click here to On/Off the legend';
        heatMapLegend_frameHead.index = 1;

        // Level 1.b. Legend displayable contain (contenido desplegable)
        var heatMapLegend_container_nr = document.createElement('DIV'); //E: container of labels and square boxes
        heatMapLegend_container_nr.className = "heatMapLegend_container_nr"; //E: class name for the created DIV
        heatMapLegend_container_nr.style.display="none";// Delete this to start displayind the leyend.
        
        // Level 1.a.1
        var heatMapLeg_title = document.createElement('DIV'); //E: legend-header (title) DIV is created here
        heatMapLeg_title.innerHTML = options.name;
        heatMapLeg_title.className = 'heatMapLegend_title';

        // Level 1.b.1
        var len_arr = Object.keys(colorList).length;
        var range2 = (max_v-min_v)/len_arr;
        var i = 0;

        for (var key in colorList) {
            var boxContainer = document.createElement("DIV");
            var box = document.createElement("DIV");
            var label = document.createElement("SPAN");

            var range_inf2 = min_v + Math.ceil(i*range2); // Get the low value of range
            var range_sup2 = min_v + Math.ceil((i+1)*range2); // Get the high value of range

            boxContainer.appendChild(box);
            boxContainer.appendChild(label);
            heatMapLegend_container_nr.appendChild(boxContainer);

//            label.innerHTML = range_inf2 + ' to ' + range_sup2;// + ' cfs';
            label.innerHTML = range_inf2 + ' - ' + range_sup2;// + ' cfs';
            label.className = "label";
            box.className = "box";
            box.style.backgroundColor = colorList[key];
//            boxContainer.id = "box_container";
            boxContainer.className = "box_container";
            i += 1;
        }

        //Level 1.a.2
        var dropdown_arrow = document.createElement('DIV'); //E: DIV is created the dropdown arrow
        dropdown_arrow.className = "dropdown_img"; //E: class name for the created DIV
        dropdown_arrow.innerHTML = '<i style="font-size:20px" class="fa">&#xf103;</i>';

        //E: Links between DOM's created above
        hml_extraFrame.appendChild(heatMapLegend_frame);

        heatMapLegend_frame.appendChild(heatMapLegend_frameHead);
        heatMapLegend_frame.appendChild(heatMapLegend_container_nr);

        heatMapLegend_frameHead.appendChild(heatMapLeg_title);
        heatMapLegend_frameHead.appendChild(dropdown_arrow);

        // Add the control to the map
        // options.gmap.controls[options.position].push(mainMapLeg_button);
        options.gmap.controls[options.position].push(hml_extraFrame);

        var nr_leg = 0;
//        google.maps.event.addDomListener(hml_extraFrame, 'click', options.action);
        google.maps.event.addDomListener(hml_extraFrame, 'click', function () {
            jQuery('.heatMapLegend_container_nr').toggle('show');
            var cond=(nr_leg%2)? report('m-clk**','NR Legend NOactivated'):report('m-clk**','NR Legend activated');
            nr_leg++
//            options.action;
        });
        return hml_extraFrame;
    }
    
    // ------------------  End setting functions for PFR, CR, SR, NR, legend-buttons ------
    
    // $$$$$$$$$$$$$$$$$$$$$$$$$$$  Start  CHECK BOXES in the main map $$$$$$$$$$$$$$$$$$$$$$$$

    //E: (1)Function for Crop_Rotation checkbox
    function checkBox_CropRotation(options) {
        var container = document.createElement('DIV'); //first make the outer container
        container.className = "checkboxContainer";
        container.title = options.title;
        container.id = options.id1;//'filter';

        var span = document.createElement('SPAN'); //E:It creates the check-box square
        span.role = "checkbox";
        span.className = "checkboxSpan";

        var bDiv = document.createElement('DIV'); //E:It creates a blank DIV to draw the "check" symbol v.
        bDiv.className = "blankDiv";
        bDiv.id = options.id2;

        var image = document.createElement('IMG'); //E:It creates a tag "IMG" with the check symbol v.
        image.className = "blankImg";
        image.src = "http://maps.gstatic.com/mapfiles/mv/imgs8.png";

        var label = document.createElement('LABEL'); //E:It creates a tag "LABEL" with the name Label.
        label.className = "checkboxLabel";
        label.innerHTML = options.label;

        container.appendChild(label); // If this DOM goes at the end, order of presentation will be switch
        bDiv.appendChild(image);
        span.appendChild(bDiv);
        container.appendChild(span);
        
        //E: This lines draws the check box into the map, as it is called the 'checkBox' function. The "checked" or
        // "unchecked" condition is controlled from the 'css' file
        google.maps.event.addDomListener(container,'click',function(){
            (document.getElementById(bDiv.id).style.display == 'none') ? document.getElementById(bDiv.id).style
                .display = 'block' : document.getElementById(bDiv.id).style.display = 'none';
            toggleLayerNew(cropArray, crop);
//            toggleLayerNew(arg1, arg2);
            //alert(this.id); // option to add some alert
            options.action(); // option to add some other function
        });
        return container;
    }

    //E: (2)Function for Cover_Crop checkbox
    function checkBox_CoverCrop(options) {
        var container = document.createElement('DIV'); //first make the outer container
        container.className = "checkboxContainer";
        container.title = options.title;
        container.id = options.id1;

        var span = document.createElement('SPAN'); //E:It creates the check-box square
        span.role = "checkbox";
        span.className = "checkboxSpan";

        var bDiv = document.createElement('DIV'); //E:It creates a blank DIV to draw the "check" symbol v.
        bDiv.className = "blankDiv";
        bDiv.id = options.id2;

        var image = document.createElement('IMG'); //E:It creates a tag "IMG" with the check symbol v.
        image.className = "blankImg";
        image.src = "http://maps.gstatic.com/mapfiles/mv/imgs8.png";

        var label = document.createElement('LABEL'); //E:It creates a tag "LABEL" with the name Label.
        label.className = "checkboxLabel";
        label.innerHTML = options.label;

        container.appendChild(label); // If this DOM goes at the end, order of presentation will be switch
        bDiv.appendChild(image);
        span.appendChild(bDiv);
        container.appendChild(span);

        //E: This lines draws the check box into the map, as it is called the 'checkBox' function. The "checked" or
        // "unchecked" condition is controlled from the 'css' file
        google.maps.event.addDomListener(container,'click',function(){
            (document.getElementById(bDiv.id).style.display == 'none') ? document.getElementById(bDiv.id).style
                .display = 'block' : document.getElementById(bDiv.id).style.display = 'none';
            toggleLayerNew(coverArray, cover); ////////E: important to change for each BMP
//            alert(this.id); // option to add some alert
            options.action(); // option to add some other function
        });
        return container;
    }

    //E: (3)Function for Strip Cropping checkbox
    function checkBox_StripCropping(options) {
        var container = document.createElement('DIV'); //first make the outer container
        container.className = "checkboxContainer";
        container.title = options.title;
        container.id = options.id1;

        var span = document.createElement('SPAN'); //E:It creates the check-box square
        span.role = "checkbox";
        span.className = "checkboxSpan";

        var bDiv = document.createElement('DIV'); //E:It creates a blank DIV to draw the "check" symbol v.
        bDiv.className = "blankDiv";
        bDiv.id = options.id2;

        var image = document.createElement('IMG'); //E:It creates a tag "IMG" with the check symbol v.
        image.className = "blankImg";
        image.src = "http://maps.gstatic.com/mapfiles/mv/imgs8.png";

        var label = document.createElement('LABEL'); //E:It creates a tag "LABEL" with the name Label.
        label.className = "checkboxLabel";
        label.innerHTML = options.label;

        container.appendChild(label); // If this DOM goes at the end, order of presentation will be switched
        bDiv.appendChild(image);
        span.appendChild(bDiv);
        container.appendChild(span);

        //E: This lines draws the check box into the map, as it is called the 'checkBox' function. The "checked" or
        // "unchecked" condition is controlled from the 'css' file
        google.maps.event.addDomListener(container,'click',function(){
            (document.getElementById(bDiv.id).style.display == 'none') ? document.getElementById(bDiv.id).style
                .display = 'block' : document.getElementById(bDiv.id).style.display = 'none';
            toggleLayerNew(stripArray, strip); ////////E: important to change for each BMP
//            alert(this.id); // option to add some alert
            options.action(); // option to add some other function
        });
        return container;
    }
    
    //E: (4)Function for Filter-strip checkbox
    function checkBox_FilterStrip(options) { //E: Function for checkbox Filterstrip
        var container = document.createElement('DIV'); //first make the outer container
        container.className = "checkboxContainer";
        container.title = options.title;
        container.id = options.id1;//'filter';

        var span = document.createElement('SPAN'); //E:It creates the check-box square
        span.role = "checkbox";
        span.className = "checkboxSpan";

        var bDiv = document.createElement('DIV'); //E:It creates a blank DIV to draw the "check" symbol v.
        bDiv.className = "blankDiv";
        bDiv.id = options.id2;

        var image = document.createElement('IMG'); //E:It creates a tag "IMG" with the check symbol v.
        image.className = "blankImg";
        image.src = "http://maps.gstatic.com/mapfiles/mv/imgs8.png";

        var label = document.createElement('LABEL'); //E:It creates a tag "LABEL" with the name Label.
        label.className = "checkboxLabel";
        label.innerHTML = options.label;

        container.appendChild(label); // If this DOM goes at the end, order of presentation will be switch
        bDiv.appendChild(image);
        span.appendChild(bDiv);
        container.appendChild(span);
        
        //E: This lines draws the check box into the map, as it is called the 'checkBox' function. The "checked" or
        // "unchecked" condition is controlled from the 'css' file
        google.maps.event.addDomListener(container,'click',function(){
            (document.getElementById(bDiv.id).style.display == 'none') ? document.getElementById(bDiv.id).style
                .display = 'block' : document.getElementById(bDiv.id).style.display = 'none';
            toggleLayerNew(filterArray, filter);
//            alert(this.id); // option to add some alert
            options.action(); // option to add some other function
        });
        return container;
    }

    //E: (5)Function for Grasswaterways checkbox
    function checkBox_Grasswaterways(options) { //E: Function for checkbox Grasswaterways
        var container = document.createElement('DIV'); //first make the outer container
        container.className = "checkboxContainer";
        container.title = options.title;
        container.id = options.id1;//'filter';

        var span = document.createElement('SPAN'); //E:It creates the check-box square
        span.role = "checkbox";
        span.className = "checkboxSpan";

        var bDiv = document.createElement('DIV'); //E:It creates a blank DIV to draw the "check" symbol v.
        bDiv.className = "blankDiv";
        bDiv.id = options.id2;

        var image = document.createElement('IMG'); //E:It creates a tag "IMG" with the check symbol v.
        image.className = "blankImg";
        image.src = "http://maps.gstatic.com/mapfiles/mv/imgs8.png";

        var label = document.createElement('LABEL'); //E:It creates a tag "LABEL" with the name Label.
        label.className = "checkboxLabel";
        label.innerHTML = options.label;

        container.appendChild(label); // If this DOM goes at the end, order of presentation will be switch
        bDiv.appendChild(image);
        span.appendChild(bDiv);
        container.appendChild(span);

        //E: This lines draws the check box into the map, as it is called the 'checkBox' function. The "checked" or
        // "unchecked" condition is controlled from the 'css' file
        google.maps.event.addDomListener(container,'click',function(){
            (document.getElementById(bDiv.id).style.display == 'none') ? document.getElementById(bDiv.id).style
                .display = 'block' : document.getElementById(bDiv.id).style.display = 'none';
            toggleLayerNew(grassArray, grass);
//            alert(this.id); // option to add some alert
            options.action(); // option to add some other function
        });
        return container;
    }
    
    //E: (6)Function for No Tillage checkbox (Conservation Tillage)
    function checkBox_NoTillage(options) { //E: Function for checkbox No Tillage
        var container = document.createElement('DIV'); //first make the outer container
        container.className = "checkboxContainer";
        container.title = options.title;
        container.id = options.id1;

        var span = document.createElement('SPAN'); //E:It creates the check-box square
        span.role = "checkbox";
        span.className = "checkboxSpan";

        var bDiv = document.createElement('DIV'); //E:It creates a blank DIV to draw the "check" symbol v.
        bDiv.className = "blankDiv";
        bDiv.id = options.id2;

        var image = document.createElement('IMG'); //E:It creates a tag "IMG" with the check symbol v.
        image.className = "blankImg";
        image.src = "http://maps.gstatic.com/mapfiles/mv/imgs8.png";

        var label = document.createElement('LABEL'); //E:It creates a tag "LABEL" with the name Label.
        label.className = "checkboxLabel";
        label.innerHTML = options.label;

        container.appendChild(label); // If this DOM goes at the end, order of presentation will be switch
        bDiv.appendChild(image);
        span.appendChild(bDiv);
        container.appendChild(span);

        //E: This lines draws the check box into the map, as it is called the 'checkBox' function. The "checked" or
        // "unchecked" condition is controlled from the 'css' file
        google.maps.event.addDomListener(container,'click',function(){
            (document.getElementById(bDiv.id).style.display == 'none') ? document.getElementById(bDiv.id).style
                .display = 'block' : document.getElementById(bDiv.id).style.display = 'none';
            toggleLayerNew(conserveArray, notill);
//            alert(this.id); // option to add some alert
            options.action(); // option to add some other function
        });
        return container;
    }
    
    //E: (7)Function for Wetlands checkbox (Wetlands)
    function checkBox_Wetlands(options) { //E: Function for checkbox No Tillage
        var container = document.createElement('DIV'); //first make the outer container
        container.className = "checkboxContainer";
        container.title = options.title;
        container.id = options.id1;

        var span = document.createElement('SPAN'); //E:It creates the check-box square
        span.role = "checkbox";
        span.className = "checkboxSpan";

        var bDiv = document.createElement('DIV'); //E:It creates a blank DIV to draw the "check" symbol v.
        bDiv.className = "blankDiv";
        bDiv.id = options.id2;

        var image = document.createElement('IMG'); //E:It creates a tag "IMG" with the check symbol v.
        image.className = "blankImg";
        image.src = "http://maps.gstatic.com/mapfiles/mv/imgs8.png";

        var label = document.createElement('LABEL'); //E:It creates a tag "LABEL" with the name Label.
        label.className = "checkboxLabel";
        label.innerHTML = options.label;

        container.appendChild(label); // If this DOM goes at the end, order of presentation will be switch
        bDiv.appendChild(image);
        span.appendChild(bDiv);
        container.appendChild(span);

        //E: This lines draws the check box into the map, as it is called the 'checkBox' function. The "checked" or
        // "unchecked" condition is controlled from the 'css' file
        google.maps.event.addDomListener(container,'click',function(){
            (document.getElementById(bDiv.id).style.display == 'none') ? document.getElementById(bDiv.id).style
                .display = 'block' : document.getElementById(bDiv.id).style.display = 'none';
            toggleLayerNew(wetArray, wetlands);
//            alert(this.id); // option to add some alert
            options.action(); // option to add some other function
        });
        return container;
    }


    // -----------------------  Function for Second way  ------------------------
    function bmp1_ckbox_function(controlDiv, map) {
        //Based on: https://stackoverflow.com/questions/28155703/custom-button-with-google-maps-drawing
        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#ffffff';//'#99ff66';
        controlUI.style.height = '23px';
//        controlUI.style.marginTop = '5px';
        controlUI.style.marginLeft = '-9px';
        controlUI.style.paddingTop = '1px';
        controlUI.style.cursor = 'pointer';
        controlUI.style.display = 'inline-flex';
        controlUI.title = 'Your Custom function..';
        controlUI.className = 'controlUI';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.padding = '2px';
        controlText.innerHTML = 'Crop Rotation+';
        controlText.style.color = '#000000';

        var span = document.createElement('SPAN'); //E:It creates the check-box square
        span.role = "checkbox";
        span.className = "checkboxSpan";
//
        var bDiv = document.createElement('DIV'); //E:It creates a blank DIV to draw the "check" symbol v.
        bDiv.className = "blankDiv";
        bDiv.id = 'bmp1_box';//options.id;
//
        var image = document.createElement('IMG'); //E:It creates a tag "IMG" with the check symbol v.
        image.className = "blankImg";
        image.src = "http://maps.gstatic.com/mapfiles/mv/imgs8.png";
//
        controlUI.appendChild(controlText);
        
        bDiv.appendChild(image);
        span.appendChild(bDiv);
        controlUI.appendChild(span);
        
        // Setup the click event listeners
        google.maps.event.addDomListener(controlUI,'click',function(){
            (document.getElementById(bDiv.id).style.display == 'block') ? document.getElementById(bDiv.id).style
                .display = 'none' : document.getElementById(bDiv.id).style.display = 'block';
        });
    }
    // ---------------------  End Function for Second way -------------------
    
    // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$  End  $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    
</script>

</body>
<!-- not used
<i style="font-size:20px;color:red" class="fa">&#xf103;</i>
-->
</html>
