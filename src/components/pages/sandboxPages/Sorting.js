import React, { useState, useEffect } from 'react'
import './Sorting.css'
import {RangeStepInput} from 'react-range-step-input';

function Sorting() {

    //constructor
    let array = []
    let animations = [] //visualizing events that happen during sorts
    const sortedLevels = [1,2,5,10] //0, 50, 80, 90%
    const sortedLevelsDisplay = [0, 50, ]
    const [sortedLevelIndex, setSortedLevelIndex] = useState(0)
    const [arrayLength, setArrayLength] = useState(40)
    const [ms, setMs] = useState(599) //sudo ms
    const [bars, setBars] = useState(array)

    const BAR_MAX = 100
    const BAR_MIN = 5
    const ARRAY_MAX_SIZE = 400
    const ARRAY_MIN_SIZE = 3
    const MAX_SPEED = 600
    const MIN_SPEED = 0

    //creates a new random array
    function resetArray(){
        array = []
        let index_array = []
        for (let i = 0; i < arrayLength; i++){
            array.push(95/arrayLength * i + 5 + Math.random()*0.2)
            index_array.push(i)
        }
        index_array = shuffle(index_array)
        for (let i = 0; i < arrayLength/sortedLevels[sortedLevelIndex]; i++){
            array[index_array[i]] = randomInt(BAR_MIN, BAR_MAX)
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

    function insertionSort(){
        animations = []
        for(let i = 1; i < arrayLength; i++){
            let right_ind = i
            let left_ind = right_ind - 1
            for (; left_ind >= 0;){
                animations.push([true,left_ind,right_ind])
                if (bars[right_ind] < bars[left_ind]){
                    //swap bars heights
                    animations.push([false,left_ind,right_ind,bars[right_ind],bars[left_ind]])
                    let temp = bars[right_ind]
                    bars[right_ind] = bars[left_ind]
                    bars[left_ind] = temp

                    //compare the two other ones
                    right_ind = left_ind
                    left_ind = left_ind - 1   
                }
                else{
                    break
                }
            }
        }
        animateSort()
    }

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
                        barsScraped[i_ind].style.backgroundColor = 'lightgreen'
                        barsScraped[j_ind].style.backgroundColor = 'lightgreen'
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

    function lowerLevel(){
        if (sortedLevelIndex !== 0){
            setSortedLevelIndex(sortedLevelIndex - 1)
        }
    }

    function higherLevel(){
        if (sortedLevelIndex !== (sortedLevels.length - 1)){
            setSortedLevelIndex(sortedLevelIndex + 1)
        }
    }

    useEffect(resetArray, [arrayLength])

    return (
        <div className="sorting-page">
            <div className="all-bars">
                {bars.map((value, idx) => (
                    <div className="single-bar" key={idx} style={{height: `${value}%`}}></div>
                ))}
            </div>
            <div className="button-list">
                <div className="reset-area">
                    <button className="button" onClick={resetArray}>reset array</button>
                    <div className="sorted-text">sorted {100 - 100/sortedLevels[sortedLevelIndex]}%</div>
                    <div className="sorted-levels">
                        <button className="reset-level-button" onClick={lowerLevel}>
                        -
                        </button>
                        <div className="reset-level"></div>
                        <button className="reset-level-button" onClick={higherLevel}>
                        +
                        </button>
                    </div>
                </div>
                <button className="button" onClick={selectionSort}>selection sort</button>
                <button className="button" onClick={insertionSort}>insertion sort</button>
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

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export default Sorting