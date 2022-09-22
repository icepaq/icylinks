import { MongoClient } from 'mongodb';
import ValidateToken from './ValidateToken';

const GetUser = async (email: string, token: string) => {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();
    
    const valid = await ValidateToken(email, token);
    if (!valid) {
        return null;
    }

    const collection = client.db("icylinks").collection("users");
    const result = await collection.findOne({ email: email });

    const object = {
        email: result?.email,
        name: result?.name,
    }

    return object;
}

export default GetUser