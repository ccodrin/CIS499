The code above was ran on a Raspberry Nano.

It does the following:
-detects a difference in distance lower than 10mm(measured by the Sonar Sensor HC-SR04)
-sends a 1 (when triggered) through the bluetooth module (HC-05) to the device that is connected to (in our case Raspberry Pi)

In order for this flow to work, the Raspberry PI must be connected to the Arduino and the the code BluetoothPiCamera.py found in the Raspberry Pi folder needs to be ran. 

