import { Router } from "express";
import { criarAluguel } from "../controllers/alugueis.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { AlugueiSchema } from "../schemas/alugueis.model.js";

const router = Router();

//router.get("/customers", buscarCliente);
//router.get("/customers/:id", buscarClientePorId);
router.post("/rentals", validateSchema(AlugueiSchema), criarAluguel);
//router.put("/customers/:id", validateSchema(clienteSchema), atualizarCliente);

export default router;
