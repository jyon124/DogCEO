import React, { useCallback, useEffect, useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import debounce from 'lodash.debounce';
import DogCard from '../components/DogCard.js';

function DogPage(){
    const randomDogImgAPI = `https://dog.ceo/api/breeds/image/random/`;
    const dogBreedsAPI = "https://dog.ceo/api/breeds/list/all";
    const [ dogImgs, setDogImgs ] = useState([]); // Rendered All Dog Imgs
    const [ selectedBreeds, setSelectedBreeds ] = useState(); // Selected Breed from Dropdown by user
    const [ breedOptions, setBreedOptions ] = useState(["-----"]); // All Breed Options for Dropdown
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        renderRandomDogImgs();
        renderDogBreeds();
    },[]);

    // Take care number of dog images to be fetched based on current width size
    function handleRenderNum(){
        const width = window.innerWidth;
        if(width >= 2500){
            return 50;
        } else if(width >= 1400 && width < 2500){
            return 30;
        } else if(width >= 500 && width < 1400){
            return 20;
        } else {
            return 10;
        }
    }

    async function renderRandomDogImgs(){
        if(!isLoading){
            setIsLoading(true);
            let count = handleRenderNum();
            await fetch(randomDogImgAPI + count)
            .then(resp => resp.json())
            .then(data => {
                // Filter out duplicate dog images
                const filteredDogs = handleDuplicates(data.message);
                // Then concatinate into previous array
                setDogImgs((prev) => [...prev, ...filteredDogs]);
            })
            .catch(err => console.log(err));
            setIsLoading(false);
        }
    }

    async function renderDogBreeds(){
        await fetch(dogBreedsAPI)
        .then(resp => resp.json())
        .then(data => {
            setBreedOptions((prev) => [...prev, ...Object.keys(data.message)]);
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
        const map = new Map();
        const result = [];
        dogImgs.forEach(dog => {
            if(!map.has(dog)){
                map.set(dog, 1);
            } else {
                map.set(dog, map.get(dog)+1);
            }
        });
        dogs.forEach(dog => {
            if(!map.has(dog)){
                result.push(dog);
            }
        });
        return result;
    }

    const handleAdditionalRender = useCallback(
		debounce(() => renderRandomDogImgs(), 1000));

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
            {
            isLoading ?
            <div className="lds"><div></div><div></div><div></div></div>
            :
            false
            }
        </div>
    )
}
export default DogPage;