import { Server } from "socket.io";

class Sockets {
  io: Server;

  constructor(io: Server) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      // Escuchar evento: mensaje-to-server
      socket.on("mensaje-to-server", (data: string) => {
        //TODO: validar el JWT
        //Si el token no es valido, desconectar
        //TODO: Saber que usuario esta activo mediante el UID
        //TODO: Emitir todos los usuairos conectados
        //TODO: Socket join
        //TODO: Escuchar cuando cliente manda mensaje
        //TODO: Disconnect
        //TODO: Emitir todos los usuarios conectados
      });
    });
  }
}

export default Sockets;
