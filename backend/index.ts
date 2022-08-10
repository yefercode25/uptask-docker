import express, { Express } from 'express';
import dotenv from 'dotenv';
import { conectDB } from './config/db';

import usuarioRoutes from './routes/usuario';
import proyectoRoutes from './routes/proyecto';
import tareasRoutes from './routes/tarea';

dotenv.config();

const app: Express = express();
app.use(express.json());

conectDB();

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareasRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT} 🚀`);
});