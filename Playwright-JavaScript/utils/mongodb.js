const { MongoClient } = require('mongodb');

let client;

async function connect() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  }
  return client.db(process.env.MONGODB_DATABASE);
}

async function close() {
  if (client) {
    await client.close();
    client = null;
  }
}

module.exports = { connect, close };
