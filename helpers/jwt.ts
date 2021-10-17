import jwt from "jsonwebtoken";

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
