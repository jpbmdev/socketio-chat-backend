import { Router } from "express";
import { check } from "express-validator";
import {
  crearUsuario,
  login,
  renewToken,
} from "../controllers/auth.controllers";
import { validarCampos } from "../middlewares/validar-campos.middleware";

/*  
  Path: api/login
*/

const router = Router();

//Crear nuevos usuarios
router.post(
  "/new",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearUsuario
);

//Login
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);

//Revaliar Token
router.get("/renew", renewToken);

export default router;
