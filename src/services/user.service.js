import {
  createRepository,
  findAllRepository,
  findByEmailRepository,
  findByIdRepository,
  updateRepository,
} from "../repositories/user.repositories.js";
import { config } from "../../config.js";
import { generateToken } from "./auth.service.js";


export const createService = async (body) => {
  const { name, username, email, password, avatar, background } = body;

  if (!name || !username || !email || !password || !avatar || !background)
    throw new Error("Submit all fields for registration");

  const foundUser = await findByEmailRepository(email);
  if (foundUser) throw new Error("User already exists");

  const user = await createRepository(body);

  if (!user) throw new Error("Error Creating User");

  const token = generateToken(user.id);

  return {
    user: {
      id: user._id,
      name,
      username,
      email,
      avatar,
      background,
    },
    token,
  };
};


export const findAllService = async () => {
  const users = await findAllRepository();

  if (users.length === 0) throw new Error("There are no registered users");

  return users;
};


export const findByIdService = async (userId, userIdLogged) => {
  let idParam;
  if (!userId) {
    userId = userIdLogged;
    idParam = userId;
  } else {
    idParam = userId;
  }
  if (!idParam)
    throw new Error("Send an ID in the parameters to search for the user");
  const user = await findByIdRepository(idParam);

  return user;
};


export const updateService = async (body, userId) => {
  const { name, username, email, password, avatar, background } = body;

  if (!name && !username && !email && !password && !avatar && !background)
    throw new Error("Submit at least one field for update");

  const user = await findByIdRepository(userId);

  if (!user._id.equals(userId)) throw new Error("You cannot update this user");

  if (password) {
    password = await config.hash(password, config.salt);
  }

  await updateRepository(userId, body);

  
  return { message: "User successfully updated" };
};
