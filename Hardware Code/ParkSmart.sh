#!/bin/sh

#Starting License Plate Reader Server
#sudo docker run --rm -t -p 8080:8080 -v license:/license -e TOKEN=adb6350cf7d5694e45877717016d36bdbe4e0b64 -e LICENSE_KEY=eATyXGRpTa platerecognizer/alpr-raspberry-pi

#Starting button.py
#python3 /home/pi/Desktop/codrin_button.py

#Running the bluetooth connection with the Pi camera
#python3 /home/pi/Desktop/BluetoothPiCamera.py

while inotifywait -e modify /home/pi/Desktop/state.txt; do

cp /home/pi/Desktop/test.jpg /home/pi/Desktop/test3.jpg
if   diff "/home/pi/Desktop/wtest.txt" "/home/pi/Desktop/but.txt" >/dev/null 2>&1; 
then
	curl -F 'upload=@/home/pi/Desktop/test3.jpg' \
	 -F regions=us \
	 -F mmc=true \
	 -F config='{"mode":"fast"}' \
	 -F camera_id="in" \
 	 http://localhost:8080/v1/plate-reader/ > /home/pi/Desktop/LPdata.json
else
	curl -F 'upload=@/home/pi/Desktop/test3.jpg' \
	 -F regions=us \
	 -F mmc=true \
	 -F config='{"mode":"fast"}' \
	 -F camera_id="out" \
 	 http://localhost:8080/v1/plate-reader/ > /home/pi/Desktop/LPdata.json
	
fi


python3 /home/pi/Desktop/Parse.py
python3 /home/pi/Desktop/send.py

done