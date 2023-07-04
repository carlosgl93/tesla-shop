import { db } from ".";
import { User } from "../models";
import bcrypt from "bcryptjs";

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { role, name, _id } = user;

  return { role, email: email.toLocaleLowerCase(), name, _id };
};

export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const { _id, name, role, email } = user;
    return { _id, name, role, email };
  }

  const newUser = new User({
    email: oAuthEmail,
    name: oAuthName,
    password: "@",
    role: "client",
  });

  try {
    await newUser.save();
  } catch (error) {
    console.log(error, "error creating user with oAuth");
  }

  await db.disconnect();

  const { _id, name, role, email } = newUser;
  return {
    _id,
    name,
    role,
    email,
  };
};
