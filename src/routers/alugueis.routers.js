import { Router } from "express"
import { criarAluguel, buscarAlugueis, finalizarAluguelPorId, deletarAluguelPorId } from "../controllers/alugueis.controllers.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { AlugueiSchema } from "../schemas/alugueis.model.js"

const router = Router()

router.get("/rentals", buscarAlugueis)
router.post("/rentals", validateSchema(AlugueiSchema), criarAluguel)
router.post("/rentals/:id/return", finalizarAluguelPorId)
router.delete("/rentals/:id", deletarAluguelPorId)

export default router
