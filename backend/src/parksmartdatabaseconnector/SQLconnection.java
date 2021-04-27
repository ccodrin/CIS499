/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package parksmartdatabaseconnector;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;


/**
 *
 * @author jorda
 */
public class SQLconnection {

    Connection connection;
    PreparedStatement statement;
    Timestamp created;

    public SQLconnection(String address, int port, String user, String password) throws ClassNotFoundException, SQLException {
        Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

        String connectionUrl
                = "jdbc:sqlserver://" + address + ";"
                + "database=master;"
                + "user=" + user + ";"
                + "password=" + password + ";"
                + "encrypt=true;"
                + "trustServerCertificate=true;"
                + "loginTimeout=30;";
        //ResultSet resultSet = null;

        connection = DriverManager.getConnection(connectionUrl);
        if(connection.isValid(30)){
            System.out.println("SQL Connection has been made");
            created = new Timestamp(System.currentTimeMillis());
        }
            
        

        //resultSet = statement.executeQuery(selectSql);
    }

    //all cars will be sent to this to be proceesed
    //1 check if the plate exists. If it does, update history and lot usage
    //2 if the plate doesn't exists add the plate, update history and lot usage
    //3 make an overloaded method if the plate number wasn't caught, only updatelot usage
    public void scannedVehicle(String Plate, String color, String Make, String Region, String Model, float confidence, boolean entry, Timestamp stamp) throws SQLException {
        if(this.plateexists(Plate)){
            //update confidence
            if(this.getConfidence(Plate) < confidence){
                this.updateConfidence(Plate, confidence);
            }
        }else{
            //add plate
            this.addVehicle(Plate, color, Make, Region, Model, confidence);
            //add history
        }
        
        this.addHistory(Plate, entry, 1, stamp);
    }
    
    public void updateConfidence(String Plate, float confidence) throws SQLException{
        statement = connection.prepareStatement("UPDATE dbo.Vehicle SET Confidence = ? WHERE License_Plate_Number = ?");
        statement.setFloat(1, confidence);
        statement.setString(2, Plate);
        statement.execute();
    }
    
    //get the confidence of the specificed plate
    public float getConfidence(String Plate) throws SQLException{
        float conf = (float)0.9999;
        statement = connection.prepareStatement("SELECT Confidence FROM dbo.Vehicle WHERE License_Plate_Number = ?");
        statement.setString(1, Plate);
        
        statement.execute();
        ResultSet rs = statement.getResultSet();
        
        rs.next();
        return rs.getFloat(1);
       
    }

    //with pass
    public void addVehicle(String Pass, String PlateNumber, String color, String Make, String Region, String Model) throws SQLException {

        //if the pass is present in the addVechicle, check if it exists, 
        //check if the pass exists
        if (!passexists(Pass) & Pass != null) {
            //add the pass to the database here
            this.addPass(Pass);
            //type and year will be null
        }

        //the pass exists        
        //if the plate doesn't exist, add it
        if (!this.plateexists(PlateNumber)) {
            statement = connection.prepareStatement("INSERT INTO dbo.Vehicle VALUES (?,?,?,?,?,?,?)");
            statement.setString(1, Pass);
            statement.setString(2, PlateNumber);
            statement.setString(3, Region);
            statement.setString(4, color);
            statement.setString(5, Make);
            statement.setString(6, Model);
            statement.setNull(7, Types.NULL);

            statement.executeUpdate();
        }

        //if doesn't exist add time stamp for in (maybe this shouldn't be done in this method
    }

    public void addVehicle(String PlateNumber, String color, String Make, String Region, String Model, float confidence) throws SQLException {

        //if the plate doesn't exist, add it
        if (!this.plateexists(PlateNumber, Region)) {
            statement = connection.prepareStatement("INSERT INTO dbo.Vehicle VALUES (?,?,?,?,?,?,?)");
            statement.setNull(1, Types.NULL);
            statement.setString(2, PlateNumber);
            statement.setString(3, Region);
            statement.setString(4, color);
            statement.setString(5, Make);
            statement.setString(6, Model);
            statement.setFloat(7, confidence);

            statement.execute();
        }else{
            System.out.println("Plate not added, likley already exists: " + PlateNumber);
        }
        

        //if doesn't exist add time stamp for in (maybe this shouldn't be done in this method
    }

    public boolean plateexists(String PlateNumber, String Region) throws SQLException {
        //return weather or not a plate is in the DB
        //true = plate in database
        statement = connection.prepareStatement("SELECT License_Plate_Number FROM dbo.Vehicle WHERE License_Plate_Number = ?");
        statement.setString(1, PlateNumber);
        //statement.setString(2, Region);
        statement.execute();
        ResultSet rs = statement.getResultSet();
        return (rs.next());        
    }
    
    public boolean plateexists(String PlateNumber) throws SQLException {
        //return weather or not a plate is in the DB
        //true = plate in database
        statement = connection.prepareStatement("SELECT License_Plate_Number FROM dbo.Vehicle WHERE License_Plate_Number = ?");
        statement.setString(1, PlateNumber);
        statement.execute();
        ResultSet rs = statement.getResultSet();
        return (rs.next());        
    }

    public boolean passexists(String Pass) throws SQLException {
        //return weather or not a pass exists
        statement = connection.prepareStatement("SELECT Pass_Number FROM dbo.Valid_Passes WHERE Pass_Number = ?");
        statement.setString(1, Pass);
        ResultSet PassNumberResults = statement.executeQuery();
        
        return PassNumberResults.next();

    }

    public void addPass(String Pass, Date date, int type) throws SQLException {
        //add the pass to the database here
        statement = connection.prepareStatement("INSERT INTO dbo.Valid_Passes VALUES (?,?,?)");
        statement.setString(1, Pass);
        statement.setInt(2, type);
        statement.setDate(3, date);
        statement.executeUpdate();
        //type and year will be null
    }

    //add the pass if it doesn't exist
    //update the Vechicle (by plate number) to include the pass
    public void addPassToVehicle(String Plate, String Pass) throws SQLException {
        if (!this.passexists(Pass)) {
            this.addPass(Pass);
        }
        statement = connection.prepareStatement("UPDATE dbo.Vehicle SET Valid_Pass = ?, WHERE License_Plate_Number = ?");
        statement.setString(1, Pass);
        statement.setString(2, Plate);
    }

    public void addPass(String Pass) throws SQLException {
        //add the pass to the database here
        statement = connection.prepareStatement("INSERT INTO dbo.Valid_Passes VALUES (?, ?, ?)");
        statement.setString(1, Pass);
        statement.setNull(2, Types.NULL);
        statement.setNull(3, Types.NULL);
        statement.executeUpdate();
        //type and year will be null
    }

    public void addHistory(String PlateNumber, boolean in, int lotkey, Timestamp stamp) throws SQLException {
        //update the dbo.Parking_lots first
        this.updateLotUsed(lotkey, in);

        //add entry to the plate's history with the included timestamp. need to finalized the time formate
        if (plateexists(PlateNumber)) {
            statement = connection.prepareStatement("INSERT INTO dbo.Vehicle_History VALUES (?,?,?,?)");
            statement.setString(1, PlateNumber);
            statement.setInt(2, lotkey);
            statement.setBoolean(3, in);
            statement.setTimestamp(4, stamp);
            statement.executeUpdate();
        } else {
            System.out.println("Warning: Tried to update plate history for a plate that doesn't exisit in database: " + PlateNumber);
        }
    }

    //add history with date "now" or the time of execution
    //Lot key 1 is Luara Lander with 95 total spots
    //when "in" is true is means the car was going into the parking lot. If it's false the car was leaving
    public void addHistory(String PlateNumber, boolean in, int lotkey) throws SQLException {
        //add entry to the plate's history with the current time.
        Timestamp stamp = new Timestamp(System.currentTimeMillis());

        this.updateLotUsed(lotkey, in);

        if (plateexists(PlateNumber)) {
            statement = connection.prepareStatement("INSERT INTO dbo.Vehicle_History VALUES (?,?,?,?)");
            statement.setString(1, PlateNumber);
            statement.setInt(2, lotkey);
            statement.setBoolean(3, in);
            statement.setTimestamp(lotkey, stamp);
            statement.executeUpdate();
        } else {
            System.out.println("Warning: Tried to update plate history for a plate that doesn't exisit in database: " + PlateNumber);
        }
    }

    //Lot key 1 is Luara Lander with 95 total spots
    public void updateLotUsed(int lotkey, boolean in) throws SQLException {
        //increae or decrease the number in each parking lot
        int Num_Used;
        String num;
        ResultSet set;
        //get the number of spots used before
        statement = connection.prepareStatement("SELECT COUNT(*) FROM Vehicle FULL JOIN Vehicle_History ON Vehicle.License_Plate_Number = Vehicle_History.Plate_Number WHERE Vehicle_History.Stamp IN (SELECT MAX(Vehicle_History.Stamp) AS Stamp FROM Vehicle_History GROUP BY Vehicle_History.Plate_Number) AND Entry = '1'");
        statement.execute();
        ResultSet UsedSet = statement.getResultSet();
        UsedSet.next();
        Num_Used = UsedSet.getInt(1);
        

        //after getting the current number of spots, add to it and update it
        statement = connection.prepareStatement("UPDATE dbo.Parking_lots SET Num_Used = ? WHERE Parking_Lot_Key = ?");
        statement.setInt(2, lotkey);
        statement.setInt(1, Num_Used);
        statement.execute();

        //verify the update
        statement = connection.prepareStatement("SELECT Num_Used FROM dbo.Parking_lots WHERE Parking_Lot_Key = ?");
        statement.setInt(1, lotkey);
        statement.execute();
        set = statement.getResultSet();
        set.next();
        int new_Num_Used = set.getInt(1);
        if (new_Num_Used != Num_Used) {
            System.out.println("Warning: Spots used in lot " + lotkey + " could not be updated correctly");
        }
        
        
    }
    
    public long age(){
        Timestamp now = new Timestamp(System.currentTimeMillis());
        
        return now.getTime() - created.getTime();
    }
    
    public void close() throws SQLException{
        connection.close();
    }
    
    public boolean isValid() throws SQLException{
        return connection.isValid(30);
    }
}
