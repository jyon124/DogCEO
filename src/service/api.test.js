import api from "./api.js";
import { waitFor } from "@testing-library/react";

describe("DogApi.fetchRandomDogImgs", () => {
    const mockFetchJson = jest.fn();
    jest.spyOn(global, "fetch");
    afterEach(() => {
        fetch.mockClear();
        mockFetchJson.mockClear();
    });

    it("calls the fetch API and return the JSON data", async () => {
        expect.assertions(3);
        const response = {
            message: ["dog1img.jpeg"],
            status: "success",
        };
        mockFetchJson.mockImplementation(async () => response);
        fetch.mockImplementation(async () => ({
            json: mockFetchJson,
        }));
        const data = await api.fetchRandomDogImgs(1);
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
            expect(mockFetchJson).toHaveBeenCalled();
            expect(data).toEqual(response);
        });
    });

    it("throws an error in case the network call fails", async () => {
        expect.assertions(1);
        const error = new Error("Network request failed");
        fetch.mockImplementation(() => Promise.reject(error));
        await waitFor(() => {
            expect(api.fetchRandomDogImgs(1)).rejects.toEqual(error);
        });
    });
});

describe("DogApi.fetchDogBreeds", () => {
    const mockFetchJson = jest.fn();
    jest.spyOn(global, "fetch");
    afterEach(() => {
        fetch.mockClear();
        mockFetchJson.mockClear();
    });

    it("calls the fetch API and return the JSON data", async () => {
        expect.assertions(3);
        const response = {
            message: { affenpinscher: [], cattledog: ["australian"] },
            status: "success",
        };
        mockFetchJson.mockImplementation(async () => response);
        fetch.mockImplementation(async () => ({
            json: mockFetchJson,
        }));
        const data = await api.fetchDogBreeds();
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
            expect(mockFetchJson).toHaveBeenCalled();
            expect(data).toEqual(response);
        });
    });

    it("throws an error in case the network call fails" , async () => {
        expect.assertions(1);
        const error = new Error("Network request failed");
        fetch.mockImplementation(() => Promise.reject(error));
        await waitFor(() => {
            expect(api.fetchDogBreeds()).rejects.toEqual(error);
        });
    });
});
