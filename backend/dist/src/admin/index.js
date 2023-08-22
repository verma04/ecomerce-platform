"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ApolloServer, PubSub } = require("apollo-server-express");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const resolvers = require("./graphql/resolvers");
const { GraphQLUpload, graphqlUploadExpress, // A Koa implementation is also exported.
 } = require("graphql-upload");
const PORT = process.env.port || 4000;
const path = require("path");
const directoryToServe = "client";
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/assert", express.static(path.join(__dirname, "..", "public")));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
}));
app.use("./", express.static(path.join(__dirname, ".", directoryToServe)));
// This middleware should be added before calling `applyMiddleware`.
app.use(graphqlUploadExpress());
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        //   const server = new ApolloServer({
        //     typeDefs: types,
        //     resolvers,
        //     cors: {
        //       origin: true,
        //     },
        //     context: ({ req }: any) => ({ req }),
        //   });
        //   await server.start();
        //   server.applyMiddleware({ app });
    });
}
startServer();
app.listen(process.env.PORT, function () {
    console.log(`Server ready at port ${process.env.PORT}`);
});
