import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <nav>
                <div className="rerouters">
                    <Link to="/" onClick={() => {refreshPage("/")}}>
                        Home
                    </Link>
                    <Link to="/about" onClick={() => {refreshPage("/about")}}>
                        About
                    </Link>
                    <Link to="/sandbox" onClick={() => {refreshPage("/sandbox")}}>
                        Sandbox
                    </Link>
                </div>
            </nav>
            
        </div>
    )
}

function refreshPage(pathName){
    if (window.location.pathname === "/sandbox/sorting"){
        window.location.reload(false);
        window.location.assign(pathName)
    }
}

export default Navbar
