import React from 'react'
import { Link } from 'react-router-dom'

function navbar() {
    return (
        <div>
            <nav className="navbar">
                <Link to="/" className="navbar-logo">
                    LOGO
                </Link>
            </nav>
        </div>
    )
}

export default navbar
