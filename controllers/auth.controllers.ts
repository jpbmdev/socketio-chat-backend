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
      ok: true,
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

  try {
    //Verificar si el usuiaro existe
    const usuarioDb = await Usuario.findOne({ email });
    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "Email no encontrado",
      });
    }

    //Validar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDb.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Password no es correcto",
      });
    }

    //Generar el JWT
    const token = await generarJWT(usuarioDb.id);

    res.json({
      ok: true,
      usuario: usuarioDb,
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

export const renewToken = async (req: Request, res: Response) => {
  const uid = req.uid;

  //Generar un nuevo token
  const token = await generarJWT(uid);

  //Obtener el usuairo por id
  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    usuario,
    token,
  });
};
