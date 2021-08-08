import React from 'react'
import './Home.css';

function Home() {
    return (
        <div className="home">
            <div className="padding" id="top"/>
            <div className="home-bar">
                <img className="profile-picture" src="/images/Enriko.jpg" alt=""/>
                <div className="info-box">
                    <div className="stuff">hello</div>
                </div>
            </div>
            <div className="padding" id="bottom"/>
        </div>
    )
}

export default Home
