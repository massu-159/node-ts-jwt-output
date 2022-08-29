// import express from "express";
const express = require("express");
const auth = require("./routes/auth");
const app = express();

const PORT = 3000;

// interface FirstResponse {
//   send(arg0: string): unknown;
// }

app.use(express.json());
app.use("/auth", auth);

app.get("/", (req: any, res: any) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("サーバーを起動中");
});
