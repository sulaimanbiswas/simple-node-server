const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: "Sulaiman Biswas", email: "sulaimanbiswasbd@gmail.com" },
  { id: 2, name: "Rezone Prince", email: "rezoneprince@gmail.com" },
  { id: 3, name: "Sabbir Malitha", email: "sabbirmalitha@gmail.com" },
];

// username: dbUser1
// password: GbO2om1OqcEzHBu3

const uri =
  "mongodb+srv://dbUser1:GbO2om1OqcEzHBu3@cluster0.ovxjb0p.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userCollection = client.db("simpleNode").collection("user");
    // const user = { name: "sulaiman biswas", email: "sulaimanbiswas@gmail.com" };

    // const result = await userCollection.insertOne(user);
    // console.log(result);

    app.get("/user", async (req, res) => {
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/user", async (req, res) => {
      const user = req.body;
      //   users.push(user);

      const result = await userCollection.insertOne(user);
      console.log(result);
      user._id = result.insertedId;
      res.send(user);
    });
  } finally {
  }
}

run()
  .then(() => {})
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Welcome to our Server");
});

app.get("/user", (req, res) => {
  if (req.query.name) {
    const search = req.query.name;
    const filtered = users.filter(
      (usr) => usr.name.toLowerCase().indexOf(search) >= 0
    );
    res.send(filtered);
  } else {
    res.send(users);
  }
});

// app.post("/user", (req, res) => {
//   const user = req.body;
//   user.id = users.length + 1;
//   users.push(user);

//   res.send(user);
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
