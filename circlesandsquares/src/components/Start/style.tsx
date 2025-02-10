import styled from "styled-components";

export const GameContainer = styled.div<{ cols: number; start: boolean }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, 20px);
  gap: 2px;
  margin: 20px auto;
  padding: 10px;
  width: 460px;
  background-color: grey;
  border: 2px solid white;
  position: relative;
`;

export const Location = styled.div<{ isWall: boolean; isVictory?: boolean }>`
  width: 20px;
  height: 20px;
  background-color: ${(props) => (props.isWall ? "#444" : props.isVictory ? "victory" : "white")};
  border-radius: ${(props) => (props.isVictory ? "50%" : "0")};
`;

export const Player = styled.div<{ x: number; y: number }>`
  width: 20px;
  height: 20px;
  background-color: blue;
  position: absolute;
  top: ${(props) => props.y * 22 + 10}px; 
  left: ${(props) => props.x * 22 + 10}px;
  transition: top 0.1s, left 0.1s;
  border-radius: 50%;
`;

export const StartButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
  margin-top: 5%;
  &:hover {
    background-color: #218838;
  }
`;