import React from "react";
import DogCard from "./dog-card.js";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("DogCard", () => {
    /** Snapshot test to test @DogCard component renders correctly **/
    it("renders a DogCard component", () => {
        const testData = "testImage.jpeg";
        const wrapper = shallow(
            <DogCard dog={testData} key={testData + Math.random()} />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
