/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package parksmartdatabaseconnector;

import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

/**
 *
 * @author jorda
 */
public class PiScanner {
    ServerSocket ss;
    Socket socket;
    InputStream inputStream;
    DataInputStream in;
    String message = "";
    String input ="";
    OutputStream outBS;
    BufferedOutputStream outputS;
    byte[] messageByte = new byte[1000];
    boolean end = false;
    
    
    
    public PiScanner(ServerSocket ss) throws IOException{
        //ss = new ServerSocket(1619);
        System.out.println("Awaiting connection from Pi");
        socket = ss.accept();
        in = new DataInputStream(socket.getInputStream());
        OutputStream outputStream = socket.getOutputStream();
        DataOutputStream dataOutputStream = new DataOutputStream(outputStream);
        message = "this is jordan";
        dataOutputStream.writeBytes(message);
        dataOutputStream.flush();
        
    }
    
    public String getString() throws IOException{
        
        boolean end = false;
        while (!end){
            int bytesRead = in.read(messageByte);
            input += new String(messageByte, 0, bytesRead);
            end = input.contains("}");
            
        }
        this.close();
        return input;
    }
    
    public String getClientIP(){
        return socket.getInetAddress().toString();
    }
    
    public void close() throws IOException{
        //ss.close();
        socket.close();
    }
}
