import './Card.css';
import React from 'react';

export const Card = ({ pokemon }) => {
  return (
    <div className='card'>
      <div className='cardImg'>
        <img src={pokemon.sprites.front_default} />
      </div>

      <span className='order'>No.{pokemon.order}</span>
      <h3 className='cardName'>{pokemon.name}</h3>
      <div className='cardType'>
        <div>タイプ</div>
        {pokemon.types.map((type, order) => {
          return (
            <div key={order}>
              <span className='typeName'>{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className='cartInfo'>
        <div className='cardData'>
          <p>重さ:{pokemon.weight}</p>
        </div>
        <div className='cardHeight'>
          <p>高さ:{pokemon.height}</p>
        </div>
        <div className='cardAblity'>
          <p>アビリティ:{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};
