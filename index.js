const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const moment = require("moment/moment");
const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// jwt middlewares
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "unauthorized" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    // error
    if (error) {
      return res.status(401).send({ message: "unauthorized" });
    }
    // if token is valid then only it would be decoded

    req.user = decoded;
    next();
  });
};

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
    const votesCollection = client.db("survyticsDB").collection("votes");
    const paymentsCollection = client.db("survyticsDB").collection("payments");
    const reportsCollection = client.db("survyticsDB").collection("reports");
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
            VoteYes: filter.sort === "asc" ? 1 : -1,
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

    // POST; a survey by surveyor only
    app.post("/surveys", async (req, res) => {
      const survey = req?.body;
      survey.Timestamp = moment().format("MMM Do YYYY, h:mm a");
      const result = await surveysCollection.insertOne(survey);
      res.send(result);
    });

    // PUT; update a survey by surveyor
    app.put("/survey/:id", async(req,res)=>{
      const id = req?.params.id;
      const survey = req?.body;
      const filter = {_id: new ObjectId(id)}
      const updatedDoc = {
        $set: {
          title: survey?.title,
          question: survey?.question,
          category: survey?.category,
          deadline: survey?.deadline,
          description: survey?.description,
        }
      }
      const result = await surveysCollection.updateOne(filter, updatedDoc)
      res.send(result)
    })

    // PATCH; increase voteYes and voteNo by one
    app.patch("/survey/:id", async (req, res) => {
      const id = req?.params.id;
      const { increase, operation } = req?.body;
      const query = { _id: new ObjectId(id) };
      const survey = await surveysCollection.findOne(query);
      const YesVote = survey.VoteYes;
      const NoVote = survey.VoteNo;
      let updatedDoc = {};
      if (operation === "yes") {
        updatedDoc = {
          $set: {
            VoteYes: YesVote + increase,
          },
        };
      } else {
        updatedDoc = {
          $set: {
            VoteNo: NoVote + increase,
          },
        };
      }

      const result = await surveysCollection.updateOne(query, updatedDoc);
      res.send(result);
    });

    // POST; a user
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user?.email };
      const isExist = await usersCollection.findOne(query);
      if (isExist) {
        return res.send({ message: "user already exists" });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // GET; comments with survey id query
    app.get("/comments", async (req, res) => {
      query = {};
      if (req?.query.surveyId) {
        query = { surveyId: req?.query.surveyId };
      }
      const result = await commentsCollection.find(query).toArray();
      res.send(result);
    });

    // POST; a comment
    app.post("/comments", async (req, res) => {
      const comment = req?.body;
      const result = await commentsCollection.insertOne(comment);
      res.send(result);
    });

    // POST; voting details with user information
    app.post("/votes", async (req, res) => {
      const { votingDetails } = req?.body;
      votingDetails.time = moment().format("MMM Do YYYY, h:mm a");
      const result = await votesCollection.insertOne(votingDetails);
      res.send(result);
    });

    // Check if the user is voted or not
    app.get("/isVoted", async (req, res) => {
      const { surveyId, userEmail } = req?.query;
      const query = { surveyId: surveyId };

      const surveys = await votesCollection.find(query).toArray();
      const isVoted = surveys.find((survey) => survey?.userEmail === userEmail);

      if (isVoted) {
        return res.send(true);
      } else {
        return res.send(false);
      }
    });

    // PATCH; increase likes and dislikes
    app.patch("/surveyLikesAndDislikes/:id", async (req, res) => {
      const surveyId = req?.params.id;
      const { increase, operation } = req?.body;
      const survey = await surveysCollection.findOne({
        _id: new ObjectId(surveyId),
      });
      const likes = survey.like;
      const dislikes = survey.dislike;

      let updatedDoc = {};
      if (operation === "like") {
        updatedDoc = {
          $set: {
            like: likes + increase,
          },
        };
      } else {
        updatedDoc = {
          $set: {
            dislike: dislikes + increase,
          },
        };
      }
      const result = await surveysCollection.updateOne(
        { _id: new ObjectId(surveyId) },
        updatedDoc
      );
      res.send(result);
    });

    // Get; reports by survey ids
    app.get("/reports", async(req,res)=>{
      const surveyId = req?.query?.surveyId;
      const query = {surveyId: surveyId}
      const result = await reportsCollection.find(query).toArray()
      res.send(result)
    })

    // POST; a report by user
    app.post("/reports", async (req, res) => {
      const report = req?.body;
      const result = await reportsCollection.insertOne(report);
      res.send(result);
    });

    //  ----------------------------//
    // STRIPE PAYMENT RELATED API'S STARTS

    // payment intent
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req?.body;
      const amount = parseInt(price * 100);

      // create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });
    // post payment details and update users role
    app.put("/payments", async (req, res) => {
      const payment = req?.body;
      const userEmail = payment.email;
      const updatedDoc = {
        $set: {
          role: payment?.role,
        },
      };
      const roleUpdatedResult = await usersCollection.updateOne(
        { email: userEmail },
        updatedDoc
      );
      const paymentResult = await paymentsCollection.insertOne(payment);
      res.send({ paymentResult, roleUpdatedResult });
    });

    // STRIPE PAYMENT RELATED API'S ENDS
    // -------------------------------//

    // ------------------------------//
    // JWT RELATED API'S STARTS

    // create a token
    app.post("/jwt", async (req, res) => {
      const user = req?.body;

      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false, // for development
          // sameSite: "none"
        })
        .send({ success: true });
    });

    // clear token
    app.post("/logout", (req, res) => {
      const user = req?.body;
      res.clearCookie("token", { maxAge: 0 }).send({ success: true });
    });

    // JWT RELATED API'S ENDS
    // -------------------------------//

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
