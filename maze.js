function generateMaze(rows, cols) {
  const maze = {
    start: { row: 0, col: 0 },
    goal: {},
    rows: rows,
    cols: cols,
    maze: []
  };

  for (let row = 0; row < rows; row++) {
    const rowArray = [];
    for (let col = 0; col < cols; col++) {
      const cell = {
        row: row,
        col: col,
        north: true,
        east: true,
        west: true,
        south: true,
        visited: false
      };
      rowArray.push(cell);
    }
    maze.maze.push(rowArray);
  }

  const directions = [
    { row: -1, col: 0, wall: "north", opposite: "south" },
    { row: 1, col: 0, wall: "south", opposite: "north" },
    { row: 0, col: -1, wall: "west", opposite: "east" },
    { row: 0, col: 1, wall: "east", opposite: "west" }
  ];

  const startRow = Math.floor(Math.random() * rows);
  const startCol = Math.floor(Math.random() * cols);

  function outOfBounds(row, col) {
    return row < 0 || row >= rows || col < 0 || col >= cols;
  }

  function step(row, col) {

    maze.maze[row][col].visited = true;
    const shuffledDirections = directions.sort(() => Math.random() - 0.5);
    for (const dir of shuffledDirections) {
      const nextRow = row + dir.row;
      const nextCol = col + dir.col;
      if (!outOfBounds(nextRow, nextCol) && !maze.maze[nextRow][nextCol].visited) {
        maze.maze[row][col][dir.wall] = false;
        maze.maze[row + dir.row][col + dir.col][dir.opposite] = false;
        step(nextRow, nextCol);
      } 
    }
  }

  step(startRow, startCol);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      maze.maze[row][col].visited = false;
    }
  }

  //pick goal cell on edge of east or south
  const goalRow = Math.floor(Math.random() * rows);
  const goalCol = Math.floor(Math.random() * cols);
  maze.goal = { row: goalRow, col: goalCol };

  if (Math.random() < 0.5) {
    maze.goal = { row: Math.floor(Math.random() * rows), col: cols - 1 }; // Last col (east edge)
  } else {
    maze.goal = { row: rows - 1, col: Math.floor(Math.random() * cols) }; // Last row (south edge)
  }


  return maze;  
}


function getNeighbors(cell, maze) {
  const neighbors = [];
  if (!cell.north && cell.row > 0) {
    neighbors.push(maze.maze[cell.row - 1][cell.col]);
  }
  if (!cell.east && cell.col < maze.cols - 1) {
    neighbors.push(maze.maze[cell.row][cell.col + 1]);
  }
  if (!cell.south && cell.row < maze.rows - 1) {
    neighbors.push(maze.maze[cell.row + 1][cell.col]);
  }
  if (!cell.west && cell.col > 0) {
    neighbors.push(maze.maze[cell.row][cell.col - 1]);
  }
  return neighbors;
}


export {generateMaze, getNeighbors};