import api from "./api.js";

describe('DogApi.fetchRandomDogImgs', () => {
    it('calls the fetch API and return the JSON data', async () => {
        const data = await api.fetchRandomDogImgs(5);
        expect(typeof data).toBe("object");
    });
});

describe('DogApi.fetchDogBreeds', () => {
    it('calls the fetch API and return the JSON data', async() => {
        const data = await api.fetchDogBreeds();
        expect(typeof data).toBe("object");
    });
});