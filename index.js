const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
const port = 5000;

// MiddleWare
app.use(cors());
app.use(express.json());
console.log();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mgosmoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const RoomCollection = client.db("Larisa").collection("allRoom");
  const roomBookingCollection = client.db("Larisa").collection("bookedRooms");


  // app.post("allRoom",async(req,res)=>{
  //   const cursor = RoomCollection.find();
  //   const result = await cursor.toArray();
  //   res.send(result);
  // })

  app.post("/allRoom", async (req, res) => {
    const newRoom = req.body;
    console.log(newRoom);
    const result = await RoomCollection.insertOne(newRoom);
    res.send(result);
  });

  app.get("/allRoom", async (req, res) => {
    const cursor = RoomCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  });

  app.post('/bookedRooms',async(req,res)=>{
    // const cursor = roomBookingCollection 
    const newBooking = req.body;
    console.log(newBooking);
    const result = await roomBookingCollection.insertOne(newBooking);
    res.send(result);
  })

  app.get('/bookedRooms',async(req,res)=>{
    const cursor = roomBookingCollection.find();
    const result = await cursor.toArray();
    res.send(result)
  })






  

  app.get("/roomDetails/:id", async (req, res) => {
    const roomId = req.params.id;
    // console.log(roomId)
    const query = {_id: new ObjectId(roomId) }
    const result = await RoomCollection.findOne(query)
    res.send(result);
  });



  // Posting email 
  // app.post('/myRoom/:email', async (req, res) => {
  //   const userEmail = req.params.email;
  //   const newRoom = req.body;
  //   console.log('post',userEmail)
  //   newRoom.email = userEmail; // Add the user's email to the Room object
  //   const result = await RoomCollection.insertOne(newRoom);
  //   res.send(result);
  // });

  // Getting Data According to email
  // app.get('/allRooms', async (req, res) => {
  //   const userEmail = req.query.email;
  //   console.log('get',userEmail)
  //   const query = { email: userEmail };
  //   const result = RoomCollection.find(query).toArray();
  //   res.send(result);
  // });

  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("", async (req, res) => {
  res.send("La Ri Sa Website is Running");
});

app.listen(port, () => {
  console.log(`this port is running on ${port}`);
});
