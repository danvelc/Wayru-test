import requests
import random
import time
from datetime import datetime
import paho.mqtt.client as mqtt
import json

min_temperatura = 18
max_temperatura = 28

min_humedad = 30
max_humedad = 70


client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
client.connect("34.228.8.217", 1883, 60)

while True:
  
  temperatura = round(random.uniform(min_temperatura, max_temperatura), 1)
  humedad = random.randint(min_humedad, max_humedad)
  fecha_hora_actual = datetime.now()
  f_formateada = fecha_hora_actual.strftime('%Y-%m-%d %H:%M:%S')

  data = {"fecha": f_formateada ,"temperatura": temperatura, "humedad": humedad}
  data_format = json.dumps(data)
  try:
    client.publish("iot-wayru", data_format)
    print(data_format)
  except requests.exceptions.RequestException as e:
    print(f"Error al enviar al Servidor")

  time.sleep(4)