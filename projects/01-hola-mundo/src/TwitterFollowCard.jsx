import { useState } from "react";

export function TwitterFollowCard({
  children,
  userName,
  name,
  initialIsFollowing,
}) {
  // const state = useState(false);
  // const [isFollowingState, setIsFollowingState] = state;

  // cuando se usa una prop para inicializar un estado, es buena practica renombrar la prop con el prefijo "initial" para evitar confusiones
  const [isFollowingState, setIsFollowingState] = useState(
    initialIsFollowing ?? false,
  );

  const textFollowing = isFollowingState ? 'Siguiendo' : 'Seguir';
  const buttonClassName = isFollowingState
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button';

  const handleClick = () => {
    setIsFollowingState(!isFollowingState);
  };

  return (
    // los estilos en linea se pasan como un objeto de JavaScript
    // <article style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    // lo correcto para estilos es crear un archivo CSS e importarlo, luego usar clases, pero no se usa class porque al transpilar el codigo a JS se genera conflicto con la palabra reservada class de JS, por eso se usa className
    // idealmente para nombrar las clases se usa suit css: https://dev.to/ignacio_cuadra/css-convenciones-de-nombres-bem-suit-css-y-title-css-365o
    // react no toca los estilos, ya que es una tecnologia agnostica al estilo, por lo que puedes usar cualquier metodologia de estilos que desees, por ejemplo, se podrian usar css modules, tailwind, styled components, etc.
    // chakra ui es una libreria de componentes que ya trae estilos predefinidos y es compatible con react
    <article className="tw-followCard">
      <header>
        <img
          src={`https://unavatar.io/twitter/${userName}`}
          alt={`Avatar de @${userName}`}
        />
        <div>
          {/* <strong>{name}</strong> */}
          {children}{' '}
          {/* children es una prop especial que permite pasar contenido entre las etiquetas de apertura y cierre del componente, es como el ng-template de Angular */}
          <span>@{userName}</span>
        </div>
      </header>

      <aside>
        <button className={buttonClassName} onClick={handleClick}>
          {textFollowing}
        </button>
      </aside>
    </article>
  );
}