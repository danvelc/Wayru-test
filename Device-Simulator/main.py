import requests
import random
import time

url = "http://localhost:8080/data"

min_temperatura = 18
max_temperatura = 28

min_humedad = 30
max_humedad = 70

while True:
  
  temperatura = round(random.uniform(min_temperatura, max_temperatura), 1)
  humedad = random.randint(min_humedad, max_humedad)

  data = {"temperatura": temperatura, "humedad": humedad}

  response = requests.post(url, json=data)

  if response.status_code == 200:
    print(f"Envio Exitoso - Temperatura: {temperatura} C, Humedad: {humedad}%")
  else:
    print(f"Error al enviar data: {response.status_code}")

  time.sleep(4)