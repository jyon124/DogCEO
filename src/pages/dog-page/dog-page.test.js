import React from 'react';
import DogPage from './dog-page.js';
import Loading from '../../components/loading/loading.js';
import { shallow, render, mount } from 'enzyme';

describe('DogPage', () => {
    beforeEach(() => {
        const mocksetDogImgs = jest.fn();
        React.useState = jest.fn(() => [[], mocksetDogImgs]);
    });

    it('renders loading component for the initial render', () => {
        /**
         *  It will render loading component initially because @useEffect will be invoked
         *  initially that have fetch functions and it triggers loading while fetching
         **/
        const wrapper = mount(<DogPage />);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });

    it('renders loading component if no dog images are fetched', () => {
        /**
         * @param {dogImgs} set to empty at beforeEach, fetch function will invoked when
         * there are no dog imgs and it renders loading component during fetch.
         **/
        const wrapper = mount(<DogPage />);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });

    it('renders loading component if the fetch call is being made', () => {
        /**
         *  Fetch functions are located in @useEffect thus, by using mount,
         *  it invoke fetch functions and renders loading component.
         **/
        const wrapper = mount(<DogPage />);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });
    // it('renders DogCard components when dog images data are available');
    // it('renders only unique dog image - filters the duplicates');
    // it('fetches additional dog images when the scroll reaches to the bottom and renders them');
    // it('tests the debounce allows the additional dog image fetch per certain time period');
});