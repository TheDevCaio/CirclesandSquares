import { useState, useEffect, useRef } from "react";
import { StartButton, GameContainer, Location, Player } from "./style";
import React from "react";
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!start || gameOver) return;

      let newX = playerPos.x;
      let newY = playerPos.y;

      if (e.key === "ArrowUp" && isValidMove(newX, newY - 1)) newY -= 1;
      else if (e.key === "ArrowDown" && isValidMove(newX, newY + 1)) newY += 1;
      else if (e.key === "ArrowLeft" && isValidMove(newX - 1, newY)) newX -= 1;
      else if (e.key === "ArrowRight" && isValidMove(newX + 1, newY)) newX += 1;

      setPlayerPos({ x: newX, y: newY });

      if (checkIfSurrounded(newX, newY)) {
        window.location.reload(); 
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [start, maze, playerPos, gameOver]);

  const startGame = () => {
    setStart(true);
    setGameOver(false);
    if (containerRef.current) {
      containerRef.current.requestPointerLock();
    }
  };

  useEffect(() => {
    if (start && playerPos.x === victory.x && playerPos.y === victory.y) {
      setGameOver(true);
      setStart(false);
      document.exitPointerLock();
      window.location.reload(); 
    }
  }, [playerPos, start, gameOver]);

  return (
    <Container>
      <StartButton onClick={startGame}>Start Game</StartButton>
      <GameContainer ref={containerRef} cols={cols} start={start}>
        {maze.flat().map((cell, index) => {
          const x = index % cols;
          const y = Math.floor(index / cols);
          return (
            <Location
              key={index}
              isWall={cell === 1}
              isVictory={x === victory.x && y === victory.y}
            />
          );
        })}
        {start && <Player x={playerPos.x} y={playerPos.y} />}
      </GameContainer>
    </Container>
  );
};

export default Game;