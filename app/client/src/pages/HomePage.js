import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Page from "../components/Page/Page";

export default function HomePage({ activeUser }) {
    return (
        <Page activeUser={activeUser}>
            <div display="flex" flexDirection="column">

                <div className="home-header">
                    <img src="/HomeRectangle.svg" alt="Banner" className="home-banner" />
                    <h2 className="home-title">We bring the store to your door!</h2>
                    <h2 className="home-title home-title-2">Get organic produce and sustainably sourced groceries delivered at up to 5% off.</h2>

                    <nav className="home-nav">
                        <ul>
                            <li><Link to="/category">Browse Categories</Link></li>
                            <li><Link to="/orders">Order History</Link></li>
                            <li><Link to="/login">Log In / Sign Up</Link></li>
                        </ul>
                    </nav>
                </div>


                {/* <div className="home-nav-tiles">
                <div className="home-tile"><Link to="/vegetables">Vegetables</Link></div>
                <div className="home-tile"><Link to="/snacks">Snacks & Breads</Link></div>
                <div className="home-tile"><Link to="/fruits">Fruits</Link></div>
                <div className="home-tile"><Link to="/meats">Meats</Link></div>
                <div className="home-tile"><Link to="/dairy">Milk & Dairy</Link></div>
                <div className="home-tile"><Link to="/all">See All</Link></div>
                </div> */}

            </div>
        </Page>
    );
}
