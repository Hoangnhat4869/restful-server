import {
  createOne,
  deleteById,
  findFirst,
  updateOne,
} from "../repositories/user.repository";
import { User } from "../types";
import { BadRequestError, CustomError } from "../utils/CustomError";
import { hashPassword, verifyPassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

interface IUserService {
  }

  export const createUserService = (): IUserService => {
    return {
      registerUser,
      authenticateUser,
      updateUser,
      deleteUser,
    };
  }

const generateTokens = (userId: string) => {
  const accessToken = generateToken(userId);
  const refreshToken = generateToken(
    {
      userId: userId,
      type: "refresh",
    },
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken, expiresIn: "7d" };
};

export const registerUser = async (data: User) => {
  const hashedPassword = await hashPassword(data.password);
  const foundUser = await findFirst((user) => user.username === data.username);
  if (foundUser) {
    throw new BadRequestError("User already exists");
  }
  const user = await createOne({ ...data, password: hashedPassword });
  return user;
};

export const authenticateUser = async (data: {
  username: string;
  password: string;
}) => {
  const user = await findFirst((user) => user.username === data.username);
  if (!user) {
    throw new CustomError(404, "User not found");
  }

  const isPasswordValid = await verifyPassword(data.password, user.password);
  if (!isPasswordValid) {
    throw new CustomError(401, "Wrong password");
  }

  return generateTokens(user.id);
};

export const updateUser = async (id: string, data: Partial<User>) => {
  const user = await findFirst((user) => user.id === id);
  if (!user) {
    throw new CustomError(404, "User not found");
  }
  const updatedUser = await updateOne(user.id, data);
  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const user = await findFirst((user) => user.id === id);
  if (!user) {
    throw new CustomError(404, "User not found");
  }
  const deletedUser = await deleteById(user.id);
  return deletedUser;
};
