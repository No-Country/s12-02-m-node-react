import { useEffect, useState } from "react";

import Categories from "../../molecules/categories";
import CreateEvent from "../../molecules/createEvent";
import Hero from "../../molecules/hero";
import EventosEnLinea from "../../organisms/eventosEnLinea";
import ProximosEventos from "../../organisms/proximosEventos";
import DependingOnLocation from "../../molecules/dependingonlocation";

import useFetch from "../../../hooks/useFetch";
import {useSelector} from 'react-redux'

import { heroData, dataCard } from "./mockData";

function Home() {
  const [eventsRes, eventsStatus, fetchEvents] = useFetch();
  const [onlineEventsRes, onlineEventsStatus, fetchOnlineEvents] = useFetch();

  const [onlineEvents, setOnlineEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const isLogged = useSelector((state) => state.user.isLogged)

  /* ?category=música */
  useEffect(() => {
    fetchEvents({ path: "/event", method: "GET" });
    fetchOnlineEvents({ path: "event/?modality=en-linea", method: "GET" });
  }, []);

  useEffect(() => {
    if (eventsStatus.success) {
      const orderedByDate = eventsRes.data.document.sort((a, b) => {
      const orderedByDate = eventsRes.data.document.sort((a, b) => {
        const aDate = a.dates.start.split("-")[2];
        const bDate = b.dates.start.split("-")[2];
        return bDate - aDate;
      });
      setUpcomingEvents(orderedByDate.splice(0, 5));
    }
    if (onlineEventsStatus.success) {
      const onlineEventsFiltered = onlineEventsRes.data.document.splice(0, 4);
      setOnlineEvents(onlineEventsFiltered);
    }
  }, [eventsStatus, onlineEventsRes]);
  return (
    <main className="w-full h-full">
      <Hero events={heroData} />
      <Categories />
      <DependingOnLocation cardsInfo={Array(8).fill(dataCard)} />
      <ProximosEventos cardsInfo={upcomingEvents} />
      <EventosEnLinea cardsInfo={onlineEvents} />
      {isLogged && (<CreateEvent />)}
    </main>
  );
}

export default Home;
