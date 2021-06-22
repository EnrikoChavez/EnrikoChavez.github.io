import React, { useState, useEffect } from 'react'
import './Sorting.css'
import {RangeStepInput} from 'react-range-step-input';

function Sorting() {

    //constructor
    let array = []
    let animations = [] //visualizing events that happen during sorts
    const [arrayLength, setArrayLength] = useState(30)
    const [ms, setMs] = useState(15)

    const BAR_MAX = 100
    const BAR_MIN = 5
    const ARRAY_MAX_SIZE = 100
    const ARRAY_MIN_SIZE = 3
    const MAX_SPEED = 30
    const MIN_SPEED = 0
    for (let i = 0; i < arrayLength; i++){
        array.push(randomInt(BAR_MIN, BAR_MAX))
    }
    const [bars, setBars] = useState(array)

    //creates a new random array
    function resetArray(){
        array = []
        for (let i = 0; i < arrayLength; i++){
            array.push(randomInt(BAR_MIN, BAR_MAX))
        }
        setBars(array)
        animations = []
    }
    //sets up sorting animation in a selection sort manner
    function selectionSort(){
        animations = []
        for(let i = 0; i < arrayLength - 1; i++){
            let min_j_ind = i
            let min_j = bars[i]
            for(let j = i + 1; j < arrayLength; j++){
                animations.push([true,i,j])
                if (min_j > bars[j]){
                    min_j = bars[j]
                    min_j_ind = j
                }
            }
            if (min_j_ind !== i){
                animations.push([false,i,min_j_ind,bars[min_j_ind],bars[i]])
                let temp = bars[min_j_ind]
                bars[min_j_ind] = bars[i]
                bars[i] = temp
            }
        }
        animateSort()
    }

    // function insertionSort(){
    //     animations = []
    //     for(let i = 1; i < arrayLength; i++){
    //         for(let j = i - 1; j >= 0; j--){
    //             animations.push([true,i,j])
    //             if (bars[i] < bars[j]){
    //                 animations.push
    //             }
    //         }
    //     }
    // }

    //animates the sorting that happenned 
    function animateSort(){

        const sliders = document.getElementsByClassName("slider")
        sliders[0].disabled = true
        sliders[1].disabled = true
        setTimeout(() => {
        sliders[0].disabled = false
        sliders[1].disabled = false
        }, (animations.length) * (MAX_SPEED-ms) + 10)

        const barsScraped = document.getElementsByClassName("single-bar")
        for(let i = 0; i < animations.length; i++){  
            let animation = animations[i]
            let comparison = animation[0]
            let i_ind = animation[1]
            let j_ind = animation[2]
            if (comparison === true){
                setTimeout(() => {
                    //if someone clicks out of sorting page while sorting
                    if(!barsScraped[i_ind] || !barsScraped[j_ind]){
                        resetArray();
                    }
                    else{
                        barsScraped[i_ind].style.backgroundColor = 'turquoise'
                        barsScraped[j_ind].style.backgroundColor = 'turquoise'
                    }
                }, i * (MAX_SPEED-ms))
                setTimeout(() => {
                    if(!barsScraped[i_ind] || !barsScraped[j_ind]){
                        resetArray();
                    }
                    else{
                        barsScraped[i_ind].style.backgroundColor = 'red'
                        barsScraped[j_ind].style.backgroundColor = 'red'
                    }
                }, (i + 1) * (MAX_SPEED-ms))
            }
            else{ //swap
                setTimeout(() => {
                    if(!barsScraped[i_ind] || !barsScraped[j_ind]){
                        resetArray();
                    }
                    else{
                        barsScraped[i_ind].style.backgroundColor = 'blue'
                        barsScraped[j_ind].style.backgroundColor = 'blue'
                        barsScraped[i_ind].style.height = `${animation[3]}%`
                        barsScraped[j_ind].style.height = `${animation[4]}%`
                    }
                }, i * (MAX_SPEED-ms))
                setTimeout(() => {
                    if(!barsScraped[i_ind] || !barsScraped[j_ind]){
                        resetArray();
                    }
                    else{
                        barsScraped[i_ind].style.backgroundColor = 'red'
                        barsScraped[j_ind].style.backgroundColor = 'red'
                    }
                }, (i+1) * (MAX_SPEED-ms))
            }
        }
    }

    function onLengthChange(length){
        setArrayLength(length)
    }

    function onMsChange(milli){
        setMs(milli)
    }

    function reloadPage(){
        window.location.reload(false);
    }

    useEffect(() => {
        resetArray()
    }, [arrayLength])

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
                <div className="slider-box">
                    <div className="slider-text">array size: {arrayLength}</div>
                    <RangeStepInput className="slider" min={ARRAY_MIN_SIZE} max={ARRAY_MAX_SIZE} 
                        value={arrayLength} step={1} onChange={e => onLengthChange(e.target.value)}/>
                </div>
                <div className="slider-box">
                    <div className="slider-text">speed: {Math.floor(ms/MAX_SPEED * 100)}</div>
                    <RangeStepInput className="slider" min={MIN_SPEED} max={MAX_SPEED} 
                        value={ms} step={1} onChange={e => onMsChange(e.target.value)}/>
                </div>
                <button className="button" onClick={reloadPage}>cancel long sort<br/>(refresh page)</button>
            </div>
        </div>
    )
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Sorting