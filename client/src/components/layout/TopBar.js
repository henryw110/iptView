import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {

  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new"className="top-bar-button">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="top-bar-button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="top-bar menu-text">iptView</li>
          <li >
            <Link className= "top-bar-button" to="/model/new"> Upload Model </Link>
          </li>
          <li>
            <a href="/user/all" className = "top-bar-button">View Models</a>
          </li>
          <li>
            <Link className = "top-bar-button" to="/userIndex">User Index</Link>
          </li>
          <li>
            <Link className = "top-bar-button" to="/">Home</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
