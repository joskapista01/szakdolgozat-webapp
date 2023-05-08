import React from "react";
import { Link } from 'react-router-dom';
import "./header.css"

// Defines the header for the HomaPage component
export default function Header(){
    return(
        <header>
            <Link to="/login">Logout</Link>
        </header>
    )
}