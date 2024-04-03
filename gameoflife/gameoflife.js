document.addEventListener("DOMContentLoaded", () => {

	let gridLiveID = [];
	let gridWidth = 50;
	let gridHeight = 30;
	let liveCellColor = "#65DC55";
	let generation = 0;
	let intervalID = false;
	let interval;
	let intervalTimer = 200;
	
	document.querySelector("#generation").innerHTML = generation;
	document.querySelector("#grid").innerHTML = '';
	document.querySelector("#start-pause-resume-btn").addEventListener("click", () => {
		if(intervalID) {
			clearInterval(interval);
			intervalID = false;
		} else {
			interval = setInterval(start, intervalTimer);
			intervalID = true;
		}
	});
	document.querySelector("#randomise-btn").addEventListener("click", () => {
		randomise();
	});
	document.querySelector("#clear-board-btn").addEventListener("click", () => {
		clearBoard();
	});
	document.querySelector("#patterns-btn").addEventListener("click", () => {
		document.querySelector("#btn-container").style.display = "none";
		document.querySelector("#pattern-container").style.display = "block";
	});
	document.querySelector("#patterns-go-back-btn").addEventListener("click", () => {
		document.querySelector("#pattern-container").style.display = "none";
		document.querySelector("#btn-container").style.display = "block";
	});
	
	// PATTERNS *******************************************************************************
	document.querySelector("#patterns-glider-gun-btn").addEventListener("click", () => {
		pause();
		clearBoard();
		loadPattern("glider-gun");
	});
	document.querySelector("#patterns-pulsar-btn").addEventListener("click", () => {
		pause();
		clearBoard();
		loadPattern("pulsar");
	});
	document.querySelector("#patterns-crazy-corners-btn").addEventListener("click", () => {
		pause();
		clearBoard();
		loadPattern("crazy-corners");
	});
	document.querySelector("#patterns-pentadecathlon-btn").addEventListener("click", () => {
		pause();
		clearBoard();
		loadPattern("pentadecathlon");
	});
	document.querySelector("#patterns-baby-pulsar-btn").addEventListener("click", () => {
		pause();
		clearBoard();
		loadPattern("baby-pulsar");
	});
	document.querySelector("#patterns-load-pattern-btn").addEventListener("click", () => {
		pause();
		clearBoard();
		loadPattern("load-pattern");
	});
	document.querySelector("#patterns-maximum-density-still-life-btn").addEventListener("click", () => {
		pause();
		clearBoard();
		loadPattern("maximum-density-still-life");
	});
	
	// ****************************************************************************************
	for(let i = 0; i < gridWidth * gridHeight; i++) {
		gridLiveID.push(false);
		
		document.querySelector("#grid").innerHTML += `
			<div id="grid-cell-${i + 1}"></div>
		`;
	}
	
	Array.from(document.querySelectorAll("#grid div")).forEach((item, index) => {
		item.addEventListener("click", () => {
			if(gridLiveID[index] === false) {
				gridLiveID[index] = true;
				item.style.backgroundColor = liveCellColor;
			} else {
				gridLiveID[index] = false;
				item.style.backgroundColor = "inherit";
			}
		});
	});
	
	loadPattern("load-pattern");
	
	interval = setInterval(start, intervalTimer);
	intervalID = true;
	
	
	
	
	
	function start() {
		generation++;
		document.querySelector("#generation").innerHTML = generation;
		
		let tempGridLiveID = [...gridLiveID];
		
		for(let i = 0; i < gridLiveID.length; i++) {
			if(gridLiveID[i]) {
				checkForDeath(i, tempGridLiveID);
			} else {
				checkForLife(i, tempGridLiveID);
			}
		}
		
		gridLiveID = [...tempGridLiveID];
		
		for(let i = 0; i < gridLiveID.length; i++) {
			if(gridLiveID[i]) {
				document.querySelector(`#grid-cell-${i + 1}`).style.backgroundColor = liveCellColor;
			} else {
				document.querySelector(`#grid-cell-${i + 1}`).style.backgroundColor = "inherit";
			}
		}
	}
	
	
	
	
	
	function countLiveCells(i) {
		let count = 0;
		
		for(let j = i - gridWidth - 1; j < i + gridWidth; j += gridWidth) {
			for(let k = j; k < j + 3; k++) {
				if(k !== i && k - i < 2 * gridWidth && i - k < 2 * gridWidth && (i % gridWidth) - (k % gridWidth) < 2 && (k % gridWidth) - (i % gridWidth) < 2) {
					if(gridLiveID[k]) {
						count++;
					}
				}
			}
		}
		
		return count;
	}
	
	
	
	
	
	function checkForDeath(i, tempGridLiveID) {
		if(countLiveCells(i) < 2) {
			tempGridLiveID[i] = false;
		} else if(countLiveCells(i) > 3) {
			tempGridLiveID[i] = false;
		}
	}
	
	
	
	
	
	function checkForLife(i, tempGridLiveID) {
		if(countLiveCells(i) === 3) {
			tempGridLiveID[i] = true;
		}
	}
	
	
	
	
	
	function randomise() {
		generation = 0;
		
		document.querySelector("#generation").innerHTML = generation;
		
		for(let i = 0; i < gridLiveID.length; i++) {
			if(Math.floor(Math.random() * 2) === 0) {
				gridLiveID[i] = false;
				document.querySelector(`#grid-cell-${i + 1}`).style.backgroundColor = "inherit";
			} else {
				gridLiveID[i] = true;
				document.querySelector(`#grid-cell-${i + 1}`).style.backgroundColor = liveCellColor;
			}
		}
	}
	
	
	
	
	
	function clearBoard() {
		for(let i = 0; i < gridLiveID.length; i++) {
			pause();
			
			gridLiveID[i] = false;
			generation = 0;
			
			document.querySelector("#generation").innerHTML = generation;
			document.querySelector(`#grid-cell-${i + 1}`).style.backgroundColor = "inherit";
		}
	}
	
	
	
	
	
	function pause() {
		clearInterval(interval);
		intervalID = false;
	}
	
	
	
	
	
	function loadPattern(pattern) {
		let cells = Array.from(document.querySelectorAll("#grid div"));
		
		generation = 0;
		
		document.querySelector("#generation").innerHTML = generation;
		
		if(pattern === "glider-gun") {
			gridLiveID[gridWidth * 5 + 1] = true;
			gridLiveID[gridWidth * 5 + 2] = true;
			gridLiveID[gridWidth * 6 + 1] = true;
			gridLiveID[gridWidth * 6 + 2] = true;
			gridLiveID[gridWidth * 5 + 11] = true;
			gridLiveID[gridWidth * 6 + 11] = true;
			gridLiveID[gridWidth * 7 + 11] = true;
			gridLiveID[gridWidth * 4 + 12] = true;
			gridLiveID[gridWidth * 8 + 12] = true;
			gridLiveID[gridWidth * 3 + 13] = true;
			gridLiveID[gridWidth * 9 + 13] = true;
			gridLiveID[gridWidth * 3 + 14] = true;
			gridLiveID[gridWidth * 9 + 14] = true;
			gridLiveID[gridWidth * 6 + 15] = true;
			gridLiveID[gridWidth * 4 + 16] = true;
			gridLiveID[gridWidth * 8 + 16] = true;
			gridLiveID[gridWidth * 5 + 17] = true;
			gridLiveID[gridWidth * 6 + 17] = true;
			gridLiveID[gridWidth * 7 + 17] = true;
			gridLiveID[gridWidth * 6 + 18] = true;
			gridLiveID[gridWidth * 3 + 21] = true;
			gridLiveID[gridWidth * 4 + 21] = true;
			gridLiveID[gridWidth * 5 + 21] = true;
			gridLiveID[gridWidth * 3 + 22] = true;
			gridLiveID[gridWidth * 4 + 22] = true;
			gridLiveID[gridWidth * 5 + 22] = true;
			gridLiveID[gridWidth * 2 + 23] = true;
			gridLiveID[gridWidth * 6 + 23] = true;
			gridLiveID[gridWidth  + 25] = true;
			gridLiveID[gridWidth * 2 + 25] = true;
			gridLiveID[gridWidth * 6 + 25] = true;
			gridLiveID[gridWidth * 7 + 25] = true;
			gridLiveID[gridWidth * 3 + 35] = true;
			gridLiveID[gridWidth * 4 + 35] = true;
			gridLiveID[gridWidth * 3 + 36] = true;
			gridLiveID[gridWidth * 4 + 36] = true;
		} else if(pattern === "pulsar") {
			gridLiveID[gridWidth * 12 + 17] = true;
			gridLiveID[gridWidth * 18 + 17] = true;
			gridLiveID[gridWidth * 12 + 18] = true;
			gridLiveID[gridWidth * 18 + 18] = true;
			gridLiveID[gridWidth * 12 + 19] = true;
			gridLiveID[gridWidth * 13 + 19] = true;
			gridLiveID[gridWidth * 17 + 19] = true;
			gridLiveID[gridWidth * 18 + 19] = true;
			gridLiveID[gridWidth * 8 + 21] = true;
			gridLiveID[gridWidth * 9 + 21] = true;
			gridLiveID[gridWidth * 10 + 21] = true;
			gridLiveID[gridWidth * 13 + 21] = true;
			gridLiveID[gridWidth * 14 + 21] = true;
			gridLiveID[gridWidth * 16 + 21] = true;
			gridLiveID[gridWidth * 17 + 21] = true;
			gridLiveID[gridWidth * 20 + 21] = true;
			gridLiveID[gridWidth * 21 + 21] = true;
			gridLiveID[gridWidth * 22 + 21] = true;
			gridLiveID[gridWidth * 10 + 22] = true;
			gridLiveID[gridWidth * 12 + 22] = true;
			gridLiveID[gridWidth * 14 + 22] = true;
			gridLiveID[gridWidth * 16 + 22] = true;
			gridLiveID[gridWidth * 18 + 22] = true;
			gridLiveID[gridWidth * 20 + 22] = true;
			gridLiveID[gridWidth * 12 + 23] = true;
			gridLiveID[gridWidth * 13 + 23] = true;
			gridLiveID[gridWidth * 17 + 23] = true;
			gridLiveID[gridWidth * 18 + 23] = true;
			gridLiveID[gridWidth * 12 + 25] = true;
			gridLiveID[gridWidth * 13 + 25] = true;
			gridLiveID[gridWidth * 17 + 25] = true;
			gridLiveID[gridWidth * 18 + 25] = true;
			gridLiveID[gridWidth * 10 + 26] = true;
			gridLiveID[gridWidth * 12 + 26] = true;
			gridLiveID[gridWidth * 14 + 26] = true;
			gridLiveID[gridWidth * 16 + 26] = true;
			gridLiveID[gridWidth * 18 + 26] = true;
			gridLiveID[gridWidth * 20 + 26] = true;
			gridLiveID[gridWidth * 8 + 27] = true;
			gridLiveID[gridWidth * 9 + 27] = true;
			gridLiveID[gridWidth * 10 + 27] = true;
			gridLiveID[gridWidth * 13 + 27] = true;
			gridLiveID[gridWidth * 14 + 27] = true;
			gridLiveID[gridWidth * 16 + 27] = true;
			gridLiveID[gridWidth * 17 + 27] = true;
			gridLiveID[gridWidth * 20 + 27] = true;
			gridLiveID[gridWidth * 21 + 27] = true;
			gridLiveID[gridWidth * 22 + 27] = true;
			gridLiveID[gridWidth * 12 + 29] = true;
			gridLiveID[gridWidth * 13 + 29] = true;
			gridLiveID[gridWidth * 17 + 29] = true;
			gridLiveID[gridWidth * 18 + 29] = true;
			gridLiveID[gridWidth * 12 + 30] = true;
			gridLiveID[gridWidth * 18 + 30] = true;
			gridLiveID[gridWidth * 12 + 31] = true;
			gridLiveID[gridWidth * 18 + 31] = true;
		} else if(pattern === "crazy-corners") {
			gridLiveID[1] = true;
			gridLiveID[2] = true;
			gridLiveID[gridWidth * 1] = true;
			gridLiveID[gridWidth * 2] = true;
			gridLiveID[gridWidth + 2] = true;
			gridLiveID[gridWidth * 2 + 1] = true;
			gridLiveID[gridWidth * 4 + 1] = true;
			gridLiveID[gridWidth * 4 + 2] = true;
			gridLiveID[gridWidth * 5 + 2] = true;
			gridLiveID[gridWidth * 6 + 2] = true;
			gridLiveID[gridWidth + 4] = true;
			gridLiveID[gridWidth * 2 + 4] = true;
			gridLiveID[gridWidth * 2 + 5] = true;
			gridLiveID[gridWidth * 2 + 6] = true;
			gridLiveID[gridWidth - 2] = true;
			gridLiveID[gridWidth - 3] = true;
			gridLiveID[gridWidth * 1 + gridWidth - 1] = true;
			gridLiveID[gridWidth * 2 + gridWidth - 1] = true;
			gridLiveID[gridWidth * 2 + gridWidth - 2] = true;
			gridLiveID[gridWidth + gridWidth - 3] = true;
			gridLiveID[gridWidth + gridWidth - 5] = true;
			gridLiveID[gridWidth * 2 + gridWidth - 5] = true;
			gridLiveID[gridWidth * 2 + gridWidth - 6] = true;
			gridLiveID[gridWidth * 2 + gridWidth - 7] = true;
			gridLiveID[gridWidth * 4 + gridWidth - 2] = true;
			gridLiveID[gridWidth * 4 + gridWidth - 3] = true;
			gridLiveID[gridWidth * 5 + gridWidth - 3] = true;
			gridLiveID[gridWidth * 6 + gridWidth - 3] = true;
			gridLiveID[gridWidth * 14 + gridWidth + 20] = true;
			gridLiveID[gridWidth * 14 + gridWidth + 21] = true;
			gridLiveID[gridWidth * 14 + gridWidth + 22] = true;
			gridLiveID[gridWidth * 9 + gridWidth + 25] = true;
			gridLiveID[gridWidth * 10 + gridWidth + 25] = true;
			gridLiveID[gridWidth * 11 + gridWidth + 25] = true;
			gridLiveID[gridWidth * 17 + gridWidth + 25] = true;
			gridLiveID[gridWidth * 18 + gridWidth + 25] = true;
			gridLiveID[gridWidth * 19 + gridWidth + 25] = true;
			gridLiveID[gridWidth * 14 + gridWidth + 28] = true;
			gridLiveID[gridWidth * 14+ gridWidth + 29] = true;
			gridLiveID[gridWidth * 14 + gridWidth + 30] = true;
			gridLiveID[gridWidth * (gridHeight - 2)] = true;
			gridLiveID[gridWidth * (gridHeight - 3)] = true;
			gridLiveID[gridWidth * (gridHeight - 1) + 1] = true;
			gridLiveID[gridWidth * (gridHeight - 3) + 1] = true;
			gridLiveID[gridWidth * (gridHeight - 5) + 1] = true;
			gridLiveID[gridWidth * (gridHeight - 1) + 2] = true;
			gridLiveID[gridWidth * (gridHeight - 2) + 2] = true;
			gridLiveID[gridWidth * (gridHeight - 5) + 2] = true;
			gridLiveID[gridWidth * (gridHeight - 6) + 2] = true;
			gridLiveID[gridWidth * (gridHeight - 7) + 2] = true;
			gridLiveID[gridWidth * (gridHeight - 2) + 4] = true;
			gridLiveID[gridWidth * (gridHeight - 3) + 4] = true;
			gridLiveID[gridWidth * (gridHeight - 3) + 5] = true;
			gridLiveID[gridWidth * (gridHeight - 3) + 6] = true;
			gridLiveID[gridWidth * (gridHeight - 3) + gridWidth - 7] = true;
			gridLiveID[gridWidth * (gridHeight - 3) + gridWidth - 6] = true;
			gridLiveID[gridWidth * (gridHeight - 2) + gridWidth - 5] = true;
			gridLiveID[gridWidth * (gridHeight - 3) + gridWidth - 5] = true;
			gridLiveID[gridWidth * (gridHeight - 1) + gridWidth - 3] = true;
			gridLiveID[gridWidth * (gridHeight - 2) + gridWidth - 3] = true;
			gridLiveID[gridWidth * (gridHeight - 5) + gridWidth - 3] = true;
			gridLiveID[gridWidth * (gridHeight - 6) + gridWidth - 3] = true;
			gridLiveID[gridWidth * (gridHeight - 7) + gridWidth - 3] = true;
			gridLiveID[gridWidth * (gridHeight - 1) + gridWidth - 2] = true;
			gridLiveID[gridWidth * (gridHeight - 3) + gridWidth - 2] = true;
			gridLiveID[gridWidth * (gridHeight - 5) + gridWidth - 2] = true;
			gridLiveID[gridWidth * (gridHeight - 2) + gridWidth - 1] = true;
			gridLiveID[gridWidth * (gridHeight - 3) + gridWidth - 1] = true;
		} else if(pattern === "pentadecathlon") {
			gridLiveID[gridWidth * 12 + 14] = true;
			gridLiveID[gridWidth * 17 + 14] = true;
			gridLiveID[gridWidth * 10 + 15] = true;
			gridLiveID[gridWidth * 11 + 15] = true;
			gridLiveID[gridWidth * 13 + 15] = true;
			gridLiveID[gridWidth * 14 + 15] = true;
			gridLiveID[gridWidth * 15 + 15] = true;
			gridLiveID[gridWidth * 16 + 15] = true;
			gridLiveID[gridWidth * 18 + 15] = true;
			gridLiveID[gridWidth * 19 + 15] = true;
			gridLiveID[gridWidth * 12 + 16] = true;
			gridLiveID[gridWidth * 17 + 16] = true;
			gridLiveID[gridWidth * 12 + 35] = true;
			gridLiveID[gridWidth * 17 + 35] = true;
			gridLiveID[gridWidth * 10 + 36] = true;
			gridLiveID[gridWidth * 11 + 36] = true;
			gridLiveID[gridWidth * 13 + 36] = true;
			gridLiveID[gridWidth * 14 + 36] = true;
			gridLiveID[gridWidth * 15 + 36] = true;
			gridLiveID[gridWidth * 16 + 36] = true;
			gridLiveID[gridWidth * 18 + 36] = true;
			gridLiveID[gridWidth * 19 + 36] = true;
			gridLiveID[gridWidth * 12 + 37] = true;
			gridLiveID[gridWidth * 17 + 37] = true;
		} else if(pattern === "baby-pulsar") {
			gridLiveID[gridWidth * 14 + 23] = true;
			gridLiveID[gridWidth * 15 + 23] = true;
			gridLiveID[gridWidth * 16 + 23] = true;
			gridLiveID[gridWidth * 13 + 24] = true;
			gridLiveID[gridWidth * 14 + 24] = true;
			gridLiveID[gridWidth * 16 + 24] = true;
			gridLiveID[gridWidth * 17 + 24] = true;
			gridLiveID[gridWidth * 14 + 25] = true;
			gridLiveID[gridWidth * 15 + 25] = true;
			gridLiveID[gridWidth * 16 + 25] = true;
		} else if(pattern === "load-pattern") {
			gridLiveID[gridWidth * 5 + 1] = true;
			gridLiveID[gridWidth * 5 + 2] = true;
			gridLiveID[gridWidth * 6 + 1] = true;
			gridLiveID[gridWidth * 6 + 2] = true;
			gridLiveID[gridWidth * 5 + 11] = true;
			gridLiveID[gridWidth * 6 + 11] = true;
			gridLiveID[gridWidth * 7 + 11] = true;
			gridLiveID[gridWidth * 4 + 12] = true;
			gridLiveID[gridWidth * 8 + 12] = true;
			gridLiveID[gridWidth * 3 + 13] = true;
			gridLiveID[gridWidth * 9 + 13] = true;
			gridLiveID[gridWidth * 3 + 14] = true;
			gridLiveID[gridWidth * 9 + 14] = true;
			gridLiveID[gridWidth * 6 + 15] = true;
			gridLiveID[gridWidth * 4 + 16] = true;
			gridLiveID[gridWidth * 8 + 16] = true;
			gridLiveID[gridWidth * 5 + 17] = true;
			gridLiveID[gridWidth * 6 + 17] = true;
			gridLiveID[gridWidth * 7 + 17] = true;
			gridLiveID[gridWidth * 6 + 18] = true;
			gridLiveID[gridWidth * 3 + 21] = true;
			gridLiveID[gridWidth * 4 + 21] = true;
			gridLiveID[gridWidth * 5 + 21] = true;
			gridLiveID[gridWidth * 3 + 22] = true;
			gridLiveID[gridWidth * 4 + 22] = true;
			gridLiveID[gridWidth * 5 + 22] = true;
			gridLiveID[gridWidth * 2 + 23] = true;
			gridLiveID[gridWidth * 6 + 23] = true;
			gridLiveID[gridWidth + 25] = true;
			gridLiveID[gridWidth * 2 + 25] = true;
			gridLiveID[gridWidth * 6 + 25] = true;
			gridLiveID[gridWidth * 7 + 25] = true;
			gridLiveID[gridWidth * 3 + 35] = true;
			gridLiveID[gridWidth * 4 + 35] = true;
			gridLiveID[gridWidth * 3 + 36] = true;
			gridLiveID[gridWidth * 4 + 36] = true;
			gridLiveID[gridWidth + 37] = true;
			gridLiveID[gridWidth * 2 + 37] = true;
			gridLiveID[gridWidth + 38] = true;
			gridLiveID[gridWidth * 2 + 38] = true;
			gridLiveID[gridWidth * 17 + 6] = true;
			gridLiveID[gridWidth * 18 + 6] = true;
			gridLiveID[gridWidth * 19 + 6] = true;
			gridLiveID[gridWidth * 23 + 6] = true;
			gridLiveID[gridWidth * 24 + 6] = true;
			gridLiveID[gridWidth * 25 + 6] = true;
			gridLiveID[gridWidth * 15 + 8] = true;
			gridLiveID[gridWidth * 20 + 8] = true;
			gridLiveID[gridWidth * 22 + 8] = true;
			gridLiveID[gridWidth * 27 + 8] = true;
			gridLiveID[gridWidth * 15 + 9] = true;
			gridLiveID[gridWidth * 20 + 9] = true;
			gridLiveID[gridWidth * 22 + 9] = true;
			gridLiveID[gridWidth * 27 + 9] = true;
			gridLiveID[gridWidth * 15 + 10] = true;
			gridLiveID[gridWidth * 20 + 10] = true;
			gridLiveID[gridWidth * 22 + 10] = true;
			gridLiveID[gridWidth * 27 + 10] = true;
			gridLiveID[gridWidth * 17 + 11] = true;
			gridLiveID[gridWidth * 18 + 11] = true;
			gridLiveID[gridWidth * 19 + 11] = true;
			gridLiveID[gridWidth * 23 + 11] = true;
			gridLiveID[gridWidth * 24 + 11] = true;
			gridLiveID[gridWidth * 25 + 11] = true;
			gridLiveID[gridWidth * 17 + 13] = true;
			gridLiveID[gridWidth * 18 + 13] = true;
			gridLiveID[gridWidth * 19 + 13] = true;
			gridLiveID[gridWidth * 23 + 13] = true;
			gridLiveID[gridWidth * 24 + 13] = true;
			gridLiveID[gridWidth * 25 + 13] = true;
			gridLiveID[gridWidth * 15 + 14] = true;
			gridLiveID[gridWidth * 20 + 14] = true;
			gridLiveID[gridWidth * 22 + 14] = true;
			gridLiveID[gridWidth * 27 + 14] = true;
			gridLiveID[gridWidth * 15 + 15] = true;
			gridLiveID[gridWidth * 20 + 15] = true;
			gridLiveID[gridWidth * 22 + 15] = true;
			gridLiveID[gridWidth * 27 + 15] = true;
			gridLiveID[gridWidth * 15 + 16] = true;
			gridLiveID[gridWidth * 20 + 16] = true;
			gridLiveID[gridWidth * 22 + 16] = true;
			gridLiveID[gridWidth * 27 + 16] = true;
			gridLiveID[gridWidth * 17 + 18] = true;
			gridLiveID[gridWidth * 18 + 18] = true;
			gridLiveID[gridWidth * 19 + 18] = true;
			gridLiveID[gridWidth * 23 + 18] = true;
			gridLiveID[gridWidth * 24 + 18] = true;
			gridLiveID[gridWidth * 25 + 18] = true;
			gridLiveID[gridWidth * 20 + 23] = true;
			gridLiveID[gridWidth * 21 + 23] = true;
			gridLiveID[gridWidth * 20 + 24] = true;
			gridLiveID[gridWidth * 21 + 24] = true;
			gridLiveID[gridWidth * 22 + 25] = true;
			gridLiveID[gridWidth * 23 + 25] = true;
			gridLiveID[gridWidth * 22 + 26] = true;
			gridLiveID[gridWidth * 23 + 26] = true;
			gridLiveID[gridWidth * 8 + 42] = true;
			gridLiveID[gridWidth * 9 + 42] = true;
			gridLiveID[gridWidth * 10 + 42] = true;
			gridLiveID[gridWidth * 11 + 42] = true;
			gridLiveID[gridWidth * 12 + 42] = true;
			gridLiveID[gridWidth * 13 + 42] = true;
			gridLiveID[gridWidth * 14 + 42] = true;
			gridLiveID[gridWidth * 15 + 42] = true;
			gridLiveID[gridWidth * 8 + 43] = true;
			gridLiveID[gridWidth * 10 + 43] = true;
			gridLiveID[gridWidth * 11 + 43] = true;
			gridLiveID[gridWidth * 12 + 43] = true;
			gridLiveID[gridWidth * 13 + 43] = true;
			gridLiveID[gridWidth * 15 + 43] = true;
			gridLiveID[gridWidth * 8 + 44] = true;
			gridLiveID[gridWidth * 9 + 44] = true;
			gridLiveID[gridWidth * 10 + 44] = true;
			gridLiveID[gridWidth * 11 + 44] = true;
			gridLiveID[gridWidth * 12 + 44] = true;
			gridLiveID[gridWidth * 13 + 44] = true;
			gridLiveID[gridWidth * 14 + 44] = true;
			gridLiveID[gridWidth * 15 + 44] = true;
			gridLiveID[gridWidth * 28 + 37] = true;
			gridLiveID[gridWidth * 28 + 38] = true;
			gridLiveID[gridWidth * 28 + 39] = true;
			gridLiveID[gridWidth * 25 + 45] = true;
			gridLiveID[gridWidth * 25 + 46] = true;
			gridLiveID[gridWidth * 25 + 47] = true;
		} else if(pattern === "maximum-density-still-life") {
			gridLiveID = [
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    true,
    false,
    true,
    true,
    false,
    true,
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true
]
		}
		
		for(let i = 0; i < gridLiveID.length; i++) {
			if(gridLiveID[i]) {
				cells[i].style.backgroundColor = liveCellColor;
			}
		}
	}
	
});
