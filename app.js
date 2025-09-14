const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./models/root");
const { router } = require("./routers/routes");
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:8080", // allow your frontend origin here
  methods: ["GET", "POST", "OPTIONS"], // add any methods you need
  credentials: true, // if you use cookies/auth headers
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(router);
connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("http://localhost:3000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
