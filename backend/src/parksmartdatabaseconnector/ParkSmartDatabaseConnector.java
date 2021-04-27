/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package parksmartdatabaseconnector;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import static java.lang.System.exit;
import java.net.ServerSocket;
import java.sql.Date;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Properties;
import java.util.StringTokenizer;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author jorda
 */
public class ParkSmartDatabaseConnector {

    Statement globalStatement;

    /**
     * @param args the command line arguments
     * @throws java.lang.ClassNotFoundException
     */
    public static void main(String[] args) {
        SQLconnection sql;
        ServerSocket ss;
        String Address;
        int sqlport;
        String user;
        String password;
        boolean ModePlate; //true = process plate data
        boolean ModePass; //true = process pass data
        int ssport;

        try {

            //load the properties file
            InputStream isprop = new FileInputStream("config.properties");
            Properties prop = new Properties();
            prop.load(isprop);
            Address = prop.getProperty("address");            
            sqlport = Integer.valueOf(prop.getProperty("sqlport"));
            user = prop.getProperty("user");
            password = prop.getProperty("pass");
            ssport = Integer.valueOf(prop.getProperty("port"));
            ModePlate = prop.getProperty("Mode","Plate").equals("Plate");
            ModePass = prop.getProperty("Mode","Plate").equals("Pass");
            //check the properties file
            if (Address.equals("sql.domain.com")) {
                System.out.println("Config file not setup!");
                exit(1);
            }
            if(ModePlate)
                System.out.println("Using Plate Mode");
            if(ModePass)
                System.out.println("Using Pass Mode, you can change this in the config.properties");
        

            //sql instance creation
            sql = new SQLconnection(Address, sqlport, user, password);

            //open the port 1619
            ss = new ServerSocket(ssport);

            while (ModePlate) {
                checkForPlate(ss, sql);
                DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
                LocalDateTime now = LocalDateTime.now();
                System.out.println(dtf.format(now));
            }
            while(ModePass) {
                checkForPass(ss, sql);
            }

        } catch (SQLException ex) {
            Logger.getLogger(ParkSmartDatabaseConnector.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("The SQL connection failed or there was a schema violation");

        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ParkSmartDatabaseConnector.class.getName()).log(Level.SEVERE, null, ex);

            System.out.println("SQL driver not found, make sure sqlijdbc4.jar is in the lib folder");
        } catch (IOException ex) {
            Logger.getLogger(ParkSmartDatabaseConnector.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    public static void checkForPlate(ServerSocket ss, SQLconnection sql) throws IOException, SQLException, ClassNotFoundException {
        //create a socket for the clients to connect too
        PiScanner Pi = new PiScanner(ss);

        //get the string from the connected client. The client is disconnected each time it's done sending a string
        String message = Pi.getString();

        //output the message from the plate scanner to the console
        System.out.println("Message recived from " + Pi.getClientIP() + ": \n" + message);

        //send the string to the database
        
        if(sql.age() > 300000 | !sql.isValid()){
            System.out.println("SQL connection is more than 5 minutes old. Reconnecting");
            
            InputStream isprop = new FileInputStream("config.properties");
            Properties prop = new Properties();
            prop.load(isprop);
            String Address = prop.getProperty("address");            
            int sqlport = Integer.valueOf(prop.getProperty("sqlport"));
            String user = prop.getProperty("user");
            String password = prop.getProperty("pass");
            sql = new SQLconnection(Address, sqlport, user, password);
        }
        proccessVehicleSTR(sql, message);
    }
    
    public static void checkForPass(ServerSocket ss, SQLconnection sql) throws IOException, ClassNotFoundException, SQLException{
        //create a socket for the clients to connect too
        PiScanner Pi = new PiScanner(ss);

        //get the string from the connected client. The client is disconnected each time it's done sending a string
        String message = Pi.getString();

        //output the message from the plate scanner to the console
        System.out.println("Message recived from " + Pi.getClientIP() + ": \n" + message);

        //send the string to the database
        if(sql.age() > 300000){
            System.out.println("SQL connection is more than 5 minutes old. Reconnecting");
            sql.close();
            InputStream isprop = new FileInputStream("config.properties");
            Properties prop = new Properties();
            prop.load(isprop);
            String Address = prop.getProperty("address");            
            int sqlport = Integer.valueOf(prop.getProperty("sqlport"));
            String user = prop.getProperty("user");
            String password = prop.getProperty("pass");
            sql = new SQLconnection(Address, sqlport, user, password);
        }
        proccessPassSTR(sql, message);
    }
    
    public static void proccessPassSTR(SQLconnection sql, String message){
        try {
            BufferedReader reader = new BufferedReader(new StringReader(message));
            reader.readLine(); //throw away opening {
            String pass = getString(reader.readLine());
            String plate = getString(reader.readLine());
            int expyear = Integer.parseInt(getString(reader.readLine()));
            int type = Integer.parseInt(getString(reader.readLine()));
            
            Date date = new Date(01, 01, expyear);
            sql.addPass(pass, date, type);
            sql.addPassToVehicle(plate, pass);
        } catch (IOException | SQLException ex) {
            Logger.getLogger(ParkSmartDatabaseConnector.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void proccessVehicleSTR(SQLconnection sql, String message) {
        try {
            BufferedReader reader = new BufferedReader(new StringReader(message));
            reader.readLine(); // throw away opening bracket
            reader.readLine(); // throw away VehicleType

            String Plate = getString(reader.readLine()); //LicensePlate

            float confidence = Float.parseFloat(getdata(reader.readLine()));

            String Make = getString(reader.readLine()); //Make            

            String Model = getString(reader.readLine()); //model            

            String Color = getString(reader.readLine()); //Color

            String Region = getString(reader.readLine()); //get the state

            //is the car going in or out?, Then convert status to boolean         
            boolean entry = getString(reader.readLine()).equals("in");

            String TimeStampSTR = getString(reader.readLine()); //time stamp in ms since 1970 or "now"
            Timestamp stamp;
            if (TimeStampSTR.contains("now")) {
                stamp = new Timestamp(System.currentTimeMillis()); //Set the timestamp to the current time
            } else {
                stamp = new Timestamp((long) Double.parseDouble(TimeStampSTR)); //convert timestamp to an int and then an actual time stamp
            }

            sql.scannedVehicle(Plate, Color, Make, Region, Model, confidence, entry, stamp);
            //sql.addHistory(Plate, entry, 1, stamp);

        } catch (SQLException ex) {
            Logger.getLogger(ParkSmartDatabaseConnector.class.getName()).log(Level.SEVERE, null, ex);
            ex.printStackTrace();
        } catch (IOException ex) {
            Logger.getLogger(ParkSmartDatabaseConnector.class.getName()).log(Level.SEVERE, null, ex);
            ex.printStackTrace();
        }
    }

    //This method extracts String information from the "JSON" data being sent from the scanner
    public static String getString(String line) {
        StringTokenizer stk = new StringTokenizer(line, "\"");
        stk.nextToken(); //throw away emtpy space
        stk.nextToken(); //throw away title of the data
        stk.nextToken(); //throw away the ':'
        String data = stk.nextToken();
        return data;
    }

    //This method extracts the number values from the "JSON" data being sent from the scanner
    public static String getdata(String line) {
        //get the String after the ':'
        StringTokenizer stk = new StringTokenizer(line, ":");
        stk.nextToken();
        String data = stk.nextToken();

        //Get the String within the double quotes
        stk = new StringTokenizer(data, ",");
        data = stk.nextToken();
        return data;
    }

}
