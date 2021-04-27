import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Home from "./components/Home"
import Login from "./components/Login";
import About from "./components/About";
import Parking from "./components/Parking"
import Contact from "./components/Contact";
import SignUp from "./components/SignUp";
import { AuthProvider } from "./Auth";
import Violations from "./components/Violations";
import Footer from "./components/Footer"


const App = () => {


  return (
    <div>
    
     
    <AuthProvider>
      <Router>

        <div className="App">
          
          <Switch>
            <Route path="/home" exact component={() => <Home />} />
            <Route path="/" exact component={() => <Home />} />
            <Route path="/about" exact component={() => <About />} />
            <Route path="/contact" exact component={() => <Contact />} />
            <Route path="/parking" exact component={() => <Parking />} />
            <Route path="/violations" exact component={() => <Violations />} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            
          </Switch>
        </div>

       
        
      </Router>
    </AuthProvider>
    
    </div>
  );
};

export default App;

