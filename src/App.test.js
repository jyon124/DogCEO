import React from "react";
import App from "./App";
import { mount } from "enzyme";
import { waitFor } from "@testing-library/react";

test("render App component", async () => {
    expect.assertions(1);
    const wrapper = mount(<App />);
    await waitFor(() => {
        expect(wrapper.containsMatchingElement(App)).toEqual(true);
    });
});
