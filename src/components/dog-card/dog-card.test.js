import React from 'react';
import DogCard from './dog-card.js';

import Enzyme, { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('DogCard', () => {
    it('renders a DogCard component', () => {
        const testData = "testImage.jpeg";
        const wrapper = shallow(<DogCard dog={testData} key={testData+Math.random()} />)
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});