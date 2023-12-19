import React, { useEffect, useState } from 'react';
import useFetch from "../../../hooks/useFetch";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));
  const email = userData.email;

  const [eventsRes, eventsStatus, fetchEvents] = useFetch();

  console.log('Respuesta de la solicitud:', eventsRes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEvents({ path:`/event?email=${email}`, method: "GET" });
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, [email]);

  useEffect(() => {
    if (eventsStatus.success) {
      const data2 = eventsRes.data?.document || []; // Asegúrate de tener un array incluso si no hay datos
      setEvents(data2);
    }
  }, [eventsRes, eventsStatus]);

  return (
    <div>
      <h1>Mis eventos</h1>
      {eventsStatus.loading ? (
        <p>Cargando eventos...</p>
      ) : eventsStatus.error ? (
        <p>Error al cargar eventos</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              {/* Render each event data here */}
              {event.description} - {event.email} {/* Reemplaza con las propiedades reales del evento */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyEvents;




