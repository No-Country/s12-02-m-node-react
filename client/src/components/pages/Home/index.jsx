import Categories from "../../molecules/categories/Categories";
import CreateEvent from "../../molecules/create event/index";
import Hero from "../../molecules/hero";
import { heroData } from "./mockData";
function Home() {
  return (
    <main className="w-screen h-full">
      <Hero events={heroData}/>
      <Categories />
      <CreateEvent />
    </main>
  );
}

export default Home;
