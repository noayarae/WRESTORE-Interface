function heatinitialize() {
    //empty the div that shows all the data if they click on a sub basin
    // var PeakArray=[];

    //var option = document.getElementById('heatDrop').value-1;
    $('#oneMapPF').empty();
    // $('#oneMapPF').append('Range+: (' + heatpfra[oneMap].val[0].val + ' to ' + heatpfra[oneMap].val[126].val +') cfs');
    var min_value_PF1 = heatpfra[oneMap].val[0].val;
    var max_value_PF1 = heatpfra[oneMap].val[126].val;
    // $('#twoMapPF').empty();
    ////// $('#twoMapPF').append('Range****: (' + heatpfra[twoMap].val[0].val + ' to ' + heatpfra[twoMap].val[126].val
    ////// +') cfs');
    // var min_value_PF2 = heatpfra[twoMap].val[0].val;
    // var max_value_PF2 = heatpfra[twoMap].val[126].val;
    ////// alert (max_value_PF2);

    $('#oneMapRV').empty();
    // $('#oneMapRV').append('Range: (' + heatera[oneMap].val[0].val + ' to ' + heatera[oneMap].val[126].val +') Dollars');
    var min_value_RV1 = heatera[oneMap].val[0].val;
    var max_value_RV1 = heatera[oneMap].val[126].val;
    ////// alert (max_value_RV1);
    // $('#twoMapRV').empty();
    ////// $('#twoMapRV').append('Range: (' + heatera[twoMap].val[0].val + ' to ' + heatera[twoMap].val[126].val +')
    ////// Dollars');
    // var min_value_RV2 = heatera[twoMap].val[0].val;
    // var max_value_RV2 = heatera[twoMap].val[126].val;
    ////// alert (max_value_RV2);

    $('#oneMapSR').empty();
    // $('#oneMapSR').append('Range: (' + heatseda[oneMap].val[0].val + ' to ' + heatseda[oneMap].val[126].val +') tons');
    var min_value_SR1 = heatseda[oneMap].val[0].val;
    var max_value_SR1 = heatseda[oneMap].val[126].val;
    ////// alert (max_value_SR1);
    // $('#twoMapSR').empty();
    ////// $('#twoMapSR').append('Range: (' + heatseda[twoMap].val[0].val + ' to ' + heatseda[twoMap].val[126].val +')
    ////// tons');
    // var min_value_SR2 = heatseda[twoMap].val[0].val;
    // var max_value_SR2 = heatseda[twoMap].val[126].val;
    ////// alert (max_value_SR2);

    $('#oneMapNR').empty();
    // $('#oneMapNR').append('Range: (' + heatnita[oneMap].val[0].val + ' to ' + heatnita[oneMap].val[126].val +') kilograms');
    var min_value_NR1 = heatnita[oneMap].val[0].val;
    var max_value_NR1 = heatnita[oneMap].val[126].val;
    ////// alert (max_value_NR1);
    // $('#twoMapNR').empty();
    ////// $('#twoMapNR').append('Range: (' + heatnita[twoMap].val[0].val + ' to ' + heatnita[twoMap].val[126].val +')
    ////// kilograms');
    // var min_value_NR2 = heatnita[twoMap].val[0].val;
    // var max_value_NR2 = heatnita[twoMap].val[126].val;
    ////// alert (max_value_NR2);

    var maps = ['oneMapPF','twoMapPF','oneMapRV','twoMapRV','oneMapSR','twoMapSR','oneMapNR','twoMapNR'];
    var min_values = [min_value_PF1, min_value_PF2, min_value_RV1, min_value_RV2, min_value_SR1, min_value_SR2, min_value_NR1, min_value_NR2];
    var max_values = [max_value_PF1, max_value_PF2, max_value_RV1, max_value_RV2, max_value_SR1, max_value_SR2, max_value_NR1, max_value_NR2];

    var ressssPF1 = heatpfra[oneMap].val.map(function(a) {
        return a.name;
    });
    // var ressssPF2 = heatpfra[twoMap].val.map(function(a) {
    //     return a.name;
    // });
    var ressssRV1 = heatera[oneMap].val.map(function(a) {
        return a.name;
    });
    // var ressssRV2 = heatera[twoMap].val.map(function(a) {
    //     return a.name;
    // });
    var ressssSR1 = heatseda[oneMap].val.map(function(a) {
        return a.name;
    });
    // var ressssSR2 = heatseda[twoMap].val.map(function(a) {
    //     return a.name;
    // });
    var ressssNR1 = heatnita[oneMap].val.map(function(a) {
        return a.name;
    });
    // var ressssNR2 = heatnita[twoMap].val.map(function(a) {
    //     return a.name;
    // });
// -----------------------------------------------------------------------------

    heatmapPF1 = new google.maps.Map(document.getElementById('heatmap_canvasPF1'), {
        center: new google.maps.LatLng(39.9778, -86.2959),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // heatmapPF2 = new google.maps.Map(document.getElementById('heatmap_canvasPF2'), {
    //     center: new google.maps.LatLng(39.9778, -86.2959),
    //     zoom: 10,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // });

    heatmapRV1 = new google.maps.Map(document.getElementById('heatmap_canvasRV1'), {
        center: new google.maps.LatLng(39.9778, -86.2959),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // heatmapRV2 = new google.maps.Map(document.getElementById('heatmap_canvasRV2'), {
    //     center: new google.maps.LatLng(39.9778, -86.2959),
    //     zoom: 10,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // });

    heatmapSR1 = new google.maps.Map(document.getElementById('heatmap_canvasSR1'), {
        center: new google.maps.LatLng(39.9778, -86.2959),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // heatmapSR2 = new google.maps.Map(document.getElementById('heatmap_canvasSR2'), {
    //     center: new google.maps.LatLng(39.9778, -86.2959),
    //     zoom: 10,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // });

    heatmapNR1 = new google.maps.Map(document.getElementById('heatmap_canvasNR1'), {
        center: new google.maps.LatLng(39.9778, -86.2959),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // heatmapNR2 = new google.maps.Map(document.getElementById('heatmap_canvasNR2'), {
    //     center: new google.maps.LatLng(39.9778, -86.2959),
    //     zoom: 10,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // });

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

    doheatPF1();
    // doheatPF2();
    doheatRV1();
    // doheatRV2();
    doheatSR1();
    // doheatSR2();
    doheatNR1();
    // doheatNR2();

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
                case (indexx < 0):filterColor = "#000000"; // #ffffff
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

            google.maps.event.addListener(Peakflow, 'click', function(event) {
                $.ajax({
                    url: 'sendToTime.php',
                    type: 'post',
                    data: "JSONHolder=" + "heatmapPF1" + "," + page + "," + session + "," + ("Suggestion" + (parseInt(option) + 1) + " " + this.indexID),
                    success: function(data) {}
                });
            });
            //alert(JSON.stringify(Peakflow));
            Peakflow.setMap(heatmapPF1);
        } // JavaScript Document
    }


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

            google.maps.event.addListener(ERevenue, 'click', function(event) {
                $.ajax({
                    url: 'sendToTime.php',
                    type: 'post',
                    data: "JSONHolder=" + "HeatMap_ER" + "," + page + "," + session + "," + ("Suggestion" + (parseInt(option) + 1) + " " + this.indexID),
                    success: function(data) {}
                });
            });
            //alert(JSON.stringify(Peakflow));
            ERevenue.setMap(heatmapRV1);
        } // JavaScript Document
    };


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

            google.maps.event.addListener(Sediments, 'click', function(event) {
                $.ajax({
                    url: 'sendToTime.php',
                    type: 'post',
                    data: "JSONHolder=" + "HeatMap_SRed" + "," + page + "," + session + "," + ("Suggestion" + (parseInt(option) + 1) + " " + this.indexID),
                    success: function(data) {}
                });
            });
            //alert(JSON.stringify(Peakflow));
            Sediments.setMap(heatmapSR1);
        } // JavaScript Document
    };


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

            google.maps.event.addListener(Nitrates, 'click', function(event) {
                $.ajax({
                    url: 'sendToTime.php',
                    type: 'post',
                    data: "JSONHolder=" + "HeatMap_NRed" + "," + page + "," + session + "," + ("Suggestion" + (parseInt(option) + 1) + " " + this.indexID),
                    success: function(data) {}
                });
            });
            //alert(JSON.stringify(Peakflow));
            Nitrates.setMap(heatmapNR1);
            //PeakArray.push(Peakflow);
            //heatmap1.data.setStyle();
        } // JavaScript Document
    };

    ///////////////////////////////////////////////
    $("#tabs").tabs();

    // ================================================================================================== //
    // ----------------  Function 1 -------------------------- //

    // ----------------  Function 2 -------------------------- //

    //---------------------- F3 ----------------------//
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
            boxContainer.id = "box_container";
            i += 1;
        }
    }

    // colorize(colorList, min_value_PF1, max_value_PF1,'oneMapPF');

    for (i = 0; i < min_values.length; i++) {
        colorize(colorList, min_values[i], max_values[i],maps[i]);
    }
    //---------------------------------------//

}