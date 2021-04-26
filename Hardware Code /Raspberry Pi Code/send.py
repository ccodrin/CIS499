import socket

myfile = open("/home/pi/Desktop/SendData.json", "rt") # open test.txt for reading text this file is located where the py program is located
contents = myfile.read()         # read the entire file to string
myfile.close()

# Create a socket object 
s = socket.socket()

# Define the port on which you want to connect 
port = 1619

# connect to the server on local computer 
s.connect(('sql.SECRETPORT.com', port)) 

# receive data from the server 
print (s.recv(4069).decode())
s.send(contents.encode() )
# close the connection 
s.close()