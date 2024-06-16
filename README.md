# Wayru-test
Sistema de Simulación de Dispositivos IoT - Wayru Postulación

# Lista de Dependencias:
**Node.js:**
- "csv": "^6.3.9",
- "express": "^4.19.2",
- "json": "^11.0.0",
- "mqtt": "^5.7.0",
- "sqlite3": "^5.1.7"

**Python:**
- paho-mqtt==2.1.0
- requests==2.32.3

# Instrucciones de Instalación
**Servidor**

Para instalar el servidor ejecutar los siguientes comandos:
```shell
cd Http-Srvr
npm install
```
**Cliente**

Para instalar el cliente ejecutar los siguientes comandos:
```shell
cd Device-Simulator
pip install -r requirements.txt
```
 

# Instrucciones de Ejecución
**Servidor**

Se encuentra disponible un ambiente de prueba del servidor alojado en el siguiente enlace: [http://34.228.8.217:8080/data](http://34.228.8.217:8080/data)

Para ejecutar el servidor ejecutar los siguientes comandos:

```shell
cd Http-Srvr
node .
```
**Cliente**

Para ejecutar el cliente ejecutar los siguientes comandos:
```shell
cd Device-Simulator
python main.py
```
