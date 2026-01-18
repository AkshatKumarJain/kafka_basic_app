const {kafka} = require("./client.js");

async function init() {
    const producer = kafka.producer();

    console.log("Producer is connecting...");
    await producer.connect();
    console.log("Producer connected successfully.");

    await producer.send({
        topic: "rider-updates",
        messages: [
            { 
                partition: 0,
                key: 'location-update', value: JSON.stringify({ name: "Akshat", location: "West" }) }
        ]
    })

    console.log("Disconnecting producer...");
    await producer.disconnect();
    console.log("Producer disconnected");
}

init();