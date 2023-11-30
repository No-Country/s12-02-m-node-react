import React from "react";
import { useNavigate } from "react-router-dom";
const dataCard = {
  photo:
    "https://thesportsgrail.com/wp-content/uploads/2022/11/Imagine-Dragons-and-The-Strokes-to-headline-Lollapalooza-India.-Jackson-Wang-to-bring-Magicman-to-Mumbai.jpg",
  title: "Lollapalooza",
  date: "15 al 17 de Marzo de 2024",
  location: "Hipódromo de San Isidro",
};

export const Card = ({ customImageSize }) => {
  const navigate = useNavigate();
  return (
    <div className="font-poppins overflow-hidden flex flex-col gap-3 p-3">
      <img
        className={`w-full object-cover rounded-lg ${
          customImageSize || "h-[200px]"
        }`}
        src={dataCard.photo}
        alt="Imagen evento"
      />
      <div>
        <h1 className="text-primary-4 text-2xl">{dataCard.title}</h1>
        <div className="flex flex-row items-center gap-2 text-primary-5 text-sm">
          <p>{dataCard.date}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="5"
            height="5"
            viewBox="0 0 5 5"
            fill="none"
          >
            <circle cx="2.5" cy="2.5" r="2.5" fill="#828D9E" />
          </svg>
          <p>{dataCard.location}</p>
        </div>
      </div>
      <button
        onClick={() => navigate("/detail")}
        className="w-28 text-primary-4 text-sm font-semibold bg-transparent border border-primary-4 rounded-full px-6 py-2"
      >
        Ver más
      </button>
    </div>
  );
};
