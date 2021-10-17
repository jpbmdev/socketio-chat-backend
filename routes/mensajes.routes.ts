import { Router } from "express";
import { obtenerChat } from "../controllers/mensajes.controller";
import { validarJWT } from "../middlewares/validar-jwt.middleware";

/*  
  Path: api/mensajes
*/

const router = Router();

router.get("/:id", validarJWT, obtenerChat);

export default router;
