import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.middleware";

/*  
  Path: api/mensajes
*/

const router = Router();

router.get("/:id", validarJWT, );

export default router;
