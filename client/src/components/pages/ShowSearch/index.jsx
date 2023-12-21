import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../atoms/eventCard';
import axios from 'axios';

const ShowSearch = () => {
  const { searchValue } = useParams(); 
  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventos = (await axios.get(`/event`)).data.data.document;
        const filteredEvents = eventos.filter(event =>
            event.title.toLowerCase().includes(searchValue.toLowerCase())
          );
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
      }
    };

    fetchData();

    setShowEvents(true);
  }, [searchValue]);

  useEffect(() => {
    setShowEvents(true);
}, [events])

const renderHeader = () => {
  let title;
  title = 'Se buscó: ' + `"${searchValue}"`;
  return title;
  }

    return (
      <div className="w-full">
<h1 className="text-start mb-3 text-4xl p-3 border-b-2">
          {renderHeader()}
        </h1>
          <div className="w-full">
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

export default ShowSearch;
