import json
import os
import datetime

def getJSON(filePathAndName):
    with open(filePathAndName, 'r') as fp:
        return json.load(fp)

Vtype=""
myInfo=""
lp=""
lpC=""
state=""
make=""
model=""
color=""
status=""
time=""

try:
    empty=os.stat("/home/pi/Desktop/LPdata.json").st_size == 0

    if not (empty):
        myInfo=getJSON("/home/pi/Desktop/LPdata.json")
        if 'error' not in myInfo:
            lp = myInfo['results'][0]['plate'].upper();
            state = myInfo['results'][0]['region']['code'].split('-')[1].upper();
            Vtype = myInfo['results'][0]['vehicle']['type'];
            lpC=myInfo['results'][0]['candidates'][0]['score'];

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
            time = datetime.datetime.strptime(time, '%Y-%m-%d %H:%M:%S.%f')
            hours = 4
            hours_subtracted = datetime.timedelta(hours = hours)
            accurateTime = time - hours_subtracted
            epoch = datetime.datetime.utcfromtimestamp(0)

            def unix_time_millis(dt):
                return (dt - epoch).total_seconds() * 1000.0
            
            TimeMili=str(unix_time_millis(accurateTime))
            
           
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
            with open("/home/pi/Desktop/SendData.json", "w") as outfile: 
                outfile.write(json_object)
            print(json_object);    

    else:
        print("File empty");
except:
    print("Not a car");

