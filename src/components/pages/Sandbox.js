import React from 'react'
import './Sandbox.css'
import { Link } from 'react-router-dom'

function Sandbox() {
    return (
        <div className="sandbox">
            <div className="title">
                sandbox projects
            </div>
            <div className="project-list">
                <Link className="nav-button-wrapper" to="/sorting">
                    <div className="nav-button">sorting</div>
                </Link>
            </div>
            <div className="padding"/>
        </div>
    )
}

export default Sandbox