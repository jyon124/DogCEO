import React from 'react';
import ReactDOM from 'react-dom';
import DogPage from './dog-page.js';
import Loading from '../../components/loading/loading.js';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

describe('DogPage', () => {
    // Seems modifying React Hooks is not supported in Enzyme
    // => https://blog.logrocket.com/a-quick-guide-to-testing-react-hooks-fa584c415407/
    it('renders loading component for the initial render', () => {
        const wrapper = shallow(<DogPage />);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });
    // it('renders loading component if no dog images are fetched');
    // it('renders loading component if the fetch call is being made');
    // it('renders DogCard components when dog images data are available');
    // it('renders only unique dog image - filters the duplicates');
    // it('fetches additional dog images when the scroll reaches to the bottom and renders them');
    // it('tests the debounce allows the additional dog image fetch per certain time period');
});