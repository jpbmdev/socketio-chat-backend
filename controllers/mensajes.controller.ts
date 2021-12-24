import { Request, Response } from "express";
import Mensaje from "../models/mensaje";

export const obtenerChat = async (req: Request, res: Response) => {
  const miId = req.uid;
  const mensajesDe = req.params.id;

  const last30 = await Mensaje.find({
    $or: [
      { de: miId, para: mensajesDe },
      { de: mensajesDe, para: miId },
    ],
  })
    .sort({ createdAt: "asc" })
    .limit(30);

  res.json({
    ok: true,
    mensajes: last30,
  });
};
