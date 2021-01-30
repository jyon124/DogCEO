import React from "react";
import DogPage from "./dog-page.js";
import Loading from "../../components/loading/loading.js";
import { shallow, mount } from "enzyme";
import DogCard from "../../components/dog-card/dog-card.js";
// import { waitFor } from "@testing-library/react";

describe("DogPage", () => {
    it("renders loading component for the initial render", () => {
        // On mount, DogPage invoke fetch requests in useEffect that spin up loading
        const wrapper = mount(<DogPage />);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });

    it("renders loading component if no dog images are fetched", () => {
        expect.assertions(2);
        const wrapper = mount(<DogPage />);
        // Try to find any DogCard component by className in DogPage component
        const findDogCard = wrapper.find(".dog-card");
        // If there are no DogCard component then check existence of Loading component 
        expect(findDogCard.exists()).toBe(false);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });
    
    it("renders loading component if the fetch call is being made", () => {
        expect.assertions(2);
        // Check if useEffect has been called
        const mockUseEffect = () => {
            useEffect.mockImplementationOnce(() => {});
        };
        const useEffect = jest.spyOn(React, "useEffect");
        const wrapper = mount(<DogPage />);
        expect(useEffect).toHaveBeenCalled();
        // If so, fetch function has to be invoked and render Loading component
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });

    it("renders DogCard components when dog images data are available", () => {
        expect.assertions(2);
        // Mocked DogImgs to test if DogCard component renders as expected
        const useState = React.useState;
        const mockdata = ["dog1.jpeg"];
        jest.spyOn(React, "useState")
        .mockImplementationOnce(() => useState(mockdata));
        const wrapper = mount(<DogPage />);
        expect(wrapper.containsMatchingElement(<DogCard dog={mockdata[0]} />)).toEqual(true);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(false);
    });
    // it("renders only unique dog image - filters the duplicates");
    // it("fetches additional dog images when the scroll reaches to the bottom and renders them");
    // it("tests the debounce allows the additional dog image fetch per certain time period");
});