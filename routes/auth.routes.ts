import { Router } from "express";

const router = Router();

//Crear nuevos usuarios
router.post("/new", (req, res) => {
  res.json({
    ok: true,
    msg: "new",
  });
});

//Login
router.post("/", (req, res) => {
  res.json({
    ok: true,
    msg: "login",
  });
});

//Revaliar Token
router.get("/renew", (req, res) => {
  res.json({
    ok: true,
    msg: "renew",
  });
});

export default router;
