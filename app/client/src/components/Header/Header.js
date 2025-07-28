import React from "react";
import { Link } from "react-router-dom";
import './Header.css'
import IconButton from "../IconButton/IconButton";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

const BUTTON_SIZE = 50;

export default function Header({ user }) {
    const navigate = useNavigate();
    const isLoggedIn = Boolean(user);
    function handleSearch(search) {
        navigate(`/shop/?search=${encodeURIComponent(search.toLowerCase())}`);
    }

    return (
        <header className="header">

            <div className="header-left">
                <img src="/logo.svg" alt="" />
                <Link to="/" className="header-left-text">Snack-Overflow</Link>
            </div>

            <div className="header-middle">
                <SearchBar placeholder="Search for fruit, veggies, dairy, and more!" handleSearch={handleSearch}></SearchBar>
            </div>

            <div className="header-right">
                <IconButton id="cart-button" size={BUTTON_SIZE} link="/cart">
                    <img src="/button_icons/Cart_Icon.png" alt="Cart" />
                </IconButton>
                <IconButton id="profile-button" size={BUTTON_SIZE} link={isLoggedIn ? "/profile" : "/login"}>
                    <img src="/button_icons/Profile_Icon.png" alt="Profile" />
                </IconButton>
            </div>

        </header>
    );
}