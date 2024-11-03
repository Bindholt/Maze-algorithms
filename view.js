
import * as controller from "./controller.js";

function renderMaze(maze) {
  const mazeDiv = document.querySelector("#maze");
  mazeDiv.innerHTML = ""; 

  for (let row = 0; row < maze.rows; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");

    for (let col = 0; col < maze.cols; col++) {
      const cell = maze.maze[row][col];
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");

      if (maze.goal.row === row && maze.goal.col === col) {
        cellDiv.classList.add("goal");
      }
      if (maze.start.row === row && maze.start.col === col) {
        cellDiv.classList.add("start");
      }

      if (cell.north) {
        cellDiv.classList.add("north");
      }
      if (cell.east) {
        cellDiv.classList.add("east");
      }
      if (cell.west) {
        cellDiv.classList.add("west");
      }
      if (cell.south) {
        cellDiv.classList.add("south");
      }
      if(cell.visited) {
        cellDiv.classList.add("visited");
      }
      if(cell.path) {
        cellDiv.classList.add("path");
      }

      rowDiv.appendChild(cellDiv);
    }
    mazeDiv.appendChild(rowDiv);
  }
}

function attatchEventListeners() {
  document.querySelector("#generate").addEventListener("click", generate);
  document.querySelector("#solve").addEventListener("click", solve);
}

function generate() {
  const rows = parseInt(document.querySelector("#rows").value);
  const cols = parseInt(document.querySelector("#cols").value);
  if(rows < 2 || cols < 2) return;

  
  document.querySelector("#solve").disabled = false;
  const maze = controller.generate(rows, cols);
  renderMaze(maze);
}

function solve() {
  controller.solveBFS();
}

export { attatchEventListeners, renderMaze };