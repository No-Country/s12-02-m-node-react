export default function orderedByDate (events) {
/*   const now = Date.now()
  const eventsToOrder = events.filter(event => {
    const eventStartDate = Date.parse(event.dates.start)
    return eventStartDate > now
  })
 */
  const orderedEvents = events.sort((a, b) => {
    const dateA = Date.parse(a.dates.start);
    const dateB = Date.parse(b.dates.start);
    return dateA - dateB;
  });

  return orderedEvents;
};