import React from "react";
import DogPage from "./dog-page.js";
import DogCard from "../../components/dog-card/dog-card.js";
import Loading from "../../components/loading/loading.js";
import api from "../../service/api.js";
import { mount } from "enzyme";
import { waitFor, fireEvent, act } from "@testing-library/react";

jest.mock("../../service/api.js");

describe("DogPage", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Renders loading component for the initial render", async () => {
        expect.assertions(1);
        const dogImgResp = {
            message: ["dog1.jpg"],
            status: "success"
        };
        const dogBreedsResp = {
            message: { affenpinscher: [], cattledog: ["australian"] },
            status: "success",
        };
        api.fetchRandomDogImgs.mockImplementationOnce(() => dogImgResp);
        api.fetchDogBreeds.mockImplementationOnce(() => dogBreedsResp);
        const wrapper = mount(<DogPage />);
        await waitFor(() => {
            expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
        })
    });

    it("Renders loading component if no dog images are fetched", async () => {
        expect.assertions(2);
        const dogImgResp = {
            message: ["dog1.jpg"],
            status: "success"
        };
        const dogBreedsResp = {
            message: { affenpinscher: [], cattledog: ["australian"] },
            status: "success",
        };
        api.fetchRandomDogImgs.mockImplementationOnce(() => dogImgResp);
        api.fetchDogBreeds.mockImplementationOnce(() => dogBreedsResp);
        const wrapper = mount(<DogPage />);
        await waitFor(() => {
            expect(wrapper.containsAnyMatchingElements(DogCard)).toEqual(false);
            expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
        });
    });
    
    it("Renders loading component if the fetch call is being made", async () => {
        expect.assertions(2);
        const dogImgResp = {
            message: ["dog1.jpg"],
            status: "success"
        };
        const dogBreedsResp = {
            message: { affenpinscher: [], cattledog: ["australian"] },
            status: "success",
        };
        api.fetchRandomDogImgs.mockImplementationOnce(() => dogImgResp);
        api.fetchDogBreeds.mockImplementationOnce(() => dogBreedsResp);
        const wrapper = mount(<DogPage />);
        await waitFor(() => {
            expect(api.fetchRandomDogImgs).toHaveBeenCalled();
            expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
        });
    });

    it("Renders DogCard components when dog images data are available", async () => {
        expect.assertions(2);
        const dogImgResp = {
            message: ["dog1.jpg"],
            status: "success"
        };
        const dogBreedsResp = {
            message: { affenpinscher: [], cattledog: ["australian"] },
            status: "success",
        };
        api.fetchRandomDogImgs.mockImplementationOnce(() => dogImgResp);
        api.fetchDogBreeds.mockImplementationOnce(() => dogBreedsResp);
        const wrapper = mount(<DogPage />);
        await waitFor(() => {
            expect(api.fetchRandomDogImgs).toHaveBeenCalled();
            expect(wrapper.contains(DogCard)).toEqual(true);
        });
    });

    it("Renders only unique dog image - filters the duplicates", async () => {
        const dogImgResp = {
            message: ["dog1.jpg", "dog1.jpg", "dog3.jpg", "dog2.jpg", "dog3.jpg", "dog1.jpg"],
            status: "success"
        };
        const dogBreedsResp = {
            message: { affenpinscher: [], cattledog: ["australian"] },
            status: "success",
        };
        api.fetchRandomDogImgs.mockImplementationOnce(() => dogImgResp);
        api.fetchDogBreeds.mockImplementationOnce(() => dogBreedsResp);
        const wrapper = mount(<DogPage />);
        await waitFor(() => {
            expect(wrapper.html().split("src").length-1).toEqual(3);
        });
    });

    it("Fetches additional dog images when the scroll reaches to the bottom and renders them", async () => {
        const dogImgResp = {
            message: ["dog1.jpg"],
            status: "success"
        };
        const secondDogImgResp = {
            message: ["dog6.jpg", "dog7.jpg", "dog8.jpg"],
            status: "success" 
        };
        const dogBreedsResp = {
            message: { affenpinscher: [], cattledog: ["australian"] },
            status: "success",
        };
        api.fetchRandomDogImgs
            .mockImplementationOnce(() => dogImgResp)
            .mockImplementationOnce(() => secondDogImgResp);
        api.fetchDogBreeds.mockImplementationOnce(() => dogBreedsResp);
        const height = window.innerHeight;
        const wrapper = mount(<DogPage />);
        act(() => {
            fireEvent.scroll(window, { target: { scrollY: height } });
        });
        await waitFor(() => {
            expect(api.fetchRandomDogImgs).toHaveBeenCalledTimes(2);
            expect(wrapper.html()).toEqual(true);
        });
    });

    it.todo("tests the debounce allows the additional dog image fetch per certain time period");
});