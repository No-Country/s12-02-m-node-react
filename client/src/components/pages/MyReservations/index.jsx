import React, { useEffect, useState } from 'react';
import useFetch from "../../../hooks/useFetch";
import { Card } from '../../atoms/eventCard';
import UserIcon from '../../atoms/userIcon';
import axios from 'axios';


function MyRservations() {
    const [events, setEvents] = useState([]);
    const userData = JSON.parse(localStorage.getItem('user'));
    const email = userData.email;
    const [showEvents, setShowEvents] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookings = await axios.get(`/bookings/all?email=${email}`);
                const eventsData = [];

                if (bookings.data.data.document && bookings.data.data.document.length > 0) {
                    for (let i = 0; i < bookings.data.data.document.length; i++) {
                        try {
                            const eventResponse = await axios.get(`/event/${bookings.data.data.document[i].event_ID}`);
                            eventsData.push(eventResponse.data.data);
                        } catch (error) {
                            console.error("Error al obtener el evento:", error);
                        }
                    }
                    setEvents(eventsData);
                }
            } catch (error) {
                console.error("Error al obtener las reservas:", error);
            }
        };
        fetchData();
    }, [email, setEvents]);


    useEffect(() => {
        setShowEvents(true);
    }, [events])

    return (
        <div className="w-full">
            <div className='flex items-center mb-4 pl-8 pt-10'>
                <UserIcon imgUrl={userData.picture} />
                <div className="ml-3">
                    <p>{`${userData.names} ${userData.lastname}`}</p>
                    {showEvents && (
                        <p className="text-blue-500">Mis Reservas: {events.length}</p>
                    )}
                </div>
            </div>
            <div className="w-full">
                <h1 className="text-center mb-3 text-4xl">Mis Reservas</h1>
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


export default MyRservations;