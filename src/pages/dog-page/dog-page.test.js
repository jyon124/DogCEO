import React from "react";
import DogPage from "./dog-page.js";
import DogCard from "../../components/dog-card/dog-card.js";
import Loading from "../../components/loading/loading.js";
import api from "../../service/api.js";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";

describe("DogPage", () => {
    jest.mock("../../service/api", () => {
        return {
            fetchRandomDogImgs: jest.fn().mockImplementation(() => {
                return {
                    message: ["dog1.jpg"],
                    status: "success"
                }
            }),
        };
    });

    it("renders loading component for the initial render", () => {
        // On mount, DogPage invoke fetch requests in useEffect that spin up loading
        const wrapper = mount(<DogPage />);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });

    it("renders loading component if no dog images are fetched", async () => {
        await waitFor(() => {
            expect.assertions(2);
        });
        const mockdog = "dog1.jpeg";
        const wrapper = mount(<DogPage />);
        // If there are no DogCard component then check existence of Loading component 
        expect(wrapper.containsMatchingElement(<DogCard dog={mockdog} />)).toEqual(false);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });
    
    it("renders loading component if the fetch call is being made", async() => {
        api.fetchRandomDogImgs = jest.fn(() => ({
            message: ["dog1.jpg"],
            status: "success"
        }));
        const wrapper = mount(<DogPage />);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
        await waitFor(() => {
            expect.assertions(1);
        });
    });

    it("renders DogCard components when dog images data are available", async () => {
        expect.assertions(2);
        api.fetchRandomDogImgs = jest.fn(() => ({
            message: ["dog1.jpg"],
            status: "success"
        }));
        const wrapper = mount(<DogPage />);
        expect(api.fetchRandomDogImgs).toHaveBeenCalled();
        await waitFor(() => {
            expect(wrapper.contains(DogCard)).toEqual(true);
        });
    });

    it.skip("renders only unique dog image - filters the duplicates", () => {
        const wrapper = mount(<DogPage />);
        expect(wrapper.html()).toEqual(true);
    });
    it.todo("fetches additional dog images when the scroll reaches to the bottom and renders them");
    it.todo("tests the debounce allows the additional dog image fetch per certain time period");
});