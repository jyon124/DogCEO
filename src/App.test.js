import React from "react";
// import { render } from "@testing-library/react";
import { mount } from "enzyme";
import App from "./App";

test("render App component", () => {
    mount(<App />);
});
