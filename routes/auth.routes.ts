import { Router } from "express";
import { check } from "express-validator";
import {
  crearUsuario,
  login,
  renewToken,
} from "../controllers/auth.controllers";

/*  
  Path: api/login
*/

const router = Router();

//Crear nuevos usuarios
router.post("/new", crearUsuario);

//Login
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
  ],
  login
);

//Revaliar Token
router.get("/renew", renewToken);

export default router;
