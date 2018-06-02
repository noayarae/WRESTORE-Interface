// JavaScript Document	
   function subBasinGraph(){
	  var option = document.getElementById('subDrop').value;
	  //alert("I am in it");
	  if (option=="Watershed"){
      var m10=parseFloat(Math.abs(chartArray[oneMap].F0).toFixed(0))
	  	//	var m20=parseFloat(Math.abs(chartArray[twoMap].F0).toFixed(0))
	     	var m11=parseFloat(Math.abs(chartArray[oneMap].F1).toFixed(0))
		//	var m21=parseFloat(Math.abs(chartArray[twoMap].F1).toFixed(0))
			var m12=parseFloat((chartArray[oneMap].F2)/1).toFixed(0)
		//	var m22=parseFloat((chartArray[twoMap].F2)/1).toFixed(0)
			var m13=parseFloat(Math.abs(chartArray[oneMap].F3)/1).toFixed(0)
		//	var m23=parseFloat(Math.abs(chartArray[twoMap].F3)/1).toFixed(0)
			var m14=parseFloat(Math.abs(chartArray[oneMap].F4)/1).toFixed(0)
		//	var m24=parseFloat(Math.abs(chartArray[twoMap].F4)/1).toFixed(0)
			alert("WATERSHED");
	  }else {

           //time to get the values out of the main dataset.
            var subChart1=[];	
			 var subChart2=[];	

			$.each(array[oneMap], function(key, value) { 
				  if (key==option){
				  //alert(key + ': ' + value);
				  subChart1=value.split(',');
				  };
			});
			
			$.each(array[twoMap], function(key, value) { 
				  if (key==option){
				 // alert(key + ': ' + value);
				  subChart2=value.split(',');
				  };
			});
			
			
			var m11=parseFloat(Math.abs(subChart1[1]).toFixed(0))
			var m21=parseFloat(Math.abs(subChart2[1]).toFixed(0))
		
			var m12=parseFloat((subChart1[2])/1).toFixed(0)
			var m22=parseFloat((subChart2[2])/1).toFixed(0)
		  
			var m13=parseFloat(Math.abs(subChart1[3])/1).toFixed(0)
			var m23=parseFloat(Math.abs(subChart2[3])/1).toFixed(0)
			
			var m14=parseFloat(Math.abs(subChart1[4])/1).toFixed(0)
			var m24=parseFloat(Math.abs(subChart2[4])/1).toFixed(0)
	  }
	
	
	$( ".f1m1" ).html(m11);
	$( ".alt11Display" ).html(m11);
	$( ".f1m2" ).html(m21);
	$( ".alt12Display" ).html(m21);
	$( ".f2m1" ).html(m12);
	$( ".alt21Display" ).html(m12);
	$( ".f2m2" ).html(m22);
	$( ".alt22Display" ).html(m22);
	$( ".f3m1" ).html(m13);
	$( ".alt31Display" ).html(m13);
	$( ".f3m2" ).html(m23);
	$( ".alt32Display" ).html(m23);
	$( ".f4m1" ).html(m14);
	$( ".alt41Display" ).html(m14);
	$( ".f4m2" ).html(m24);
	$( ".alt42Display" ).html(m24);
	
	forMap1=oneMap+1
	forMap2=twoMap+1
	
	$( ".alt1" ).html("Alt " + forMap1);
	$( ".alt2" ).html("Alt " + forMap2);
	$('.visualize').trigger('visualizeRefresh');
   }