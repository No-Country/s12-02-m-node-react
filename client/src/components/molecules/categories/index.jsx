import React from "react";
import { FaGuitar, FaPalette, FaRegCalendarAlt, FaHeart } from "react-icons/fa";
import { BiSolidDrink } from "react-icons/bi";
import { MdFastfood } from "react-icons/md";
import { IoMdBriefcase } from "react-icons/io";
import { IoGameController } from "react-icons/io5";

const categories = [
  { icon: FaGuitar, description: "Musica" },
  { icon: FaPalette, description: "Arte" },
  { icon: BiSolidDrink, description: "Vida nocturna" },
  { icon: MdFastfood, description: "Gastronomia" },
  { icon: FaRegCalendarAlt, description: "Feriados" },
  { icon: FaHeart, description: "Salud" },
  { icon: IoGameController, description: "Pasatiempos" },
  { icon: IoMdBriefcase, description: "Negocios" },
];

export default function Categories() {
  return (
    <div className="bg-primary-1 h-fit p-5 columns-[8rem] w-full sm:columns-4 lg:flex lg:justify-around lg:p-10">
      {categories.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-between mb-5 lg:mb-0"
        >
          <div className="flex 2xl:h-36 2xl:w-36 xl:h-32 xl:w-32  flex-wrap  bg-white p-3 rounded-full  items-center justify-center shadow-md shadow-primary-3">
            <button>
              <category.icon className="xl:w-16 xl:h-16 w-14 h-14 p-2 text-primary-3" />
            </button>
          </div>
          <p className="mt-2 text-primary-2">{category.description}</p>
        </div>
      ))}
    </div>
  );
}
