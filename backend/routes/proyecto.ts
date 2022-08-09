import { Router } from 'express';
import { checkAuth } from '../middlewares';

import {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarColaborador,
  obtenerTareas,
  agregarColaborador,
  eliminarProyecto
} from '../controllers/proyecto';

const router = Router();

router.route('/')
  .get(checkAuth, obtenerProyectos)
  .post(checkAuth, nuevoProyecto);

router.route('/:id')
  .get(checkAuth, obtenerProyecto)
  .put(checkAuth, editarProyecto)
  .delete(checkAuth, eliminarProyecto);

router.get('/tareas/:id', checkAuth, obtenerTareas);
router.post('/agregar-colaborador/:id', checkAuth, agregarColaborador);
router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaborador);

export default router;