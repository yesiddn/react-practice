import { useEffect, useState } from "react"

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_ENDPOINT_IMAGE_URL = (firstWord) => `https://cataas.com/cat/says/${firstWord}?size=50&json=true`

export function App() {
  const [fact, setFact] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)

  // un solo effect
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

  useEffect(() => { 
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok')

        return response.json()
      })
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
      .catch(error => {
        // al mandar un thow entra el error en el catch
        // error con la respuesta
        // error con la peticion
        console.error('There has been a problem with your fetch operation:', error)
      })
  }, [])

  useEffect(() => {
    if (!fact) return

    const firstWord = fact.split(' ', 3).join(' ')

    fetch(CAT_ENDPOINT_IMAGE_URL(firstWord))
      .then(res => res.json())
      .then(response => {
        setImageUrl(response.url)
      })
  }, [fact])
  
  return (
    <main>
      <h1>Cat facts</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img style={{maxWidth: '200px'}} src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
    </main>
  )
}
