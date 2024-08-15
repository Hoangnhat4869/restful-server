import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

type JwtOptions = {
  expiresIn: string;
};

export const generateToken = (
  payload: string | object,
  options: JwtOptions = {
    expiresIn: "1h",
  }
) => {
  const secret = process.env.JWT_SECRET ?? "";
  return jwt.sign(payload, secret, options);
};
