import { useEffect, useState } from 'react';
import './App.css';

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // se pueden poner multiples useEffect en un mismo componente
  useEffect(() => {
    // este console.log se ejecuta dos veces al recargar la pagina, se ejecuta el effect, cleanup y luego el effect de nuevo
    // esto es normal en modo estricto de React (Strict Mode) para ayudar a detectar efectos secundarios no deseados y solo pasa en desarrollo
    // <React.StrictMode> -> ayuda a detectar problemas potenciales en la aplicacion, features antiguas de react y otros problemas
    console.log('El estado "enabled" ha cambiado:', enabled);

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
      // console.log(`Mouse moved to: (${clientX}, ${clientY})`);
    };

    if (enabled) {
      window.addEventListener('pointermove', handleMove);
    }

    // Cleanup function to remove the event listener
    // con el return se eliminan los efectos del useEffect, por ejemplo, el event listener
    // esta funcion se ejecuta cuando el componente se desmonta (deja de estar en pantalla) o antes de ejecutar el efecto de nuevo
    // si no se limpian los efectos, se pueden acumular multiples event listeners y causar problemas de rendimiento o comportamientos inesperados
    // en la consola del navegador se puede ejecutar getEventListeners(window) para ver los event listeners activos
    // Esto es util para trazabilidad, por ejemplo, cuando un usuario cierra un modal o navega a otra pagina
    return () => { // cleanup function
      window.removeEventListener('pointermove', handleMove);
      console.log('Limpieza: se ha eliminado el event listener de pointermove');
    };
  }, [enabled]);

  // hide cursor when enabled follow mouse
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled);

    return () => {
      document.body.classList.remove('no-cursor');
    };
  }, [enabled]);

  return (
    <main>
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#09f',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      ></div>
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'}
      </button>
    </main>
  );
}

function App() {
  const [mounted, setMounted] = useState(true);

  return (
    <>
      {mounted && <FollowMouse />}

      <button onClick={() => setMounted(!mounted)}>
        {mounted ? 'Desmontar' : 'Montar'} Componente
      </button>
    </>
  );
}

export default App;
