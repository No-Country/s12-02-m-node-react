export function formatDate({ date, type = "full" }) {
  if (type === "full") {
    return new Intl.DateTimeFormat("es", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  } else if (type === "Y-M") {
    return new Intl.DateTimeFormat("es", {
      year: "numeric",
      month: "long",
    }).format(date);
  } else if (type === "D-M") {
    return new Intl.DateTimeFormat("es", {
      month: "long",
      day: "numeric",
    }).format(date);
  }
}

export default function renderDate (dates) {
  let message;
  if (Object.hasOwn(dates, "end")) {
    const startDate = new Date(dates.start);
    const endDate = new Date(dates.end);

    const sameYear = startDate.getFullYear() === endDate.getFullYear();
    const sameMonth = startDate.getMonth() === endDate.getMonth();
    const sameDay = startDate.getDate() === endDate.getDate();

    if (sameYear && sameMonth && sameDay) {
      /*Por el calendario que se usa es posible que el usuario seleccione la misma fecha para ambos campos, de confirmarse que no es posible esta validacion sobra */
      message = formatDate({ date: startDate });
    } else if (sameYear && sameMonth && !sameDay) {
      const startDay = startDate.getDate();
      const endDay = endDate.getDate();
      const restDate = formatDate({ date: startDate, type: "Y-M" });

      message = `${startDay} al ${endDay} de ${restDate}`;
    } else if (sameYear && !sameMonth) {
      const startingDate = formatDate({ date: startDate, type: "D-M" });
      const endingDate = formatDate({ date: endDate, type: "full" });

      message = `${startingDate} al ${endingDate}`;
    } else {
      /* Diferente año mes y dia */
      const startingDate = formatDate({ date: startDate, type: "full" });
      const endingDate = formatDate({ date: endDate, type: "full" });

      message = `${startingDate} al ${endingDate}`;
    }
  } else {
    const date = new Date(dates.start);
    const dateFormatted = formatDate({ date: date, type: "full" });

    message = `${dateFormatted}`;
  }

  // console.log("Fecha : ", message);
  return message;
};