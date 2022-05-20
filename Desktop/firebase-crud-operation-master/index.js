const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");
const cors = require("cors");
const {
  Users,
  authenticate,
  addUser,
  userProfile,
  updateUserProfile,
} = require("./config");
const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await addUser(email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authenticate(email, password);
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const snapshot = await Users.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(list);
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.put("/userprofileupdate", async (req, res) => {
  try {
    const result = updateUserProfile();
    res.status(200).send(result);
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.get("/userprofile", async (req, res) => {
  try {
    console.log(userProfile());
    res.status(200).send(userProfile());
  } catch (error) {
    res.send({ error: error.message });
  }
});
app.post("/create", async (req, res) => {
  try {
    const data = req.body;
    await Users.add(data);
    res.status(201).send({ msg: "User Added" });
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.post("/update", async (req, res) => {
  try {
    const id = req.body.id;
    delete req.body.id;
    const data = req.body;
    await Users.doc(id).update(data);
    res.status(201).send({ msg: "update successfully" });
  } catch (error) {
    res.send({ error: error.message });
  }
});

app.post("/delete", async (req, res) => {
  try {
    const id = req.body.id;

    await Users.doc(id).delete();
    res.status(200).send({ msg: "deleted" });
  } catch (error) {
    res.send({ error: error.message });
  }
});
app.listen(4000, () => console.log("up & Running *4000"));
