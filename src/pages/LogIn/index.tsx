import React, { useState, FormEvent } from "react";
import useUser from "./hooks/useUser";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const LogIn = () => {
  const logo =
    require("../../img/real-time-tracking-logo-circular.png") as string;
  const { getLogin } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    getLogin(email, password)
      .then((data) => {
        message.success(data.message);
        localStorage.setItem("token", data.token);
        navigate("/home");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <section className="min-h-screen bg-navbar-color bg-opacity-56 dark:bg-navbar-color dark:bg-opacity-55">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto transform md:h-screen lg:py-0 md:-translate-y-10">
        <a
          href="/"
          className="flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white flex-shrink-0"
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
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@example.com"
                  datatype="string"
                  onChange={(event) => setEmail(event.target.value)}
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
                  datatype="string"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSubmit}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogIn;
