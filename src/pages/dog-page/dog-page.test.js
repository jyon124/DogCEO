import React from "react";
import DogPage from "./dog-page.js";
import DogCard from "../../components/dog-card/dog-card.js";
import Loading from "../../components/loading/loading.js";
import api from "../../service/api.js";
import { mount } from "enzyme";
import { waitFor, fireEvent } from "@testing-library/react";

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
        expect.assertions(2);
        api.fetchRandomDogImgs = jest.fn(() => ({
            message: ["dog1.jpg"],
            status: "success"
        }));
        const wrapper = mount(<DogPage />);
        await waitFor(() => {
            expect(api.fetchRandomDogImgs).toHaveBeenCalled();
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
        api.fetchRandomDogImgs = jest.fn(() => ({
            message: ["dog1.jpg", "dog1.jpg", "dog3.jpg", "dog2.jpg", "dog3.jpg", "dog1.jpg"],
            status: "success"
        }));
        const wrapper = mount(<DogPage />);
        await waitFor(() => {
            expect(wrapper.html().split("src").length-1).toEqual(3);
        });
    });

    it.skip("fetches additional dog images when the scroll reaches to the bottom and renders them" , async() => {
        api.fetchRandomDogImgs = jest.fn(() => ({
            message: [
                "dog1.jpg", "dog2.jpg", "dog3.jpg", "dog4.jpg", "dog5.jpg", 
                "dog6.jpg","dog7.jpg","dog8.jpg","dog9.jpg","dog10.jpg",
                "dog11.jpg","dog12.jpg","dog13.jpg","dog14.jpg","dog15.jpg",
                "dog16.jpg","dog17.jpg","dog18.jpg","dog19.jpg","dog20.jpg"
            ],
            status: "success"
        }));
        const wrapper = mount(<DogPage />);
        fireEvent.scroll(global, { target: { scrollY: 2000 } });
        await waitFor(() => {
            // console.log(window.scrollY)
            expect(api.fetchRandomDogImgs).toHaveBeenCalledWith(1);
            // expect(wrapper.html()).toEqual(true);
        })
    });
    it.todo("tests the debounce allows the additional dog image fetch per certain time period");
});