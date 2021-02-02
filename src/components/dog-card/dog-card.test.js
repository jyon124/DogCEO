import React from "react";
import DogCard from "./dog-card.js";
import { mount } from "enzyme";

describe("DogCard", () => {
    it("renders a DogCard component", () => {
        expect.assertions(2);
        const testData = "testImage.jpeg";
        const wrapper = mount(<DogCard dog={testData} />);
        expect(wrapper.props().dog).toBe(testData);
        expect(wrapper.containsMatchingElement(<DogCard dog={testData} />)).toEqual(true);
    });
});
