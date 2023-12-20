import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Categories from "../../molecules/categories";
import CreateEvent from "../../molecules/createEvent";
import Hero from "../../molecules/hero";
import EventosEnLinea from "../../organisms/eventosEnLinea";
import ProximosEventos from "../../organisms/proximosEventos";
import DependingOnLocation from "../../molecules/dependingonlocation";
import LoadingSkeleton from "../../atoms/loadingSkeleton";
import useFetch from "../../../hooks/useFetch";

import orderedByDate from "../../../utils/orderByDate";

function Home() {
  const [eventsRes, eventsStatus, fetchEvents] = useFetch();
  const [onlineEventsRes, onlineEventsStatus, fetchOnlineEvents] = useFetch();

  const [heroEvents, setHeroEvents] = useState(null);
  const [onlineEvents, setOnlineEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const isLogged = useSelector((state) => state.user.isLogged);

  /* ?category=música */
  useEffect(() => {
    fetchEvents({ path: "/event", method: "GET" });
    fetchOnlineEvents({ path: "event/?modality=en-linea", method: "GET" });
  }, []);

  useEffect(() => {
    if (eventsStatus.success) {
      const invertedEvents = eventsRes.data.document;
      // console.log(invertedEvents);
      setHeroEvents(invertedEvents.splice(-4, 4));

      const eventsOrderedByDate = orderedByDate(eventsRes.data.document)
      
      setUpcomingEvents(eventsOrderedByDate.splice(0, 5));
    }
  }, [eventsStatus]);

  useEffect(() => {
    if (onlineEventsStatus.success) {
      const onlineEventsFiltered = onlineEventsRes.data.document.splice(-4, 4);
      setOnlineEvents(onlineEventsFiltered);
    }
  }, [onlineEventsRes]);

  return (
    <main className="w-full h-full">
      {eventsStatus.success && heroEvents ? (
        <Hero events={heroEvents} />
      ) : (
        <LoadingSkeleton type={"img"} />
      )}
      <Categories />
      <DependingOnLocation />
      <ProximosEventos cardsInfo={upcomingEvents} />
      <EventosEnLinea cardsInfo={onlineEvents} />
      {isLogged && <CreateEvent />}
    </main>
  );
}

export default Home;
