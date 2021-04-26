#!/usr/bin/python3
from picamera import PiCamera
import time
import serial
import os

val=""

camera = PiCamera()
camera.rotation = 180
camera.resolution=(1920,1080)

      
if os.path.exists('/dev/rfcomm2') == False:
    path = 'sudo rfcomm bind 00:14:03:06:2B:9C'
    os.system (path)
    time.sleep(1)

bluetoothSerial = serial.Serial( "/dev/rfcomm2", baudrate=9600 )

n=True
print("Waiting on data from Pi: ")
while n:
    
    
    RXData = (bluetoothSerial.readline()).strip().decode("utf-8")
    val= RXData
    if val=="1": 
        camera.start_preview()
        time.sleep(2)
        camera.capture("test.jpg")
        camera.stop_preview()
        f = open("state.txt","w+")
        f.write("1")
        f.close()
    
       
        
    if RXData=="quit":
        n=False;
        
    else:{
        print (RXData)
        }
    

