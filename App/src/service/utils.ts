export function formatDate(date: Date) {
  try {
    const dataObj = new Date(date);

    // Formatando para o padrão brasileiro de data e hora
    const dataNormal = dataObj.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  
    return dataNormal;
  } catch (error: any) {
    return ''
  }
}
