import { Router } from 'express';
import { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/usuario';

const router = Router();

router.post('/', registrar);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token')
  .get(comprobarToken)
  .post(nuevoPassword);

export default router;