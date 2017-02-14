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

var activeRover = {
  	   name: "Rover 1",
  positionX: 0,
  positionY: 0, 
  	compass: ['N','E','S','W']
};

var inactiveRover = { 
	   name: "Rover 2",
  positionX: -1,
  positionY: -1, 
    compass: ['N','E','S','W']
};

var lineCounter = 1;


function rotateDirection(direction, rover) {
	if(direction == "left") {
		writeLine("Received command to rotate to Left");
		rover.compass.unshift(rover.compass.pop());
		writeLine(activeRover.name + "Compass it's now pointing: " + rover.compass[0]);
	} else if (direction == "right") {
		writeLine("Received command to rotate to Right");
  		rover.compass.push(rover.compass.shift());	
  		writeLine(activeRover.name + " Compass it's now pointing: " + rover.compass[0]);
  	}
  	return rover;
}

function isClear(valX , valY) {
	writeLine("Received command to move to [" + valX + ", " + valY + "]");
	
	if (valX < 0 || valY < 0 || valX > landMap.length - 1 || valY > landMap[0].length - 1) {
		writeLine("Position is out of bounds");
		return false;
	}
	
	if (valX == inactiveRover.positionX && valY == inactiveRover.positionY) {
		writeLine(inactiveRover.name + " was found in position " + valX + ", " + valY);
		return false;		
	}
	
	if (landMap[valX][valY] == 1) {
		writeLine("Obstacle was found in position " + valX + ", " + valY);
		return false;	
	}
	
	if (landMap[valX][valY] == 0) {
		writeLine("Path it's clear");
		return true;	
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
	
  writeLine(activeRover.name + " Position is: [" + rover.positionX + ", " + rover.positionY + "]"); 
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

  writeLine(activeRover.name + " Position is: [" + rover.positionX + ", " + rover.positionY + "]"); 
}

function processCommandChain(string) {
	string = string.toUpperCase();
	for (var i = 0; i < string.length; i++) {
		switch (string[i]) {
			case 'L': 
				rotateDirection("left", activeRover);
				break;
			case 'R':
				rotateDirection("right", activeRover);
				break;
			case 'F':
				goForward(activeRover);
				break;
			case 'B':
				goBackward(activeRover);
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
	writeLine("Initializing communications...");
	writeLine(activeRover.name + " it's online");
	writeLine(activeRover.name + " Position: [" + activeRover.positionX + ", " + activeRover.positionY + "]");
  	writeLine(activeRover.name + " Compass it's pointing: " + activeRover.compass[0]);
  	console.log(landMap);
}

function changeRover() {
	if (inactiveRover.positionX == -1 && inactiveRover.positionY == -1) {
		inactiveRover.positionX = 0;
		inactiveRover.positionY = 0;
	}
	
	if (activeRover.positionX == inactiveRover.positionX && activeRover.positionY == inactiveRover.positionY) {
		writeLine("Imposible to deploy a Rover in the same position, Move " + activeRover.name + " first!");
		inactiveRover.positionX = -1;
		inactiveRover.positionY = -1;	
	} else {
		tempRover = activeRover;
		activeRover = inactiveRover;
		inactiveRover = tempRover;	
	}
	initialInfo();
}

initialInfo();
