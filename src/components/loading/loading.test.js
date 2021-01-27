import React from 'react';
import ReactDOM from 'react-dom';
import Loading from './loading.js';

import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })
describe('Loading', () => {
    it('renders a Loading component', () => {
        const wrapper = shallow(<Loading />)
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});