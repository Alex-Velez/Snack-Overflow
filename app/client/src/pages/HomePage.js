import React from "react";
import { Link } from "react-router-dom";
import Page from "../components/Page/Page";
import "./HomePage.css";

export default function HomePage({ activeUser }) {
    return (
        <Page activeUser={activeUser}>

            <div className="home">

                <div className="home-header">
                    <img src="/HomeRectangle.svg" alt="Banner" className="home-banner" />
                    <h2 className="home-title">We bring the store to your door!</h2>
                    <h2 className="home-title home-title-2">Get organic produce and sustainably sourced groceries delivered at up to 10% off.</h2>

                    <nav className="home-top-nav">
                        <ul>
                            <li><Link to="/category">Browse Categories</Link></li>
                            <li><Link to="/orders">Order History</Link></li>
                        </ul>
                    </nav>
                </div>

                <div className="home-nav-tiles">
                    {/* // todo: Send to Categories page with specific filter */}
                    <Link to="/vegetables" className="home-tile">Vegetables</Link>
                    <Link to="/snacks" className="home-tile">Snacks & Breads</Link>
                    <Link to="/fruits" className="home-tile">Fruits</Link>
                    <Link to="/meats" className="home-tile">Meats</Link>
                    <Link to="/dairy" className="home-tile">Milk & Dairy</Link>
                    <Link to="/all" className="home-tile home-offset-tile">See All</Link>
                </div>

            </div>
        </Page >
    );
}
