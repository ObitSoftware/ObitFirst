function obtenerHoraExacta() {
    const ahora = new Date();
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
  
    // Asegurar que las horas y los minutos tengan dos dígitos
    horas = horas < 10 ? `0${horas}` : horas;
    minutos = minutos < 10 ? `0${minutos}` : minutos;
  
    // Formato: HH:mm
    const horaExacta = `${horas}:${minutos}`;
  
    return horaExacta;
  }

  export default obtenerHoraExacta;