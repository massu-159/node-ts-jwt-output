import express from "express";
const auth = require("./routes/auth");
const post = require("./routes/post");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use("/auth", auth);
app.use("/post", post);

app.get("/", (req: any, res: any) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("サーバーを起動中");
});
