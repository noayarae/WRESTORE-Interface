// JavaScript Document	
   function subBasinGraph1(){
	  var option = document.getElementById('subDrop').value;
      //alert(option);
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
	
	colors[n1-1] = '#FA9A50';
	colors[n2-1] = '#DFFFA5';
    //colors[n2-1] = 'FC78F5';

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
				var max12=Number(parseFloat(Math.abs(JSON.parse(chartArray[rowlen].F2)[2])))
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
				title: 'Peak flow* reduction in cubic feet per second (PFR)',
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
			var clickd=chart.getSelection()
				if(clickd.length === 0){
					
				}else{
					
						$.ajax({ 
						url: 'sendToTime.php',
						type: 'post',
						data:"JSONHolder=" + "BAR_PFR" + "," + page + "," + session+ "," + (option + " "+(parseInt(clickd[0].row)+1)),
							success: function(data) {
							
								}
							});  
				}
			});  
		google.visualization.events.addListener(chart1, 'select', function goToTimeBar() {
			//session=session+1;
			//alert (session + " " + page + " " + session)
			var clickd=chart1.getSelection()
				if(clickd.length === 0){
					
				}else{
						$.ajax({ 
						url: 'sendToTime.php',
						type: 'post',
						data:"JSONHolder=" + "BAR_ER" + "," + page + "," + session+ "," +  (option + " "+(parseInt(clickd[0].row)+1)),
							success: function(data) {
							
								}
							});  
				}
			});  
		google.visualization.events.addListener(chart2, 'select', function goToTimeBar() {
			//session=session+1;
			//alert (session + " " + page + " " + session)
			var clickd=chart2.getSelection()
				if(clickd.length === 0){
					
				}else{
					 $.ajax({ 
       				 url: 'sendToTime.php',
       				 type: 'post',
					  data:"JSONHolder=" + "BAR_SRed" + "," + page + "," + session+ "," +  (option + " "+(parseInt(clickd[0].row)+1)),
        				success: function(data) {
	          			
                 			}
    					});  
				}
			});  
		google.visualization.events.addListener(chart3, 'select', function goToTimeBar() {
			//session=session+1;
			//alert (session + " " + page + " " + session)
			var clickd=chart3.getSelection()
			if(clickd.length === 0){
					
				}else{
					 $.ajax({ 
       				 url: 'sendToTime.php',
       				 type: 'post',
					  data:"JSONHolder=" + "BAR_NRed" + "," + page + "," + session+ "," +  (option + " "+(parseInt(clickd[0].row)+1)),
        				success: function(data) {
	          			
                 			}
    					});  
				}
			});  
		  
		/*function createCustomHTMLContent1( row, dm , m) {
		  return '<div style="padding:5px 5px 5px 5px;">' +
			  '<table id="medals_layout">' + '<tr>' +
			  '<td>Alternative : </td>' +
			  '<td><b>' + row + '</b></td>' + '</tr>' + '<tr>' +
			  '<td>'+dm+' : </td>' +
			  '<td><b>' + m + '</b></td>' + '</tr>' + '<tr>'  + '</table>' + '</div>';
		}*/
		//tool tip edit for min and max
		function createCustomHTMLContent1( row, dm , m, min, max) {
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
}