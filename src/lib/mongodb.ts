// // lib/mongodb.ts
// import { MongoClient, ServerApiVersion } from "mongodb";

// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
// }

// const uri = process.env.MONGODB_URI;
// const options = {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
//   connectTimeoutMS: 60000,  // Increase connection timeout
//   socketTimeoutMS: 60000,   // Increase socket timeout
// };

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === "development") {
//   let globalWithMongo = global as typeof globalThis & {
//     _mongoClientPromise?: Promise<MongoClient>;
//   };

//   if (!globalWithMongo._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     globalWithMongo._mongoClientPromise = client.connect();
//   }
//   clientPromise = globalWithMongo._mongoClientPromise;
// } else {
//   // Ensure connection logic is stable for production environments as well.
//   client = new MongoClient(uri, options);
//   clientPromise = client.connect().catch((err) => {
//     console.error("Failed to connect to MongoDB", err);
//     throw err;  // Properly handle connection failures
//   });
// }

// export default clientPromise;
