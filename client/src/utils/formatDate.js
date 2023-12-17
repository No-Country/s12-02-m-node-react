export default function formatDate({ date, type = "full" }) {
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
