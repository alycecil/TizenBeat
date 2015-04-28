var counter = 0;
var tries = 0;
var myHeartrate = 0.0;
var REQUIRED_HITS = 1;
var MAX_TRIES = 60;

if($===null){var $ = window.$;}

function reset(){
	counter = 0;
	tries = 0;
	console.log("counter-reset");
	myHeartrate = 0.0;
	$('#heartRateText').removeClass('toggleBeat');
}

function stopHRSensor(){
	window.webapis.motion.stop("HRM");
	$('#heartRateText').removeClass('toggleBeat');
}

function showHeartRate(){
	$('#heartRateText').removeClass('toggleBeat');
	var MIN_HEART_RATE = 10;
	myHeartrate=myHeartrate/counter;
	   
   if(myHeartrate>MIN_HEART_RATE){
	   $('#heartRateText').html(Math.round(myHeartrate));
   }else{
	   $('#heartRateText').html('--');
   }
}

function onchangedCB(hrmInfo)
{
//	console.log(JSON.stringify(hrmInfo))
	tries++;

	if(hrmInfo.heartRate>0){
	   counter++;
	   myHeartrate += hrmInfo.heartRate;
	}else if(hrmInfo.rRInterval > 0){
		$('#heartRateText').html(':(<br>'+hrmInfo.rRInterval);
		stop();
	}
   
   if (counter > REQUIRED_HITS)
   {
	  showHeartRate();
	  stopHRSensor();
	  reset();
      
   }else if(tries > MAX_TRIES){
	   
	   showHeartRate();
	   $('#heartRateText').html($('#heartRateText').html()+'<br>failed');

	   stopHRSensor();
	   reset();
   }else if(tries % 7 == 1){
	   $('#heartRateText').toggleClass('toggleBeat');
   }
}

function startHeartRateSensor(){
	window.webapis.motion.start("HRM", onchangedCB);
}


$(window).load(function(){
	document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back"){
            tizen.application.getCurrentApplication().exit();
        }
    });
	
	
	$('.contents').on("click", function(){
		$('#heartRateText').html('<3');
		reset();
		startHeartRateSensor();
		
	});
	
});