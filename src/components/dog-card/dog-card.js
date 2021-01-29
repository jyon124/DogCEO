import React from "react";
import PropTypes from "prop-types";
import "./dog-card.css";

function DogCard(props) {
    const { dog } = props;
    return (
        <React.Fragment>
            <div className="dog-img-wrapper">
                <img className="dog-img" src={dog} alt="dog img" />
            </div>
        </React.Fragment>
    );
}
DogCard.propTypes = {
    dog: PropTypes.string.isRequired,
};
export default DogCard;
