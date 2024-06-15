import requests
import random
import time
from datetime import datetime
import paho.mqtt.client as mqtt
import json

url = "http://localhost:8080/data"

min_temperatura = 18
max_temperatura = 28

min_humedad = 30
max_humedad = 70


client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
client.connect("test.mosquitto.org", 1883, 60)

while True:
  
  temperatura = round(random.uniform(min_temperatura, max_temperatura), 1)
  humedad = random.randint(min_humedad, max_humedad)
  fecha_hora_actual = datetime.now()
  f_formateada = fecha_hora_actual.strftime('%Y-%m-%d %H:%M:%S')

  data = {"fecha": f_formateada ,"temperatura": temperatura, "humedad": humedad}
  data_format = json.dumps(data)
  try:
    client.publish("temperatura-wayru", data_format)
    print(data_format)
    # response = requests.post(url, json=data)
    # if response.status_code == 200:
    #   print(f"Envio Exitoso - Fecha: {f_formateada}, Temperatura: {temperatura} C, Humedad: {humedad}%")
    # else:
    #   print(f"Error al enviar data: {response.status_code}")
  except requests.exceptions.RequestException as e:
    print(f"Error al enviar al Servidor")

  time.sleep(4)