import React from 'react';
import {useState} from 'react';
import Card from './components/Card'

let found = []
let pair = {}
let original = [
  {id: 1, stl: 't1a', altstl: 't1b',  mode: true, animating: false},
  {id: 2, stl: 't1a', altstl: 't1b',  mode: true, animating: false},
  {id: 3, stl: 't2a', altstl: 't2b',  mode: true, animating: false},
  {id: 4, stl: 't2a', altstl: 't2b',  mode: true, animating: false},

  {id: 5, stl: 't3a', altstl: 't3b',  mode: true, animating: false},
  {id: 6, stl: 't3a', altstl: 't3b',  mode: true, animating: false},
  {id: 7, stl: 't4a', altstl: 't4b',  mode: true, animating: false},
  {id: 8, stl: 't4a', altstl: 't4b',  mode: true, animating: false},


  {id: 9, stl: 't5a', altstl: 't5b',  mode: true, animating: false},
  {id: 10, stl: 't5a', altstl: 't5b',  mode: true, animating: false},
  {id: 11, stl: 't6a', altstl: 't6b',  mode: true, animating: false},
  {id: 12, stl: 't6a', altstl: 't6b',   mode: true, animating: false},

  {id: 13, stl: 't7a', altstl: 't7b',  mode: true, animating: false},
  {id: 14, stl: 't7a', altstl: 't7b',  mode: true, animating: false},
  {id: 15, stl: 't8a', altstl: 't8b',  mode: true, animating: false},
  {id: 16, stl: 't8a', altstl: 't8b',  mode: true, animating : false},
]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
 // return a
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

function App() {
  

    const [cards, setCards] = useState(shuffle(original))
    const [foundcards, setFoundCards] = useState([])




const animate=(current)=>
{
  setCards(cards.map((card) =>(card.id !== current.id ? card: {id: card.id, stl:card.stl, altstl:card.altstl, mode: card.mode, animating: true})))
} 




const animation=(current, pair, twoCards)=>
{
  animate(current)
  sleep(300).then(()=>{setCards(cards.map((card) =>(card.id !== current.id ? card: {id: card.id, stl:card.stl, altstl:card.altstl, mode: !card.mode, animating: false})))})
  .then(()=>
  {sleep(300).then(()=>{  
    if (twoCards)
    if (pair.stl === current.stl) 
    {
      setCards(cards.filter((card)=>(card.stl !== current.stl)))
      current.mode = false
      pair.mode = false
      setFoundCards([...foundcards, current, pair])
    }
    else setCards(cards.map((card) =>(card.id !== pair.id ? card: {id: card.id, stl:card.stl, altstl:card.altstl, mode: !card.mode, animating: false})))
  })
  })

}

const changeMode = (id)=>
{
  if (pair.id === id) return
  if (!found.includes(id)) setMoves(moves+1)
  let twoCards = JSON.stringify(pair) !== JSON.stringify({})
  let current = cards.filter((card)=>(card.id === id))[0]
  let animPair = pair
  if (twoCards)
  {
    if (pair.stl === current.stl)
    {
      found.push(pair.id)
      found.push(current.id)
    }
    else
    {
      
      setCards(cards.map((card) =>(card.id !== pair.id ? card: {id: card.id, stl:card.stl, altstl:card.altstl, mode: !card.mode, animating: false})))
      setCards(cards.map((card) =>(card.id !== current.id ? card: {id: card.id, stl:card.stl, altstl:card.altstl, mode: !card.mode, animating: false})))
    }
    pair = {}
  }
  else
  {
    pair = current
  }
  animation(current, animPair, twoCards)
}

const [moves, setMoves] = useState(0)


const reset =()=>
{
  original.forEach((card)=>(card.mode = true))
  setCards(shuffle(original))
  setFoundCards([])
  setMoves(0)
  pair = {}
}

    return (
      <>
        <div className = 'cont'>
          <h1>Moves {moves}</h1>
          {cards.length === 0 && <><h1>Great job!</h1><button className = 'retry' onClick = {reset}></button></>}
          {cards.map(card=>(<Card key = {card.id} stl = {card.mode ? card.stl : card.altstl} action = {changeMode} id = {card.id} animating = {card.animating}/>))}
          </div>
          <div className = 'found'>
          <h1>Found {foundcards.length}</h1>
              {foundcards.map(card=>(<Card key = {card.id} stl = {card.mode ? card.stl : card.altstl} action = {changeMode} id = {card.id} animating = {card.animating}/>))}
              </div>
          </>
    );
}
export default App;