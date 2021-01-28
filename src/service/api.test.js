import api from "./api.js";

describe('DogApi.fetchRandomDogImgs', () => {
    const mockFetchJson = jest.fn();
    fetch = jest.fn();
    afterEach(() => {
        fetch.mockClear();
        mockFetchJson.mockClear();
    });
    it('calls the fetch API and return the JSON data', async () => {
        expect.assertions(3);
        const response = {
            "message": ["dog1img.jpeg"],
            "status": "success"
        };
        mockFetchJson.mockImplementation(async () => response);
        fetch.mockImplementation(async () => ({
            json: mockFetchJson,
        }));
        const data = await api.fetchRandomDogImgs(1)
        expect(fetch).toHaveBeenCalled();
        expect(mockFetchJson).toHaveBeenCalled();
        expect(data).toEqual(response);
    });
    it.todo('throws an error in case the network call fails');
});

describe('DogApi.fetchDogBreeds', () => {
    const mockFetchJson = jest.fn();
    fetch = jest.fn();
    afterEach(() => {
        fetch.mockClear();
        mockFetchJson.mockClear();
    });
    it('calls the fetch API and return the JSON data', async () => {
        expect.assertions(3);
        const response = {
            "message": {"affenpinscher": [], "cattledog": ["australian"]}, 
            "status": "success"
        };
        mockFetchJson.mockImplementation(async () => response);
        fetch.mockImplementation(async () => ({
            json: mockFetchJson,
        }));
        const data = await api.fetchDogBreeds();
        expect(fetch).toHaveBeenCalled();
        expect(mockFetchJson).toHaveBeenCalled();
        expect(data).toEqual(response);
    });
    it.todo('throws an error in case the network call fails');
});