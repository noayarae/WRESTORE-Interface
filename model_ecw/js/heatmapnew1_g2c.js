function heatinitialize() {
    // var cccc = 0;
    //empty the div that shows all the data if they click on a sub basin
    // var PeakArray=[];

    //var option = document.getElementById('heatDrop').value-1;
    $('#oneMapPF').empty();
    // $('#oneMapPF').append('Range+: (' + heatpfra[oneMap].val[0].val + ' to ' + heatpfra[oneMap].val[126].val +') cfs');
    var min_value_PF1 = PFR_meanVals_array[oneMap].val[0].val;//mk: Get the min value of mean values of PFR
    var max_value_PF1 = PFR_meanVals_array[oneMap].val[129].val;//mk: Get the max value of mean values of PFR
    console.log("L.11 'min_value_PF1': "+ min_value_PF1);
    console.log("L.12 'max_value_PF1': "+ max_value_PF1);

    $('#oneMapRV').empty();
    // $('#oneMapRV').append('Range: (' + heatera[oneMap].val[0].val + ' to ' + heatera[oneMap].val[126].val +') Dollars');
    var min_value_RV1 = Cost_meanVals_array[oneMap].val[0].val;//mk
    var max_value_RV1 = Cost_meanVals_array[oneMap].val[129].val;//mk

    $('#oneMapSR').empty();
    // $('#oneMapSR').append('Range: (' + heatseda[oneMap].val[0].val + ' to ' + heatseda[oneMap].val[126].val +') tons');
    var min_value_SR1 = SR_meanVals_array[oneMap].val[0].val;//mk
    var max_value_SR1 = SR_meanVals_array[oneMap].val[129].val;//mk

    $('#oneMapNR').empty();
    // $('#oneMapNR').append('Range: (' + heatnita[oneMap].val[0].val + ' to ' + heatnita[oneMap].val[126].val +') kilograms');
    var min_value_NR1 = NR_meanVals_array[oneMap].val[0].val;//mk
    var max_value_NR1 = NR_meanVals_array[oneMap].val[129].val;//mk

    //// --------------  These new variables are setup for building the map-legend  --------------------
    //
    var maps = ['oneMapPF','oneMapRV','oneMapSR','oneMapNR'];
    var min_values = [min_value_PF1, min_value_RV1, min_value_SR1, min_value_NR1];
    var max_values = [max_value_PF1, max_value_RV1, max_value_SR1, max_value_NR1];

    ////  ---------------  These variables are used to set ranges for maps  -----------------------
    //E: These 4 code-pieces extract only the number corresponding to subbasin number from 'PFR_meanVals_array'
    var ressssPF1 = PFR_meanVals_array[oneMap].val.map(function(a) {
        console.log ("L.38 ressssPF1: "+ JSON.stringify(ressssPF1));
        return a.name;
    });

    var ressssRV1 = Cost_meanVals_array[oneMap].val.map(function(a) {
        return a.name;
    });

    var ressssSR1 = SR_meanVals_array[oneMap].val.map(function(a) {
        return a.name;
    });

    var ressssNR1 = NR_meanVals_array[oneMap].val.map(function(a) {
        return a.name;
    });

    // ========================== Set BASE-MAPS google.map - 4 maps in total ===================== //
    // ======================  ---------  Set and Add Base-Map for PFR  ------- ======================== //
    // Draw the base-map for PFR
    heatmapPF1 = new google.maps.Map(document.getElementById('heatmap_canvasPF1'), {
        center: new google.maps.LatLng(39.9778, -86.2959),
        zoom: 10,
        disableDefaultUI: true, // it disables all default icons from google map
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // These three lines add an icon over the map (heatmap) to make zoom out(Fullscreen)
    $('#fullscreen_heatmap1').click(function() {
        // document.getElementById("fullscreen_heatmap2").style.display = "none";
        $('#heatmap_canvasPF1 div.gm-style button[title="Toggle fullscreen view"]').trigger('click');
        // cccc = 1;

        // Add fullscreen's events. When they are out (close fullscreen), they are captured and reported into the DB
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', exitHandler1, false);
            document.addEventListener('mozfullscreenchange', exitHandler1, false);
            document.addEventListener('fullscreenchange', exitHandler1, false);
            document.addEventListener('MSFullscreenChange', exitHandler1, false);
        }
        // This function captures the close-fullscreen and reports into the DDBB
        function exitHandler1() {
            if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                // alert("hello");
                report('m-clk*** ','close_fullscreen heatmap PFR');
                document.removeEventListener("webkitfullscreenchange", exitHandler1);
                document.removeEventListener('mozfullscreenchange', exitHandler1);
                document.removeEventListener('fullscreenchange', exitHandler1);
                document.removeEventListener('MSFullscreenChange', exitHandler1);
            }
        }
    });

    // -------------- Start: Set variables and call the Function to build the PFR-Legend in heatmap ----------- //
    // E: a) Set a custom button into the heatmap to display the legend
    // E: b) Call the function "buttonControl_pfrs" located around 2044 in g2.php
    var buttonOptions_1 = {
        gmap: heatmapPF1,
        name: 'Legend ',
        position: google.maps.ControlPosition.TOP_RIGHT,
        // action: function(){
        //     // map1.panTo(new google.maps.LatLng(-33.9, 151.2));
        //     jQuery('.heatMapLegend_container_pfr').toggle('show');
        //     // report('m-clk*** ' , 'Legend pfr ssssssss ');
        //     // alert("L:103 heatmapnew1.js " + "  button added.. ");
        // }
    };

    //EE: Definition of Ranges and colors
    var rg_pfr= [0,1,10,50,100,200,500,1600];
    var rg_sr = [0,100,500,1000,2500,5000,10000,18000];
    var rg_nr = [-350,0,1000,5000,15000,30000,100000,800000];
    var rg_pr = [-450000,0,1000,50000,500000,1000000,2000000,4800000];
    var colorList = {
        color1: '#ffffff',
        color2: '#ffff00',
        color3: '#ffcc00',
        color4: '#ff9900',
        color5: '#ff6600',//'#ff6600',//'#66ff33',//'#ff6600', test '#66ff33'
        color6: '#ff0000',//'#e60000',//'#ff3300',//#e60000
        color7: '#cc0000'//'#cc0000'//'#990000'//'#ff0000', test '#0066ff'
    };
    var mapa = maps[0];
    var min_value = min_values[0];
    var max_value = max_values[0];
    // alert("Line:111-heatmapnew1.js: " + " map: " + mapa + "  min: " + min_value + "  max: " + max_value);
    var button1 = new buttonControl_pfr(buttonOptions_1, colorList, mapa, min_value, max_value, rg_pfr);//E: located around
    // 2044 in g2.php
    // --------------- End: Set vars and call the Function to build the PFR-Legend in heatmap ----------------- //


    // ====================  ---------  (2) Set and Add Base-Map for PROFIT  ------------ ======================== //
    // Draw the base-map for PROFIT
    heatmapRV1 = new google.maps.Map(document.getElementById('heatmap_canvasRV1'), {
        center: new google.maps.LatLng(39.9778, -86.2959),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true // it disables all default icons from google map
    });

    // This three lines add an icon over the map (heatmap)
    $('#fullscreen_heatmap2').click(function() {
        $('#heatmap_canvasRV1 div.gm-style button[title="Toggle fullscreen view"]').trigger('click');

        // Add fullscreen's events. When they are out (close fullscreen), they are captured and reported into the DB
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', exitHandler2, false);
            document.addEventListener('mozfullscreenchange', exitHandler2, false);
            document.addEventListener('fullscreenchange', exitHandler2, false);
            document.addEventListener('MSFullscreenChange', exitHandler2, false);
        }
        // This function captures the close-fullscreen and reports into the DDBB
        function exitHandler2() {
            if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                // alert("hello");
                report('m-clk*** ','close_fullscreen heatmap CR');
                document.removeEventListener("webkitfullscreenchange", exitHandler2);
                document.removeEventListener('mozfullscreenchange', exitHandler2);
                document.removeEventListener('fullscreenchange', exitHandler2);
                document.removeEventListener('MSFullscreenChange', exitHandler2);
            }
        }
    });

    // ----------------- Start: Set variables and call the Function to build the PROFIT-Legend in heatmap  -------- //
    // E: 1) Set a custom button into the heatmap to display the legend
    // E: 2) Call the function "buttonControl_cr" located around 2130 in g2.php
    var buttonOptions_1 = {
        gmap: heatmapRV1,
        name: 'Legend ',
        position: google.maps.ControlPosition.TOP_RIGHT,
        // action: function(){
        //     // map1.panTo(new google.maps.LatLng(-33.9, 151.2));
        //     jQuery('.heatMapLegend_container_cr').toggle('show');
        //     // alert("L:103 heatmapnew1.js " + "  button added.. ");
        // }
    };

    // var colorList = {color1: '#ffffff', color2: '#ffff00', color3: '#ffcc00', color4: '#ff9900', color5: '#ff6600', color6: '#ff3300', color7: '#ff0000'};
    var mapa = maps[1];
    var min_value = min_values[1];
    var max_value = max_values[1];
    // alert("Line:111-heatmapnew1.js: " + " map: " + mapa + "  min: " + min_value + "  max: " + max_value);
    var button1 = new buttonControl_cr(buttonOptions_1, colorList, mapa, min_value, max_value, rg_pr);//E: located around
    // 2130 in g2.php
    // --------------- End: Set vars and call the Function for PROFIT-Legend in heatmap ----------------- //


    // ======================  ---------  (3) Set and Add Base-Map for SR  ------------ ======================== //
    // Draw the base-map for SR
    heatmapSR1 = new google.maps.Map(document.getElementById('heatmap_canvasSR1'), {
        center: new google.maps.LatLng(39.9778, -86.2959),
        zoom: 10,
        disableDefaultUI: true, // it disables all default icons from google map
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // These three lines add an icon over the map (heatmap) Fullscreen
    $('#fullscreen_heatmap3').click(function() {
        $('#heatmap_canvasSR1 div.gm-style button[title="Toggle fullscreen view"]').trigger('click');

        // Add fullscreen's events. When they are out (close fullscreen), they are captured and reported into the DB
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', exitHandler3, false);
            document.addEventListener('mozfullscreenchange', exitHandler3, false);
            document.addEventListener('fullscreenchange', exitHandler3, false);
            document.addEventListener('MSFullscreenChange', exitHandler3, false);
        }
        // This function captures the close-fullscreen and reports into the DDBB
        function exitHandler3() {
            if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                // alert("hello");
                report('m-clk*** ','close_fullscreen heatmap SR');
                document.removeEventListener("webkitfullscreenchange", exitHandler3);
                document.removeEventListener('mozfullscreenchange', exitHandler3);
                document.removeEventListener('fullscreenchange', exitHandler3);
                document.removeEventListener('MSFullscreenChange', exitHandler3);
            }
        }
    });

    // ------------- Start: Set vars and call the Function to build the SR-Legend in heatmap --------------- //
    // E: 1) Set a custom button into the heatmap to display the legend
    // E: 2) Call the function "buttonControl_sr" located around 2215 in g2.php
    var buttonOptions_1 = {
        gmap: heatmapSR1,
        name: 'Legend ',
        position: google.maps.ControlPosition.TOP_RIGHT,
        // action: function(){
        //     // map1.panTo(new google.maps.LatLng(-33.9, 151.2));
        //     jQuery('.heatMapLegend_container_sr').toggle('show');
        //     // alert("L:103 heatmapnew1.js " + "  button added.. ");
        // }
    };

    // var colorList = {color1: '#ffffff', color2: '#ffff00', color3: '#ffcc00', color4: '#ff9900', color5: '#ff6600', color6: '#ff3300', color7: '#ff0000'};
    var mapa = maps[2];
    var min_value = min_values[2];
    var max_value = max_values[2];
    // alert("Line:111-heatmapnew1.js: " + " map: " + mapa + "  min: " + min_value + "  max: " + max_value);
    var button1 = new buttonControl_sr(buttonOptions_1, colorList, mapa, min_value, max_value,rg_sr);//E: located around
    // 2215 in g2.php

    // --------------- End: Set vars and call the Function for SR-Legend in heatmap ----------------- //

    // ================  ---------  (4) Add Base-Map for NR  ------------ ======================== //
    // Draw the base-map for NR
    heatmapNR1 = new google.maps.Map(document.getElementById('heatmap_canvasNR1'), {
        center: new google.maps.LatLng(39.9778, -86.2959),
        zoom: 10,
        disableDefaultUI: true, // it disables all default icons from google map
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // These three lines add an icon over the map (heatmap)
    $('#fullscreen_heatmap4').click(function() {
        // $("#heatmap_canvasSR1").hide()
        $('#heatmap_canvasNR1 div.gm-style button[title="Toggle fullscreen view"]').trigger('click');

        // Add fullscreen's events. When they are out (close fullscreen), they are captured and reported into the DB
        if (document.addEventListener) {
            document.addEventListener('webkitfullscreenchange', exitHandler4, false);
            document.addEventListener('mozfullscreenchange', exitHandler4, false);
            document.addEventListener('fullscreenchange', exitHandler4, false);
            document.addEventListener('MSFullscreenChange', exitHandler4, false);
        }
        // This function captures the close-fullscreen and reports into the DDBB
        function exitHandler4() {
            if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
                // alert("hello");
                report('m-clk*** ','close_fullscreen heatmap NR');
                document.removeEventListener("webkitfullscreenchange", exitHandler4);
                document.removeEventListener('mozfullscreenchange', exitHandler4);
                document.removeEventListener('fullscreenchange', exitHandler4);
                document.removeEventListener('MSFullscreenChange', exitHandler4);
            }
        }
    });

    // ----------------- Start: Set vars and call the Function to build the NR-Legend in heatmap --------------- //
    // E: a) Set a custom button into the heatmap to display the legend
    // E: b) Call the function "buttonControl_nr" located around 2300 in g2.php
    var buttonOptions_1 = {
        gmap: heatmapNR1,
        name: 'Legend ',
        position: google.maps.ControlPosition.TOP_RIGHT,
        // action: function(){
        //     // map1.panTo(new google.maps.LatLng(-33.9, 151.2));
        //     jQuery('.heatMapLegend_container_nr').toggle('show');
        // }
    };

    // var colorList = {color1: '#ffffff', color2: '#ffff00', color3: '#ffcc00', color4: '#ff9900', color5: '#ff6600', color6: '#ff3300', color7: '#ff0000'};
    var mapa = maps[3];
    var min_value = min_values[3];
    var max_value = max_values[3];
    // alert("Line:111-heatmapnew1.js: " + " map: " + mapa + "  min: " + min_value + "  max: " + max_value);
    var button1 = new buttonControl_nr(buttonOptions_1, colorList, mapa, min_value, max_value, rg_nr);//E: located around
    // 2300 in g2.php
    // --------------- End: Set vars and call the Function for NR-Legend in heatmap ----------------- //
    // ====================================================================================== //


    // =============================  do  doheatmaps  ============================= //
    doheatPF1();
    doheatRV1();
    doheatSR1();
    doheatNR1();

    // ----------------------- Start:  set coordinates for maps ---------------------- //
    function constructNewCoordinates(polygon) {
        var newCoordinates = [];
        var coordinates = null;
        if (polygon['coordinates']) coordinates = polygon['coordinates'];
        if (coordinates.length == 1) {
            coordinates = coordinates[0];
        }
        for (var i in coordinates) {
            newCoordinates.push(new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
            //bounds.extend(newCoordinates[i]);
        }
        return newCoordinates;
    }
    // ----------------------- End:  set coordinates for maps ----------------------

    // --------------  Start all related to "PF" (doheatPF1,"drawHeatPF1", doheatPF2, "drawHeatPF2") ----------------
    // ----------------  Start doheartPF1 ------------
    function doheatPF1() {

        for (var i = 0; i < subbasin_json.features.length; i++) {//EE 'map_data.features.length' = 130 (# of subbasins)
            var newCoordinates = [];
            var whichNode = "";

            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E: For "ecw" needs to convert to string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"

            //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
            // var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);
            var indexx = ressssPF1.indexOf(Number(whichNode));
            var pfr_val_current_sb_and_alt = PFR_meanVals_array[oneMap].val[indexx].val;
            // console.log("L.319 Checking the current # of suggestion: "+ (oneMap+1));
            // console.log ("L.317 'sb': "+ whichNode +"  indexx: "+ indexx+" value: "+JSON.stringify(PFR_meanVals_array[oneMap].val[indexx].val));
            // console.log("L.318 :\n"+ JSON.stringify(PFR_meanVals_array.length));
            //E: below shows PFR_meanVals_array for the current suggestion (alternative)
            // console.log("L.322 :\n"+ JSON.stringify(PFR_meanVals_array[oneMap]));
            // console.log("L.323 'PFR_meanVals_array[oneMap][\"val\"]' length :"+ JSON.stringify(PFR_meanVals_array[oneMap]["val"].length));//E:

            // switch (true) {
            //     case (indexx < 0):filterColor = "#ffffff";//"#000000"; // #ffffff// 3 subbasins
            //         break;
            //     case (indexx < 20): filterColor = "#ffff00";//20 subbasins
            //         break;
            //     case ((indexx >= 20) && (indexx < 40)): filterColor = "#ffcc00";//"#0033cc";//"#ffcc00";//20 subbasins
            //         break;
            //     case ((indexx >= 40) && (indexx < 70)): filterColor = "#ff9900";//"#33cc33";//"#ff9900";//30 subabsins
            //         break;
            //     case ((indexx >= 70) && (indexx < 90)): filterColor = "#ff6600";//"#00ffff";//"#ff6600";//20 subbasins
            //         break;
            //     case (indexx >= 90): filterColor = "#ff3300";//"#ff3388";//"#ff3300";//37 subbasins
            //         break;
            //     default: filterColor = "#ff0000";//"#aa9999";//"#ff0000";//
            //         break;
            // }

            // var rg_pfr = [1,10,50,100,200,500,1000];
            switch (true) {
                case ((pfr_val_current_sb_and_alt >= rg_pfr[0])&&(pfr_val_current_sb_and_alt < rg_pfr[1])):filterColor = colorList["color1"];//"#ffffff";//
                    break;
                case ((pfr_val_current_sb_and_alt >= rg_pfr[1])&&(pfr_val_current_sb_and_alt < rg_pfr[2])): filterColor = colorList["color2"];//"#ffff00";
                    break;
                case ((pfr_val_current_sb_and_alt >= rg_pfr[2])&&(pfr_val_current_sb_and_alt < rg_pfr[3])): filterColor = colorList["color3"];//"#ffcc00";
                    break;
                case ((pfr_val_current_sb_and_alt >= rg_pfr[3])&&(pfr_val_current_sb_and_alt < rg_pfr[4])): filterColor = colorList["color4"];//"#ff9900";
                    break;
                case ((pfr_val_current_sb_and_alt >= rg_pfr[4])&&(pfr_val_current_sb_and_alt < rg_pfr[5])): filterColor = colorList.color5;//"#ff6600";
                    break;
                case ((pfr_val_current_sb_and_alt >= rg_pfr[5])&&(pfr_val_current_sb_and_alt < rg_pfr[6])): filterColor = colorList["color6"];//"#ff3300";
                    break;
                case ((pfr_val_current_sb_and_alt >= rg_pfr[6])&&(pfr_val_current_sb_and_alt < rg_pfr[7])): filterColor = colorList["color7"];//"#ff0000";
                    break;
                default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
                    break;
            }

            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E:For "ecw" needs to converto string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-McKay"
            Peakflow = new google.maps.Polygon({
                path: newCoordinates,
                //strokeColor: colors[0],
                strokeOpacity: .4,
                strokeWeight: 1,
                fillOpacity: 1,
                fillColor: filterColor,
                indexID: whichNode,
                clickable: true
            });

            Peakflow.setMap(heatmapPF1);
        }
    };
    // --------------  End all related to "PF" (doheatPF1,"drawHeatPF1", doheatPF2, "drawHeatPF2") ----------------

    // --------------  Start all related to "PROFIT" (doheatRV1,"drawHeatRV1", doheatRV2, "drawHeatRV2") ------------
    // ---------------------------------  Start doheatRV1() --------------------------------
    function doheatRV1() {

        // var rows = data['rows'];//EE: not needed when json data
        // for (var i in rows) {
        for (var i = 0; i < subbasin_json.features.length; i++) {//EE 'map_data.features.length' = 130 (# of subbasins)
            var newCoordinates = [];
            var whichNode = "";
            //var geometries = rows[i][1]['geometry'];
            //alert (geometries)//newly added code...
            // var row = rows[i];//EE: not needed when json data
            // var whichNode = row[0];
            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E: For "ecw" needs to convert to string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"

            //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
            // var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);
            var indexx = ressssRV1.indexOf(Number(whichNode));
            var c_val_current_sb_and_alt = Cost_meanVals_array[oneMap].val[indexx].val;

            // switch (true) {
            //     case (indexx < 0): filterColor = "#ffffff";
            //         break;
            //     case (indexx < 20): filterColor = "#ffff00";
            //         break;
            //     case ((indexx >= 20) && (indexx < 40)): filterColor = "#ffcc00";
            //         break;
            //     case ((indexx >= 40) && (indexx < 70)): filterColor = "#ff9900";
            //         break;
            //     case ((indexx >= 70) && (indexx < 90)): filterColor = "#ff6600";
            //         break;
            //     case (indexx >= 90): filterColor = "#ff3300";
            //         break;
            //     default: filterColor = "#aa9999";//"#ff0000";
            //         break;
            //     //return wetlandsIcon;
            // }

            switch (true) {
                case ((c_val_current_sb_and_alt >= rg_pr[0])&&(c_val_current_sb_and_alt < rg_pr[1])):filterColor = colorList["color1"];//"#ffffff";//
                    break;
                case ((c_val_current_sb_and_alt >= rg_pr[1])&&(c_val_current_sb_and_alt < rg_pr[2])): filterColor = colorList["color2"];//"#ffff00";
                    break;
                case ((c_val_current_sb_and_alt >= rg_pr[2])&&(c_val_current_sb_and_alt < rg_pr[3])): filterColor = colorList["color3"];//"#ffcc00";
                    break;
                case ((c_val_current_sb_and_alt >= rg_pr[3])&&(c_val_current_sb_and_alt < rg_pr[4])): filterColor = colorList["color4"];//"#ff9900";
                    break;
                case ((c_val_current_sb_and_alt >= rg_pr[4])&&(c_val_current_sb_and_alt < rg_pr[5])): filterColor = colorList.color5;//"#ff6600";
                    break;
                case ((c_val_current_sb_and_alt >= rg_pr[5])&&(c_val_current_sb_and_alt < rg_pr[6])): filterColor = colorList["color6"];//"#ff3300";
                    break;
                case ((c_val_current_sb_and_alt >= rg_pr[6])&&(c_val_current_sb_and_alt < rg_pr[7])): filterColor = colorList["color7"];//"#ff0000";
                    break;
                default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
                    break;
            }

            // var whichNode = row[0];
            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E: "ecw" needs to convert to string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"
            ERevenue = new google.maps.Polygon({
                path: newCoordinates,
                //strokeColor: colors[0],
                strokeOpacity: .4,
                strokeWeight: 1,
                fillOpacity: 1,
                fillColor: filterColor,
                indexID: whichNode,
                clickable: true
            });

            ERevenue.setMap(heatmapRV1);
        } // JavaScript Document
    };
    // --------------  End all related to "RV" (doheatRV1,"drawHeatRV1", doheatRV2, "drawHeatRV2") ----------------

    // --------------  Start all related to "SR" (doheatSR1,"drawHeatSR1", doheatSR2, "drawHeatSR2") ----------------
    function doheatSR1() {

        for (var i = 0; i < subbasin_json.features.length; i++) {//EE 'map_data.features.length' = 130 (# of subbasins)
            var newCoordinates = [];
            var whichNode = "";
            //var geometries = rows[i][1]['geometry'];
            //alert (geometries)//newly added code...

            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E: For "ecw" needs to convert to string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"

            //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
            // var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);
            var indexx = ressssSR1.indexOf(Number(whichNode));
            var sr_val_current_sb_and_alt = SR_meanVals_array[oneMap].val[indexx].val;

            // switch (true) {
            //     case (indexx < 0):filterColor = "#ffffff";
            //         break;
            //     case (indexx < 20):filterColor = "#ffff00";
            //         break;
            //     case ((indexx >= 20) && (indexx < 40)):filterColor = "#ffcc00";
            //         break;
            //     case ((indexx >= 40) && (indexx < 70)):filterColor = "#ff9900";
            //         break;
            //     case ((indexx >= 70) && (indexx < 90)):filterColor = "#ff6600";
            //         break;
            //     case (indexx >= 90):filterColor = "#ff3300";
            //         break;
            //     default:filterColor = "#ff0000";
            //         break;
            //     //return wetlandsIcon;
            // }

            switch (true) {
                case ((sr_val_current_sb_and_alt >= rg_sr[0])&&(sr_val_current_sb_and_alt < rg_sr[1])):filterColor = colorList["color1"];//"#ffffff";//
                    break;
                case ((sr_val_current_sb_and_alt >= rg_sr[1])&&(sr_val_current_sb_and_alt < rg_sr[2])): filterColor = colorList["color2"];//"#ffff00";
                    break;
                case ((sr_val_current_sb_and_alt >= rg_sr[2])&&(sr_val_current_sb_and_alt < rg_sr[3])): filterColor = colorList["color3"];//"#ffcc00";
                    break;
                case ((sr_val_current_sb_and_alt >= rg_sr[3])&&(sr_val_current_sb_and_alt < rg_sr[4])): filterColor = colorList["color4"];//"#ff9900";
                    break;
                case ((sr_val_current_sb_and_alt >= rg_sr[4])&&(sr_val_current_sb_and_alt < rg_sr[5])): filterColor = colorList.color5;//"#ff6600";
                    break;
                case ((sr_val_current_sb_and_alt >= rg_sr[5])&&(sr_val_current_sb_and_alt < rg_sr[6])): filterColor = colorList["color6"];//"#ff3300";
                    break;
                case ((sr_val_current_sb_and_alt >= rg_sr[6])&&(sr_val_current_sb_and_alt < rg_sr[7])): filterColor = colorList["color7"];//"#ff0000";
                    break;
                default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
                    break;
            }

            // var whichNode = row[0];
            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//E:"ecw" needs to converto string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"
            Sediments = new google.maps.Polygon({
                path: newCoordinates,
                //strokeColor: colors[0],
                strokeOpacity: .4,
                strokeWeight: 1,
                fillOpacity: 1,
                fillColor: filterColor,
                indexID: whichNode,
                clickable: true
            });

            Sediments.setMap(heatmapSR1);
        }
    };

    // --------------  End all related to "SR" (doheatSR1,"drawHeatSR1", doheatSR2, "drawHeatSR2") ----------------

    // =============  Start all related to "NR" (doheatNR1,"drawHeatNR1", doheatNR2, "drawHeatNR2") ----------------
    function doheatNR1() {
        for (var i = 0; i < subbasin_json.features.length; i++) {//EE 'map_data.features.length' = 130 (# of subbasins)
            var newCoordinates = [];
            var whichNode = "";

            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//EE:For "ecw" needs to convert to string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"

            //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
            // var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            var newCoordinates = constructNewCoordinates(subbasin_json.features[i].geometry);
            var indexx = ressssNR1.indexOf(Number(whichNode));
            var nr_val_current_sb_and_alt = NR_meanVals_array[oneMap].val[indexx].val;

            // switch (true) {
            //     case (indexx < 0):filterColor = "#ffffff";
            //         break;
            //     case (indexx < 20):filterColor = "#ffff00";
            //         break;
            //     case ((indexx >= 20) && (indexx < 40)):filterColor = "#ffcc00";
            //         break;
            //     case ((indexx >= 40) && (indexx < 70)):filterColor = "#ff9900";
            //         break;
            //     case ((indexx >= 70) && (indexx < 90)):filterColor = "#ff6600";
            //         break;
            //     case (indexx >= 90):filterColor = "#ff3300";
            //         break;
            //     default:filterColor = "#ff0000";
            //         break;
            // }

            switch (true) {
                case ((nr_val_current_sb_and_alt >= rg_nr[0])&&(nr_val_current_sb_and_alt < rg_nr[1])):filterColor = colorList["color1"];//"#ffffff";//
                    break;
                case ((nr_val_current_sb_and_alt >= rg_nr[1])&&(nr_val_current_sb_and_alt < rg_nr[2])): filterColor = colorList["color2"];//"#ffff00";
                    break;
                case ((nr_val_current_sb_and_alt >= rg_nr[2])&&(nr_val_current_sb_and_alt < rg_nr[3])): filterColor = colorList["color3"];//"#ffcc00";
                    break;
                case ((nr_val_current_sb_and_alt >= rg_nr[3])&&(nr_val_current_sb_and_alt < rg_nr[4])): filterColor = colorList["color4"];//"#ff9900";
                    break;
                case ((nr_val_current_sb_and_alt >= rg_nr[4])&&(nr_val_current_sb_and_alt < rg_nr[5])): filterColor = colorList.color5;//"#ff6600";
                    break;
                case ((nr_val_current_sb_and_alt >= rg_nr[5])&&(nr_val_current_sb_and_alt < rg_nr[6])): filterColor = colorList["color6"];//"#ff3300";
                    break;
                case ((nr_val_current_sb_and_alt >= rg_nr[6])&&(nr_val_current_sb_and_alt < rg_nr[7])): filterColor = colorList["color7"];//"#ff0000";
                    break;
                default: filterColor = "#aa9999";//"#ff0000";//"#aa9999";//"#ff0000";//
                    break;
            }

            var whichNode = subbasin_json.properties[i]["Subbasin"].toString();//EE:For "ecw" needs to convert to string
            // var whichNode = subbasin_json.properties[i]["Subbasin"];//E: For "Dairy-Mckay"
            Nitrates = new google.maps.Polygon({
                path: newCoordinates,
                //strokeColor: colors[0],
                strokeOpacity: .4,
                strokeWeight: 1,
                fillOpacity: 1,
                fillColor: filterColor,
                indexID: whichNode,
                clickable: true
            });
            Nitrates.setMap(heatmapNR1);
        }
    };

    // --------------  End all related to "NR" (doheatNR1,"drawHeatNR1", doheatNR2, "drawHeatNR2") ----------------


    // ================= E: START: This part creates the heatmap-legend  ======================= //
    // -------------  F3: This appears into the heatmap but not when it fullscreens (deprecated) ---------------//
    var colorList = {color1: '#ffffff', color2: '#ffff00', color3: '#ffcc00', color4: '#ff9900', color5: '#ff6600', color6: '#ff3300', color7: '#ff0000'};

    colorize = function(colorList, min_v, max_v, map_s) {
        min_v = Math.trunc(min_v);
        var container = document.getElementById(map_s); // <----- 'oneMapPF'

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
            container.appendChild(boxContainer);

            label.innerHTML = range_inf2 + ' to ' + range_sup2;// + ' cfs';
            label.className = "label";
            box.className = "box";
            box.style.backgroundColor = colorList[key];
            // boxContainer.id = "box_container";
            boxContainer.className = "box_container";
            i += 1;
        }
    };

    // colorize(colorList, min_value_PF1, max_value_PF1,'oneMapPF');
    for (i = 0; i < min_values.length; i++) {
        colorize(colorList, min_values[i], max_values[i],maps[i]);
    }
    //----------------    END: heat-map legend funtions              -----------------------//

}

