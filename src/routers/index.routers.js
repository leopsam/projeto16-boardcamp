import { Router } from "express";
import receitasRouters from "./receitas.routers.js";
import categoriasRouters from "./categorias.routers.js";

const router = Router();

router.use(categoriasRouters);
router.use(receitasRouters);



export default router;