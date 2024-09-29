// /pages/api/hello.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

// Replace with your MongoDB URI
const uri = 'mongodb://localhost:27017/';

// Create a global variable to hold the MongoDB client
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Check if we are in a production environment
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  // In production, create a new MongoClient and store it globally
  client = new MongoClient(uri);
  clientPromise = client.connect();
} else {
  // In development, use a global variable to preserve the client across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}

// API handler
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Use the connection pool by awaiting the clientPromise
      const client = await clientPromise;
      const db = client.db('testing');
      const collection = db.collection('test');

      // Fetch data from MongoDB
      const data = await collection.find({}).toArray();
      res.status(200).json("success");
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

export default handler;
