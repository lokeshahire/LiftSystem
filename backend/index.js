// app.js

const express = require("express");
const bodyParser = require("body-parser");
const elevatorRoutes = require("./routes/elevatorRoutes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// API routes for the elevator system
app.get("/", (req, res) => {
  res.send("WELCOME");
});
app.use("/elevator-system", elevatorRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
