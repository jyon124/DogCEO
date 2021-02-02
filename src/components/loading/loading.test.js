import React from "react";
import Loading from "./loading.js";
import { mount } from "enzyme";

describe("Loading", () => {
    it("renders a Loading component", () => {
        expect.assertions(1);
        const wrapper = mount(<Loading />);
        expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
    });
});
