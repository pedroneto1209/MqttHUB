var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.hivemq.com')

const express = require('express');
const app = express()
const port = 3000



async function fetchFromDatabase () {

    const query = `SELECT * FROM dados`;

    var a = []

    var err, res = await pg.query(query);

    a = res.rows
    return a
}

async function sendGet (res) {
    var ans = await fetchFromDatabase()
    res.send(ans)
}

async function servidor() {
    app.get('/motos', (req, res) => {
        sendGet(res)
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

const { Client } = require('pg')
const pg = new Client({
    user: 'hub',
    host: 'localhost',
    database: 'hub',
    password: 'hub',
    port: 5432,
})

servidor()

async function pgConnect() {
    await pg.connect()
}

function addToDatabase (vel, lat, lon, moto) {
    const query = `INSERT INTO dados (vel, lat, lon, moto) VALUES (${vel}, ${lat}, ${lon}, \'${moto}\')`;

    pg.query(query);

    console.log('recebido')
}

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
