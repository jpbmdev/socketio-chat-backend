import jwt from "jsonwebtoken";
import { JWT_Payload } from "../interfaces/jwt-payload";

export const generarJWT = (uid: string) => {
  const payload = { uid };

  return new Promise((resolve, reject) => {
    if (process.env.JWT_KEY) {
      jwt.sign(
        payload,
        process.env.JWT_KEY,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            console.log(err);
            reject("No se puedo generar el JWT");
          } else {
            resolve(token);
          }
        }
      );
    } else {
      reject("No existe llave para generar los JWT");
    }
  });
};

export const comprobarJWT = (token = "") => {
  try {
    if (process.env.JWT_KEY) {
      const { uid } = jwt.verify(token, process.env.JWT_KEY) as JWT_Payload;
      return [true, uid];
    }
  } catch (error) {
    return [false, ''];
  }
};
