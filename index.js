require('dotenv').config()
const express = require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const cors = require("cors")
const port = process.env.PORT || 5000


// middlewares
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.hf0b3tt.mongodb.net/?retryWrites=true&w=majority`;

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

    // DATABASE collection STARTS
    const surveysCollection = client.db("survyticsDB").collection("surveys")
    // DATABASE collection ENDS

    // GET; all the surveys on surveys page
    app.get("/surveys", async(req,res)=>{
      const filter = req.query;
      let query = {}
      if(filter?.search){
        query = {
          title:{$regex: filter.search, $options: "i"}
        }
      }
      if(filter.category){
        query = {
          category: filter.category
        }
      }
     
      let options = {}
      if(filter?.sort){
        options = {
          // TODO: change the like property to totalVote
          sort: {
            like: filter.sort === "asc" ? 1 : -1
          }
        }
      }
     
      const result = await surveysCollection.find(query, options).toArray()
      res.send(result)
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get("/", (req,res)=>{
    res.send("Survytisc is running")
})

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})