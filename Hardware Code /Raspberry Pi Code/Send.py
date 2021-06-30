import socket

myfile = open("/home/pi/Desktop/SendData.json", "rt") # open SendData.json 
contents = myfile.read()     # read the entire file to string
myfile.close()

# Create a socket object 
s = socket.socket()

# Define the port on which you want to connect 
port = 1619

try:
    # connect to the server 
    s.connect(('sql.YOUR PERSONAL SERVER.com', port))  #Change to your own server

    # receive data from the server 
    print (s.recv(4069).decode()) 
    #send our Info to the Database
    s.send(contents.encode() )
    # close the connection 
    s.close()
except:
    # If the communication to and from Database has failed, let us know
    print("The data failed to be sent.") 
