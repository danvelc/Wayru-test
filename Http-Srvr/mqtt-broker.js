const mqtt = require('mqtt');
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
    console.log('Message:', message.toString());
});