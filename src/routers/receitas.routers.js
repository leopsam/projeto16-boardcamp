import { Router } from "express";
import {
  apagarUmaReceita,
  atualizarUmaReceita,
  buscarReceitaPorId,
  buscarReceitas,
  criarReceita,
} from "../controllers/receitas.controllers.js";

import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { receitaSchema } from "../models/receita.model.js";

const router = Router();

router.get("/receitas", buscarReceitas);
router.get("/receitas/:id", buscarReceitaPorId);
router.post("/receitas", validateSchema(receitaSchema), criarReceita);
router.delete("/receitas/:idReceita", apagarUmaReceita);

router.put("/receitas/:id", atualizarUmaReceita);

export default router;
