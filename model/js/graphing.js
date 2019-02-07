function graphIt(){
//$('.visualize').trigger('visualizeRefresh');
//$(".graphTable0").visualize({type: 'bar', width: '200px', height: '150px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});

    $orange = '#d85a1a';
	$yellow = '#d8c41a';
    $gray = '#adadad';



$(".graphTable1").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '4', barGroupMargin:'20',colors:[$orange,$yellow,$gray,$gray,$gray,'#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable2").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable3").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable4").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});

}

//Color change function to alternate colored bars as you move through data
function colorChangeGraphIt(instance) {
//$.getScript("visualize.jQuery.js",function(){
//$('.visualize').trigger('visualizeRefresh');
//there could be ten types of instances 1&2, 3&4, ... ,19&20
    $orange = '#d85a1a';
	$yellow = '#d8c41a';
    $gray = '#adadad';
if(instance==0) {
$(".graphTable1").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '1', barGroupMargin:'10',colors:[$orange,$yellow,$gray,$gray,$gray,$gray,$gray,$gray,$gray, $gray]});
//zero line attempt
//$(".graphTable1").visualize({type: 'line', width: '180px', height: '200px',colors:[$gray]});

$(".graphTable2").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:[$orange,'#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable3").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable4").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
}
if(instance==1) {
$(".graphTable1").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '1', barGroupMargin:'10',colors:[$gray,$gray,$orange,$yellow,$gray,$gray,$gray,$gray,$gray, $gray]});
$(".graphTable2").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:[$gray,'#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable3").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable4").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
}
if(instance==2) {
$(".graphTable1").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '4', barGroupMargin:'20',colors:[$orange,$yellow,$gray,$gray,$gray,'#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable2").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:[$gray,'#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable3").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable4").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
}
if(instance==3) {
$(".graphTable1").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '4', barGroupMargin:'20',colors:[$orange,$yellow,$gray,$gray,$gray,'#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable2").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:[$gray,'#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable3").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable4").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
}
if(instance==4) {
$(".graphTable1").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '4', barGroupMargin:'20',colors:[$orange,$yellow,$gray,$gray,$gray,'#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable2").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:[$gray,'#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable3").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable4").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
}
if(instance==5) {
$(".graphTable1").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '4', barGroupMargin:'20',colors:[$orange,$yellow,$gray,$gray,$gray,'#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable2").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:[$gray,'#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable3").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable4").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
}if(instance==6) {
$(".graphTable1").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '4', barGroupMargin:'20',colors:[$orange,$yellow,$gray,$gray,$gray,'#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable2").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:[$gray,'#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable3").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable4").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
}
if(instance==7) {
$(".graphTable1").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '4', barGroupMargin:'20',colors:[$orange,$yellow,$gray,$gray,$gray,'#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable2").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:[$gray,'#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable3").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable4").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
}
if(instance==8) {
$(".graphTable1").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '4', barGroupMargin:'20',colors:[$orange,$yellow,$gray,$gray,$gray,'#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable2").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:[$gray,'#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable3").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable4").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
}
if(instance==9) {
$(".graphTable1").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '4', barGroupMargin:'20',colors:[$orange,$yellow,$gray,$gray,$gray,'#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable2").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:[$gray,'#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable3").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
$(".graphTable4").visualize({type: 'bar', width: '180px', height: '250px', barMargin: '20', barGroupMargin:'20',colors:['#d85a1a','#d8c41a','#92d5ea','#ee8310','#8d10ee','#5a3b16','#26a4ed','#f45a90','#e9e744']});
}

//self.visualize(o, $(this).empty()); 

	instance++;
//});
}


$(function(){
 //$('table').visualize({type: 'pie', height: '300px', width: '420px'});
	
	//$('table').visualize({type: 'area', width: '420px'});
	//$('table').visualize({type: 'line', width: '420px'});
});