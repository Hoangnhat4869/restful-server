import fs from "fs";

import { User } from "../types";
import { usersPath } from "../constants";

const users: User[] = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

export const findUserById = async (id: string): Promise<User | undefined> => {
  return users.find((u) => u.id === id);
};

export const findFirst = async (
  cb: (user: User) => boolean
): Promise<User | undefined> => {
  return users.find(cb);
};

export const findMany = async (
  cb?: (user: User) => boolean
): Promise<User[]> => {
  if (cb) {
    return users.filter(cb);
  }
  return users;
};

export const createOne = async (user: User): Promise<User> => {
  const id = Date.now().toString();
  const newUser = { ...user, id };
  users.push(newUser);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  return newUser;
};

export const createMany = async (users: User[]): Promise<User[]> => {
  const newUsers = users.map((user) => {
    const id = Date.now().toString();
    return { ...user, id };
  });
  users.push(...newUsers);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  return users;
};

export const updateOne = async (
  id: string,
  user: Partial<User>
): Promise<User> => {
  const index = users.findIndex((u) => u.id === id);
  users[index] = { ...users[index], ...user };
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  return users[index];
};

export const updateMany = async (
  cb: (user: User) => boolean,
  user: Partial<User>
): Promise<User[]> => {
  users.forEach((u, i) => {
    if (cb(u)) {
      users[i] = { ...u, ...user };
    }
  });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  return users;
};

export const deleteById = async (id: string): Promise<User> => {
  const index = users.findIndex((u) => u.id === id);
  const deletedUser = users[index];
  users.splice(index, 1);
  await fs.promises.writeFile(usersPath, JSON.stringify(users, null, 2));
  return deletedUser;
};

export const deleteMany = async (
  cb: (user: User) => boolean
): Promise<User[]> => {
  users.forEach((u, i) => {
    if (cb(u)) {
      users.splice(i, 1);
    }
  });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  return users;
};
