// Mapping new js file

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

var star1 ="http://localhost/wrestoreBCK2/model_ecw/images/star1_20x20.png";

var wetlandsize;
var filterAcre;
var lots = [];
// This is firing off around 800 of tools.php

function initialize() {
    // ============================= START Drawing MAIN MAP ============================= //

    var type_map = 'satellite';//'roadmap';
    basemap_1 = new google.maps.Map(document.getElementById('map_canvas1'), {
        center: new google.maps.LatLng(39.9778, -86.44),//E: center for "ecw" scale 10.5
        // center: new google.maps.LatLng(40.05, -86.34),//E: center for "ecw" scale 11
        // center: new google.maps.LatLng(45.65, -123.1),//E: center for "Dairy-Mckay"
        zoom: 10.5,//10.5
        disableDefaultUI: true, //E:it disables all default icons from google map
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        // mapTypeId: 'satellite',
        // mapTypeId: type_map,

        mapTypeControl: false,//true,//false,//E: It disables type of map option
        //EE: 'mapTypeControlOptions' was set BY a function, see below 'initMapTypeControl(basemap_1)' at L.77
        mapTypeControlOptions: {
            // style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.RIGHT_BOTTOM,//BOTTOM_RIGHT//TOP_CENTER
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.SATELLITE
            ]
        },
        // gestureHandling: 'cooperative',//'auto',// 'cooperative',//'greedy',
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


    // ============================= Start: Creating new polygons to highlight sub-basins =================== //
    //EE: it sets coordinates for all watershed (border) and saved as sb0
    //EE: This part works with two other functions ('add_sb0' and 'select_sb') located at the end of this file L.1545

    //E: Build coordinates for the watershed border
    var sb0 = constructNewCoordinates(border_json.features[0].geometry);

    var ssbb = [sb0];
    var n_sb = 131;//E: for ecw (130 subbasin but for looping we add 1)

    //EE: it sets coordinates for all subasins (border) and saved as sb1, sb2, sb3,...,s130 (ecw)
    // var sb1 = constructNewCoordinates(subbasin_json.features[0].geometry);
    // var sb2 = constructNewCoordinates(subbasin_json.features[1].geometry);
    // var sb3 = constructNewCoordinates(subbasin_json.features[2].geometry);
    // var ssbb = [sb0,sb1,sb2,sb3];
    for (var j = 1; j < n_sb; j++) {
        //E: It gets the index of subbasin sb1,sb2,etc. from "ecw4b.js" data-file
        var indexx = subbasin_json.properties.map(function (e) {
            return e.Subbasin;
        }).indexOf(j);
        // if (j==1) alert ("L.86 index: "+ indexx);

        this["sb" + j] = constructNewCoordinates(subbasin_json.features[indexx].geometry);
        ssbb.push(this["sb" + j]);//E: add new item to the 'ssbb' object-array
        // if (j > 9 && j < 15) alert ("L.90 variable created: "+ this["sb"+j]);
    }
    // console.log ("L.86: "+ typeof ssbb + "  length: "+ ssbb.length);
    // console.log ("L.86: \n"+ JSON.stringify(ssbb));
    // console.log("L.74 sb0: \n"+ JSON.stringify(sb1));

    set_polygons_paths(ssbb);
    var i;

    function set_polygons_paths(ssbb) {
        for (var i = 0; i < n_sb; i++) {
            // eval("poly_sb" + i + "=new google.maps.Polygon({\n" +
            eval("poly_sb" + i + "=new google.maps.Polyline({\n" +
                "              path: ssbb[" + i + "],\n" +
                "              strokeColor: '#000000',\n" +//Black(default):#000000, Red: #FF0000, Maroon: #800000
                "              strokeOpacity: 1.0,\n" +//E: 1.0 by default (dark)
                "              strokeWeight: 3,\n" +
                // "              fillOpacity: 0.0,\n" +//E: not for polyline
                "              zIndex: 100\n" +
                "          })");
        }
    }

    //E: add_sb0() is placed at the end of this code (L.1543)
    add_sb0(n_sb);//E: add the 'watershed' border into the main map as default.

    // ========================== End: Creating new polygons to highlight sub-bains  ========================== //


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
    $('#fullscreen').click(function () {
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
                report('m-clk*** ', 'close_fullscreen');
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
        action: function () {
            report('m-clk*c ', 'Crop Rotation click ');
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
        action: function () {
            report('m-clk*c ', 'Cover Crop click ');
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
        action: function () {
            report('m-clk*c ', 'Strip Cropping click ');
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
        action: function () {
            report('m-clk*c ', 'Filter Cropping click ');
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
        action: function () {
            report('m-clk*c ', 'Grass Waterways click ');
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
        action: function () {
            report('m-clk*c ', 'Conservation Tillage click ');
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
        action: function () {
            report('m-clk*c ', 'Wetlands click ');
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

    google.maps.event.addDomListener(frame, 'click', function () { //E: Add event "frame" to the map
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
        report('m-clk+', 'Sug:' + (+oneMap + +1) + '  Outside-watershed', ';'); // track the suggestion and outside
    });
    // ---------------------  End: Tracking when clicking outside of watershed  -------------------- //

    // var option = document.getElementById('subDrop').value;
    // alert("L.281 option of sb: "+option);

    //  ==================  Start: Draw Conservation Practices (Main Part) ============================ //
    //E: Call 'Background' function to draw the base map (subbasins map)
    doBackground();
    dolabels();
    var color_croprot = "#ffff00";//"#8da1bf";//Red: #ff0000; Yellow: "#ffff00"
    var color_covercrop = "#ff6600";//"#99c9ba";//Green: #00ff00
    var color_stripcrop = "#00ccff";//"#87b07e";//Blue: #0000FF
    var poly_opacity = 0.35;


    //E: In Next lines, The conservation practice is checked if it is applied into the optimization. True =>
    // execute the corresponding function. Not => The function is not executed. Background doesnt neet it
    // because the background is the basemap.
    $.each(forMapArray, function (index, value) {
        if (forMapArray[index]["Title"] == "crop_rotation") {
            // doCropRotation(color_croprot, poly_opacity);//E: For polygons
            doCropRotation_markers();//E: For Markers
        }
    });

    $.each(forMapArray, function (index, value) {
        if (forMapArray[index]["Title"] == "cover_crops") {
            // alert("Cover crop value: \n"+ value);
            // doCoverCrops(color_covercrop, poly_opacity);
            doCoverCrop_markers();
        }
    });

    $.each(forMapArray, function (index, value) {
        if (forMapArray[index]["Title"] == "strip_cropping") {
            // doStripCropping(color_stripcrop, poly_opacity);
            doStripCropping_markers();
        }
    });

    $.each(forMapArray, function (index, value) {
        if (forMapArray[index]["Title"] == "filter_strips") {
            doFilterStrips();
        }
    });

    $.each(forMapArray, function (index, value) {
        if (forMapArray[index]["Title"] == "grassed_waterway") {
            doGrassWaterway();
        }
    });

    $.each(forMapArray, function (index, value) {
        if (forMapArray[index]["Title"] == "conservation_tillage") {
            doConserveTillage();
        }
    });

    $.each(forMapArray, function (index, value) {
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
    // ///Lay background map
    function doBackground() {

        for (var i = 0; i < subbasin_json.features.length; i++) {//EE 'subbasin_json.features.length' = 130 (# of subbasins)
            var newCoordinates = [];//EE: For polygons or sub-basins
            var newCoordinates_labels = [];//EE: For labels on each sub-basin
            var whichNode = "";
            //EE:It is converted to string to be in the 'find' function (see some lines below)
            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E: For "ecw"
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"
            if (i == 0) console.log("which subbasin Background: " + whichNode);//E: 'whichNode' tells which sub-basin

            // if (i==0) console.log("L.392 geometry "+i+":"+ "\n"+JSON.stringify(subbasin_json.features[i].geometry));
            //E: "subbasin_json" comes from 'data/ecw4b.js'
            var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);//EE: Function is Set at 1069
            if (i == 0) console.log("L.407 geometry " + i + ":" + "\n" + typeof(newCoordinates));

            var x_label = parseFloat(subbasin_json.properties[i].label_x);
            var y_label = parseFloat(subbasin_json.properties[i].label_y);
            // var newCoordinates_labels = constructNewCoordinatesLabel(x_label,y_label,whichNode);//EE: Function is Set at 1069
            //answersArray[oneMap].RATING
            // var row = rows[i];//EE: not needed when json data
            // var whichNode = row[0];

            /////////You will put your acreage here///////////
            // var acres = parseFloat(row[2]).toFixed(1);
            var acres = subbasin_json.properties[i]["area_ac"];//EE:
            var acres = Math.round(acres * 100) / 100;
            // var rivers = parseFloat(row[3]).toFixed(1);
            // var rivers = subbasin_json.properties[i]["strlgth_mi"];//EE:
            var rivers = subbasin_json.properties[i]["stream_mi"];//EE:
            var rivers = Math.round(rivers * 1000) / 1000;
            if (i < 3) console.log("L.410 river: \n" + typeof rivers);//E:
            // sub-basin

            var background = new google.maps.Polygon({//E: Watershed (background) features
                path: newCoordinates,
                //strokeColor: colors[0],
                strokeOpacity: .6,
                strokeWeight: 1,
                fillOpacity: 0.5,
                fillColor: "#ffff99",//"#ffb366",// "#ff99cc",// "#aaff80",// "#ffff99",//"#ffffff",
                clickable: true,
                indexID: whichNode
            });

            background.setMap(basemap_1);//E: IT SETS THE POLYGONS over the BASEMAP
            // ------ basemap_done

            // ------ Assigning list of attributes to subbasins
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

            google.maps.event.addListener(background, 'click', function (event) {

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
    }

    // ===================================  End BACKGROUND =============================//


    // ===================================== (1)  Begin Crop Rotation ========================================== //

    function doCropRotation(color_croprot, poly_opacity) {
        var obj = find(forMapArray, 'Title', 'crop_rotation');//E: obj gets subbasins-with-CR
        if (obj) {
            // console.log("L.526 do CropRotation: "+ JSON.stringify(obj)+ " \n obj.subs= "+ obj.subs);
            var listofSubs = obj.subs;//E: get only IDs of subbasins with 'crop rotation'
            var strLen = listofSubs.length;
            // var listofSubs = listofSubs.slice(0, strLen - 1);//E: List of subbasin's IDs
            var listofSubs = JSON.parse("[" + listofSubs.slice(0, strLen - 1) + "]");//E: List of subbasin's IDs
            //E: above, JSON.parse convert a string into an array of number
            console.log("L.531 listofSubs (Crop-Rotation): " + listofSubs);
        }

        var cr_yes = 0;
        var cr_no = 0;
        for (var i = 0; i < subbasin_json.features.length; i++) {//EE: it gives: 130 times
            if (listofSubs.includes(subbasin_json.properties[i]["Subbasin"])) {
                // var newCoordinates = [];
                // var whichNode = "";

                var whichNode = subbasin_json.properties[i]["Subbasin"].toString();

                //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
                // var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
                var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);

                /////////You will put your acreage here///////////
                // var acres = parseFloat(row[2]).toFixed(1);
                // var rivers = parseFloat(row[3]).toFixed(1);
                var acres = subbasin_json.properties[i]["area_ac"];
                var acres = Math.round(acres * 100) / 100;
                var rivers = subbasin_json.properties[i]["stream_mi"];
                var rivers = Math.round(rivers * 1000) / 1000;
                /////////You will put your stream miles here/////////

                crop = new google.maps.Polygon({
                    path: newCoordinates,
                    //strokeColor: colors[0],
                    strokeOpacity: 0.4,
                    strokeWeight: 1,
                    fillColor: color_croprot,//"#ff0000",//"#8da1bf",#FF9933
                    fillOpacity: poly_opacity,//0.3,//E: By default 1.0 (dark)
                    indexID: whichNode,
                    zIndex: 1
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
        console.log("L.641 YES crop rotation: " + cr_yes + "  NO crop rotation: " + cr_no)
    }
    // ------------  end 'drawCrop1' as polygon (CropRotation)

    // -------------Start 'draw-CropRotation1' as markers
    function doCropRotation_markers() {
        var obj = find(forMapArray, 'Title', 'crop_rotation');
        if (obj) {
            var listofSubs = obj.subs;
            var strLen = listofSubs.length;
            var listofSubs = listofSubs.slice(0, strLen - 1);
            var listofSubs_num = JSON.parse("[" + listofSubs.slice(0, strLen - 1) + "]");
            //E: above, JSON.parse convert a string into an array of number
            console.log("L.662 listofSubs (crop_rotation): " + listofSubs);
        }

        //Query to create a new JSON of CropRotation just with basins with this cons.practice
        var sb_with_cr_only = {};
        sb_with_cr_only.properties = new Array();
        for (var i = 0; i < subbasin_json.features.length; i++) {
            if (listofSubs_num.includes(subbasin_json.properties[i]["Subbasin"])) {
                sb_with_cr_only.properties.push({
                    "subbasin": subbasin_json.properties[i]["Subbasin"],
                    "coord_x": JSON.parse(subbasin_json.properties[i]["grass_x"]),
                    "coord_y": JSON.parse(subbasin_json.properties[i]["grass_y"])
                });
            }
        }
        //     // console.log("sb_with_nt_only: "+ JSON.stringify(sb_with_nt_only.properties));
        //     console.log(sb_with_nt_only.properties.length);

        var cr_marker_yes = 0;
        var cr_marker_no = 0;
        var CropRotation_markers = [];//E: This variable is below used to show label when zoom in/out
        var CropRotation_markers1 = [];//E: This variable for small labels. Above for large labels

        for (var i = 0; i < sb_with_cr_only.properties.length; i++) {
            var newCoordinates = [];
            var whichNode = "";
            // var row = rows[i];//EE: not needed when json data
            var whichNode = sb_with_cr_only.properties[i]["subbasin"];

            // var x_croprot = (sb_with_cr_only.properties[i]["coord_x"]);
            var x_croprot = (sb_with_cr_only.properties[i]["coord_x"] - 0.0045);
            var y_croprot = (sb_with_cr_only.properties[i]["coord_y"]);
            // console.log("L.693 coord croprot: " + typeof x_croprot + " , " + typeof y_croprot);
            // console.log("L.694 coord croprot: " + x_croprot + " , " + y_croprot);

            var newCoordinates = constructNewCoordinatesCropRotation(x_croprot, y_croprot);
            var geosss = newCoordinates;
            var geop = geosss[0];
            var geop1 = geosss[1];

            CropRotation_markers.push(geop);
            CropRotation_markers1.push(geop1);

            //EE: 'crop' conects to 'g2.php/checkBox_CropRotation(options)' to on/off by its check-button
            crop = geop;//geo;
            crop.setMap(basemap_1);
            cropArray.push(crop);
            crop1 = geop1;//geo;
            crop1.setMap(basemap_1);
            cropArray.push(crop1);
            cr_marker_yes = cr_marker_yes + 1;//sc_marker_yes
        }

        //E: These events make visible the 'CropRotation' markers when zooming
        google.maps.event.addListener(basemap_1, 'zoom_changed', function() {
            var zoom = basemap_1.getZoom();
            // iterate over markers and call setVisible
            for (i = 0; i < CropRotation_markers.length; i++) {
                CropRotation_markers[i].setVisible(zoom >= 11.5);
            }
        });
        google.maps.event.addListener(basemap_1, 'zoom_changed', function() {
            var zoom = basemap_1.getZoom();
            // iterate over markers and call setVisible
            for (i = 0; i < CropRotation_markers1.length; i++) {
                CropRotation_markers1[i].setVisible(zoom < 11.5);
            }
        });

        //map.fitBounds(bounds);
        console.log("L.1251 YES crop_rotation_M: " + cr_marker_yes + "  NO crop_rotation_M: " + cr_marker_no);
    }

    // ------------- end 'drawCover1' as markers

    // ------------This piece takes the MARKERS and not shapes for Crop-Rotation
    function constructNewCoordinatesCropRotation(x, y) {
        var geoOptions = {
            // --------------------  For square 'Icon' (icon from tillIcon)
            // strokeColor: colors[0],
            // strokeOpacity: 0.8,
            // strokeWeight: 1,
            // fillColor: colors[0],
            // fillOpacity: 0.3,
            // icon: tillIcon
            // --------------------  For 'text' (CR) as acronym
            label: {text: "(R)", color: '#008000', fontSize: "10px", fontWeight: "bold"},
            icon: label_icon
        };
        var geoOptions1 = {
            label: {text: "(R)", color: '#008000', fontSize: "5px"},
            icon: label_icon
        };

        // var opts = geoOptions;
        // var opts1 = geoOptions1;
        var newCoordinates = [];
        var coordinates = null;
        // var coordinates = polygon['coordinates'];
        var coordinates = [x, y];
        var options = geoOptions || {};//opts || {};
        var options1 = geoOptions1 || {};
        options.position = new google.maps.LatLng(coordinates[1], coordinates[0]);
        options1.position = new google.maps.LatLng(coordinates[1], coordinates[0]);

        geo = new google.maps.Marker(options);
        geo1 = new google.maps.Marker(options1);
        // return geo;
        return [geo,geo1];
    }

    // ------ end 'constructNewCoordinatesCropRotation(markers)'

    ////////////////////////////////End Crop Rotation totally ////////////////////////


    // ================================= (2) Begin COVER CROPS  ============================== //

    function doCoverCrops(color_covercrop, poly_opacity) {
        var obj = find(forMapArray, 'Title', 'cover_crops');//E: obj gets subbasins-with-CC
        if (obj) {
            var listofSubs = obj.subs;
            var strLen = listofSubs.length;
            // var listofSubs = listofSubs.slice(0, strLen - 1);
            var listofSubs = JSON.parse("[" + listofSubs.slice(0, strLen - 1) + "]");
            //E: above, JSON.parse convert a string into an array of number
            console.log("L.657 listofSubs (cover_crops): " + listofSubs);
        }

        var cc_yes = 0;
        var cc_no = 0;
        // for (var i in rows) {
        for (var i = 0; i < subbasin_json.features.length; i++) {
            if (listofSubs.includes(subbasin_json.properties[i]["Subbasin"])) {
                var newCoordinates = [];
                var whichNode = "";

                //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
                // var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
                var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);
                var whichNode = subbasin_json.properties[i]["Subbasin"].toString();
                /////////You will put your acreage here///////////
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
                    fillColor: color_covercrop,//"#ff6600",//"#00ff00",//"#99c9ba",
                    fillOpacity: poly_opacity,//0.3,//E: By default 1.0 (dark)
                    indexID: whichNode,
                    zIndex: 2
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
        console.log("L.773 YES cover crop: " + cc_yes + "  NO cover crop: " + cc_no)
    }

    // ------------  end 'drawCover1' as polygons

    // -------------Start 'drawCover1' as markers
    function doCoverCrop_markers() {
        var obj = find(forMapArray, 'Title', 'cover_crops');
        if (obj) {
            var listofSubs = obj.subs;
            var strLen = listofSubs.length;
            var listofSubs = listofSubs.slice(0, strLen - 1);
            var listofSubs_num = JSON.parse("[" + listofSubs.slice(0, strLen - 1) + "]");
            //E: above, JSON.parse convert a string into an array of number
            console.log("L.872 listofSubs (cover_crops): " + listofSubs);
        }

        //Query to create a new JSON of No-Till just with basins with this cons.practice
        var sb_with_cc_only = {};
        sb_with_cc_only.properties = new Array();
        for (var i = 0; i < subbasin_json.features.length; i++) {
            if (listofSubs_num.includes(subbasin_json.properties[i]["Subbasin"])) {
                sb_with_cc_only.properties.push({
                    "subbasin": subbasin_json.properties[i]["Subbasin"],
                    "coord_x": JSON.parse(subbasin_json.properties[i]["grass_x"]),
                    "coord_y": JSON.parse(subbasin_json.properties[i]["grass_y"])
                });
            }
        }
        //     // console.log("sb_with_nt_only: "+ JSON.stringify(sb_with_nt_only.properties));
        //     console.log(sb_with_nt_only.properties.length);

        var cc_marker_yes = 0;
        var cc_marker_no = 0;
        var CoverCrop_markers = [];//E: This variable is below used to show label when zoom in/out
        var CoverCrop_markers1 = [];//E: This variable for small labels. Above for large labels

        for (var i = 0; i < sb_with_cc_only.properties.length; i++) {
            var newCoordinates = [];
            var whichNode = "";
            // var row = rows[i];//EE: not needed when json data

            var whichNode = sb_with_cc_only.properties[i]["subbasin"];

            // var x_covercrop = (sb_with_cc_only.properties[i]["coord_x"]);
            var x_covercrop = (sb_with_cc_only.properties[i]["coord_x"] + 0.0045);
            var y_covercrop = (sb_with_cc_only.properties[i]["coord_y"]);
            // console.log("L.889 coord grass: " + typeof x_covercrop + " , " + typeof y_covercrop);
            // console.log("L.890 coord grass: " + x_covercrop + " , " + y_covercrop);

            var newCoordinates = constructNewCoordinatesCoverCrop(x_covercrop, y_covercrop);
            var geosss = newCoordinates;
            var geop = geosss[0];
            var geop1 = geosss[1];

            CoverCrop_markers.push(geop);
            CoverCrop_markers1.push(geop1);

            //EE: 'covercrop' conects to 'g2.php/checkBox_CoverCrop(options)' to on/off by its check-button
            cover = geo;
            cover.setMap(basemap_1);
            coverArray.push(cover);
            cover1 = geo1;//geo;
            cover1.setMap(basemap_1);
            coverArray.push(cover1);
            cc_marker_yes = cc_marker_yes + 1;//sc_marker_yes
        }

        //E: This event makes visible the 'StripCropping' markers when zoom>=12
        google.maps.event.addListener(basemap_1, 'zoom_changed', function() {
            var zoom = basemap_1.getZoom();
            // iterate over markers and call setVisible
            for (i = 0; i < CoverCrop_markers.length; i++) {
                CoverCrop_markers[i].setVisible(zoom >= 11.5);
            }
        });
        google.maps.event.addListener(basemap_1, 'zoom_changed', function() {
            var zoom = basemap_1.getZoom();
            // iterate over markers and call setVisible
            for (i = 0; i < CoverCrop_markers1.length; i++) {
                CoverCrop_markers1[i].setVisible(zoom < 11.5);
            }
        });


        //map.fitBounds(bounds);
        console.log("L.1251 YES Conservation-tillage: " + cc_marker_yes + "  NO Conservation-tillage: " + cc_marker_no);
    }

    // ------------- end 'drawCover1' as markers

    // ------------This piece takes the markers and not shapes for No Till
    function constructNewCoordinatesCoverCrop(x, y) {
        var geoOptions = {
            // -------------------------- For squre 'Icon' (Icon from tillIcon)
            // strokeColor: colors[0],
            // strokeOpacity: 0.8,
            // strokeWeight: 1,
            // fillColor: colors[0],
            // fillOpacity: 0.3,
            // icon: tillIcon

            // -------------------------- For 'Text' as acronym
            // //E: This 'label_icon' comes from 'dolabels()' which retrieves a DOM (box) from g2.php. Without this
            // // Box, the label is shown with balloons.
            label: {text: "(C)", color: '#cc0000', fontSize: "10px", fontWeight: "bold"},
            icon: label_icon//E: It comes from converting 'svg_to_img2('label_rect')'

            // --------------- 'Icon' by drawing using coordinates (CoverCrop)
            // icon: {//E: square coordiantes
            //     path: 'M 50,1 50,50 1,50 1,1 z', fillColor: '#ffffff',
            //     fillOpacity: 0.5, scale: 0.18, strokeColor: '#404040', strokeWeight: 1
            // }
        };
        var geoOptions1 = {
            label: {text: "(C)", color: '#ff0000', fontSize: "5px"},
            icon: label_icon//E: It comes from converting 'svg_to_img2('label_rect')'
        };

        // var opts = geoOptions;
        // var opts1 = geoOptions1;
        var newCoordinates = [];
        var coordinates = null;
        // if (polygon['coordinates']) {
        // var coordinates = polygon['coordinates'];
        var coordinates = [x, y];
        var options = geoOptions;//opts || {};
        var options1 = geoOptions1 || {};
        options.position = new google.maps.LatLng(coordinates[1], coordinates[0]);
        options1.position = new google.maps.LatLng(coordinates[1], coordinates[0]);

        geo = new google.maps.Marker(options);
        geo1 = new google.maps.Marker(options1);
        // return geo;
        return [geo,geo1];
    }

    // ------ end 'constructNewCoordinatesCoverCrop(markers)'

    //////////////////////////  End COVER CROPS totally ////////////////////////


    // ========================= (3) Begin STRIP CROPPING ===================== //

    function doStripCropping(color_stripcrop, poly_opacity) {
        var obj = find(forMapArray, 'Title', 'strip_cropping');
        if (obj) {
            var listofSubs = obj.subs;
            var strLen = listofSubs.length;
            // var listofSubs = listofSubs.slice(0, strLen - 1);
            var listofSubs = JSON.parse("[" + listofSubs.slice(0, strLen - 1) + "]");
            //E: above, JSON.parse convert a string into an array of number
            console.log("L.790 listofSubs (strip_cropping): " + listofSubs);
        }

        var sc_yes = 0;
        var sc_no = 0;
        // for (var i in rows) {
        for (var i = 0; i < subbasin_json.features.length; i++) {
            if (listofSubs.includes(subbasin_json.properties[i]["Subbasin"])) {
                var newCoordinates = [];
                var whichNode = "";

                // var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
                var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);
                //answersArray[oneMap].RATING

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
                    fillColor: color_stripcrop,//"#00ccff",//"#0000FF",//"#87b07e",
                    fillOpacity: poly_opacity,//0.3,//E: By default 1.0 (dark)
                    indexID: whichNode,
                    zIndex: 3
                });
                strip.setMap(basemap_1);

                var sb_stripcrop_match = find(subBasinArray, 'subbasinID', whichNode);
                var jonArray = [];
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
        console.log("L.906 YES strip cropping: " + sc_yes + "  NO strip cropping: " + sc_no);
    }

    // ----- End 'drawStrip1' as polygons

    // ---------------  Start 'drawStrip1' as markers
    function doStripCropping_markers() {
        var obj = find(forMapArray, 'Title', 'strip_cropping');
        if (obj) {
            var listofSubs = obj.subs;
            var strLen = listofSubs.length;
            var listofSubs = listofSubs.slice(0, strLen - 1);
            var listofSubs_num = JSON.parse("[" + listofSubs.slice(0, strLen - 1) + "]");
            //E: above, JSON.parse convert a string into an array of number
            console.log("L.872 listofSubs (strip_cropping): " + listofSubs);
        }

        //Query to create a new JSON of No-Till just with basins with this cons.practice
        var sb_with_sc_only = {};
        sb_with_sc_only.properties = new Array();
        for (var i = 0; i < subbasin_json.features.length; i++) {
            if (listofSubs_num.includes(subbasin_json.properties[i]["Subbasin"])) {
                sb_with_sc_only.properties.push({
                    "subbasin": subbasin_json.properties[i]["Subbasin"],
                    "coord_x": JSON.parse(subbasin_json.properties[i]["grass_x"]),
                    "coord_y": JSON.parse(subbasin_json.properties[i]["grass_y"])
                });
            }
        }
        //     // console.log("sb_with_nt_only: "+ JSON.stringify(sb_with_nt_only.properties));
        //     console.log(sb_with_nt_only.properties.length);

        var sc_marker_yes = 0;
        var sc_marker_no = 0;
        var StripCropping_markers = [];//E: This variable is below used to show label when zoom in/out
        var StripCropping_markers1 = [];//E: This variable for small labels. Above for large labels

        for (var i = 0; i < sb_with_sc_only.properties.length; i++) {
            var newCoordinates = [];
            var whichNode = "";
            var whichNode = sb_with_sc_only.properties[i]["subbasin"];

            // var x_stripcrop = (sb_with_nt_only.properties[i]["coord_x"]);
            var x_stripcrop = (sb_with_sc_only.properties[i]["coord_x"]);
            // var y_stripcrop = (sb_with_sc_only.properties[i]["coord_y"]);
            var y_stripcrop = (sb_with_sc_only.properties[i]["coord_y"]-0.003);
            // console.log("L.1090 coord grass: " + typeof x_stripcrop + " , " + typeof y_stripcrop);
            // console.log("L.1091 coord grass: " + x_stripcrop + " , " + y_stripcrop);

            var newCoordinates = constructNewCoordinatesStripCropping(x_stripcrop, y_stripcrop);
            var geosss = newCoordinates;
            var geop = geosss[0];
            var geop1 = geosss[1];

            StripCropping_markers.push(geop);
            StripCropping_markers1.push(geop1);

            //EE: 'strip' conects to 'g2.php/checkBox_StripCropping(options)' to on/off by its check-button
            strip = geop;//geo;
            strip.setMap(basemap_1);
            stripArray.push(strip);
            strip1 = geop1;//geo;
            strip1.setMap(basemap_1);
            stripArray.push(strip1);
            sc_marker_yes = sc_marker_yes + 1;//sc_marker_yes
        }

        //E: This event makes visible the 'StripCropping' markers when zoom>=12
        google.maps.event.addListener(basemap_1, 'zoom_changed', function() {
            var zoom = basemap_1.getZoom();
            // iterate over markers and call setVisible
            for (i = 0; i < StripCropping_markers.length; i++) {
                StripCropping_markers[i].setVisible(zoom >= 11.5);
            }
        });
        google.maps.event.addListener(basemap_1, 'zoom_changed', function() {
            var zoom = basemap_1.getZoom();
            // iterate over markers and call setVisible
            for (i = 0; i < StripCropping_markers1.length; i++) {
                StripCropping_markers1[i].setVisible(zoom < 11.5);
            }
        });


        //map.fitBounds(bounds);
        console.log("L.1078 YES strip_cropping: " + sc_marker_yes + "  NO strip_cropping: " + sc_marker_no);
    }

    // ---------------  end 'drawStrip1' as markers

    // ------------This piece takes the markers and not shapes for 'Strip-Cropping'
    // function constructNewCoordinatesTill(x, y) {
    function constructNewCoordinatesStripCropping(x, y) {
        var geoOptions = {
            // ------------- For square 'Icon' (Icon from tillIcon)
            // strokeColor: colors[0],
            // strokeOpacity: 0.8,
            // strokeWeight: 1,
            // fillColor: colors[0],
            // fillOpacity: 0.3,
            // icon: tillIcon//E: square 'icon'
            // --------------- For 'text' (SC) as acronym
            label:{text: "(S)",color: '#990000',fontSize: "10px", fontWeight: "bold"},
            icon: label_icon
            // --------------- For 'Icon' from SVG (StripCropping)
            // icon: {
            //     path: 'M 25,1 31,18 49,18 35,29 40,46 25,36 10,46 15,29 1,18 19,18 z',//Star
            //     fillColor: '#666666',fillOpacity: 0.8, scale: 0.18, strokeColor: '#404040', strokeWeight: 1,
            //     zIndex: 100
            // },
            // ----------------- Icon from image.png from localhost
            // icon: star1,
            // visible:false
        };
        var geoOptions1 = {
            label:{text: "(S)",color: '#990000',fontSize: "5px"},
            icon: label_icon
        };

        // var opts = geoOptions;
        // var opts1 = geoOptions1;
        var newCoordinates = [];
        var coordinates = null;
        // var coordinates = polygon['coordinates'];
        var coordinates = [x, y];
        var options = geoOptions || {};//opts || {};
        var options1 = geoOptions1 || {};
        options.position = new google.maps.LatLng(coordinates[1], coordinates[0]);
        options1.position = new google.maps.LatLng(coordinates[1], coordinates[0]);

        geo = new google.maps.Marker(options);
        geo1 = new google.maps.Marker(options1);
        // return geo;
        return [geo,geo1];
    }

    // ------ end 'constructNewCoordinatesStripCropping(Markers)'

    ///////////////////////// End STRIP CROPPING totally ////////////////////////////////


    // ======================== (4) Begin FILTER STRIP///THIS NEEDS TO BE THE POLYLINES  ===================== //

    function doFilterStrips() {
        var obj = find(forMapArray, 'Title', 'filter_strips');
        if (obj) {
            var listofSubs = obj.subs;
            var strLen = listofSubs.length;
            var listofSubs = listofSubs.slice(0, strLen - 1);
            var listofSubs_num = JSON.parse("[" + listofSubs.slice(0, strLen - 1) + "]");
            // var listofSubs = JSON.parse("[" +listofSubs.slice(0, strLen - 1)+ "]");
            //E: above, JSON.parse convert a string into an array of number
            // console.log("L.924 listofSubs (filter_strips): "+ listofSubs);
        }

        //EE: This loop changes the 'geometry.type' name from "LineString" to "Polyline" in json data generated by
        // the python program, to be executed by google chart (otherwise it does not draw lines)
        var streams_for_fs = stream_json;//EE: make a copy of the json-data coming from "/data/stream_g.js"
        for (var i = 0; i < stream_json.features.length; i++) {
            streams_for_fs.features[i].geometry.type = "Polyline";
            // if (i < 5) console.log("L.980 - " + JSON.stringify(streams_for_fs.features[i]));//EE: to see the first coordinates
        }

        var fs_yes = 0;
        var fs_no = 0;
        // for (var i in rows) {
        for (var i = 0; i < streams_for_fs.features.length; i++) {
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
                            filterColor = "#fcb0b0";// "#7cb468";//"#e927c2";
                            break;

                        case ((filterAcre >= 3) && (filterAcre < 6)):
                            filterColor = "#fc7575";// "#559547";//"#bf8811";
                            break;

                        case ((filterAcre >= 6) && (filterAcre < 10)):
                            filterColor = "#fc5050";//"#107c10";//"#7da569";
                            break;

                        case ((filterAcre >= 10) && (filterAcre < 13)):
                            filterColor = "#fc0909";// "#045605";//"#602288";
                            break;

                        case (filterAcre >= 13):
                            filterColor = "#d20000";// "#003301";//"#b10c0c";
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
                    // fillColor: "#daca43",
                    zIndex: 100
                });

                //EE: 'filter' conects to 'g2.php/checkBox_FilterStrip()' to on/off by its check-button
                filter.setMap(basemap_1);
                filterArray.push(filter);
                fs_yes = fs_yes + 1;
            }//E: end if
        }
        //map.fitBounds(bounds);
        console.log("L.1022 YES Filter strip: " + fs_yes + "  NO Filter strip: " + fs_no);
    };

    // ======================= End 'FILTER STRIP' totally ===================== //


    // ++++++++++++++  This is used to parse out the long lats for all the polygons +++++++++++++++++//

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

    // function constructNewCoordinatesLabel(x,y,sb) {
    //     // if (i<5) console.log("i =  "+i+": "+ polygon);
    //     // console.log("i = "+i+" ; subbasin: "+subbasin_json.properties[i]["Subbasin"]+" cont:"+ JSON.stringify(polygon));
    //     var geoOptions = {
    //         strokeColor: colors[0],
    //         strokeOpacity: 0.8,
    //         strokeWeight: 1,
    //         fillColor: colors[0],
    //         fillOpacity: 0.3,
    //         label: "xxx"
    //         // icon: grassIcon
    //     };
    //     var opts = geoOptions;
    //     var newCoordinates_labels = [];
    //     var coordinates = null;
    //     // if (polygon['coordinates']) {
    //     //     var coordinates = polygon['coordinates'];
    //     var coordinates = [x,y];
    //     var options = opts || {};
    //     options.position = new google.maps.LatLng(coordinates[1], coordinates[0]);
    //     geo = new google.maps.Marker(options);
    //     return geo;
    //     // }
    // }
    // +++++++++++ end 'constructNewCoordinates(polygon)'- and - constructNewCoordinatesLabel(label) ++++++++++++ //


    // ===================== (5)  Begin GRASS-WATERWAYS Markers  ====================== //

    function doGrassWaterway() {
        var obj = find(forMapArray, 'Title', 'grassed_waterway');
        if (obj) {
            var listofSubs = obj.subs;
            var strLen = listofSubs.length;
            // var listofSubs = listofSubs.slice(0, strLen - 1);
            var listofSubs = JSON.parse("[" + listofSubs.slice(0, strLen - 1) + "]");
            //E: above, JSON.parse convert a string into an array of number
            console.log("L.1085 listofSubs (grassed_waterway): " + listofSubs);
        }

        var gw_yes = 0;
        var gw_no = 0;
        var GrassWaterway_markers = [];//E: This variable is below used to show label when zoom in/out
        var GrassWaterway_markers1 = [];//E: This variable for small labels. Above for large labels

        for (var i = 0; i < subbasin_json.features.length; i++) {
            if (listofSubs.includes(subbasin_json.properties[i]["Subbasin"])) {
                var newCoordinates = [];
                var whichNode = "";

                // console.log("L.1146  sb: "+rows[i]+": \n"+ JSON.stringify(rows[i][1]['geometry']));
                // if (i<5) console.log("i = "+i+" ; subbasin: "+subbasin_json.properties[i]["Subbasin"]+" cont:"+ JSON.stringify(polygon));

                var x_grass = parseFloat(subbasin_json.properties[i].grass_x);
                var y_grass = parseFloat(subbasin_json.properties[i].grass_y);
                // console.log("L.1031 coord grass: "+ typeof x_grass + " , "+ typeof y_grass);
                // console.log("L.1032 coord grass: "+ x_grass+ " , "+ y_grass);
                var newCoordinates = constructNewCoordinatesGrass(x_grass, y_grass);
                var geosss = newCoordinates;
                var geop = geosss[0];
                var geop1 = geosss[1];

                GrassWaterway_markers.push(geop);
                GrassWaterway_markers1.push(geop1);

                var whichNode = subbasin_json.properties[i]["Subbasin"].toString();

                //EE: 'grass' conects to 'g2.php/checkBox_Grasswaterways(options)' to on/off by its check-button
                grass = geop;//geo;
                grass.setMap(basemap_1);
                grassArray.push(grass);
                grass1 = geop1;
                grass1.setMap(basemap_1);
                grassArray.push(grass1);
                gw_yes = gw_yes + 1;
            }
            else {
                gw_no = gw_no + 1;
                // console.log("L.656 subbasin "+ subbasin_json.properties[i]["Subbasin"]+ " does not include CR")
            }
        }

        //E: This event makes visible the 'StripCropping' markers when zoom>=12
        google.maps.event.addListener(basemap_1, 'zoom_changed', function() {
            var zoom = basemap_1.getZoom();
            // iterate over markers and call setVisible
            for (i = 0; i < GrassWaterway_markers.length; i++) {
                GrassWaterway_markers[i].setVisible(zoom >= 11.5);
            }
        });
        google.maps.event.addListener(basemap_1, 'zoom_changed', function() {
            var zoom = basemap_1.getZoom();
            // iterate over markers and call setVisible
            for (i = 0; i < GrassWaterway_markers1.length; i++) {
                GrassWaterway_markers1[i].setVisible(zoom < 11.5);
            }
        });


        //map.fitBounds(bounds);
        console.log("L.1143 YES grasswaterways: " + gw_yes + "  NO grasswaterways: " + gw_no);
    }

    // ------- Construction of coordinates for GRASSWATERWAYS
    // function constructNewCoordinatesGrass(polygon) {
    function constructNewCoordinatesGrass(x, y) {
        // if (i<5) console.log("i =  "+i+": "+ polygon);
        // console.log("i = "+i+" ; subbasin: "+subbasin_json.properties[i]["Subbasin"]+" cont:"+ JSON.stringify(polygon));
        var geoOptions = {
            // ---------------------  For 'Icon'
            // strokeColor: colors[0],//E: Turn-off for 'text' label
            // strokeOpacity: 0.8,
            // strokeWeight: 1,
            // fillColor: colors[0],
            // fillOpacity: 0.3,
            // icon: grassIcon
            // ---------------------- For 'Text' (acronym)
            label:{text: "(G)",color: '#000000',fontSize: "10px", fontWeight: "bold"},
            // // // label: "abc",
            icon: label_icon
            // ---------------------- For 'Icon' from SVG
            // icon: {
                // path: 'M 50,1 50,50 1,50 1,1 z',//E: path for square
                // path:'M 50,25 47.5,35.9 45,40 40,45 30,49.5 25,50 20,49.5 15,47.9 10,45 5,40 2.5,35.9 0,25 2.5,14.1' +
                // ' 5,10 10,5 15,2.1 20,0.5 25,0 30,0.5 40,5 45,10 47.5,14.1 z',//E: path for circle
                // fillColor: '#ffffff',
                // fillOpacity: 0.2, scale: 0.25, strokeColor: '#737373', strokeWeight: 1,
                // zIndex: 1
            // }
        };
        var geoOptions1 = {
            label:{text: "(G)",color: '#000000',fontSize: "5px"},
            icon: label_icon
        };

        // var opts = geoOptions;
        // var opts1 = geoOptions1;
        var newCoordinates = [];
        var coordinates = null;
        //     var coordinates = polygon['coordinates'];
        var coordinates = [x, y];
        var options = geoOptions || {};//opts || {};
        var options1 = geoOptions1 || {};
        options.position = new google.maps.LatLng(coordinates[1], coordinates[0]);
        options1.position = new google.maps.LatLng(coordinates[1], coordinates[0]);

        geo = new google.maps.Marker(options);
        geo1 = new google.maps.Marker(options1);
        // return geo;
        return [geo,geo1];
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
            var listofSubs_num = JSON.parse("[" + listofSubs.slice(0, strLen - 1) + "]");
            //E: above, JSON.parse convert a string into an array of number
            console.log("L.1188 listofSubs (conservation_tillage): " + listofSubs);
        }

        //Query to create a new JSON of No-Till just with basins with this cons.practice
        var sb_with_nt_only = {};
        sb_with_nt_only.properties = new Array();
        for (var i = 0; i < subbasin_json.features.length; i++) {
            if (listofSubs_num.includes(subbasin_json.properties[i]["Subbasin"])) {
                sb_with_nt_only.properties.push({
                    "subbasin": subbasin_json.properties[i]["Subbasin"],
                    "coord_x": JSON.parse(subbasin_json.properties[i]["grass_x"]),
                    "coord_y": JSON.parse(subbasin_json.properties[i]["grass_y"])
                });
            }
        }
        //     // console.log("sb_with_nt_only: "+ JSON.stringify(sb_with_nt_only.properties));
        //     console.log(sb_with_nt_only.properties.length);

        var nt_yes = 0;
        var nt_no = 0;
        var ConserveTillage_markers = [];//E: This variable is below used to show label when zoom in/out
        var ConserveTillage_markers1 = [];//E: This variable for small labels. Above for large labels

        for (var i = 0; i < sb_with_nt_only.properties.length; i++) {
            var newCoordinates = [];
            var whichNode = "";
            // var row = rows[i];//EE: not needed when json data

            var whichNode = sb_with_nt_only.properties[i]["subbasin"];

            var x_notill = (sb_with_nt_only.properties[i]["coord_x"]);
            // var y_notill = (sb_with_nt_only.properties[i]["coord_y"]);
            var y_notill = (sb_with_nt_only.properties[i]["coord_y"] + 0.003);
            // console.log("L.1423 coord grass: " + typeof x_notill + " , " + typeof y_notill);
            // console.log("L.1424 coord grass: " + x_notill + " , " + y_notill);

            var newCoordinates = constructNewCoordinatesTill(x_notill, y_notill);
            var geosss = newCoordinates;
            var geop = geosss[0];
            var geop1 = geosss[1];

            ConserveTillage_markers.push(geop);
            ConserveTillage_markers1.push(geop1);

            notill = geop;
            notill.setMap(basemap_1);
            conserveArray.push(notill);
            notill = geop1;
            notill.setMap(basemap_1);
            conserveArray.push(notill);
            nt_yes = nt_yes + 1;
        }


        //E: This event makes visible the 'StripCropping' markers when zoom>=12
        google.maps.event.addListener(basemap_1, 'zoom_changed', function() {
            var zoom = basemap_1.getZoom();
            // iterate over markers and call setVisible
            for (i = 0; i < ConserveTillage_markers.length; i++) {
                ConserveTillage_markers[i].setVisible(zoom >= 11.5);
            }
        });
        google.maps.event.addListener(basemap_1, 'zoom_changed', function() {
            var zoom = basemap_1.getZoom();
            // iterate over markers and call setVisible
            for (i = 0; i < ConserveTillage_markers1.length; i++) {
                ConserveTillage_markers1[i].setVisible(zoom < 11.5);
            }
        });


        //map.fitBounds(bounds);
        console.log("L.1251 YES Conservation-tillage: " + nt_yes + "  NO Conservation-tillage: " + nt_no);
    }

    //   ------- end 'drawTill1'

    // ------------This piece takes the markers and not shapes for No Till
    function constructNewCoordinatesTill(x, y) {
        var geoOptions = {
            // ----------------------- For Icon
            // strokeColor: colors[0],
            // strokeOpacity: 0.8,
            // strokeWeight: 1,
            // fillColor: colors[0],
            // fillOpacity: 0.3,
            // icon: tillIcon
            // ---------------------- For 'text' acronym
            label: {text: "(T)", color: '#0033cc', fontSize: "10px", fontWeight: "bold"},
            //E: This 'label_icon' comes from 'dolabels()' which retrieves a DOM (box) from g2.php. Without this
            // Box, the label is shown with balloons.
            icon: label_icon//E: It comes from converting 'svg_to_img2('label_rect')'

            // --------------- 'Icon' by drawing using coordinates (NoTill)
            // icon: {
            //     path: 'M 50,1 50,50 1,50 1,1 z',//E: Square
            //     fillColor: '#ffffff',fillOpacity: 0.5, scale: 0.18, strokeColor: '#404040', strokeWeight: 1,
            //     zIndex: 1
            // }

        };
        var geoOptions1 = {
            label: {text: "(T)", color: '#0033cc', fontSize: "5px"},
            icon: label_icon//E: It comes from converting 'svg_to_img2('label_rect')'
        };

        // var opts = geoOptions;
        // var opts1 = geoOptions1;
        var newCoordinates = [];
        var coordinates = null;
        // if (polygon['coordinates']) {
        // var coordinates = polygon['coordinates'];
        var coordinates = [x, y];
        var options = geoOptions || {};//opts || {};
        var options1 = geoOptions1 || {};
        options.position = new google.maps.LatLng(coordinates[1], coordinates[0]);
        options1.position = new google.maps.LatLng(coordinates[1], coordinates[0]);

        geo = new google.maps.Marker(options);
        geo1 = new google.maps.Marker(options1);
        // return geo;
        return [geo,geo1];
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
            var listofSubs = JSON.parse("[" + listofSubs.slice(0, strLen - 1) + "]");
            // //E: above, JSON.parse convert a string into an array of number
            console.log("L.1293 listofSubs (Wetlands): " + listofSubs);
        }

        //EE: function to convert SVG To Image(SVG) {
        function svg_to_img(arg1) {
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
        for (var i = 0; i < subbasin_json.features.length; i++) {
            if (listofSubs.includes(subbasin_json.properties[i]["Subbasin"])) {
                var newCoordinates = [];
                var whichNode = "";
                var whichNode = subbasin_json.properties[i]["Subbasin"].toString();

                var sb_wet_match = find(subBasinArray, 'subbasinID', whichNode);
                if (i < 10) console.log("L.1317 sb_wet_match: " + JSON.stringify(sb_wet_match));
                // alert(JSON.stringify(subBasinArray));
                if (sb_wet_match) {
                    // wetlandsize = obj.variable_area_wetlands;
                    wetlandsize = sb_wet_match.variable_area_wetlands;
                    if (i < 10) console.log("L.1322 wetlandsize: " + wetlandsize);
                    switch (true) {
                        case (wetlandsize == 0):
                            wetlandsIcon = "";
                            break;

                        case (wetlandsize < 2):
                            wetlandsIcon = svg_to_img('svg1');
                            break;

                        case ((wetlandsize >= 2) && (wetlandsize < 6)):
                            wetlandsIcon = svg_to_img('svg2');
                            break;

                        case ((wetlandsize >= 6) && (wetlandsize < 11)):
                            wetlandsIcon = svg_to_img('svg3');
                            break;

                        case ((wetlandsize >= 11) && (wetlandsize < 15)):
                            wetlandsIcon = svg_to_img('svg4');
                            break;

                        case ((wetlandsize >= 15) && (wetlandsize < 29)):
                            wetlandsIcon = svg_to_img('svg5');
                            break;

                        case ((wetlandsize >= 29) && (wetlandsize < 40)):
                            wetlandsIcon = svg_to_img('svg6');
                            break;

                        case ((wetlandsize >= 40)):
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
                var newCoordinates = constructNewCoordinatesWet(x_wetland, y_wetland);

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
        console.log("L.1390 YES wetlands: " + wt_yes + "  NO wetlands: " + wt_no);
    };
    // -------------- end 'drawWet1'

    // ------------- This is the new piece that takes the markers and not shapes
    // function constructNewCoordinatesWet(polygon) {
    function constructNewCoordinatesWet(x, y) {
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
        var coordinates = [x, y];
        var options = opts || {};
        options.position = new google.maps.LatLng(coordinates[1], coordinates[0]);
        geo = new google.maps.Marker(options);
        return geo;
        // }
    }

    // ------- end 'constructNewCoordinatesWet(polygon)'

    // =====================  End WETLANDS totally ===================== //


    // ===================== (0-b)  Begin 'doLabels'  ====================== //

    function dolabels() {
        var obj = find(forMapArray, 'Title', 'grassed_waterway');
        if (obj) {
            var listofSubs = obj.subs;
            var strLen = listofSubs.length;
            // var listofSubs = listofSubs.slice(0, strLen - 1);
            var listofSubs = JSON.parse("[" + listofSubs.slice(0, strLen - 1) + "]");
            //E: above, JSON.parse convert a string into an array of number
            // console.log("L.1109 listofSubs (grassed_waterway): "+ listofSubs);
        }

        var lb_yes = 0;
        var lb_no = 0;
        var label_markers = [];
        for (var i = 0; i < subbasin_json.features.length; i++) {
            // if (listofSubs.includes(subbasin_json.properties[i]["Subbasin"])) {
            var newCoordinates = [];
            var whichNode = "";
            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();
            label_icon = svg_to_img2('label_rect');
            var label_icon2 = document.getElementById('star1');

            var x_label = parseFloat(subbasin_json.properties[i].label_x);
            var y_label = parseFloat(subbasin_json.properties[i].label_y);
            // console.log("L.1158 coord grass: "+ x_grass+ " , "+ y_grass);
            var newCoordinates = constructNewCoordinatesLabel(x_label, y_label, whichNode);
            label_markers.push(geo);


            //EE: this part interacts with the click-box to off/on the symbol. In this case, this symbol (node) is
            // linked to 'grass'
            grass = geo;
            grass.setMap(basemap_1);
            grassArray.push(grass);
            lb_yes = lb_yes + 1;
            // }
        }

        //E: This event makes visible the label markers when zoom>=12
        google.maps.event.addListener(basemap_1, 'zoom_changed', function() {
            var zoom = basemap_1.getZoom();
            // iterate over markers and call setVisible
            for (i = 0; i < label_markers.length; i++) {
                label_markers[i].setVisible(zoom >= 12);
            }
        });

        console.log("L.1514 YES Labels: " + lb_yes + "  NO Labels: " + lb_no);

        //EE: function to convert SVG To Image(SVG) {
        function svg_to_img2(arg1) {
            var svg = document.getElementById(arg1);
            var xml = new XMLSerializer().serializeToString(svg);
            var svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))
            var b64start = 'data:image/svg+xml;base64,';
            var image64 = b64start + svg64;
            return image64;
        }
    }

    // ------- Construction of coordinates for LABELS
    function constructNewCoordinatesLabel(x, y, node) {//E: 'node' carries 'the number of subbasin'
        var geoOptions = {
            label: {text: node, color: '#666666', fontSize: "11px"},
            icon: label_icon,
            visible:false
        };
        // var opts = geoOptions;
        var newCoordinates = [];
        var coordinates = null;
        var coordinates = [x, y];
        // var options = opts || {};
        // options.position = new google.maps.LatLng(coordinates[1], coordinates[0]);
        geoOptions.position = new google.maps.LatLng(coordinates[1], coordinates[0]);

        geo = new google.maps.Marker(geoOptions);
        return geo;
    }

    // ------ end 'constructNewCoordinatesLabel'

    // ======================= END LABEL (----) totally ==================== //
}
    ///END MAPPING FUNCTIONs

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


// =================//////// (*)  Begin highlight Sub-basin  ============/////////
//E: This function activates by default the whole watershed border (called Subbasin 0)
function add_sb0(n_sb) {//E: n_sb=131 (because of ecw has 130 subbasins)
    for (i=0; i < n_sb; i++){
        var sb_null = eval("poly_sb"+i);//E: convert a string into a variable name
        sb_null.setMap(null);
    }
    poly_sb0.setMap(basemap_1);
    // poly_sb0.setMap(heatmapPF1);
}

//E: This function deactivates all subbasins, and activates the selected subbasin (from 1-130 for ecw)
//E: This function is called from g2.php (L.510)
function select_sb(){
    var n_sb = 131;//EE: 130 for ecw

    var selected_sb = subDrop[subDrop.selectedIndex].value;
    if (selected_sb == "Watershed") {
        // alert("Selected: ----- "+ selected_sb);
        for (i=0; i < n_sb; i++){
            var sb_null = eval("poly_sb"+i);//E: convert a string into a variable name
            sb_null.setMap(null);//E: turn-off all subbasins
        }
        // var sb_act = eval("poly_sb"+number_sb);//E: turn-on the selected subbasin
        // alert("L.1536: "+ number_sb);
        poly_sb0.setMap(basemap_1);
    }
    else {
        // var number_sb = selected_sb.match(/\d/g);//E: Get the number part of the string for ex. "subbasin 1", get 1
        var number_sb = selected_sb.match(/\d/g).join("");
        for (i=0; i<n_sb;i++){
            var sb_null = eval("poly_sb"+i);//E: convert a string into a variable name
            sb_null.setMap(null);//E: turn-off all subbasins
        }
        var sb_act = eval("poly_sb"+number_sb);//E: turn-on the selected subbasin
        // alert("L.1536: sub-basin selected:  "+ number_sb);
        sb_act.setMap(basemap_1);
    }
}
// =================================== (*) End highlight Sub-basin  =============================//



