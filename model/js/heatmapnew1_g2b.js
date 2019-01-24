function heatinitialize() {
    // alert("L:2 heatinitialize");
    // var cccc = 0;
    //empty the div that shows all the data if they click on a sub basin
    // var PeakArray=[];

    //var option = document.getElementById('heatDrop').value-1;
    $('#oneMapPF').empty();
    // $('#oneMapPF').append('Range+: (' + heatpfra[oneMap].val[0].val + ' to ' + heatpfra[oneMap].val[126].val +') cfs');
    var min_value_PF1 = PFR_meanVals_array[oneMap].val[0].val;//mk: Get the min value of mean values of PFR
    var max_value_PF1 = PFR_meanVals_array[oneMap].val[126].val;//mk: Get the max value of mean values of PFR

    $('#oneMapRV').empty();
    // $('#oneMapRV').append('Range: (' + heatera[oneMap].val[0].val + ' to ' + heatera[oneMap].val[126].val +') Dollars');
    var min_value_RV1 = Cost_meanVals_array[oneMap].val[0].val;//mk
    var max_value_RV1 = Cost_meanVals_array[oneMap].val[126].val;//mk

    $('#oneMapSR').empty();
    // $('#oneMapSR').append('Range: (' + heatseda[oneMap].val[0].val + ' to ' + heatseda[oneMap].val[126].val +') tons');
    var min_value_SR1 = SR_meanVals_array[oneMap].val[0].val;//mk
    var max_value_SR1 = SR_meanVals_array[oneMap].val[126].val;//mk

    $('#oneMapNR').empty();
    // $('#oneMapNR').append('Range: (' + heatnita[oneMap].val[0].val + ' to ' + heatnita[oneMap].val[126].val +') kilograms');
    var min_value_NR1 = NR_meanVals_array[oneMap].val[0].val;//mk
    var max_value_NR1 = NR_meanVals_array[oneMap].val[126].val;//mk

    //// --------------  These new variables are setup for building the map-legend  --------------------
    //
    var maps = ['oneMapPF','oneMapRV','oneMapSR','oneMapNR'];
    var min_values = [min_value_PF1, min_value_RV1, min_value_SR1, min_value_NR1];
    var max_values = [max_value_PF1, max_value_RV1, max_value_SR1, max_value_NR1];

    ////  ---------------  These variables are used to set ranges for maps  -----------------------
    var ressssPF1 = PFR_meanVals_array[oneMap].val.map(function(a) {
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

    //  ------------------ Setting heatmaps with google.map ------  8 maps in total ----------------------
    heatmapPF1 = new google.maps.Map(document.getElementById('heatmap_canvasPF1'), {
        center: new google.maps.LatLng(39.9778, -86.2959),
        zoom: 10,
        disableDefaultUI: true, // it disables all default icons from google map
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // These three lines add an icon over the map (heatmap) to make zoom out
    $('#fullscreen_heatmap1').click(function() {
        // alert("hello1");
        // document.getElementById("fullscreen_heatmap2").style.display = "none";
        $('#heatmap_canvasPF1 div.gm-style button[title="Toggle fullscreen view"]').trigger('click');
        // cccc = 1;

        // alert("hello");
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

    // ----------------- Start Setting PFR-Legend variables to send to g2.php --------------- //
    // E: This part sets up a custom button into the heatmap to display the legend
    // These code-lines calls the js script located around 2690 in g2.php
    // var sttt;
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

    var colorList = {color1: '#ffffff', color2: '#ffff00', color3: '#ffcc00', color4: '#ff9900', color5: '#ff6600', color6: '#ff3300', color7: '#ff0000'};
    var mapa = maps[0];
    var min_value = min_values[0];
    var max_value = max_values[0];
    // alert("Line:111-heatmapnew1.js: " + " map: " + mapa + "  min: " + min_value + "  max: " + max_value);
    var button1 = new buttonControl_pfr(buttonOptions_1, colorList, mapa, min_value, max_value);

    // --------------- End Legend setting for PFR ----------------- //


    // ------------------------------------------------------------------------------ //

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


    // ----------------- Start Legend setting (COST-RV) --------------- //
    // E: This part sets up a custom button into the heatmap to display the legend
    // These code-lines calls the js script located around 2690 in g2.php
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

    var colorList = {color1: '#ffffff', color2: '#ffff00', color3: '#ffcc00', color4: '#ff9900', color5: '#ff6600', color6: '#ff3300', color7: '#ff0000'};
    var mapa = maps[1];
    var min_value = min_values[1];
    var max_value = max_values[1];
    // alert("Line:111-heatmapnew1.js: " + " map: " + mapa + "  min: " + min_value + "  max: " + max_value);
    var button1 = new buttonControl_cr(buttonOptions_1, colorList, mapa, min_value, max_value);

    // --------------- End Legend setting ----------------- //

    // ------------------------------------------------------------------------------ //

    heatmapSR1 = new google.maps.Map(document.getElementById('heatmap_canvasSR1'), {
        center: new google.maps.LatLng(39.9778, -86.2959),
        zoom: 10,
        disableDefaultUI: true, // it disables all default icons from google map
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // These three lines add an icon over the map (heatmap)
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

    // ----------------- Start Legend setting (SR) --------------- //
    // E: This part sets up a custom button into the heatmap to display the legend
    // These code-lines calls the js script located around 2690 in g2.php
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

    var colorList = {color1: '#ffffff', color2: '#ffff00', color3: '#ffcc00', color4: '#ff9900', color5: '#ff6600', color6: '#ff3300', color7: '#ff0000'};
    var mapa = maps[2];
    var min_value = min_values[2];
    var max_value = max_values[2];
    // alert("Line:111-heatmapnew1.js: " + " map: " + mapa + "  min: " + min_value + "  max: " + max_value);
    var button1 = new buttonControl_sr(buttonOptions_1, colorList, mapa, min_value, max_value);

    // --------------- End Legend setting ----------------- //

    // ----------------------------------------------------------------------------------- //

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
        // alert ("hm4");


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

    // ----------------- Start Legend setting (NR) --------------- //
    // E: This part sets up a custom button into the heatmap to display the legend
    // These code-lines calls the js script located around 2690 in g2.php
    var buttonOptions_1 = {
        gmap: heatmapNR1,
        name: 'Legend ',
        position: google.maps.ControlPosition.TOP_RIGHT,
        // action: function(){
        //     // map1.panTo(new google.maps.LatLng(-33.9, 151.2));
        //     jQuery('.heatMapLegend_container_nr').toggle('show');
        // }
    };

    var colorList = {color1: '#ffffff', color2: '#ffff00', color3: '#ffcc00', color4: '#ff9900', color5: '#ff6600', color6: '#ff3300', color7: '#ff0000'};
    var mapa = maps[3];
    var min_value = min_values[3];
    var max_value = max_values[3];
    // alert("Line:111-heatmapnew1.js: " + " map: " + mapa + "  min: " + min_value + "  max: " + max_value);
    var button1 = new buttonControl_nr(buttonOptions_1, colorList, mapa, min_value, max_value);

    // --------------- End Legend setting ----------------- //
    // ------------------------------------------------------------------------------------ //

    // -----------------------  set coordinates for maps ----------------------
    function constructNewCoordinates(polygon) {
        var newCoordinates = [];
        var coordinates = null;
        if (polygon['coordinates']) coordinates = polygon['coordinates'];
        if (coordinates.length == 1) {
            coordinates = coordinates[0];
            // alert("length = 1");
        }
        for (var i in coordinates) {
            newCoordinates.push(new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
            //bounds.extend(newCoordinates[i]);
        }
        return newCoordinates;
    }

    // ------------  do  doheatmaps  -----------------
    doheatPF1();
    doheatRV1();
    doheatSR1();
    doheatNR1();

    // --------------  Start all related to "PF" (doheatPF1,"drawHeatPF1", doheatPF2, "drawHeatPF2") ----------------
    // ----------------  Start doheartPF1 ------------
    function doheatPF1() {
        // Initialize JSONP request
        var script = document.createElement('script');
        var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
        url.push('sql=');
        //Streams
        var query = 'SELECT GRIDCODE, geometry, Area_Acres,Length_mil FROM ' +
            '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA ';
        var encodedQuery = encodeURIComponent(query);
        url.push(encodedQuery);
        url.push('&callback=drawHeatPF1');
        url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
        // url.push('&key=IzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
        script.src = url.join('');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(script);
        //alert("Wetlands1");
    }

    drawHeatPF1 = function(data) {
        // alert(data);
        var rows = data['rows'];
        for (var i in rows) {
            var newCoordinates = [];
            var whichNode = "";
            //var geometries = rows[i][1]['geometry'];
            //alert (geometries)//newly added code...
            var row = rows[i];
            var whichNode = row[0];

            //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
            var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            var indexx = ressssPF1.indexOf(Number(whichNode));

            switch (true) {
                case (indexx < 0):filterColor = "#ffffff";//"#000000"; // #ffffff
                    break;
                case (indexx < 20): filterColor = "#ffff00";
                    break;
                case ((indexx >= 20) && (indexx < 40)): filterColor = "#ffcc00";
                    break;
                case ((indexx >= 40) && (indexx < 70)): filterColor = "#ff9900";
                    break;
                case ((indexx >= 70) && (indexx < 90)): filterColor = "#ff6600";
                    break;
                case (indexx >= 90): filterColor = "#ff3300";
                    break;
                default: filterColor = "#ff0000";
                    break;
                //return wetlandsIcon;
            }

            var whichNode = row[0];
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

            // google.maps.event.addListener(Peakflow, 'click', function(event) {
            //     $.ajax({
            //         url: 'sendToTime.php',
            //         type: 'post',
            //         data: "JSONHolder=" + "heatmapPF1" + "," + page + "," + session + "," + ("Suggestion" + (parseInt(option) + 1) + " " + this.indexID),
            //         success: function(data) {}
            //     });
            // });

            //alert(JSON.stringify(Peakflow));
            Peakflow.setMap(heatmapPF1);
        } // JavaScript Document
    };


    // --------------  End all related to "PF" (doheatPF1,"drawHeatPF1", doheatPF2, "drawHeatPF2") ----------------

    // --------------  Start all related to "RV" (doheatRV1,"drawHeatRV1", doheatRV2, "drawHeatRV2") ----------------
    // ---------------------------------  Start doheatRV1() --------------------------------
    function doheatRV1() {
        // Initialize JSONP request
        var script = document.createElement('script');
        var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
        url.push('sql=');
        //Streams
        var query = 'SELECT GRIDCODE, geometry, Area_Acres,Length_mil FROM ' +
            '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA ';
        var encodedQuery = encodeURIComponent(query);
        url.push(encodedQuery);
        url.push('&callback=drawHeatRV1');
        url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
        script.src = url.join('');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(script);
        //alert("Wetlands1");
    }

    drawHeatRV1 = function(data) {
        // alert(data);
        var rows = data['rows'];
        for (var i in rows) {
            var newCoordinates = [];
            var whichNode = "";
            //var geometries = rows[i][1]['geometry'];
            //alert (geometries)//newly added code...
            var row = rows[i];
            var whichNode = row[0];

            //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
            var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            var indexx = ressssRV1.indexOf(Number(whichNode));

            switch (true) {
                case (indexx < 0): filterColor = "#ffffff";
                    break;
                case (indexx < 20): filterColor = "#ffff00";
                    break;
                case ((indexx >= 20) && (indexx < 40)): filterColor = "#ffcc00";
                    break;
                case ((indexx >= 40) && (indexx < 70)): filterColor = "#ff9900";
                    break;
                case ((indexx >= 70) && (indexx < 90)): filterColor = "#ff6600";
                    break;
                case (indexx >= 90): filterColor = "#ff3300";
                    break;
                default: filterColor = "#ff0000";
                    break;
                //return wetlandsIcon;
            }

            var whichNode = row[0];
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

            // google.maps.event.addListener(ERevenue, 'click', function(event) {
            //     $.ajax({
            //         url: 'sendToTime.php',
            //         type: 'post',
            //         data: "JSONHolder=" + "HeatMap_ER" + "," + page + "," + session + "," + ("Suggestion" + (parseInt(option) + 1) + " " + this.indexID),
            //         success: function(data) {}
            //     });
            // });

            ERevenue.setMap(heatmapRV1);
        } // JavaScript Document
    };


    // --------------  End all related to "RV" (doheatRV1,"drawHeatRV1", doheatRV2, "drawHeatRV2") ----------------

    // --------------  Start all related to "SR" (doheatSR1,"drawHeatSR1", doheatSR2, "drawHeatSR2") ----------------
    function doheatSR1() {
        // Initialize JSONP request
        var script = document.createElement('script');
        var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
        url.push('sql=');
        //Streams
        var query = 'SELECT GRIDCODE, geometry, Area_Acres,Length_mil FROM ' +
            '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA ';
        var encodedQuery = encodeURIComponent(query);
        url.push(encodedQuery);
        url.push('&callback=drawHeatSR1');
        url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
        script.src = url.join('');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(script);
        //alert("Wetlands1");
    }

    drawHeatSR1 = function(data) {
        // alert(data);
        var rows = data['rows'];
        for (var i in rows) {
            var newCoordinates = [];
            var whichNode = "";
            //var geometries = rows[i][1]['geometry'];
            //alert (geometries)//newly added code...
            var row = rows[i];
            var whichNode = row[0];

            //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
            var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            var indexx = ressssSR1.indexOf(Number(whichNode));

            switch (true) {
                case (indexx < 0):filterColor = "#ffffff";
                    break;
                case (indexx < 20):filterColor = "#ffff00";
                    break;
                case ((indexx >= 20) && (indexx < 40)):filterColor = "#ffcc00";
                    break;
                case ((indexx >= 40) && (indexx < 70)):filterColor = "#ff9900";
                    break;
                case ((indexx >= 70) && (indexx < 90)):filterColor = "#ff6600";
                    break;
                case (indexx >= 90):filterColor = "#ff3300";
                    break;
                default:filterColor = "#ff0000";
                    break;
                //return wetlandsIcon;
            }

            var whichNode = row[0];
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

            // google.maps.event.addListener(Sediments, 'click', function(event) {
            //     $.ajax({
            //         url: 'sendToTime.php',
            //         type: 'post',
            //         data: "JSONHolder=" + "HeatMap_SRed" + "," + page + "," + session + "," + ("Suggestion" + (parseInt(option) + 1) + " " + this.indexID),
            //         success: function(data) {}
            //     });
            // });

            Sediments.setMap(heatmapSR1);
        }
    };

    // --------------  End all related to "SR" (doheatSR1,"drawHeatSR1", doheatSR2, "drawHeatSR2") ----------------

    // --------------  Start all related to "NR" (doheatNR1,"drawHeatNR1", doheatNR2, "drawHeatNR2") ----------------
    function doheatNR1() {
        // Initialize JSONP request
        var script = document.createElement('script');
        var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
        url.push('sql=');
        //Streams
        var query = 'SELECT GRIDCODE, geometry, Area_Acres,Length_mil FROM ' +
            '1pU7pdW8h9zLV6VUSdsrmmX47zAvF6BPVjYiShGA ';
        var encodedQuery = encodeURIComponent(query);
        url.push(encodedQuery);
        url.push('&callback=drawHeatNR1');
        url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
        script.src = url.join('');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(script);
        //alert("Wetlands1");
    }

    drawHeatNR1 = function(data) {
        // alert(data);
        var rows = data['rows'];
        for (var i in rows) {
            var newCoordinates = [];
            var whichNode = "";
            //var geometries = rows[i][1]['geometry'];
            //alert (geometries)//newly added code...
            var row = rows[i];
            var whichNode = row[0];

            //if (i==1) alert("geometry "+i+":"+rows[i][1]['geometry']['coordinates']);
            var newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            var indexx = ressssNR1.indexOf(Number(whichNode));

            switch (true) {
                case (indexx < 0):filterColor = "#ffffff";
                    break;
                case (indexx < 20):filterColor = "#ffff00";
                    break;
                case ((indexx >= 20) && (indexx < 40)):filterColor = "#ffcc00";
                    break;
                case ((indexx >= 40) && (indexx < 70)):filterColor = "#ff9900";
                    break;
                case ((indexx >= 70) && (indexx < 90)):filterColor = "#ff6600";
                    break;
                case (indexx >= 90):filterColor = "#ff3300";
                    break;
                default:filterColor = "#ff0000";
                    break;
                //return wetlandsIcon;
            }

            var whichNode = row[0];
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

            // google.maps.event.addListener(Nitrates, 'click', function(event) {
            //     $.ajax({
            //         url: 'sendToTime.php',
            //         type: 'post',
            //         data: "JSONHolder=" + "HeatMap_NRed" + "," + page + "," + session + "," + ("Suggestion" + (parseInt(option) + 1) + " " + this.indexID),
            //         success: function(data) {}
            //     });
            // });

            Nitrates.setMap(heatmapNR1);

        }
    };

    // --------------  End all related to "NR" (doheatNR1,"drawHeatNR1", doheatNR2, "drawHeatNR2") ----------------


    // ================= E: START: This part creates the heatmap-legend  ======================= //
    // -------------  F3: This appears into the heatmap but not when it fullscreens ---------------//
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

