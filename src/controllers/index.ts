import { FastifyPluginCallback } from "fastify";

import userController from "./user.controller";

interface Controller {
  endpoint: string;
  controller: FastifyPluginCallback;
}

const controllers: Controller[] = [
  { endpoint: "/api/users", controller: userController },
];

export default controllers;
