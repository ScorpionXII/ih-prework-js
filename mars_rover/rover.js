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

var myRover = {
  positionX: 0,
  positionY: 0, 
  	compass: ['N','E','S','W']
};

function rotateDirection(direction, array){
  if(direction == "left")
    array.unshift(array.pop());
  else if (direction == "right")
    array.push(array.shift());
  return array;
}

function isClear(valX , valY) {
	if (valX > landMap.length - 1 || valY > landMap[0].length - 1) {
		document.write("Position is out of bounds");
		return false;
	}
	
	if (landMap[valX][valY] == 0) {
		writeLine("Next position it's clear");
		return true;	
	}
	
	if (landMap[valX][valY] == 1) {
		document.write("There is an obstacle");
		return false;	
	}
}

function goForward(rover) {
  switch(rover.compass[0]) {
    case 'N':
      rover.positionX++;
      break;
    case 'E':
      rover.positionY++;
      break;
    case 'S':
      rover.positionX--;
      break;
    case 'W':
      rover.positionY--;
      break;
  };

  writeLine("New Rover Position: [" + rover.positionX + ", " + rover.positionY + "]");
  
}

function writeLine(string) {
	document.write(string);
	document.write("<br />");
}

goForward(myRover);
writeLine(myRover.compass[0]);
writeLine(myRover.compass);

rotateDirection("left", myRover.compass);
writeLine(myRover.compass[0]);
writeLine(myRover.compass);

rotateDirection("right", myRover.compass);
writeLine(myRover.compass[0]);
writeLine(myRover.compass);

writeLine(landMap[0].length);

writeLine(landMap[1][1]);
isClear(10,1);
