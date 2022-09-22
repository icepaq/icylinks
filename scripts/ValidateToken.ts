import { MongoClient } from 'mongodb';

const ValidateToken = async (email: string, token: string) => {
    const uri = process.env.MONGO_URI as string;
    const client = new MongoClient(uri);
    await client.connect();
    
    const collection = client.db("icylinks").collection("tokens");

    const result = await collection.findOne({ email: email, token: token });

    if (!result) {
        return false;
    }
    
    return true;
}

export default ValidateToken