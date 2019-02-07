/* We create a very simple workflow to demonstrate the capabilities of the tracking module.
		 * The automaton is: s_start --one--> s_one --two--> s_two --three--> s_end
		 * In the transition between s_two and s_end, when three is clicked, we invoke the submitData()
		 * method, to store all collected data up to the moment.
		 */
fda.addTransition('s_start', 'one', 's_one');
fda.addTransition('s_one', 'two', 's_two');
//		fda.addTransition('s_two', 'three', 's_end', function() { submitData() });
fda.addTransition('s_two', 'three', 's_end');

//		var myObj = JSON.stringify(fda.data);
//        alert(myObj);
var myObj = JSON.stringify(fda.data.s_start);
//        alert(myObj);
//		alert("here");

// If we are also interested in knowing whether the browser window is resized, we set this to true.
mt_detect_resize = true;

// This function must be invoked, and it has to go last.
$(document).ready(init);