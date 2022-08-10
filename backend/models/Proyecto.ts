import mongoose from 'mongoose';

export interface IProyectoModel {
  _id?: mongoose.Types.ObjectId;
  nombre: string;
  descripcion: string;
  fechaEntrega: Date;
  cliente: string;
  creador: mongoose.Schema.Types.ObjectId;
  colaboradores: mongoose.Schema.Types.ObjectId[];
}

const proyectoSchema = new mongoose.Schema<IProyectoModel>({
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  descripcion: {
    type: String,
    trim: true,
    required: true,
  },
  fechaEntrega: {
    type: Date,
    default: Date.now(),
  },
  cliente: {
    type: String,
    trim: true,
    required: true,
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  colaboradores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
    }
  ]
}, { timestamps: true });

export const Proyecto = mongoose.model<IProyectoModel>('Proyecto', proyectoSchema);