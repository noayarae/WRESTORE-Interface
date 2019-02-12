<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset=utf-8>
    <meta http-equiv="X-UA-Compatible" content="IE=8" />
    <title>WRESTORE - Watershed REstoration using Spatio-Temporal Optimization of REsources</title>
    <style>
        #map_canvas1 {
            height: 675px;
            width:445px;
        }
        #map_canvas2 {
            height: 675px;
            width:445px;
        }
        #heatmap_canvasPF1, #heatmap_canvasPF2, #heatmap_canvasRV1, #heatmap_canvasRV2, #heatmap_canvasSR1, #heatmap_canvasSR2, #heatmap_canvasNR1, #heatmap_canvasNR2 {
            height: 400px;
            width: 100%;
            position: relative;
        }

        body {
        }
        #wholeTable {
            /*display:none;*/
        }
        .pods {
            padding: 2px;
            margin-right: 1px;
            border: 1px solid #999;
            width: 15px;
            float: left;
            text-align: center;
            height: 20px;
            line-height: 1em;
        }
        .intropods {
            padding: 2px;
              margin-right: 1px;
              border: 1px solid #999;
              width: 70px;
          float: left;
          text-align: center;
          line-height: 1em;
          height: 20px;
      }
      .instructionpods {
          padding: 2px;
          margin-right: 1px;
          width: 70px;
          float: left;
          text-align: center;
          line-height: 1em;
          height: 20px;
       }
      .container {
          width: 950px;
      }
      #chart_div1 {
          float: left;
          width: 235px;
          height: 550px;
          display:block;
          boarder: 1px solid yellow;
      }
      #chart_div2{
          float: left;
          width: 235px;
          height: 550px;
          display:block;
          boarder: 1px solid yellow;
      }
      #chart_div3{
          float: left;
          width: 235px;
          height: 550px;
          display:block;
          boarder: 1px solid yellow;
      }
      #chart_div4{
          float: left;
          width: 235px;
          height: 550px;
          display:block;
          boarder: 1px solid yellow;
      }

      .info .tip{
          display: none;
          position: absolute;
          border: 1px solid #333;
          border-radius: 2px;
          padding: 3px;
          background-color : #FBF8C4;
      }


  </style>
      <link rel="stylesheet" type="text/css" href="style.css" media="all" />
      <link rel="stylesheet" type="text/css" href="new/style.css" media="all" />
      <link rel="stylesheet" type="text/css" href="css/basic.css" media="all" />
      <link rel="stylesheet" type="text/css" href="css/star.css" media="all" />
      <link rel="stylesheet" type="text/css" href="css/visualize.css" media="all" />
      <link rel="stylesheet" type="text/css" href="js/shadowbox/shadowbox.css" media="all" />
      <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>

      <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBVNzONb19t-556kuu-ebT5DUF0wCpEt-g&callback=initMap"
              type="text/javascript"></script>
      <script type="text/javascript" src="js/json2.js"></script>
      <script type="text/javascript" src="js/jquery.collapsible.js"></script>
      <script type="text/javascript" src="js/bargraphcpy.js"></script>

      <link href='http://fonts.googleapis.com/css?family=Oswald:400,300' rel='stylesheet' type='text/css'>
      <!--[if IE]>
      <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
      <![endif]-->
      <script type="text/javascript" src="https://www.google.com/jsapi"></script>
      <script type="text/javascript">

          //window.onload(heatinitialize);
          google.load("visualization", "1", {packages:["corechart"]});
          google.setOnLoadCallback(subBasinGraph1);


          /*Querying to gather data to fill google charts*/

      </script>

  </head>
<!--  -------------------- START BODY -----------  -->
  <body name="body">

  <?php
  
  include ('data.php');
        //echo $yellow;
  
  //This is a simple script that checks to see the session userID is even active. If not, that means someone is trying to access this page without loging in and I throw them out.
  /*session_set_cookie_params(3600); 
  session_start();
  if ( $_SESSION['USERID']=="" ) {
      header('Location: login.php');
      }*/
  // You can always override the session by just declaring it like I can do below if I wanted to test with userid=2.
  $_SESSION['USERID']=111;
  //$USERID = $_SESSION['USERID'];
  $USERID = 111;
  
  $connection =
    mysqli_connect (DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME, 3306)
    or die("Unable to connect to server<br>\n");
  //echo "Connected to database!<br><br>";
  
  $count = 0;
  
  //I am grabbing the massive amount of data from the takefeedback table. I actually am going to write it out on the page in a table.
  $query =("SELECT * FROM takefeedback where USERID = '$USERID'");
  $result = mysqli_query($connection, $query);
  $row = mysqli_fetch_assoc($result);
  $tableSize=mysqli_num_rows($result)+1;
  //I am writing out the entire table of data.  I have it hid with css where the id wholeTable is hidden. You can always turn that css to not hide if you want to see it.
  //echo mysqli_num_rows($result);
  
    if (mysqli_num_rows($result)>0){
        print '<table border="2" id="wholeTable"><tr>';
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

    //I am looking to see if we are left with an odd number of maps. If so, I add one line of fake data so that the maps load properly on the last page.
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
  //Looking in the session table so I can find out what session type they are in and color in the needed div in the Progress Bar.
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
  //You can echo the variable above if you want to see it value. I take the var color and write out some css using javascript in line 550 or so below.
  //echo $thisCSS;
  
  ?>
  <!--[if lte IE 6]><script src="js/ie6/warning.js"></script><script>window.onload=function(){e("js/ie6/")}</script><![endif]-->
  <div class="wrapper">
      <div class="row">
          <header id="siteHeader">
                  
              <div>
                  <hgroup>
                      <h1 name="site_header1"><a href="/">WRESTORE</a></h1>
                      <h2 name="site_header2">Watershed REstoration using Spatio-Temporal Optimization of REsources</h2>
                      <h3 name="site_header3">Visualize & Design Your Watershed Landscape</h3>
                  </hgroup>
              </div>
                  
          </header>
      </div><!-- end Main Site Header -->
      <div class="row" id="navRow"> <!-- Nav Row -->
          <nav id="mainNav">
              <ul name="site_header4">
                  <span title="Option to quit current search experiment"><li><a name="abortheader" href="abort.html" rel="shadowbox;height=240;width=900" name="Quit">Quit</a></li></span>
                  <span title="Option to save current designs and come back later"><li style="width:150px"><a name="saveMapHeader" href="#void" class="submitFeedbackJon" name="Save Current Map">Save Current Maps</a></li></span>
                  <span title="Option to view instructions again"><li style="width:120px"><a name="InstructionsHeader" href="#void" onclick="instruct()" class="submitFeedbackJon"  name="Instructions">Instructions</a></li></span>
                
              </ul>
  
          </nav>
          <!--<nav id="loginNav">
              <a href="#">Register</a> | <a href="#">Login</a>
          </nav>-->
        </div><!-- End Nav Row -->
   <!--   <div class="row" id="banner">
        <div class="instructionpods"> <strong>Progress Bar </strong><br /><a href="#void" onclick="instruct1()" >
       What is this?</a></div>
        <div class="intropods i1">Introspection<br />
         1
        </div>
        <div class="pods s11">HS 1</div>
        <div class="pods s12">HS 2</div>
        <div class="pods s13">HS 3</div>
        <div class="pods s14">HS 4</div>
        <div class="pods s15">HS 5</div>
        <div class="pods s16">HS 6</div>
        <div class="intropods i2">Introspection<br />
         2
        </div>
      
       <div style="clear:both"></div>
      </div>-->
      <div class="skip"></div>
      <div class="row " id="mainFrame">
          <div id="mainCol" style="width:100%">
              <section id="content">
                  <header id="pageHeader">
                      
                  </header>
                <!-- <h2>Welcome <?   //echo $_SESSION["var"]; ?></h2>-->
                  <table width="100%" border="0" cellspacing="1">
                      <tr>
                          <td width="86%"><h2 name="letscompareheader">Let's compare and vote!</h2>
                              <p name="suggestionsNumberHeader">Total number of suggestions you will be comparing: <?php print $count ?> | Page <strong><span class="currentPage"></span></strong> of <span class="totalPages"></span>
                              <hr noshade size=3 width=1000>
                              </p>
                          </td>
                          <td width="14%"></td>
                      </tr>
                  </table>
                  <h2>Legend </h2>
                 <!--<div class="keyHolder">
                  <div id="tools" name="tools"></div>
                   <div id="toolpic" name="toolpic"></div>-->
                  <div class="containerhover">
                      <div name="tools" id="tools" class="tools">
                      </div>
                      <div name="toolpic" id="toolpic" class="toolpic"><!--<img alt="WordPress" src="images/key.jpg" />-->
                      </div>
                  </div>
          </div><br/>
          <h2>STEP 1: Compare the two maps below to assess if you like how the practices are allocated in the two suggestions.</h2>
          <div class="step1">
              <div class="displayStuffa">Click inside of any sub-basin to learn about practices proposed in a sub-basin.</div>
              <!-- <div class="displayStuffb" name="What Do They Mean"><a href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean"><strong><em name="What Do They Mean">What do these numbers mean?</em></strong></a></div>-->
  
                                                                              <!--pop up boxes will display this info-->
               <!-- <div class="displayStuff"></div>-->
  

              <form id="form1" name="form1" method="post" action="sendToUsersFeedback.php?id=<? print $thisCSS;  ?>">
                 
                 
              <!--Changed mapHolder to mapHolder1-->
                  <div class="mapHolder1 map1">
                      <h4>Suggestion <span class="oneMap"></span></h4>
                      <div id="mapHolderOne">
                          <div id="map_canvas1" name="map_canvas1"></div>
                      </div>
  <!--    
     <div class="innerMapLinesHead"> 
     <h4>Rate the design and performance of this alternative </h4>
     </div>
     <div class="innerMapLines"> 
     <div class="lines"><input name="rating1" type="radio" value="3" /><label> I like it:</label></div>
    <div class="lines"> <input name="rating1" type="radio" value="2" /><label> Neutral:</label></div>
    <div class="lines"> <input name="rating1" type="radio" value="1" /><label> I don't like it:</label></div>
      
       <input name="rating1" type="text" class="padInput" id="rating1" size="2" />
     </div>
     <div style="clear:both"></div>
     <div class="innerMapLinesHead">
       <h4>How confident are you about your rating? (%)</h4>
    </div>
      <div class="innerMapLines">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="22%"><input name="confidence1" type="text" id="confidence1" size="3" readonly="readonly"/></td>
          <td width="78%"><div id="slider"></div></td>
        </tr>
      </table>
      
     </div>
     -->
                  </div>

                  <div class="mapHolder2 map2" style="margin-right:0">
                      <h4>Suggestion <span class="twoMap"></span></h4>
                      <div id="mapHolderTwo"><div id="map_canvas2" name="map_canvas2"></div></div>
    <!--
      <div class="innerMapLinesHead">
       <h4>Rate the design and performance of this alternative </h4>
       </div>
       <div class="innerMapLines"> 
     <div class="lines"><input name="rating2" type="radio" value="3" /><label> I like it:</label></div>
    <div class="lines"> <input name="rating2" type="radio" value="2" /><label> Neutral:</label></div>
    <div class="lines"> <input name="rating2" type="radio" value="1" /><label> I don't like it:</label></div>
      <input name="rating2" type="text" class="padInput" id="rating2" size="2"/>
      </div>
    
      <div style="clear:both"></div>
     <div class="innerMapLinesHead">
       <h4>How confident are you about your rating? (%)</h4>
    </div>
      <div class="innerMapLines">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="22%"><input name="confidence2" type="text" id="confidence2" size="3" readonly="readonly"/></td>
          <td width="78%"><div id="slider1"></div></td>
        </tr>
      </table>
      
     </div>
    
    </div>-->
                  </div>
                  <div style="clear:both"></div>
              </form></div> <!--  ADDED by E.Noa  </form></div>-->
  <!-- database graphing-->
                  <div name='step2collapse' class ="containerABC collapsed">
                      <div class="header"> <h2 name="step2">STEP 2: Now assess if the two suggestions above meet your expectation for goals at a specific sub-basin.</h2></div>
                      <div class="graph">

                          <div class="dropDownArea">
                              <label><br />
                                  Choose a sub-basin to compare</label>
  <!--writing the drop down for the 127 subbasins -->
                              <select name="subDrop" id="subDrop" onchange='subBasinGraph1();'>
                                  <option value="Watershed" selected="selected">Watershed</option>
                                  <?php
                                  $y=1;
                                  while($y<=127){
                                      print "<option value=S$y>Subbasin $y</option>";
                                      $y++;
                                  }
                                  ?>
                              </select>
                              <br>
                          </div>
    <!--This is where the google charts are actually being graphed-->
                          <div class="container">
                              <div id="chart_div1"></div>
                              <div id="chart_div2"></div>
                              <div id="chart_div3"></div>
                              <div id="chart_div4"></div>

                              <script>
                                  var first = '<span class="oneMap"></span>';
                                  var second = '<span class="twoMap"></span>';
                              </script>
                          </div>
                      </div>
                  </div>
                  <div style="clear:both"></div>

                  <div name='step3collapse' class ="containerABC collapsed" >
                      <div class="header"> <h2 name="step3">STEP 3: Now assess if you like how the practices proposed by the suggestions affect the rest of the watershed landscape.</h2></div>
                      <div class="graph">
  
  <!--<div class="dropDownHeatMap">
  <label><br />
    Choose a suggestion to compare</label>
  <!--writing the drop down for the 127 subbasins --
  <select name="heatDrop" id="heatDrop" onchange='heatinitialize();'>
  <option value="1" selected="selected">suggestion 1</option>
                <?php
                $y=2;
                while($y<=$count){
                    print "<option value=$y>suggestion $y</option>";
                    $y++;
                }
                ?>
  </select>
  <br>
  </div>-->

                          <div id="tabs">
                              <ul>
                                  <li><a href="#tabs-PF">PeakFlow</a></li>
                                  <li><a href="#tabs-RV">Revenue in $</a></li>
                                  <li><a href="#tabs-SR">sediment red in tons</a></li>
                                  <li><a href="#tabs-NR">nitrate red in kilograms </a></li>
                              </ul>


                              <div id="tabs-PF">
                                  <div class="heatMapHolder1 map1">
                                      <h4>Suggestion <span class="oneMap"></span></h4>
                                      <div class="info">
                                          <img  title="click for additional information" alt="click for additional information" src="images/info.png" width="14" height="14" alt=""/>
                                          <div id="oneMapPF" class="tip"></div>
                                      </div>
                                      <div id="heatMapHolderOne">  <!--  It draws them map1 -->
                                          <div id="heatmap_canvasPF1" name="heatmap_canvasPF1"></div>
                                      </div>
                                  </div>

                                  <div class="heatMapHolder2 map2" style="margin-right:0">
                                      <h4>Suggestion <span class="twoMap"></span></h4><div class="info"><img  title="click for additional information" alt="click for additional information" src="images/info.png" width="14" height="14" alt=""/><div id="twoMapPF" class="tip"></div> </div>
                                      <div id="heatMapHolderTwo"><div id="heatmap_canvasPF2" name="heatmap_canvasPF2"></div></div>
                                  </div>
                                  <div style="clear:both"></div>
                              </div>


                              <div id="tabs-RV">
                                  <div class="heatMapHolder1 map1">
                                      <h4>Suggestion <span class="oneMap"></span></h4>
                                      <div class="info"><img  title="click for additional information" alt="click for additional information" src="images/info.png" width="14" height="14" alt=""/><div id="oneMapRV" class="tip"></div> </div>
                                      <div id="heatMapHolderOne">
                                          <div id="heatmap_canvasRV1" name="heatmap_canvasRV1"></div>
                                      </div>
                                  </div>
                                  <div class="heatMapHolder2 map2" style="margin-right:0">
                                      <h4>Suggestion <span class="twoMap"></span></h4><div class="info"><img  title="click for additional information" alt="click for additional information" src="images/info.png" width="14" height="14" alt=""/><div id="twoMapRV" class="tip"></div> </div>
                                      <div id="heatMapHolderTwo"><div id="heatmap_canvasRV2" name="heatmap_canvasRV2"></div></div>
                                  </div>
                                  <div style="clear:both"></div>

                              </div>
                              <div id="tabs-SR">
                                  <div class="heatMapHolder1 map1">
                                      <h4>Suggestion <span class="oneMap"></span></h4><div class="info"><img  title="click for additional information" alt="click for additional information" src="images/info.png" width="14" height="14" alt=""/><div id="oneMapSR" class="tip"></div> </div>
                                      <div id="heatMapHolderOne">
                                          <div id="heatmap_canvasSR1" name="heatmap_canvasSR1"></div>
                                      </div>
                                  </div>

                                  <div class="heatMapHolder2 map2" style="margin-right:0">
                                      <h4>Suggestion <span class="twoMap"></span></h4><div class="info"><img  title="click for additional information" alt="click for additional information" src="images/info.png" width="14" height="14" alt=""/><div id="twoMapSR" class="tip"></div> </div>
                                      <div id="heatMapHolderTwo"><div id="heatmap_canvasSR2" name="heatmap_canvasSR2"></div></div>
                                  </div>
                                  <div style="clear:both"></div>

                              </div>
                              <div id="tabs-NR">
                                  <div class="heatMapHolder1 map1">
                                      <h4>Suggestion <span class="oneMap"></span></h4><div class="info"><img  title="click for additional information" alt="click for additional information" src="images/info.png" width="14" height="14" alt=""/><div id="oneMapNR" class="tip"></div> </div>
                                      <div id="heatMapHolderOne">
                                          <div id="heatmap_canvasNR1" name="heatmap_canvasNR1"></div>
                                      </div>
                                  </div>

                                  <div class="heatMapHolder2 map2" style="margin-right:0">
                                      <h4>Suggestion <span class="twoMap"></span></h4><div class="info"><img  title="click for additional information" alt="click for additional information" src="images/info.png" width="14" height="14" alt=""/><div id="twoMapNR" class="tip"></div> </div>
                                      <div id="heatMapHolderTwo"><div id="heatmap_canvasNR2" name="heatmap_canvasNR2"></div></div>
                                  </div>
                                  <div style="clear:both"></div>

                              </div>
                          </div>
 
  
  
  <!--<div class="heatmapHolder heatmap5">
      <h4>nitrate red in kilograms <span class="heatMap"></span></h4>
     <div id="heatmapHolderFive">
          <div id="heatmap_canvas5" name="heatmap_canvas5"></div>
     </div>
  </div>-->
                      </div> </div> <!--  This last </div> was added by E.Noa -->
    <!------------------------------------------------------------------->
                      <h2 name="step4">STEP 4: Time to vote! Provide a rating for each of the suggestions shown above.</h2>
  
                <!-- <form id="form1" name="form1" method="post" action="sendToUsersFeedback.php?id=<? print $thisCSS;  ?>">-->

                      <div class="mapHolder1 map1">
                          <h4>Suggestion <span class="oneMap"></span></h4>

                          <div class="innerMapLinesHead">
                              <h4>Rate the design and performance of this alternative </h4>
                          </div>
     
      <!--<div class="rating">
      <input type="radio" name="rating1" value="0" checked />
      <span id="hide"></span>
      <input type="radio" name="rating1" value="1" /><span></span>
      <input type="radio" name="rating1" value="2" /><span></span>
      <input type="radio" name="rating1" value="3" /><span></span>
      <input type="radio" name="rating1" value="4" /><span></span>
      <input type="radio" name="rating1" value="5" /><span></span>
  </div>-->
  
  

                          <div class="innerMapLines">
                              <div class="rating">
                                  <input type="radio" name="rating1" value="0" checked /><span id="hide"></span>
                                  <input name="rating1" type="radio" value="1" /><span></span>
                                  <input name="rating1" type="radio" value="2" /><span></span>
                                  <input name="rating1" type="radio" value="3" /><span></span>
                                  <input name="rating1" type="radio" value="4" /><span></span>
                                  <input name="rating1" type="radio" value="5" /><span></span>

                                  <input name="rating1" type="text" class="padInput" id="rating1" size="2" /></div>
                          </div>
                          <div style="clear:both"></div>
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

                      <div class="mapHolder2 map2" style="margin-right:0">
                          <h4>Suggestion <span class="twoMap"></span></h4>

                          <div class="innerMapLinesHead">
                              <h4>Rate the design and performance of this alternative </h4>
                          </div>
          <!--<div class="rating">
   <input type="radio" name="rating2" value="0" checked />
      <span id="hide"></span>
      <input type="radio" name="rating2" value="1" /><span></span>
      <input type="radio" name="rating2" value="2" /><span></span>
      <input type="radio" name="rating2" value="3" /><span></span>
      <input type="radio" name="rating2" value="4" /><span></span>
      <input type="radio" name="rating2" value="5" /><span></span>
  </div>-->
                          <div class="innerMapLines">
                              <div class="rating">
                                  <input name="rating2" type="radio" value="0" checked /><span id="hide"></span>
                                  <input name="rating2" type="radio" value="1" /><span></span>
                                  <input name="rating2" type="radio" value="2" /><span></span>
                                  <input name="rating2" type="radio" value="3" /><span></span>
                                  <input name="rating2" type="radio" value="4" /><span></span>
                                  <input name="rating2" type="radio" value="5" /><span></span>

                                  <input name="rating2" type="text" class="padInput" id="rating2" size="2"/></div>
                          </div>

                          <div style="clear:both"></div>
                          <div class="innerMapLinesHead1">
                              <h4>How confident are you about your rating? (%)</h4>
                          </div>
                          <div class="innerMapLines1">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                      <td width="22%"><input name="confidence2" type="text" id="confidence2" size="3" readonly="readonly"/></td>
                                      <td width="78%"><div id="slider1"></div></td>
                                  </tr>
                              </table>
                          </div>
                      </div>
  <!------------------------------------------------------------------->
  
  
  
  
  <h2 name="step5">STEP 5: click on the blue buttons to see additional suggestions or click on the orange button if you have rated <b>all</b> of them.</h2>
  <!--</div>-->
    <div style="clear:both"></div>
   <table width="1000" border="0" cellspacing="1">
    <tr>
      <td width="41%"><div align="left">
        <input type="button" name="Back" id="Back" value="&lt;&lt; Record Rating & Move Back One Set " class="barBlue moveBack" />
      </div></td>
      <td width="26%"><input type="button" name="Submit All Maps" id="button" value="Done with all the Ratings" class="barOrange submitAll" /></td>
      <td width="33%"><div align="right">
        <input type="button" name="Next" id="Next" value="Record Rating & Move Forward One Set &gt;&gt;" class="barBlue moveNext" />
      </div></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
   </table>
   <textarea name="JSONHolder" id="JSONHolder" cols="45" rows="5"></textarea>
<!--   </form>-->
<!--   </div>-->
<!--            </section>-->
<!--    </div>     <!-- end main content column -->
          <!-- Right Side Column -->
          <div class="clear"></div>
      </div><!-- end mainFrame --></div><!-- end Wrapper -->
  <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
  <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.js"></script>
  <script type="text/javascript" src="js/jquery.maskedinput.js"></script>
  <script type="text/javascript" src="js/jquery.keyfilter.js"></script>
  <script type="text/javascript" src="js/shadowbox/shadowbox.js"></script>
  <script type="text/javascript" src="js/mapping_new.js"></script>
  <script type="text/javascript" src="js/heatmapnew1.js"></script>
  <script type="text/javascript" src="http://filamentgroup.github.com/EnhanceJS/enhance.js"></script>	
  <script type="text/javascript" src="js/visualize.jQuery.js"></script>
  <script type="text/javascript" src="js/excanvas.js"></script>
  <script type="text/javascript" src="js/graphing.js"></script>
  <script type="text/javascript" src="js/graphingSub.js"></script>
  <link href="js/shadowbox/shadowbox.css" rel="stylesheet" type="text/css"/>
  <script type="text/javascript">
  Shadowbox.init();
  </script>
 
 
  
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
					.fadeIn('slow');
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
          };		
  
  
          if(headers[index]=="F0" || headers[index]=="F1" || headers[index]=="F2"  || headers[index]=="F3"  || headers[index]=="F4"  || headers[index]=="F5" ){
           chartArrayItems[headers[index]] = $(item).html();
          };
          
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
  
  var heatpfra=new Array();
  var heatera=new Array();
  var heatseda=new Array();
  var heatnita=new Array();
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
  
  //**********************************trying to enter the heatmap code***************************
  
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
      subBMP=array[0].CHOSENBMP.split(',');
      if(subBMP[0] != 1){
           $('#stripCropping.commentBoxQ').hide();
      }
      if(subBMP[1] != 1){
           $('#cropRotation.commentBoxQ').hide();
      }
      if(subBMP[2] != 1){
           $('#coverCrops.commentBoxQ').hide();
      }
      if(subBMP[3] != 1){
           $('#filterStrips.commentBoxQ').hide();
      }
      if(subBMP[4] != 1){
           $('#grassedWaterways.commentBoxQ').hide();
      }
      if(subBMP[5] != 1){
           $('#conservationTillage.commentBoxQ').hide();
      }
      if(subBMP[7] != 1){
           $('#Wetlands.commentBoxQ').hide();
      }
  
  
  //for star rating hover
  $('.rating input[type="radio"]').hover(function() {
      $(this).nextAll('span').removeClass().addClass('jshoverNext');
      $(this).next('span').removeClass().addClass('jshover');
      $(this).prevAll('span').removeClass().addClass('jshover');
  },function() {
      $('.rating input[type="radio"] + span').removeClass();
  });
  
  //
  
  var totalLength=array.length
  
  var totalPages=Math.floor(totalLength/2);
  var page=1;
  var oneMap=0;
  var twoMap=1;
  var subBasinArray=[];
  var subBasinArray2=[];
  //Shows what maps we are on. oneMap and twoMap are important variables.
  $( ".oneMap" ).html(oneMap+1);
  $( ".twoMap" ).html(twoMap+1);
  
  var map1
  ///BEGIN FUNCTION FOR MAPPING IT IS CALLING THE MAPPING JS	
  var forMapArray=[];
  var forMapArray2=[]; 
  var subBasinArrayStart2=[];
  var bmpArray2=[];
  var assArray2=[];
  var subBasinArrayStart=[];
  var bmpArray=[];
  var assArray=[];
  var session=0;
  var bmpArrayNames=["strip_cropping", "crop_rotation", "cover_crops", "filter_strips", "grassed_waterway", "conservation_tillage", "No", "variable_area_wetlands","variable_wetfr_wetlands"];
  //only call to graph based off of maps
  //graphIt();
  var instance = 0;
  colorChangeGraphIt(instance);
  
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
          width:      550,
      });
      
      
                   }
      });
     
  })
  
  
  $("body").click(function(e) {
      session= session+1;
      /*var obj3=$(e.target);
      obj4 = obj3.getAttribute("Height");
      //alert(session);
      var obj2=5;
      var obj2=$(e.target).naturalHeight;
      var obj1=$(e.target).naturalWidth;*/

      var obj1=$(e.target).attr('name');
      var obj8 = $(e.target).attr('width');
      var obj3 = $(e.target).attr('height')
      var objj=$(e.target).parents().eq(11);
      console.log($(e.target).parents().eq(11).attr('className'));

      if((obj3==492) && (obj8==59))
      {
          obj1= 'popupClose';
      }
      var answer='NULL';
      
      if(obj1=='stripCropping1')
      {
          var answer=document.querySelector('input[name="stripCropping1"]:checked').value;
      }
      if(obj1=='stripCropping2')
      {
          var answer=document.querySelector('input[name="stripCropping2"]:checked').value;
          
      }
      if(obj1=='cropRotation1')
      {
          var answer=document.querySelector('input[name="cropRotation1"]:checked').value;
      }
      if(obj1=='cropRotation2')
      {
          var answer=document.querySelector('input[name="cropRotation2"]:checked').value;
      }
      if(obj1=='coverCrops1')
      {
          var answer=document.querySelector('input[name="coverCrops1"]:checked').value;
      }
      if(obj1=='coverCrops2')
      {
          var answer=document.querySelector('input[name="coverCrops2"]:checked').value;
      }
      if(obj1=='filterStrips1')
      {
          var answer=document.querySelector('input[name="filterStrips1"]:checked').value;
      }
      if(obj1=='filterStrips2')
      {
          var answer=document.querySelector('input[name="filterStrips2"]:checked').value;
      }
      if(obj1=='grassedWaterways1')
      {
          var answer=document.querySelector('input[name="grassedWaterways1"]:checked').value;
      }
      if(obj1=='grassedWaterways2')
      {
          var answer=document.querySelector('input[name="grassedWaterways2"]:checked').value;
      }
      if(obj1=='conservationTillage1')
      {
          var answer=document.querySelector('input[name="conservationTillage1"]:checked').value;
      }
      if(obj1=='conservationTillage2')
      {
          var answer=document.querySelector('input[name="conservationTillage2"]:checked').value;
      }
      if(obj1=='Wetlands1')
      {
          var answer=document.querySelector('input[name="Wetlands1"]:checked').value;
      }
      if(obj1=='Wetlands2')
      {
          var answer=document.querySelector('input[name="Wetlands2"]:checked').value;
      }
      if(obj1=='rating1')
      {
          var answer=document.querySelector('input[name="rating1"]:checked').value;
      }
      if(obj1=='rating2')
      {
          var answer=document.querySelector('input[name="rating2"]:checked').value;
      }
      if(obj1=='subDrop')
      {
          var answer=document.getElementsByName('subDrop').item(0).value;
      }
      if(obj1=='bmpType')
      {
          var answer=$(e.target).val();
      }
	  if(obj1=='heatDrop')
      {
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
      session= session+1;
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
  };	
  
      //Time to get our data. getSubBasins is called each time we need a new set of maps. oneMap and twoMap are the variables that change on the click of the buttons. It causes us to move to the new rows in the giant dataset. The maps then read the new materials and away we go. That (mapping) occurs in the initialize() function.
      function getSubBasins(){
          subBasinArray=[];
          subBasinArray2=[];
          bmpArray=array[oneMap].CHOSENBMP.split(',');
  
      ///////////////////////////////////////////////////////////////////
  
      //we should be able to put the google charts stuff here because we want the graphs to refresh every page as the maps do.

          var option = document.getElementById('subDrop').value;
          //alert("I am in it");
          var rowlen;

          var data = new google.visualization.DataTable();
		 
            data.addColumn('number', 'Individual');
            data.addColumn('number', 'Peak Flow');
            data.addColumn({id:'min', type:'number', role:'interval'});
            data.addColumn({id:'max', type:'number', role:'interval'});
            data.addColumn({type: 'string', role: 'style'});
            data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});

            //data.addColumn({type: 'number', role: 'annotation'});
		
          var data1 = new google.visualization.DataTable();
		 
            data1.addColumn('number', 'Individual');
            data1.addColumn('number', 'Revenue in $');
            data1.addColumn({id:'min', type:'number', role:'interval'});
            data1.addColumn({id:'max', type:'number', role:'interval'});
            data1.addColumn({type: 'string', role: 'style'});
            data1.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
            //data1.addColumn({type: 'number', role: 'annotation'});

		
          var data2 = new google.visualization.DataTable();
		 
            data2.addColumn('number', 'Individual');
            data2.addColumn('number', 'sediment red in tons');
            data2.addColumn({id:'min', type:'number', role:'interval'});
            data2.addColumn({id:'max', type:'number', role:'interval'});
            data2.addColumn({type: 'string', role: 'style'});
            data2.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
            //data2.addColumn({type: 'number', role: 'annotation'});
		

          var data3 = new google.visualization.DataTable();
		 
            data3.addColumn('number', 'Individual');
            data3.addColumn('number', 'nitrate red in kilograms');
            data3.addColumn({id:'min', type:'number', role:'interval'});
            data3.addColumn({id:'max', type:'number', role:'interval'});
            data3.addColumn({type: 'string', role: 'style'});
            data3.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
              //data3.addColumn({type: 'number', role: 'annotation'});
          
              
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
				//JSON.parse(chartArray[rowlen].F1)[0]
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
				//need to edit the tooltip for min and max
				data.addRow([rowlen+1,m11,min11,max11,colors[rowlen],createCustomHTMLContent1(rowlen+1,'PFR',m11.toExponential(2),min11.toExponential(2),max11.toExponential(2))]);
				data1.addRow([rowlen+1,m12,min12,max12,colors[rowlen],createCustomHTMLContent1(rowlen+1,'ER$',m12.toExponential(2),min12.toExponential(2),max12.toExponential(2))]);
				data2.addRow([rowlen+1,m13,min13,max13,colors[rowlen],createCustomHTMLContent1(rowlen+1,'SRed',m13.toExponential(2),min13.toExponential(2),max13.toExponential(2))]);
				data3.addRow([rowlen+1,m14,min14,max14,colors[rowlen],createCustomHTMLContent1(rowlen+1,'NRed',m14.toExponential(2),min14.toExponential(2),max14.toExponential(2))]);				
			}	
      
            
       
          var options = {
			title: 'Peak flow reduction in cubic feet per second (PFR)',
		   // This line makes the entire category's tooltip active.
			focusTarget: 'category',
			// Use an HTML tooltip.
			tooltip: { isHtml: true },
			tooltip: { trigger: 'selection'},
			vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 } , direction: -1},
			intervals: { style: 'bars' , color: '#fff'},
			hAxis: { textPosition: 'none' },
		  };
		var options1 = {
			title: 'Economic Revenue in Dollars (ER)',
			// This line makes the entire category's tooltip active.
			focusTarget: 'category',
			// Use an HTML tooltip.
			tooltip: { isHtml: true },
			tooltip: { trigger: 'selection'},
			vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 } , direction: -1},
			intervals: { style: 'bars' , color: '#fff'},
			hAxis: { textPosition: 'none' },
		  };
		var options2 = {
			title: 'In-stream sediment reduction in tons (SRed)',
			// This line makes the entire category's tooltip active.
			focusTarget: 'category',
			// Use an HTML tooltip.
			tooltip: { isHtml: true },
			tooltip: { trigger: 'selection'},
			vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 } , direction: -1},
			intervals: { style: 'bars' , color: '#fff'},
			hAxis: { textPosition: 'none' },
		  };
		var options3 = {
			title: 'In-stream nitrate reduction in kilograms (NRed)',
			// This line makes the entire category's tooltip active.
			focusTarget: 'category',
			// Use an HTML tooltip.
			tooltip: { isHtml: true },
			tooltip: { trigger: 'selection'},
			vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 }, direction: -1 },
			intervals: { style: 'bars' , color: '#fff'},
			hAxis: { textPosition: 'none' },
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
          google.visualization.events.addListener(chart, 'select', function goToTimeBar() {			//session=session+1;
              //alert (session + " " + page + " " + session)
			  var clickd=chart.getSelection();
                       $.ajax({ 
                       url: 'sendToTime.php',
                       type: 'post',
                        data:"JSONHolder=" + "BAR_PFR" + "," + page + "," + session+ "," + (option + " "+(parseInt(clickd[0].row)+1)),
                          success: function(data) {
                          
                              }
                          });  
                     });  
          google.visualization.events.addListener(chart1, 'select', function goToTimeBar() {
              //session=session+1;
              //alert (session + " " + page + " " + session)
			  var clickd=chart1.getSelection();
              console.log(clickd);
                       $.ajax({ 
                       url: 'sendToTime.php',
                       type: 'post',
                        data:"JSONHolder=" + "BAR_ER" + "," + page + "," + session+ "," + (option + " "+(parseInt(clickd[0].row)+1)),
                          success: function(data) {
                          
                              }
                          });  
                     });  
          google.visualization.events.addListener(chart2, 'select', function goToTimeBar() {
              //session=session+1;
              //alert (session + " " + page + " " + session)
			  var clickd=chart2.getSelection();
                       $.ajax({ 
                       url: 'sendToTime.php',
                       type: 'post',
                        data:"JSONHolder=" + "BAR_SRed" + "," + page + "," + session+ "," + (option + " "+(parseInt(clickd[0].row)+1)),
                          success: function(data) {
                          
                              }
                          });  
                     });  
          google.visualization.events.addListener(chart3, 'select', function goToTimeBar() {
              //session=session+1;
              //alert (session + " " + page + " " + session)
			  var clickd=chart3.getSelection();
                       $.ajax({ 
                       url: 'sendToTime.php',
                       type: 'post',
                        data:"JSONHolder=" + "BAR_NRed" + "," + page + "," + session+ "," + (option + " "+(parseInt(clickd[0].row)+1)),
                          success: function(data) {
                          
                              }
                          });  
                     });  
            
          /*function createCustomHTMLContent1( row, dm , m) {
            return '<div style="padding:5px 5px 5px 5px;">' +
                '<table id="medals_layout">' + '<tr>' +
                '<td>Alternative : </td>' +
                '<td><b>' + row + '</b></td>' + '</tr>' + '<tr>' +
                '<td>'+dm+' : </td>' +
                '<td><b>' + m + '</b></td>' + '</tr>' + '<tr>'  + '</table>' + '</div>';
          }*/
         function createCustomHTMLContent1( row, dm , m, min , max) {
		return '\n'+'Alternative: ' + row +'\n'+dm+': '+ m + "\n min:" + min +"\nmax:" + max ;
		  
		}
  
          $('.visualize').trigger('visualizeRefresh');
        
      }
      else
      {
            
            for (rowlen = 0; rowlen < document.getElementById('wholeTable').rows.length-1; rowlen++) {
  
                  var subChart=[];
  
                  $.each(array[rowlen], function(key, value) { 
                        if (key==option){
                        //alert(key + ': ' + value);
                        //subChart=value.split(',');
                         subChart=JSON.parse("["+value+"]");
                        };
                  });
                  //JSON.parse(chartArray[rowlen].F1)[0]
				var m11=Number(parseFloat(Math.abs(subChart[1][0])))
				var min11=Number(parseFloat(Math.abs(subChart[1][1])))
				var max11=Number(parseFloat(Math.abs(subChart[1][2])))
				var perm11=0.0006
				var perm11=Number(Math.abs(parseFloat(m11/(JSON.parse(chartArray[rowlen].F1)[0]))))*100
				
				//var mm11=String("Alternative:"+(rowlen+1)+"\nPeakFlow:"+parseString(m11)+"\nPercentage:"+perm11)
				
				var m12=Number(parseFloat(Math.abs(subChart[2][0])))
				var min12=Number(parseFloat(Math.abs(subChart[2][1])))
				var max12=Number(parseFloat(Math.abs(subChart[2][2])))
				var perm12=0.0006
				var perm12=Number(Math.abs(parseFloat(m12/(JSON.parse(chartArray[rowlen].F2)[0]))))*100
				
				
				//var mm12=String("Alternative:"+(rowlen+1)+"\nPeakFlow:"+parseString(m12)+"\nPercentage:"+perm12)
			  
				var m13=Number(parseFloat(Math.abs(subChart[3][0])))
				var min13=Number(parseFloat(Math.abs(subChart[3][1])))
				var max13=Number(parseFloat(Math.abs(subChart[3][2])))
				var perm13=0.0006
				var perm13=Number(Math.abs(parseFloat(m13/(JSON.parse(chartArray[rowlen].F3)[0]))))*100
				
				//var mm13=String("Alternative:"+(rowlen+1)+"\nPeakFlow:"+parseString(m13)+"\nPercentage:"+perm13)
				
				var m14=Number(parseFloat(Math.abs(subChart[4][0])))
				var min14=Number(parseFloat(Math.abs(subChart[4][1])))
				var max14=Number(parseFloat(Math.abs(subChart[4][2])))
				var perm14=0.0006
				var perm14=Number(Math.abs(parseFloat(m14/(JSON.parse(chartArray[rowlen].F4)[0]))))*100
				
				//var mm14=String("Alternative:"+(rowlen+1)+"\nPeakFlow:"+parseString(m14)+"\nPercentage:"+perm14)
								
				data.addRow([rowlen+1,m11,min11,max11,colors[rowlen],createCustomHTMLContent(rowlen+1,'PFR',m11.toExponential(2),min11.toExponential(2),max11.toExponential(2),'PFR wrt Watershed',perm11.toExponential(2))]);
				data1.addRow([rowlen+1,m12,min12,max12,colors[rowlen],createCustomHTMLContent(rowlen+1,'ER$',m12.toExponential(2),min12.toExponential(2),max12.toExponential(2),'ER$ wrt Watershed',perm12.toExponential(2))]);
				data2.addRow([rowlen+1,m13,min13,max13,colors[rowlen],createCustomHTMLContent(rowlen+1,'SRed',m13.toExponential(2),min13.toExponential(2),max13.toExponential(2),'SRed wrt Watershed',perm13.toExponential(2))]);
				data3.addRow([rowlen+1,m14,min14,max14,colors[rowlen],createCustomHTMLContent(rowlen+1,'NRed',m14.toExponential(2),min14.toExponential(2),max14.toExponential(2),'NRed wrt Watershed',perm14.toExponential(2))]);
                  
              }		
        
         var options = {
			title: 'Peak flow reduction in cfs (PFR)',
		   // This line makes the entire category's tooltip active.
			focusTarget: 'category',
			// Use an HTML tooltip.
			tooltip: { isHtml: true },
			tooltip: { trigger: 'selection'},
			vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 } , direction: -1},
			intervals: { style: 'bars' , color: '#fff'},
			hAxis: { textPosition: 'none' },
			
		  };
		var options1 = {
			title: 'Economic Revenue in Dollars (ER$)',
			// This line makes the entire category's tooltip active.
			focusTarget: 'category',
			// Use an HTML tooltip.
			tooltip: { isHtml: true },
			tooltip: { trigger: 'selection'},
			vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 } , direction: -1},
			intervals: { style: 'bars' , color: '#fff'},
			hAxis: { textPosition: 'none' },
		  };
		var options2 = {
			title: 'In-stream sediment reduction in tons (SRed)',
			// This line makes the entire category's tooltip active.
			focusTarget: 'category',
			// Use an HTML tooltip.
			tooltip: { isHtml: true },
			tooltip: { trigger: 'selection'},
			vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 }, direction: -1 },
			intervals: { style: 'bars' , color: '#fff'},
			hAxis: { textPosition: 'none' },
		  };
		var options3 = {
			title: 'In-stream nitrate reduction in kilograms (NRed)',
			// This line makes the entire category's tooltip active.
			focusTarget: 'category',
			// Use an HTML tooltip.
			tooltip: { isHtml: true },
			tooltip: { trigger: 'selection'},
			vAxis: { gridlines: { count: document.getElementById('wholeTable').rows.length-1 } , direction: -1},
			intervals: { style: 'bars' , color: '#fff'},					
			hAxis: { textPosition: 'none' },
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
          google.visualization.events.addListener(chart, 'select', function goToTimeBar() {			//session=session+1;
              //alert (session + " " + page + " " + session)
			  var clickd=chart.getSelection()
                       $.ajax({ 
                       url: 'sendToTime.php',
                       type: 'post',
                        data:"JSONHolder=" + "BAR_PFR" + "," + page + "," + session+ "," + (option + " "+(parseInt(clickd[0].row)+1)),
                          success: function(data) {
                          
                              }
                          });  
                     });  
          google.visualization.events.addListener(chart1, 'select', function goToTimeBar() {
              //session=session+1;
              //alert (session + " " + page + " " + session)
			   var clickd=chart1.getSelection()
                       $.ajax({ 
                       url: 'sendToTime.php',
                       type: 'post',
                        data:"JSONHolder=" + "BAR_ER" + "," + page + "," + session+ "," + (option + " "+(parseInt(clickd[0].row)+1)),
                          success: function(data) {
                          
                              }
                          });  
                     });  
          google.visualization.events.addListener(chart2, 'select', function goToTimeBar() {
              //session=session+1;
              //alert (session + " " + page + " " + session)
			   var clickd=chart2.getSelection()
                       $.ajax({ 
                       url: 'sendToTime.php',
                       type: 'post',
                        data:"JSONHolder=" + "BAR_SRed" + "," + page + "," + session+ "," + (option + " "+(parseInt(clickd[0].row)+1)),
                          success: function(data) {
                          
                              }
                          });  
                     });  
          google.visualization.events.addListener(chart3, 'select', function goToTimeBar() {
              //session=session+1;
              //alert (session + " " + page + " " + session)
			   var clickd=chart3.getSelection()
                       $.ajax({ 
                       url: 'sendToTime.php',
                       type: 'post',
                        data:"JSONHolder=" + "BAR_NRed" + "," + page + "," + session+ "," + (option + " "+(parseInt(clickd[0].row)+1)),
                          success: function(data) {
                          
                              }
                          });  
                     });
            
          /*function createCustomHTMLContent( row, dm , m, dpermw, permw) {
            return '<div style="padding:5px 5px 5px 5px;">' +
                '<table id="medals_layout">' + '<tr>' +
                '<td>Alternative : </td>' +
                '<td><b>' + row + '</b></td>' + '</tr>' + '<tr>' +
                '<td>'+dm+' : </td>' +
                '<td><b>' + m + '</b></td>' + '</tr>' + '<tr>' +
                '<td>'+dpermw+' : </td>' +
                '<td><b>' + permw +'%'+ '</b></td>' + '</tr>' + '</table>' + '</div>';
          }*/
         function createCustomHTMLContent( row, dm , m, min , max, dpermw, permw) {
		  return '\n'+'Alternative: ' + row +'\n'+dm+': '+ m +"\nmin:"+ min + "\nmax:" + max + "\n" + dpermw +': '+permw+' %';
		}
  
          $('.visualize').trigger('visualizeRefresh');
        
      }
  
  
  
  
      /////////////end charting stuff
      
      subBasinArrayStart=array[oneMap].REGIONSUBBASINID.split(',');
      assArray=array[oneMap].ASSIGNMENTS.split(',');
      var count=0;
      //alert("subBasinArrayStart"+subBasinArrayStart);
          $.each(subBasinArrayStart, function(index, value) { 
          
              var subArrayItem={};
              subArrayItem["subbasinID"] = value;
              subBasinArray.push(subArrayItem);
              count=count+1;
          
          });
          //alert(JSON.stringify(subBasinArray));
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
                      };
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
                      };
               }); 
                forMapArray2[count2]["subs"]=words;
                //alert(JSON.stringify(forMapArray2));
                count2=count2+1;    	
          });
            //Now that I have all the data arranged for the incoming dataset (multiple arrays labeled 1 and 2) I initialize mapping. It is on mapping.js
            initialize();	
            	     
           
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
          
      //Setting  up the radio buttons					   
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
      //alert(rating1a);
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
       $('input[name=Wetlands1]').attr('checked', false);
       $radios15.filter('[value='+WetlandsAnswer1+']').attr('checked', true);
      //alert(rating1a);
        if(WetlandsAnswer1 !== "0") {
          $radios15.filter('[value='+WetlandsAnswer1+']').attr('checked', true);
          //$radios.filter('[rating1]').attr('checked', true);
      }
      
  
      
      
      //setting up Wetlands two
      var $radios16 = $('input:radio[name=Wetlands2]');
      //alert(answersArray[oneMap].RATING);
      var WetlandsAnswer2=answersArray[twoMap].Wetlands;
       $('input[name=Wetlands2]').attr('checked', false);
       $radios16.filter('[value='+WetlandsAnswer2+']').attr('checked', true);
      //alert(rating1a);
        if(WetlandsAnswer2 !== "0") {
          $radios16.filter('[value='+WetlandsAnswer2+']').attr('checked', true);
          //$radios.filter('[rating1]').attr('checked', true);
      }
      
         
      }
      //END setting up radio buttons 
      //Putting radio button values in text area
      jQuery('input:radio[name=rating1]').change(function(){
          //var id = $(this).attr("value");
          $("#rating1").val(function () {
  return document.querySelector('input[name="rating1"]:checked').value;
  });
          //alert($(this).val());
        })
      
      jQuery('input:radio[name=rating2]').change(function(){
          //var id = $(this).attr("value");
          $("#rating2").val(function () {
  return document.querySelector('input[name="rating2"]:checked').value;
  });
          //alert($(this).val());
        }) 		
  
  
       //setting up stripcropping radio
      jQuery('input:radio[name=stripCropping1]').change(function(){
          //var id = $(this).attr("value");
          $("#stripCropping1").val(function () {
  return document.querySelector('input[name="stripCropping1"]:checked').value;
  });
          //alert($(this).val());
        })
      
      jQuery('input:radio[name=stripCropping2]').change(function(){
          //var id = $(this).attr("value");
          $("#stripCropping2").val(function () {
  return document.querySelector('input[name="stripCropping2"]:checked').value;
  });
          //alert($(this).val());
        }) 
        
        //setting up cropRotation radio
      jQuery('input:radio[name=cropRotation1]').change(function(){
          //var id = $(this).attr("value");
          $("#cropRotation1").val(function () {
  return document.querySelector('input[name="cropRotation1"]:checked').value;
  });
          //alert($(this).val());
        })
      
      jQuery('input:radio[name=cropRotation2]').change(function(){
          //var id = $(this).attr("value");
          $("#cropRotation2").val(function () {
  return document.querySelector('input[name="cropRotation2"]:checked').value;
  });
          //alert($(this).val());
      })
        
        //setting up coverCrops radio
      jQuery('input:radio[name=coverCrops1]').change(function(){
          //var id = $(this).attr("value");
          $("#coverCrops1").val(function () {
  return document.querySelector('input[name="coverCrops1"]:checked').value;
  });
          //alert($(this).val());
        })
      
      jQuery('input:radio[name=coverCrops2]').change(function(){
          //var id = $(this).attr("value");
          $("#coverCrops2").val(function () {
  return document.querySelector('input[name="coverCrops2"]:checked').value;
  });
          //alert($(this).val());
        })
        
        //setting up filterStrips radio
      jQuery('input:radio[name=filterStrips1]').change(function(){
          //var id = $(this).attr("value");
          $("#filterStrips1").val(function () {
  return document.querySelector('input[name="filterStrips1"]:checked').value;
  });
          //alert($(this).val());
        })
      
      jQuery('input:radio[name=filterStrips2]').change(function(){
          //var id = $(this).attr("value");
          $("#filterStrips2").val(function () {
  return document.querySelector('input[name="filterStrips2"]:checked').value;
  });
          //alert($(this).val());
        })
      
      //setting up grassedWaterways radio
      jQuery('input:radio[name=grassedWaterways1]').change(function(){
          //var id = $(this).attr("value");
          $("#grassedWaterways1").val(function () {
  return document.querySelector('input[name="grassedWaterways1"]:checked').value;
  });
          //alert($(this).val());
        })
      
      jQuery('input:radio[name=grassedWaterways2]').change(function(){
          //var id = $(this).attr("value");
          $("#grassedWaterways2").val(function () {
  return document.querySelector('input[name="grassedWaterways2"]:checked').value;
  });
          //alert($(this).val());
        }) 
        
        //setting up conservationTillage radio
      jQuery('input:radio[name=conservationTillage1]').change(function(){
          //var id = $(this).attr("value");
          $("#conservationTillage1").val(function () {
  return document.querySelector('input[name="conservationTillage1"]:checked').value;
  });
          //alert($(this).val());
        })
      
      jQuery('input:radio[name=conservationTillage2]').change(function(){
          //var id = $(this).attr("value");
          $("#conservationTillage2").val(function () {
  return document.querySelector('input[name="conservationTillage2"]:checked').value;
  });
          //alert($(this).val());
        })	
        
        
            //setting up wetlands radio
      jQuery('input:radio[name=Wetlands1]').change(function(){
          //var id = $(this).attr("value");
          $("#Wetlands1").val(function () {
  return document.querySelector('input[name="Wetlands1"]:checked').value;
  });
          //alert($(this).val());
        })
      
      jQuery('input:radio[name=Wetlands2]').change(function(){
          //var id = $(this).attr("value");
          $("#Wetlands2").val(function () {
  return document.querySelector('input[name="Wetlands2"]:checked').value;
  });
          //alert($(this).val());
        })
                         
                             
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
      $("#JSONHolder").hide();
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
      setUpRadio();
      getSubBasins();
      
      //This fires off each time someone hits the next button. It moves the data 2 spots and runs through the new arrays that are created. The if
      // statement stops it from doing anything if at the end of the set.
      $(".moveNext").click(function() {
              $('.displayStuff').html("");
              //Load the answers into the answers array//////////////////////
              $(".moveBack").fadeTo(1000,1);
              //$(".moveBack").show();
              answersArray[oneMap].RATING=$("#rating1").val();
              //answersArray[oneMap].CONFIDENCE=$("#confidence1").val();
              answersArray[twoMap].RATING=$("#rating2").val();
              //answersArray[twoMap].CONFIDENCE=$("#confidence2").val();
              var value1 = $( "#slider" ).slider( "option", "value" );
              answersArray[oneMap].CONFIDENCE=value1;
              var value2 = $( "#slider1" ).slider( "option", "value" );
              answersArray[twoMap].CONFIDENCE=value2;
              
              answersArray[oneMap].stripCropping=$("#stripCropping1").val();
              answersArray[twoMap].stripCropping=$("#stripCropping2").val();
              answersArray[oneMap].cropRotation=$("#cropRotation1").val();
              answersArray[twoMap].cropRotation=$("#cropRotation2").val();
              answersArray[oneMap].coverCrops=$("#coverCrops1").val();
              answersArray[twoMap].coverCrops=$("#coverCrops2").val();
              answersArray[oneMap].filterStrips=$("#filterStrips1").val();
              answersArray[twoMap].filterStrips=$("#filterStrips2").val();
              answersArray[oneMap].grassedWaterways=$("#grassedWaterways1").val();
              answersArray[twoMap].grassedWaterways=$("#grassedWaterways2").val();
              answersArray[oneMap].conservationTillage=$("#conservationTillage1").val();
              answersArray[twoMap].conservationTillage=$("#conservationTillage2").val();
              answersArray[oneMap].Wetlands=$("#Wetlands1").val();
              answersArray[twoMap].Wetlands=$("#Wetlands2").val();
              
              $("#JSONHolder").val(JSON.stringify(answersArray));
              //alert(JSON.stringify(answersArray));
          
          //This gets new data

          if(page!=totalPages){
              if (page==totalPages-1){
  //				 $(".moveNext").fadeTo(1000,.2);
                  }
  //			 $(".moveNext").show();
              // alert(oneMap);
              bmpArray=array[page].CHOSENBMP;
              oneMap=oneMap+2;
              twoMap=twoMap+2;
              $( ".oneMap" ).html(oneMap+1);
              $( ".twoMap" ).html(twoMap+1);
              //this next line will get new data and then map
  //Maps are still being created with new data 
              getSubBasins();
              //MAP IT//////////
              //initialize();
              $( "#tabs" ).tabs("destroy");
              heatinitialize();
  
              $("#rating1").val(answersArray[oneMap].RATING);
              $("#rating2").val(answersArray[twoMap].RATING);
              $("#confidence1").val(answersArray[oneMap].CONFIDENCE);
              $( "#slider" ).slider("option","value",(answersArray[oneMap].CONFIDENCE));
              $( "#slider1" ).slider("option","value",(answersArray[twoMap].CONFIDENCE));
              $("#confidence2").val(answersArray[twoMap].CONFIDENCE);
              
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
              //This JSONHolder is just a hidden text field on the page where I am saving my giant array of answers. When the person is done, this field is submitted and we can grab all the data out of it.
              $("#JSONHolder").val(JSON.stringify(answersArray));
              setUpRadio();
              $(".map1").hide();
              $(".map1").fadeIn("slow");
              $(".map2").hide();
              $(".map2").fadeIn("slow");
              subBasinGraph1();
          //alert(JSON.stringify(bmpArray));
          page=page+1;
          $('.currentPage').text(page);
          }
          else
          {
           $(".moveNext").fadeTo(1000,.2);
          }
      });
      
      //This is fired when people are going backwards!
      $(".moveBack").click(function() {
              $('.displayStuff').html("");
              $(".moveNext").fadeTo(1000,1);
              answersArray[oneMap].RATING=$("#rating1").val();
              //answersArray[oneMap].CONFIDENCE=$("#confidence1").val();
              answersArray[twoMap].RATING=$("#rating2").val();
              //answersArray[twoMap].CONFIDENCE=$("#confidence2").val();
              var value1 = $( "#slider" ).slider( "option", "value" );
              answersArray[oneMap].CONFIDENCE=value1;
              var value2 = $( "#slider1" ).slider( "option", "value" );
              answersArray[twoMap].CONFIDENCE=value2;
              
              answersArray[oneMap].stripCropping=$("#stripCropping1").val();
              answersArray[twoMap].stripCropping=$("#stripCropping2").val();
              answersArray[oneMap].cropRotation=$("#cropRotation1").val();
              answersArray[twoMap].cropRotation=$("#cropRotation2").val();
              answersArray[oneMap].coverCrops=$("#coverCrops1").val();
              answersArray[twoMap].coverCrops=$("#coverCrops2").val();
              answersArray[oneMap].filterStrips=$("#filterStrips1").val();
              answersArray[twoMap].filterStrips=$("#filterStrips2").val();
              answersArray[oneMap].grassedWaterways=$("#grassedWaterways1").val();
              answersArray[twoMap].grassedWaterways=$("#grassedWaterways2").val();
              answersArray[oneMap].conservationTillage=$("#conservationTillage1").val();
              answersArray[twoMap].conservationTillage=$("#conservationTillage2").val();
              answersArray[oneMap].Wetlands=$("#Wetlands1").val();
              answersArray[twoMap].Wetlands=$("#Wetlands2").val();
              
              $("#JSONHolder").val(JSON.stringify(answersArray));
              //alert(JSON.stringify(answersArray));
          if(page>1){
              //write the answers in the fields to the AnswersArray
              $(".moveNext").fadeTo(1000,1);
              bmpArray=array[page].CHOSENBMP;
              oneMap=oneMap-2;
              twoMap=twoMap-2;
              $( ".oneMap" ).html(oneMap+1);
              $( ".twoMap" ).html(twoMap+1);
              //this next line will get new data and then map
              getSubBasins();
               $( "#tabs" ).tabs("destroy");
              heatinitialize();
              //getSubBasins();
              $("#rating1").val(answersArray[oneMap].RATING);
              $("#rating2").val(answersArray[twoMap].RATING);
              $( "#slider" ).slider("option","value",(answersArray[oneMap].CONFIDENCE));
              $( "#slider1" ).slider("option","value",(answersArray[twoMap].CONFIDENCE));
              $("#confidence1").val(answersArray[oneMap].CONFIDENCE);
              $("#confidence2").val(answersArray[twoMap].CONFIDENCE);
              
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
              
              setUpRadio();
              subBasinGraph1();
          //alert(JSON.stringify(bmpArray));
          page=page-1;
           if (page==1){
                   $(".moveBack").fadeTo(1000,.2);
                  }
          $('.currentPage').text(page);
          }else
          {
          $(".moveBack").fadeTo(1000,.2);
          }
      });
      
      //This sends all the data. I move the answers data into the id JSONHolder and then submit the form. 
          $(".submitAll").click(function() {
              answersArray[oneMap].RATING=$("#rating1").val();
              answersArray[twoMap].RATING=$("#rating2").val();
              var value1 = $( "#slider" ).slider( "option", "value" );
              answersArray[oneMap].CONFIDENCE=value1;
              var value2 = $( "#slider1" ).slider( "option", "value" );
              answersArray[twoMap].CONFIDENCE=value2;
              $("#JSONHolder").val(JSON.stringify(answersArray));
              $('#form1').submit();
  
      });

  });
  
  window.onload = function() {
      heatinitialize();
      // open a welcome message as soon as the window loads
      Shadowbox.open({
          content:    '<div id="welcome-msg"><h2>Instructions</h2><ol><li>Please compare  alternatives based on how the conservation practices are spatially distributed  in the watershed and based on the performance of these alternatives with  respect to the various goals or objectives you selected earlier. </li><li>The bar-graphs at  the bottom of the page display how the various alternatives perform with respect  to the objectives. </li><li>Then, please make  a judgment on the quality of the design of the various alternatives based on  any subjective criteria important to you. </li><li>Once you have  compared the alternatives, please provide a rating on how much you like or dislike  a particular alternative.</li></ol></div>',
          player:     "html",
          title:      "WRESTORE Visualization Tool ",
          height:     450,
          width:      550,
      });
  
  
  };

  
  function instruct() {
  
      // open a welcome message as soon as the window loads
      Shadowbox.open({
          content:    '<div id="welcome-msg"><h2>Instructions</h2><ol><li>Please compare  alternatives based on how the conservation practices are spatially distributed  in the watershed and based on the performance of these alternatives with  respect to the various goals or objectives you selected earlier. </li><li>The bar-graphs at  the bottom of the page display how the various alternatives perform with respect  to the objectives. </li><li>Then, please make  a judgment on the quality of the design of the various alternatives based on  any subjective criteria important to you. </li><li>Once you have  compared the alternatives, please provide a rating on how much you like or dislike  a particular alternative.</li></ol></div>',
          player:     "html",
          title:      "WRESTORE Visualization Tool ",
          height:     450,
          width:      550,
      });
  
  };
  
  function instruct1() {
  
      // open a welcome message as soon as the window loads
      Shadowbox.open({
          content:'<div id="welcome-msg"><h2>The Progress Bar</h2><p><img src="images/table.jpg"></p><p>The  progress bar shows you at what step of WRESTORE&#39s <strong>search-learn</strong> process  you currently are in. The <strong>search-learn</strong> process is divided into  consecutive sessions of interaction, during which you will get to see and  compare multiple alternatives. A colored box in the progress bar shows you  which session you currently are in. <strong>If you are in</strong> –</p><ul><li>an <strong>Introspection</strong> session, then you will get to see all of the  previously found alternatives that you have seen before and have rated as &ldquo;favorably&rdquo; solutions (except for Introspection session 1 that consist of  &ldquo;initial&rdquo; alternatives to help you become familiar with the designs). In the  introspection session you should reflect on why you liked the solutions that  you rated highly and whether you need to change your criteria for comparing or  rating alternatives.</li><li> a <strong>Human-guided Search (HS)</strong> session, then you are now actively involved  in helping the underlying WRESTORE tools to search for better alternatives. So,  you will see some &ldquo;bad&rdquo; alternatives and some &ldquo;good alternatives&rdquo;. Please use  your most current understanding of preferences and priorities to compare and  rate alternatives as they appear.</li><li><p> an <strong>Automated Search</strong> session, then the underlying WRESTORE tools  are searching for alternatives in an automated manner. In this session, you  will <strong><u>not</u></strong> be asked to compare and rate alternatives. Instead, the  feedbacks you gave in earlier sessions will be used to mechanically estimate  the ratings of the alternatives. <em>Note, that even though Automated Search is  currently shown to occur between the 4th and 5th  introspection sessions, it could also unexpectedly occur between any other  introspections sessions. But when that occurs in real-time, you will be  notified in the progress bar!</em></p></li></ul></div>',
          player:     "html",
          title:      "WRESTORE Visualization Tool ",
          height:     550,
          width:      920,
      });
  
  };
  
  
  </script>
  <script type="text/javascript">
      var togglecount = 0;
      var toggleCountStep2 = 0;
      var toggleCountStep3 = 0;
$(function(){
  $('.header').click(function(){
      togglecount++;
      $(this).closest('.containerABC').toggleClass('collapsed');
      var a = $(this).parent().attr('name');
      if(a==='step2collapse') toggleCountStep2++;
      if(a==='step3collapse') toggleCountStep3++;
      /*if(togglecount > 1 && toggleCountStep2 > 2 && toggleCountStep3 >2)*/
     /* if(togglecount >1)
      {
          if(a==='step2collapse'){
              var headstep= $("[name='step3collapse']");
              //var headchild= headstep.closest('.containerABC').toggleClass('collapsed');
              headstep.closest('.containerABC').toggleClass('collapsed');
          }
          if(a==='step3collapse'){
              var headstep= $("[name='step2collapse']");
              //var headchild= headstep.closest('.containerABC').toggleClass('collapsed');
              headstep.closest('.containerABC').toggleClass('collapsed');
          }
      }*/

  });
  $(function(){
    $(".info").click(function(){
      $(".tip", this).toggle().css("z-index" , 999)});
  });
// $(function(){
//     $("#oneMapPF").click(function() {
//         $(this).tooltip("open");
//     });
//     $("#oneMapPF").mouseout(function() {
//         $(this).tooltip("disable");
//     });
// });
//   $('.info').on({
//         "click": function() {
//             //$(this).tooltip({ items: "#tt", content: "abc<br/><img src ='http://www.w3schools.com/html/pic_mountain.jpg'>"});
//             debugger
//             $(this).tooltip("open");
//         },
//         "mouseout": function() {      
//             $(this).tooltip("disable");   
//         }
//     });
});
  </script>
  </body>
  </html>