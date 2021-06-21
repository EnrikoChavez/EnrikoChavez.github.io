import React, { useState } from 'react'
import './Sorting.css'

function Sorting() {

    //constructor----
    let array = []
    let animations = [] //visualizing events that happen during sorts
    const ARRAY_LENGTH = 30
    const MILLISEC = 10
    for (let i = 0; i < ARRAY_LENGTH; i++){
        array.push(randomInt(5, 100))
    }
    const [bars, setBars] = useState(array)
    //--------

    function resetArray(){
        array = []
    for (let i = 0; i < ARRAY_LENGTH; i++){
            array.push(randomInt(5, 100))
        }
        setBars(array)
        animations = []
    }


    function selectionSort(){
        animations = []
        for(let i = 0; i < ARRAY_LENGTH - 1; i++){
            let min_j_ind = i
            let min_j = bars[i]
            for(let j = i + 1; j < ARRAY_LENGTH; j++){
                animations.push([true,i,j])
                if (min_j > bars[j]){
                    min_j = bars[j]
                    min_j_ind = j
                }
            }
            if (min_j_ind !== i){
                animations.push([false,i,bars[min_j_ind],min_j_ind,bars[i]])
                let temp = bars[min_j_ind]
                bars[min_j_ind] = bars[i]
                bars[i] = temp
                console.log(i)
            }
        }
        animateSort()
    }

    function animateSort(){
        const barsScraped = document.getElementsByClassName('single-bar')
        let c = 0
        for(let i = 0; i < animations.length; i++){
            let animation = animations[i]
            let comparison = animation[0]
            if (comparison === true){
                setTimeout(() => {

                    let i_ind = animation[1]
                    let j_ind = animation[2]
                    barsScraped[i_ind].style.backgroundColor = 'turquoise'
                    barsScraped[j_ind].style.backgroundColor = 'turquoise'
                }, c * MILLISEC)
                c++
                setTimeout(() => {
                    let i_ind = animation[1]
                    let j_ind = animation[2]
                    barsScraped[i_ind].style.backgroundColor = 'red'
                    barsScraped[j_ind].style.backgroundColor = 'red'
                }, c * MILLISEC)
                c++
            }
            else{ //swap
                setTimeout(() => {
                    let i_ind = animation[1]
                    let j_ind = animation[3]
                    barsScraped[i_ind].style.backgroundColor = 'blue'
                    barsScraped[i_ind].style.height = `${animation[2]}%`
                    barsScraped[j_ind].style.backgroundColor = 'blue'
                    barsScraped[j_ind].style.height = `${animation[4]}%`
                }, c * MILLISEC)
                c++
                setTimeout(() => {
                    let i_ind = animation[1]
                    let j_ind = animation[3]
                    barsScraped[i_ind].style.backgroundColor = 'red'
                    barsScraped[i_ind].style.height = `${animation[2]}%`
                    barsScraped[j_ind].style.backgroundColor = 'red'
                    barsScraped[j_ind].style.height = `${animation[4]}%`
                }, c * MILLISEC)
                c++
            }
        }
    }

    return (
        <div className="sorting-page">
            <div className="all-bars">
                {bars.map((value, idx) => (
                    <div className="single-bar" key={idx} style={{height: `${value}%`}}></div>
                ))}
            </div>
            <div className="button-list">
                <button className="button" onClick={resetArray}>reset array</button>
                <button className="button" onClick={selectionSort}>selection sort</button>
            </div>
        </div>
    )
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Sorting