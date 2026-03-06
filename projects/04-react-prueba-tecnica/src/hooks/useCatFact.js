import { useEffect, useState } from "react";
import { getRandomFact } from "../services/facts"

export function useCatFact() { 
  const [fact, setFact] = useState(null);

  const refreshRandomFact = () => {
    getRandomFact().then((newFact) => setFact(newFact));
  }

  useEffect(refreshRandomFact, [])

  return { fact, refreshRandomFact } // hay que evitar retornar el setFact, porque es una función que permite modificar el estado interno del hook, y eso puede llevar a errores si se usa de forma incorrecta. En su lugar, se puede retornar una función que encapsule la lógica de actualización del estado, como refreshRandomFact en este caso y se puede reutilizar en cualquier componente sin preocuparse por la implementación interna del hook
}