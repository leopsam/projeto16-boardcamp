import { Router } from "express";
import { criarCliente } from "../controllers/clientes.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { clienteSchema } from "../schemas/cliente.model.js";

const router = Router();

//router.get("/games", buscarJogos);
router.post("/customers", validateSchema(clienteSchema), criarCliente);

export default router;
