export const formaterFecha = (fecha: string): string => {
  const fechaFormateada = new Date(fecha);
  return fechaFormateada.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
}