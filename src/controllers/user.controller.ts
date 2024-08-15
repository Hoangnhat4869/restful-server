import { FastifyPluginCallback } from "fastify";

import {
  authenticateUser,
  deleteUser,
  registerUser,
  updateUser,
} from "../services/user.service";
import { User } from "../types";
import userDtoSchema from "../dtos/user.dto";

const userController: FastifyPluginCallback = async (
  server,
  _options,
  done
) => {
  server.post<{ Body: User }>("/register", async (request, reply) => {
    const { error } = userDtoSchema.validate(request.body);

    if (error) {
      return reply.status(400).send({ status: 400, error: error.message });
    }

    const user = await registerUser(request.body);
    return reply.status(200).send({ status: 200, data: user });
  });

  server.post<{ Body: User }>("/login", async (request, reply) => {
    const token = await authenticateUser(request.body);
    return reply.status(200).send({ status: 200, data: token });
  });

  server.put<{ Body: Partial<User>; Params: { userId: string } }>(
    "/:userId",
    async (request, reply) => {
      const user = await updateUser(request.params.userId, request.body);
      return reply.status(200).send({ status: 200, data: user });
    }
  );

  server.delete<{ Params: { userId: string } }>(
    "/:userId",
    async (request, reply) => {
      const user = await deleteUser(request.params.userId);
      return reply.status(200).send({ status: 200, data: user });
    }
  );

  done();
};

export default userController;
