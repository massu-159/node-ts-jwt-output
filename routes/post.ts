require("dotenv").config();
import { publicPost, privatePost } from "../db/Post";
import { checkAuth } from "../middleware/checkAuth";
import { ArticleResponse } from "../types/ArticleResponse";

const router = require("express").Router();

// 誰でも見れるOpen article閲覧API
router.get("/public", (req: any, res: ArticleResponse) => {
  res.json(publicPost);
});

// close article閲覧API
router.get("/private", checkAuth, (req: any, res: ArticleResponse) => {
  res.json(privatePost);
});

module.exports = router;
