// JavaScript Document
function subBasinGraph1() {
    var option = document.getElementById('subDrop').value;
    //alert(option);
    var rowlen;
    var border = [];
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Individual');
    data.addColumn('number', 'Peak- Flow');
    data.addColumn({id: 'min',type: 'number',role: 'interval'});
    data.addColumn({id: 'max',type: 'number',role: 'interval'});
    data.addColumn({type: 'string',role: 'style'});
    data.addColumn({'type': 'string','role': 'tooltip','p': {'html': true}});
    //data.addColumn({type: 'number', role: 'annotation'});

    var data1 = new google.visualization.DataTable();
    data1.addColumn('number', 'Individual');
    data1.addColumn('number', 'Revenue in $');
    data1.addColumn({id: 'min',type: 'number',role: 'interval'});
    data1.addColumn({id: 'max',type: 'number',role: 'interval'});
    data1.addColumn({type: 'string',role: 'style'});
    data1.addColumn({'type': 'string','role': 'tooltip','p': {'html': true}});
    //data1.addColumn({type: 'number', role: 'annotation'});

    var data2 = new google.visualization.DataTable();
    data2.addColumn('number', 'Individual');
    data2.addColumn('number', 'sediment red in tons');
    data2.addColumn({id: 'min',type: 'number',role: 'interval'});
    data2.addColumn({id: 'max',type: 'number',role: 'interval'});
    data2.addColumn({type: 'string',role: 'style'});
    data2.addColumn({'type': 'string','role': 'tooltip','p': {'html': true}});
    //data2.addColumn({type: 'number', role: 'annotation'});

    var data3 = new google.visualization.DataTable();
    data3.addColumn('number', 'Individual');
    data3.addColumn('number', 'nitrate red in kilograms');
    data3.addColumn({id: 'min',type: 'number',role: 'interval'});
    data3.addColumn({id: 'max',type: 'number',role: 'interval'});
    data3.addColumn({type: 'string',role: 'style'});
    data3.addColumn({'type': 'string','role': 'tooltip','p': {'html': true}});
    //data3.addColumn({type: 'number', role: 'annotation'});

    for (var i = 0; i < 24; i++) {
        colors[i] = '#a6a6a6';//'gray';
        border[i] = '#737373';// Codes of dark-gray: #737373, #666666, #595959, #4d4d4d // gray = #808080
    }

    var num1 = $(".oneMap").html();
    var n1 = parseInt(num1);
    var num2 = $(".twoMap").html();
    var n2 = parseInt(num2);

    colors[n1 - 1] = '#FA9A50';
    colors[n2 - 1] = '#DFFFA5';
    border[n1-1] = '#c65906';// Codes for dark-orange: #f77008, #df6407,// #c65906 //Added by E.N.
    border[n2-1] = '#85cc00';// Codes for dark-green: #a6ff00, #95e600;// #85cc00  //Added by E.N.

    if (option == "Watershed") {
        // alert ("wholeTable: " + wholeTable);
        //alert ("numebr of row in DDBB: " + document.getElementById('wholeTable').rows.length); // E: gets the number
        // of rows o the DDBB, in this case 21 (header is one row)
        for (rowlen = 0; rowlen < document.getElementById('wholeTable').rows.length - 1; rowlen++) {
            // E: Through this for-loop all data F1,F2, F3, and F4 in read
            //JSON.parse(chartArray[rowlen].F1)[0]
            var m11 = Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F1)[0])));
            var min11 = Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F1)[1])));
            var max11 = Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F1)[2])));
            var perm11 = Number(Math.abs(parseFloat(m11 / (JSON.parse(chartArray[rowlen].F1)[0])))) * 100;

            var m12 = Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F2)[0]) / 1));
            var min12 = Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F2)[1])));
            var max12 = Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F2)[2])));
            var perm12 = Number(Math.abs(parseFloat(m12 / (JSON.parse(chartArray[rowlen].F2)[0])))) * 100;

            var m13 = Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F3)[0]) / 1));
            var min13 = Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F3)[1])));
            var max13 = Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F3)[2])));
            var perm13 = Number(Math.abs(parseFloat(m13 / (JSON.parse(chartArray[rowlen].F3)[0])))) * 100;

            var m14 = Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F4)[0]) / 1));
            var min14 = Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F4)[1])));
            var max14 = Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F4)[2])));
            var perm14 = Number(Math.abs(parseFloat(m14 / (JSON.parse(chartArray[rowlen].F4)[0])))) * 100;

            //need to edit the tooltip for min and max
            // -----------------  These four lines were developed by Efrain Noa-Yarasca
            data.addRow([rowlen+1,m11,min11,max11,'bar {fill-color:'+colors[rowlen]+';fill-opacity:'+1+'; stroke-color:'+border[rowlen]+';stroke-width:'+2+'},'+
            'line {stroke-color:'+'#000066'+'; stroke-width:'+1+'}'
                ,createCustomHTMLContent1(rowlen+1,'PFR',m11.toExponential(2),min11.toExponential(2),max11.toExponential(2))]);
            data1.addRow([rowlen+1,m12,min12,max12,'bar {fill-color:'+colors[rowlen]+';fill-opacity:'+1+'; stroke-color:'+border[rowlen]+';stroke-width:'+2+'},'+
            'line {stroke-color:'+'#000066'+'; stroke-width:'+1+'}'
                ,createCustomHTMLContent1(rowlen+1,'ER$',m12.toExponential(2),min12.toExponential(2),max12.toExponential(2))]);
            data2.addRow([rowlen+1,m13,min13,max13,'bar {fill-color:'+colors[rowlen]+';fill-opacity:'+1+'; stroke-color:'+border[rowlen]+';stroke-width:'+2+'},'+
            'line {stroke-color:'+'#000066'+'; stroke-width:'+1+'}'
                ,createCustomHTMLContent1(rowlen+1,'SRed',m13.toExponential(2),min13.toExponential(2),max13.toExponential(2))]);
            data3.addRow([rowlen+1,m14,min14,max14,'bar {fill-color:'+colors[rowlen]+';fill-opacity:'+1+'; stroke-color:'+border[rowlen]+';stroke-width:'+2+'},'+
            'line {stroke-color:'+'#000066'+'; stroke-width:'+1+'}'
                ,createCustomHTMLContent1(rowlen+1,'NRed',m14.toExponential(2),min14.toExponential(2),max14.toExponential(2))]);

            // ----- Old code-lines --------
            // data.addRow([rowlen + 1,m11, min11, max11,colors[rowlen],createCustomHTMLContent1(rowlen + 1, 'PFR', m11.toExponential(2), min11.toExponential(2), max11.toExponential(2))]);
            // data1.addRow([rowlen + 1,m12, min12, max12,colors[rowlen],createCustomHTMLContent1(rowlen + 1, 'ER$', m12.toExponential(2), min12.toExponential(2), max12.toExponential(2))]);
            // data2.addRow([rowlen + 1,m13, min13, max13,colors[rowlen],createCustomHTMLContent1(rowlen + 1, 'SRed', m13.toExponential(2), min13.toExponential(2), max13.toExponential(2))]);
            // data3.addRow([rowlen + 1,m14, min14, max14,colors[rowlen],createCustomHTMLContent1(rowlen + 1, 'NRed', m14.toExponential(2), min14.toExponential(2), max14.toExponential(2))]);
        }

        var options = {
            title: 'Peak Flow Reduction in cfs', //E: title is not shown because it fits outside of frame
            // height: 500, width: 270, //E:These two parameters define the window's size of the bar-plot
            // height: 550, width: 290, //E:These two parameters define the window's size of the barplot
            height: 510, width: 300,
            chartArea: {top:0},//E: It is the gap distance of the plot from the top border
            // chartArea:{left:40,top:0,width:"100%",height:"100%"},
            // backgroundColor: '#ffff80',
            legend: {position: 'none'},
            //isStacked: true,//'percent',//'relative',//true,// It does not make effect when "Bars"
            // This line makes the entire category's tooltip active.
            focusTarget: 'category',
            // Use an HTML tooltip.
            tooltip: {isHtml: true},
            tooltip: {trigger: 'selection'},
            vAxis: {title:'Alternatives', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 13,bold: false, italic: true},
                gridlines: {count: document.getElementById('wholeTable').rows.length - 1}, direction: -1},
            intervals: {style: 'bars',color: '#fff'},
            // interval: {max: {style: 'bars', lineWidth:1, fillOpacity: 1,color: '#ab1ab1'},// Added by E.N.
            //     min: {style: 'bars',lineWidth:1, fillOpacity: 1, color: '#000000'}}, // Added by E.N.
            hAxis: {title:'Discharge in cubic feet per second', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 11,
                bold: false, italic: true}, textPosition: 'out', format: 'short', textStyle: {color: '#000000',fontSize: 10}},//Modified by E.N.
        };

        var options1 = {
            // title: 'Economic Revenue in Dollars (ER)',
            height: 510, width: 300,//height: 550, width: 290,//height: 500, width: 270,
            chartArea: {top:0},
            // backgroundColor: 'green',
            legend: {position: 'none'},
            // This line makes the entire category's tooltip active.
            focusTarget: 'category',
            // Use an HTML tooltip.
            tooltip: {isHtml: true},
            tooltip: {trigger: 'selection'},
            vAxis: {title:'Alternatives', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 13,bold: false, italic: true},
                gridlines: {count: document.getElementById('wholeTable').rows.length - 1},direction: -1},
            // intervals: {style: 'bars',color: '#fff'},
            // interval: {max: {style: 'bars', lineWidth:1, fillOpacity: 1,color: '#ab1ab1'},// Added by E.N.
            //     min: {style: 'bars',lineWidth:2, fillOpacity: 1, color: '#000000'}}, // Added by E.N.
            hAxis: {title:'Cost in US Dollars', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 11,
                bold: false, italic: true}, textPosition: 'out',format: 'short',textStyle: {color: '#000000',fontSize: 10}},//Modified by E.N.
        };

        var options2 = {
            // title: 'In-stream sediment reduction in tons (SRed)',
            height: 510, width: 300,//height: 550, width: 290,//height: 500, width: 270,
            chartArea: {top:0},
            // backgroundColor: 'green',
            legend: {position: 'none'},
            // This line makes the entire category's tooltip active.
            focusTarget: 'category',
            // Use an HTML tooltip.
            tooltip: {isHtml: true},
            tooltip: {trigger: 'selection'},
            vAxis: {title:'Alternatives', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 13,bold: false, italic: true},
                gridlines: {count: document.getElementById('wholeTable').rows.length - 1},direction: -1},
            // intervals: {style: 'bars',color: '#fff'},
            // interval: {max: {style: 'boxes', lineWidth:0.1, fillOpacity: 0.6,color: '#ab1ab1'},// Added by E.N.
            //     min: {style: 'boxes',lineWidth:0.1, fillOpacity: 0.6, color: '#000000'}}, // Added by E.N.
            hAxis: {title:'Sediment Reduction in Tons', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 11,
                bold: false, italic: true}, textPosition: 'out',format: 'short',textStyle: {color: '#000000',fontSize: 10}},//Modified by E.N.
        };

        var options3 = {
            // title: 'In-stream nitrate reduction in kilograms (NRed)',
            height: 510, width: 300,//height: 550, width: 290,//height: 500, width: 270,
            chartArea: {top:0},
            // backgroundColor: 'green',
            legend: {position: 'none'},
            // This line makes the entire category's tooltip active.
            focusTarget: 'category',
            // Use an HTML tooltip.
            tooltip: {isHtml: true},
            tooltip: {trigger: 'selection'},
            vAxis: {title:'Alternatives', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 13,bold: false, italic: true},
                gridlines: {count: document.getElementById('wholeTable').rows.length - 1},direction: -1},
            // intervals: {style: 'bars',color: '#fff'},
            // interval: {max: {style: 'points', lineWidth:1, fillOpacity: 1,color: '#ab1ab1'},// Added by E.N.
            //     min: {style: 'points',lineWidth:1, fillOpacity: 1, color: '#000000'}}, // Added by E.N.
            hAxis: {title:'Nitrate Reduction in Kg', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 11,
                bold: false, italic: true}, textPosition: 'out',format: 'short',textStyle: {color: '#000000',fontSize: 10}},//Modified by E.N.
        };

        chart = new google.visualization.BarChart(document.getElementById('chart_div1'));
        chart1 = new google.visualization.BarChart(document.getElementById('chart_div2'));
        chart2 = new google.visualization.BarChart(document.getElementById('chart_div3'));
        chart3 = new google.visualization.BarChart(document.getElementById('chart_div4'));

        chart.draw(data, options);
        chart1.draw(data1, options1);
        chart2.draw(data2, options2);
        chart3.draw(data3, options3);

//----------------------------------- chart watershed -------------------------------------------//
        //the barclick event capturing is done here.
        google.visualization.events.addListener(chart, 'select', function goToTimeBar() {
        // google.visualization.events.addListener(chart, 'select', function() {
            //session=session+1; // alert (session + " f1 " + page + " " + session);//alert (session + " f1 " + page + " , " + option+ ' d ' + (parseInt(clickd[0].row) + 1))
            var clickd = chart.getSelection();
            var selected_item = chart.getSelection()[0];

            if (clickd.length === 0) {
                report('m-clk+  ' , 'Un-selection of alternative ' + ';');
            }
            else {
                var topping = data.getValue(selected_item.row,0);
                report('m-clk+  ' , 'Alternative '+ topping , ';');
            }
        });

// --------------------------------------  chart 1 - watershed ----------------------------------//
//         google.visualization.events.addListener(chart1, 'select', function goToTimeBar() {
        google.visualization.events.addListener(chart1, 'select', function () {
        // google.visualization.events.addListener(chart1, 'onmouseover', function goToTimeBar() {
            var clickd = chart1.getSelection();
            var selected_item = chart1.getSelection()[0];

            if (clickd.length === 0) {
                report('m-clk+  ' , 'Un-selection of alternative '+ ';');
            }
            else {
                var topping = data.getValue(selected_item.row,0);
                report('m-clk+  ' , 'Alternative '+ topping , ';');
            }
        });
// ---------------------------------------- chart 2 - watershed ---------------------------//
        google.visualization.events.addListener(chart2, 'select', function goToTimeBar() {
        // google.visualization.events.addListener(chart2, 'select', function () {
            var clickd = chart2.getSelection();
            var selected_item = chart2.getSelection()[0];

            if (clickd.length === 0) {
                report('m-clk+  ' , 'Un-selection of alternative '+ ';');
            }
            else {
                var topping = data.getValue(selected_item.row,0);
                report('m-clk+  ' , 'Alternative ' + topping , ';');
            }
        });
// ---------------------------------------- chart 3 - watershed ---------------------------//
        google.visualization.events.addListener(chart3, 'select', function goToTimeBar() {
        // google.visualization.events.addListener(chart3, 'select', function () {
            var clickd = chart3.getSelection();
            var selected_item = chart3.getSelection()[0];

            if (clickd.length === 0) {
                report('m-clk+  ' , 'Un-selection of alternative ' + ';');
            }
            else {
                var topping = data.getValue(selected_item.row,0);
                report('m-clk+  ' , 'Alternative ' + topping , ';');
            }
        });
// ------------------------------------------ END chart 3 ------------------------------- //

        //tool tip edit for min and max
        function createCustomHTMLContent1(row, dm, m, min, max) {
            return '\n' + 'Alternative+: ' + row + '\n' + dm + ': ' + m + "\n min:" + min + "\nmax:" + max;
        }
            $('.visualize').trigger('visualizeRefresh');
    }
// ---------------------- else
    else { // else means "option == 'subbasin'"
        for (rowlen = 0; rowlen < document.getElementById('wholeTable').rows.length - 1; rowlen++) {
            var subChart = [];
            $.each(array[rowlen], function(key, value) {
                if (key == option) {
                    //alert(key + ': ' + value);
                    //subChart=value.split(',');
                    subChart = JSON.parse("[" + value + "]");
                }
            });
            //JSON.parse(chartArray[rowlen].F1)[0]
            var m11 = Number(parseFloat(Math.abs(subChart[1][0])));
            var min11 = Number(parseFloat(Math.abs(subChart[1][1])));
            var max11 = Number(parseFloat(Math.abs(subChart[1][2])));
            var perm11 = 0.0006;
            var perm11 = Number(Math.abs(parseFloat(m11 / (JSON.parse(chartArray[rowlen].F1)[0])))) * 100;
            //var mm11=String("Alternative:"+(rowlen+1)+"\nPeakFlow:"+parseString(m11)+"\nPercentage:"+perm11)
            //alert("m11 - subbsin: "+ m11); // E: this shows F1 but for each SubBasin

            var m12 = Number(parseFloat(Math.abs(subChart[2][0])));
            var min12 = Number(parseFloat(Math.abs(subChart[2][1])));
            var max12 = Number(parseFloat(Math.abs(subChart[2][2])));
            var perm12 = 0.0006;
            var perm12 = Number(Math.abs(parseFloat(m12 / (JSON.parse(chartArray[rowlen].F2)[0])))) * 100;
            //var mm12=String("Alternative:"+(rowlen+1)+"\nPeakFlow:"+parseString(m12)+"\nPercentage:"+perm12)

            var m13 = Number(parseFloat(Math.abs(subChart[3][0])));
            var min13 = Number(parseFloat(Math.abs(subChart[3][1])));
            var max13 = Number(parseFloat(Math.abs(subChart[3][2])));
            var perm13 = 0.0006;
            var perm13 = Number(Math.abs(parseFloat(m13 / (JSON.parse(chartArray[rowlen].F3)[0])))) * 100;
            //var mm13=String("Alternative:"+(rowlen+1)+"\nPeakFlow:"+parseString(m13)+"\nPercentage:"+perm13)

            var m14 = Number(parseFloat(Math.abs(subChart[4][0])));
            var min14 = Number(parseFloat(Math.abs(subChart[4][1])));
            var max14 = Number(parseFloat(Math.abs(subChart[4][2])));
            var perm14 = 0.0006;
            var perm14 = Number(Math.abs(parseFloat(m14 / (JSON.parse(chartArray[rowlen].F4)[0])))) * 100;
            //var mm14=String("Alternative:"+(rowlen+1)+"\nPeakFlow:"+parseString(m14)+"\nPercentage:"+perm14)

            // ---------------------  These four lines were developed by Efrain Noa-Yarasca
            data.addRow([rowlen+1,m11,min11,max11,'bar {fill-color:'+colors[rowlen]+';fill-opacity:'+1+'; stroke-color:'+border[rowlen]+';stroke-width:'+2+'},'+
            'line {stroke-color:'+'#000066'+'; stroke-width:'+1+'}'
                ,createCustomHTMLContent(rowlen+1,'PFR',m11.toExponential(2),min11.toExponential(2),max11.toExponential(2),'PFR wrt Watershed',perm11.toExponential(2))]);
            data1.addRow([rowlen+1,m12,min12,max12,'bar {fill-color:'+colors[rowlen]+';fill-opacity:'+1+'; stroke-color:'+border[rowlen]+';stroke-width:'+2+'},'+
            'line {stroke-color:'+'#000066'+'; stroke-width:'+1+'}'
                ,createCustomHTMLContent(rowlen+1,'ER$',m12.toExponential(2),min12.toExponential(2),max12.toExponential(2),'ER$ wrt Watershed',perm12.toExponential(2))]);
            data2.addRow([rowlen+1,m13,min13,max13,'bar {fill-color:'+colors[rowlen]+';fill-opacity:'+1+'; stroke-color:'+border[rowlen]+';stroke-width:'+2+'},'+
            'line {stroke-color:'+'#000066'+'; stroke-width:'+1+'}'
                ,createCustomHTMLContent(rowlen+1,'SRed',m13.toExponential(2),min13.toExponential(2),max13.toExponential(2),'SRed wrt Watershed',perm13.toExponential(2))]);
            data3.addRow([rowlen+1,m14,min14,max14,'bar {fill-color:'+colors[rowlen]+';fill-opacity:'+1+'; stroke-color:'+border[rowlen]+';stroke-width:'+2+'},'+
            'line {stroke-color:'+'#000066'+'; stroke-width:'+1+'}'
                ,createCustomHTMLContent(rowlen+1,'NRed',m14.toExponential(2),min14.toExponential(2),max14.toExponential(2),'NRed wrt Watershed',perm14.toExponential(2))]);

            // ----- Old code-lines for Sub-basins
            // data.addRow([rowlen + 1,m11, min11, max11,colors[rowlen],createCustomHTMLContent(rowlen + 1, 'PFR', m11.toExponential(2), min11.toExponential(2), max11.toExponential(2),'PFR wrt Watershed', perm11.toExponential(2))]);
            // data1.addRow([rowlen + 1,m12, min12, max12,colors[rowlen],createCustomHTMLContent(rowlen + 1, 'ER$', m12.toExponential(2), min12.toExponential(2), max12.toExponential(2),'ER$ wrt Watershed', perm12.toExponential(2))]);
            // data2.addRow([rowlen + 1,m13, min13, max13,colors[rowlen],createCustomHTMLContent(rowlen + 1, 'SRed', m13.toExponential(2), min13.toExponential(2), max13.toExponential(2),'SRed wrt Watershed', perm13.toExponential(2))]);
            // data3.addRow([rowlen + 1,m14, min14, max14,colors[rowlen],createCustomHTMLContent(rowlen + 1, 'NRed', m14.toExponential(2), min14.toExponential(2), max14.toExponential(2),'NRed wrt Watershed', perm14.toExponential(2))]);
        }

        var options = {
            title: 'Peak Flow Reduction in cfs',
            height: 510, width: 300,//height: 550, width: 290,//height: 500, width: 270,
            chartArea: {top:0},
            legend: {position: 'none'},
            // This line makes the entire category's tooltip active.
            focusTarget: 'category',
            // Use an HTML tooltip.
            tooltip: {isHtml: true},
            tooltip: {trigger: 'selection'},
            vAxis: {title:'Alternatives', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 13,bold: false, italic: true},
                gridlines: {count: document.getElementById('wholeTable').rows.length - 1},direction: -1},
            intervals: {style: 'bars',color: '#fff'},
            // hAxis: {textPosition: 'none'},
            hAxis:{title:'Discharge in cubic feet per second', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 11,
                bold: false, italic: true}, textPosition: 'out', format: 'short',textStyle: {color: '#000000',fontSize: 10}},//Modified by E.N.
        };

        var options1 = {
            title: 'Economic Revenue in Dollars (ER$)',
            height: 510, width: 300,//height: 550, width: 290,//height: 500, width: 270,
            chartArea: {top:0},
            legend: {position: 'none'},
            // This line makes the entire category's tooltip active.
            focusTarget: 'category',
            // Use an HTML tooltip.
            tooltip: {isHtml: true},
            tooltip: {trigger: 'selection'},
            vAxis: {title:'Alternatives', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 13,bold: false, italic: true},
                gridlines: {count: document.getElementById('wholeTable').rows.length - 1},direction: -1},
            intervals: {style: 'bars',color: '#fff'},
            // hAxis: {textPosition: 'none'},
            hAxis:{title:'Cost in US Dollars', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 11,
                bold: false, italic: true}, textPosition: 'out', format: 'short',textStyle: {color: '#000000',fontSize: 10}},//Modified by E.N.
        };

        var options2 = {
            title: 'In-stream sediment reduction in tons (SRed)',
            height: 510, width: 300,//height: 550, width: 290,//height: 500, width: 270,
            chartArea: {top:0},
            legend: {position: 'none'},
            // This line makes the entire category's tooltip active.
            focusTarget: 'category',
            // Use an HTML tooltip.
            tooltip: {isHtml: true},
            tooltip: {trigger: 'selection'},
            vAxis: {title:'Alternatives', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 13,bold: false, italic: true},
                gridlines: {count: document.getElementById('wholeTable').rows.length - 1},direction: -1},
            intervals: {style: 'bars',color: '#fff'},
            // hAxis: {textPosition: 'none'},
            hAxis:{title:'Sediment Reduction in Tons', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 11,
                bold: false, italic: true}, textPosition: 'out', format: 'short',textStyle: {color: '#000000',fontSize: 10}},//Modified by E.N.
        };

        var options3 = {
            title: 'In-stream nitrate reduction in kilograms (NRed)',
            height: 510, width: 300,//height: 550, width: 290,//height: 500, width: 270,
            chartArea: {top:0},//
            legend: {position: 'none'},
            // This line makes the entire category's tooltip active.
            focusTarget: 'category',
            // Use an HTML tooltip.
            tooltip: {isHtml: true},
            tooltip: {trigger: 'selection'},
            vAxis: {title:'Alternatives', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 13,bold: false, italic: true},
                gridlines: {count: document.getElementById('wholeTable').rows.length - 1},direction: -1},
            intervals: {style: 'bars',color: '#fff'},
            // hAxis: {textPosition: 'none'},
            hAxis:{title:'Nitrate Reduction in Kg', titleTextStyle:{fontName: 'Arial', color: 'black', fontSize: 11,
                bold: false, italic: true}, textPosition: 'out', format: 'short',textStyle: {color: '#000000',fontSize: 10}},//Modified by E.N.
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
        // -------------------------------------- chart - SUB BASIN ---------------------------//
        google.visualization.events.addListener(chart, 'select', function goToTimeBar() {
        // google.visualization.events.addListener(chart, 'select', function () {
            var clickd = chart.getSelection();
            var selected_item = chart.getSelection()[0];

            if (clickd.length === 0) {
                report('m-clk%  ' , 'Un-selection of alternative ' + ';');
            }
            else {
                var topping = data.getValue(selected_item.row,0);
                report('m-clk%  ' , 'Alternative '+ topping , ';');
            }
        });

        // -------------------------------------- chart 1 - SUB BASIN ---------------------------//
        google.visualization.events.addListener(chart1, 'select', function goToTimeBar() {
        // google.visualization.events.addListener(chart1, 'select', function () {
            var clickd = chart1.getSelection();
            var selected_item = chart1.getSelection()[0];

            if (clickd.length === 0) {
                report('m-clk%  ' , 'Un-selection of alternative ' + ';');
            }
            else {
                var topping = data.getValue(selected_item.row,0);
                report('m-clk%  ' , 'Alternative '+ topping , ';');
            }
        });

        // -------------------------------------- chart 2 - SUB BASIN ---------------------------//
        google.visualization.events.addListener(chart2, 'select', function goToTimeBar() {
        // google.visualization.events.addListener(chart2, 'select', function () {
            var clickd = chart2.getSelection();
            var selected_item = chart2.getSelection()[0];

            if (clickd.length === 0) {
                report('m-clk%  ' , 'Un-selection of alternative ' + ';');
            }
            else {
                var topping = data.getValue(selected_item.row,0);
                report('m-clk%  ' , 'Alternative '+ topping , ';');
            }
        });

        // -------------------------------------- chart 3 - SUB BASIN ---------------------------//
        google.visualization.events.addListener(chart3, 'select', function goToTimeBar() {
        // google.visualization.events.addListener(chart3, 'select', function () {
            var clickd = chart3.getSelection();
            var selected_item = chart3.getSelection()[0];

            if (clickd.length === 0) {
                report('m-clk%  ' , 'Un-selection of alternative ' + ';');
            }
            else {
                var topping = data.getValue(selected_item.row,0);
                report('m-clk%  ' , 'Alternative '+ topping , ';');
            }
        });
// ------------------------------------------ END chart 3 ------------------------------- //

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

        function createCustomHTMLContent(row, dm, m, min, max, dpermw, permw) {
            return '\n' + 'Alternative*: ' + row + '\n' + dm + ': ' + m + "\nmin:" + min + "\nmax:" + max + "\n" + dpermw + ': ' + permw + ' %';
        }
        $('.visualize').trigger('visualizeRefresh');
    }
//    End of ELSE

}


function mmq_legend(){
    // var circle_6 = document.createElement('DIV');
    // circle_6.className = "circle";
    // circle_6.style.height = "14px"; circle_6.style.width = "14px";
    // circle_6.style.backgroundColor = "#1ad1ff";//"#4ddbff";
    // return circle_6;

    var circle_7 = document.createElement('DIV');
    circle_7.className = "circle";
    circle_7.style.height = "15px"; circle_7.style.width = "15px";
    circle_7.style.backgroundColor = "#ff3300";//"#ff1a1a";
    return circle_7;

}
