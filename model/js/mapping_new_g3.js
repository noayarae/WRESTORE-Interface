  // // JavaScript Document
  // var subbasin_id = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,71,76,77,78,80,82,83,85,86,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,110,111,112,115,117,119,121,122,123,124,125,126,127];
  // var strip_crop = [1,1,1,0,0,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,1,1,1,0,1,0,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,0,1,1,0,0,1,1,1,0,1,1,1,1,0,1,0,1,0,0,0,1,1,0,0,1,0,0,0,1,0,1,1,0,1,1,1,0,0,0,1,1,1,0,0,1,0,0,1,0,0,0,1,1,1,0,0,1];
  // var crop_rot = [1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,1,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,1,1,1,0,1,1,0,1,0,1,0,1,1,0,0,0,0,0,0,1,0,0,1,0,1,1,1,1,0,1,1,1,0,0,1,1,1];
  // var cover_crop = [1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,1,1,0,0,1,1,1,0,1,1,0,0,1,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,0,0,0,0,0,1,0,0,0,1,0,0,1,1,0,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,1,1,1,1,1,0,1];
  // var filter_str = [14.55,6.01,1.79,8.13,15.78,13.45,7.36,13.14,4.65,12.23,14.43,1.45,12.82,16.14,7.17,5.66,5.43,10.37,12.13,9.79,9.25,5.2,6.31,8.54,15.68,11.92,11.58,9.03,5.96,14.59,12.57,9.27,6.63,12.47,2.81,8.93,8.57,10.4,0.57,13.14,13.3,16.1,3.73,8.92,3.05,15.74,4.09,0.66,9.54,13.46,11.57,2.25,10.23,7.24,6.13,15.22,4.91,6.24,14.59,3.56,5.57,14.61,2.34,1.59,1.01,14.8,14.27,11.53,9.57,8.01,2,0.7,9.05,8.82,7.03,7.25,5.36,1.91,15.77,1.26,15.07,0.78,3.17,16.31,4.16,4.3,15.16,11.32,13.3,13.08,8.05,15.46,12.27,4.17,3.46,10.56,16.02,8.96,2.4,5.87,5.86,6.92,15.48,14.16,1.25,13.79,12.63,14.09];
  // var grass_wat = [0,0,1,0,1,0,1,1,0,0,0,1,0,1,1,1,1,0,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,0,1,0,1,0,0,0,0,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,0,1,0,1,1,0,1,0,1,1,1,0,1,0,1,0,0,1,1,1,0,0,1,0,1,1,0,1,1,0,1,0,1,0,0,0,1,1,1,0,1,0,1,0,0,1];
  // var consv_till = [1,1,0,0,1,1,0,1,1,1,1,1,0,1,1,1,0,0,1,1,0,0,1,0,1,1,1,1,1,1,0,0,1,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,0,1,0,1,0,0,1,0,1,0,1,1,1,0,0,0,1,1,0,1,1,0,0,0,0,1,0,0,0,0,1,0,1,0,1,0,0,1,1,0,0,0,1,0,1,0,0,1,0,0,0,1,0,0,0];
  // var wet_area = [9.93,52.76,15.16,22.6,15.58,17.85,13.93,25.33,8.33,19.28,1.08,24.86,7.29,10.4,12.44,4.65,3.95,27.27,16.81,10.83,5.38,0.2,3.66,1.21,53.18,18.11,19.65,38.81,20.19,2.35,0.35,23.49,0.04,3.13,18.07,9.06,16.88,1.93,0.25,10.11,1.79,4.97,10.67,0.97,0.24,6.39,0.38,0.65,0.08,21.53,11.82,7.5,15.7,7.67,4.42,0.8,7.54,9.11,10.68,4.82,10.73,3.53,7.46,8.13,0.23,0.44,2.52,0.22,1.02,0.6,0,0.19,2.1,8.99,0.42,0.18,18.16,14.04,1.18,3.42,13.41,6.06,13.03,3.51,0.13,1.4,1.04,2.1,0.27,0.1,0.24,0.25,0.33,0.85,0.68,0.15,3.11,4.87,2.12,1.12,0.13,30.29,11.01,12.79,15.06,10.11,2.66,0.01];
  // var wet_fr = [0.407081662,0.326754982,0.655418021,0.431092121,0.530378902,0.27941144,0.052330514,0.338612429,0.301332822,0.345618574,0.182353289,0.338266086,0.273899192,0.20153536,0.224729685,0.434690622,0.162208531,0.370231571,0.373189143,0.290569726,0.300226122,0.073247831,0.099502322,0.224443202,0.404071929,0.532560196,0.349057269,2.778925809,7.57E-04,0.183427871,0.069005018,0.262017366,0.018400102,0.131484822,0.37817306,0.330734986,0.217806545,0.094428591,0.034151753,0.1583067,0.33241404,0.23904476,0.213782909,0.019177612,0.050983344,0.210286276,0.027609072,0.105915577,0.028590703,0.428097849,0.228456146,0.382954305,0.26510924,0.152997389,0.250836976,0.057088076,0.11092051,0.379552169,0.277128146,0.220637817,0.257976424,0.077206542,0.227438363,0.180740618,0.004961615,0.040536129,0.029353087,0.001470284,0.10070889,0.011782932,4.09E-04,0.00307335,0.103825444,0.002524193,0.004393169,0.048686605,0.34886623,0.284183791,0.156028342,0.311622389,0.313522435,0.134658917,0.136344375,0.24375574,0.004731548,0.096227183,0.099969294,0.029249691,0.010369053,4.00E-05,0.006634126,0.134101748,0.012645516,0.126330541,0.042649606,0.055356999,0.09215494,0.202321873,0.007930894,0.013900467,0.005826857,0.107649311,0.126616083,0.35463429,0.037355045,0.028838797,0.037261401,7.98E-04];

  // var data_with_cp = subbasin_json;

  var colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
  var backArray = [];
  var cropArray = [];
  var stripArray = [];
  var wetArray = [];
  var conserveArray = [];
  var grassArray = [];
  var filterArray = [];
  var coverArray = [];
  var number;
  var map;
  var basemap_1;
  var grass;
  var wetlands;
  var filter;
  var strip;
  var notill;
  var cover;
  var background;
  var crop;
  var filterColor;
  // var blueIcon = "http://wrestore.iupui.edu/model/images/green.png";
  // var starIcon = "http://wrestore.iupui.edu/model/images/gw.png";
  var tillIcon = "http://wrestore.iupui.edu/model/images/noTill.png";
  var wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands.png";
  var grassIcon = "http://wrestore.iupui.edu/model/images/grass.png";
  var wetlandsize;
  var filterAcre;
  // var size;
  // var obj;
  //var obj1;
  var lots = [];
  // This is firing off around 800 of tools.php	

  function initialize() {
      // ////// START Drawing MAIN MAP //////////////
      basemap_1 = new google.maps.Map(document.getElementById('map_canvas1'),{
          // center: new google.maps.LatLng(39.9778, -86.44),//E: center for "Eagle creek"
          center: new google.maps.LatLng(45.65, -123.1),//E: center for "Dairy-Mckay"
          zoom: 10.5,
          disableDefaultUI: true, //E:it disables all default icons from google map
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false, //E: It disables type of map option
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
          //     position: google.maps.ControlPosition.TOP_CENTER
          },
          zoomControl: false,
          zoomControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER
          },
          // streetViewControl: false,
          // streetViewControlOptions: { position: google.maps.ControlPosition.LEFT_TOP},
          fullscreenControl: true,
          fullscreenControl: {
              position: google.maps.ControlPosition.BOTTOM_RIGHT
          },
          scaleControl: false
      });
      // =============================  END Drawing MAIN MAP ========================  //

      // ==================== Start NEW Legend into the Main map ==================== //
      // E: This part sets up a custom button into the map to display the legend
      // These code-lines calls the js script located around 2620 in g2.php

      var buttonOptions = {
          gmap: basemap_1,
          name: 'Legend ',
          position: google.maps.ControlPosition.TOP_RIGHT,
          // action: function(){ //do something
          //     // map1.panTo(new google.maps.LatLng(-33.9, 151.2));
          //     jQuery('.feat_content').toggle('show');
          //     report('m-clk*** ' , 'Main-map Legend ');
          //     // jQuery(alert("button added.. "));
          //     // alert("button added.. ");
          // },
      };
      var button1 = new buttonControl(buttonOptions);

      //// This is a second button. By clicking on it you get a new position view of the map
      // var buttonOptions = {
      //     gmap: map1,
      //     name: 'Home',
      //     position: google.maps.ControlPosition.TOP_RIGHT,
      //     action: function(){map1.panTo(new google.maps.LatLng(-33.9, 151.2));}
      // };
      // var button1 = new buttonControl(buttonOptions);

      //  ---------------- end NEW Legend ----------------- //


      // =====================  Start: Add button for Fullscreen  ==================== //
      // E: These lines add new icon into map to replace the usual 'fullscreen' icon provided by google map
      $('#fullscreen').click(function() {
          $('#map_canvas1 div.gm-style button[title="Toggle fullscreen view"]').trigger('click');

          // Add fullscreen's events. When they are out (close fullscreen), they are captured and reported into the DB
          if (document.addEventListener) {
              document.addEventListener('webkitfullscreenchange', exitHandler, false);
              document.addEventListener('mozfullscreenchange', exitHandler, false);
              document.addEventListener('fullscreenchange', exitHandler, false);
              document.addEventListener('MSFullscreenChange', exitHandler, false);
          }
          // This function captures the close-fullscreen and reports into the DDBB
          function exitHandler() {
              if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                  report('m-clk*** ','close_fullscreen');
                  document.removeEventListener("webkitfullscreenchange", exitHandler);
                  document.removeEventListener('mozfullscreenchange', exitHandler);
                  document.removeEventListener('fullscreenchange', exitHandler);
                  document.removeEventListener('MSFullscreenChange', exitHandler);
              }
          }
      });

      // // --------------- Start Add NEW button into the main map (NOT IN USE FOR NOW)  ------------------  //
      // var BMP_buttonOptions = {
      //     gmap: map1,
      //     name: 'Legend+ ',
      //     // position: google.maps.ControlPosition.TOP_RIGHT,
      //     position: google.maps.ControlPosition.TOP_LEFT,
      //     action: function(){
      //         // map1.panTo(new google.maps.LatLng(-33.9, 151.2));
      //         // jQuery('.feat_content').toggle('show');
      //         alert("button added.. ");
      //     }
      // };
      // var BMP_buttons = new BMP_buttonControl(BMP_buttonOptions);

      // // ========================  End Add NEW button into the main map  ====================== //


      // =======================  Start: create the check box items for the MAIN map  =========================//
      //create the check box items (1),(2),(3),(4),(5),(6),(7)
      var frame = document.createElement('DIV');
      frame.className = 'BMP_checkboxes_frame';
      var container1 = document.createElement('DIV');
      container1.className = 'BMP_checkboxes_container1';
      container1.style.display = 'inline-flex';
      var container2 = document.createElement('DIV');
      container2.className = 'BMP_checkboxes_container2';
      container2.style.display = 'inline-flex';

      // ---  (1) Menu for "Crop Rotation (cr)"
      var cr_checkOptions = { //cr: "Crop Rotation"
          title: "On/Off Crop Rotation", //"This allows for multiple selection/toggling on/off",
          id1: "CropRot", // For container.id
          id2: "CropRotation", // For bDiv.id
          label: "Crop Rotation &nbsp", // "&nbsp;&nbsp;&nbsp;text"
          action: function(){
              report('m-clk*c ' , 'Crop Rotation click ');
              // alert('you clicked check Crop Rotation');
          }
      };
      var cr_checkbox = new checkBox_CropRotation(cr_checkOptions); //cr: "Crop Rotation"
      // ---  (1) End Menu for "Crop Rotation (cr)"

      // ---  (2) Menu for "Cover Crop (cc)"
      var cc_checkOptions = { //cc: "Cover Crop"
          title: "On/Off Cover Crop", //"This allows for multiple selection/toggling on/off",
          id1: "CoverCrop1",
          id2: "CoverCrop2",
          label: "Cover Crop &nbsp", // "&nbsp;&nbsp;&nbsp;text"
          action: function(){
              report('m-clk*c ' , 'Cover Crop click ');
              // alert('you clicked check Cover Crop');
          }
      };
      var cc_checkbox = new checkBox_CoverCrop(cc_checkOptions); //cc: "Cover Crop"
      // ---  (2) End Menu for "Cover Crop (cc)"

      // ---  (3) Menu for "Strip Cropping (sc)"
      var sc_checkOptions = { //sc: "Strip Cropping"
          title: "On/Off Strip Cropping",
          id1: "StripCropping1",
          id2: "StripCropping2",
          label: "Strip Cropping &nbsp", // "&nbsp;&nbsp;&nbsp;text"
          action: function(){
              report('m-clk*c ' , 'Strip Cropping click ');
              // alert('you clicked check Cover Crop');
          }
      };
      var sc_checkbox = new checkBox_StripCropping(sc_checkOptions); //sc: "Strip Cropping"
      // ---  (3) End Menu for "Strip Cropping (sc)"

      // ---  (4) Menu for "Filter Strip (fs)"
      var fs_checkOptions = { //fs: "filter strip"
          title: "On/Off Filter Strip", //"This allows for multiple selection/toggling on/off",
          id1: "FilterStr",
          id2: "Filter",
          label: "Filter Strips &nbsp", // "&nbsp;&nbsp;&nbsp;text"
          action: function(){
              report('m-clk*c ' , 'Filter Cropping click ');
              // alert('you clicked check 1');
          }
      };
      var fs_checkbox = new checkBox_FilterStrip(fs_checkOptions); //fs: "filter strip"
      // ---  (4) End Menu for "Filter Strip (fs)"

      // ---  (5) Menu for "Grass waterways (gw)"
      var gw_checkOptions = { //gw: "Grasswaterways"
          title: "On/Off Grass waterways", //"This allows for multiple selection/toggling on/off",
          id1: "Grasswaterways1",
          id2: "Grasswaterways2",
          label: "Grasswaterways &nbsp", // "&nbsp;&nbsp;&nbsp;text"
          action: function(){
              report('m-clk*c ' , 'Grass Waterways click ');
              // alert('you clicked check 1');
          }
      };
      var gw_checkbox = new checkBox_Grasswaterways(gw_checkOptions); //gw: "Grass waterways"
      // ---  (5) End Menu for "Grass waterways (gw)"

      // ---  (6) Menu for "No Tillage (nt)"
      var nt_checkOptions = { //nt: "No Tillage"
          title: "On/Off No Tillage", //"This allows for multiple selection/toggling on/off",
          id1: "NoTillage1",
          id2: "NoTillage2",
          label: "Conservation Tillage &nbsp", // "&nbsp;&nbsp;&nbsp;text"
          action: function(){
              report('m-clk*c ' , 'Conservation Tillage click ');
              // alert('you clicked check 1');
          }
      };
      var nt_checkbox = new checkBox_NoTillage(nt_checkOptions); //nt: "NoTillage"
      // ---  (6) End Menu for "No Tillage (nt)"

      // ---  (7) Menu for "Wetlands (wt)"
      var wt_checkOptions = { //wt: "Wetlands"
          title: "On/Off Wetlands", //"This allows for multiple selection/toggling on/off",
          id1: "Wetlands1",
          id2: "Wetlands2",
          label: "Wetlands &nbsp", // "&nbsp;&nbsp;&nbsp;text"
          action: function(){
              report('m-clk*c ' , 'Wetlands click ');
              // alert('you clicked check 1');
          }
      };
      var wt_checkbox = new checkBox_Wetlands(wt_checkOptions); //wt: "Wetlands"
      // ---  (7) End Menu for "Wetlands (wt)"

      container2.appendChild(cr_checkbox); //E: (1) Append "Crop Rotation"
      container2.appendChild(cc_checkbox); //E: (2) Append "Cover Crop"
      container2.appendChild(sc_checkbox); //E: (3) Append "Strip Cropping"
      container2.appendChild(fs_checkbox); //E: (4) Append "Filter Strip"
      container2.appendChild(gw_checkbox); //E: (5) Append "Grasswaterways"
      container2.appendChild(nt_checkbox); //E: (6) Append "No Tillage"
      container2.appendChild(wt_checkbox); //E: (7) Append "Wetlands"

      container1.appendChild(container2);
      frame.appendChild(container1);

      // map1.controls[google.maps.ControlPosition.TOP_RIGHT].push(frame); //E:Placing the "frame" div into te map
      basemap_1.controls[google.maps.ControlPosition.TOP_RIGHT].push(frame); //E:Placing the "frame" div into te map

      google.maps.event.addDomListener(frame,'click',function(){ //E: Add event "frame" to the map
      });

      // // ****************  Start a Second way to get check button in the main-map *************
      // // It calls the 'bmp1_ckbox_function' function at g2.php. Line: 2893
      // var box_bmp1 = document.createElement('DIV');
      // var box_bmp1_exit = new bmp1_ckbox_function(box_bmp1,map1);
      // map1.controls[google.maps.ControlPosition.TOP_CENTER].push(box_bmp1);
      // // ***********************  End Second way *****************

      // ============================  End create the check box items ========================= //


      // ===============  Start: Tracking when clicking outside of watershed  ===================== //
      // google.maps.event.addListener(map1, 'click', function goToTimeMap1() {
      google.maps.event.addListener(basemap_1, 'click', function goToTimeMap1() {
          // alert ("Suggestion " + (+oneMap + +1) + " - Outside watershed+"); // newalert
          report('m-clk+', 'Sug:' + (+oneMap + +1) + '  Outside-watershed',';'); // track the suggestion and outside
      });
      // ---------------------  End: Tracking when clicking outside of watershed  -------------------- //


      //  ==================  Start: Draw Conservation Practices (Main Part) ============================ //
      //E: Call 'Background' function to draw the base map (subbasins map)
      doBackground();

      //E: In Next lines, The conservation practice is checked if it is applied into the optimization. True =>
      // execute the corresponding function. Not => The function is not executed. Background doesnt neet it
      // because the background is the basemap.
      $.each(forMapArray, function(index, value) {
          if (forMapArray[index]["Title"] == "crop_rotation") {
              doCropRotation();
          }
      });

      $.each(forMapArray, function(index, value) {
          if (forMapArray[index]["Title"] == "cover_crops") {
              // alert("Cover crop value: \n"+ value);
              doCoverCrops();
          }
      });

      $.each(forMapArray, function(index, value) {
          if (forMapArray[index]["Title"] == "strip_cropping") {
              doStripCropping();
          }
      });

      $.each(forMapArray, function(index, value) {
          if (forMapArray[index]["Title"] == "filter_strips") {
              doFilterStrips();
          }
      });

      $.each(forMapArray, function(index, value) {
          if (forMapArray[index]["Title"] == "grassed_waterway") {
              doGrassWaterway();
          }
      });

      $.each(forMapArray, function(index, value) {
          if (forMapArray[index]["Title"] == "conservation_tillage") {
              doConserveTillage();
          }
      });

      $.each(forMapArray, function(index, value) {
          if (forMapArray[index]["Title"] == "variable_area_wetlands") {
              //alert("IN");
              dobinaryWetlands();
          }
      });


      // Next lines shows FUNCTIONS for drawing POLYGONS (sub-basins) and LINES & MARKERS (filterStrip, Wets, etc.)
      //  (0) Base Map (Backgournd) (bk)
      //  (1) Crop-rotation         (cr)
      //  (2) Cover-crops           (cc)
      //  (3) Strip-Cropping        (sc)
      //  (4) Filter-strip          (fs)
      //  (5) Grass waterways       (gw)
      //  (6) No-Till (Till conservation)(nt)
      //  (7) Wetlands              (wt)

      // ========================= (0)  Begin BACKGROUND ========================== //
      // ///Lay background map
      function doBackground() {
          console.log ("L.385: "+ subbasin_json.features.length);
          for (var i = 0; i < subbasin_json.features.length; i++) {//EE 'subbasin_json.features.length' = 130 (# of subbasins)
              var newCoordinates = [];
              var whichNode = "";

              var detector = "background";
              // if (i==12) console.log("L.392 geometry "+i+":"+ "\n"+JSON.stringify(subbasin_json.features[i].geometry));
              var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);//EE: Function is Set at 1069
                  //answersArray[oneMap].RATING
                  // var row = rows[i];//EE: not needed when json data
                  // var whichNode = row[0];

              //EE:It is converted to string to be in the 'find' function (see some lines below)
              // var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E: For "ecw"
              var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"
              // if (i==12) console.log("L.402 which subbasin Background: " + whichNode);//E: 'whichNode' tells
              // which sub-basin
                  /////////You will put your acreage here///////////
                  // var acres = parseFloat(row[2]).toFixed(1);
              var acres = subbasin_json.properties[i]["area_ac"];//EE:
              var acres = Math.round(acres * 100) / 100;
                  // var rivers = parseFloat(row[3]).toFixed(1);
              // var rivers = subbasin_json.properties[i]["strlgth_mi"];//EE:
              var rivers = subbasin_json.properties[i]["stream_mi"];//EE:
              var rivers = Math.round(rivers * 1000) / 1000;
              // if (i==12) console.log ("L.413 river: " + rivers);//E:
              // sub-basin

              var background = new google.maps.Polygon({//E: Watershed (background) features
                  path: newCoordinates,
                  //strokeColor: colors[0],
                  strokeOpacity: .6,
                  strokeWeight: 1,
                  fillOpacity: 0,
                  fillColor: "#ffffff",
                  clickable: true,
                  indexID: whichNode
              });

                  // background.setMap(map1);//E: IT SETS THE POLYGONS over the BASEMAP
              background.setMap(basemap_1);//E: IT SETS THE POLYGONS over the BASEMAP
              console.log("L.445 Sub-Basin Background (subBasinArray): \n" + JSON.stringify(subBasinArray));

                  //SubBasin="WhichNode", "SubBasinArray" involves DATA from Optimization, from DDBB (Mysql)
              var sb_match = find(subBasinArray, 'subbasinID', whichNode);
              // if (i<5) alert("obj: \n"+ JSON.stringify(obj, null, 4));

              if (sb_match) {//E: 'sb_match' before was 'obj'
                  var listAll = "Sub-basin Area: " + acres + " acres | Stream Length+: " + rivers + " miles <br" +
                      " />" + JSON.stringify(sb_match);//E: 'sb_match' before was 'obj'
                  //alert ("List(before): "+listAll);//alert ('type_of listAll (before): '+typeof 'listAll');//
                  listAll = listAll.replace(/"0.0"/g, "No");
                  listAll = listAll.replace(/"1.0"/g, "Yes");
                  listAll = listAll.replace(/,/g, "<br />");
                  listAll = listAll.replace(/"/g, "");
                  listAll = listAll.replace(/}/g, "");
                  listAll = listAll.replace(/{/g, "");
                  listAll = listAll.replace(/_/g, " ");
                  listAll = listAll.replace(/variable area wetlands/g, "wetlands area+");
                  listAll = listAll.replace(/:/g, ": ");
                  listAll = listAll.replace(/variable wetfr wetlands/g, "wetlands drainage");
                  listAll = listAll.replace(/wetlands area/g, "Wetlands area");
                  listAll = listAll.replace(/filter strips/g, "Filter strip width in feet+");
                  listAll = listAll.replace(/wetlands drainage/g, "Wetlands drainage area fraction+");
                  // alert(parseFloat(listAll.match(/[\d\.]+/)));//E: Extract only the first number of the string
                  listAll = listAll.replace(/subbasinID/g, "Sub-basin ID+");
                  listAll = listAll.replace(sb_match.variable_area_wetlands, sb_match.variable_area_wetlands + " acres ");//E: 'sb_match' before was 'obj'
                  // if (i<5) alert ("listAll: \n"+ listAll);//// alert ('type_of listAll (after): ' + typeof 'listAll');

                  //These two lines get the last value of 'listAll' which is the 'variable_wetfr_wetlands'
                  var listAll_array = listAll.split(" ");//E: It get 'listAll" as array
                  // alert(listAll_array.length);//alert(listAll_array.slice(-1)[0]);// alert(typeof
                  var list_length = listAll_array.length;//E: It gets the length of "listAll_array"
                  var wfr = Number(listAll_array.slice(-1)[0]);//E: It gets the last item of "listAll_array"
                  var wfr_r = Math.round(wfr * 1000) / 1000;//E: Round the last item of "listAll_array"
                  // if (i<5) alert(wfr + ' and ' + typeof wfr +" - wfr rounded: "+ wfr_r + " and "+typeof wfr_r);
                  listAll_array[list_length - 1] = wfr_r;//E: Replace the last item of"listAll_array" by rounded value
                  //THESE LINES GET BACK from ARRAY to STRING
                  var newlist = JSON.stringify(listAll_array);
                  newlist = newlist.replace(/"/g, "");
                  newlist = newlist.replace(/,/g, " ");
                  newlist = newlist.replace(/[\[\]']+/g, '');//E: replace '[]' symbols by '' (nothing)
                  listAll = newlist;
                  // if (i<5) alert ("List(After): \n "+newlist);//alert('type_of new_listAll(after): ' + typeof" +" 'newlist');//alert
                  // (newlist);
                  if (i == 0) alert('done');
              }
              else {
                  var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + "Sub-basin ID: " + whichNode;
              }

              var obj = {
                  'list': listAll
              };

              background.objInfo = obj;
                  // alert(JSON.stringify(obj, null, 4));//E: it gives all sub-basin with its Conservations features
                  // alert("backgound: "+ background);//E: It gives "[object Object]" 130 times

              google.maps.event.addListener(background, 'click', function(event) {
                  console.log("L517: in background");

                  $('.displayStuff').html(this.objInfo.list);
                      // alert("objInfo: " +"\n"+ this.objInfo.list);
                  var window_info = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean">' +
                      '<a target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean">' +
                      '<strong><em name="What Do They Mean">What do these numbers* mean?</em></strong></a></div>';

                  infowindow2 = new google.maps.InfoWindow({//E: it makes a window with information
                      content: window_info,
                      position: event.latLng
                  });
                  infowindow2.open(basemap_1);//E: The window with information is added to the basemap.
                      // alert ("Suggestion: " + this.indexID); // newalert
                  report('m-clk+', 'Sug:' + (+oneMap + +1) + '  Sub-basin:' + this.indexID + ';'); // trackable
              });

              backArray.push(background);
                  // alert(backArray.length);//E: is starts at 1 ends at 130
          }
              //map.fitBounds(bounds);
      };
      // ===================================  End BACKGROUND =============================//


      // ===================================== (1)  Begin Crop Rotation ========================================== //

      function doCropRotation() {
          var obj = find(forMapArray, 'Title', 'crop_rotation');//E: obj gets subbasins-with-CR
          if (obj) {
              // console.log("L.526 do CropRotation: "+ JSON.stringify(obj)+ " \n obj.subs= "+ obj.subs);
              var listofSubs = obj.subs;//E: get only IDs of subbasins with 'crop rotation'
              var strLen = listofSubs.length;
              // var listofSubs = listofSubs.slice(0, strLen - 1);//E: List of subbasin's IDs
              var listofSubs = JSON.parse("["+ listofSubs.slice(0, strLen - 1) +"]");//E: List of subbasin's IDs
              //E: above, JSON.parse convert a string into an array of number
              console.log("L.524 listofSubs (Crop-Rotation): "+ listofSubs);
          }

          var cr_yes = 0;
          var cr_no = 0;
          // for (var i in rows) {
          for (var i =0; i< subbasin_json.features.length; i++) {
              if (listofSubs.includes(subbasin_json.properties[i]["Subbasin"])) {
                  var newCoordinates = [];
                  var whichNode = "";
                  var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);
                  var whichNode = subbasin_json.properties[i]["Subbasin"].toString();

              /////////You will put your acreage here///////////
                  var acres = subbasin_json.properties[i]["area_ac"];
                  var acres = Math.round(acres * 100) / 100;
                  // var rivers = subbasin_json.properties[i]["strlgth_mi"];
                  var rivers = subbasin_json.properties[i]["stream_mi"];
                  var rivers = Math.round(rivers * 1000) / 1000;
              /////////You will put your stream miles here/////////

                  crop = new google.maps.Polygon({
                      path: newCoordinates,
                      //strokeColor: colors[0],
                      strokeOpacity: .4,
                      strokeWeight: 1,
                      fillOpacity: 1,
                      fillColor: "#8da1bf",
                      indexID: whichNode
                  });
                  crop.setMap(basemap_1);

              // console.log("Sub-Basin CropRot: \n" + JSON.stringify(subBasinArray));//EE: it gives values for each 108 sb
                  var sb_croprot_match = find(subBasinArray, 'subbasinID', whichNode);

              // if (obj) {
                  if (sb_croprot_match) {
                      var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + JSON.stringify(sb_croprot_match);//E: 'sb_crop_match' before was 'obj'
                      listAll = listAll.replace(/"0.0"/g, "No");
                      listAll = listAll.replace(/"1.0"/g, "Yes");
                      listAll = listAll.replace(/,/g, "<br />");
                      listAll = listAll.replace(/"/g, "");
                      listAll = listAll.replace(/}/g, "");
                      listAll = listAll.replace(/{/g, "");
                      listAll = listAll.replace(/_/g, " ");
                      listAll = listAll.replace(/variable area wetlands/g, "wetlands area");
                      listAll = listAll.replace(/:/g, ": ");
                      listAll = listAll.replace(/variable wetfr wetlands/g, "wetlands drainage");
                      listAll = listAll.replace(/wetlands area/g, "Wetlands area");
                      listAll = listAll.replace(/filter strips/g, "Filter strip width in feet");
                      listAll = listAll.replace(/wetlands drainage/g, "Wetlands drainage area fraction");
                      listAll = listAll.replace(/subbasinID/g, "Sub-basin ID");
                      listAll = listAll.replace(sb_croprot_match.variable_area_wetlands, sb_croprot_match.variable_area_wetlands + " acres");//E: 'sb_croprot_match' before was 'obj'
                  //alert (listAll);
                  } else {
                      var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + "Sub-basin ID: " + whichNode;
                  }

                  var obj = {
                      'list': listAll
                  };
                  crop.objInfo = obj;
                  google.maps.event.addListener(crop, 'click', function (event) {
                  //console.log(this.objInfo);
                      $('.displayStuff').html(this.objInfo.list);
                      var window_info = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean"><a' +
                          ' target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean">' +
                          '<strong><em name="What Do They Mean">What do these numbers** mean?</em></strong></a></div>';
                      infowindow2 = new google.maps.InfoWindow({
                          content: window_info,
                          position: event.latLng
                      });
                      infowindow2.open(basemap_1);
                  // alert (this.indexID); // newalert
                      report('m-clk+', 'Sug:' + (+oneMap + +1) + '  Sub-basin:' + this.indexID + ';'); // trackable
                  });
                  cropArray.push(crop);
                  cr_yes = cr_yes + 1;
              }
              else {
                  cr_no = cr_no + 1;
                  // console.log("L.656 subbasin "+ subbasin_json.properties[i]["Subbasin"]+ " does not include CR")
              }
          }
          //map.fitBounds(bounds);
          console.log("L.641 YES crop rotation: "+ cr_yes + "  NO crop rotation: "+cr_no)
      };
      // ------------  end 'drawCrop1'

      ////////////////////////////////End Crop Rotation totally ////////////////////////



      // ================================= (2) Begin COVER CROPS  ============================== //

      function doCoverCrops() {
          var obj = find(forMapArray, 'Title', 'cover_crops');//E: obj gets subbasins-with-CC
          if (obj) {
              var listofSubs = obj.subs;
              var strLen = listofSubs.length;
              // var listofSubs = listofSubs.slice(0, strLen - 1);
              var listofSubs = JSON.parse("[" + listofSubs.slice(0, strLen - 1) + "]");
              //E: above, JSON.parse convert a string into an array of number
              // console.log("L.682 listofSubs (cover_crops): "+ listofSubs);
          }

      //     // Inicio SE VA
      //     // Initialize JSONP request
      //     var script = document.createElement('script');
      //     var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
      //     url.push('sql=');
      //     //Streams
      //     var query = 'SELECT GRIDCODE, geometry, Area_Acres,Length_mil FROM ' +
      //         '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA Where GRIDCODE in (' + listofSubs + ')';
      //     var encodedQuery = encodeURIComponent(query);
      //     url.push(encodedQuery);
      //     url.push('&callback=drawCover1');//E:Here, the function 'drawCover1' is called.  <===
      //     url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
      //     script.src = url.join('');
      //     var body = document.getElementsByTagName('body')[0];
      //     body.appendChild(script);
      // }
      // // ------------  end 'docover1'
      //
      // // ------------  start 'drawCover1'
      //
      // drawCover1 = function(data) {
      //     //function drawWet1(data) {
      //     //alert("ON");
      //     var rows = data['rows'];
      //     //var whichNode=100;
      //     // Fin SE VA  COVER CROP

          var cc_yes = 0;
          var cc_no = 0;
          // for (var i in rows) {
          for (var i =0; i< subbasin_json.features.length; i++) {
              if (listofSubs.includes(subbasin_json.properties[i]["Subbasin"])) {
                  var newCoordinates = [];
                  var whichNode = "";

                  //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
                  // var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
                  var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);
                  // var row = rows[i];//EE: not needed when json data
                  // var whichNode = row[0];
                  var whichNode = subbasin_json.properties[i]["Subbasin"].toString();
                  /////////You will put your acreage here///////////
                  // var acres = parseFloat(row[2]).toFixed(1);
                  // var rivers = parseFloat(row[3]).toFixed(1);
                  var acres = subbasin_json.properties[i]["area_ac"];
                  var acres = Math.round(acres * 100) / 100;
                  // var rivers = subbasin_json.properties[i]["strlgth_mi"];
                  var rivers = subbasin_json.properties[i]["stream_mi"];
                  var rivers = Math.round(rivers * 1000) / 1000;
                  /////////You will put your stream miles here/////////

                  cover = new google.maps.Polygon({
                      path: newCoordinates,
                      //strokeColor: colors[0],
                      strokeOpacity: .4,
                      strokeWeight: 1,
                      fillOpacity: 1,
                      fillColor: "#99c9ba",
                      indexID: whichNode
                  });
                  cover.setMap(basemap_1);

                  var sb_covcrop_match = find(subBasinArray, 'subbasinID', whichNode);
                  if (sb_covcrop_match) {
                      var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + JSON.stringify(sb_covcrop_match);//E: 'sb_covcrop_match' before was 'obj'
                      listAll = listAll.replace(/"0.0"/g, "No");
                      listAll = listAll.replace(/"1.0"/g, "Yes");
                      listAll = listAll.replace(/,/g, "<br />");
                      listAll = listAll.replace(/"/g, "");
                      listAll = listAll.replace(/}/g, "");
                      listAll = listAll.replace(/{/g, "");
                      listAll = listAll.replace(/_/g, " ");
                      listAll = listAll.replace(/variable area wetlands/g, "wetlands area");
                      listAll = listAll.replace(/:/g, ": ");
                      listAll = listAll.replace(/variable wetfr wetlands/g, "wetlands drainage");
                      listAll = listAll.replace(/wetlands area/g, "Wetlands area");
                      listAll = listAll.replace(/filter strips/g, "Filter strip width in feet");
                      listAll = listAll.replace(/wetlands drainage/g, "Wetlands drainage area fraction");
                      listAll = listAll.replace(/subbasinID/g, "Sub-basin ID");
                      listAll = listAll.replace(sb_covcrop_match.variable_area_wetlands, sb_covcrop_match.variable_area_wetlands + " acres");//E: 'sb_covcrop_match' before was 'obj'
                      //alert (listAll);
                  } else {
                      var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + "Sub-basin ID: " + whichNode;
                  }

                  var obj = {
                      'list': listAll
                  };
                  cover.objInfo = obj;
                  google.maps.event.addListener(cover, 'click', function (event) {
                      //console.log(this.objInfo);
                      $('.displayStuff').html(this.objInfo.list);
                      var window_info = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean"><a' +
                          ' target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean">' +
                          '<strong><em name="What Do They Mean">What do these numbers*** mean?</em></strong></a></div>';
                      infowindow2 = new google.maps.InfoWindow({
                          content: window_info,
                          position: event.latLng
                      });
                      infowindow2.open(basemap_1);
                      // alert (this.indexID); // newalert
                      report('m-clk+', 'Sug:' + (+oneMap + +1) + '  Sub-basin:' + this.indexID + ';'); // trackable

                  });
                  coverArray.push(cover);
                  cc_yes = cc_yes + 1;
              }
              else {
                  cc_no = cc_no + 1;
                  // console.log("L.656 subbasin "+ subbasin_json.properties[i]["Subbasin"]+ " does not include CR")
                  }
          }//E: end for
          //map.fitBounds(bounds);
          console.log("L.773 YES cover crop: "+ cc_yes + "  NO cover crop: "+cc_no)
      };
      // ------------  end 'drawCover1'

      //////////////////////////  End COVER CROPS totally ////////////////////////


      // ========================= (3) Begin STRIP CROPPING ===================== //

      function doStripCropping() {
          var obj = find(forMapArray, 'Title', 'strip_cropping');
          if (obj) {
              var listofSubs = obj.subs;
              var strLen = listofSubs.length;
              // var listofSubs = listofSubs.slice(0, strLen - 1);
              var listofSubs = JSON.parse("[" +listofSubs.slice(0, strLen - 1)+ "]");
              //E: above, JSON.parse convert a string into an array of number
              console.log("L.790 listofSubs (strip_cropping): "+ listofSubs);
          }

      //     // Inicio SE VA
      //     // Initialize JSONP request
      //     var script = document.createElement('script');
      //     var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
      //     url.push('sql=');
      //     //Streams
      //     var query = 'SELECT GRIDCODE, geometry, Area_Acres,Length_mil FROM ' +
      //         '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA Where GRIDCODE in (' + listofSubs + ')';
      //     var encodedQuery = encodeURIComponent(query);
      //     url.push(encodedQuery);
      //     url.push('&callback=drawStrip1');//E:Here, the function 'drawStrip1' is called.  <===
      //     url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
      //     script.src = url.join('');
      //     // alert("script.src: " + url);
      //     var body = document.getElementsByTagName('body')[0];
      //     body.appendChild(script);
      // }
      // // ----------------  end 'dostrip1()'
      //
      // // ----------------  start 'drawStrip1' --------------------- /GREEN/
      // drawStrip1 = function(data) {
      //     //function drawWet1(data) {
      //     var rows = data['rows'];
      //     //var whichNode=100;
      //     //Fin SE VA STRIP CROP

          var sc_yes = 0;
          var sc_no = 0;
          // for (var i in rows) {
          for (var i =0; i< subbasin_json.features.length; i++) {
              if (listofSubs.includes(subbasin_json.properties[i]["Subbasin"])) {
                  var newCoordinates = [];
                  var whichNode = "";

                  // var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
                  var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);
                  //answersArray[oneMap].RATING
                  // var row = rows[i];//EE: not needed when json data
                  // var whichNode = row[0];
                  var whichNode = subbasin_json.properties[i]["Subbasin"].toString();
                  /////////You will put your acreage here///////////
                  // var acres = parseFloat(row[2]).toFixed(1);
                  // var rivers = parseFloat(row[3]).toFixed(1);
                  var acres = subbasin_json.properties[i]["area_ac"];
                  var acres = Math.round(acres * 100) / 100;
                  // var rivers = subbasin_json.properties[i]["strlgth_mi"];
                  var rivers = subbasin_json.properties[i]["stream_mi"];
                  var rivers = Math.round(rivers * 1000) / 1000;
                  /////////You will put your stream miles here/////////

                  strip = new google.maps.Polygon({
                      path: newCoordinates,
                      //strokeColor: colors[0],
                      strokeOpacity: .4,
                      strokeWeight: 1,
                      fillOpacity: 1,
                      fillColor: "#87b07e",
                      indexID: whichNode
                  });
                  // strip.setMap(map1);
                  strip.setMap(basemap_1);

                  // var obj = find(subBasinArray, 'subbasinID', whichNode);
                  var sb_stripcrop_match = find(subBasinArray, 'subbasinID', whichNode);
                  var jonArray = [];
                  // if (obj) {
                  if (sb_stripcrop_match) {
                      var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + JSON.stringify(sb_stripcrop_match);//E: 'sb_stripcrop_match' before was 'obj'
                      listAll = listAll.replace(/"0.0"/g, "No");
                      listAll = listAll.replace(/"1.0"/g, "Yes");
                      listAll = listAll.replace(/,/g, "<br />");
                      listAll = listAll.replace(/"/g, "");
                      listAll = listAll.replace(/}/g, "");
                      listAll = listAll.replace(/{/g, "");
                      listAll = listAll.replace(/_/g, " ");
                      listAll = listAll.replace(/variable area wetlands/g, "wetlands area");
                      listAll = listAll.replace(/:/g, ": ");
                      listAll = listAll.replace(/variable wetfr wetlands/g, "wetlands drainage");
                      listAll = listAll.replace(/wetlands area/g, "Wetlands area");
                      listAll = listAll.replace(/filter strips/g, "Filter strip width in feet");
                      listAll = listAll.replace(/wetlands drainage/g, "Wetlands drainage area fraction");
                      listAll = listAll.replace(/subbasinID/g, "Sub-basin ID");
                      listAll = listAll.replace(sb_stripcrop_match.variable_area_wetlands, sb_stripcrop_match.variable_area_wetlands + " acres");//E: 'sb_stripcrop_match' before was 'obj'
                      //alert (listAll);
                  } else {
                      var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + "Sub-basin ID: " + whichNode;
                  }

                  var obj = {
                      'list': listAll
                  };
                  strip.objInfo = obj;
                  google.maps.event.addListener(strip, 'click', function (event) {
                      //console.log(this.objInfo);
                      $('.displayStuff').html(this.objInfo.list);
                      var window_info = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean"><a' +
                          ' target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean">' +
                          '<strong><em name="What Do They Mean">What do these numbers**** mean?</em></strong></a></div>';
                      infowindow2 = new google.maps.InfoWindow({
                          content: window_info,
                          position: event.latLng

                      });
                      infowindow2.open(basemap_1);
                      report('m-clk+', 'Sug:' + (+oneMap + +1) + '  Sub-basin:' + this.indexID + ';'); // trackable

                  });
                  stripArray.push(strip);
                  sc_yes = sc_yes + 1;
              }
              else {
                  sc_no = sc_no + 1;
              }
          }
          //map.fitBounds(bounds);
          console.log("L.906 YES strip cropping: "+ sc_yes + "  NO strip cropping: "+sc_no);
      };
      // ---------------  end 'drawStrip1'

      ///////////////////////// End STRIP CROPPING totally ////////////////////////////////


      // ======================== (4) Begin FILTER STRIP///THIS NEEDS TO BE THE POLYLINES  ===================== //

      function doFilterStrips() {
          var obj = find(forMapArray, 'Title', 'filter_strips');
          if (obj) {
              var listofSubs = obj.subs;
              var strLen = listofSubs.length;
              var listofSubs = listofSubs.slice(0, strLen - 1);
              var listofSubs_num = JSON.parse("[" +listofSubs.slice(0, strLen - 1)+ "]");
              // var listofSubs = JSON.parse("[" +listofSubs.slice(0, strLen - 1)+ "]");
              //E: above, JSON.parse convert a string into an array of number
              // console.log("L.924 listofSubs (filter_strips): "+ listofSubs);
          }

          //EE: This loop changes the 'geometry.type' name from "LineString" to "Polyline" in json data generated by
          // the python program, to be executed by google chart (otherwise it does not draw lines)
          var streams_for_fs = stream_json;//EE: make a copy of the json-data coming from "/data/stream_g.js"
          for (var i = 0; i< stream_json.features.length; i++) {
              streams_for_fs.features[i].geometry.type = "Polyline";
              // if (i < 5) console.log("L.980 - " + JSON.stringify(streams_for_fs.features[i]));//EE: to see the first coordinates
          }

      //     //inicio SE VA
      //     // Initialize JSONP request
      //     var script = document.createElement('script');
      //     var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
      //     url.push('sql=');
      //     //Streams
      //     var query = 'SELECT GRID_CODE, geometry FROM ' +
      //         '15rPfCYXIoquDLpunT66cvEz2yaqw7R6BRKptqBQ Where GRID_CODE in (' + listofSubs + ')';
      //     var encodedQuery = encodeURIComponent(query);
      //     url.push(encodedQuery);
      //     url.push('&callback=drawFilter1'); //E:Here, the function 'drawFilter1' is called.  <===
      //     url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
      //     script.src = url.join('');
      //     var body = document.getElementsByTagName('body')[0];
      //     body.appendChild(script);
      // }
      // // -----------  end 'dofilter1'
      //
      // // -----------  start 'drawfilter1'
      //
      // drawFilter1 = function(data) {
      //     var rows = data['rows'];
      //     // // END SE VA

          var fs_yes = 0;
          var fs_no = 0;
          // for (var i in rows) {
          for (var i =0; i< streams_for_fs.features.length; i++) {
              if (listofSubs.includes(streams_for_fs.properties[i]["Subbasin"])) {
                  var newCoordinates = [];
                  var whichNode = "";
                  // var row = rows[i];//EE: not needed when json data
                  // var whichNode  =row[0];
                  var whichNode = stream_json.properties[i]["Subbasin"].toString();

                  var sb_filter_match = find(subBasinArray, 'subbasinID', whichNode);
                  if (sb_filter_match) {
                      filterAcre = sb_filter_match.filter_strips;

                      switch (true) {
                          case (filterAcre == 0):
                              filterColor = "";
                              break;

                          case ((filterAcre > 0) && (filterAcre < 3)):
                              filterColor = "#e927c2";
                              break;

                          case ((filterAcre >= 3) && (filterAcre < 6)):
                              filterColor = "#bf8811";
                              break;

                          case ((filterAcre >= 6) && (filterAcre < 10)):
                              filterColor = "#7da569";
                              break;

                          case ((filterAcre >= 10) && (filterAcre < 13)):
                              filterColor = "#602288";
                              break;

                          case (filterAcre >= 13):
                              filterColor = "#b10c0c";
                              break;
                          default:
                              filterColor = "";
                              break;
                      }
                  }

                  // if (i < 10) console.log("L.1039 - " + whichNode + ": \n" + JSON.stringify(streams_for_fs.features[i].geometry));
                  // var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
                  var newCoordinates = constructNewCoordinates(streams_for_fs.features[i].geometry);

                  filter = new google.maps.Polyline({
                      path: newCoordinates,
                      strokeColor: filterColor,
                      strokeOpacity: 1,
                      strokeWeight: 2,
                      fillColor: "#daca43"
                  });

                  filter.setMap(basemap_1);
                  filterArray.push(filter);
                  fs_yes = fs_yes + 1;
              }//E: end if
          }
          //map.fitBounds(bounds);
          console.log("L.1022 YES Filter strip: "+ fs_yes + "  NO Filter strip: "+fs_no);
      };

      // ======================= End 'FILTER STRIP' totally ===================== //


      ///////////////This is used to parse out the long lats for all the polygons////////////////////////

      function constructNewCoordinates(polygon) {
          var newCoordinates = [];
          var coordinates = null;
          if (polygon['coordinates'])
              coordinates = polygon['coordinates'];
          if (coordinates.length == 1) {
              coordinates = coordinates[0];
              // alert("length = 1");
          }
          // alert(coordinates);
          for (var i in coordinates) {
              newCoordinates.push(
                  new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
              //bounds.extend(newCoordinates[i]);
          }
          return newCoordinates;
      }
      ////////// ----- end 'constructNewCoordinates(polygon)'  /////////


      // ===================== (5)  Begin GRASS-WATERWAYS Markers  ====================== //

      function doGrassWaterway() {
          var obj = find(forMapArray, 'Title', 'grassed_waterway');
          if (obj) {
              var listofSubs = obj.subs;
              var strLen = listofSubs.length;
              // var listofSubs = listofSubs.slice(0, strLen - 1);
              var listofSubs = JSON.parse("[" +listofSubs.slice(0, strLen - 1)+ "]");
              //E: above, JSON.parse convert a string into an array of number
              // console.log("L.1109 listofSubs (grassed_waterway): "+ listofSubs);
          }

      //     // Inicio SE VA
      //     // Initialize JSONP request
      //     var script = document.createElement('script');
      //     var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
      //     url.push('sql=');
      //     //Streams
      //     var query = 'SELECT GRIDCODE, geometry FROM ' +
      //         '1iRLpYHfW4L9ncVMvhL5HD5Pwcuu63MVmRBWtn7Y Where GRIDCODE in (' + listofSubs + ')';
      //     // var query = 'SELECT GRIDCODE, geometry FROM 1iRLpYHfW4L9ncVMvhL5HD5Pwcuu63MVmRBWtn7Y';
      //     var encodedQuery = encodeURIComponent(query);
      //     url.push(encodedQuery);
      //     url.push('&callback=drawGrass1');
      //     url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
      //     script.src = url.join('');
      //     var body = document.getElementsByTagName('body')[0];
      //     body.appendChild(script);
      // }
      // // -------------------------------- end 'dograss1()'
      //
      // // ---------------------------------- start 'drawGrass1'
      // drawGrass1 = function(data) {
      //     var rows = data['rows'];
      //     //var whichNode=100;
      //     // Fin SE VA GRASS

          var gw_yes = 0;
          var gw_no = 0;
          // for (var i in rows) {
          for (var i =0; i< subbasin_json.features.length; i++) {
              if (listofSubs.includes(subbasin_json.properties[i]["Subbasin"])) {
                  var newCoordinates = [];
                  var whichNode = "";

                  // console.log("L.1146  sb: "+rows[i]+": \n"+ JSON.stringify(rows[i][1]['geometry']));
              // if (i<5) console.log("i = "+i+" ; subbasin: "+subbasin_json.properties[i]["Subbasin"]+" cont:"+ JSON.stringify(polygon));
              //     var newCoordinates = constructNewCoordinatesGrass(rows[i][1]['geometry']);
                  var x_grass = parseFloat(subbasin_json.properties[i].grass_x);
                  var y_grass = parseFloat(subbasin_json.properties[i].grass_y);
              // console.log("L.1158 coord grass: "+ x_grass+ " , "+ y_grass);
                  var newCoordinates = constructNewCoordinatesGrass(x_grass,y_grass);
                  // var row = rows[i];//EE: not needed when json data
                  // var whichNode = row[0];
                  var whichNode = subbasin_json.properties[i]["Subbasin"].toString();

                  grass = geo;
                  grass.setMap(basemap_1);
                  grassArray.push(grass);
                  gw_yes = gw_yes + 1;
              }
              else {
                  gw_no = gw_no + 1;
                  // console.log("L.656 subbasin "+ subbasin_json.properties[i]["Subbasin"]+ " does not include CR")
              }
          }
          //map.fitBounds(bounds);
          console.log("L.1118 YES grasswaterways: "+ gw_yes + "  NO grasswaterways: "+gw_no);
      };

      // ------- Construction of coordinates for GRASSWATERWAYS
      // function constructNewCoordinatesGrass(polygon) {
      function constructNewCoordinatesGrass(x,y) {
          // if (i<5) console.log("i =  "+i+": "+ polygon);
          // console.log("i = "+i+" ; subbasin: "+subbasin_json.properties[i]["Subbasin"]+" cont:"+ JSON.stringify(polygon));
          var geoOptions = {
              strokeColor: colors[0],
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: colors[0],
              fillOpacity: 0.3,
              icon: grassIcon
          };
          var opts = geoOptions;
          var newCoordinates = [];
          var coordinates = null;
          // if (polygon['coordinates']) {
          //     var coordinates = polygon['coordinates'];
          var coordinates = [x,y];
              var options = opts || {};
          options.position = new google.maps.LatLng(coordinates[1], coordinates[0]);
              geo = new google.maps.Marker(options);
              return geo;
          // }
      }
      // ------ end 'constructNewCoordinatesGrass(polygon)'

      // ======================= END GW (GRASS-WATERWAYS) totally ==================== //



      // =================================  (6) Begin No-Till Markers ================================= //

      function doConserveTillage() {
          var obj = find(forMapArray, 'Title', 'conservation_tillage');
          if (obj) {
              var listofSubs = obj.subs;
              var strLen = listofSubs.length;
              var listofSubs = listofSubs.slice(0, strLen - 1);
              var listofSubs_num = JSON.parse("[" +listofSubs.slice(0, strLen - 1)+ "]");
              //E: above, JSON.parse convert a string into an array of number
              // console.log("L.1231 listofSubs (conservation_tillage): "+ listofSubs);
          }

          //Query to create a new JSON of No-Till just with basins with this cons.practice
          var sb_with_nt_only = {};
          sb_with_nt_only.properties = new Array();
          for (var i = 0; i< subbasin_json.features.length; i++) {
              if (listofSubs_num.includes(subbasin_json.properties[i]["Subbasin"])) {
                  sb_with_nt_only.properties.push({
                      "subbasin" : subbasin_json.properties[i]["Subbasin"],
                      "coord_x"  : JSON.parse(subbasin_json.properties[i]["grass_x"]),
                      "coord_y"  : JSON.parse(subbasin_json.properties[i]["grass_y"])
                  });
              }
          }
      //     // console.log("sb_with_nt_only: "+ JSON.stringify(sb_with_nt_only.properties));
      //     console.log(sb_with_nt_only.properties.length);


      // //     //  Inicio  SE VA
      //     var script = document.createElement('script');
      //     var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
      //     url.push('sql=');
      //     var query = 'SELECT GRIDCODE, geometry FROM ' +
      //         '1iRLpYHfW4L9ncVMvhL5HD5Pwcuu63MVmRBWtn7Y Where GRIDCODE in (' + listofSubs + ')';
      //     var encodedQuery = encodeURIComponent(query);
      //     url.push(encodedQuery);
      //     url.push('&callback=drawTill1');
      //     url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
      //     script.src = url.join('');
      //     var body = document.getElementsByTagName('body')[0];
      //     body.appendChild(script);
      // }
      // // // ------- end 'dotill1()'
      // //
      // // //   ------- start 'drawTill1'
      // drawTill1 = function(data) {
      //     var rows = data['rows'];
      // //     //End SE VA  NO-TILLAGE

          var nt_yes = 0;
          var nt_no = 0;
          // for (var i in rows) {
          for (var i =0; i< sb_with_nt_only.properties.length; i++) {
              var newCoordinates = [];
              var whichNode = "";
              // var row = rows[i];//EE: not needed when json data
              // var whichNode = row[0];
              var whichNode = sb_with_nt_only.properties[i]["subbasin"];
              // var x_notill = parseFloat(rows[i][1]['geometry']['coordinates'][0]);
              // var y_notill = parseFloat(rows[i][1]['geometry']['coordinates'][1]);
              var x_notill = sb_with_nt_only.properties[i]["coord_x"];
              var y_notill = sb_with_nt_only.properties[i]["coord_y"];

              var newCoordinates = constructNewCoordinatesTill(x_notill, y_notill);

              notill = geo;
              notill.setMap(basemap_1);
              conserveArray.push(notill);
              nt_yes = nt_yes + 1;
          }

          //map.fitBounds(bounds);
          console.log("L.1225 YES Conservation-tillage: "+ nt_yes + "  NO Conservation-tillage: "+nt_no);
      };
      //   ------- end 'drawTill1'

      // ------------This is the new piece that takes the markers and not shapes for No Till
      function constructNewCoordinatesTill(x, y) {
      // function constructNewCoordinatesTill(x,y) {
          var geoOptions = {
              strokeColor: colors[0],
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: colors[0],
              fillOpacity: 0.3,
              icon: tillIcon
          };
          var opts = geoOptions;
          var newCoordinates = [];
          var coordinates = null;
          // if (polygon['coordinates']) {
              // var coordinates = polygon['coordinates'];
              var coordinates = [x,y];
              var options = opts || {};
              options.position = new google.maps.LatLng(coordinates[1], coordinates[0]);
              geo = new google.maps.Marker(options);
              return geo;
      }
      // ------ end 'constructNewCoordinatesTill(polygon)'

      // =======================  end NO-TILLAGE totally ======================== //



      // ============================= (7) Begin WETLANDS Markers =========================== //

      function dobinaryWetlands() {
          var obj = find(forMapArray, 'Title', 'variable_area_wetlands');
          if (obj) {
              var listofSubs = obj.subs;
              var strLen = listofSubs.length;
              // var listofSubs = listofSubs.slice(0, strLen - 1);
              var listofSubs = JSON.parse("[" +listofSubs.slice(0, strLen - 1)+ "]");
              // //E: above, JSON.parse convert a string into an array of number
              // console.log("L.1320 listofSubs (Wetlands): "+ listofSubs);
          }

          //////   ininico //////////////////////
      //     //  Inicio SE VA
      //     // Initialize JSONP request
      //     var script = document.createElement('script');
      //     var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
      //     url.push('sql=');
      //     //Streams
      //     var query = 'SELECT GRID_CODE, geometry FROM ' +
      //         '1h0Pw3awyHJC1Eal7QHyP_FQZ6r7PpC5aUU0ybD0 Where GRID_CODE in (' + listofSubs + ')';
      //     // var query = 'SELECT GRID_CODE, geometry FROM 1h0Pw3awyHJC1Eal7QHyP_FQZ6r7PpC5aUU0ybD0';
      //     var encodedQuery = encodeURIComponent(query);
      //     url.push(encodedQuery);
      //     url.push('&callback=drawWet1');//E:Here, the function 'drawWet1' is called.  <===
      //     url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
      //     script.src = url.join('');
      //     var body = document.getElementsByTagName('body')[0];
      //     body.appendChild(script);
      // }
      // // -------------- end 'dowetlands1()'
      //
      // // -------------- start 'drawWet1'
      // drawWet1 = function(data) {
      //     var rows = data['rows'];
      //     //var whichNode=100;
      //     //End SE VA


          //EE: function to convert SVG To Image(SVG) {
          function svg_to_img(arg1){
              // var svg = document.getElementById('svg6');
              var svg = document.getElementById(arg1);
              var xml = new XMLSerializer().serializeToString(svg);
              var svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))
              var b64start = 'data:image/svg+xml;base64,';
              var image64 = b64start + svg64;
              return image64;
          }

          var wt_yes = 0;
          var wt_no = 0;
          // for (var i in rows) {
          for (var i =0; i< subbasin_json.features.length; i++) {
              if (listofSubs.includes(subbasin_json.properties[i]["Subbasin"])) {
                  var newCoordinates = [];
                  var whichNode = "";
                  // var row = rows[i];//EE: not needed when json data
                  // var whichNode = row[0];
                  var whichNode = subbasin_json.properties[i]["Subbasin"].toString();

                  var sb_wet_match = find(subBasinArray, 'subbasinID', whichNode);
                  // alert(JSON.stringify(subBasinArray));
                  // if (obj) {
                  if (sb_wet_match) {
                      // wetlandsize = obj.variable_area_wetlands;
                      wetlandsize = sb_wet_match.variable_area_wetlands;
                      //alert (wetlandsize);
                      switch (true) {
                          case (wetlandsize == 0):
                              wetlandsIcon = "";
                              break;

                          case (wetlandsize < 2):
                              // wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands1.png";
                              wetlandsIcon = svg_to_img('svg1');
                              break;

                          case ((wetlandsize >= 2) && (wetlandsize < 6)):
                              // wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands2.png";
                              wetlandsIcon = svg_to_img('svg2');
                              break;

                          case ((wetlandsize >= 6) && (wetlandsize < 11)):
                              // wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands3.png";
                              wetlandsIcon = svg_to_img('svg3');
                              break;

                          case ((wetlandsize >= 11) && (wetlandsize < 15)):
                              // wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands4.png";
                              wetlandsIcon = svg_to_img('svg4');
                              break;

                          case ((wetlandsize >= 15) && (wetlandsize < 29)):
                              // wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands5.png";
                              wetlandsIcon = svg_to_img('svg5');
                              break;

                          case ((wetlandsize >= 29) && (wetlandsize < 40)):
                              // wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands6.png";
                              wetlandsIcon = svg_to_img('svg6');
                              break;

                          case ((wetlandsize >= 40)):
                              // wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands7.png";
                              wetlandsIcon = svg_to_img('svg7');
                              break;

                          default:
                              wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands.png";
                              break;
                          //return wetlandsIcon;
                      }
                      //alert(wetlandsIcon + ":" + wetlandsize);
                  }

                  // var newCoordinates = constructNewCoordinatesWet(rows[i][1]['geometry']);
                  var x_wetland = parseFloat(subbasin_json.properties[i].wet_x);
                  var y_wetland = parseFloat(subbasin_json.properties[i].wet_y);
                  var newCoordinates = constructNewCoordinatesWet(x_wetland,y_wetland);

                  wetlands = geo;
                  wetlands.setMap(basemap_1);
                  wetArray.push(wetlands);
                  wt_yes = wt_yes + 1;
              }// end if
              else {
                  wt_no = wt_no + 1;
                  // console.log("L.656 subbasin "+ subbasin_json.properties[i]["Subbasin"]+ " does not include CR")
              }
          }
          //map.fitBounds(bounds);
          console.log("L.1390 YES wetlands: "+ wt_yes + "  NO wetlands: "+ wt_no);
      };
      // -------------- end 'drawWet1'

      // ------------- This is the new piece that takes the markers and not shapes
      // function constructNewCoordinatesWet(polygon) {
      function constructNewCoordinatesWet(x,y) {
          var geoOptions = {
              strokeColor: colors[0],
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: colors[0],
              fillOpacity: 0.3,
              icon: wetlandsIcon
          };
          var opts = geoOptions;
          var newCoordinates = [];
          var coordinates = null;
          // if (polygon['coordinates']) {
          //     var coordinates = polygon['coordinates'];
          var coordinates = [x,y];
              var options = opts || {};
              options.position = new google.maps.LatLng(coordinates[1], coordinates[0]);
              geo = new google.maps.Marker(options);
              return geo;
          // }
      }
      // ------- end 'constructNewCoordinatesWet(polygon)'

      // =====================  End WETLANDS totally ===================== //

  } ///END MAPPING FUNCTIONs

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function toggleLayerNew(whichArray, whichArray2, mapName) {
  function toggleLayerNew(whichArray, mapName) {
      if (mapName.getMap()) {
          // alert (cropArray);
          $.each(whichArray, function(index, value) {
              // alert(value);
              value.setMap(null);
          });
          // $.each(whichArray2, function(index, value) {
          //     value.setMap(null);
          // });

      } else {
          $.each(whichArray, function(index, value) {
              // alert(value);
              // value.setMap(map1);
              value.setMap(basemap_1);
          });
          // $.each(whichArray2, function(index, value) {
          //     value.setMap(map2);
          // });
      }
  }


  //alert(JSON.stringify(forMapArray));
  //Going to call the list of subbasins we need for this spot
  function find(arr, key, value) {
      for (var i = 0, l = arr.length; i < l; i++) {
          if (arr[i][key] === value) {
              return arr[i];
          }
      }
      // return {}; // if you would want it null-safe
  }

// ====================  FUNCTION FOR TRACKING CHECKBOXS in LEGEND = (Added by E.Noa) =================== //
  //  (1) Crop-rotation         (cr)
  //  (2) Cover-crops           (cc)
  //  (3) Strip-Cropping        (sc)
  //  (4) Filter-strip          (fs)
  //  (5) Grass waterways       (gw)
  //  (6) No-Till (Till conservation)(nt)
  //  (7) Wetlands              (wt)

  function track_check_cropRotation(){ // (1) Crop-rotation (cr)
      var value_name = document.getElementsByClassName("cr")[0].getAttribute("value"); // Cover-Crop (cc)
      if ($('input.cr').is(':checked')) {
          report('m-clk+', 'Check of ' + value_name + ';'); // report('Check of', ' Filter-strips' + ';');
      }else{
          report('m-clk+', 'Un-check of ' + value_name + ';');// report('Un-check of', ' Filter-strips' + ';');
      }
  }


  function track_check_coverCrop(){ // (2) Cover-crops (cc)
      var value_name = document.getElementsByClassName("cc")[0].getAttribute("value"); // Cover-Crop (cc)
      if ($('input.cc').is(':checked')) {
          report('m-clk+', 'Check of ' + value_name + ';'); // report('Check of', ' Filter-strips' + ';');
      }else{
          report('m-clk+', 'Un-check of ' + value_name + ';');// report('Un-check of', ' Filter-strips' + ';');
      }
  }


  function track_check_stripCropping(){ // (3) Strip-Cropping (sc)
      var value_name = document.getElementsByClassName("sc")[0].getAttribute("value"); // Cover-Crop (cc)
      if ($('input.sc').is(':checked')) {
          report('m-clk+', 'Check of ' + value_name + ';'); // report('Check of', ' Filter-strips' + ';');
      }else{
          report('m-clk+', 'Un-check of ' + value_name + ';');// report('Un-check of', ' Filter-strips' + ';');
      }
  }


  function track_check_filterStrip(){ //(4) Filter-strip (fs)
      var value_name = document.getElementsByClassName("fs")[0].getAttribute("value"); // Filter-strip (fs)
      if ($('input.fs').is(':checked')) {
          report('m-clk+', 'Check of ' + value_name + ';'); // report('Check of', ' Filter-strips' + ';');
      }else{
          report('m-clk+', 'Un-check of ' + value_name + ';');// report('Un-check of', ' Filter-strips' + ';');
      }
  }


  function track_check_grassWaterway(){ // (5) Grass waterways (gw)
      var value_name = document.getElementsByClassName("gw")[0].getAttribute("value"); // Cover-Crop (cc)
      if ($('input.gw').is(':checked')) {
          report('m-clk+', 'Check of ' + value_name + ';'); // report('Check of', ' Filter-strips' + ';');
      }else{
          report('m-clk+', 'Un-check of ' + value_name + ';');// report('Un-check of', ' Filter-strips' + ';');
      }
  }


  function track_check_noTill(){ // (6) No-Till (Till conservation)(nt)
      var value_name = document.getElementsByClassName("nt")[0].getAttribute("value"); // Cover-Crop (cc)
      if ($('input.nt').is(':checked')) {
          report('m-clk+', 'Check of ' + value_name + ';'); // report('Check of', ' Filter-strips' + ';');
      }else{
          report('m-clk+', 'Un-check of ' + value_name + ';');// report('Un-check of', ' Filter-strips' + ';');
      }
  }


  function track_check_wetland(){ // (7) Wetlands (wt)
      var value_name = document.getElementsByClassName("wt")[0].getAttribute("value"); // Cover-Crop (cc)
      if ($('input.wt').is(':checked')) {
          report('m-clk+', 'Check of ' + value_name + ';'); // report('Check of', ' Filter-strips' + ';');
      }else{
          report('m-clk+', 'Un-check of ' + value_name + ';');// report('Un-check of', ' Filter-strips' + ';');
      }
  }

// ================== END ->  FUNCTION FOR TRACKING CHECKBOXS in LEGEND = (Added by E.Noa) =================== //


