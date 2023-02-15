// https://youtu.be/gEQLvRb8RA8
// Code à commenter completemement quand tuto fini
// Opérateur conditionel et syntaxe de décomposition à revoir !!

/* Concernant l'opérateur conditionel et la syntaxe de decomposition présent dans ce code 
Ce code est une fonction appelée "toggleTodo" qui prend en paramètre un objet "todo".
La fonction utilise la méthode "map" pour parcourir le tableau "todos"
et retourner un nouveau tableau qui contient les mêmes éléments que "todos"
mais avec une modification : si l'élément a le même id que "todo",
alors on renvoie un nouvel objet qui copie toutes les propriétés de l'élément,
sauf "completed" qui est inversé (passé de true à false ou de false à true). Sinon, on renvoie simplement l'élément tel quel.

Tips=> "!" inverse la valeur et n'est donc pas opérateur de comparaison !!!
*/

/* @refresh reload */
import { createEffect, createSignal} from 'solid-js';
import { createStore } from 'solid-js/store'
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

createEffect(() => {
  console.log(temps() + " secondes")
})
// Un effet s'execute à chaque fois qu'il y a une modification à l'interieur ???? d'un getter ? 

//----------- Composant TO-DO v1
document.body.appendChild(<h4>TO-DO v1</h4>)

function to_do(){
  const [todos, setTodos] = createSignal([
    {
      "userId": 1,
      "id": 1,
      "title": "Pain hamburger",
      "completed": true
    },
    {
      "userId": 1,
      "id": 2,
      "title": "steack",
      "completed": true
    },
    {
      "userId": 1,
      "id": 3,
      "title": "tomate",
      "completed": false
    }
  ])

  // Essayer de réecrire en forme de fonction normale
  // Mission du composant toggleTodo => quand on intéragit avec la checkBox, ça modifie le "completed" correspondant dans todos()
  const toggleTodo = (todo) => {
    setTodos(todos().map(t => t.id == todo.id ? {...t, completed: !t.completed} : t ));
    //içi syntaxe nouvelle => Opérateur conditionnel => condition ? exprSiVrai : exprSiFaux
    // ...t correspond à un spread operator ou syntaxe de décomposition
    // À REVOIR !!
  }

  // createEffect(() => {
  //   console.log(todos())
  // })


  return <>
    <ul>
      <For each={todos()}>
        {(todo) => <li>
          <input type='checkbox' checked={todo.completed} onChange={[toggleTodo, todo]}/>
          {todo.title}
          </li>}
      </For>
    </ul>
  
  </>
  // onChange={[toggleTodo, todo]} equivalent de onChange={()=> toggleTodo(todo)}
}

render(to_do, document.body)

//----------- Composant TO-DO v2
document.body.appendChild(<h4>TO-DO v2</h4>)

function to_do2(){
  const [todos, setTodos] = createStore([
    {
      "userId": 1,
      "id": 1,
      "title": "Pain hamburger",
      "completed": true
    },
    {
      "userId": 1,
      "id": 2,
      "title": "steack",
      "completed": true
    },
    {
      "userId": 1,
      "id": 3,
      "title": "tomate",
      "completed": false
    }
  ])

  const toggleTodo = (todo) => {
    setTodos(t => t.id == todo.id, "completed", completed => !completed); // façon brute et statique d'écrire => setTodos(0, "completed", false)
  }

  // createEffect(() => {
  //   console.log(todos) // Pour vérifier si le store est bien modifié => surememnt pas adapté pour store
  //   // car JSON stringify permet de voir les modifs en temps réelles
  // })

  return <>
    <ul>
      <For each={todos}>
        {
          (todo)=> <li>
            <input type='checkbox' checked={todo.completed} onChange={[toggleTodo, todo]}/>
            {todo.title}
          </li>
        }
      </For>
    </ul>
    <pre>
      {JSON.stringify(todos)}
    </pre>
  </>
}

render(to_do2, document.body)