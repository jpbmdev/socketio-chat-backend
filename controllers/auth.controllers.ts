import { Request, Response } from "express";
import Usuario from "../models/usuario";
import * as bcrypt from "bcrypt";
import { generarJWT } from "../helpers/jwt";

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //Verificar si el usuario existe
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    const usuario = new Usuario(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar usuario en BD
    await usuario.save();

    //Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
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
