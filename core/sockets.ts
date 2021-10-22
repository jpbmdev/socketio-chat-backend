import { Server } from "socket.io";
import { usuarioConectado, usuarioDesconectado } from "../controllers/sockets";
import { comprobarJWT } from "../helpers/jwt";

class Sockets {
  io: Server;

  constructor(io: Server) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      const [valido, uid] = comprobarJWT(socket.handshake.query["x-token"])!;

      if (!valido) {
        console.log("Cliente Rechazado");
        return socket.disconnect();
      }
      await usuarioConectado(uid);

      //TODO: validar el JWT
      //Si el token no es valido, desconectar
      //TODO: Saber que usuario esta activo mediante el UID
      //TODO: Emitir todos los usuairos conectados
      //TODO: Socket join
      //TODO: Escuchar cuando cliente manda mensaje
      //TODO: Disconnect
      //TODO: Emitir todos los usuarios conectados
      socket.on("disconnect", async () => {
        await usuarioDesconectado(uid);
      });
    });
  }
}

export default Sockets;
