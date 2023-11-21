const express = require("express");
const mongoConnect = require("./db.js");

const app = express();

mongoConnect();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function (req, res) {
  res.send("hello world");
});

app.use(express.json());

app.use("/api", require("./routes/Register"));
app.use("/api", require("./routes/FoodData"));
app.use("/api", require("./routes/OrderData"));

app.listen(5000, () => {
  console.log("server is started");
});
