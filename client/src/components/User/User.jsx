import React from "react";

import './User.css';

export const User = ({ user, logOut }) => {
    function handleClick(){
        logOut();
    }
    return (
        <div id={'User'}>
            <span>{user.first_name}</span>
            <button onClick={handleClick}>
                X
            </button>
        </div>
    )
}