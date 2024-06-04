import { Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useValidateToken from "./hooks/useResetPassword";

const ResetPassword = () => {
  const { token } = useParams();
  const { validateToken, resetPassword } = useValidateToken();

  const logo =
    require("../../img/real-time-tracking-logo-circular.png") as string;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/home");
    } else {
      const currentDateTime = new Date().toISOString();
      validateToken(token, currentDateTime)
        .then((data) => {
          if (data === 'true') {
            setIsValid(true);
          } else if (data === 'false') {
            setIsValid(false);
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  });

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
    } else if (!/\d/.test(newPassword)) {
      setPasswordError("La contraseña debe contener al menos un número");
    } else if (!/[A-Z]/.test(newPassword)) {
      setPasswordError(
        "La contraseña debe contener al menos una letra mayúscula"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    } else if (passwordError) {
      message.error("Password does not meet the requirements");
      return;
    } else {
      resetPassword(email, password)
      .then((data) => {
        message.success(data.message);
        navigate("/login");
      })
      .catch((error) => {
        message.error(error.message);
      })
    }
  };

  if (!isValid) {
    return <Spin size="large" fullscreen/>;
  } else {
    return (
      <section className="h-screen overflow-auto min-h-screen bg-navbar-color bg-opacity-56 dark:bg-navbar-color dark:bg-opacity-55">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto transform mt-20 md:h-screen lg:py-0 md:-translate-y-10">
          <a
            href="/"
            className="flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-full h-auto max-w-20 max-h-20vh mb-2"
              src={logo}
              alt="logo"
            />
            Real Time Drone Tracking
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Password Reset
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handlePasswordChange}
                  />
                  {passwordError && (
                    <p className="text-red-500">{passwordError}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm password
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleSubmit}
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default ResetPassword;
