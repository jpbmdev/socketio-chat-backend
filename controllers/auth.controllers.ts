import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    

    res.json({
      email,
      password,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administradot",
    });
  }
};

export const login = async (req: Request, res: Response) => {
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
