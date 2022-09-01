import JWT from "jsonwebtoken";
require("dotenv").config();

export const checkAuth = async (
  req: any,
  res: {
    status: (arg0: number) => { (): any; new (): any; json: { (arg0: { message: string }[]): void; new (): any } };
  },
  next: () => void
) => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(400).json([
      {
        message: "あなたは閲覧権限がありません",
      },
    ]);
  } else {
    try {
      let user = await JWT.verify(token, process.env.REGISTER_SECRET_KEY as string);
      req.user = user;
      next();
    } catch {
      return res.status(400).json([
        {
          message: "トークン不一致のため閲覧できません",
        },
      ]);
    }
  }
};
