import { AuthenticationError } from "apollo-server-express";
import moment from "moment";
import { decryptToken } from "./crypto";
import { ApolloError } from "apollo-server-errors";
const jwt = require("jsonwebtoken");

const checkAuth = async (context: any) => {
  if (!context.req.headers.authorization) {
    throw new ApolloError(`Permission Denied`);
  }
  // context = { ...headers }

  const authHeader = await decryptToken(context.req.headers.authorization);

  if (authHeader) {
    // convention for tokens: "Bearer ..."
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.ADMIN_JWT);

        console.log(user);
        return user;
      } catch (err) {
        console.log(err);
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error(`Authentication token must be 'Bearer [token]'`);
  }
  // TODO: Add better error handling
  throw new Error(`Permission Denied`);
};

export default checkAuth;
