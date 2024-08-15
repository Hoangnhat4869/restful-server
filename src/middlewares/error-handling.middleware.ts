import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export const errorHandler = async (
  error: Error,
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  const statusCode = reply.statusCode || 500;
  const message = error.message || "Internal server error";
  reply.status(statusCode).send({ error: message });
};

export default function setupErrorHandling(server: FastifyInstance) {
  server.setErrorHandler(errorHandler);
}
