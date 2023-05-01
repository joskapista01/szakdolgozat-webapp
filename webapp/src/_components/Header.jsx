import React from "react";
import { userService } from "../_services/user-service";
import { Link } from 'react-router-dom';
import "./header.css"

export default function Header(){
    return(
        <header>
            <Link to="/login" onClick={userService.logout}>Logout</Link>
        </header>
    )
}