// https://youtu.be/gEQLvRb8RA8
// Code à commenter quand tuto fini

/* @refresh reload */
import { createEffect, createSignal } from 'solid-js';
import { render } from 'solid-js/web';

//-----------

document.body.appendChild(<h3>Debut de page</h3>)

//-----------

function faireApparaitre() {
  return <h4>Suite page</h4>
}

render(faireApparaitre, document.body)

//-----------

function App(){
  const [count, setCount] = createSignal(0)
  
  const doubleCount = () => count() * 2
  console.log("Ne s'affiche qu'une seule fois !")

  return <>
    <div>Compteur : { count() }</div>
    <button onClick={ () => setCount(count()+1) }>Ajouter 1</button>
    
    <div>Compteur double: { doubleCount() }</div>
  </>
}

render(App, document.body)

//-----------

const [temps, setTemps] = createSignal(0)

setInterval(()=> setTemps(n => n + 10),10000) // syntaxe différente...?

createEffect(() => {
  console.log(temps() + " secondes")
})

//-----------