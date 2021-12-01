import React, { useState } from "react";

import "./Auth.css";

export const Auth = ({ logIn, createAccount, setUser }) => {
  const [mode, setMode] = useState("login");
  const [warn, setWarn] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("input-email").value;
    const password = document.getElementById("input-pw").value;
    logIn({ email, password }, ()=>{setWarn(true)});
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

      {
        mode === 'login'
          ? (
            <button type={"submit"} onClick={handleSubmit}>
              Log In
            </button>
          ) : (
            <button type={"submit"} onClick={handleCreate}>
              Submit
            </button>
          )
      }
      <p className={`login-fail ${warn}`}>
        Login unsuccessful
        <button type="button" onClick={()=>{setWarn(false)}}>OK</button>
      </p>

      <div id="other-options">
        {
          mode === 'login'
            ? (
              <React.Fragment>
                <p>New to TimeTagger?</p>
                <button id="create" onClick={handleModeSwitch}>
                  Create Account
                </button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p>Already have an account?</p>
                <button id="create" onClick={handleModeSwitch}>
                  Login
                </button>
              </React.Fragment>
            )
        }
        <p>Or. . .</p>
        <button id="create" onClick={handleDemo}>
          Try The Demo
        </button>
      </div>
    </form>
  );
};
