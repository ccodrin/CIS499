import app from "../base";
import React, {Component} from "react";
import { Link } from "react-router-dom";
import CurrentVehicleList from "./CurrentVehiclesList"
import VehicleHistory from "./vehicleHistoryList"
import Navigation from "./Navigation"
import ParkingLot from "../images/parkingLot.jpeg"
import { Button, ButtonGroup } from 'react-bootstrap';
import ParkSmartBanner from "./ParkSmartBanner2.png"



class Violations extends Component {

  constructor() {
    super();
    this.state = {
      name: "React",
      showVehicleList: true,
      showVehicleHistory: false,
    };
    this.hideComponent = this.hideComponent.bind(this);
  }
  hideComponent(name) {
    switch (name) {
      case "showVehicleList":
        this.setState({ showVehicleList: !this.state.showVehicleList });
        break;
      case "showVehicleHistory":
        this.setState({ showVehicleHistory: !this.state.showVehicleHistory });
        break;
      default:
        // eslint-disable-next-line no-unused-expressions
        null;
    }
  }
 
  render(){
    const { showVehicleList, showVehicleHistory } = this.state;
  return (
    
    <div>
      <div class = "container" id = "parkingHeader">
        
        <Button disabled={true} id = "logoContainer">
      <img src={ParkSmartBanner} className="ParkSmartBanner" alt="ParkSmartBanner" />
      </Button>
      </div>
      <Navigation />
      <div class = "container" id = "showVehicles">
      <div class = "row" id = "vehicleRow">
        <ButtonGroup vertical>
      <div class="row">
      <div class="col-sm">
          <button onClick={() => this.hideComponent("showVehicleList")} id = "currentVehicles">
            Click to show current vehicles
          </button>
          </div>
          </div>
          <div class="row">
          <div class="col-sm">
          <button onClick={() => this.hideComponent("showVehicleHistory")} id = "vehicleHistory">
            Click to show vehicle history
          </button>
          </div>
          </div>
          </ButtonGroup>
          </div>
      <div>
      </div>
      </div>
        
      <div class="col-sm">
        
        {showVehicleList && <CurrentVehicleList />}
        
        {showVehicleHistory && <VehicleHistory />}
        </div>
       
       
      
   
      </div> 
  );
};
}


export default Violations;