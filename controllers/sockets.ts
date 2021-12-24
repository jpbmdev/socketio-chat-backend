import Usuario from "../models/usuario";
import Mensaje from "../models/mensaje";

export const usuarioConectado = async (uid: any) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = true;
  await usuario.save();
  return usuario;
};

export const usuarioDesconectado = async (uid: any) => {
  const usuario = await Usuario.findById(uid);
  usuario.online = false;
  await usuario.save();
  return usuario;
};

export const getUsuarios = async () => {
  const usuarios = await Usuario.find().sort("-online");
  return usuarios;
};

export const guardarMensaje = async (payload: {
  de: string;
  para: string;
  mensaje: string;
}) => {
  try {
    const mensaje = new Mensaje(payload);
    await mensaje.save();
    return mensaje;
  } catch (error) {}
};
