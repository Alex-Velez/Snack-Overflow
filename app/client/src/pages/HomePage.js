import React from "react";
import { Link } from "react-router-dom";
import Page from "../components/Page/Page";

export default function HomePage({activeUser}) {
    return (
        <Page activeUser={activeUser}>
            <nav>
                <ul>
                    <li><Link to="/category">Browse Categories</Link></li>
                    <li><Link to="/orders">Order History</Link></li>
                    <li><Link to="/login">Log In / Sign Up</Link></li>
                    <li><Link to="/category/Vegetables">Go to Vegetables</Link></li>
                </ul>
            </nav>
        </Page>
    );
}
