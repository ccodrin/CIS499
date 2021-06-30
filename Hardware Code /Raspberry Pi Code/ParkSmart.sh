#!/bin/sh
#Don't forget to:

#Start License Plate Reader Server 
#/home/pi/Desktop/StartAlprServer.py

#Start Button.py on its own terminal
#python3 /home/pi/Desktop/Button.py

#Start the bluetooth connection with the Pi camera on its own terminal 
#python3 /home/pi/Desktop/BluetoothPiCamera.py

while inotifywait -e modify /home/pi/Desktop/state.txt; do # when state.txt has been modified
cp /home/pi/Desktop/CarPicture.jpg /home/pi/Desktop/CarPictureCopy.jpg #Make a copy of the picture it just took and name it CarPictureCopy.jpg
#wtest.jpg is just a file with a 0 in it
if   diff "/home/pi/Desktop/wtest.txt" "/home/pi/Desktop/but.txt" >/dev/null 2>&1; #if wtest.txt is the same as but.txt
then
	curl -F 'upload=@/home/pi/Desktop/CarPictureCopy.jpg' \ #send the picture copy to the SDK with a status of in
	 -F regions=us \
	 -F mmc=true \
	 -F config='{"mode":"fast"}' \
	 -F camera_id="in" \ #as seen here
 	 http://localhost:8080/v1/plate-reader/ > /home/pi/Desktop/LPdata.json #save the response from the SDK in LPdata.json 
else
	curl -F 'upload=@/home/pi/Desktop/CarPictureCopy.jpg' \ #send the picture copy to the SDK with a status of out
	 -F regions=us \
	 -F mmc=true \
	 -F config='{"mode":"fast"}' \
	 -F camera_id="out" \ #as seen here
 	 http://localhost:8080/v1/plate-reader/ > /home/pi/Desktop/LPdata.json #save the response from the SDK in LPdata.json 
	
fi

python3 /home/pi/Desktop/Parse.py #Run Parse.py to get only the data you need
python3 /home/pi/Desktop/Send.py # Run Send.Py to send the data you need to the database

done
