import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_UP)#Button to GPIO23
GPIO.setup(17, GPIO.OUT)  #LED Green to GPIO17
GPIO.setup(27, GPIO.OUT)#LED Red to GPIO27
GPIO.output(27, False)
GPIO.output(17, False)
#num is a counter
num=0 


try:
    while True:
         button_state = GPIO.input(22) #Check if the button is pressed
         if button_state == True: 
             if num%2==0: #check if it is even number
                f = open("but.txt","w+") #open the text file called but.txt 
                f.write("0") # write a 0 in it for status in 
                f.close()
                GPIO.output(17, True) #turn on green light
                GPIO.output(27, False) #turn off red light
             else:
                f = open("but.txt","w+")#open the text file called but.txt 
                f.write("1") # write a 0 in it for status in 
                f.close()
                GPIO.output(27, True) #turn on red light
                GPIO.output(17, False) #turn off green light
                
             num+=1;   #increment counter
             print('Button Pressed...',num) #for troubleshooting | checking the counter
             time.sleep(0.3)
         
except:
    GPIO.cleanup()
