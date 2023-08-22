import express from "express";
import { createServer } from "http";
import { PubSub } from "graphql-subscriptions";

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import bodyParser from "body-parser";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/types";

const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require("graphql-upload");

// Asnychronous Anonymous Function
// Inside of server.ts -> await keyword
require("dotenv").config();
(async function () {
  // Server code in here!
  const path = require("path");
  const directoryToServe = "client";

  const pubsub = new PubSub(); // Publish and Subscribe, Publish -> everyone gets to hear it
  const app = express();
  const httpServer = createServer(app);
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use("/assert", express.static(path.join(__dirname, "..", "public")));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  app.use("./", express.static(path.join(__dirname, ".", directoryToServe)));

  // This middleware should be added before calling `applyMiddleware`.

  // GraphQL Typedefs and resolvers

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // ws Server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/", // localhost:3000/graphql
  });

  const serverCleanup = useServer({ schema }, wsServer); // dispose

  // apollo server
  const server = new ApolloServer({
    csrfPrevention: false,
    schema,

    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  // start our server
  await server.start();

  // apply middlewares (cors, expressmiddlewares)
  app.use(
    "/",
    cors<cors.CorsRequest>({ credentials: true }),
    graphqlUploadExpress({ maxFileSize: 50000000, maxFiles: 10 }),

    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    })
  );

  // http server start
  httpServer.listen(process.env.ADMIN_PORT, () => {
    console.log(
      `Server running on http://localhost:${process.env.ADMIN_PORT} `
    );
  });
})();
