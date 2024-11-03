import * as View from "./view.js";
import * as Maze from "./maze.js";
import Stack from "./stack.js";
import Queue from "./queue.js";

window.addEventListener("load", start);
let maze = {};

function start() {
  View.attatchEventListeners();
}

async function solveBFS() {
  const queue = new Queue();
  let current = maze.maze[maze.start.row][maze.start.col];
  queue.add(current);
  maze.maze[maze.start.row][maze.start.col].visited = true;
  while(queue.size() > 0) {
    current = queue.dequeue();
    if(current.row === maze.goal.row && current.col === maze.goal.col) break;
    let neighbors = Maze.getNeighbors(current, maze);
    for (const neighbor of neighbors) {
      if (!neighbor.visited) {
        neighbor.parent = current;
        queue.add(neighbor);
        neighbor.visited = true;
      }
    }

    View.renderMaze(maze);

    
    
    await sleep(30);
  }

  const path = new Stack();
  console.log(current);
  while(current.parent) {
    path.push(current);
    maze.maze[current.row][current.col].path = true;
    current = current.parent;
    View.renderMaze(maze);
    await sleep(30);
  }
}

function generate(rows, cols) {
  maze = Maze.generateMaze(rows, cols);
  return maze;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export { generate, solveBFS };

