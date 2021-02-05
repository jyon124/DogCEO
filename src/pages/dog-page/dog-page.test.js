import React from "react";
import DogPage from "./dog-page.js";
import DogCard from "../../components/dog-card/dog-card.js";
import Loading from "../../components/loading/loading.js";
import api from "../../service/api.js";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";

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
    
    it("renders loading component if the fetch call is being made", async() => {
        expect.assertions(1);
        jest.mock("../../service/api.js", () => {
            return {
                fetchRandomDogImgs: jest.fn().mockImplementation(() => {
                    return {
                        message: ["dog1.jpg"],
                        status: 'success'
                    }
                }),
            };
        });
        const wrapper = mount(<DogPage />);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });

    it("renders DogCard components when dog images data are available", async () => {
        // expect.assertions(2);
        // jest.spyOn(global, "fetch");
        // const wrapper = mount(<DogPage />);
        // // Check Fecth function have been called
        // expect(fetch).toHaveBeenCalled();
        // // If so, wait for any DogCard component to be rendered in DogPage component
        // await waitFor(() => {
        //     expect(wrapper.contains(DogCard)).toEqual(true);
        //     expect(wrapper.html()).toEqual(true);
        // });
    });
    it.todo("renders only unique dog image - filters the duplicates");
    it.todo("fetches additional dog images when the scroll reaches to the bottom and renders them");
    it.todo("tests the debounce allows the additional dog image fetch per certain time period");
});