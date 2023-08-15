if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}
const { MongoClient, ServerApiVersion } = require("mongodb")

let db;

const uri = process.env.MONGGODB

// const uri = "http:/localhost:8000"

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

async function connect() {
    try {
        await client.connect()
        db = client.db("phase3")
        // console.log(db);
        console.log("connect")
    } catch (error) {
        console.log(error);
    }
}

const getDB = () => db

module.exports = { getDB, connect }