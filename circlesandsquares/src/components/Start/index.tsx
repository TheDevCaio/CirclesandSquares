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
    const [maze, setMaze] = useState(() => generateMaze(rows, cols));
    const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
    const [start, setStart] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const victory = { x: cols - 2, y: rows - 2 };

    const isValidMove = (x: number, y: number) => {
      return maze[y] && maze[y][x] === 0;
    };
  
    const checkIfSurrounded = (x: number, y: number): boolean => {
      const directions = [
        [0, -1],
        [0, 1],  
        [-1, 0],
        [1, 0],  
      ];
      //every retorna true se estiverem preenchidas.
      return directions.every(([dx, dy]) => maze[y + dy]?.[x + dx] === 1);
    };

    const removeRandomObstacle = () => {
        const randomX = Math.floor(Math.random() * cols);
        const randomY = Math.floor(Math.random() * rows);
    
        if (
          maze[randomY][randomX] === 0 && 
          randomX > 0 && randomX < cols - 1 && 
          randomY > 0 && randomY < rows - 1 
        ) {
          const newMaze = [...maze];
          newMaze[randomY][randomX] = 1; 
          setMaze(newMaze);
        }
      };
      
      useEffect(() => {

        let interval: NodeJS.Timeout | null = null;
    
        if (start && !gameOver) {
          interval = setInterval(() => {
            removeRandomObstacle();
          }, 10); 
        }
    
        return () => {
          if (interval) clearInterval(interval);
        };
      }, [start, maze, gameOver]);

}
