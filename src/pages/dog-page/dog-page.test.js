import React from "react";
import DogPage from "./dog-page.js";
import DogCard from "../../components/dog-card/dog-card.js";
import Loading from "../../components/loading/loading.js";
import api from "../../service/api.js";
import { mount, shallow } from "enzyme";
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

    it("renders loading component for the initial render", async () => {
        expect.assertions(1);
        // On mount, DogPage invoke fetch requests in useEffect that spin up loading
        const wrapper = mount(<DogPage />);
        await waitFor(() => {
            expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
        })
    });

    it("renders loading component if no dog images are fetched", async () => {
        expect.assertions(2);
        const wrapper = mount(<DogPage />);
        await waitFor(() => {
            // If there are no DogCard component then check existence of Loading component 
            expect(wrapper.containsAnyMatchingElements(DogCard)).toEqual(false);
            expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
        });
    });
    
    it("renders loading component if the fetch call is being made", async() => {
        expect.assertions(1);
        api.fetchRandomDogImgs = jest.fn(() => ({
            message: ["dog1.jpg"],
            status: "success"
        }));
        const wrapper = mount(<DogPage />);
        await waitFor(() => {
            expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
        });
    });

    it("renders DogCard components when dog images data are available", async () => {
        expect.assertions(2);
        api.fetchRandomDogImgs = jest.fn(() => ({
            message: ["dog1.jpg"],
            status: "success"
        }));
        const wrapper = mount(<DogPage />);
        await waitFor(() => {
            expect(api.fetchRandomDogImgs).toHaveBeenCalled();
            expect(wrapper.contains(DogCard)).toEqual(true);
        });
    });

    it("renders only unique dog image - filters the duplicates", async () => {
        // expect.assertions(1);
        api.fetchRandomDogImgs = jest.fn(() => ({
            message: ["dog1.jpg", "dog1.jpg", "dog3.jpg", "dog2.jpg", "dog3.jpg", "dog1.jpg"],
            status: "success"
        }));
        const wrapper = mount(<DogPage />);
        await waitFor(async () => {
            expect(wrapper.html()).toEqual(true);
        });
    });
    it.todo("fetches additional dog images when the scroll reaches to the bottom and renders them");
    it.todo("tests the debounce allows the additional dog image fetch per certain time period");
});