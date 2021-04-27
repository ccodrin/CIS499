import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Header from "./Header"
import Darian from "../images/darian.jpg"
import Joshua from "../images/joshua.jpg"
import Jordan from "../images/jordan.png"
import Codrin from "../images/codrin.jpg"
import Card from "react-bootstrap/Card";
import Car from "../images/car.webp"
import Blur from "../images/blur.jpg"
import Accordion from "react-bootstrap/Accordion";



alert("This website is in development and is part of a College Project");

export default class Home extends Component {
  
  render() {
    return (
     
      <> <Header />
     
     <div id="home">
    
      <section id="hero">
     
    <div class="hero-container">
    
      <ul id = "buttonUl">
        
    <Link to='/parking'>
          <Button variant="primary" size="lg" id="parkingbutton" block>
            Parking
              </Button>
        </Link>
        <Link to='/login'>
          <Button variant="primary" size="lg" id="parkingbutton" block>
            Admin Login
              </Button>
        </Link>
        </ul>
      
    </div>
  </section> 
        </div>
        <div className = "container" id = "homeContainer">
        <div className = "container">
        <div id="about">
        <br></br><br></br><br></br><br></br>
        <h2 id = "section-title">About</h2>
        <br></br>
          <h1>About Us</h1>
          <br></br><br></br>
          <p>ParkSmart is a proof of concept project directed towards benefitting the Faculty,
             and Student Body as well as the Lander University Police Department. Much like any other high traffic area,
              the parking at Lander is scarce, creating frustration among Students and Faculty when they own a pass 
              and drive all the way to the parking lot just to find out that there is no spot available. 
              ParkSmart will assist in making the pass owners experience better by informing them if 
              there are any parking spots available through the use of a web application. 
              On the other side, the use of license plate reading software which utilizes a 
              machine learning model will allow us to provide a added layer of security for LUPD. Our system
               will track all the traffic coming in and out of the parking lot using hardware components such 
               as microprocessing boards, cameras and sensors. The system will also compare the cars’ information 
               against the valid passes inside the Microsoft SQL server database to flag the unauthorized users 
               and display it to the LUPD portal.</p>
<p><br></br></p>
               <p>On another note, none of this would be possible without the help of a license plate reader API. Thanks to the generosity
                 of <a href = "https://platerecognizer.com/">PlateRecognizer.com</a>, we have successfully managed to scan and parse the data of a license
                 plate, send it to the database, and show this information on the frontend of our website.
               </p><br></br><br></br><br></br><br></br><br></br>
               <div class = "container" id = "carReader"><div class = "row"> 
               <div class="col-xs-3 col-md-6">
               <img src={Car} className="Joshua" class="img-fluid" alt="Joshua"/></div>
               <div class="col-xs-3 col-md-6"><img src={Blur} className="Joshua" class="img-fluid" alt="Joshua"/></div></div></div>
               
        </div>
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <div id="team">
        <br></br><br></br><br></br><br></br><br></br>
        <h2 id = "section-title">Team</h2>
          <h1>Meet our Team!</h1><br></br><br></br>
          <div class = "container">
          <div class="row">
          <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div class="member">
              <div class="member-img">
              <img src={Darian} className="Darian" class="img-fluid" alt="Darian"/>
              </div>
              <div class="member-info">
                <h4>Darian Ray</h4>
                <span>Darian Ray graduated from Liberty High School in Liberty,  South Carolina. 
                   She is currently attending Lander University as a Software Development major 
                   with a minor in Graphic Design.  In the past,  she has been involved with many
                    different multi media projects, such as website design and digital marketing. 
                    She is passionate about learning new skills and has talent in fine art.  
                    Currently,  she is employed in the TRACS department of Lander University.</span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div class="member">
              <div class="member-img">
              <img src={Joshua} className="Joshua" class="img-fluid" alt="Joshua"/>
              </div>
              <div class="member-info">
                <h4>Joshua John</h4>
                <span>Joshua John is a senior Computer Information Systems major at Lander with an 
                  emphasis in Networking and software development. He is minoring in Cybersecurity 
                  and is currently the co-captain of the Cyber Defense Team and has competed in multiple
                   collegiate level cybersecurity competitions.After graduation he plans to attend grad-school
                    in cyber security and machine learning.</span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div class="member">
              <div class="member-img">
              <img src={Codrin} className="Codrin" class="img-fluid" alt="Codrin"/>
              </div>
              <div class="member-info">
                <h4>Codrin Cobzaru</h4>
                <span>Codrin Cobzaru graduated from St. Johnsbury Academy in Vermont. 
                  He is currently a senior at Lander University studying Computer Information Systems
                   with emphasis in Software Development and minoring in Cybersecurity and Business Management. 
                   Codrin is technically skilled in hardware components and software applications,
                    and is passionate about business ventures. He is currently working for Truss Technologies,
                     a security technology development company up in Boston, Massachusetts.</span>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
            <div class="member">
              <div class="member-img">
              <img src={Jordan} className="Jordan" class="img-fluid" alt="Jordan"/>
              </div>
              <div class="member-info">
                <h4>Jordan Kothe</h4>
                <span>Jordan Kothe is attending Lander University Studying Computer Information Systems (network emphasis) 
                  with a minor in Cyber Security. Currently Jordan is Employed with a small Multiple Service Provider in Greenville 
                  called Medical Data Systems. After graduation Jordan plans to continue in the field of MSPs and potentially transition into
                   datacenter maintenance.</span>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        <div className = "container" id = "faqContainer">
        <div id="faq">
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <h2 id = "section-title">F.A.Q.</h2>
          <h1>Frequently Asked Questions</h1>
          <Accordion>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
      What is the purpose of your project?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
      <Card.Body>Through this project, we aim to create a Fully Functional Reactive Web Application with Student, Faculty and Staff support. 
       We intend to make the process of finding parking spaces and keeping track of parked vehicles easier.
</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
      What types of actions do you want your visitors to take on your website?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>We intend for visitors to use this website in two different ways. 
        1) To find parking spaces at the university.
        2) To help the LUPD keep track of the coming and going of vehicles. </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="2">
      How often does the website reload the available spots in the parking lot?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="2">
      <Card.Body>The website has a timer set to check the database for new information every five seconds.</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="3">
      In your opinion, how can this website impact the student body?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="3">
      <Card.Body> Due to the sudden influx of new students in the last few years, there has been a lack of student parking. We hope this website will 
        mae the process of finding parking spots easier. We also hope that this site can help the LUPD to keep track of the vehicles in Lander University's 
          parking lots. </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="4">
      How will you define success for your website?
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="4">
      <Card.Body>We will determine this project to be a success when we have a working proof of concpept.</Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
                 
        </div>
        </div>
        <div class = "container">
        <div id="contact">
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <h2 id = "section-title"> Contact Us</h2>
          <h1>Contact us for help</h1>
          <form>
          <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4" id = "formId">Email</label>
      <input type="email" class="form-control" id="inputEmail4" placeholder="Your Email"/>
    </div>
    <div class="form-group col-md-6">
      <label for="inputName" id = "formId">Name</label>
      <input type="name" class="form-control" id="inputName4" placeholder="Your Name"/>
    </div>
  </div>
  <div class="form-group">
    <label for="inputSubject" id = "formId">Subject</label>
    <input type="text" class="form-control" id="inputSubject" placeholder="Subject"/>
  </div>
  <div class="form-group">
    <label for="inputMessage" id = "messageId">Message</label>
    <input type="text" class="form-control" id="inputMessage" placeholder="Message"/>
  </div>
  <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </div>
        </div>
        </div>
        
      </>
      
    )
  }
}
