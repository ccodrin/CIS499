import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../base.js";
import { AuthContext } from "../Auth";
import Navigation from "./Navigation"
import ParkSmartBanner from "./ParkSmartBanner2.png"
import { Button, ButtonGroup } from 'react-bootstrap';


const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/violations");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/violations" />;
  }

  return (
    <div>
      <div class = "container" id = "parkingHeader">
      <Button disabled={true} id = "logoContainer">
      <img src={ParkSmartBanner} className="ParkSmartBanner" alt="ParkSmartBanner" />
      </Button>
      </div>
      <Navigation />
    <div className = "login">
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
         Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
   
    </div>
  );
};

export default withRouter(Login);