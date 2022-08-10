import { Request, Response } from 'express';
import { Proyecto, IProyectoModel } from '../models/Proyecto';
import { Tarea } from '../models/Tarea';

export const obtenerTarea = async (req: Request, res: Response) => {
  const { id } = req.params;

  try { 
    const tarea = await Tarea.findById(id).populate('proyecto');
    if(!tarea) {
      const error = new Error('La tarea solicitada no existe');
      return res.status(404).json({
        ok: false,
        msg: error.message,
      });
    }

    if((tarea.proyecto as IProyectoModel).creador.toString() !== req.usuario._id.toString()) {
      const error = new Error('No tienes permisos para ver esta tarea');
      return res.status(401).json({
        ok: false,
        msg: error.message,
      });
    }

    res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: 'Error al obtener la tarea',
      error
    });
  }
}

export const agregarTarea = async (req: Request, res: Response) => {
  const { nombre, descripcion, prioridad, proyecto } = req.body;

  try {
    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
      const error = new Error('El proyecto donde se agregará la tarea no existe');
      return res.status(404).json({
        ok: false,
        msg: error.message
      });
    }
    
    if(existeProyecto.creador.toString() !== req.usuario._id.toString()){
      const error = new Error('No tienes permisos para agregar tareas en este proyecto');
      return res.status(401).json({
        ok: false,
        msg: error.message
      });
    }

    const tarea = await Tarea.create({ nombre, descripcion, prioridad, proyecto });
    
    return res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al agregar la nueva tarea'
    });
  }
}

export const editarTarea = async (req: Request, res: Response) => {
  const { nombre, descripcion, prioridad, fechaEntrega } = req.body;
  const { id } = req.params;

  try {
    const tarea = await Tarea.findById(id).populate('proyecto');
    if(!tarea) {
      const error = new Error('La tarea no existe');
      return res.status(404).json({
        ok: false,
        msg: error.message
      });
    }

    if((tarea.proyecto as IProyectoModel).creador.toString() !== req.usuario._id.toString()){
      const error = new Error('No tienes permisos para editar esta tarea');
      return res.status(401).json({
        ok: false,
        msg: error.message
      });
    }

    tarea.nombre = nombre || tarea.nombre;
    tarea.descripcion = descripcion || tarea.descripcion;
    tarea.prioridad = prioridad || tarea.prioridad;
    tarea.fechaEntrega = fechaEntrega || tarea.fechaEntrega;

    await tarea.save();

    res.json(tarea);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al editar la tarea'
    });
  }
}

export const eliminarTarea = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tarea = await Tarea.findById(id).populate('proyecto');
    if(!tarea) {
      const error = new Error('La tarea a eliminar no existe');
      return res.status(404).json({
        ok: false,
        msg: error.message
      });
    }

    if((tarea.proyecto as IProyectoModel).creador.toString() !== req.usuario._id.toString()){
      const error = new Error('No tienes permisos para eliminar esta tarea');
      return res.status(401).json({
        ok: false,
        msg: error.message
      });
    }

    await tarea.deleteOne();

    res.json({
      ok: true,
      msg: 'Tarea eliminada'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al eliminar la tarea'
    });
  }
}

export const cambiarEstado = async (req: Request, res: Response) => {

}