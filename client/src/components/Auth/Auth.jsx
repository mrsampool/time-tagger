import React from "react";

export const Auth = ({ logIn }) => {
    function handleSubmit(e){
        //e.preventDefault();
        const email = document.getElementById('input-email').value;
        const password = document.getElementById('input-pw').value;
        logIn({ email, password });
    }
    return (
        <div >
            <input id='input-email' />
            <input id='input-pw' />
            <button type={'button'} onClick={handleSubmit}>Log In</button>
        </div>
    );
}