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
        console.log(data);

        this.io.emit("mensaje-from-server", data);
      });
    });
  }
}

export default Sockets;
