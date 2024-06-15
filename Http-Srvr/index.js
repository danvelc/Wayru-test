// Setup de bd SQlite
const sqlite3 = require('sqlite3').verbose();
let sql;

const db = new sqlite3.Database("./iot-sensors.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

sql = 'CREATE TABLE IF NOT EXISTS data(id INTEGER PRIMARY KEY, fecha, temperatura, humedad)';
db.run(sql);

//Setup de HTTP API
const express = require('express');
const app = express();
const PORT = 8080;

app.listen(PORT, () => console.log(`Activo en http://localhost:${PORT}`)
)

app.use(express.json());

app.get('/data', (req, res) => {
    
    let select = 'SELECT * FROM data';
    db.all(select,(err,arr)=>{
        res.send(arr);
    })

});

app.post('/data', (req, res) => {
    const { fecha, temperatura, humedad } = req.body;

    if (!fecha || !temperatura || !humedad) {
        res.status(400).send({ message: 'BAD REQUEST - No se adjuntaron todos los datos' })
        return
    }

    console.log({ fecha, temperatura, humedad })
    let command = 'INSERT INTO data(fecha, temperatura, humedad) VALUES (?,?,?)';
    db.run(command, [fecha, temperatura, humedad], (err) => {
        if (err) return console.error(err.message);
    });
    res.send({
        fecha, temperatura, humedad
    })
});

//Setup de MQTT Protocol Subscription
const mqtt = require('mqtt');
const json = require('json');
const client = mqtt.connect('mqtt://test.mosquitto.org');
const topic="temperatura-wayru"

client.on('connect', () => {
    console.log('Connected to MQTT broker.');
    client.subscribe(topic, (err) => {
        if (err) {
            console.error('Error subscribing to topic:', err);
        } else {
            console.log(`Subscribed to topic: ${topic}`);
        }
    });
});

client.on('error', (err) => {
    console.error('Error connecting to MQTT broker:', err);
});

client.on('message', (topic, message) => {
    console.log(`Received message on topic: ${topic}`);
    datos = JSON.parse(message.toString());
    console.log("Fecha: ", datos.fecha, "Temperatura: ", datos.temperatura, "Humedad:", datos.humedad);
    let command = 'INSERT INTO data(fecha, temperatura, humedad) VALUES (?,?,?)';
    db.run(command, [datos.fecha, datos.temperatura, datos.humedad], (err) => {
        if (err) return console.error(err.message);
    });
});