var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.hivemq.com')

const express = require('express');
const app = express()
const port = 3000


// Fetech - pega os dados do banco

async function fetchFromDatabase () {

    const query = `SELECT * FROM dados`;

    var a = []

    var err, res = await pg.query(query);

    a = res.rows
    return a
}


// Retorna par ao site os dados
async function sendGet (res) {
    var ans = await fetchFromDatabase()
    res.send(ans)
}

// main http
async function servidor() {
    app.get('/motos', (req, res) => {
        sendGet(res)
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

// Conecta no bd
const { Client } = require('pg')
const pg = new Client({
    user: 'hub',
    host: 'localhost',
    database: 'hub',
    password: 'hub',
    port: 5432,
})

// inicia http
servidor()

async function pgConnect() {
    await pg.connect()
}

// Coloca no bd
function addToDatabase (vel, lat, lon, moto) {
    const query = `INSERT INTO dados (vel, lat, lon, moto) VALUES (${vel}, ${lat}, ${lon}, \'${moto}\')`;

    pg.query(query);

    console.log('recebido')
}


// pega o mqtt
pgConnect().then(
    () => {
        client.on('connect', function () {
            client.subscribe('agugu/#', function (err) {
            })
        })
        
        
        
        client.on('message', function (topic, message) {
            
            const msg = JSON.parse(message);

            addToDatabase(msg.vel, msg.lat, msg.lon, topic);
        })
    }
)
