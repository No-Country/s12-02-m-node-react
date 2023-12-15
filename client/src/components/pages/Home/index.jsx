import Categories from "../../molecules/categories";
import CreateEvent from "../../molecules/createEvent";
import Hero from "../../molecules/hero";
import { heroData, dataCard } from "./mockData";
import EventosEnLinea from "../../organisms/eventosEnLinea";
import ProximosEventos from "../../organisms/proximosEventos";
import DependingOnLocation from "../../molecules/dependingonlocation";
import useFetch from '../../../hooks/useFetch'
import { useEffect } from "react";

function Home() {
  const [eventsRes, eventsStatus, fetchEvents] = useFetch()

  useEffect(()=> {
    fetchEvents({path: '/event', method: 'GET'})
  },[])

  useEffect(()=> {
    if(eventsStatus.success){
      console.log(eventsRes);
    }
  },[eventsStatus])
  return (
    <main className="w-full h-full">
      <Hero events={heroData} />
      <Categories />
      <DependingOnLocation cardsInfo={Array(8).fill(dataCard)} />
      <ProximosEventos cardsInfo={Array(5).fill(dataCard)}/>
      <EventosEnLinea cardsInfo={Array(4).fill(dataCard)} />
      <CreateEvent />
    </main>
  );
}

export default Home;
