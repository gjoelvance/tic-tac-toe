"use client";

import { useState } from "react";

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);

  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getWinner = (currentBoard) => {
    for (const [a, b, c] of winningLines) {
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }

    return null;
  };

  const winner = getWinner(board);

  const isDraw =
    board.every((cell) => cell !== null) &&
    winner === null;

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xTurn ? "X" : "O";

    setBoard(newBoard);
    setXTurn(!xTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  };

  let status = "";

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw";
  } else {
    status = `Turn: ${xTurn ? "X" : "O"}`;
  }

  const titleColor =
    winner === "X"
      ? "#ef4444"
      : winner === "O"
      ? "#3b82f6"
      : "#111827";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        background: "#f8fafc",
      }}
    >
      <h1
        style={{
          color: titleColor,
          fontSize: "3rem",
          marginBottom: "20px",
          transition: "0.3s",
        }}
      >
        Tic-Tac-Toe
      </h1>

      <p
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          color: titleColor,
          marginBottom: "20px",
        }}
      >
        {status}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "8px",
        }}
      >
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              fontSize: "2rem",
              fontWeight: "bold",
              cursor: "pointer",
              backgroundColor: "#fff",
              border: "2px solid #d1d5db",
              borderRadius: "8px",
            }}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        style={{
          marginTop: "25px",
          padding: "12px 24px",
          backgroundColor: "#111827",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Reset Game
      </button>
    </main>
  );
}
