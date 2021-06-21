import React, { useState } from 'react'
import './Sorting.css'
import { Button } from 'react-bootstrap'

function Sorting() {
    let array = []
    for (let i = 0; i < 40; i++){
        array.push(randomInt(5, 100))
    }
    const [bars] = useState(array)

    return (
        <div className="sorting-page">
            {bars.map((value, idx) => (
                <div className="single-bar" key={idx} style={{height: `${value}%`}}>
                </div>
            ))}
            <div>
                <Button>hi</Button>
            </div>
        </div>
    )
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Sorting