import { Card } from "../../atoms/eventCard";
import { MdArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ProximosEventos({ cardsInfo }) {
  const navigate = useNavigate();
  const cardsClasses = [
    { classDiv: "lg:col-span-5 xl:col-span-6", classCard: "long" },
    { classDiv: "lg:col-span-3 xl:col-span-2", classCard: "" },
    { classDiv: "lg:col-span-3", classCard: "" },
    { classDiv: "lg:col-span-5 lg:row-span-2", classCard: "big" },
    { classDiv: "lg:col-span-3 md:col-span-2", classCard: "" },
  ];

  const handleViewAll = (e) => {
    e.preventDefault();
    navigate("/filtro/ByDate/All");
  };

  const renderCards = () => {
    return (
      <>
        {cardsInfo.map((card, i) => {
          return (
            <div
              key={i}
              className={`bg-white rounded-lg shadow-md ${cardsClasses[i].classDiv}`}
            >
              <Card className={cardsClasses[i].classCard} info={card} />
            </div>
          );
        })}
      </>
    );
  };
  return (
    <section className="w-full p-5 lg:p-10 bg-primary-6">
      <h2 className="text-2xl font-bold mb-2">Próximos eventos</h2>
      <div className="flex justify-end mb-4 font-medium">
        <button onClick={handleViewAll} className="flex items-center ">
          Ver todo <MdArrowRight size={20} />
        </button>
      </div>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 md:grid-rows-[repeat(3,_26rem)] lg:grid-cols-8 gap-4">
        {renderCards()}
      </div>
    </section>
  );
}
