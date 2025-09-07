import express from "express";
import routeHandler from "./routes/index.js";
import databaseConfig from "./config/databaseConfig.js";
const app = express();
const port = process.env.PORT || 8080;
await databaseConfig.connectToDatabase();
app.listen(port,() => {
    console.log("Server Listening On Port : " + port)
})
app.use(express.json());
app.use("/GTP-API/",routeHandler);