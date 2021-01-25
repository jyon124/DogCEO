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
export default DogCard;