import { MdArrowRight } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { Card } from "../../atoms/eventCard";

const DependingOnLocation = () => {
  const cardsData = [{}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <div className="p-5 lg:p-10">
      <div className="">
        <h2 className="text-2xl font-bold mb-2">Según tu ubicación</h2>
        <p className="mb-4">
          Estos son los eventos más cercanos que encontramos para vos:
        </p>
        <div className="text-secondary-2 flex items-center mb-4">
          <FaChevronDown className="mr-2" />
          <p>
            <b>Buenos Aires</b>
          </p>
        </div>
      </div>

      <div className="flex justify-end mb-4 font-poppins font-medium">
        <button data-test="" className="flex items-center">
          Ver todo <MdArrowRight size={20} />
        </button>
      </div>

      <div className="snap-x snap-mandatory w-full flex gap-3 overflow-scroll lg:overflow-hidden lg:columns-4 lg:block">
        {cardsData.map((card, i) => (
          <Card key={i} />
        ))}
      </div>
    </div>
  );
};

export default DependingOnLocation;

/*       <div className="flex justify-end mb-4 font-poppins font-medium">
                <button className="flex items-center">
                    Ver todo <MdArrowRight size={20} />
                </button>
            </div> */
