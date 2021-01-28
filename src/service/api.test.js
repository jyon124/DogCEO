import api from "./api.js";

describe('DogApi.fetchRandomDogImgs', () => {
    it('calls the fetch API and return the JSON data', async () => {
        expect.assertions(1);
        const mockSuccessResponse = {
                "message": ["dog1img.jpeg"],
                "status": "success"
            };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        const data = await api.fetchRandomDogImgs(1)
        expect(typeof data).toBe("object");
        global.fetch.mockClear();
    });
});

describe('DogApi.fetchDogBreeds', () => {
    it('calls the fetch API and return the JSON data', async () => {
        expect.assertions(1);
        const mockSuccessResponse = {
            "message": {"affenpinscher": [], "cattledog": ["australian"]}, 
            "status": "success"
        };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        expect.assertions(1);
        const data = await api.fetchDogBreeds();
        expect(typeof data).toBe("object");
        global.fetch.mockClear();
    });
});

