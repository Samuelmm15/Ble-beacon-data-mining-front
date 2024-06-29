import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Link } from "react-router-dom";

interface HomeProps {
  setGlobalUserName: Dispatch<SetStateAction<string>>;
}

const Home: React.FC<HomeProps> = ({ setGlobalUserName }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const payload = JSON.parse(jsonPayload);
      const getUserName = payload.userId;
      setUserName(getUserName);
      setGlobalUserName(getUserName);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.firstCreation) {
        window.location.href = "https://localhost:3001/reset-password";
      }
    }
  }, []);

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} userName={userName} />
      <section className="h-screen w-full bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-gray-700 bg-blend-multiply border-none m-0 p-0 overflow-hidden">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            RTDT - Real Time Drone Tracking
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            Application for drone tracking in security and
            emergency scenarios. It's a valuable tool in security and
            emergency situations, enhancing response capability, personnel
            safety, and the effectiveness of rescue and damage assessment
            operations.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <Link
              to={"/map"}
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get started
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
