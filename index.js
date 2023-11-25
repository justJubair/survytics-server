require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// middlewares
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_KEY}@cluster0.hf0b3tt.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // DATABASE collection STARTS
    const surveysCollection = client.db("survyticsDB").collection("surveys");
    const usersCollection = client.db("survyticsDB").collection("users");
    const commentsCollection = client.db("survyticsDB").collection("comments");
    // DATABASE collection ENDS

    // GET; all the surveys on surveys page with search and sort 
    app.get("/surveys", async (req, res) => {
      const filter = req.query;
      let query = {};
      
      if (filter.category) {
        query = {
          category: filter.category,
        };
      }
      if (filter?.search) {
        query = {
          title: { $regex: filter.search, $options: "i" },
        };
      }
      let options = {};
      if (filter?.sort) {
        options = {
          // TODO: change the like property to totalVote
          sort: {
            like: filter.sort === "asc" ? 1 : -1,
          },
        };
      }
      const result = await surveysCollection.find(query, options).toArray();
      res.send(result);
    });

    // GET; a single survey
    app.get("/survey/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await surveysCollection.findOne(query);
      res.send(result);
    });

    // PATCH; increase voteYes by One.
    app.patch("/survey/:id", async(req,res)=>{
        const id = req?.params.id;
        const {increase, operation} =req?.body
        console.log(operation)
        const query = {_id: new ObjectId(id)};
        const survey = await surveysCollection.findOne(query)
        const YesVote = survey.VoteYes;
        const NoVote = survey.VoteNo;
        let updatedDoc = {}
        if(operation=== "yes"){
          updatedDoc = {
            $set: {
              VoteYes: YesVote+increase
            }
          }
        } else {
          updatedDoc = {
            $set: {
              VoteNo: NoVote+increase
            }
          }
        }
        
        const result = await surveysCollection.updateOne(query, updatedDoc)
        res.send(result)
    })

    // PATCH; decrease voteNo by One.
    // app.patch("/survey/:id", async(req,res)=>{
    //     const id = req?.params.id;
    //     const {decrease} =req?.body
    //     const query = {_id: new ObjectId(id)};
    //     const survey = await surveysCollection.findOne(query)
    //     const NoVote = survey.VoteNo;
    //     if(NoVote<1){
    //       return res.send()
    //     }
        
    //     const updatedDoc = {
    //       $set: {
    //         VoteYes: YesVote+increase
    //       }
    //     }
    //     const result = await surveysCollection.updateOne(query, updatedDoc)
    //     res.send(result)
    // })

    // POST; a user
    app.post("/users", async(req,res)=>{
      const user = req.body;
      const query = {email: user?.email}
      const isExist = await usersCollection.findOne(query)
      if(isExist){
        return res.send({message: "user already exists"})
      }
      const result = await usersCollection.insertOne(user)
      res.send(result)
    })


    // GET; comments with survey id query
    app.get("/comments", async(req,res)=>{
      query = {}
      if(req?.query.surveyId){
        query = {surveyId: req?.query.surveyId}

      }
      const result = await commentsCollection.find(query).toArray()
      res.send(result)
    })

    // POST; a comment
    app.post("/comments", async(req,res)=>{
      const comment = req?.body;
      const result = await commentsCollection.insertOne(comment)
      res.send(result)
    })







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

app.get("/", (req, res) => {
  res.send("Survytisc is running");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
