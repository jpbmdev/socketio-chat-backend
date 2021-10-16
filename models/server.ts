// Servidor de Express
import express from "express";
import { Express } from "express";
import http from "http";
import { Server as socketio } from "socket.io";
import path from "path";
import cors from "cors";
import { dbConnection } from "../database/config";
import AuthRoutes from "../routes/auth.routes";

import Sockets from "./sockets";

class Server {
  app: Express;
  port: string | undefined;
  server: http.Server;
  io: socketio;
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Conexion a la BD
    dbConnection();

    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = new socketio(this.server, {
      /* configuraciones */
    });
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // CORS
    this.app.use(cors());

    //Habilitar el body
    this.app.use(express.json());

    //API ENDPoints
    this.app.use("/api/login", AuthRoutes);
  }

  // Esta configuración se puede tener aquí o como propieda de clase
  // depende mucho de lo que necesites
  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar sockets
    this.configurarSockets();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

export default Server;
