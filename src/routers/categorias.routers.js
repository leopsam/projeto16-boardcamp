import { Router } from "express";
import {
  buscarCategorias,
  criarCategoria,
  buscarCategoriaPorId,
} from "../controllers/categorias.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { categoriaSchema } from "../models/categoria.model.js";

const router = Router();

router.post("/categorias", validateSchema(categoriaSchema), criarCategoria);
router.get("/categorias", buscarCategorias);
router.get("/categorias/:id", buscarCategoriaPorId);

export default router;
