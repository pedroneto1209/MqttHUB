const dataBase=require('./bd');
const httpServer=require('./http');
const mqttServer=require('./mqtt');

const dataBase1 = new dataBase();
const mqttServer1 = new mqttServer(dataBase1);
const httpServer1 = new httpServer(dataBase1, mqttServer1);

httpServer1.servidor()

dataBase1.pgConnect().then(mqttServer1.getmqtt())