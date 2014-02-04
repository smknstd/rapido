(function () {
   "use strict";

	var welcome = "The Game is in the url. Press 's' to start ! Press 'h' for Help";
	var aide = "Press on your keyboard the letters which appear. 1 point when you succeed, -2 when you're wrong. When there are more than 30 letters, game over :(";
	var end = "Game over"
	var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var max = 30;

	var running = false;
	var perdu = false;
	var score = 0;
	var chaine = [];

	first();

	function random(){
		return Math.floor(Math.random() * 26) + 1
	}

	function over(){
		running = false;
		perdu = true;
	}

	function first(){
		window.location.replace("#"+welcome);
		//window.history.replaceState( {state:1} , "title", "#"+welcome );
	}

	function help(){
		window.location.replace("#"+aide);
		//window.history.replaceState( {state:1} , "title", "#"+aide );
	}

	function start(){
		running=true;
		//timer
		setInterval(gameLoop, 850);
	}

	function reduce(keyCode){
		if(String.fromCharCode(keyCode).toLowerCase() == chaine[0]){
	      chaine.shift();
	      // 1 point by letter
	      score+=1;
	    } else {
	      // Bad touch, loose 2 point !
	      switch (score){ 
	      	case 0:
	      		break;
	      	case 1:
	      		score=0;
	      		break;
	      	default:
	      	   	score-=2;
	      	   	break;
	      }
	    }
	}

	function generate(){
	   chaine.push(alphabet[random()]);
	}

	function gameLoop(){
	    if(running){
		    if(score < 0 || chaine.length > max){
		      over();
		    }else{
		      generate();
		      refresh();
		    }
	    }else{
	    	window.location.replace("#Score=" + score + "_" + end);
	    }
	} 

	function refresh(){
		window.location.replace("#Score=" + score + "_" + chaine.join(""));
	}


	$(document).on('keydown keyup', function(e) {
	    if (e.type == 'keydown') { 
	        
	        if (running && e.keyCode > 64 && e.keyCode < 91) { 
	          // si une touche de l'alphabet est préssée lorsque le jeu est démarré
	          reduce(e.keyCode);
	        }else if (!perdu && !running && e.keyCode == 83){
	          // si 's' est préssé lorsque le jeu n'est pas démarré
	          start();
	        } else if(!perdu && !running && e.keyCode == 72){
	          // si 'h' est préssé lorsque le jeu n'est pas démarré
	          help();
	        }
	    }
	    return false;
	});
}());
