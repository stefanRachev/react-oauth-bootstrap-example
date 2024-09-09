require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./src/routes")

const PORT = 4030;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


mongoose
  .connect("mongodb://127.0.0.1:27017/authBootstrap")
  .then(() => console.log("DB successfully connected"))
  .catch((err) => console.log(err));

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));



app.get("/", (req, res) => {
  res.send("test ok");
});

app.use(router)


app.listen(PORT, () => console.log(`Server is running on Port ${PORT}....`));