import React, { useState, useEffect, useMemo } from 'react'
import './Sorting.css'
import {RangeStepInput} from 'react-range-step-input';

function Sorting() {

    //constructor
    const BAR_MAX = 100
    const BAR_MIN = 5
    const ARRAY_MAX_SIZE = 200
    const ARRAY_MIN_SIZE = 2

    const sortedLevels = useMemo(()=>[1,2,5,10], []) //0, 50, 80, 90% sorted arrays (calculated like: 100 - 100/1, 100 - 100/2, etc..)
    const speedLevels = [0, 1, 2, 5, 10, 50, 100, 400] //0 ms between animations, 1 ms, 2 ms, etc..

    const animationType = {
        COMPARISON: "comparison",
        SWAP: "swap",
        SINGLE_CHANGE: "single_change"
    }

    const [sortedLevelIndex, setSortedLevelIndex] = useState(0)
    const [speedLevelIndex, setSpeedLevelIndex] = useState(3)
    const [arrayLength, setArrayLength] = useState(32)
    const [ms, setMs] = useState(speedLevels[speedLevelIndex])
    const [bars, setBars] = useState([])

    useEffect(resetArray, [arrayLength, sortedLevelIndex, sortedLevels])

    //creates a new random array
    function resetArray(){
        let array = []
        let indexArray = []
        for (let i = 0; i < arrayLength; i++){
            array.push((BAR_MAX - BAR_MIN)/arrayLength * i + BAR_MIN + Math.random()*0.5)
            indexArray.push(i)
        }
        indexArray = shuffle(indexArray)
        for (let i = 0; i < arrayLength/sortedLevels[sortedLevelIndex]; i++){
            array[indexArray[i]] = randomInt(BAR_MIN, BAR_MAX)
        }
        setBars(array)
    }

    function swapBarHeights(indexOne, indexTwo, array){ //use it on any swaps, TODO
        const indexOneHeight = array[indexOne]
        array[indexOne] = array[indexTwo]
        array[indexTwo] = indexOneHeight
    }

    function selectionSort(){
        let animations = []
        for (let i = 0; i < arrayLength - 1; i++){
            let min_j_ind = i
            let min_j = bars[i]
            for (let j = i + 1; j < arrayLength; j++){
                animations.push([animationType.COMPARISON, min_j_ind, j])
                if (min_j > bars[j]){ //found smaller bar
                    min_j = bars[j]
                    min_j_ind = j
                }
            }
            if (min_j_ind !== i){ //smaller bar than ith bar found to the right of ith bar
                swapBarHeights(min_j_ind, i, bars)
                animations.push([animationType.SWAP, i, min_j_ind, bars[i], bars[min_j_ind]])
            }
        }
        animateSort(animations)
    }

    function insertionSort(){
        let animations = []
        for (let i = 1; i < arrayLength; i++){
            let rightIndex = i
            let leftIndex = rightIndex - 1
            while (leftIndex >= 0){
                animations.push([animationType.COMPARISON, leftIndex, rightIndex])
                if (bars[rightIndex] < bars[leftIndex]){
                    //swap bars heights
                    swapBarHeights(leftIndex, rightIndex, bars)
                    animations.push([animationType.SWAP, leftIndex, rightIndex, bars[leftIndex], bars[rightIndex]])
                    //compare the two bars lower on height
                    rightIndex = leftIndex
                    leftIndex = leftIndex - 1   
                }
                else{
                    break
                }
            }
        }
        animateSort(animations)
    }

    function mergeSortStarter(){
        let animations = []
        const array = bars
        const leftIndex = 0
        const rightIndex = array.length - 1
        const sortedPacket = mergeSort(leftIndex, rightIndex, array, animations)
        for (let i = 0; i < arrayLength; i++){
            bars[i] = sortedPacket[0][i]
        }
        animateSort(animations)
    }

    function mergeSort(leftIndex, rightIndex, array, animations){
        if (leftIndex === rightIndex){
            return [[array[0]], leftIndex] //tuple of array, and index of where subarray starts
        }
        const middleIndex = (leftIndex + rightIndex) >>> 1
        const leftPacket = mergeSort(leftIndex, middleIndex, array.slice(0, (middleIndex - leftIndex) + 1), animations)
        const rightPacket = mergeSort(middleIndex + 1, rightIndex, array.slice((middleIndex - leftIndex) + 1), animations)
        const sortedArray = merge(leftPacket, rightPacket, animations)
        return [sortedArray, leftIndex]
    }

    function merge(leftPacket, rightPacket, animations){
        const leftSortedArray = leftPacket[0]
        const rightSortedArray = rightPacket[0]
        const leftStart = leftPacket[1]
        const rightStart = rightPacket[1]

        let mergedArray = []
        let leftPointer = 0
        let rightPointer = 0
        while (leftPointer < leftSortedArray.length && rightPointer < rightSortedArray.length){
            animations.push([animationType.COMPARISON, leftStart + leftPointer, rightStart + rightPointer])
            if(leftSortedArray[leftPointer] <= rightSortedArray[rightPointer]){
                mergedArray.push(leftSortedArray[leftPointer])
                animations.push([animationType.SINGLE_CHANGE, leftStart + mergedArray.length - 1, leftSortedArray[leftPointer]])
                leftPointer++
            }
            else{ // bars[leftPointer] > bars[rightPointer]
                mergedArray.push(rightSortedArray[rightPointer])
                animations.push([animationType.SINGLE_CHANGE, leftStart + mergedArray.length - 1, rightSortedArray[rightPointer]])
                rightPointer++
            }
        }
        while (leftPointer < leftSortedArray.length){
            mergedArray.push(leftSortedArray[leftPointer])
            animations.push([animationType.SINGLE_CHANGE, leftStart + mergedArray.length - 1, leftSortedArray[leftPointer]])
            leftPointer++
        }
        while (rightPointer < rightSortedArray.length){
            mergedArray.push(rightSortedArray[rightPointer])
            animations.push([animationType.SINGLE_CHANGE, leftStart + mergedArray.length - 1, rightSortedArray[rightPointer]])
            rightPointer++
        }
        return mergedArray
    }

    function bubbleSort(){
        let animations = []
        let no_swaps = true
        let last_bar_index_swapped = arrayLength - 1
        for (let i = 0; i < arrayLength - 1; i++){
            console.log("last bar_index swapped", last_bar_index_swapped)
            let index_swapped = 0
            for (let j = 0; j < last_bar_index_swapped; j++){
                animations.push([animationType.COMPARISON, j, j + 1])
                if (bars[j] > bars[j+1]){
                    swapBarHeights(j, j+1, bars)
                    animations.push([animationType.SWAP, j, j + 1, bars[j], bars[j+1]])
                    index_swapped = j
                    no_swaps = false
                }
            }
            if (no_swaps){
                console.log("broke")
                break
            }
            no_swaps = true
            last_bar_index_swapped = index_swapped
        }
        animateSort(animations)
    }

    function quickSortStarter(){
        let animations = []
        quickSort(0, arrayLength - 1, bars, animations)
        animateSort(animations)
    }

    function quickSort(leftIndex, rightIndex, array, animations){
        //base case, partition is 1 element or less
        if (rightIndex - leftIndex <= 0){
            return
        }
        //picking pivot, and placing it on the right of the array (just rightmost value for now)
        const pivotIndex = rightIndex
        const pivotValue = array[pivotIndex]
        let leftPointer = leftIndex
        let rightPointer = rightIndex - 1

        //place bars left or right of pivot value
        while (true){
            while (array[leftPointer] < pivotValue){
                animations.push([animationType.COMPARISON, leftPointer, pivotIndex])
                leftPointer++
            }
            animations.push([animationType.COMPARISON, leftPointer, pivotIndex])
            while (array[rightPointer] > pivotValue && rightPointer > leftPointer){
                animations.push([animationType.COMPARISON, rightPointer, pivotIndex])
                rightPointer--
            }
            animations.push([animationType.COMPARISON, rightPointer + 1, pivotIndex])
            if (leftPointer >= rightPointer) break
            swapBarHeights(leftPointer, rightPointer, array)
            animations.push([animationType.SWAP, leftPointer, rightPointer, bars[leftPointer], bars[rightPointer]])
            leftPointer++
            rightPointer--
        }
        //place pivot value where it's supposed to be
        swapBarHeights(leftPointer, pivotIndex, array)
        animations.push([animationType.SWAP, leftPointer, pivotIndex, bars[leftPointer], bars[pivotIndex]])

        //sort the two smaller sides
        quickSort(leftIndex, leftPointer - 1, array, animations)
        quickSort(leftPointer + 1, rightIndex, array, animations)
    }

    function animateSort(animations){
        disableButtonsWhenSort(animations)
        const barsScraped = document.getElementsByClassName("single-bar")
        for (let i = 0; i < animations.length; i++){  
            const animation = animations[i]
            const type = animation[0]
            switch (type){
                case animationType.COMPARISON:{
                    const i_ind = animation[1] 
                    const j_ind = animation[2]
                    setTimeout(() => {
                        barsScraped[i_ind].style.backgroundColor = '#aabbbc'
                        barsScraped[j_ind].style.backgroundColor = '#aabbbc'                   
                    }, i * (ms))
                    setTimeout(() => {
                        barsScraped[i_ind].style.backgroundColor = '#eb4528'
                        barsScraped[j_ind].style.backgroundColor = '#eb4528'                  
                    }, (i + 1) * (ms))
                    break
                }
                case animationType.SWAP:{
                    const i_ind = animation[1] 
                    const j_ind = animation[2]
                    const new_i_height = animation[3]
                    const new_j_height = animation[4]
                    setTimeout(() => {
                        barsScraped[i_ind].style.backgroundColor = '#caef8c'
                        barsScraped[j_ind].style.backgroundColor = '#caef8c'
                        barsScraped[i_ind].style.height = `${new_i_height}%`
                        barsScraped[j_ind].style.height = `${new_j_height}%`
                    }, i * (ms))
                    setTimeout(() => {
                        barsScraped[i_ind].style.backgroundColor = '#eb4528'
                        barsScraped[j_ind].style.backgroundColor = '#eb4528'
                    }, (i + 1) * (ms))
                    break
                }
                case animationType.SINGLE_CHANGE:{
                    const i_ind = animation[1]
                    const new_i_height = animation[2]
                    setTimeout(() => {
                        barsScraped[i_ind].style.backgroundColor = '#caef8c'
                        barsScraped[i_ind].style.height = `${new_i_height}%`
                    }, i * (ms))
                    setTimeout(() => {
                        barsScraped[i_ind].style.backgroundColor = '#eb4528'
                    }, (i + 1) * (ms))
                    break
                }
                default:{
                    console.log("ERROR IN ANIMATION")
                    break
                }
            }
        }
    }

    function disableButtonsWhenSort(animations){
        const buttons = document.getElementsByClassName("button")
        const resetLevelButtons = document.getElementsByClassName("reset-level-button")
        const sliders = document.getElementsByClassName("slider")
        for (let i = 0; i < buttons.length; i++){
            buttons[i].disabled = true
        }
        resetLevelButtons[0].disabled = true
        resetLevelButtons[1].disabled = true
        sliders[0].disabled = true
        sliders[1].disabled = true
        setTimeout(() => {
            for (let i = 0; i < buttons.length; i++){
                buttons[i].disabled = false
            }
            resetLevelButtons[0].disabled = false
            resetLevelButtons[1].disabled = false
            sliders[0].disabled = false
            sliders[1].disabled = false
        }, (animations.length) * (ms) + 10)
    }

    //for changing array size
    function onLengthChange(length){
        setArrayLength(length)
    }

    //for changing sort speed
    function onMsChange(milli, speedIndex){
        setMs(milli)
        setSpeedLevelIndex(speedIndex)
    }

    //for lowering sort percentage
    function lowerLevel(){
        if (sortedLevelIndex !== 0){
            setSortedLevelIndex(sortedLevelIndex - 1)
        }
    }

    //for increasing sort percentage
    function higherLevel(){
        if (sortedLevelIndex !== (sortedLevels.length - 1)){
            setSortedLevelIndex(sortedLevelIndex + 1)
        }
    }

    return (
        <div className="sorting-page">
            TW: Flashing Colors -- If on mobile, scroll down for more options
            <div className="all-bars">
                {bars.map((value, idx) => (
                    <div className="single-bar" key={idx} style={{height: `${value}%`}}></div>
                ))}
            </div>
            <div className="button-list">
                <div className="reset-area">
                    <div className="sorted-levels">
                        <button className="reset-level-button" onClick={lowerLevel}>
                        -
                        </button>
                        <button className="button" id="reset-button" onClick={resetArray}>reset<br/>array</button>
                        <button className="reset-level-button" onClick={higherLevel}>
                        +
                        </button>
                    </div>
                    <div className="sorted-text">initially sorted {100 * (1 - 1/sortedLevels[sortedLevelIndex])}%</div>
                    <button className="cancel-button" onClick={reloadPage}>cancel long sort<br/>(refresh page)</button>
                </div>
                <button className="button" onClick={insertionSort}>insertion sort</button>
                <button className="button" onClick={mergeSortStarter}>merge sort</button>
                <button className="button" onClick={quickSortStarter}>quick sort</button>
                <button className="button" onClick={bubbleSort}>bubble sort</button>
                <button className="button" onClick={selectionSort}>selection sort</button>
                <div className="slider-box">
                    <div className="slider-text">array size: {arrayLength}</div>
                    <RangeStepInput className="slider" min={ARRAY_MIN_SIZE} max={ARRAY_MAX_SIZE} 
                        value={arrayLength} step={1} onChange={e => onLengthChange(e.target.value)}/>
                </div>
                <div className="slider-box">
                    <div className="slider-text">millisecs between animations: {ms}</div>
                    <RangeStepInput className="slider" min={0} max={speedLevels.length - 1} 
                        value={speedLevelIndex} step={1} onChange={
                            e => onMsChange(speedLevels[e.target.value], e.target.value)}/>
                </div>
            </div>
        </div>
    )
}

function reloadPage(){
    window.location.reload(false);
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