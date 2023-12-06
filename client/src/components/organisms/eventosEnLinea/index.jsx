import { MdArrowRight } from "react-icons/md";
import { Card } from "../../atoms/eventCard";

export default function EventosEnLinea() {
  const cardData = {
    photo:
      "https://th.bing.com/th/id/OIP.zF_astuhx1EG7SVCpqar2gHaEo?rs=1&pid=ImgDetMain",
    title: "Congreso de Ciberseguridad",
    date: "3 de febrero de 2024",
    location: "Virtual",
  };

  const renderedCards = Array.from({ length: 4 }, (_, index) => (
    <Card key={index} {...cardData} />
  ));

  return (
    <div className="p-5 lg:p-10 bg-white">
      <h1 className="text-2xl font-bold mb-2">Eventos en linea</h1>
      <div className="flex justify-end mb-4 font-poppins font-medium">
        <button className="flex items-center">
          Ver todo <MdArrowRight size={20} />
        </button>
      </div>
      <div className="w-full columns-[15rem] md:columns-2 lg:columns-4">{renderedCards}</div>
    </div>
  );
}
