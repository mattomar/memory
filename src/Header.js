import React from "react";
import './styles/Header.css';

function Header() {
 
    return (
        <div className="header">
          <div className="left-side">
            <p>Memory Card Game</p>
          </div>
          <div className="right-side">
            <div className="current-score">
               <p>Current Score: 0</p>
            </div>
            <div className="best-score">
               <p>Best Score: 0</p>
            </div>
          </div>
        </div>
      );
    }
    

    export default Header;
