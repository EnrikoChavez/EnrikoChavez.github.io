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
                <Link to="/sandbox/sorting" onClick={refreshPage}>
                    sorting
                </Link>
            </div>
        </div>
    )
}

function refreshPage(){
    window.location.reload(false);
    window.location.assign('/sandbox/sorting')
}

export default Sandbox