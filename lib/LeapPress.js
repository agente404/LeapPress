	var options = {
		enableGestures: true,
		frameEventName: "animationFrame"
	};
	
	var swiped = false;
	
	var screen = [window.innerWidth, window.innerHeight];
	
	function navigation(){
		if(gesture.direction[0] > 0 && navigation.next != null){
			/* Post Siguiente */
			console.log("swipe derecha");							
			window.location.href = navigation.next;
		} else if (navigation.prev != null){
			/* Post Anterior */
			console.log("swipe izquierda");
			window.location.href = navigation.prev;		
		}
	}
	
	function scroll(){
		var scroll = window.screen[1];
					
		if(gesture.direction[1] > 0){
			/* Scroll Avance Página */
			console.log("swipe arriba");							
			window.scrollBy(0,scroll);
		} else if(gesture.direction[1] < 0){
			/* Scroll Retroceso Página */
			console.log("swipe abajo");
			window.scrollBy(0,-scroll);
		}
	}
	
	function onSwipe(){
		var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
					 
		if(isHorizontal){
			navigation();
		} else { //vertical
			scroll();
		}
	}
	
	function onCircle(){
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
	
	function onTilt(){
		/*Código para scroll "linea a linea"*/			
		if (hand.pitch() <= -0.4){
			console.log("inclinacion abajo"); 
			window.scrollBy(0,-5);			
		}else if (hand.pitch() >= 0.4){
			console.log("inclinacion arriba");
			window.scrollBy(0,5);		
		}
	}
    		 
	console.log("HOLA!!!");
	Leap.loop(options, function(frame) {
	    var nHands = frame.hands.length;
		if(nHands > 0){
			var hand = frame.hands[0];			
			onTilt();
		}
		
		/*Gestos*/
		frame.gestures.forEach(function(gesture) {
			if(!swiped){
				switch (gesture.type) {
					case "swipe":			
						onSwipe();
						swiped = true;
						break;
						
					case "circle":
						if (nHands == 1){
							onCircle();
						}
						swiped = true;
						break;
				}
			}
		});		
	});
