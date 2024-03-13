const express = require("express");

const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();
const app = express();
// const jwt = require("jsonwebtoken");

const port = 5000 || process.env.PORT;

// Middlewire
app.use(cors());
app.use(express.json());

console.log(process.env.DB_PASS)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.quaequt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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


    const serviceCollection = client.db('carDoctor').collection("services");
    const bookingCollection = client.db('carDoctor').collection("bookings");

    
    // services apis
    app.get("/services" , async(req,res) =>{
      const result = await serviceCollection.find().toArray();
      res.send(result)
    })

    app.get("/services/:id",async(req,res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const option = {
        projection: {title:1,price:1,service_id:1}
      }
      const result = await serviceCollection.findOne(query,option);
      res.send(result);
    })

    // bookings Api

    app.post("/bookings" , async(req,res) =>{
      const bookings = req.body;
    })


    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/",(req,res)=>{
    res.send("doctor is running")
})

app.listen(port,()=>{
    console.log(`doctor running port ${port}`)
})
