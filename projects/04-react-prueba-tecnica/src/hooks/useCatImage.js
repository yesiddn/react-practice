// custom hook

import { useEffect, useState } from "react";

const CAT_ENDPOINT_IMAGE_URL = (firstWord) => `https://cataas.com/cat/says/${firstWord}?size=50&json=true`;

// es una funcion que inicia con use
export function useCatImage({ fact }) {
  // el customHook tiene un estado interno
  const [imageUrl, setImageUrl] = useState(null)

  // en un custom hook se pueden tener otros hooks, cosa que en una funcion normal no se puede
  useEffect(() => {
    if (!fact) return;

    const firstWord = fact.split(' ', 3).join(' ');

    fetch(CAT_ENDPOINT_IMAGE_URL(firstWord))
      .then((res) => res.json())
      .then((response) => {
        setImageUrl(response.url);
      });
  }, [fact]);

  return { imageUrl }
}
