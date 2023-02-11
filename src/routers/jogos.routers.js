import { Router } from "express";
import { buscarJogos, criarJogo, } from "../controllers/jogos.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { jogoSchema } from "../schemas/jogo.model.js";

const router = Router();

router.get("/receitas", buscarJogos);
router.post("/receitas", validateSchema(jogoSchema), criarJogo);

export default router;
