import { MdArrowRight } from "react-icons/md";
import { FaChevronDown } from 'react-icons/fa';
import { Card } from "../../atoms/card/index.jsx";

const DependingOnLocation = () => {
  const cardsData = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ];

  const columnsData = [
    [cardsData[0], cardsData[4]],
    [cardsData[1], cardsData[5]],
    [cardsData[2], cardsData[6]],
    [cardsData[3], cardsData[7]]
  ];

  const renderedColumns = columnsData.map((column, columnIndex) => (
    <div key={columnIndex} className="flex flex-col gap-3 w-1/4">
      {column.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  ));

  return (
    <div className="p-16">
      <div className="">
        <h2 className="text-2xl font-bold mb-2">Según tu ubicación</h2>
        <p className="mb-4">Estos son los eventos más cercanos que encontramos para vos:</p>
        <div className="text-secondary-2 flex items-center text-primary-4 mb-4">
          <FaChevronDown className="mr-2" />
          <p><b>Buenos Aires</b></p>
        </div>
      </div>

      <div className="flex justify-end mb-4 font-poppins font-medium">
                <button className="flex items-center">
                    Ver todo <MdArrowRight size={20} />
                </button>
            </div>

      <div className="w-full flex flex-row gap-3">
        {renderedColumns}
      </div>
    </div>
  );
}

export default DependingOnLocation;







/*       <div className="flex justify-end mb-4 font-poppins font-medium">
                <button className="flex items-center">
                    Ver todo <MdArrowRight size={20} />
                </button>
            </div> */