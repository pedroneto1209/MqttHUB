class dataBase {
    constructor() {
        const { Client } = require('pg');
        this.pg = new Client({
            user: 'hub',
            host: 'localhost',
            database: 'hub',
            password: 'hub',
            port: 5432,
        })
    }
    
    // Fetch - pega os dados do banco
    async fetchFromDatabase () {
        
        const query = `SELECT * FROM dados`;
        
        var a = []
        
        var err, res = await this.pg.query(query);
        
        a = res.rows
        return a
    }
    
    async pgConnect() {
        await this.pg.connect()
    }
    
    // Coloca no bd
    addToDatabase (vel, lat, lon, moto) {
        const query = `INSERT INTO dados (vel, lat, lon, moto) VALUES (${vel}, ${lat}, ${lon}, \'${moto}\')`;
        
        this.pg.query(query);
        
        console.log('recebido')
    }
}
module.exports=dataBase;