// 
//  rover.js
//  ih-prework-js
//  
//  Created by Hery Martin on 2017-02-13.
//  Copyright 2017 Hery Martin . All rights reserved.
// 

// This is the 10 x 10 Land Map, 0 repesent clear path, change to 1 any value if you need to introduce obstacles
var landMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// This is the main Rover
var activeRover = {
    name: "Rover 1",
    positionX: 0,
    positionY: 0, 
    compass: ['N','E','S','W']
};

// This is the secondary Rover that you can use to rescue the main one;
var inactiveRover = {
    name: "Rover 2",
    positionX: -1,
    positionY: -1, 
    compass: ['N','E','S','W']
};

// This counter is used to show number of lines in the console.
var lineCounter = 1;

// This function rotate the direction of a Rover using rotation method of an Array that represents a compass with the values ordered like [N, E, S, W]
function rotateRover(direction, rover) {
    if(direction === "left") {
        writeLine("Received command to rotate to Left");
        rover.compass.unshift(rover.compass.pop());
        writeLine(activeRover.name + " Compass it's now pointing: " + rover.compass[0]);
    } else if (direction === "right") {
        writeLine("Received command to rotate to Right");
        rover.compass.push(rover.compass.shift());	
        writeLine(activeRover.name + " Compass it's now pointing: " + rover.compass[0]);
    }
    return rover;
}

// This function checks if the position defined by X, Y is valid, clear to move, occupied by a rover or if there is an obstacle
function isClear(valX , valY) {
    
    writeLine("Received command to move to [" + valX + ", " + valY + "]");
    
    if (valX < 0 || valY < 0 || valX > landMap.length - 1 || valY > landMap[0].length - 1) {
        writeLine("Position is out of bounds");
        return false;
    }
    
    if (valX === inactiveRover.positionX && valY === inactiveRover.positionY) {
        writeLine(inactiveRover.name + " was found in position " + valX + ", " + valY);
        return false;		
    }
    
    if (landMap[valX][valY] === 1) {
        writeLine("Obstacle was found in position " + valX + ", " + valY);
        return false;	
    }
    
    if (landMap[valX][valY] === 0) {
        writeLine("Path it's clear");
        return true;
    }
}

// This function Move a Rover in X-axis Forward or Backward using values for delta 1 (F) or -1 (B)
//
// The function is landMap dynamic dimensions based implemented, so you can change the grid and will work anyway
function moveX(delta, rover) {
    if (!(rover.positionX + delta in landMap)) {
        if (delta === -1 && isClear(landMap.length - 1, rover.positionY))
            rover.positionX = landMap.length - 1;
        else if (delta === 1 && isClear(0, rover.positionY))
            rover.positionX = 0;
    } else if (isClear(rover.positionX + delta, rover.positionY))
        rover.positionX += delta;
}

//This function Move a Rover in Y-axis Forward or Backward using values for delta 1 (F) or -1 (B)
//
// The function is landMap dynamic dimensions based implemented, so you can change the grid and will work anyway
function moveY(delta, rover) {
    if (!(rover.positionY + delta in landMap[rover.positionX])) {
        if (delta === -1 && isClear(rover.positionX, landMap[0].length - 1))
            rover.positionY = landMap[0].length - 1;
        else if (delta === 1 && isClear(rover.positionX, 0))
            rover.positionY = 0;
    } else if (isClear(rover.positionX, rover.positionY + delta))
        rover.positionY += delta;
}

// This function Move a Rover
function moveRover(direction, rover) {
    var delta = 0;
    
    if (direction === "forward")
        delta = 1;
    else if (direction === "backward")
        delta = -1;
    
    switch(rover.compass[0]) {
    case 'N':
        moveY(delta, rover);
        break;
    case 'E':
        moveX(delta, rover);
        break;
    case 'S':
        moveY(-delta, rover);
        break;
    case 'W':
        moveX(-delta, rover);
        break;
    };
    
  writeLine(activeRover.name + " Position is: [" + rover.positionX + ", " + rover.positionY + "]");

}

// This function Process a secuence of commands in a string like "fffrflfbb"
function processCommandString(string) {
    string = string.toUpperCase();
    for (var i = 0; i < string.length; i++) {
        switch (string[i]) {
            case 'L': 
                rotateRover("left", activeRover);
                break;
            case 'R':
                rotateRover("right", activeRover);
                break;
            case 'F':
                moveRover("forward" ,activeRover);
                break;
            case 'B':
                 moveRover("backward", activeRover);
                break;
            default:
                writeLine("Unknown Command");
        }
    }
    
    drawMap();
}

// This function Write a Line inside a div that represents a Rover communication console
function writeLine(string) {
    var e = document.getElementById("rover-console");
    e.innerHTML += lineCounter + ":\\> " + string;
    e.innerHTML += "<br />";
    lineCounter++;
    e.scrollTop = e.scrollHeight;
}

// This function Prints info about initial coditions of a Rover
function initialInfo() {
    writeLine("Initializing communications...");
    writeLine(activeRover.name + " it's online");
    writeLine(activeRover.name + " Position: [" + activeRover.positionX + ", " + activeRover.positionY + "]");
    writeLine(activeRover.name + " Compass it's pointing: " + activeRover.compass[0]);
    console.log(landMap);

    drawMap();
}

// This function Change the Active Rover and Deploy the Inactive one in [0, 0], When both Rovers are deployed the function exchange them to send commands to the other one
function changeRover() {
    if (inactiveRover.positionX === -1 && inactiveRover.positionY === -1) {
        inactiveRover.positionX = 0;
        inactiveRover.positionY = 0;
    }

    if (activeRover.positionX === inactiveRover.positionX && activeRover.positionY === inactiveRover.positionY) {
        writeLine("Impossible to deploy a Rover in the same position, Move " + activeRover.name + " first!");
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
