import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice,setDice] = React.useState(allNewDice())
    const [tenzies,setTenzies] = React.useState(false)
    
    React.useEffect(() =>{
        const allIsHeld = dice.every((die) => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every((die) => die.value === firstValue)
        
        if(allIsHeld && allSameValue){
            setTenzies(true)    
        }
        
    },[dice])

    function allNewDice(){
        const diceArray = []
        for(let i=0; i< 10; i++ ){
            diceArray.push(generateDice())
        }
        return diceArray
    }
    
    function generateDice(){
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function holdDice(id){
        setDice((oldDice) => {
            return (oldDice.map((die) => {
                return ( 
                    die.id === id?
                    {...die, isHeld: !die.isHeld} :
                    die
                )
            }))
        })
    }
    
    function rollDice(){
        if(!tenzies){
            setDice((oldDice) => {
                return(oldDice.map((die) => {
                    return (
                        die.isHeld ?
                        die:
                        generateDice()
                    )
                }))
            })
        }else{
            setTenzies(false)
            setDice(allNewDice())
        }

    }
    
    const diceElements = dice.map((die) => {
        return (
            <Die
                 key= {die.id}
                 value = {die.value}
                 isHeld = {die.isHeld}
                 holdDice = {() => holdDice(die.id)}
            />
        )
    })
            
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick = {rollDice}
            >
                {tenzies? "NEW GAME" : "ROLL"}
            </button>
        </main>
    )
}