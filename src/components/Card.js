import React from 'react';
import '../styles/Card.css';
function Card({ imageSrc, name }) {
  return (
    <div className="card">
      <img src={imageSrc} alt={name} className="card-image" />
      <h2 className="card-name">{name}</h2>
    </div>
  );
}

export default Card;