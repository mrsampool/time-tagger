import React from "react";

import './User.css';

export const User = ({ user }) => (
    <div id={'User'}>
        <span>{user.first_name}</span>
    </div>
)