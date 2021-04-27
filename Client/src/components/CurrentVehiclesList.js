import React, {useEffect, useState } from "react";
import axios from "axios"
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Checkmark from "../images/checkmark.png"
import Xsymbol from "../images/xsymbol.png"

export default function VehicleList(){
    const [vehicles, setVehicles] = useState([]);
    var symbol;
    var confidenceColor;
    

    const getCurrentVehicleData = async () => {
      try {
        const currentVehicleData = await axios.get("http://www.landerparking.com:3002/api/getcurrent")
          setVehicles(currentVehicleData.data)
        }catch (err) {
          console.error(err.message);
        }
        }
        useEffect(()=>{
    
          getCurrentVehicleData()
          const interval=setInterval(()=>{
            getCurrentVehicleData()
           },5000)     
             
           return()=>clearInterval(interval)
      },[])
	  
      
	  
      return(
	  //var statusVehicle
        <div className = "container-fluid" id = "currentVehiclesContainer">
        <div className="row">
          {vehicles.map((val) => {
            if(val.entry == "true"){
              if(typeof val.validPass === 'string'){
                symbol = <img src={Checkmark} className = "checksymbol" alt="ParkSmart Logo" />
               }else{
                symbol = <img src={Xsymbol} className = "xsymbol" alt="ParkSmart Logo" />
				//statusVehicle = "Out";
               }
               
              if(val.confidence < 30){
                confidenceColor = 'danger';
              }else if(val.confidence < 75 && val.confidence > 30){
                confidenceColor = 'warning';
              }else if(val.confidence > 75 && val.confidence <= 100){
                confidenceColor = 'success';
              }
			  
			  var formattedDate = "no date";
				if(val.stamp != null){
					formattedDate = val.stamp.replace(/T/, ' ').replace(/\..+/, '')
				}
              return <div key = {val.id}>
              {" "}
              <div id = "currentVehicles">
              <Card style={{ width: "18rem" }} id = {confidenceColor}>
                <Card.Body>
                    <Accordion>
                      <Card>
                        <Card.Header className = "cardConfidence">
                          <Accordion.Toggle as={Button} variant="link" eventKey="0">
                          {symbol} License Number: {val.licenseNumber} 
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            Confidence: {val.confidence} <br></br>
                            Time In: {formattedDate}
                            <br></br>
                            Make: {val.make} <br></br>
                            Model: {val.model} <br></br>
                            Color: {val.color} <br></br>
                            Region: {val.licenseState} <br></br>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                 
                </Card.Body>
              </Card>
            </div>
          
          </div>
          }
        }
        )}
          
        </div>
        </div>

      )
   
}
