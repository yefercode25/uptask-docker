export interface IAlertaValues {
  msg: string;
  error: boolean;
}

export interface IProyectoValues { 
  id?: string;
  nombre: string;
  descripcion: string;
  fechaEntrega: string;
  cliente: string;
}

export interface IProyectoSaveValues {
  _id: string;
  nombre: string;
  descripcion: string;
  fechaEntrega: string;
  cliente: string;
  colaboradores: any[];
  creador: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IProyectoInfoValues { 
  proyecto: IProyectoSaveValues;
  tareas: any[];
}