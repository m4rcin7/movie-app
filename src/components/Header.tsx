"use client";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/authContext";
import { doSignOut as firebaseSignOut } from "../firebase/auth";
import { Button } from "@mui/material";
import { Menu, X, Film } from "lucide-react";

export function Header() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const baseLink = "font-medium transition-colors duration-200";
  const link = `${baseLink} text-gray-100 hover:text-violet-300`;
  const activeLink = `${baseLink} text-violet-300 font-bold`;

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? activeLink : link;

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
      navigate("/");
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Film className="h-8 w-8 text-violet-400" />
              <span className="ml-2 text-xl font-bold text-white">
                MovieApp
              </span>
            </NavLink>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <NavLink className={linkStyle} to="/">
                  Home
                </NavLink>
              </li>
              {userLoggedIn ? (
                <>
                  <li>
                    <NavLink className={linkStyle} to="/movies">
                      Movies
                    </NavLink>
                  </li>
                  <li>
                    <Button
                      onClick={handleSignOut}
                      color="secondary"
                      variant="contained"
                      size="small"
                      sx={{
                        borderRadius: "0.5rem",
                        textTransform: "none",
                        fontWeight: "medium",
                      }}
                    >
                      Logout
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink className={linkStyle} to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className={linkStyle} to="/register">
                      <Button
                        color="secondary"
                        variant="contained"
                        size="small"
                        sx={{
                          borderRadius: "0.5rem",
                          textTransform: "none",
                          fontWeight: "medium",
                        }}
                      >
                        Register
                      </Button>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 shadow-lg">
          <NavLink
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              } block px-3 py-2 rounded-md text-base font-medium`
            }
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>

          {userLoggedIn ? (
            <>
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } block px-3 py-2 rounded-md text-base font-medium`
                }
                to="/movies"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </NavLink>
              <button
                onClick={handleSignOut}
                className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } block px-3 py-2 rounded-md text-base font-medium`
                }
                to="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  } block px-3 py-2 rounded-md text-base font-medium`
                }
                to="/register"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
