const randomDogImgAPI = "https://dog.ceo/api/breeds/image/random/";
const dogBreedsAPI = "https://dog.ceo/api/breeds/list/all";

const fetchReq = {
    fetchRandomDogImgs: async (count) => {
        const response = await fetch(randomDogImgAPI + count);
        const data = await response.json();
        return data;
    },
    fetchDogBreeds: async () => {
        const response = await fetch(dogBreedsAPI);
        const data = await response.json();
        return data;
    },
};
export default fetchReq;
