const express = require('express');
const app = express();
const PORT = 8080;

app.listen(PORT,() => console.log(`Activo en http://localhost:${PORT}`)
)

app.use(express.json());

app.get('/data', (req,res) =>{
    res.status(200).send({
        data: "ejemplo",
        data2: "ejemplo2"
    })
});

app.post('/data',(req,res)=>{
    const {temperatura, humedad} = req.body;

    if(!temperatura || !humedad){
        res.status(400).send({message: 'BAD REQUEST - No se adjuntaron todos los datos'})
        return
    }

    console.log({temperatura,humedad})

    res.send({
        temperatura, humedad
    })
});

