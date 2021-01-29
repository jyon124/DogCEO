import React, { useCallback, useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import Dropdown from "react-dropdown";
import debounce from "lodash.debounce";
import DogCard from "../../components/dog-card/dog-card.js";
import Loading from "../../components/loading/loading.js";
import API from "../../service/api.js";
import "./dog-page.css";
import "react-dropdown/style.css";

function DogPage() {
    const [dogImgs, setDogImgs] = React.useState([]); // Rendered All Dog Imgs
    const [selectedBreeds, setSelectedBreeds] = useState(); // Selected Breed from Dropdown by user
    const [breedOptions, setBreedOptions] = useState(["-----"]); // All Breed Options for Dropdown
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        // It isn't good practice to put the fetch functions in useEffect
        fetchRandomDogImgs();
        fetchDogBreeds();
    }, []);

    // Take care number of dog images to be fetched based on current width size
    function handleRenderNum() {
        const width = window.innerWidth;
        if (width >= 2500) {
            return 50;
        } else if (width >= 1400 && width < 2500) {
            return 30;
        } else if (width >= 500 && width < 1400) {
            return 20;
        } else {
            return 10;
        }
    }

    async function fetchRandomDogImgs() {
        if (isLoading) {
            return;
        }
        try {
            setIsLoading(true);
            let count = handleRenderNum();
            const data = await API.fetchRandomDogImgs(count);
            // Filter out duplicate dog images
            const filteredDogs = handleDuplicates(data.message);
            // Then concatinate into previous array
            setDogImgs((prev) => [...prev, ...filteredDogs]);
            setIsLoading(false);
        } catch (error) {
            return;
        }
    }

    // It need to be cached in order to improve performance => Apollo, GraphQL
    async function fetchDogBreeds() {
        try {
            const data = await API.fetchDogBreeds();
            setBreedOptions((prev) => [...prev, ...Object.keys(data.message)]);
        } catch (error) {
            return;
        }
    }

    // Filter Dog Images based on the selected breed, If "-----" has been selected or anything selected, render all dog images
    function renderDogCards() {
        if (selectedBreeds && selectedBreeds !== "-----") {
            const filteredDogImgs = dogImgs.filter((dogImg) => {
                let breed = dogImg.split("/")[4];
                let checkBreed = breed.split("-")[0];
                if (checkBreed) {
                    breed = checkBreed;
                }
                return selectedBreeds === breed;
            });
            return filteredDogImgs.map((dog) => {
                return <DogCard dog={dog} key={dog + Math.random()} />;
            });
        } else {
            if (dogImgs.length) {
                return dogImgs.map((dog) => {
                    return <DogCard dog={dog} key={dog + Math.random()} />;
                });
            }
        }
    }

    // Filter out duplicate dog images from newly fetched random dog images
    function handleDuplicates(dogs) {
        const map = new Map();
        const result = [];
        dogImgs.forEach((dog) => {
            if (!map.has(dog)) {
                map.set(dog, 1);
            } else {
                map.set(dog, map.get(dog) + 1);
            }
        });
        dogs.forEach((dog) => {
            if (!map.has(dog)) {
                result.push(dog);
            }
        });
        return result;
    }

    // Used debounce to prevent multiple fetch by giving term of 1000 ms
    const handleAdditionalRender = useCallback(
        debounce(() => fetchRandomDogImgs(), 1000)
    );

    // It triggers "handleAdditionalRender when scroll reach the bottom of body"
    useBottomScrollListener(handleAdditionalRender);

    return (
        <React.Fragment>
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
                <div id="dog-cards-container">{renderDogCards()}</div>
                {isLoading ? <Loading /> : false}
            </div>
        </React.Fragment>
    );
}
export default DogPage;
