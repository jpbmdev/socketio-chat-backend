import { Server } from "socket.io";
import {
  getUsuarios,
  guardarMensaje,
  usuarioConectado,
  usuarioDesconectado,
} from "../controllers/sockets";
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

      //Unir al usuario a una sala de socket.io
      socket.join(uid);

      //TODO: validar el JWT
      //Si el token no es valido, desconectar
      //TODO: Saber que usuario esta activo mediante el UID
      //TODO: Emitir todos los usuairos conectados
      this.io.emit("lista-usuarios", await getUsuarios());
      //TODO: Socket join
      //TODO: Escuchar cuando cliente manda mensaje
      socket.on(
        "mensaje-personal",
        async (payload: { de: string; para: string; mensaje: string }) => {
          const mensaje = await guardarMensaje(payload);
          this.io.to(payload.para).emit("mensaje-personal", mensaje);
          this.io.to(payload.de).emit("mensaje-personal", mensaje);
        }
      );
      //TODO: Disconnect
      //TODO: Emitir todos los usuarios conectados
      socket.on("disconnect", async () => {
        await usuarioDesconectado(uid);
        this.io.emit("lista-usuarios", await getUsuarios());
      });
    });
  }
}

export default Sockets;
