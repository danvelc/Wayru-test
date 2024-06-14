const sqlite3 = require('sqlite3').verbose();
let sql;

const db = new sqlite3.Database("./iot-sensors.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

sql = 'CREATE TABLE IF NOT EXISTS data(id INTEGER PRIMARY KEY, fecha, temperatura, humedad)';
db.run(sql);

const express = require('express');
const app = express();
const PORT = 8080;

app.listen(PORT, () => console.log(`Activo en http://localhost:${PORT}`)
)

app.use(express.json());

app.get('/data', (req, res) => {
    res.status(200).send({
        data: "ejemplo",
        data2: "ejemplo2"
    })
});

app.post('/data', (req, res) => {
    const {fecha, temperatura, humedad } = req.body;

    if (!fecha || !temperatura || !humedad) {
        res.status(400).send({ message: 'BAD REQUEST - No se adjuntaron todos los datos' })
        return
    }

    console.log({fecha, temperatura, humedad })
    let command = 'INSERT INTO data(fecha, temperatura, humedad) VALUES (?,?,?)';
    db.run(command, [fecha, temperatura,humedad], (err) => {
        if (err) return console.error(err.message);
    });
    res.send({
        fecha, temperatura, humedad
    })
});

