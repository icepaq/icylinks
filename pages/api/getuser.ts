import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();
    
    const { email } = req.body;

    const collection = client.db("icylinks").collection("users");
    const result = await collection.findOne({ email: email });

    res.status(200).json(result);
}
