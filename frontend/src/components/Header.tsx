import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    auth?.logout();
    setIsOpen(false); // Close the mobile drawer on logout
  };

  const handleCreateAccount = () => {
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="z-[999] flex justify-center items-center fixed top-0 left-0 right-0">
      <div className="z-20 h-[65px] w-auto max-w-[800px] min-w-[70vw] backdrop-filter backdrop-blur-md bg-[rgba(255, 255, 255, 0.2)] border-2 border-solid shadow-2xl border-white border-opacity-10 rounded-xl flex items-center px-6 py-3 mt-7 justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="flex-grow flex justify-center md:justify-end items-center space-x-4">
          {auth?.isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="hidden md:block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="hidden md:block">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup" className="hidden md:block">
                <button className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600">
                  Signup
                </button>
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-lg border-2 border-white border-opacity-20 shadow-2xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-30 md:hidden`}
      >
        <div className="flex justify-end p-5">
          <button onClick={() => setIsOpen(false)} className="text-black focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <ul className="flex flex-col items-center gap-4 mt-10 text-lg font-semibold whitespace-nowrap text-black">
          {auth?.isLoggedIn ? (
            <li onClick={handleLogout} className="hover:text-red-500 cursor-pointer">
              Logout
            </li>
          ) : (
            <>
              <NavLink to="/login" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
                <li>Login</li>
              </NavLink>
              <NavLink to="/signup" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
                <li>Signup</li>
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
