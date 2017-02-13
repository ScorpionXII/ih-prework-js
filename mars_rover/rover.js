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
		writeLn("Next position it's clear");
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

  console.log("New Rover Position: [" + rover.positionX + ", " + rover.positionY + "]");
  
}

function writeLn(string) {
	document.write(string);
	document.write("<br />");
}

goForward(myRover);
writeLn(myRover.compass[0]);
writeLn(myRover.compass);

rotateDirection("left", myRover.compass);
writeLn(myRover.compass[0]);
writeLn(myRover.compass);

rotateDirection("right", myRover.compass);
writeLn(myRover.compass[0]);
writeLn(myRover.compass);

writeLn(landMap[0].length);

writeLn(landMap[1][1]);
isClear(10,1);
