require("dotenv").config();
import { publicPost, privatePost } from "../db/Post";
import { checkAuth } from "../middleware/checkAuth";

const router = require("express").Router();

// 誰でも見れるOpen article閲覧API
router.get("/public", (req: any, res: { json: (arg0: { title: string; body: string }[]) => void }) => {
  res.json(publicPost);
});

// close article閲覧API
router.get("/private", checkAuth, (req: any, res: { json: (arg0: { title: string; body: string }[]) => void }) => {
  res.json(privatePost);
});

module.exports = router;
