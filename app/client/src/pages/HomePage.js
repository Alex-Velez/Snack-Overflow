import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import "./HomePage.css";

export default function HomePage() {
    return (
        <>
            <Header />

            <div className="home-shape-container">
                <img src="/HomeRectangle.svg" alt="Logo" />
                <h2 className="home-shape-text">We bring the store to your door!</h2>

                <nav className="home-shape-text">
                    <ul>
                        <li><Link to="/category">Browse Categories</Link></li>
                        <li><Link to="/orders">Order History</Link></li>
                        <li><Link to="/login">Log In / Sign Up</Link></li>
                    </ul>
                </nav>
            </div>





            <div className="home-nav-tiles">
                <div className="home-tile"><Link to="/vegetables">Vegetables</Link></div>
                <div className="home-tile"><Link to="/snacks">Snacks & Breads</Link></div>
                <div className="home-tile"><Link to="/fruits">Fruits</Link></div>
                <div className="home-tile"><Link to="/meats">Meats</Link></div>
                <div className="home-tile"><Link to="/dairy">Milk & Dairy</Link></div>
                <div className="home-tile home-offset-tile"><Link to="/all">See All</Link></div>
            </div>
        </>
    );
}
