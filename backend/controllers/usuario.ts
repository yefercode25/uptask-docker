import { Request, Response } from 'express';
import { Usuario } from '../models/Usuario';
import { generarId, generarJwt } from '../helpers';

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
    usuario.token = generarId();
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

export const autenticar = async (req: Request, res: Response) => { 
  const { email, password } = req.body;
  
  try {
    const usuario = await Usuario.findOne({ email });
    if(!usuario) {
      const error = new Error(`El usuario con el correo ${email} no existe`);
      return res.status(404).json({
        ok: false,
        msg: error.message
      });
    }

    if(!usuario.confirmado) {
      const error = new Error(`El usuario con el correo ${email} no ha confirmado su cuenta`);
      return res.status(403).json({
        ok: false,
        msg: error.message
      });
    }

    if(!(await usuario.comprobarPassword(password))) {
      const error = new Error('La contraseña ingresada es incorrecta');
      return res.status(401).json({
        ok: false,
        msg: error.message
      });
    }

    res.status(200).json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJwt({ _id: usuario._id })
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al autenticar usuario',
      error
    });
  }
}