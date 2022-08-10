import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { conectDB } from './config/db';

import usuarioRoutes from './routes/usuario';
import proyectoRoutes from './routes/proyecto';
import tareasRoutes from './routes/tarea';

dotenv.config();

const app: Express = express();
app.use(express.json());

// Configurar CORS
const whitelist = ['http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => { 
    if(!whitelist.includes(origin!)) {
      return callback(new Error('No tienes permiso para hacer peticiones a este servidor'));
    }
    
    callback(null, true);
  }
}));

conectDB();

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareasRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT} 🚀`);
});