import { MdArrowRight } from "react-icons/md";
import { Card } from "../../atoms/eventCard";

export default function EventosEnLinea({ cardsInfo }) {

  const renderCards = () => {
    return (
      <>
        {cardsInfo.map((card, i) => (
          <Card key={i} info={card} />
        ))}
      </>
    );
  };

  return (
    <div className="p-5 lg:p-10 bg-white">
      <h1 className="text-2xl font-bold mb-2">Eventos en linea</h1>
      <div className="flex justify-end mb-4 font-poppins font-medium">
        <button className="flex items-center">
          Ver todo <MdArrowRight size={20} />
        </button>
      </div>
      <div className="w-full columns-2xs md:columns-2 xl:columns-4">
        {renderCards()}
      </div>
    </div>
  );
}
