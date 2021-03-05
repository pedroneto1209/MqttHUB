const express = require('express');
const app = express()
const port = 3000

class httpServer {

    constructor(db) {
        this.db=db
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
        
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    }
}
module.exports=httpServer;