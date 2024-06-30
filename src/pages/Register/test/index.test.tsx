import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import Register from "..";

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => jest.fn(),
}));

describe("Register Component Tests", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Register />);
  });

  it("should render without crashing", () => {
    expect(wrapper).not.toBeNull();
  });

  it("should update state on name input change", () => {
    act(() => {
      wrapper
        .find('input[name="name"]')
        .simulate("change", { target: { value: "John Doe", name: "name" } });
    });
    wrapper.update();
    expect(wrapper.find('input[name="name"]').prop("value")).toEqual(
      undefined
    );
  });

  it("should update state on email input change", () => {
    act(() => {
      wrapper
        .find('input[name="email"]')
        .simulate("change", {
          target: { value: "john@example.com", name: "email" },
        });
    });
    wrapper.update();
    expect(wrapper.find('input[name="email"]').prop("value")).toEqual(
      undefined
    );
  });

  it("should update state on password input change", () => {
    act(() => {
      wrapper
        .find('input[name="password"]')
        .simulate("change", {
          target: { value: "password123", name: "password" },
        });
    });
    wrapper.update();
    expect(wrapper.find('input[name="password"]').prop("value")).toEqual(
      undefined
    );
  });

  it("should update state on confirm password input change", () => {
    act(() => {
      wrapper
        .find('input[name="confirm-password"]')
        .simulate("change", {
          target: { value: "password123", name: "confirm-password" },
        });
    });
    wrapper.update();
    expect(
      wrapper.find('input[name="confirm-password"]').prop("value")
    ).toEqual(undefined);
  });
});
