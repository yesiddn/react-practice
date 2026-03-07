import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// esto es una funcion normal, pero que crear una funcion que retorna un elemento hay algo llamado componente y en lugar de llamarlo "createButton" se llamaria "Button"
const createButton = ({text}) => {
  return (
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M14.54 10.105h5.533c2.546 0-.764 10.895-2.588 10.895H4.964A.956.956 0 0 1 4 20.053v-9.385c0-.347.193-.666.502-.832C6.564 8.73 8.983 7.824 10.18 5.707l1.28-2.266A.87.87 0 0 1 12.222 3c3.18 0 2.237 4.63 1.805 6.47a.52.52 0 0 0 .513.635"
        />
      </svg>
      {text}
    </button>
  );
}

// componente Button => todos los componentes deben ser PascalCase porque las etiquetas en HTML son minusculas, so React usa esa convención para diferenciar entre componentes y etiquetas HTML nativas
const Button = ({text}) => {
  return (
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M14.54 10.105h5.533c2.546 0-.764 10.895-2.588 10.895H4.964A.956.956 0 0 1 4 20.053v-9.385c0-.347.193-.666.502-.832C6.564 8.73 8.983 7.824 10.18 5.707l1.28-2.266A.87.87 0 0 1 12.222 3c3.18 0 2.237 4.63 1.805 6.47a.52.52 0 0 0 .513.635"
        />
      </svg>
      {text}
    </button>
  );
}

createRoot(document.getElementById('root')).render(
  <>
    {/* aunque esto funciona, no es del todo correcto en react y decir "createButton" es imperativo */}
    {createButton({text: "Me gusta"})}
    {createButton({text: "Me gusta 2"})}
    {createButton({ text: "Me gusta 3" })}
    
    {/* forma correcta */}
    {/* los parametros se pasarian como un atributo en html */}
    <Button text="Me gusta componente" /> 

    {/* Ejemplo practico */}
    <App />
  </>
)
