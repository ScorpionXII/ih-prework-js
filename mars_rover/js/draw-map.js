// 
//  draw-map.js
//  ih-prework-js
//  
//  Created by Hery Martin on 2017-02-13.
//  Copyright 2017 Hery Martin . All rights reserved.
// 

var canvas = document.getElementById("map");
var drawer = canvas.getContext("2d");

function drawMap() {

drawer.clearRect(0, 0, 420, 420);
drawer.beginPath();

for (var x = 0; x < landMap.length; x++) 
	for (var y = 0; y < landMap[0].length; y++) {
		switch (landMap[x][y]) {
			case 0:
				drawPath(x, y);
				break;
			case 1:
				drawObstacle(x, y);
				break;		
		}
		
	}
	
	if (activeRover.positionX >= 0 && activeRover.positionY >= 0)
		drawTile("assets/rover-a.png", activeRover.positionX, activeRover.positionY);
		
	if (inactiveRover.positionX >= 0 && inactiveRover.positionY >= 0)
		drawTile("assets/rover-i.png", inactiveRover.positionX, inactiveRover.positionY);
}
	
function drawPath ( posX, posY) {
	drawer.fillStyle = "#E17237";
  	drawer.fillRect(posX * 40 + 10, 380 - (posY * 40 + 10), 40, 40);
  	
  	drawer.setLineDash([3, 5]);
  	drawer.rect(posX * 40 + 10, 380 - (posY * 40 + 10), 40, 40);
  	drawer.strokeStyle = "#853A15";
  	drawer.stroke();
}

function drawObstacle (posX, posY) {
	drawer.fillStyle = "#853A15";
	drawer.fillRect(posX * 40 + 10, 380 - (posY * 40 + 10), 40, 40);
}

function drawTile (imageName, posX, posY) {
	var roverImg = new Image();
	roverImg.src = imageName;
	roverImg.onload = function() { drawer.drawImage(roverImg,(posX * 40 + 10), 380 - (posY * 40 + 10), 40, 40); };	
}