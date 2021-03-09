var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.hivemq.com')

class mqttServer{

    constructor(db) {
        this.db=db
    }
    
    getmqtt () {
        var banco = this.db
        client.on('connect', function () {
            client.subscribe('agugu/#', function (err) {
            })
        })
        client.on('message', function (topic, message) {
            const msg = JSON.parse(message);
            
            banco.addToDatabase(msg.vel, msg.lat, msg.lon, topic);
        })
    }

    sendmqtt(msg) {
        client.publish(`agugu/${msg.moto}`,JSON.stringify(msg))
    }
}

module.exports=mqttServer;