import Categories from "../../molecules/categories/Categories";
import CreateEvent from "../../molecules/create event/index";
import Hero from "../../molecules/hero";
import { heroData } from "./mockData";
import ProximosEventos from "../../organisms/proximosEventos";

function Home() {
  return (
    <main className="w-screen h-full">
      <Hero events={heroData}/>
      <Categories />
      <ProximosEventos/>
      <CreateEvent />
    </main>
  );
}

export default Home;
