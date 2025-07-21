import React from "react";
import { Link } from "react-router-dom";
import './Header.css'
import IconButton from "../IconButton/IconButton";
import SearchBar from "../SearchBar/SearchBar";

const BUTTON_SIZE = 50;

export default function Header({loggedIn}){
  return <header className="header">
    <div className="header-left">
      <img src="/logo.png" alt=""/>
      <Link to="/" style={{textDecoration: "none", color: "inherit"}}><h1 style={{cursor: "pointer"}}>Snack-Overflow</h1></Link>
    </div>
    <div className="header-middle">
      <SearchBar placeholder="Search for fruit, veggies, dairy, and more!"></SearchBar>
    </div>
    <div className="header-right">
      <IconButton id="cart-button" size={BUTTON_SIZE} link="/cart">
        <img src="/button_icons/Cart_Icon.png" alt="Cart"/>
      </IconButton>
      <IconButton id="profile-button" size={BUTTON_SIZE}>
        <img src="/button_icons/Profile_Icon.png" alt="Profile"/>
      </IconButton>
    </div>
  </header>
}