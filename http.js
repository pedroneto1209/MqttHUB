const express = require('express');
const app = express()
const port = 3000
app.use(express.json())

class httpServer {
    users = []

    constructor(db, mqttServer) {
        this.db=db
        this.mqttServer=mqttServer
    }

    // Retorna par ao site os dados
    async sendGet (res) {
        var ans = await this.db.fetchFromDatabase()
        res.send(ans)
    }
    
    // main http
    async servidor() {
        app.get('/motos', (req, res) => {
            this.sendGet(res)
        })
        app.post('/motos', (req, res) => {
            res.json(req.body);
            const msg = req.body
            this.mqttServer.sendmqtt(msg)
        })
        
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    }
}
module.exports=httpServer;