import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { User } from "../../../models";
import bcrypt from "bcryptjs";
import { jwt, validations } from "../../../utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        email: string;
        name: string;
        role: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return registerUser(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = "",
    password = "",
    name = "",
  } = req.body as {
    email: string;
    password: string;
    name: string;
  };

  if (password.length < 6) {
    await db.disconnect();

    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  if (name.length < 3) {
    await db.disconnect();

    return res
      .status(400)
      .json({ message: "Name must be at least 3 characters long" });
  }

  if (!validations.isValidEmail(email))
    return res.status(400).json({ message: "Email format not valid" });

  await db.connect();
  const user = await User.findOne({ email });

  if (user) {
    await db.disconnect();

    return res
      .status(400)
      .json({ message: "Looks like you already have an account" });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    name,
    role: "client",
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error at register" });
  }

  const { _id, role } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token: token,
    user: {
      email,
      role,
      name,
    },
  });
};
