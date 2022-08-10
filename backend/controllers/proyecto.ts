import { Request, Response } from 'express';
import { Proyecto } from '../models/Proyecto';
import { Tarea } from '../models/Tarea';

export const obtenerProyectos = async (req: Request, res: Response) => { 
  const { _id } = req.usuario;

  try {
    const proyectos = await Proyecto.find().where({ creador: _id });
    res.status(200).json(proyectos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al obtener los proyectos',
      error
    });
  }
}

export const obtenerProyecto = async (req: Request, res: Response) => { 
  const { id } = req.params;
  
  try {
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
      const error = new Error('El proyecto no ha sido encontrado');
      return res.status(404).json({
        ok: false,
        msg: error.message,
      });
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('No tienes permisos para ver este proyecto');
      return res.status(401).json({
        ok: false,
        msg: error.message,
      });
    }

    const tareas = await Tarea.find().where({ proyecto: proyecto._id });

    res.status(200).json({
      proyecto,
      tareas
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al obtener el proyecto solicitado',
      error
    });
  }
}

export const nuevoProyecto = async (req: Request, res: Response) => { 
  const { nombre, descripcion, cliente } = req.body;
  const { _id } = req.usuario;

  try {
    const proyecto = new Proyecto({ nombre, descripcion, cliente });
    proyecto.creador = _id;
    await proyecto.save();

    res.status(201).json(proyecto);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al crear proyecto',
      error
    });
  }
}

export const editarProyecto = async (req: Request, res: Response) => { 
  const { id } = req.params;
  const { nombre, descripcion, cliente } = req.body;

  try {
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
      const error = new Error('El proyecto no ha sido encontrado');
      return res.status(404).json({
        ok: false,
        msg: error.message,
      });
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('No tienes permisos para actualizar este proyecto');
      return res.status(401).json({
        ok: false,
        msg: error.message,
      });
    }

    proyecto.nombre = nombre || proyecto.nombre;
    proyecto.descripcion = descripcion || proyecto.descripcion;
    proyecto.cliente = cliente || proyecto.cliente;
    await proyecto.save();

    res.status(200).json(proyecto);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al actualizar el proyecto',
      error
    });
  }
}

export const eliminarProyecto = async (req: Request, res: Response) => { 
  const { id } = req.params;

  try {
    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
      const error = new Error('El proyecto no ha sido encontrado');
      return res.status(404).json({
        ok: false,
        msg: error.message,
      });
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('No tienes permisos para eliminar este proyecto');
      return res.status(401).json({
        ok: false,
        msg: error.message,
      });
    }

    await proyecto.deleteOne();
    res.status(200).json({
      ok: true,
      msg: 'El proyecto ha sido eliminado correctamente',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Error al eliminar el proyecto',
      error
    });
  }
}

export const agregarColaborador = async (req: Request, res: Response) => { 

}

export const eliminarColaborador = async (req: Request, res: Response) => { 

}