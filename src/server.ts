import fastify from "fastify";
import setupErrorHandling from "./middlewares/error-handling.middleware";
import controllers from "./controllers";

const server = fastify();
setupErrorHandling(server);

controllers.forEach(({ endpoint, controller }) => {
  server.register(controller, { prefix: endpoint });
});

server.listen({ port: 4869 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
