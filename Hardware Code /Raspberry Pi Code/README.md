The code above has been executed on the linux environment of a Raspberry Pi Model 3B 

The flow is as follows:

1. Run **StartAlprServer.sh** - turns on the https://platerecognizer.com/ sdk on our local environment. 

2. Connect Arduino Nano's Bluetooth to the PI using the GUI.

3. Run **BluetoothPiCamera.py** in order to receive the signal sent from the Arduino to take a picture.

3. Run **ParkSmart.sh** - contains all the logic behind how our system is able to get the data, process it and send it to the database:

- When the signal is received by **BluetoothPiCamera.py** and it takes a picture(**test.jpg**),  a copy of it will be made (**test3.jpg**) and a 1 will be written in the file **state.txt**

- When **state.txt** is detected to be changed (new picture was taken), the picture is sent to the https://platerecognizer.com/ sdk

- The sdk output is saved in **LPdata.json**

- The output is automatically processed by **Parse.py**, and saves the data of interest in **SendData.json**

- **SendData.json** is then sent to the database through the use of **send.py**



Another functionality added is the ability to change the state of the car (in/out) and that is done as follows:

- Stop running the **BluetoothPiCamera.py** code

- Run **codrin_button.py**, physically click on the button to change the color of the led on the Pi's shield to the desired state (green - in, red - out)

- If the state is "in", a 1 is stored in **but.txt**, if the state is "out", a 0 will be stored in **but.txt**.

- Stop running **codrin_button.py**, and start **BluetoothPiCamera.py** again, to keep listening for the signal from the Arduino.  

- **ParkSmart.sh** will know to check the value in **but.txt**, and update the state accordingly. 
