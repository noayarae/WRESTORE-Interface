  // JavaScript Document
  var colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
  var backArray = [];
  var backArray2 = [];
  var cropArray = [];
  var cropArray2 = [];
  var stripArray = [];
  var stripArray2 = [];
  var wetArray = [];
  var wetArray2 = [];
  var conserveArray = [];
  var conserveArray2 = [];
  var grassArray = [];
  var grassArray2 = [];
  var filterArray = [];
  var filterArray2 = [];
  var coverArray = [];
  var coverArray2 = [];
  //var listAll;
  var number;
  var map;
  var map1;
  var map2;
  var grass;
  var wetlands;
  var wetlands2;
  var filter;
  var strip;
  var notill;
  var cover;
  var background;
  var background2;
  var strip2;
  var filter2;
  var crop;
  var crop2;
  var filterColor;
  var blueIcon = "http://wrestore.iupui.edu/model/images/green.png";
  var starIcon = "http://wrestore.iupui.edu/model/images/gw.png";
  var tillIcon = "http://wrestore.iupui.edu/model/images/noTill.png";
  var wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands.png";
  var grassIcon = "http://wrestore.iupui.edu/model/images/grass.png";
  var wetlandsize;
  var filterAcre;
  var size;
  // var obj;
  //var obj1;
  var lots = [];

  // This is firing off around 800 of tools.php	

  function initialize() {

      //empty the div that shows all the data if they click on a sub basin
      $('#tools').empty();
      $('#toolpic').empty();
      //$('#tools').append('Click anywhere on this yellow bar for additional info on the icons representing these practices<br/>');

      map1 = new google.maps.Map(document.getElementById('map_canvas1'), {
          center: new google.maps.LatLng(39.9778, -86.2959),
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      map2 = new google.maps.Map(document.getElementById('map_canvas2'), {
          center: new google.maps.LatLng(39.9778, -86.2959),
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      /////////////////TEST///////////////////////////////////////
      /*var numberone = new google.maps.LatLng(39.9778,-86.2959);
      number = new google.maps.GroundOverlay('one.jpg', map1);
      number.setMap(map1);*/
      ////////////////////////////////////////////////////////////

      google.maps.event.addListener(map1, 'click', function goToTimeMap1() {
          // alert ("Suggestion " + (+oneMap + +1) + " - Outside watershed+"); // newalert
          report('m-clk+', 'Sug:' + (+oneMap + +1) + '  Outside-watershed',';'); // track the suggestion and outside
      });

      google.maps.event.addListener(map2, 'click', function goToTimeMap2() {
          report('m-clk+', 'Sug:' + (+twoMap + +1) + '  Outside-watershed',';'); // track the suggestion and outside
      });

      //This draws the subbasins
      doBackground();

      //I check through an array and if the title appears in it that means we have data for that BMP. Each function that is called makes the two maps. You will see them inside of each function. Only background doesnt do this because the background is the same with either map. 
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


      ///Lay background map

      /////////////////Begin Background////////////////////////////////////

      function doBackground() {
          doBack();
      }

      // ----------- start 'doBack'
      function doBack() {
          // Initialize JSONP request
          var script = document.createElement('script');
          var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
          url.push('sql=');
          //Streams
          /*var query = 'SELECT GRIDCODE, Area_Acres,Length_mil FROM ' +
			 '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA';*/
          var query = 'SELECT GRIDCODE, geometry, Area_Acres,Length_mil FROM ' +
              '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA';
          var encodedQuery = encodeURIComponent(query);
          url.push(encodedQuery);
          url.push('&callback=drawBack');
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
          //alert("Wetlands1");
      }
      // ----------- end of 'doBack'

      // ----------- start 'drawBack'

      drawBack = function(data) {
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
                  // alert (whichNode);
                  /////////You will put your acreage here///////////
                  var acres = parseFloat(row[2]).toFixed(1);
                  var rivers = parseFloat(row[3]).toFixed(1);
                  /////////You will put your stream miles here/////////
                  //alert (whichNode);

                  var background = new google.maps.Polygon({
                      path: newCoordinates,
                      //strokeColor: colors[0],
                      strokeOpacity: .6,
                      strokeWeight: 1,
                      fillOpacity: 0,
                      fillColor: "#ffffff",
                      clickable: true,
                      indexID: whichNode,

                  })

                  var background1 = new google.maps.Polygon({
                      path: newCoordinates,
                      //strokeColor: colors[0],
                      strokeOpacity: .6,
                      strokeWeight: 1,
                      fillOpacity: 0,
                      fillColor: "#ffffff",
                      clickable: true,
                      indexID: whichNode,
                  })



                  background.setMap(map1);
                  //var listAll
                  var obj = find(subBasinArray, 'subbasinID', whichNode);
                  if (obj) {

                      var listAll = "Sub-basin Area: " + acres + " acres | Stream Length+: " + rivers + " miles <br" +
                          " />" + JSON.stringify(obj);
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
                      listAll = listAll.replace(/subbasinID/g, "Sub-basin ID+");
                      listAll = listAll.replace(obj.variable_area_wetlands, obj.variable_area_wetlands + " acres ");
                      //alert (listAll);
                  } else {
                      var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + "Sub-basin ID: " + whichNode;
                  };

                  var obj = {
                      'list': listAll,
                  };
                  background.objInfo = obj;
                  google.maps.event.addListener(background, 'click', function(event) {
                      console.log("in map 1");

                      $('.displayStuff').html(this.objInfo.list);
                      var abc = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean"><a target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean"><strong><em name="What Do They Mean">What do these numbers mean?</em></strong></a></div>';
                      infowindow2 = new google.maps.InfoWindow({
                          content: abc,
                          position: event.latLng
                      });
                      infowindow2.open(map1);
                      /*setTimeout(function() {
                          infowindow2.close();
                      }, 5000);*/
                      // alert ("Suggestion: " + this.indexID); // newalert
                      report('m-clk+', 'Sug:' + (+oneMap + +1) + '  Sub-basin:' + this.indexID + ';'); // trackable

                      /*$.ajax({url: 'sendToTime.php',type: 'post',
                          data: "JSONHolder=" + "Map1" + "," + page + "," + session + "," + this.indexID,
                          success: function(data) {
                          }
                      }); //*/

                  });



                  backArray.push(background);

                  background1.setMap(map2);

                  var obj = find(subBasinArray2, 'subbasinID', whichNode);
                  if (obj) {
                      var listAll = "Sub-basin Area: "+acres + " acres | Stream Length*: " + rivers + " miles <br />" + JSON.stringify(obj);
                      listAll = listAll.replace(/"0.0"/g, "No");
                      listAll = listAll.replace(/"1.0"/g, "Yes");
                      listAll = listAll.replace(/,/g, "<br />");
                      listAll = listAll.replace(/"/g, "");
                      listAll = listAll.replace(/}/g, "");
                      listAll = listAll.replace(/{/g, "");
                      listAll = listAll.replace(/_/g, " ");
                      listAll = listAll.replace(/variable area wetlands/g, "wetlands area*");
                      listAll = listAll.replace(/:/g, ": ");
                      listAll = listAll.replace(/variable wetfr wetlands/g, "wetlands drainage");
                      listAll = listAll.replace(/wetlands area/g, "Wetlands area");
                      listAll = listAll.replace(/filter strips/g, "Filter strip width in feet*");
                      listAll = listAll.replace(/wetlands drainage/g, "Wetlands drainage area fraction*");
                      listAll = listAll.replace(/subbasinID/g, "Sub-basin ID*");
                      listAll = listAll.replace(obj.variable_area_wetlands, obj.variable_area_wetlands + " acres");
                      //alert (listAll);
                  } else {
                      var listAll = "Sub-basin Area: " + acres + " acres | Stream Length: " + rivers + " miles <br />" + "Sub-basin ID: " + whichNode;
                  };

                  var obj = {
                      'list': listAll,
                  };
                  background1.objInfo = obj;;
                  google.maps.event.addListener(background1, 'click', function(event) {
                      console.log("in map 2");
                      $('.displayStuff').html(this.objInfo.list);
                      var abc = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean"><a target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean"><strong><em name="What Do They Mean">What do these numbers mean?</em></strong></a></div>';
                      infowindow2 = new google.maps.InfoWindow({
                          content: abc,
                          position: event.latLng
                      });
                      infowindow2.open(map2);
                      /*setTimeout(function() {
                          infowindow2.close();
                      }, 5000);*/
                      // alert (this.indexID); // newalert
                      report('m-clk+', 'Sug:' + (+twoMap + +1) + '  Sub-basin:'+this.indexID+';'); // trackable

                      /*$.ajax({url: 'sendToTime.php',type: 'post',
                          data: "JSONHolder=" + "Map2" + "," + page + "," + session + "," + this.indexID,
                          success: function(data) {
                          }
                      });//*/
                  });




                  backArray2.push(background1);
              }
              //map.fitBounds(bounds);
          }
          // ---------- end 'drawBack'


      ///////////////////////////  EndBACKGROUND////////////////////////


      /////////////////Begin Filter Strips///THIS ONE NEEDS TO BE THE POLYLINES////////////////////////////////////

      function doFilterStrips() {
          //  alert(JSON.stringify(lots));
          //   var myOptions = {
          //    center: new google.maps.LatLng(39.838264982256035,-86.0098324295571),
          //zoom: 10,
          //   mapTypeId: google.maps.MapTypeId.ROADMAP
          // };

          // map = new google.maps.Map(document.getElementById('map-canvas'),
          //    myOptions); 
          // map1 = new google.maps.Map(document.getElementById('map-canvas1'),
          //    myOptions); 
          dofilter1();
          dofilter2();

          /* $('#tools').append('&nbsp;&nbsp;Filter Strips<input name="bmpType" type="checkbox"' +
               ' checked value="filterStrips"  onClick="toggleLayerNew(filterArray,filterArray2,filter)"> ');//*/
          // Below, a second function to track 'click' and 'un-click' action was added.
          $('#tools').append('&nbsp;&nbsp;Filter Strips<input class="fs" name="bmpType" type="checkbox" checked value="filterStrips"' +
              ' onClick="toggleLayerNew(filterArray,filterArray2,filter);track_check_filterStrip();"> ');
          //*/
          $('#toolpic').append('<img alt="WordPress" src="images/key_filterstrips.jpg" />');

      }
      ////////END starting Filter Strips//////////////////

      // -----------  start 'dofilter1'
      function dofilter1() {

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
          url.push('&callback=drawFilter1');
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

                          //return wetlandsIcon;	

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
                  fillColor: "#daca43",
              })
              filter.setMap(map1);
              filterArray.push(filter);
          }
          //map.fitBounds(bounds);
      }

      // -----------  end 'drawfilter1'



      // -----------  start 'dofilter2'
      function dofilter2() {
          var obj = find(forMapArray2, 'Title', 'filter_strips');
          if (obj) {
              //alert("in it");
              var listofSubs = obj.subs;
              //alert(listofSubs);
              //var listofSubs = obj.subs;
              var strLen = listofSubs.length;
              var listofSubs = listofSubs.slice(0, strLen - 1);
          }
          // Initialize JSONP request
          var script = document.createElement('script');
          var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
          url.push('sql=');
          //Streams
          //var query2 = 'SELECT GRID_CODE, geometry FROM ' +
          // '1NfttjsHSm_e2h9r55asztGg0V33mguyGyJPrWq4 Where GRID_CODE in (10,11,13,16,111)';
          var query2 = 'SELECT GRID_CODE, geometry FROM ' +
              '15rPfCYXIoquDLpunT66cvEz2yaqw7R6BRKptqBQ Where GRID_CODE in (' + listofSubs + ')';
          var encodedQuery = encodeURIComponent(query2);
          url.push(encodedQuery);
          url.push('&callback=drawFilter2');
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);

      }
      // -----------  end 'dofilter2'


      // -----------  start 'drawFilter2'

      drawFilter2 = function(data) {
          //alert (JSON.stringify(forMapArray2));
          var rows = data['rows'];
          //alert(JSON.stringify(subBasinArray2));
          //var whichNode=100;
          for (var i in rows) {
              var newCoordinates = [];
              var whichNode = "";
              var row = rows[i];
              var whichNode = row[0];
              // alert(whichNode);
              var obj = find(subBasinArray2, 'subbasinID', whichNode);
              if (obj) {
                  filterAcre = obj.filter_strips;
                  //  alert(filterAcre);

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

                          //return wetlandsIcon;	

                  }

                  //alert(wetlandsIcon + ":" + wetlandsize);


              }

              //var geometries = rows[i][1]['geometry'];
              //alert (geometries)

              //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
              var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
              //  alert (newCoordinates);
              //answersArray[oneMap].RATING

              //alert (whichNode);


              filter2 = new google.maps.Polyline({
                  path: newCoordinates,
                  strokeColor: filterColor,
                  strokeOpacity: 1,
                  strokeWeight: 2,
                  fillColor: "#daca43",
              })
              filter2.setMap(map2);
              filterArray2.push(filter2);
          }
          //map.fitBounds(bounds);
      }
      // -----------  end 'drawFilter2'
      /////////////////////////////  End 'Filter Strips' totally ////////////////////////


      ////////////////////////  Begin COVER CROPS  //////////////////////////////

      function doCoverCrops() {
          //   var myOptions = {
          //    center: new google.maps.LatLng(39.838264982256035,-86.0098324295571),
          //zoom: 10,
          //   mapTypeId: google.maps.MapTypeId.ROADMAP
          // };

          // map = new google.maps.Map(document.getElementById('map-canvas'),
          //    myOptions); 
          // map1 = new google.maps.Map(document.getElementById('map-canvas1'),
          //    myOptions); 
          docover1();
          docover2();
          // $('#tools').append('&nbsp;&nbsp;<span style="color:#99c9ba"><strong>Cover Crops</strong></span><input name="bmpType" type="checkbox" checked value="coverCrops" onClick="toggleLayerNew(coverArray,coverArray2,cover)"> ');
          $('#tools').append('&nbsp;&nbsp;<span style="color:#99c9ba"><strong>Cover Crops</strong></span>' +
              '<input class="cc" name="bmpType" type="checkbox"' +
              ' checked value="coverCrops" onClick="toggleLayerNew(coverArray,coverArray2,cover);track_check_coverCrop();"> ');
          //*/
          $('#toolpic').append('<img alt="WordPress" src="images/key_covercrops.jpg" />');
      }
      // ------------  end 'doCoverCrops'

      // ------------  start 'docover1'
      function docover1() {
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
          url.push('&callback=drawCover1');
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
          //alert("Wetlands1");
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
                  indexID: whichNode,
              })
              cover.setMap(map1);


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
              };

              var obj = {
                  'list': listAll,
              };
              cover.objInfo = obj;
              google.maps.event.addListener(cover, 'click', function(event) {
                  //console.log(this.objInfo);
                  $('.displayStuff').html(this.objInfo.list);
                  var abc = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean"><a target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean"><strong><em name="What Do They Mean">What do these numbers mean?</em></strong></a></div>';
                  infowindow2 = new google.maps.InfoWindow({
                      content: abc,
                      position: event.latLng
                  });
                  infowindow2.open(map1);
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
      }
      // ------------  end 'drawCover1'

      // ------------  start 'doCover2'
      function docover2() {
          var obj = find(forMapArray2, 'Title', 'cover_crops');
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
          var query2 = 'SELECT GRIDCODE, geometry, Area_Acres,Length_mil FROM ' +
              '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA Where GRIDCODE in (' + listofSubs + ')';
          var encodedQuery = encodeURIComponent(query2);
          url.push(encodedQuery);
          url.push('&callback=drawCover2');
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);

      }
      // ------------  end 'doCover2'

      // ------------  start 'drawCover2'
      drawCover2 = function(data) {
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

              cover2 = new google.maps.Polygon({
                  path: newCoordinates,
                  //strokeColor: colors[0],
                  strokeOpacity: .4,
                  strokeWeight: 1,
                  fillOpacity: 1,
                  fillColor: "#99c9ba",
                  indexID: whichNode,
              })
              cover2.setMap(map2);

              var obj = find(subBasinArray2, 'subbasinID', whichNode);

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
              };

              var obj = {
                  'list': listAll,
              };
              cover2.objInfo = obj;
              google.maps.event.addListener(cover2, 'click', function(event) {
                  //console.log(this.objInfo);
                  $('.displayStuff').html(this.objInfo.list);
                  var abc = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean"><a target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean"><strong><em name="What Do They Mean">What do these numbers mean?</em></strong></a></div>';
                  infowindow2 = new google.maps.InfoWindow({
                      content: abc,
                      position: event.latLng
                  });
                  infowindow2.open(map2);
                  /*setTimeout(function() {
                          infowindow2.close();
                      }, 5000);*/
                  // alert (this.indexID); // newalert
                  report('m-clk+', 'Sug:' + (+twoMap + +1) + '  Sub-basin:'+this.indexID+';'); // trackable

                  /*$.ajax({url: 'sendToTime.php',type: 'post',
                      data: "JSONHolder=" + "Map2" + "," + page + "," + session + "," + this.indexID,
                      success: function(data) {
                      }
                  });//*/
              });

              coverArray2.push(cover2);
          }
          //map.fitBounds(bounds);
      }
      // ------------  end 'doCover2'
      ////////////////////////////////End COVER CROPS totally ////////////////////////

      /////////////////Begin Crop Rotation///////////////////////////////////////

      function doCropRotation() {
          //   var myOptions = {
          //    center: new google.maps.LatLng(39.838264982256035,-86.0098324295571),
          //zoom: 10,
          //   mapTypeId: google.maps.MapTypeId.ROADMAP
          // };

          // map = new google.maps.Map(document.getElementById('map-canvas'),
          //    myOptions); 
          // map1 = new google.maps.Map(document.getElementById('map-canvas1'),
          //    myOptions); 
          docrop1();
          docrop2();
          // $('#tools').append('&nbsp;&nbsp;<span style="color:#8da1bf"><strong>Crop Rotation</strong></span><input name="bmpType" type="checkbox" checked value="cropRotation" onClick="toggleLayerNew(cropArray,cropArray2,crop)"> ');
          $('#tools').append('&nbsp;&nbsp;<span style="color:#8da1bf"><strong>Crop Rotation</strong></span>' +
              '<input class="cr" name="bmpType" type="checkbox" checked value="cropRotation"' +
              ' onClick="toggleLayerNew(cropArray,cropArray2,crop);track_check_cropRotation();"> ');
          $('#toolpic').append('<img alt="WordPress" src="images/key_cropRotation.jpg" />');
      }
      // ------------  end 'doCropRotation'

      // ------------  start 'docrop1'
      function docrop1() {

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
          url.push('&callback=drawCrop1');
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
          //alert("Wetlands1");
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
                  indexID: whichNode,
              })
              crop.setMap(map1);

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
              };

              var obj = {
                  'list': listAll,
              };
              crop.objInfo = obj;
              google.maps.event.addListener(crop, 'click', function(event) {
                  //console.log(this.objInfo);
                  $('.displayStuff').html(this.objInfo.list);
                  var abc = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean"><a target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean"><strong><em name="What Do They Mean">What do these numbers mean?</em></strong></a></div>';
                  infowindow2 = new google.maps.InfoWindow({
                      content: abc,
                      position: event.latLng
                  });
                  infowindow2.open(map1);
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
      }

      // ------------  end 'drawCrop1'



      // ------------  start 'doCrop2'   --------- BLUE
      function docrop2() {
          var obj = find(forMapArray2, 'Title', 'crop_rotation');
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
          var query2 = 'SELECT GRIDCODE, geometry, Area_Acres,Length_mil FROM ' +
              '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA Where GRIDCODE in (' + listofSubs + ')';
          var encodedQuery = encodeURIComponent(query2);
          url.push(encodedQuery);
          url.push('&callback=drawCrop2');
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);

      }
      // ------------  end 'doCrop2'


      // ------------  start 'drawCrop2'   --------- BLUE

      drawCrop2 = function(data) {
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

              crop2 = new google.maps.Polygon({
                  path: newCoordinates,
                  //strokeColor: colors[0],
                  strokeOpacity: .4,
                  strokeWeight: 1,
                  fillOpacity: 1,
                  fillColor: "#8da1bf",
                  indexID: whichNode,
              })
              crop2.setMap(map2);
              var obj = find(subBasinArray2, 'subbasinID', whichNode);
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
              };

              var obj = {
                  'list': listAll,
              };
              crop2.objInfo = obj;

              google.maps.event.addListener(crop2, 'click', function(event) {
                  // if (infowindow) infowindow.close();     
                  $('.displayStuff').html(this.objInfo.list);
                  var abc = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean"><a target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean"><strong><em name="What Do They Mean">What do these numbers mean?</em></strong></a></div>';
                  infowindow2 = new google.maps.InfoWindow({
                      content: abc,
                      position: event.latLng
                  });
                  infowindow2.open(map2);
                  /*setTimeout(function() {
                          infowindow2.close();
                      }, 5000);*/
                  // alert (this.indexID); // newalert
                  report('m-clk+', 'Sug:' + (+twoMap + +1) + '  Sub-basin:'+this.indexID+';'); // trackable

                  /*$.ajax({url: 'sendToTime.php',type: 'post',
                      data: "JSONHolder=" + "Map2" + "," + page + "," + session + "," + this.indexID,
                      success: function(data) {
                      }
                  }); //*/
              });
              cropArray2.push(crop2);
          }
          //map.fitBounds(bounds);
      }
      // ------------  end 'drawCrop2'
      ////////////////////////////////End Crop Rotation totally ////////////////////////


      /////////////////////////Begin Strip Cropping////////////////////////////////////

      function doStripCropping() {
          dostrip1();
          dostrip2();
          // $('#tools').append('&nbsp;&nbsp;<span style="color:#87b07e"><strong>Strip Cropping</strong></span><input name="bmpType" type="checkbox" checked value="stripCropping" onClick="toggleLayerNew(stripArray,stripArray2,strip)">&nbsp;');
          $('#tools').append('&nbsp;&nbsp;<span style="color:#87b07e"><strong>Strip Cropping</strong></span>' +
              '<input class="sc" name="bmpType" type="checkbox" checked value="stripCropping"' +
              ' onClick="toggleLayerNew(stripArray,stripArray2,strip);track_check_stripCropping();">&nbsp;');
          $('#toolpic').append('<img alt="WordPress" src="images/key_stripCropping.jpg" />');
      }
      // ----------------  end 'doStripCropping()'

      // ----------------  start 'dostrip1()'
      function dostrip1() {
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
          url.push('&callback=drawStrip1');
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
          //alert("Wetlands1");
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
                  indexID: whichNode,
              })
              strip.setMap(map1);
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
              };

              var obj = {
                  'list': listAll,
              };
              strip.objInfo = obj;
              google.maps.event.addListener(strip, 'click', function(event) {
                  //console.log(this.objInfo);
                  $('.displayStuff').html(this.objInfo.list);
                  var abc = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean"><a target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean"><strong><em name="What Do They Mean">What do these numbers mean?</em></strong></a></div>';
                  infowindow2 = new google.maps.InfoWindow({
                      content: abc,
                      position: event.latLng
					  
                  });
                  infowindow2.open(map1);
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
      }

      // ---------------  end 'drawStrip1'



      // ----------------  start 'dostrip2()'
      function dostrip2() {
          var obj = find(forMapArray2, 'Title', 'strip_cropping');
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
          var query2 = 'SELECT GRIDCODE, geometry, Area_Acres,Length_mil FROM ' +
              '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA Where GRIDCODE in (' + listofSubs + ')';
          var encodedQuery = encodeURIComponent(query2);
          url.push(encodedQuery);
          url.push('&callback=drawStrip2');
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);

      }
      // ----------------  end 'dostrip2()'


      // ----------------  start 'drawStrip2' ---------- /GREEN/

      drawStrip2 = function(data) {
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


              strip2 = new google.maps.Polygon({
                  path: newCoordinates,
                  //strokeColor: colors[0],
                  strokeOpacity: .4,
                  strokeWeight: 1,
                  fillOpacity: 1,
                  fillColor: "#87b07e",
                  indexID: whichNode,
              })
              strip2.setMap(map2);
              var obj = find(subBasinArray2, 'subbasinID', whichNode);
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
              };

              var obj = {
                  'list': listAll,
              };
              strip2.objInfo = obj;
              google.maps.event.addListener(strip2, 'click', function(event) {
                  //console.log(this.objInfo);
                  $('.displayStuff').html(this.objInfo.list);
                  var abc = this.objInfo.list + '<br><div class="displayStuffb" name="What Do They Mean"><a target="_blank" href="infoBox.html" rel="shadowbox;height=640;width=620" name="What Do They Mean"><strong><em name="What Do They Mean">What do these numbers mean?</em></strong></a></div>';
                  infowindow2 = new google.maps.InfoWindow({
                      content: abc,
                      position: event.latLng
                  });
                  infowindow2.open(map2);
                  /*setTimeout(function() {
                          infowindow2.close();
                      }, 5000);*/
                  // alert ('Suggestion ' + this.indexID); // newalert
                  report('m-clk+', 'Sug:' + (+twoMap + +1) + '  Sub-basin:'+this.indexID+';'); // trackable

                  /*$.ajax({url: 'sendToTime.php', type: 'post',
                      data: "JSONHolder=" + "Map2" + "," + page + "," + session + "," + this.indexID,
                      success: function(data) {
                      }
                  }); //*/
              });

              stripArray2.push(strip2);
          }
          //map.fitBounds(bounds);
      }
      // ----------------  end 'drawStrip2'


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
          for (var i in coordinates) {
              newCoordinates.push(
                  new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
              //bounds.extend(newCoordinates[i]);
          }
          return newCoordinates;
      }
      // ----- end 'constructNewCoordinates(polygon)'

      ////////////////////// Begin Wetlands Markers /////////////////////////////
      function dobinaryWetlands() {
          dowetlands1();
          dowetlands2();
          // $('#tools').append('&nbsp;&nbsp;Wetlands<input name="bmpType" type="checkbox" checked value="wetlands" onClick="toggleLayerNew(wetArray,wetArray2,wetlands)">');
          $('#tools').append('&nbsp;&nbsp;Wetlands<input class="wt" name="bmpType" type="checkbox" checked' +
              ' value="wetlands" onClick="toggleLayerNew(wetArray,wetArray2,wetlands);track_check_wetland();">');
          $('#toolpic').append('<img alt="WordPress" src="images/key_wetlands.jpg" />');
      }
      // -------------- end 'dobinaryWetlands()'
      // -------------- start 'dowetlands1()'
      function dowetlands1() {
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
          url.push('&callback=drawWet1');
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
      } // -------------- end 'dowetlands1()'
      // -------------- start 'drawWet1'
      drawWet1 = function(data) {
          var rows = data['rows'];
          //var whichNode=100;
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
                          wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands1.png";
                          break;

                      case ((wetlandsize >= 2) && (wetlandsize < 6)):
                          wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands2.png";
                          break;

                      case ((wetlandsize >= 6) && (wetlandsize < 11)):
                          wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands3.png";
                          break;

                      case ((wetlandsize >= 11) && (wetlandsize < 15)):
                          wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands4.png";
                          break;

                      case ((wetlandsize >= 15) && (wetlandsize < 29)):
                          wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands5.png";
                          break;

                      case ((wetlandsize >= 29) && (wetlandsize < 40)):
                          wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands6.png";
                          break;

                      case ((wetlandsize >= 40)):
                          wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands7.png";
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
              wetlands.setMap(map1);
              wetArray.push(wetlands);
          }
          //map.fitBounds(bounds);
      } // -------------- end 'drawWet1'

      // -------------- start 'dowetlands2()'
      function dowetlands2() {
          var obj = find(forMapArray, 'Title', 'variable_area_wetlands');
          if (obj) {
              //alert("in it");
              var listofSubs = obj.subs;
              //alert ( listofSubs);
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
          url.push('&callback=drawWet2');
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
      } // -------------- end 'dowetlands2()'
      // -------------- start 'drawWet2'
      drawWet2 = function(data) {
              var rows = data['rows'];
              //var whichNode=100;
              for (var i in rows) {
                  var newCoordinates = [];
                  var whichNode = "";
                  //var geometries = rows[i][1]['geometry'];
                  //alert (geometries)
                  var row = rows[i];
                  var whichNode = row[0];
                  //alert (whichNode);
                  var obj = find(subBasinArray2, 'subbasinID', whichNode);
                  if (obj) {
                      wetlandsize = obj.variable_area_wetlands;
                      //alert ( wetlandsize);
                      switch (true) {
                          case (wetlandsize == 0):
                              wetlandsIcon = "";
                              break;

                          case (wetlandsize < 2):
                              wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands1.png";
                              break;

                          case ((wetlandsize >= 2) && (wetlandsize < 6)):
                              wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands2.png";
                              break;

                          case ((wetlandsize >= 6) && (wetlandsize < 11)):
                              wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands3.png";
                              break;

                          case ((wetlandsize >= 11) && (wetlandsize < 15)):
                              wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands4.png";
                              break;

                          case ((wetlandsize >= 15) && (wetlandsize < 29)):
                              wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands5.png";
                              break;

                          case ((wetlandsize >= 29) && (wetlandsize < 40)):
                              wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands6.png";
                              break;

                          case ((wetlandsize >= 40)):
                              wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands7.png";
                              break;

                          default:
                              wetlandsIcon = "http://wrestore.iupui.edu/model/images/wetlands.png";

                              break;

                              //return wetlandsIcon;

                      }

                      //alert(wetlandsIcon + ":" + wetlandsize);


                  }



                  //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
                  var newCoordinates = constructNewCoordinatesWet(rows[i][1]['geometry']);
                  //answersArray[oneMap].RATING



                  //alert (whichNode);
                  wetlands2 = geo;
                  //var country = new google.maps.Marker({  
                  // position:new google.maps.LatLng(newCoordinates),
                  //map:map1,
                  //icon: customIcons[1],
                  //})
                  //alert (country);
                  wetlands2.setMap(map2);
                  wetArray2.push(wetlands2);
              }
              //map.fitBounds(bounds);
          } // -------------- end 'drawWet2'
      ////////////////////////// End wetland totally ///////////////////////

      ///////// This is the new piece that takes the markers and not shapes //////////
      function constructNewCoordinatesWet(polygon) {

          var geoOptions = {
              strokeColor: colors[0],
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: colors[0],
              fillOpacity: 0.3,
              icon: wetlandsIcon,
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


      ////////////This is the new piece that takes the markers and not shapes for Grass Waterways//////////////
      function constructNewCoordinatesGrass(polygon) {
          var geoOptions = {
              strokeColor: colors[0],
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: colors[0],
              fillOpacity: 0.3,
              icon: grassIcon,
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

      ////////////This is the new piece that takes the markers and not shapes for No Till//////////////
      function constructNewCoordinatesTill(polygon) {
          var geoOptions = {
              strokeColor: colors[0],
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: colors[0],
              fillOpacity: 0.3,
              icon: tillIcon,
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


      /////////////////////////// Begin No-Till Markers //////////////////////////////
      function doConserveTillage() {
          dotill1();
          dotill2();
          // $('#tools').append('&nbsp;&nbsp;Conservation Tillage<input name="bmpType" type="checkbox"  checked value="conservationTillage" onClick="toggleLayerNew(conserveArray,conserveArray2,notill)"> ');
          $('#tools').append('&nbsp;&nbsp;Conservation Tillage<input class="nt" name="bmpType" type="checkbox" checked value=' +
              '"conservationTillage" onClick="toggleLayerNew(conserveArray,conserveArray2,notill);track_check_noTill();"> ');
          $('#toolpic').append('<img alt="WordPress" src="images/key_conservation.jpg" />');
      }
      // ------- end 'doConserveTillage()'
      // ------- start 'dotill1()'
      function dotill1() {
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
      } // ------- end 'dotill1()'
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
              notill.setMap(map1);
              conserveArray.push(notill);
              // alert("In");
          }
          //map.fitBounds(bounds);
      } //   ------- end 'drawTill1'

      // ------- start 'dotill2()'
      function dotill2() {
          var obj = find(forMapArray2, 'Title', 'conservation_tillage');
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
          url.push('&callback=drawTill2');
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
      }  // ------- end 'dotill2()'
      // ------- start 'drawTill2'
      drawTill2 = function(data) {

          var rows = data['rows'];
          //var whichNode=100;
          for (var i in rows) {
              var newCoordinates = [];
              var whichNode = "";
              //var geometries = rows[i][1]['geometry'];
              //alert (geometries)

              //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
              var newCoordinates = constructNewCoordinatesTill(rows[i][1]['geometry']);
              //answersArray[oneMap].RATING
              var row = rows[i];
              var whichNode = row[0];
              notill2 = geo;
              notill2.setMap(map2);
              conserveArray2.push(notill2);
          }
      } // ------- end 'drawTill2'

      //////// end NO-TILLAGE totally /////////////////////

      /////////////////  Begin Grass-Waterways Markers  //////////////////////////////////////////////////////////
      function doGrassWaterway() {
          dograss1();
          dograss2();
          // $('#tools').append('&nbsp;&nbsp;Grasswaterways<input name="bmpType" type="checkbox"  checked value="grassWaterWays" onClick="toggleLayerNew(grassArray,grassArray2,grass)"> ');
          $('#tools').append('&nbsp;&nbsp;Grasswaterways <input class="gw" name="bmpType" type="checkbox" checked' +
              ' value="grassWaterWays" onClick="toggleLayerNew(grassArray,grassArray2,grass);track_check_grassWaterway();"> ');
          $('#toolpic').append('<img alt="WordPress" src="images/key_grass.png" />');
      }
      // ------ end 'doGrassWaterway()'
      // ------ start 'dograss1()'
      function dograss1() {
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
      } // -------------------------------- end 'dograss1()'
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
              grass.setMap(map1);
              grassArray.push(grass);
          }
          //map.fitBounds(bounds);
      } // ---------------------------------- end 'drawGrass1'

      // ------------------------------------ start 'dograss2()'
      function dograss2() {
          var obj = find(forMapArray2, 'Title', 'grassed_waterway');
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
          url.push('&callback=drawGrass2');
          url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
          script.src = url.join('');
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(script);
      } // ------------------------------------ end 'dograss2()'
      // ------------------------------------ start 'drawGrass2'
      drawGrass2 = function(data) {
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


              grass2 = geo;
              grass2.setMap(map2);
              grassArray2.push(grass2);
          }
      }
      // ------------------------------------ end 'drawGrass2'
      ////////END GW (Grassed Waterways) totally /////////////////////




  } ///END MAPPING FUNCTION


  function toggleLayerNew(whichArray, whichArray2, mapName) {
      if (mapName.getMap()) {
          //alert (cropArray);
          $.each(whichArray, function(index, value) {
              //alert(value); 
              value.setMap(null);
          });

          $.each(whichArray2, function(index, value) {
              //alert(value); 
              value.setMap(null);
          });

      } else {

          $.each(whichArray, function(index, value) {
              //alert(value); 
              value.setMap(map1);
          });

          $.each(whichArray2, function(index, value) {
              //alert(value); 
              value.setMap(map2);
          });


      };
  }



  function toggleLayerNewOld(this_layer, this_layer2) {
      //alert (this_layer);
      if (this_layer.getMap()) {
          this_layer.setMap(null);
          this_layer2.setMap(null);
          alert("turn it off");
      } else {
          this_layer.setMap(map);
          this_layer2.setMap(map);
          alert("turn it on");
      }
  }




  function toggleLayer(this_layer, this_layer2) {
      if (typeof stripCropping === 'undefined') {
          // variable is undefined
      } else {
          stripCropping.setMap(null);
          stripCropping2.setMap(null);

      }

      if (typeof crop === 'undefined') {
          crop.setMap(null);
          // variable is undefined
      } else {
          crop.setMap(null);
          crop2.setMap(null);

      }

      if (typeof grassWaterway === 'undefined') {
          // variable is undefined
      } else {
          grassWaterway.setMap(null);
          grassWaterway2.setMap(null);

      }

      if (typeof wetlands === 'undefined') {
          // variable is undefined
      } else {
          wetlands.setMap(null);
          wetlands2.setMap(null);
      }

      if (typeof notill === 'undefined') {
          // variable is undefined
      } else {
          notill.setMap(null);
          notill2.setMap(null);
      }

      //cropRotation.setMap(null);

      //secondLayer=this_layer & "1";
      //alert(secondLayer);
      //background.setMap(null);
      //background2.setMap(null);
      //  this_layer.setMap(map1);
      // this_layer2.setMap(map2);


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

// ==================================  FUNCTION FOR TRACKING CHECKBOXS in LEGEND =============================== //
  //  (1) Filter-strip          (fs)
  //  (2) Cover-crops           (cc)
  //  (3) Crop-rotation         (cr)
  //  (4) Strip-Cropping        (sc)
  //  (5) Wetlands              (wt)
  //  (6) No-Till (Till conservation)(nt)
  //  (7) Grass waterways       (gw)
  function track_check_filterStrip(){ //(1) Filter-strip (fs)
      var value_name = document.getElementsByClassName("fs")[0].getAttribute("value"); // Filter-strip (fs)
      if ($('input.fs').is(':checked')) {
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

  function track_check_cropRotation(){ // (3) Crop-rotation (cr)
      var value_name = document.getElementsByClassName("cr")[0].getAttribute("value"); // Cover-Crop (cc)
      if ($('input.cr').is(':checked')) {
          report('m-clk+', 'Check of ' + value_name + ';'); // report('Check of', ' Filter-strips' + ';');
      }else{
          report('m-clk+', 'Un-check of ' + value_name + ';');// report('Un-check of', ' Filter-strips' + ';');
      }
  }

  function track_check_stripCropping(){ // (4) Strip-Cropping (sc)
      var value_name = document.getElementsByClassName("sc")[0].getAttribute("value"); // Cover-Crop (cc)
      if ($('input.sc').is(':checked')) {
          report('m-clk+', 'Check of ' + value_name + ';'); // report('Check of', ' Filter-strips' + ';');
      }else{
          report('m-clk+', 'Un-check of ' + value_name + ';');// report('Un-check of', ' Filter-strips' + ';');
      }
  }

  function track_check_wetland(){ // (5) Wetlands (wt)
      var value_name = document.getElementsByClassName("wt")[0].getAttribute("value"); // Cover-Crop (cc)
      if ($('input.wt').is(':checked')) {
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

  function track_check_grassWaterway(){ // (7) Grass waterways (gw)
      var value_name = document.getElementsByClassName("gw")[0].getAttribute("value"); // Cover-Crop (cc)
      if ($('input.gw').is(':checked')) {
          report('m-clk+', 'Check of ' + value_name + ';'); // report('Check of', ' Filter-strips' + ';');
      }else{
          report('m-clk+', 'Un-check of ' + value_name + ';');// report('Un-check of', ' Filter-strips' + ';');
      }
  }

