import React from "react";
import DogPage from "./dog-page.js";
import DogCard from "../../components/dog-card/dog-card.js";
import Loading from "../../components/loading/loading.js";
import { mount } from "enzyme";

describe("DogPage", () => {
    it("renders loading component for the initial render", () => {
        // On mount, DogPage invoke fetch requests in useEffect that spin up loading
        const wrapper = mount(<DogPage />);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });

    it("renders loading component if no dog images are fetched", () => {
        expect.assertions(2);
        const mockdog = "dog1.jpeg";
        const wrapper = mount(<DogPage />);
        // If there are no DogCard component then check existence of Loading component 
        expect(wrapper.containsMatchingElement(<DogCard dog={mockdog} />)).toEqual(false);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });
    
    it("renders loading component if the fetch call is being made", async () => {
        expect.assertions(2);
        jest.spyOn(global, "fetch");
        const wrapper = mount(<DogPage />);
        expect(fetch).toHaveBeenCalled();
        // If fetch function have invoked then render Loading component to be equal
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
        fetch.mockClear();
    });

    it("renders DogCard components when dog images data are available", async () => {
        expect.assertions(1);
        // Mocked DogImgs to test if DogCard component renders as expected
        const useState = React.useState;
        const mockdata = ["dog1.jpeg"];
        jest.spyOn(React, "useState")
        .mockImplementationOnce(() => useState(mockdata));
        const wrapper = mount(<DogPage />);
        expect(wrapper.containsMatchingElement(<DogCard dog={mockdata[0]} />)).toEqual(true);
    });
    it.todo("renders only unique dog image - filters the duplicates");
    it.todo("fetches additional dog images when the scroll reaches to the bottom and renders them");
    it.todo("tests the debounce allows the additional dog image fetch per certain time period");
});