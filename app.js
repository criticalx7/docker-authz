const PORT = 3000;
const HOST = "localhost";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Setup bodyparser for post request
app.use(bodyParser.json({type: () => {return true;}}));

// Routing of plugins
const policies = require("./core/policies.json");
const authzRouter = require("./routes/authz");
app.use("/", authzRouter);
app.get("/policies", (req, res) => {
  res.json(policies);
});


app.listen(PORT, HOST);
console.log(">>> Authz at: ", HOST,":",PORT);