import { Router } from "express";
import { criarCliente, buscarCliente, buscarClientePorId, atualizarCliente } from "../controllers/clientes.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { clienteSchema } from "../schemas/cliente.model.js";

const router = Router();

router.get("/customers", buscarCliente);
router.get("/customers/:id", buscarClientePorId);
router.post("/customers", validateSchema(clienteSchema), criarCliente);
router.put("/customers/:id", validateSchema(clienteSchema), atualizarCliente);

export default router;
