import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();
    
    const id = req.body.id as string;

    const collection = client.db("icylinks").collection("page");
    const r = await collection.findOne({ 'profile.id': id });
    
    res.status(200).json(r);
}