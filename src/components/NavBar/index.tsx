import { Avatar, Space, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface NavBarProps {
  isLoggedIn: boolean;
  userName: string;
}

const NavBar: React.FC<NavBarProps> = ({ isLoggedIn, userName }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const logo =
    require("../../img/real-time-tracking-logo-circular.png") as string;

  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.href = "https://localhost:3001/";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setIsAdmin(payload.admin);
    }
  }, []);

  return (
    <nav className="bg-navbar-color bg-opacity-56 fixed w-full z-20 top-0 start-0 border-b border-black">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-12" alt="Ble-beacon-data-mining-image" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Real Time Drone Tracking
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!isLoggedIn ? (
            <Link to={"/login"}>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Log In
              </button>
            </Link>
          ) : (
            <>
              <Space>
                {userName && (
                  <>
                    <Tooltip title={`Logged in as ${userName}`}>
                      <Avatar
                        size="default"
                        shape="square"
                        style={{ backgroundColor: "#717D7E" }}
                      >
                        {userName.substring(0, 2).toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  </>
                )}
                {isAdmin && (
                  <Link to={"/register"}>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                      style={{ backgroundColor: "#717D7E" }}
                    >
                      Register User
                    </button>
                  </Link>
                )}
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </Space>
            </>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link
                to={"/home"}
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/map"}
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Map
              </Link>
            </li>
            <li>
              <Link
                to={"/dataBase"}
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Data Base
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
