/**
 * User variables.
 * Author: Cristian Bravo-Lillo 2014(c)
 * Modified by Efrain Noa-Yarasca at Oregon State University, 2018.
 */
var mt_freq = 50;				// Threshold to log mouse tracking movements, in milliseconds. In other words, 1000/freq is the frequency in hertz.
var mt_detect_resize = false;	// Whether resizes of the main window should be detected or not.

/**
 * System variables.
 */
var mt_pid = null;				// Participant ID.
var mt_posturl = '';			// URL to which the tracking will be posted.
var mt_rprt = new Array();		// Main array wherein all events will be kept.
var mt_rprt_offset = 0;			// Offset of the page loading.
var mt_freq_sem = true;			// Semaphor to control the frequency to poll mouse movements.
var mt_dxc = 0;					// Delayed X Coordinate; used to limit the sensibility of the logging of mouse movements.
var mt_dyc = 0;					// Delayed Y Coordinate.
var mt_mms = 5;					// Mouse movements sensitivity. If the mouse does not move more than mt_mms pixels, it won't get logged.
var mt_silent = false;			// Whether the submitData function should stay silent or not.
var mt_name = '';				// Name of the current 'project'.

var report_begin = true; // report beginning. Init 1
var report_mv = false; //true/false // report mouse movement. Init 4
var report_resize = false; // report window resize. Init 6
var report_ms_click = true; // report mouse click. Init 7
var report_ms_el = false; // report mouseenter and mouseleave. Init 7

var mt_aux1 = '';			// URL to which the tracking will be posted.
var mt_aux2 = '';			// URL to which the tracking will be posted.
/**
 * Init function.
 */
function init(){
	// 1 ------------------------------------------------------------------------------
	// We obtain the timing of the first load of the page and report it, along with data about the status of the viewport.
	mt_rprt_offset = getInstant();
	if (report_begin){
		var initial_time = 0;
		report('begin', 'offset=' + mt_rprt_offset + ';vpw=' + $(window).width() + ';vph=' + $(window).height() + ';');
	}

	fda.start();
    // alert(fda.start()); // This shows fda.start JSON

	// 2 --------------------------------------------------------------------------------------
	// We set the posturl. It may be put manually, but it's better automatically.
	mt_posturl = $(location).attr('protocol') + '//' + $(location).attr('hostname') + $(location).attr('pathname');
    // mt_posturl = $(location).attr('protocol') +'//'+ $(location).attr('hostname')+ $(location).attr('pathname').substr(4);
  	mt_aux1 = $(location).attr('pathname').substr(4);
  	mt_aux2 = mt_aux1.split('/').pop()

    //// alert("LOCATION: "+ $(location).attr('pathname').substr(4));//substract
	// 'www/' from the pathname
   //  mt_posturl = mt_posturl.replace('index.html','store.php');
   //  mt_posturl = mt_posturl.replace('index2.php','store.php');
	mt_posturl = mt_posturl.replace(mt_aux2,'store.php');
	//// alert("final url: "+ mt_posturl);

	// 3 -------------------------------------------------------------------------------------
	// Now we get the pid from the URL, or we fail.
	var tmp = $(location).attr('search');
	var tmp2 = tmp.match(/pid=[^&]+/g);
	if (tmp2)
		mt_pid = tmp2[0].substr(4);
	else
		mt_pid = 'anonym';

	// We get the name project from the URL.
	tmp2 = tmp.match(/name=[^&]+/g);
	if (tmp2)
		mt_name = decodeURI(tmp2[0].substr(5));

	// 4
	// -------------------------------------------------------------------------------------
	// We initialize movement within the viewport.
	$(document).mousemove(function(e) {
		if (mt_freq_sem && (Math.abs(mt_dxc-e.pageX)>mt_mms || Math.abs(mt_dyc-e.pageY)>mt_mms)){
			mt_freq_sem = false;
			mt_dxc = e.pageX;
			mt_dyc = e.pageY;
			if (report_mv){
				report('mv', 'x=' + e.pageX + ';y=' + e.pageY + ';');
			}
			setTimeout('mt_freq_sem=true;', mt_freq);
		}
	});

	// 5 ----------------------------------------------------------------------------------
	// If the window is closed, the last thing we do is to attempt to send the data so it's not lost. This does not always
	// work because of browsers having inconsistently implemented this.
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // It sents data before window-closing
    window.onbeforeunload = function(){
        // myfun();
        submitData();
        return 'Are you sure you want to leave?';
    };

	/*
	$('.three').click(function() {
    submitData(); // L-136
  	});

	$('.end').click(function() {
        submitData2(); // L-136
    });
    */
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	// 6 ---------------------------------------------------------------------------------------
	// If we're asked to track the resizing of the main window, we do.
	if (mt_detect_resize){
		$(window).resize(function(){
			if (report_resize){
				report('resize', 'vpw=' + $(window).width() + ';vph=' + $(window).height() + ';');
			}
		});
	}

	// 7 -----------------------------------------------------------------------------------------
	// All objects with class 'trackable' will be tracked for clicks, mouseenters and mouseleaves (no mouse movements,
	// that's too much data)
	$('.trackable')
		.click(function(e){
			if (report_ms_click){
				// report('m-clk', 'id=' + $(this).attr('id') + ';x=' + e.pageX + ';y=' + e.pageY + ';which=' + e.which + ';');
				report('m-clk++  ', 'id=' + $(this).attr('id') + ';');
			}
			fda.next($(this).attr('id'));
		})
		.mouseenter(function(){
			if (report_ms_el){
				report('m-ent*', 'id=' + $(this).attr('id') + ';');
			}
		})
		.mouseleave(function(){
			if (report_ms_el){
				report('m-lev', 'id=' + $(this).attr('id') + ';');
			}
		});

    $('.track')
        .click(function(e){
            if (report_ms_click){
                // report('m-clk', 'id=' + $(this).attr('id') + ';x=' + e.pageX + ';y=' + e.pageY + ';which=' + e.which + ';');
                report('m-ccc%%  ', 'id=' + $(this).attr('id') + ';');
            }
            fda.next($(this).attr('id'));
        })
        .mouseleave(function(){
            if (report_ms_click){
                report('m-out %% ', 'id=' + $(this).attr('id') + ';');
            }
        });
} // /*End Function init()*/

// ============================================================================
function getInstant(){
	var thistime = new Date();
	thistime -= 0;
	return(thistime);
}

function report(code,content){
	mt_rprt.push(''+(getInstant()-mt_rprt_offset)+':'+code+':'+content);
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function submitData(silent){
	if (report_begin){ // Get the end of the user's session on this page
		report('end', 'vpw=' + $(window).width() + ';vph=' + $(window).height() + ';');
	}

	console.log('closing 2');
	mt_silent = silent? true:false;
	console.log("mt-silent: " + mt_silent);
	// console.log(mt_rprt[0], mt_rprt[mt_rprt.length-1], mt_rprt_offset, getInstant()-mt_rprt_offset);
	console.log(mt_rprt);
    //console.log(globalVariable.xxx);
	if (!mt_silent) console.log('mt.submitData(): Sending*...');

	var request = $.ajax({
		url: mt_posturl,
		type: 'POST',
		// data: { pid: mt_pid, content: mt_rprt.join('#'), agent: navigator.userAgent, name: mt_name},
		data: { pid: mt_pid, content: mt_rprt.join('#'), agent: navigator.userAgent,
			name: mt_name, login_time: mt_rprt_offset, logoff_time: getInstant()-mt_rprt_offset},

		// data: { pid: mt_pid, name: mt_name },
		// dataType: 'xml',
	});

	// var oj1 = JSON.stringify(request);
  	console.log("current pathname ++: "+ mt_aux1);
  	console.log("current file-name++: "+ mt_aux2);
	console.log("Last url++: "+ mt_posturl);

    // console.log("pid: "+ mt_pid);
    // console.log(mt_rprt);
    // console.log("navigator: "+ navigator.userAgent);
    console.log("data length: " + mt_rprt.length);
    console.log("name: "+ mt_name);
    console.log({pid: mt_pid, content: mt_rprt.join('#'), agent: navigator.userAgent, name: mt_name})
    // var myObj = JSON.stringify(request.url);
    // console.log(Object.values(myObj));

	/*
	request.done(function(xml) {
		if (!mt_silent)
		{mt_rprt.join('#') // Adds all the elements of 'mt_rprt' array separated by the specified separator '#'
			var errornum = $(xml).find('error').first().text();
			var errormsg = $(xml).find('errormsg').first().text();
			var addition = $(xml).find('additional').first().text();

			if (parseInt(errornum)>0)
				console.log('mt.submitData(): Error ' + errornum + ': ' + errormsg + ' (' + addition + ')');
			else
				console.log('mt.submitData(): Tracking data succesfully stored.');
		}
	});

	request.error(function(xml) {
		if (!mt_silent)
			console.log('mt.submitData(): Network or submission error.');
	});//*/
}
