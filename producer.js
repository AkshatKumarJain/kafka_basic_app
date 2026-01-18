const {kafka} = require("./client.js");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function init() {
    const producer = kafka.producer();

    console.log("Producer is connecting...");
    await producer.connect();
    console.log("Producer connected successfully.");

    rl.setPrompt('> ')
    rl.prompt();

    rl.on('line', async function (line) {
        const [riderName, location] = line.split(' ')
        await producer.send({
        topic: "rider-updates",
        messages: [
  {
    partition: location.toLowerCase() === "north" ? 0 : 1,
    key: location.toLowerCase(),
    value: JSON.stringify({ riderName, location })
  }
]
    })

    
    }).on('close', async () => {console.log("Disconnecting producer...");
    await producer.disconnect();
    console.log("Producer disconnected");}
)}

init();
