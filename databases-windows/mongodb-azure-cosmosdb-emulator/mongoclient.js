const { MongoClient } = require('mongodb')

const uri = "mongodb://localhost:C2y6yDjf5%2FR%2Bob0N8A7Cgv30VRDJIWEHLM%2B4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw%2FJw%3D%3D@localhost:10255/e2e-tests?ssl=true";
var options = {
  sslValidate: false
}
const client = new MongoClient(uri, options);
async function run() {
  try {
    await client.connect();
    const database = client.db("e2e-tests");
    const collection = database.collection("User");
    const entry = await collection.insertOne({ email: "foo@bar.org", name: "Foo" });
    console.log(entry);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);