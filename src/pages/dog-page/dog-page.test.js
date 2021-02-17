import React from "react";
import DogPage from "./dog-page.js";
import Loading from "../../components/loading/loading.js";
import { shallow, mount } from "enzyme";
import DogCard from "../../components/dog-card/dog-card.js";

describe("DogPage", () => {
    it("renders loading component for the initial render", () => {
        // On mount, DogPage invoke fetch requests in useEffect that spin up loading
        const wrapper = mount(<DogPage />);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });

    it("renders loading component if no dog images are fetched", () => {
        const mockDog = "dog.jpeg";
        const mocksetDogImgs = jest.fn();
        React.useState = jest.fn(() => [[], mocksetDogImgs]);
        const wrapper = shallow(<DogPage />);
        // Check if DogCard component has rendered, it only renders when dog images are fetched
        expect(
            wrapper.containsMatchingElement(<DogCard dog={mockDog} />)
        ).toEqual(false);
        // If dog images aren't fetched, Loading component have to be visible
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });

    it.skip("renders loading component if the fetch call is being made", (done) => {
        expect.assertions(2);
        const mockDog = "dog.jpeg";
        const mockDogImgs = ["dog1.jpeg", "dog2.jpeg", "dog3.jpeg"];
        const mocksetDogImgs = jest.fn();
        // If dogImgs length is positive number, it should render DogCard component
        React.useState = jest.fn(() => [mockDogImgs, mocksetDogImgs]);
        const wrapper = shallow(<DogPage />);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
        wrapper.update();
        // Check if there is any DogCard component
        expect(
            wrapper.containsMatchingElement(<DogCard dog={mockDog} />)
        ).toEqual(true);
        done();
    });
    // it('renders DogCard components when dog images data are available');
    // it('renders only unique dog image - filters the duplicates');
    // it('fetches additional dog images when the scroll reaches to the bottom and renders them');
    // it('tests the debounce allows the additional dog image fetch per certain time period');
});
