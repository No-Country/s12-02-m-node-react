import React, { useEffect, useState } from 'react';
import useFetch from "../../../hooks/useFetch";
import { Card } from '../../atoms/eventCard';
import UserIcon from '../../atoms/userIcon';

function MyEvents() {
  const [events, setEvents] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));
  const email = userData.email;

  const [eventsRes, eventsStatus, fetchEvents] = useFetch();

  console.log('Respuesta de la solicitud2:', eventsRes);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEvents({ path: `/event?email=${email}`, method: "GET" });
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
    <div className="w-full">
      <div className='flex items-center mb-4 pl-8 pt-10'>
        <UserIcon imgUrl={userData.picture} />
        <div className="ml-3">
          <p>{`${userData.names} ${userData.lastname}`}</p>
          {eventsRes && eventsRes.data && (
            <p className="text-blue-500">Mis eventos: {eventsRes.data.total}</p>
          )}
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-center mb-3 text-4xl">Mis eventos</h1>
        {eventsStatus.loading ? (
          <p>Cargando eventos...</p>
        ) : eventsStatus.error ? (
          <p>Error al cargar eventos</p>
        ) : (
          <div className="w-full flex justify-center flex-wrap">
            {events.map((event) => (
              <div key={event._id} style={{ marginBottom: '20px', maxWidth: '250px' }}>
                <Card info={event} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyEvents;




