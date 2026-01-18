const {Kafka} = require("kafkajs");

exports.kafka = new Kafka({
    clientId: "my_app",
    brokers: ['192.168.31.73:9092']
})