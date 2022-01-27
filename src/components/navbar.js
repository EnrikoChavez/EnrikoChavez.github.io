import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <div className="logo">
                Enriko Chavez
            </div>
            <div className="rerouters">
                <Link className="nav-button-wrapper" to="/" onClick={() => {refreshPage("/")}}>
                    <div className="nav-button">Home</div>
                </Link>
                <Link className="nav-button-wrapper" to="/about" onClick={() => {refreshPage("/about")}}>
                    <div className="nav-button">About</div>
                </Link>
                <Link className="nav-button-wrapper" to="/sandbox" onClick={() => {refreshPage("/sandbox")}}>
                    <div className="nav-button">Sandbox</div>
                </Link>
            </div>
            <div className="padding"/>
        </div>
    )
}

//hacky way of stopping sort from running if user leaves sort page before sort is over, only works with browser routher, decommissioned
function refreshPage(pathName){
    // console.log(window.location.hash)
    // if (window.location.hash === "#/sandbox/sorting"){
    //     // window.location.reload()
    //     // window.location.assign(pathName)
    // }
}

export default Navbar
