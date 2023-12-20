import React from "react";
import { FaGuitar, FaPalette, FaRegCalendarAlt, FaHeart } from "react-icons/fa";
import { BiSolidDrink } from "react-icons/bi";
import { MdFastfood } from "react-icons/md";
import { IoMdBriefcase } from "react-icons/io";
import { IoGameController } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";

const categories = [
  { icon: FaGuitar, description: "Música" },
  { icon: FaPalette, description: "Arte" },
  { icon: BiSolidDrink, description: "Vida nocturna" },
  { icon: MdFastfood, description: "Gastronomia" },
  { icon: FaRegCalendarAlt, description: "Feriados" },
  { icon: FaHeart, description: "Salud" },
  { icon: IoGameController, description: "Pasatiempos" },
  { icon: IoMdBriefcase, description: "Negocios" },
];

export default function Categories() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    const category = e.currentTarget.getAttribute('data-filter_by');
    // alert(`Filtrando eventos: ${category}`)
    navigate(`/filtro/${category}`)
  };
  return (
    <section className="bg-primary-1 h-fit p-5 columns-[8rem] w-full sm:columns-4 lg:flex lg:justify-around lg:p-10">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-between mb-5 lg:mb-0"
        >
          <button
            className="flex 2xl:h-36 2xl:w-36 xl:h-32 xl:w-32  flex-wrap  bg-white p-3 rounded-full  items-center justify-center shadow-md shadow-primary-3"
            data-filter_by={category.description.toLocaleLowerCase()}
            onClick={handleClick}
            data-test={`filter_by_${category.description}`}
          >
            <category.icon className="xl:w-16 xl:h-16 w-14 h-14 p-2 text-primary-3" />
          </button>
          <p className="mt-2 text-primary-2">{category.description}</p>
        </div>
      ))}
    </section>
  );
}
