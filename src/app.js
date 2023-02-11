import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routers from "./routers/index.routers.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(routers);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));
