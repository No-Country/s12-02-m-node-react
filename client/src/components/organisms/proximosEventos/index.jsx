import { Card } from "../../atoms/eventCard";
import { MdArrowRight } from "react-icons/md";

export default function ProximosEventos({ cardsInfo }) {
  const cardsClasses = [
    { classDiv: "lg:col-span-5 xl:col-span-6", classCard: "long" },
    { classDiv: "lg:col-span-3 xl:col-span-2", classCard: "" },
    { classDiv: "lg:col-span-3", classCard: "" },
    { classDiv: "lg:col-span-5 lg:row-span-2", classCard: "big" },
    { classDiv: "lg:col-span-3 md:col-span-2", classCard: "" },
  ];
  const renderCards = () => {
    return (
      <>
        {cardsInfo.map((card, i) => {
          return (
            <div
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
    <div className="p-5 lg:p-10 bg-primary-6">
      <h2 className="text-2xl font-bold mb-2">Próximos eventos</h2>
      <div className="flex justify-end mb-4 font-medium">
        <button className="flex items-center ">
          Ver todo <MdArrowRight size={20} />
        </button>
      </div>
      <section className="grid md:grid-cols-2 md:grid-rows-[repeat(3,_26rem)] lg:grid-cols-8 gap-4">
        {renderCards()}
      </section>
    </div>
  );
}
