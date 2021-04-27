import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from 'react-bootstrap';
import app from "../base";


function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">


          <div>
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${
                  props.location.pathname === "/home" ? "active" : ""
                }`}
              >
                <Button id = "homeButton"> 
                <Link className="nav-link" to="/home" id = "homeButton">
                  Go Home
                  <span className="sr-only"></span>
                </Link>
                </Button>
        <Button id = "homeButton">  
                
      <Link to='/home' className="nav-link" onClick={() => app.auth().signOut()} id = "homeButton">Sign out</Link>

      </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
