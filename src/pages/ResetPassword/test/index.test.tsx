import React from "react";
import { shallow } from "enzyme";
import { message } from "antd";
import ResetPassword from "..";

jest.mock("antd", () => {
  const antd = jest.requireActual("antd");
  const message = { success: jest.fn(), error: jest.fn(), info: jest.fn() };
  return {
    ...antd,
    message,
  };
});

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => jest.fn(),
}));

describe("ResetPassword Component Tests", () => {
  const mockValidateToken = jest.fn();
  const mockResetPassword = jest.fn();

  // jest.mock("./hooks/useResetPassword", () => () => ({
  //   validateToken: mockValidateToken,
  //   resetPassword: mockResetPassword,
  // }));

  it("should render without crashing", () => {
    const wrapper = shallow(<ResetPassword />);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });

  // it("should display a message on first creation", () => {
  //   localStorage.setItem(
  //     "token",
  //     btoa(JSON.stringify({ firstCreation: true }))
  //   );
  //   shallow(<ResetPassword />);
  //   expect(message.info).toHaveBeenCalledWith(
  //     "Since this is the first login, you must change the password."
  //   );
  //   localStorage.removeItem("token");
  // });

  // it("should show error message if passwords do not match", () => {
  //   const wrapper = shallow(<ResetPassword />);
  //   wrapper
  //     .find('input[name="password"]')
  //     .simulate("change", { target: { value: "Password123" } });
  //   wrapper
  //     .find('input[name="confirm-password"]')
  //     .simulate("change", { target: { value: "Password456" } });
  //   wrapper.find("form").simulate("submit");
  //   expect(message.error).toHaveBeenCalledWith("Passwords do not match");
  // });

  // it("should call resetPassword on form submit with valid data", async () => {
  //   mockResetPassword.mockResolvedValue({
  //     message: "Password reset successfully",
  //   });
  //   const wrapper = shallow(<ResetPassword />);
  //   wrapper
  //     .find('input[name="email"]')
  //     .simulate("change", { target: { value: "test@example.com" } });
  //   wrapper
  //     .find('input[name="password"]')
  //     .simulate("change", { target: { value: "Password123!" } });
  //   wrapper
  //     .find('input[name="confirm-password"]')
  //     .simulate("change", { target: { value: "Password123!" } });
  //   wrapper.find("form").simulate("submit");
  //   expect(mockResetPassword).toHaveBeenCalledWith(
  //     "test@example.com",
  //     "Password123!"
  //   );
  //   expect(message.success).toHaveBeenCalledWith("Password reset successfully");
  // });
});
