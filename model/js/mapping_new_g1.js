  // JavaScript Document
  var colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
  var backArray = [];
  // var backArray2 = [];
  var cropArray = [];
  // var cropArray2 = [];
  var stripArray = [];
  // var stripArray2 = [];
  var wetArray = [];
  // var wetArray2 = [];
  var conserveArray = [];
  // var conserveArray2 = [];
  var grassArray = [];
  // var grassArray2 = [];
  var filterArray = [];
  // var filterArray2 = [];
  var coverArray = [];
  // var coverArray2 = [];
  //var listAll;
  var number;
  var map;
  // var map1;
  var basemap_1;
  // var map2;
  var grass;
  var wetlands;
  // var wetlands2;
  var filter;
  // var filter2;
  var strip;
  // var strip2;
  var notill;
  var cover;
  var background;
  // var background2;
  var crop;
  // var crop2;
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

      //empty the div that shows all the data if they click on a sub basin
      $('#tools').empty();
      $('#toolpic').empty();
      //$('#tools').append('Click anywhere on this yellow bar for additional info on the icons representing these practices<br/>');

      // ////// START Drawing MAIN MAP //////////////
      // var new_icon = $('#new_icon').get(0); // this is for adding a button icon for full screen
      // map1 = new google.maps.Map(document.getElementById('map_canvas1'),{
      basemap_1 = new google.maps.Map(document.getElementById('map_canvas1'),{
          // center: new google.maps.LatLng(39.9778, -86.2959),
          center: new google.maps.LatLng(39.9778, -86.44),
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
      // /////////////////////////// END Drawing MAIN MAP ///////////////////

      // ----------------- Start NEW Legend into the Main map---------------- //
      // E: This part sets up a custom button into the map to display the legend
      // These code-lines calls the js script located around 2620 in g2.php

      var buttonOptions = {
          // gmap: map1,
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


      // E: This three lines add new icon into map to replace the usual 'fullscreen' icon provided by google map
      $('#fullscreen').click(function() {
          $('#map_canvas1 div.gm-style button[title="Toggle fullscreen view"]').trigger('click');
          //// Add fullscreen events. When the full-screen is closed, it is registered.(It does not work for Firefox)
          // document.addEventListener('webkitfullscreenchange', exitHandler);
          // document.addEventListener('mozfullscreenchange', exitHandler);
          // function exitHandler() {
          //     if (!document.webkitIsFullScreen && !document.mozFullScreen) {
          //         report('m-clk*** ' , 'out');
          //         // document.removeEventListener("webkitfullscreenchange", exitHandler);
          //     }
          // }

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

      // // ======= Start Add NEW button into the main map (NOT IN USE FOR NOW) ========//
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
      // // =========  End Add NEW button into the main map ======= //

      // $$$$$$$$$$$$    create the check box items for the MAIN map $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

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

      // =========  End create the check box items $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ======= //


      // map2 = new google.maps.Map(document.getElementById('map_canvas2'), {
      //     center: new google.maps.LatLng(39.9778, -86.2959),
      //     zoom: 11,
      //     mapTypeId: google.maps.MapTypeId.ROADMAP
      // });

      /////////////////TEST///////////////////////////////////////
      /*var numberone = new google.maps.LatLng(39.9778,-86.2959);
      number = new google.maps.GroundOverlay('one.jpg', map1);
      number.setMap(map1);*/
      ////////////////////////////////////////////////////////////


      // Tacking when clicking outside of watershed
      // google.maps.event.addListener(map1, 'click', function goToTimeMap1() {
      google.maps.event.addListener(basemap_1, 'click', function goToTimeMap1() {
          // alert ("Suggestion " + (+oneMap + +1) + " - Outside watershed+"); // newalert
          report('m-clk+', 'Sug:' + (+oneMap + +1) + '  Outside-watershed',';'); // track the suggestion and outside
      });


      /////////////   MAIN PART OF THE
      //E: Call 'Background' function to draw the base map (subbasins map)
      doBackground();

      //I check through an array and if the title appears in it that means we have data for that BMP. Each function
      // that is called makes the two maps. You will see them inside of each function. Only background doesnt do this because the background is the same with either map.
      $.each(forMapArray, function(index, value) {
          //alert("YES");
          if (forMapArray[index]["Title"] == "crop_rotation") {
              doCropRotation();
          }
      });

      $.each(forMapArray, function(index, value) {
          if (forMapArray[index]["Title"] == "cover_crops") {
              //console.log(value);
              doCoverCrops();
          }
      });

      $.each(forMapArray, function(index, value) {
          if (forMapArray[index]["Title"] == "strip_cropping") {
              // alert("strip");
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

      //////////////////////// (0)  Begin BACKGROUND  ////////////////////////////////
      ///Lay background map
      function doBackground() {
          // Initialize JSONP request
          var script = document.createElement('script');
          var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
          url.push('sql=');
          //Streams
          // var query = 'SELECT GRIDCODE, Area_Acres,Length_mil FROM ' +
			//  '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA';
          var query = 'SELECT GRIDCODE, geometry, Area_Acres,Length_mil FROM ' +
              '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA';
          var encodedQuery = encodeURIComponent(query);
          url.push(encodedQuery);
          url.push('&callback=drawBack'); //E:Here, the function 'drawBack' is called.  <===
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          // url.push('&key=IzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
      }
      // ----------- end of 'doBack'

      // ----------- start 'drawBack'
      drawBack = function(data) {
              //function drawWet1(data) {
              //alert("ON");
          var rows = data['rows'];
          // alert("L-407 rows: "+ "\n" + rows);//E:It show the list of sub-basins
          // alert("rows: " + typeof 'rows');//alert("row: " + rows.length);//E: rows.length = 130
          // alert("L-407 row[0]: " + rows[0]);//E:alert. 'row[0]' is string and shows the sub-basin 129
          // alert("row[0]: " + rows[0].length);// alert("Type row[0]: " + typeof 'rows[0]');//E:alert
          // alert("row[0][1]: " + rows[0][1]);//E:alert
          // alert("row[0][1]['geometry']: " + rows[0][1]['geometry']);//E:alert

              ////var whichNode=100;
              for (var i in rows) {
                  var newCoordinates = [];
                  var whichNode = "";
                  // var geometries = rows[i][1]['geometry'];
                  // alert (geometries);
                  // if (i<5) alert("value of i: "+ i);
                  // if (i==1) alert("Sub-basin: "+ rows[i][0]+"  Area: "+ rows[i][2]+"  stream: "+ rows[i][3]);
                  // if (i==1) alert("geometry "+i+":"+ "\n" +rows[i][1]['geometry']['coordinates']);
                  var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);//E: Function is Set at 1069
                  //answersArray[oneMap].RATING
                  var row = rows[i];
                  var whichNode = row[0];
                  // alert (whichNode);//E: 'whichNode' tells which sub-basin
                  /////////You will put your acreage here///////////
                  var acres = parseFloat(row[2]).toFixed(1);
                  var rivers = parseFloat(row[3]).toFixed(1);
                  /////////You will put your stream miles here/////////
                  //alert (whichNode);

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
                  //var listAll
                  console.log("Sub Basin Array: "+ "\n" + JSON.stringify(subBasinArray));

                  //SubBasin="WhichNode", "SubBasinArray" involves DATA from Optimization, from DDBB (Mysql)
                  var obj = find(subBasinArray, 'subbasinID', whichNode);
                  // alert ("Hello: " + obj);// alert (obj);
                  // alert(JSON.stringify(obj, null, 4));
                  if (obj) {
                      var listAll = "Sub-basin Area: " +acres+ " acres | Stream Length+: " + rivers + " miles <br" +
                          " />" + JSON.stringify(obj);
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
                      listAll = listAll.replace(obj.variable_area_wetlands, obj.variable_area_wetlands + " acres ");
                      // alert ('type_of listAll (after): ' + typeof 'listAll');//alert (listAll);//

                      //These two lines get the last value of 'listAll' which is the 'variable_wetfr_wetlands'
                      var listAll_array = listAll.split(" ");//E: It get 'listAll" as array
                      // alert(listAll_array.length);//alert(listAll_array.slice(-1)[0]);// alert(typeof
                      var list_length = listAll_array.length;//E: It gets the length of "listAll_array"
                      var wfr = Number(listAll_array.slice(-1)[0]);//E: It gets the last item of "listAll_array"
                      var wfr_r = Math.round(wfr * 1000) / 1000;//E: Round the last item of "listAll_array"
                      // alert(wfr + ' and ' + typeof wfr +" - wfr rounded: "+ wfr_r + " and "+typeof wfr_r);
                      listAll_array[list_length-1] = wfr_r;//E: Replace the last item of"listAll_array" by rounded value
                      // alert ('the last list:  '+ listAll_array);
                      //THESE LINES GET BACK from ARRAY to STRING
                      var newlist = JSON.stringify(listAll_array);
                      // alert (newlist);
                      newlist = newlist.replace(/"/g, "");
                      newlist = newlist.replace(/,/g, " ");
                      newlist = newlist.replace(/[\[\]']+/g, '');//E: replace '[]' symbols by '' (nothing)
                      listAll = newlist;
                      // alert ("List(After): "+newlist);//alert('type_of new_listAll(after): ' + typeof 'newlist');//alert
                      // (newlist);
                      // alert('done');

                  } else {
                      var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + "Sub-basin ID: " + whichNode;
                  }

                  var obj = {
                      'list': listAll
                  };
                  background.objInfo = obj;
                  // alert (background);//E: it gives '[obj obj]'
                  // alert(JSON.stringify(obj, null, 4));//E: it gives all sub-basin with its Conservations features
                  // alert("backgound: "+ background);//E: It gives "[object Object]" 130 times

                  google.maps.event.addListener(background, 'click', function(event) {
                      console.log("L517: in background");

                      $('.displayStuff').html(this.objInfo.list);
                      var window_info = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean">' +
                          '<a target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean">' +
                          '<strong><em name="What Do They Mean">What do these numbers* mean?</em></strong></a></div>';

                      // alert("L524: " + window_info);
                      infowindow2 = new google.maps.InfoWindow({//E: it makes a window with information
                          content: window_info,
                          position: event.latLng
                      });
                      // infowindow2.open(map1);//E: The window with information is added to the basemap.
                      infowindow2.open(basemap_1);//E: The window with information is added to the basemap.
                      /*setTimeout(function() {
                          infowindow2.close();
                      }, 5000);*/
                      // alert ("Suggestion: " + this.indexID); // newalert
                      report('m-clk+', 'Sug:' + (+oneMap + +1) + '  Sub-basin:' + this.indexID + ';'); // trackable
                  });

                  backArray.push(background);
                  // alert(backArray.length);//E: is starts at 1 ends at 130
              }
              //map.fitBounds(bounds);
          };
          // ---------- end 'drawBack'
      ///////////////////////////  End BACKGROUND////////////////////////


      ///////////////// (1)  Begin Crop Rotation///////////////////////////////////////

      function doCropRotation() {
          var obj = find(forMapArray, 'Title', 'crop_rotation');
          if (obj) {
              //alert("in it");
              var listofSubs = obj.subs;
              //var listofSubs = obj.subs;
              var strLen = listofSubs.length;
              var listofSubs = listofSubs.slice(0, strLen - 1);
              //alert(listofSubs);
          }

          // listOfSubs=forMapArray1["crop_rotation"];
          //alert(listOfSubs);
          // Initialize JSONP request
          var script = document.createElement('script');
          var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
          url.push('sql=');
          //Streams
          var query = 'SELECT GRIDCODE, geometry, Area_Acres,Length_mil FROM ' +
              '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA Where GRIDCODE in (' + listofSubs + ')';
          var encodedQuery = encodeURIComponent(query);
          url.push(encodedQuery);
          url.push('&callback=drawCrop1');//E:Here, the function 'drawCrop1' is called.  <===
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          // url.push('&key=1ZBdUCcDAjB0w94aiSRybOvnbtUxHYrvaMmeljHaD');
          // 1ZBdUCcDAjB0w94aiSRybOvnbtUxHYrvaMmeljHaD
          // https://fusiontables.google.com/DataSource?docid=1ZBdUCcDAjB0w94aiSRybOvnbtUxHYrvaMmeljHaD#map:id=3
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
      }
      // ------------  end 'docrop1'

      // ------------  start 'drawCrop1'

      drawCrop1 = function(data) {
          //function drawWet1(data) {
          //alert("ON");
          var rows = data['rows'];
          //var whichNode=100;
          for (var i in rows) {
              var newCoordinates = [];
              var whichNode = "";
              //var geometries = rows[i][1]['geometry'];
              //alert (geometries)

              //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
              var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
              //answersArray[oneMap].RATING
              var row = rows[i];
              var whichNode = row[0];
              /////////You will put your acreage here///////////
              var acres = parseFloat(row[2]).toFixed(1);
              var rivers = parseFloat(row[3]).toFixed(1);
              /////////You will put your stream miles here/////////
              //alert (whichNode);

              crop = new google.maps.Polygon({
                  path: newCoordinates,
                  //strokeColor: colors[0],
                  strokeOpacity: .4,
                  strokeWeight: 1,
                  fillOpacity: 1,
                  fillColor: "#8da1bf",
                  indexID: whichNode
              });
              // crop.setMap(map1);
              crop.setMap(basemap_1);

              var obj = find(subBasinArray, 'subbasinID', whichNode);
              if (obj) {
                  var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + JSON.stringify(obj);
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
                  listAll = listAll.replace(obj.variable_area_wetlands, obj.variable_area_wetlands + " acres");
                  //alert (listAll);
              } else {
                  var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + "Sub-basin ID: " + whichNode;
              }

              var obj = {
                  'list': listAll
              };
              crop.objInfo = obj;
              google.maps.event.addListener(crop, 'click', function(event) {
                  //console.log(this.objInfo);
                  $('.displayStuff').html(this.objInfo.list);
                  var window_info = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean"><a' +
                      ' target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean">' +
                      '<strong><em name="What Do They Mean">What do these numbers** mean?</em></strong></a></div>';
                  infowindow2 = new google.maps.InfoWindow({
                      content: window_info,
                      position: event.latLng
                  });
                  // infowindow2.open(map1);
                  infowindow2.open(basemap_1);
                  /*setTimeout(function() {
                          infowindow2.close();
                      }, 5000);*/
                  // alert (this.indexID); // newalert
                  report('m-clk+', 'Sug:' + (+oneMap + +1) + '  Sub-basin:'+this.indexID+';'); // trackable

                  /*$.ajax({url: 'sendToTime.php', type: 'post',
                      data: "JSONHolder=" + "Map1" + "," + page + "," + session + "," + this.indexID,
                      success: function(data) {
                      }
                  }); //*/

              });

              cropArray.push(crop);
          }
          //map.fitBounds(bounds);
      };
      // ------------  end 'drawCrop1'

      ////////////////////////////////End Crop Rotation totally ////////////////////////



      ///////////////////(2) Begin COVER CROPS  //////////////////////////////

      function doCoverCrops() {
          var obj = find(forMapArray, 'Title', 'cover_crops');
          if (obj) {
              //alert("in it");
              var listofSubs = obj.subs;
              //var listofSubs = obj.subs;
              var strLen = listofSubs.length;
              var listofSubs = listofSubs.slice(0, strLen - 1);
          }
          // Initialize JSONP request
          var script = document.createElement('script');
          var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
          url.push('sql=');
          //Streams
          var query = 'SELECT GRIDCODE, geometry, Area_Acres,Length_mil FROM ' +
              '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA Where GRIDCODE in (' + listofSubs + ')';
          var encodedQuery = encodeURIComponent(query);
          url.push(encodedQuery);
          url.push('&callback=drawCover1');//E:Here, the function 'drawCover1' is called.  <===
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
      }
      // ------------  end 'docover1'

      // ------------  start 'drawCover1'

      drawCover1 = function(data) {
          //function drawWet1(data) {
          //alert("ON");
          var rows = data['rows'];
          //var whichNode=100;
          for (var i in rows) {
              var newCoordinates = [];
              var whichNode = "";
              //var geometries = rows[i][1]['geometry'];
              //alert (geometries)

              //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
              var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
              //answersArray[oneMap].RATING
              var row = rows[i];
              var whichNode = row[0];
              /////////You will put your acreage here///////////
              var acres = parseFloat(row[2]).toFixed(1);
              var rivers = parseFloat(row[3]).toFixed(1);
              /////////You will put your stream miles here/////////
              //alert (whichNode);

              cover = new google.maps.Polygon({
                  path: newCoordinates,
                  //strokeColor: colors[0],
                  strokeOpacity: .4,
                  strokeWeight: 1,
                  fillOpacity: 1,
                  fillColor: "#99c9ba",
                  indexID: whichNode
              });
              // cover.setMap(map1);
              cover.setMap(basemap_1);

              var obj = find(subBasinArray, 'subbasinID', whichNode);
              if (obj) {
                  var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + JSON.stringify(obj);
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
                  listAll = listAll.replace(obj.variable_area_wetlands, obj.variable_area_wetlands + " acres");
                  //alert (listAll);
              } else {
                  var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + "Sub-basin ID: " + whichNode;
              }

              var obj = {
                  'list': listAll
              };
              cover.objInfo = obj;
              google.maps.event.addListener(cover, 'click', function(event) {
                  //console.log(this.objInfo);
                  $('.displayStuff').html(this.objInfo.list);
                  var window_info = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean"><a' +
                      ' target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean">' +
                      '<strong><em name="What Do They Mean">What do these numbers*** mean?</em></strong></a></div>';
                  infowindow2 = new google.maps.InfoWindow({
                      content: window_info,
                      position: event.latLng
                  });
                  // infowindow2.open(map1);
                  infowindow2.open(basemap_1);
                  /*setTimeout(function() {
                          infowindow2.close();
                      }, 5000);*/
                  // alert (this.indexID); // newalert
                  report('m-clk+', 'Sug:' + (+oneMap + +1) + '  Sub-basin:'+this.indexID+';'); // trackable

                  /*$.ajax({url: 'sendToTime.php',type: 'post',
                      data: "JSONHolder=" + "Map1" + "," + page + "," + session + "," + this.indexID,
                      success: function(data) {
                      }
                  });//*/
              });

              coverArray.push(cover);

          }
          //map.fitBounds(bounds);
      };
      // ------------  end 'drawCover1'

      //////////////////////////  End COVER CROPS totally ////////////////////////


      ///////////////////////// (3) Begin STRIP CROPPING ////////////////////////////////

      function doStripCropping() {
          var obj = find(forMapArray, 'Title', 'strip_cropping');
          if (obj) {
              //alert("in it");
              var listofSubs = obj.subs;
              //var listofSubs = obj.subs;
              var strLen = listofSubs.length;
              var listofSubs = listofSubs.slice(0, strLen - 1);
          }
          // Initialize JSONP request
          var script = document.createElement('script');
          var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
          url.push('sql=');
          //Streams
          var query = 'SELECT GRIDCODE, geometry, Area_Acres,Length_mil FROM ' +
              '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA Where GRIDCODE in (' + listofSubs + ')';
          var encodedQuery = encodeURIComponent(query);
          url.push(encodedQuery);
          url.push('&callback=drawStrip1');//E:Here, the function 'drawStrip1' is called.  <===
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          // alert("script.src: " + url);
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
      }
      // ----------------  end 'dostrip1()'

      // ----------------  start 'drawStrip1' --------------------- /GREEN/
      drawStrip1 = function(data) {
          //function drawWet1(data) {
          //alert("ON");
          var rows = data['rows'];
          //var whichNode=100;
          for (var i in rows) {
              var newCoordinates = [];
              var whichNode = "";
              //var geometries = rows[i][1]['geometry'];
              //alert (geometries)

              //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
              var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
              //answersArray[oneMap].RATING
              var row = rows[i];
              var whichNode = row[0];
              /////////You will put your acreage here///////////
              var acres = parseFloat(row[2]).toFixed(1);
              var rivers = parseFloat(row[3]).toFixed(1);
              /////////You will put your stream miles here/////////
              //alert (whichNode);

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

              var obj = find(subBasinArray, 'subbasinID', whichNode);
              var jonArray = [];
              if (obj) {
                  var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + JSON.stringify(obj);
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
                  listAll = listAll.replace(obj.variable_area_wetlands, obj.variable_area_wetlands + " acres");
                  //alert (listAll);
              } else {
                  var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + "Sub-basin ID: " + whichNode;
              }

              var obj = {
                  'list': listAll
              };
              strip.objInfo = obj;
              google.maps.event.addListener(strip, 'click', function(event) {
                  //console.log(this.objInfo);
                  $('.displayStuff').html(this.objInfo.list);
                  var window_info = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean"><a' +
                      ' target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean">' +
                      '<strong><em name="What Do They Mean">What do these numbers**** mean?</em></strong></a></div>';
                  infowindow2 = new google.maps.InfoWindow({
                      content: window_info,
                      position: event.latLng

                  });
                  // infowindow2.open(map1);
                  infowindow2.open(basemap_1);
                  /*setTimeout(function() {
                          infowindow2.close();
                      }, 5000);*/
                  // alert (this.indexID); // newalert
                  report('m-clk+', 'Sug:' + (+oneMap + +1) + '  Sub-basin:'+this.indexID+';'); // trackable

                  /*$.ajax({url: 'sendToTime.php', type: 'post',
                      data: "JSONHolder=" + "Map1" + "," + page + "," + session + "," + this.indexID,
                      success: function(data) {
                      }
                  }); //*/
              });

              stripArray.push(strip);
          }
          //map.fitBounds(bounds);
      };
      // ---------------  end 'drawStrip1'

      ///////////////////////// End STRIP CROPPING totally ////////////////////////////////


      ///////////////// (4) Begin FILTER STRIP///THIS ONE NEEDS TO BE THE POLYLINES//////////////////////////////

      function doFilterStrips() {

          var obj = find(forMapArray, 'Title', 'filter_strips');
          if (obj) {
              //alert("in it");
              var listofSubs = obj.subs;
              //var listofSubs = obj.subs;
              var strLen = listofSubs.length;
              var listofSubs = listofSubs.slice(0, strLen - 1);
          }
          // Initialize JSONP request
          var script = document.createElement('script');
          var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
          url.push('sql=');
          //Streams
          var query = 'SELECT GRID_CODE, geometry FROM ' +
              '15rPfCYXIoquDLpunT66cvEz2yaqw7R6BRKptqBQ Where GRID_CODE in (' + listofSubs + ')';
          var encodedQuery = encodeURIComponent(query);
          url.push(encodedQuery);
          url.push('&callback=drawFilter1'); //E:Here, the function 'drawFilter1' is called.  <===
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
      }
      // -----------  end 'dofilter1'

      // -----------  start 'drawfilter1'

      drawFilter1 = function(data) {
          //function drawWet1(data) {
          //alert("ON");
          var rows = data['rows'];
          //var whichNode=100;
          //alert(JSON.stringify(subBasinArray));
          for (var i in rows) {
              var newCoordinates = [];
              var whichNode = "";
              var row = rows[i];
              var whichNode = row[0];

              var obj = find(subBasinArray, 'subbasinID', whichNode);
              if (obj) {
                  filterAcre = obj.filter_strips;
                  //alert(filterAcre);

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

                  //alert(wetlandsIcon + ":" + wetlandsize);
              }

              //alert (whichNode);
              //var geometries = rows[i][1]['geometry'];
              //alert (geometries)

              //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
              var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
              //answersArray[oneMap].RATING

              filter = new google.maps.Polyline({
                  path: newCoordinates,
                  strokeColor: filterColor,
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  fillColor: "#daca43"
              });

              // filter.setMap(map1);
              filter.setMap(basemap_1);
              filterArray.push(filter);
          }
          //map.fitBounds(bounds);
      };

      // -----------  end 'drawfilter1'

      /////////////////////////////  End 'FILTER STRIP' totally ////////////////////////


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


      ///////////////// (5)  Begin GRASS-WATERWAYS Markers  ////////////////////////////////////////////////

      function doGrassWaterway() {
          var obj = find(forMapArray, 'Title', 'grassed_waterway');
          if (obj) {
              //alert("in it");
              var listofSubs = obj.subs;
              //var listofSubs = obj.subs;
              var strLen = listofSubs.length;
              var listofSubs = listofSubs.slice(0, strLen - 1);
          }
          // Initialize JSONP request
          var script = document.createElement('script');
          var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
          url.push('sql=');
          //Streams
          var query = 'SELECT GRIDCODE, geometry FROM ' +
              '1iRLpYHfW4L9ncVMvhL5HD5Pwcuu63MVmRBWtn7Y Where GRIDCODE in (' + listofSubs + ')';
          var encodedQuery = encodeURIComponent(query);
          url.push(encodedQuery);
          url.push('&callback=drawGrass1');
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
      }
      // -------------------------------- end 'dograss1()'

      // ---------------------------------- start 'drawGrass1'
      drawGrass1 = function(data) {
          var rows = data['rows'];
          //var whichNode=100;
          for (var i in rows) {
              var newCoordinates = [];
              var whichNode = "";
              //var geometries = rows[i][1]['geometry'];
              //alert (geometries)

              //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
              var newCoordinates = constructNewCoordinatesGrass(rows[i][1]['geometry']);
              //answersArray[oneMap].RATING
              var row = rows[i];
              var whichNode = row[0];
              //alert (whichNode);

              grass = geo;
              //var country = new google.maps.Marker({
              // position:new google.maps.LatLng(newCoordinates),
              //map:map1,
              //icon: customIcons[1],
              //})
              //alert (country);

              // grass.setMap(map1);
              grass.setMap(basemap_1);
              grassArray.push(grass);
          }
          //map.fitBounds(bounds);
      };
      // ---------------------------------- end 'drawGrass1'

      ////////////This is the new piece that takes the markers and not shapes for Grass Waterways//////////////
      function constructNewCoordinatesGrass(polygon) {
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
          if (polygon['coordinates']) {
              var coordinates = polygon['coordinates'];
              var options = opts || {};
              options.position = new google.maps.LatLng(coordinates[1], coordinates[0]);
              geo = new google.maps.Marker(options);
              return geo;
          }
      }
      // ------ end 'constructNewCoordinatesGrass(polygon)'

      ////////END GW (GRASS-WATERWAYS) totally /////////////////////



      /////////////////////////  (6) Begin No-Till Markers //////////////////////////////

      function doConserveTillage() {
          var obj = find(forMapArray, 'Title', 'conservation_tillage');
          if (obj) {
              //alert("in it");
              var listofSubs = obj.subs;
              //var listofSubs = obj.subs;
              var strLen = listofSubs.length;
              var listofSubs = listofSubs.slice(0, strLen - 1);
              //alert(listofSubs);
          }
          // Initialize JSONP request
          var script = document.createElement('script');
          var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
          url.push('sql=');
          //Streams
          var query = 'SELECT GRIDCODE, geometry FROM ' +
              '1iRLpYHfW4L9ncVMvhL5HD5Pwcuu63MVmRBWtn7Y Where GRIDCODE in (' + listofSubs + ')';
          var encodedQuery = encodeURIComponent(query);
          url.push(encodedQuery);
          url.push('&callback=drawTill1');
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
      }
      // ------- end 'dotill1()'

      //   ------- start 'drawTill1'
      drawTill1 = function(data) {
          var rows = data['rows'];
          //var whichNode=100;
          for (var i in rows) {
              var newCoordinates = [];
              var whichNode = "";
              var row = rows[i];
              var whichNode = row[0];
              //var geometries = rows[i][1]['geometry'];
              //alert (geometries)

              //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
              var newCoordinates = constructNewCoordinatesTill(rows[i][1]['geometry']);
              //answersArray[oneMap].RATING

              notill = geo;
              // notill.setMap(map1);
              notill.setMap(basemap_1);
              conserveArray.push(notill);
              // alert("In");
          }
          //map.fitBounds(bounds);
      };
      //   ------- end 'drawTill1'

      ////////////This is the new piece that takes the markers and not shapes for No Till//////////////
      function constructNewCoordinatesTill(polygon) {
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
          if (polygon['coordinates']) {
              var coordinates = polygon['coordinates'];
              var options = opts || {};
              options.position = new google.maps.LatLng(coordinates[1], coordinates[0]);
              geo = new google.maps.Marker(options);
              return geo;
          }
      }
      // ------ end 'constructNewCoordinatesTill(polygon)'

      //////// end NO-TILLAGE totally /////////////////////



      // //////////////////// (7) Begin WETLANDS Markers /////////////////////////////

      function dobinaryWetlands() {
          var obj = find(forMapArray, 'Title', 'variable_area_wetlands');
          if (obj) {
              //alert("in it");
              var listofSubs = obj.subs;
              //var listofSubs = obj.subs;
              var strLen = listofSubs.length;
              var listofSubs = listofSubs.slice(0, strLen - 1);
          }
          // Initialize JSONP request
          var script = document.createElement('script');
          var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
          url.push('sql=');
          //Streams
          var query = 'SELECT GRID_CODE, geometry FROM ' +
              '1h0Pw3awyHJC1Eal7QHyP_FQZ6r7PpC5aUU0ybD0 Where GRID_CODE in (' + listofSubs + ')';
          var encodedQuery = encodeURIComponent(query);
          url.push(encodedQuery);
          url.push('&callback=drawWet1');//E:Here, the function 'drawWet1' is called.  <===
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
      }
      // -------------- end 'dowetlands1()'

      // -------------- start 'drawWet1'
      drawWet1 = function(data) {
          var rows = data['rows'];
          //var whichNode=100;

          // function to convert SVG To Image(SVG) {
          function svg_to_img(arg1){
              // var svg = document.getElementById('svg6');
              var svg = document.getElementById(arg1);
              var xml = new XMLSerializer().serializeToString(svg);
              var svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))
              var b64start = 'data:image/svg+xml;base64,';
              var image64 = b64start + svg64;
              return image64;
          }

          for (var i in rows) {
              var newCoordinates = [];
              var whichNode = "";
              var row = rows[i];
              var whichNode = row[0];
              var obj = find(subBasinArray, 'subbasinID', whichNode);
              // alert(JSON.stringify(subBasinArray));
              if (obj) {
                  wetlandsize = obj.variable_area_wetlands;
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

              //var geometries = rows[i][1]['geometry'];
              //alert (geometries)

              //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
              var newCoordinates = constructNewCoordinatesWet(rows[i][1]['geometry']);
              //answersArray[oneMap].RATING

              //alert (whichNode);
              wetlands = geo;
              //var country = new google.maps.Marker({
              // position:new google.maps.LatLng(newCoordinates),
              //map:map1,
              //icon: customIcons[1],
              //})
              //alert (country);

              // wetlands.setMap(map1);
              wetlands.setMap(basemap_1);
              wetArray.push(wetlands);
          }
          //map.fitBounds(bounds);
      };
      // -------------- end 'drawWet1'

      ///////// This is the new piece that takes the markers and not shapes //////////
      function constructNewCoordinatesWet(polygon) {

          var geoOptions = {
              strokeColor: colors[0],
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: colors[0],
              fillOpacity: 0.3,
              icon: wetlandsIcon
          };
          //alert(wetlandsIcon);
          var opts = geoOptions;
          var newCoordinates = [];
          var coordinates = null;
          if (polygon['coordinates']) {
              var coordinates = polygon['coordinates'];
              var options = opts || {};
              options.position = new google.maps.LatLng(coordinates[1], coordinates[0]);
              geo = new google.maps.Marker(options);
              return geo;
          }
      }
      // ------- end 'constructNewCoordinatesWet(polygon)'

      // //////////////////////// End WETLANDS totally ///////////////////////

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


