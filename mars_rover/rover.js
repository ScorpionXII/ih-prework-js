// 
//  rover.js
//  ih-prework-js
//  
//  Created by Hery Martin on 2017-02-13.
//  Copyright 2017 Hery Martin . All rights reserved.
// 

var landMap = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

var myRover = {
  positionX: 0,
  positionY: 0, 
  	compass: ['N','E','S','W']
};

var lineCounter = 1;


function rotateDirection(direction, array) {
  if(direction == "left")
    array.unshift(array.pop());
  else if (direction == "right")
    array.push(array.shift());
  return array;
}

function isClear(valX , valY) {
	if (valX < 0 || valY < 0 || valX > landMap.length - 1 || valY > landMap[0].length - 1) {
		writeLine("Position is out of bounds");
		return false;
	}
	
	if (landMap[valX][valY] == 0) {
		writeLine("You are trying to move to position " + valX + "," + valY + " and it's clear");
		return true;	
	}
	
	if (landMap[valX][valY] == 1) {
		writeLine("Obstacle where found in position " + valX + "," + valY);
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
	
  writeLine("Rover Position: [" + rover.positionX + ", " + rover.positionY + "]"); 
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

  writeLine("Rover Position: [" + rover.positionX + ", " + rover.positionY + "]"); 
}

function processCommandChain(string) {
	string = string.toUpperCase();
	for (var i = 0; i < string.length; i++) {
		switch (string[i]) {
			case 'L': 
				rotateDirection("left", myRover.compass);
				break;
			case 'R':
				rotateDirection("right", myRover.compass);
				break;
			case 'F':
				goForward(myRover);
				break;
			case 'B':
				goBackward(myRover);
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

// goForward(myRover);
// writeLine(myRover.compass[0]);
// writeLine(myRover.compass);
// 
// rotateDirection("left", myRover.compass);
// writeLine(myRover.compass[0]);
// writeLine(myRover.compass);
// 
// rotateDirection("right", myRover.compass);
// writeLine(myRover.compass[0]);
// writeLine(myRover.compass);
// 
// writeLine(landMap[0].length);
// 
// writeLine(landMap[1][1]);
// isClear(1,1);
