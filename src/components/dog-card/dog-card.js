import React from 'react';
import PropTypes from 'prop-types';
import './dog-card.css';

function DogCard(props){
    return (
        <div className="dog-img-wrapper">
            <img 
                className="dog-img"
                src={props.dog} 
                key={props.dog+Math.random()}
                alt="dog img" 
            />
        </div>
    )
}
DogCard.propTypes = {
    dog: PropTypes.string.isRequired,
};
export default DogCard;