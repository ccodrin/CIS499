#!/usr/bin/python3
from picamera import PiCamera
import time
import serial
import os

val=""

camera = PiCamera()
camera.rotation = 180 #My camera is flipped around so I need to rotate it 180 degrees to take pictures properly. Takr out if not needed.
camera.resolution=(1920,1080)

      
if os.path.exists('/dev/rfcomm0') == False: #checks if the path exists (if you connected multiple times the path might be different rfcomm1, rfcomm2 etc.
    path = 'sudo rfcomm bind YOUR OWN BLUETOOTH ADDRESS GOES HERE' # Mine is 00:14:03:06:2B:9C (so it would be 'sudo rfcomm bind 00:14:03:06:2B:9C'). You can find your address in the Bluetooth Devices (menu>preferences>bluetooth manager) under the device name (HC-05).
    os.system (path)
    time.sleep(1)

bluetoothSerial = serial.Serial( "/dev/rfcomm0", baudrate=9600 ) #make sure is the same path as line 14. 

n=True
print("Waiting on data from Pi: ")
try:
      while n:


          RXData = (bluetoothSerial.readline()).strip().decode("utf-8") #This is the message received from the Arduino 
          val= RXData
          if val=="1": #if the value gotten from the Arduino is 1
              camera.start_preview()
              time.sleep(2)
              camera.capture("test.jpg") #take a picture, title it test.jpg and save it in the same directory as this program.
              camera.stop_preview() 
            #the lines below help us know when a picture was taken (we will check through a shell script if the "state.txt" file has changed)
            #checking the test.jpg directly proved to be problematic
              f = open("state.txt","w+") #open the file called state.txt and set it to length 0 if it exists or create it if it does not
              f.write("1") #write a 1 in it
              f.close()

          if RXData=="quit": #If the Arduino sends "quit" the program will close. This was used for testing only.
              n=False;

          else:{
              print (RXData) #Just in case the Arduino is sending a weird string. This was used for troubleshooting mainly.
              }
except:
      print("Bluetooth Device Disconnected") #if the connection is lost, notify us.
