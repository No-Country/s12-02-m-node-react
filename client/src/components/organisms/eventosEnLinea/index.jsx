import { MdArrowRight } from "react-icons/md";
import { Card } from "../../atoms/eventCard";
import { useNavigate } from 'react-router-dom'

export default function EventosEnLinea({ cardsInfo }) {
  const navigate = useNavigate();

  const handleViewAll = (e) => {
    e.preventDefault();
    navigate('/filtro/modality/en-linea')
  };
  return (
    <div className="p-5 lg:p-10 bg-white">
      <h1 className="text-2xl font-bold mb-2">Eventos en linea</h1>
      <div className="flex justify-end mb-4 font-poppins font-medium">
        <button onClick={handleViewAll} className="flex items-center">
          Ver todo <MdArrowRight size={20} />
        </button>
      </div>
      <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {cardsInfo.map((card, i) => (
          <div key={card._id} className="bg-white rounded-lg shadow-lg">
            <Card key={i} info={card} />
          </div>
        ))}
      </div>
    </div>
  );
}
