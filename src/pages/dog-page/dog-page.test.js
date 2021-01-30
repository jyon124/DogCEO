import React from "react";
import DogPage from "./dog-page.js";
import Loading from "../../components/loading/loading.js";
import { mount } from "enzyme";
import DogCard from "../../components/dog-card/dog-card.js";
import { act } from "@testing-library/react";

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
        // Not exactly. Here you mocked fetch API, not the Dog API service.
        expect.assertions(2);
        const promise = Promise.resolve();
        jest.spyOn(global, "fetch");
        fetch.mockImplementationOnce(async () => promise);
        const wrapper = mount(<DogPage />);
        expect(fetch).toHaveBeenCalled();
        // If fetch function have invoked then render Loading component to be equal
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
        await act(() => promise);
        fetch.mockClear();
    });

    it("renders DogCard components when dog images data are available", () => {
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