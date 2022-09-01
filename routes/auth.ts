import { body, validationResult } from "express-validator";
import { User } from "../db/User";
import JWT from "jsonwebtoken";
require("dotenv").config();

import bcrypt from "bcrypt";

const router = require("express").Router();

interface UserData {
  email: string;
  password: string;
}

router.get("/", (req: any, res: any) => {
  res.send("Hello Auth");
});

// ユーザー新規登録用のAPI
router.post(
  "/register",
  // バリデーションチェック
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req: any, res: any) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    // すでに登録済みかチェック
    const user = User.find((user: UserData) => user.email === email);
    if (user) {
      return res.status(400).json([
        {
          message: "すでにそのユーザーは登録されています。",
        },
      ]);
    }

    // パスワードの暗号化
    let hashedPassword = await bcrypt.hash(password, 10);

    // DBに保存(今回はdbフォルダに保存)
    User.push({
      email,
      password: hashedPassword,
    });

    // JWT発行
    const token = JWT.sign(
      {
        email,
      },
      process.env.REGISTER_SECRET_KEY as string,
      {
        expiresIn: "24h",
      }
    );

    return res.json({
      token: token,
    });
  }
);

// ユーザーログイン用のAPI
router.post(
  "/login",
  async (
    req: { body: { email: any; password: any } },
    res: {
      status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message: string }[]): any; new (): any } };
      json: (arg0: { token: string }) => any;
    }
  ) => {
    const { email, password } = req.body;
    const user = User.find((user) => user.email === email);
    if (!user) {
      return res.status(400).json([
        {
          message: "ユーザー名もしくはパスワードが違います。",
        },
      ]);
    }

    // パスワード復号、照合
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json([
        {
          message: "ユーザー名もしくはパスワードが違います。",
        },
      ]);
    }

    // JWT発行
    const token = JWT.sign(
      {
        email,
      },
      process.env.REGISTER_SECRET_KEY as string,
      {
        expiresIn: "24h",
      }
    );

    return res.json({
      token: token,
    });
  }
);

// ユーザー確認用のAPI（開発用）
router.get("/allUsers", (req: any, res: { json: (arg0: { email: string; password: string }[]) => any }) => {
  return res.json(User);
});

module.exports = router;
