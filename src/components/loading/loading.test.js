import React from "react";
import Loading from "./loading.js";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("Loading", () => {
    /** Snapshot test to test @Loading component renders correctly **/
    it("renders a Loading component", () => {
        const wrapper = shallow(<Loading />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
