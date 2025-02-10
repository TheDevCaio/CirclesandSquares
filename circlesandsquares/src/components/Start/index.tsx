import { useState, useEffect, useRef } from "react";
import { StartButton, GameContainer, Location, Player } from "./style";
import { Container } from "../Global";

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

  while (stack.length) {
    const [x, y] = stack.pop()!;
    const Position = directions.sort(() => Math.random() - 0.5);

    for (const [dx, dy] of Position) {
      const nx = x + dx, ny = y + dy;
      if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && maze[ny][nx] === 1) {
        maze[ny][nx] = 0;
        stack.push([nx, ny]);
      }
    }
  }

  return maze;
};


const Game = () => {
    const rows = 21, cols = 21;

}
