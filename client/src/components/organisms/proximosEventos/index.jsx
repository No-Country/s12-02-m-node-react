import UpcomingEventsGrid from "../../molecules/upcomingEventsGrid";
import { MdArrowRight } from "react-icons/md";

export default function ProximosEventos() {
  return (
    <div className="p-5 lg:p-10 bg-primary-6">
      <h2 className="text-2xl font-bold mb-2">Próximos eventos</h2>
      <div className="flex justify-end mb-4 font-medium">
        <button className="flex items-center ">
          Ver todo <MdArrowRight size={20} />
        </button>
      </div>
      <UpcomingEventsGrid />
    </div>
  );
}
