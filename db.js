
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import { ID_, password } from "./con_.js";

const uri = `mongodb+srv://${ID_()}:${password()}@cluster0.camz86p.mongodb.net/?retryWrites=true&w=majority`;
const dbName = "blogData";
const collection = "products";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(dbName).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(e) {
    // Ensures that the client will close when you finish/error
    console.log(e);
    await client.close();
  } finally {

  }

}
run().catch(console.dir);

async function getAll(){
    const result = await client.db(dbName).collection(collection).find();
    const arr = [];
    for await (const doc of result) {
        arr.push(doc);
    }
    return arr;
}



async function getId(id){
    let ob = new ObjectId(id);
    const result =  await client.db(dbName).collection(collection).findOne({_id: ob});
    console.log(result);
    return result;
}


async function insertData(data){
    const result =  await client.db(dbName).collection(collection).insertOne(data);
}


async function updateData(id, data){
    let ob = new ObjectId(id);
    const result = await client.db(dbName).collection(collection).updateOne({_id:ob}, {$set :{title: data.title, subtitle: data.subtitle, body: data.body}});
}


async function deleteData(id){
    let ob = new ObjectId(id);
    const res = await client.db(dbName).collection(collection).deleteOne({_id:ob});
}

export {getAll, getId, updateData, deleteData, insertData};
