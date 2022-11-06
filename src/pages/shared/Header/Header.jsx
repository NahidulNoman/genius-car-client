import React, { useContext } from "react";
import { FaCartArrowDown, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { AuthContext } from "../../../UserContext/UserContext";

const Header = () => {
  const {user,logout} = useContext(AuthContext);

  const handlerOut = () => {
    logout()
    .then()
    .catch()
  }

  const menuItems = (
    <>
      <li className="font-semibold">
        <Link to="/">Home</Link>
      </li>
      <li className="font-semibold">
        <Link to="/">About</Link>
      </li>
      <li className="font-semibold">
        <Link to="/">Service</Link>
      </li>
      <li className="font-semibold">
        <Link to="/">Blog</Link>
      </li>
      <li className="font-semibold">
        <Link to="/">Contact</Link>
      </li>
      {
        user?.email ? <>
        <li className="font-semibold">
        <Link to="/orders">Orders</Link>
      </li>
      <li className="font-semibold">
        <Link onClick={handlerOut}>Log Out</Link>
      </li>
        </> :
      <li className="font-semibold">
      <Link to="/login">LogIn</Link>
    </li>
      }
    </>
  );

  return (
    <div className="navbar bg-stone-100 mb-8 mt-4 p-3 rounded-md shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          <img className="w-3/5" src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      <div className="navbar-end ">
        <div className="flex justify-between ">
          <FaSearch className="mr-5"></FaSearch>
          <FaCartArrowDown className="mr-5"></FaCartArrowDown>
          </div>
          <button className="btn btn-outline btn-warning">Appointment</button>
        
      </div>
    </div>
  );
};

export default Header;
