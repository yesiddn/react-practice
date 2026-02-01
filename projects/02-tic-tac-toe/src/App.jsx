import { useState } from 'react';
import './App.css'
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS, WINNER_COMBOS } from './constants';
import { checkWinnerFrom } from './logic/board';
import { WinnerModal } from './components/WinnerModal';

function App() {
  // los hooks NUNCA deben ir dentro de condicionales porque react guarda el estado de los hooks en un orden especifico y si se colocan dentro de condicionales, este orden puede cambiar y react no sabra que hook corresponde a que estado
  // const [board, setBoard] = useState(Array(9).fill(null));

  // si se lee del localstorage fuera del useState, cada vez que el componente se renderice, se hara la lectura del localstorage, lo cual es LENTO e INNECESARIO
  const [board, setBoard] = useState(() => { 
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });
  // null es que no hay ganador yet, false es que hay empate
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }

  const updateBoard = (index) => {
    if (board[index] || false || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    localStorage.setItem('board', JSON.stringify(newBoard));
    localStorage.setItem('turn', newTurn);

    const newWinner = checkWinnerFrom(newBoard); // se usa el nuevoBoard en lugar de board porque el estado board no se actualiza inmediatamente ⬇️
    if (newWinner) {
      confetti();
      setWinner(newWinner); // esta actualizacion del estado se hace de forma asincrona y no se vera reflejada inmediatamente, es decir, que si seguimos poniendo codigo despues de esta linea, no veremos el valor actualizado de winner
      // al setNewState se le puede pasar un callback que recibe el estado anterior como parametro
      // setWinner((prevWinner) => {
      //   console.log(`El ganador es ${newWinner} y el ganador previo era ${prevWinner}`);
      //   return newWinner;
      // });
    } else if (newBoard.every(square => square !== null)) {
      setWinner(false); // Empate
    }
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>

      <section className="game">
        {
          board.map((_, index) => { 
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
