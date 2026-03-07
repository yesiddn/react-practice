import { useState } from 'react';
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
  {
    userName: 'crunchyroll',
    name: 'Crunchyroll',
    isFollowing: true
  },
  {
    userName: 'astrodotbuild',
    name: 'Astro',
    isFollowing: false
  },
  {
    userName: 'codigofacilito',
    name: 'Código Facilito',
    isFollowing: true
  }
];

function App() {
  const [userNameState, setUserNameState] = useState('unknown');
  
  const newUser = { userName: userNameState, name: 'Usuario Desconocido' };

  return (
    <>
      <TwitterFollowCard
        userName="yesiddn"
        name="Duvan Yesid"
        initialIsFollowing={false}
      />
      <TwitterFollowCard
        userName="midudev"
        name="Miguel Ángel"
        // Se quita el estado de aqui para que el componente sea el que maneje si el usuario es seguido o no. tambien se puede dejar, pero es segun lo que se quiera lograr
        // initialIsFollowing={true}
      />
      {/* Si no se pasa el valor de initialIsFollowing, su valor seria undefined, pero si se envia sin valor explicito, su valor es true */}
      <TwitterFollowCard
        userName="powerhdeleon"
        name="Héctor De León"
        initialIsFollowing
      >
        {/* Esto se pasaria como children al componente TwitterFollowCard */}
        Héctor De León
      </TwitterFollowCard>
      {/* Se puede enviar un objeto y aplicarle el rest operator, pero esto en la mayoria de los casos es mala practica porque puede hacer que el componente se renderice innecesariamente y muchas veces se terminan enviando props que no son necesarias */}
      <TwitterFollowCard {...newUser} />

      {/* a cambiar el estado de userNameState, se vuelve a renderizar App y además se actualizan todos los componentes hijos, a esto se le llama propagación de cambios */}
      <button onClick={() => setUserNameState('shanks')}>
        Cambiar usuario
      </button>

      {
        // hay que usar javascript para poder agregar logica, en este caso un map para renderizar varios componentes
        users.map(user => {
          const { userName, name, isFollowing } = user;

          return (
            <TwitterFollowCard
              // hay que usar una key unica para cada componente en un listado, para que react pueda identificar cada componente, es como en angular con el trackBy en un for
              key={userName}
              userName={userName}
              name={name}
              initialIsFollowing={isFollowing}
            />
          );
        })
      }
    </>
  );
}

export default App
