var h=0;
var m=0;
var s=0;
var set_init=0;

function to_start2(arg_n2) {
    var hour = 0;
    var min = 0;
    var sec = 0;
    var x = 0;
    var distance = 0;
    alert(typeof 'distance');
    alert (hour +" "+min + " " + x +" "+ distance);
    // alarm (hour);
    // Set the date we're counting down to
//    var countDownDate = new Date("Jan 5, 2019 15:37:25").getTime();
    var start_time = new Date().getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
//        var distance = countDownDate - now;
        var distance = now - start_time;

        // Time calculations for days, hours, minutes and seconds
//        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hour = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var sec = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
//        document.getElementById("inactive_time").innerHTML=days+"d "+hours+"h "+minutes+"m "+seconds+"s ";
//         alert(min);
        document.getElementById("inactive_time").innerHTML=hour+"h "+min+"m "+sec+"s ";

        // If the count down is over, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("inactive_time").innerHTML = "EXPIRED";
        }
    }, 1000);

    return;

}

// function to_start(arg_n1){
//     alert("arg_n1: " + arg_n1);
//     arg_n1 = 1;
//     alert("arg_n1 1: " + arg_n1);
//     tm=window.setInterval('disp()',1000);
//
//     // switch(document.getElementById('btn').value)
//     // {
//     //     case  'Stop':
//     //         set_init = 2;
//     //         alert("set_init 2: " + set_init);
//     //         window.clearInterval(tm); // stop the timer
//     //         // alert (typeof (tm));
//     //         // alert (tm);
//     //         document.getElementById('btn').value='Start';
//     //         break;
//     //     case  'Start':
//     //         set_init = 3;
//     //         alert("set_init 3: " + set_init);
//     //         tm=window.setInterval('disp()',1000);
//     //         document.getElementById('btn').value='Stop';
//     //         break;
//     // }
// }
//
// function disp(){
//     // set_init = 4;
//     // alert("set_init 4: " + set_init);
// // Format the output by adding 0 if it is single digit //
//     if(s<10){var s1='0' + s;}
//     else{var s1=s;}
//     if(m<10){var m1='0' + m;}
//     else{var m1=m;}
//     if(h<10){var h1='0' + h;}
//     else{var h1=h;}
// // Display the output //
//     str= h1 + ':' + m1 +':' + s1 ;
//     document.getElementById('n1').innerHTML=str;
// // Calculate the stop watch //
//     if(s<59){
//         s=s+1;
//     }else{
//         s=0;
//         m=m+1;
//         if(m==60){
//             m=0;
//             h=h+1;
//         } // end if  m ==60
//     }// end if else s < 59
// // end of calculation for next display
//
// }