// import { useEffect, useState } from "react"
// import { getRandomFact } from "./services/facts"
import { useCatFact } from "./hooks/useCatFact"
import { useCatImage } from "./hooks/useCatImage"

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_ENDPOINT_IMAGE_URL = (firstWord) => `https://cataas.com/cat/says/${firstWord}?size=50&json=true`


export function App() {
  // const [fact, setFact] = useState(null)
  const { fact, refreshRandomFact } = useCatFact()
  // const [imageUrl, setImageUrl] = useState(null)
  // hay que evitar los nombres que aten el hook a la implementacion, por ejemplo, useFetchCatImage, porque si en un futuro queremos usar otra logica para obtener la imagen, el nombre del hook ya no tendría sentido
  const { imageUrl } = useCatImage({ fact })

  // un solo effect con mucha logica dentro no es recomendable, es mejor dividirlo en varios effects
  // useEffect(() => { 
  //   fetch(CAT_ENDPOINT_RANDOM_FACT)
  //     .then(response => response.json())
  //     .then(data => {
  //       const { fact } = data
  //       setFact(fact)

  //       // const firstWord = fact.split(' ').slice(0, 3).join(' ')
  //       const firstWord = fact.split(' ', 3).join(' ')

  //       fetch(CAT_ENDPOINT_IMAGE_URL(firstWord))
  //         .then(res => res.json())
  //         .then(response => {
  //           setImageUrl(response.url)
  //         })
  //     })
  // }, [])

  // useEffect(() => { 
  //   getRandomFact().then(newFact => setFact(newFact))
  //   fetch(CAT_ENDPOINT_RANDOM_FACT)
  //     .then(response => {
  //       if (!response.ok) throw new Error('Network response was not ok')

  //       return response.json()
  //     })
  //     .then(data => {
  //       const { fact } = data
  //       setFact(fact)
  //     })
  //     .catch(error => {
  //       // al mandar un thow entra el error en el catch
  //       // error con la respuesta
  //       // error con la peticion
  //       console.error('There has been a problem with your fetch operation:', error)
  //     })
  // }, [])

  // se reemplaza por el custom hook useCatImage
  // useEffect(() => {
  //   if (!fact) return

  //   const firstWord = fact.split(' ', 3).join(' ')

  //   fetch(CAT_ENDPOINT_IMAGE_URL(firstWord))
  //     .then(res => res.json())
  //     .then(response => {
  //       setImageUrl(response.url)
  //     })
  // }, [fact])

  const handleClick = async () => {
    // const newFact = await getRandomFact()
    // nunca debe salir del componente el setStatement
    // setFact(newFact)
    refreshRandomFact()
  }

  // con todos los custum hooks, el componente queda muy limpio, y se puede reutilizar la logica de cada hook en otros componentes sin preocuparse por la implementacion interna de cada uno
  
  return (
    <main>
      <h1>Cat facts</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img style={{maxWidth: '200px'}} src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
    </main>
  )
}
