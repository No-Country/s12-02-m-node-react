import Categories from "../../molecules/categories/Categories";
import CreateEvent from "../../molecules/create event/index";
import EventosEnLinea from "../../organisms/eventosEnLinea";
import ProximosEventos from "../../organisms/proximosEventos";

function Home() {
  return (
    <div>
      Home
      <Categories />
      <ProximosEventos/>
      <EventosEnLinea/>
      <CreateEvent />
    </div>
  );
}

export default Home;
