import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";

export default function HomePage() {
    return (
        <>
            <Header/>
            <nav>
                <ul>
                    <li><Link to="/category">Browse Categories</Link></li>
                    <li><Link to="/orders">Order History</Link></li>
                    <li><Link to="/login">Log In / Sign Up</Link></li>
                </ul>
            </nav>
        </>
    );
}
