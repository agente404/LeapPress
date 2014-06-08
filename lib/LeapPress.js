var options = {
	enableGestures: true,
	frameEventName: "animationFrame"
};
	
var swiped = false;
	
var screen = [window.innerWidth, window.innerHeight];
	
function navigation(){
	if(gesture.direction[0] > 0 && navigation.next != null){
		/* Post Siguiente */
		console.log("Next");							
		window.location.href = navigation.next;
	} else if (navigation.prev != null){
		/* Post Anterior */
		console.log("Previous");
		window.location.href = navigation.prev;		
	}
}
	
function scroll(pixels){
	if(direction > 0 || pitch >= 0.4){
		/* Scroll Abajo */							
		window.scrollBy(0,pixels);
	} else if(direction < 0 || pitch <= -0.4){
		/* Scroll Arriba */
		window.scrollBy(0,-pixels);
	}
}
	
function onSwipe(){
	var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
	var screen = window.screen[1]
				 
	if(isHorizontal){
		navigation();
	} else { //vertical
		scroll(screen);
	}
}
	
function onCircle(){
	if (nFingers == 1){
		if( gesture.normal[2]  < 0 ){
			/* Adelante Navegador */
			console.log("forward");
			history.forward();
		}else{
			/* Atrás Navegador */
			console.log("back");
			history.back();						
		}		
	}
}
	
function onTilt(){
	var pixels = 5;
	scroll(pixels);
}
    		 
console.log("LeapPress Ready");

Leap.loop(options, function(frame) {
    var nHands = frame.hands.length;
    var nFingers = frame.fingers.lenght;
	
    if(nHands > 0){
		var hand = frame.hands[0];
		var pitch = hand.pitch();
		onTilt();
	}
	
	/*Gestos*/
	frame.gestures.forEach(function(gesture) {
	
		var direction = gesture.direction[1];	
		
		if(!swiped){
			switch (gesture.type) {
				case "swipe":			
					onSwipe();
					swiped = true;
					break;
					
				case "circle":
					onCircle();
					swiped = true;
					break;
			}
		}
	});
	setTimeout(function(){swiped=false}, 1000);
});
