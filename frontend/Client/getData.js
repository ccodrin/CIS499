


var Connection = require('tedious').Connection;
const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

var port = 3002;


const config = {
  server: 'sql.jordankothe.com',
  authentication: {
    type: 'default',
    options: {
      userName: "dev",
      password: "CIS499Lander",
    },
  },
  options: {
    database: "master",
    encrypt: false,
   rowCollectionOnRequestCompletion: true,
  },
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

  var connection = new Connection(config);

  // Setup event handler when the connection is established. 
  connection.on('connect', function(err) {
    if(err) {
      console.log('Error: ', err)
    }
    // If no error, then good to go...
    //executeStatement();
  });

  // Initialize the connection.
  connection.connect();

  var Request = require('tedious').Request;


  //get all currently parked vehicles
  app.get("/api/getcurrent", (req, res) => {
    var i = 0;
    const allRows = [];
    var row = [];
    const Currentvehicles = [];
    // eslint-disable-next-line no-undef
    request = new Request("SELECT [Valid_Pass], [License_Plate_Number],[License_Plate_State], [Color], [Make], [Model], [Confidence], [entry], [stamp]  FROM Vehicle FULL JOIN Vehicle_History ON Vehicle.License_Plate_Number = Vehicle_History.Plate_Number WHERE Vehicle_History.Stamp IN (SELECT MAX(Vehicle_History.Stamp) AS Stamp FROM Vehicle_History GROUP BY Vehicle_History.Plate_Number) AND Entry = '1'", function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
        
         for(let t = 0; t < allRows.length; t++){
          
        
          Currentvehicles.push({
            id: t,
            validPass: allRows[t].row[1].Value,
            licenseNumber: allRows[t].row[2].Value,
            licenseState: allRows[t].row[3].Value,
            color: allRows[t].row[4].Value,
            make: allRows[t].row[5].Value,
            model: allRows[t].row[6].Value,
            confidence: Math.round(allRows[t].row[7].Value * 100 ) + "%",
            entry: String(allRows[t].row[8]),
            stamp: allRows[t].row[9].Value
         })
          
        }
        res.json(Currentvehicles)
      }
    });
  
    // eslint-disable-next-line no-undef
    request.on('row', function(columns) {
      row.push({
        id: i++ 
      })
      columns.forEach(function(column) {
        row.push({
          Type: column.metadata.colName,
          Value: column.value,
          toString: () => column.value
      });
  
      });
     
      allRows.push({
        row
      })
      row = [];
    });
    console.log("connecting 1")
    
    // eslint-disable-next-line no-undef
    connection.execSql(request);
  });
  
  //get all vehicles and history
  app.get("/api/get", (req, res) => {
    var i = 0;
    const allRows = [];
    var row = [];
    const vehicles = [];
    // eslint-disable-next-line no-undef
    request = new Request("SELECT [Valid_Pass], [License_Plate_Number],[License_Plate_State], [Color], [Make], [Model], [Confidence], [entry], [stamp] FROM [dbo].[Vehicle] FULL JOIN dbo.Vehicle_History ON Vehicle.License_Plate_Number = Vehicle_History.Plate_Number ORDER BY [stamp] DESC", function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
        
         for(let t = 0; t < allRows.length; t++){
          
        
          vehicles.push({
            id: t,
            validPass: allRows[t].row[1].Value,
            licenseNumber: allRows[t].row[2].Value,
            licenseState: allRows[t].row[3].Value,
            color: allRows[t].row[4].Value,
            make: allRows[t].row[5].Value,
            model: allRows[t].row[6].Value,
            confidence: Math.round(allRows[t].row[7].Value * 100 ) + "%",
            entry: String(allRows[t].row[8]),
            stamp: allRows[t].row[9].Value
         })
          
        }
        res.json(vehicles)
      }
      });

      // eslint-disable-next-line no-undef
      request.on('row', function (columns) {
          row.push({
              id: i++
          })
          columns.forEach(function (column) {
              row.push({
                  Type: column.metadata.colName,
                  Value: column.value,
                  toString: () => column.value
              });

          });

          allRows.push({
              row
          })
          row = [];
      });
      console.log("connecting 2")

      // eslint-disable-next-line no-undef
      connection.execSql(request);
  });

  ///Get parking information

  app.get("/api/getparkingold", (req, res) => {
    var i = 0;
    const allRows = [];
    var row = [];
    const parking = [];
    // eslint-disable-next-line no-undef
    request = new Request("SELECT [Num_Spots], [Name], [Num_Used] FROM [master].[dbo].[Parking_lots]", function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
        
        for(let t = 0; t < allRows.length; t++){
          
        
          parking.push({
            parkingLotKey: t,
            numSpots: allRows[t].row[1].Value,
            name: allRows[t].row[2].Value,
            numUsed: allRows[t].row[3].Value,
         })
          
        }
        res.json(parking)
      }
    });
  
    // eslint-disable-next-line no-undef
    request.on('row', function(columns) {
      row.push({
        id: i++ 
      })
      columns.forEach(function(column) {
        row.push({
          Type: column.metadata.colName,
          Value: column.value,
          toString: () => column.value
      });
  
      });
     
      allRows.push({
        row
      })
      row = [];
    });
    console.log("connecting 3")
    
    // eslint-disable-next-line no-undef
    connection.execSql(request);
  });
  
  app.get("/api/getparking", (req, res) => {
    var i = 0;
    const allRows = [];
    var row = [];
    const parking = [];
    // eslint-disable-next-line no-undef
    request = new Request("SELECT COUNT(*) FROM Vehicle FULL JOIN Vehicle_History ON Vehicle.License_Plate_Number = Vehicle_History.Plate_Number WHERE Vehicle_History.Stamp IN (SELECT MAX(Vehicle_History.Stamp) AS Stamp FROM Vehicle_History GROUP BY Vehicle_History.Plate_Number) AND Entry = '1'", function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
        
        for(let t = 0; t < allRows.length; t++){
          
        
          parking.push({
            parkingLotKey: 0,
            numSpots: 95,
            name: "Laura Lander",
            numUsed: allRows[t].row[1].Value,
         })
          
        }
        res.json(parking)
      }
    });
  
    // eslint-disable-next-line no-undef
    request.on('row', function(columns) {
      row.push({
        id: i++ 
      })
      columns.forEach(function(column) {
        row.push({
          Type: column.metadata.colName,
          Value: column.value,
          toString: () => column.value
      });
  
      });
     
      allRows.push({
        row
      })
      row = [];
    });
    console.log("connecting")
    
    // eslint-disable-next-line no-undef
    connection.execSql(request);
  });

 
 


  app.listen(port, () => {
    console.log("RUNNING");
  });


