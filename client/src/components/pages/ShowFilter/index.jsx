import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../atoms/eventCard';
import axios from 'axios';

const ShowFilter = () => {
  const { category } = useParams(); 
  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const eventos = (await axios.get(`/event?category=${category}`)).data.data.document;
              console.log(eventos)
              setEvents(eventos)
              }
           catch (error) {
              console.error("Error al obtener las reservas:", error);
          }
        }

      fetchData();
      
      setShowEvents(true)
  }, [category]);

  useEffect(() => {
    setShowEvents(true);
}, [events])


    return (
      <div className="w-full">

          <div className="w-full">
              <h1 className="text-center mb-3 text-4xl">Filtro x {category.toUpperCase()}</h1>
              {showEvents &&
                  <div className="w-full flex justify-center flex-wrap">
                      {events.map((event) => (
                          <div key={event._id} style={{ marginBottom: '20px', maxWidth: '250px' }}>
                              <Card info={event} />
                          </div>
                      ))}
                  </div>
              }
          </div>
      </div>
  );

}

export default ShowFilter;
