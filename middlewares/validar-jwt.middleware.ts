import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_Payload } from "../interfaces/jwt-payload";

export const validarJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-token");
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No hay token en la peticion",
      });
    }
    if (process.env.JWT_KEY) {
      const { uid } = jwt.verify(token, process.env.JWT_KEY) as JWT_Payload;
      req.uid = uid;
      next();
    } else {
      throw new Error();
    }
  } catch (e) {
    return res.status(401).json({
      ok: false,
      msg: "Toker no es valido",
    });
  }
};
