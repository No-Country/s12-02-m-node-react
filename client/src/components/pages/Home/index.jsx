import Categories from "../../molecules/categories";
import CreateEvent from "../../molecules/createEvent";
import Hero from "../../molecules/hero";
import { heroData } from "./mockData";
import EventosEnLinea from "../../organisms/eventosEnLinea";
import ProximosEventos from "../../organisms/proximosEventos";
import DependingOnLocation from "../../molecules/dependingonlocation";

function Home() {
  return (
    <main className="w-full h-full">
      <Hero events={heroData} />
      <Categories />
      <DependingOnLocation />
      <ProximosEventos />
      <EventosEnLinea />
      <CreateEvent />
    </main>
  );
}

export default Home;
