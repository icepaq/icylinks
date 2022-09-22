import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();
    
    const id = req.body.id as string;
    const email = req.body.email as string;

    const collection = client.db("icylinks").collection("page");

    const pageObject = {
        id: id,
        owner: email,
        title: 'title',
        image: '/uploads/profiles/889cb9b9-abb9-4234-a336-3276dc9ae0a5-1663690120042.png',
        description: 'description',
        social: {},
        links: [],
        background: {
            type: 'color',
            data: '#363636',
        }
    }

    const page = await collection.findOne({ 'profile.id': id });
    if (page) {
        res.status(400).json({message: 'Page already exists'});
        return;
    }

    const r = await collection.insertOne({ profile: pageObject });
    
    res.status(200).json(r);
}