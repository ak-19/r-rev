import express from "express";
import { startDatabase } from "./startDatabase.js";
import {
  makeExpressApp,
  setupRoutes,
  setupPassport,
} from "./constructServer.js";

async function startServer() {
  await startDatabase();
  const app = await makeExpressApp(express);
  await setupRoutes(app);
  await setupPassport(app);
  const serverPort = process.env.PORT || 3001;
  app.listen(serverPort, () =>
    console.log(`Backend server is listening at port ${serverPort}`)
  );
}

startServer();
