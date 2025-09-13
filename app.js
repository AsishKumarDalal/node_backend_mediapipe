const express = require("express");
const app = express();
const connectDB = require("./models/root");
const { router } = require("./routers/routes");
app.use(express.json());

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
