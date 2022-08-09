declare namespace Express {
  interface UserRequest {
    nombre: string;
    email: string;
  }

  export interface Request {
    usuario: UserRequest;
  }
}