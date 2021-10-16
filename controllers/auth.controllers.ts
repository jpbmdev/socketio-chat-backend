import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const crearUsuario = async (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: "new",
  });
};

export const login = async (req: Request, res: Response) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errores.mapped(),
    });
  }
  const { email, password } = req.body;
  res.json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

export const renewToken = async (req: Request, res: Response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};
