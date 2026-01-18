import {kafka} from "./client.js"

async function init(){
    const admin = kafka.admin();
    console.log("Admin is connecting... ", admin);
    admin.connect();
    console.log("Admin connection successful");

    console.log("Creating topic...[rider-uptades]")
    await admin.createTopics({
        topics: [
            {
                topic: "rider-updates",
                numPartition: 2
            },
        ],
    })
    console.log("topic Created...[rider-uptades]")

    console.log("disconnecting admin...");
    await admin.disconnect();
}

init();