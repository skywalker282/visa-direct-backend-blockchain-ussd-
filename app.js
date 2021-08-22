const express = require("express");
const mongoose = require("mongoose");

const transactionRouter = require("./routers/transaction");
const userRouter = require("./routers/user");
const USSDRouter = require("./routers/ussd");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes handling
app.use(transactionRouter);
app.use(userRouter);
app.use(USSDRouter);

const PORT = process.env.PORT || 8000;

mongoose
  .connect(
    "mongodb+srv://cris:...321454321...@cluster0.k6j9v.mongodb.net/visa_ussd?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    console.log(`database is running`);
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("an error occured so no server is running");
  });
