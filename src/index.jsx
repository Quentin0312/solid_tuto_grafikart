// https://youtu.be/gEQLvRb8RA8
// Code à commenter completemement quand tuto fini

/* @refresh reload */
import { createEffect, createSignal } from 'solid-js';
import { render } from 'solid-js/web';

//----------- Simple JS

document.body.appendChild(<h3>Debut de page</h3>)

//----------- Composant JSX (return DOM)

function faireApparaitre() {
  return <h4>Suite page</h4>
}

render(faireApparaitre, document.body) // Fonction render nécessaire pour "appliquer" le composant à la page HTML

//----------- Composant JSX réactif

function App(){
  const [count, setCount] = createSignal(0) // count=> getter, elt dynamique ; setCount => setter, permet de modifier le getter ; içi 0 est la valeur initiale
  
  const doubleCount = () => count() * 2 // Comme count() est un getter, chaque fois qu'il est modifié doubleCount l'est aussi

  console.log("Ne s'affiche qu'une seule fois !") 
  /* S'affiche une seule fois (lors du render ci-dessous) car la fonction s'execute une seule fois,
  seulement certains éléments (setter & elts liés, effect,...) sont dynamiques */

  return <>
    <div>Compteur : { count() }</div>

    <Show when={ count() % 2 == 0 } fallback={<div>Nombre impair</div>}>
      <div>Nombre pair</div>
    </Show>

    <button onClick={ () => setCount(count()+1) }>Ajouter 1</button>
    
    <div>Compteur double: { doubleCount() }</div>
  </>
  /* Ci-dessus

  touts les élements liées au setter sont dynamiques ;
  <Show> est utilisé pour afficher conditionellement une partie de la vue
  */
}

render(App, document.body)

//----------- Element réactif hors composant

const [temps, setTemps] = createSignal(0)

setInterval(()=> setTemps(n => n + 10),10000) // syntaxe étrange => (n => n + 10)
//mise en commentaire stoped here
createEffect(() => {
  console.log(temps() + " secondes")
})

//-----------

function to_do(){
  const [todos, setTodos] = createSignal([
    {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": true
    },
    {
      "userId": 1,
      "id": 2,
      "title": "aut autem delectus",
      "completed": false
    },
    {
      "userId": 1,
      "id": 3,
      "title": "aut autem",
      "completed": false
    }
  ])

  return <>
    <ul>
      <For each={todos()}>
        {(todo) => <li>
          <input type='checkbox' checked={todo.completed}/>
          {todo.title}
          </li>}
      </For>
    </ul>
  
  </>
}

render(to_do, document.body)