import React, { useState } from "react";

import "./Auth.css";

export const Auth = ({ logIn, createAccount, setUser }) => {
  const [mode, setMode] = useState("login");
  function handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("input-email").value;
    const password = document.getElementById("input-pw").value;
    logIn({ email, password });
  }
  function handleCreate(e) {
    e.preventDefault();
    const firstName = document.getElementById("input-fname").value;
    const lastName = document.getElementById("input-lname").value;
    const email = document.getElementById("input-email").value;
    const password = document.getElementById("input-pw").value;
    createAccount(
      { userInfo: { firstName, lastName, email, password } },
      setMode
    );
  }
  function handleDemo() {
    logIn({ email: 'demo', password: 'password' });
  }
  function handleModeSwitch() {
    setMode(mode === "login" ? "create" : "login");
  }
  return (
    <form id="Auth" onSubmit={handleSubmit}>
      <h1 id="logo">TimeTagger</h1>
      <h2>{mode === "login" ? "User Log In" : "Create Account"}</h2>
      {mode === "create" && (
        <div className="login-rows">
          <label>
            First Name
            <input id="input-fname" />
          </label>
          <label>
            Last Name
            <input id="input-lname" />
          </label>
        </div>
      )}
      <div className="login-rows">
        <label>
          Email <input type="email" id="input-email" />
        </label>
        <label>
          Password <input type="password" id="input-pw" />
        </label>
      </div>
      {mode === "login" ? (
        <React.Fragment>
          <button type={"submit"} onClick={handleSubmit}>
            Log In
          </button>
          <p>
            Or
            <button id="create" onClick={handleModeSwitch}>
              Create Account
            </button>
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <button type={"submit"} onClick={handleCreate}>
            Submit
          </button>
          <p>
            Or
            <button id="create" onClick={handleModeSwitch}>
              Log In
            </button>
          </p>
        </React.Fragment>
      )}
      <p>
        Or
        <button id="create" onClick={handleDemo}>
          Try The Demo
        </button>
      </p>
    </form>
  );
};
