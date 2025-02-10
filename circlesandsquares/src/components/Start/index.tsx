const generateMaze = (rows: number, cols: number) => {
  const maze = Array.from({ length: rows }, () => Array(cols).fill(1));
  const stack: [number, number][] = [[1, 1]];
  maze[1][1] = 0;

  const directions = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ];


  return maze;
};