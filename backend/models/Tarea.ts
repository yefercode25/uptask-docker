import mongoose from 'mongoose';

export interface ITareaModel {
  nombre: string;
  descripcion: string;
  estado: boolean;
  fechaEntrega: Date;
  prioridad: string;
  proyecto: mongoose.Schema.Types.ObjectId;
}

const tareaSchema = new mongoose.Schema<ITareaModel>({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  fechaEntrega: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  prioridad: {
    type: String,
    required: true,
    enum: ['Baja', 'Media', 'Alta'],
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyecto',
    required: true,
  }
}, { timestamps: true });

export const Tarea = mongoose.model<ITareaModel>('Tarea', tareaSchema);