const { MongoClient, ServerApiVersion } = require("mongodb");

let db; // shared db instance

const connectDB = async () => {
  if (db) return db;

  const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  console.log("MongoDB connected (Native Driver)");

  db = client.db("club_erp"); // database name
  return db;
};

const getDB = () => {
  if (!db) throw new Error("Database not initialized");
  return db;
};

module.exports = { connectDB, getDB };
