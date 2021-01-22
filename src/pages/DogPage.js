import React, { useCallback, useEffect, useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DogCard from '../components/DogCard.js';

function DogPage(){
    const randomDogImgAPI = "https://dog.ceo/api/breeds/image/random/10";
    const dogBreedsAPI = "https://dog.ceo/api/breeds/list/all";
    const [ dogImgs, setDogImgs ] = useState([]); // Rendered All Dog Imgs
    const [ selectedBreeds, setSelectedBreeds ] = useState(); // Selected Breed from Dropdown by user
    const [ breedOptions, setBreedOptions ] = useState(["-----"]); // All Breed Options for Dropdown
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        renderRandomDogImgs();
        renderDogBreeds();
    },[]);

    async function renderRandomDogImgs(){
        if(!isLoading){
            setIsLoading(true);
            await fetch(randomDogImgAPI)
            .then(resp => resp.json())
            .then(data => {
                // Filter out duplicate dog images
                const filteredDogs = handleDuplicates(data.message);
                // Then concatinate into previous array
                setDogImgs((prev) => [...prev, ...filteredDogs]);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
        }
    }

    async function renderDogBreeds(){
        await fetch(dogBreedsAPI)
        .then(resp => resp.json())
        .then(data => {
            setBreedOptions(oldArr => oldArr.concat(Object.keys(data.message)));
        })
        .catch(err => console.log(err));
    }
    
    function renderDogCards(){
        if(selectedBreeds && selectedBreeds !== "-----"){
            const filteredDogImgs = dogImgs.filter(dogImg => {
                let breed = dogImg.split("/")[4];
                let checkBreed = breed.split("-")[0];
                if(checkBreed) breed = checkBreed;
                return selectedBreeds === breed
            })
            return filteredDogImgs.map(dog => {
                return <DogCard dog={dog} key={dog+Math.random()} />
            })
        } else {
            if(dogImgs.length){
                return dogImgs.map(dog => {
                    return <DogCard dog={dog} key={dog+Math.random()} />
                })
            }
        }
    }

    function handleDuplicates(dogs){
        const map = {};
        const result = [];
        dogImgs.forEach(dog => {
            map[dog] = true;
        })
        dogs.forEach(dog => {
            if(!map[dog]){
                result.push(dog);
            }
        })
        return result;
    }

    const handleAdditionalRender = useCallback(() => {
        renderRandomDogImgs();
    })

    // It triggers "handleAdditionalRender when scroll reach the bottom of body"
    useBottomScrollListener(handleAdditionalRender);

    return (
        <div className="dog-page-wrapper">
            <div className="drop-down-breeds-wrapper">
                <Dropdown 
                    className="drop-down-breeds" 
                    options={breedOptions} 
                    onChange={(e) => setSelectedBreeds(e.value)} 
                    value={"Select a breed"} 
                    placeholder="Select a breed" 
                />
            </div>
            <div>
                {renderDogCards()}
            </div>
        </div>
    )
}
export default DogPage;