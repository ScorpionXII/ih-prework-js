// 
//  rover.js
//  ih-prework-js
//  
//  Created by Hery Martin on 2017-02-13.
//  Copyright 2017 Hery Martin . All rights reserved.
// 

var landMap = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var Rover1 = {
  positionX: 0,
  positionY: 0, 
  	compass: ['N','E','S','W']
};

var lineCounter = 1;


function rotateDirection(direction, rover) {
	if(direction == "left") {
		writeLine("Received command to rotate to Left");
		rover.compass.unshift(rover.compass.pop());
		writeLine("Rover Compass it's now pointing: " + rover.compass[0]);
	} else if (direction == "right") {
		writeLine("Received command to rotate to Right");
  		rover.compass.push(rover.compass.shift());	
  		writeLine("Rover Compass it's now pointing: " + rover.compass[0]);
  	}
  	return rover;
}

function isClear(valX , valY) {
	writeLine("Received command to move to [" + valX + ", " + valY + "]");
	
	if (valX < 0 || valY < 0 || valX > landMap.length - 1 || valY > landMap[0].length - 1) {
		writeLine("Position is out of bounds");
		return false;
	}
	
	if (landMap[valX][valY] == 0) {
		writeLine("Path it's clear");
		return true;	
	}
	
	if (landMap[valX][valY] == 1) {
		writeLine("Obstacle where found in position " + valX + ", " + valY);
		return false;	
	}
}

function goForward(rover) {
	switch(rover.compass[0]) {
	case 'N':
		if (isClear(rover.positionX + 1, rover.positionY))
			rover.positionX++;
		break;
	case 'E':
		if (isClear(rover.positionX, rover.positionY + 1))
			rover.positionY++;
		break;
	case 'S':
		if (isClear(rover.positionX - 1, rover.positionY))
			rover.positionX--;
		break;
	case 'W':
		if (isClear(rover.positionX, rover.positionY - 1))
			rover.positionY--;
		break;
	};
	
  writeLine("Rover Position is: [" + rover.positionX + ", " + rover.positionY + "]"); 
}

function goBackward(rover) {
	switch(rover.compass[0]) {
	case 'N':
		if (isClear(rover.positionX - 1, rover.positionY))
			rover.positionX--;
		break;
	case 'E':
		if (isClear(rover.positionX, rover.positionY - 1))
			rover.positionY--;
		break;
	case 'S':
		if (isClear(rover.positionX + 1, rover.positionY))
			rover.positionX++;
		break;
	case 'W':
		if (isClear(rover.positionX, rover.positionY + 1))
			rover.positionY++;
		break;
	};

  writeLine("Rover Position is: [" + rover.positionX + ", " + rover.positionY + "]"); 
}

function processCommandChain(string) {
	string = string.toUpperCase();
	for (var i = 0; i < string.length; i++) {
		switch (string[i]) {
			case 'L': 
				rotateDirection("left", Rover1);
				break;
			case 'R':
				rotateDirection("right", Rover1);
				break;
			case 'F':
				goForward(Rover1);
				break;
			case 'B':
				goBackward(Rover1);
				break;
			default:
				writeLine("Unknown Command");
		}
	}
}

function writeLine(string) {
	var e = document.getElementById("rover-console");
	e.innerHTML += lineCounter + ":\\> " + string;
	e.innerHTML += "<br />";
	lineCounter++;
}

function initialInfo () {
	//landMap[Rover1.positionX][Rover1.positionY] = 'R';
	writeLine("Initializing communications...");
	writeLine("Rover it's online");
	writeLine("Rover Position: [" + Rover1.positionX + ", " + Rover1.positionY + "]");
  	writeLine("Rover Compass it's pointing: " + Rover1.compass[0]);
  	console.log(landMap);
}

initialInfo();
