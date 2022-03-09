import express from "express";

const app = express();

app.listen(5050, () =>
  console.log("Server running at port 5050 http://localhost:5050")
);
