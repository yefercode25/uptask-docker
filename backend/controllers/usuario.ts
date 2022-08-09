import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';

export const registrar = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;
  const existeUsuario = await Usuario.findOne({ email });
  if (existeUsuario) {
    const error = new Error('El usuario ya existe');
    return res.status(400).json({ 
      ok: false,
      msg: error.message
    });
  }

  try {
    const usuario = new Usuario({ nombre, email, password });
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al registrar usuario',
      error
    });
  }
}