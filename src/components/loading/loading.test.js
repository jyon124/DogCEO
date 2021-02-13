import React from "react";
import Loading from "./loading.js";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";

describe("Loading", () => {
    it("renders a Loading component", async () => {
        expect.assertions(1);
        const wrapper = mount(<Loading />);
        await waitFor(() => {
            expect(wrapper.containsMatchingElement(<Loading />)).toEqual(true);
        });
    });
});
