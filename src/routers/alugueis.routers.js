import { Router } from "express";
import { criarAluguel, buscarAlugueis, finalizarAluguelPorId } from "../controllers/alugueis.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { AlugueiSchema } from "../schemas/alugueis.model.js";

const router = Router();

router.get("/rentals", buscarAlugueis);
//router.get("/customers/:id", buscarClientePorId);
router.post("/rentals", validateSchema(AlugueiSchema), criarAluguel);
router.post("/rentals/:id", finalizarAluguelPorId);
//router.put("/customers/:id", validateSchema(clienteSchema), atualizarCliente);

export default router;
