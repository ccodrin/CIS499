import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_UP)#Button to GPIO23
GPIO.setup(17, GPIO.OUT)  #LED Green to GPIO17
GPIO.setup(27, GPIO.OUT)#LED Red to GPIO27
GPIO.output(27, False)
GPIO.output(17, False)

num=0


try:
    while True:
         button_state = GPIO.input(22)
         if button_state == True:
             if num%2==0:
                f = open("but.txt","w+")
                f.write("0")
                f.close()
                GPIO.output(17, True)
                GPIO.output(27, False)
             else:
                f = open("but.txt","w+")
                f.write("1")
                f.close()
                GPIO.output(27, True)
                GPIO.output(17, False)
                
             num+=1;   
             print('Button Pressed...',num)
             time.sleep(0.3)
         
except:
    GPIO.cleanup()
