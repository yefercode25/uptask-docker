import { Request, Response, Router } from 'express';
import { registrar } from '../controllers/usuario';

const router = Router();

router.post('/', registrar);

export default router;