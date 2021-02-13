import React from "react";
import DogCard from "./dog-card.js";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";

describe("DogCard", () => {
    it("renders a DogCard component", async () => {
        expect.assertions(2);
        const testData = "testImage.jpeg";
        const wrapper = mount(<DogCard dog={testData} />);
        await waitFor(() => {
            expect(wrapper.props().dog).toBe(testData);
            expect(wrapper.containsMatchingElement(<DogCard dog={testData} />)).toEqual(true);
        });
    });
});
