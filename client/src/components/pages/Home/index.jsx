import Categories from "../../molecules/categories/Categories";
import CreateEvent from "../../molecules/create event/index";
import ProximosEventos from "../../organisms/proximosEventos";

function Home() {
  return (
    <div>
      Home
      <Categories />
      <ProximosEventos/>
      <CreateEvent />
    </div>
  );
}

export default Home;
