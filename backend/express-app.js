import express from "express";
import cors from "cors";
import user from "./api/user.js";
import HandleErrors from "./utils/error-handler.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";

const expressApp = async (app) => {
  // Create an HTTP server and pass the Express app to it
  const server = http.createServer(app);

  // Initialize Socket.IO with the HTTP server
  const io = new Server(server, {
    cors: {
      origin: [process.env.MAIN_BACKEND_URL, process.env.FRONTEND_URL],
      methods: ["GET", "POST", "UPDATE", "DELETE"],
      credentials: true,
    },
  });

  // Apply middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(
    cors({
      origin: [process.env.MAIN_BACKEND_URL, process.env.FRONTEND_URL, process.env.FRONTEND_URL2],
      methods: ["GET", "POST", "UPDATE", "DELETE"],
      credentials: true,
    })
  );
  app.use(cookieParser());

  // Initialize API routes with Socket.IO
  user(app);

  // Error handling middleware
  app.use(HandleErrors);

  // Return the server to be used outside this function
  return server;
};

export default expressApp;
