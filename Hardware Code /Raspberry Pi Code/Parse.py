import json
import os
import datetime

def getJSON(filePathAndName):
    with open(filePathAndName, 'r') as fp:
        return json.load(fp)

Vtype="" # Vehicle Type  
myInfo="" # The JSON Object
lp="" # License Plate
lpC="" # License Plate Confidence 
state="" # ex. MA, SC, AZ
make="" # Car Make 
model="" # Car Model
color="" # Car Color
status="" # In or Out
time="" # Time Stamp

#If the JSON file is not empty nor saying error than it is good to be Parsed
try:
    empty=os.stat("/home/pi/Desktop/LPdata.json").st_size == 0

    if not (empty): 
        myInfo=getJSON("/home/pi/Desktop/LPdata.json")
        if 'error' not in myInfo:
            lp = myInfo['results'][0]['plate'].upper();
            state = myInfo['results'][0]['region']['code'].split('-')[1].upper();
            Vtype = myInfo['results'][0]['vehicle']['type'];
            lpC=myInfo['results'][0]['candidates'][0]['score'];

        # The presence related items below makes sure that the make, model, and the color 
        # were picked up from the right place.  
        presence = myInfo['results'][0]['model_make']
            if isinstance(presence, list):  
                make=presence[0]['make'];

            else:
                make=presence['make'];

            presence = myInfo['results'][0]['model_make']
            if isinstance(presence, list):  
                model=presence[0]['model'];

            else:
                model=presence['model'];

            presence = myInfo['results'][0]['color']
            if isinstance(presence, list):  
                color=presence[0]['color'];

            else:
                color=presence['color'];
                
            status=myInfo['camera_id'];
            time=myInfo['timestamp'];
            
         # You do not need the lines in the box if you like the format you get from the SDK
         # as a string. The lines below gives you the time in miliseconds to date.
            ################################################################
            time = datetime.datetime.strptime(time, '%Y-%m-%d %H:%M:%S.%f')#
            hours = 4                                                      #
            hours_subtracted = datetime.timedelta(hours = hours)           #
            accurateTime = time - hours_subtracted                         #
            epoch = datetime.datetime.utcfromtimestamp(0)                  #
                                                                           #
            def unix_time_millis(dt):                                      #
                return (dt - epoch).total_seconds() * 1000.0               #
                                                                           #
            TimeMili=str(unix_time_millis(accurateTime))                   #
            ################################################################
           
               # Data to be written 
            parsedData ={ 
                "VehicleType":Vtype, 
                "LicensePlate":lp,
                "LicensePlateConf":lpC,
                "Make":make,
                "Model":model,
                "Color":color,
                "State":state,
                "Status":status,
                "TimeStamp":TimeMili,   
            } 
           
               # Serializing json  
            json_object = json.dumps(parsedData, indent = 4) 
            with open("/home/pi/Desktop/SendData.json", "w") as outfile: #Write the parsed json in SendData.json on Desktop 
                outfile.write(json_object)
            print(json_object);    

    else:
        print("File empty");
#If the JSON file does not respect the specific format than inform me that is not a car
except:
    print("Not a car");

