import { Square } from "./Square";

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  const winnerText = winner === false ? 'Empate' : 'Ha ganado:';
  
  return (
    // es posible hacer:
    // winner && (<section>...</section>)
    <section className="winner">
      <div className="text">
        {/* la idea es dejar la parte del renderizado limpia y la logica separada */}
        {/* <h2>{winner === false ? 'Empate' : 'Ha ganado:'}</h2> */}
        <h2>{winnerText}</h2>

        <header className="win">{winner && <Square>{winner}</Square>}</header>

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}