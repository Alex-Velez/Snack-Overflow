import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div style={{ padding: 20}}>
            <h1>Snack-Overflow</h1>
            <nav>
                <ul>
                    <li><Link to="/category">Browse Categories</Link></li>
                    <li><Link to="/cart">My Cart</Link></li>
                    <li><Link to="/orders">Order History</Link></li>
                    <li><Link to="/login">Log In / Sign Up</Link></li>
                </ul>
            </nav>
        </div>
    );
}
