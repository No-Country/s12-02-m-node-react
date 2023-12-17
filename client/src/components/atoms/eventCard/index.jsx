import React from "react";
import { MdTrendingUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import formatDate from "../../../utils/formatDate";

export const Card = ({ className, info = {} }) => {
  const eventId = info._id || 1;
  const navigate = useNavigate();

  const renderDate = () => {
    let message;
    if (Object.hasOwn(info.dates, "end")) {
      const startDate = new Date(info.dates.start);
      const endDate = new Date(info.dates.end);

      const sameYear = startDate.getFullYear() === endDate.getFullYear();
      const sameMonth = startDate.getMonth() === endDate.getMonth();
      const sameDay = startDate.getDate() === endDate.getDate();

      if (sameYear && sameMonth && sameDay) {
        /*Por el calendario que se usa es posible que el usuario seleccione la misma fecha para ambos campos, de confirmarse que no es posible esta validacion sobra */
        message = formatDate({ date: startDate });
      } else if (sameYear && sameMonth && !sameDay) {
        const startDay = startDate.getDate();
        const endDay = endDate.getDate();
        const restDate = formatDate({ date: startDate, type: "Y-M" });

        message = `${startDay} al ${endDay} de ${restDate}`;
      } else if (sameYear && !sameMonth) {
        const startingDate = formatDate({ date: startDate, type: "D-M" });
        const endingDate = formatDate({ date: endDate, type: "full" });

        message = `${startingDate} al ${endingDate}`;
      } else {
        /* Diferente año mes y dia */
        const startingDate = formatDate({ date: startDate, type: "full" });
        const endingDate = formatDate({ date: endDate, type: "full" });

        message = `${startingDate} al ${endingDate}`;
      }
    } else {
      const date = new Date(info.dates.start);
      const dateFormatted = formatDate({ date: date, type: "full" });

      message = `${dateFormatted}`;
    }

    // console.log("Fecha : ", message);
    return <p>{message}</p>;
  };
  return (
    <div
      className={`group ${className} snap-start overflow-hidden grid grid-rows-6 xl:grid-cols-3 gap-3 p-3 h-full min-w-fit group-[.regular]:min-w-[300px] group-[.regular]:xl:min-w-fit`}
    >
      <picture className="row-span-4 xl:col-span-3 group-[.long]:xl:col-span-2 group-[.long]:xl:row-span-6 group-[.big]:lg:row-span-5">
        <img
          className={`w-full object-cover rounded-lg h-full`}
          src={info.pictures[0]}
          alt="Imagen evento"
        />
      </picture>
      <div className="flex flex-col justify-between gap-2 row-span-2 xl:col-span-3 group-[.long]:xl:col-span-1 group-[.long]:xl:row-span-6 group-[.big]:md:row-span-1">
        <header>
          <h1 className="text-primary-4 text-2xl">{info.title}</h1>
          <div className="flex flex-row items-center gap-2 text-primary-5 text-sm">
            {renderDate()}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="5"
              height="5"
              viewBox="0 0 5 5"
              fill="none"
            >
              <circle cx="2.5" cy="2.5" r="2.5" fill="#828D9E" />
            </svg>
            <p>{info.location}</p>
          </div>
        </header>
        <button
          onClick={() => navigate(`event/${eventId}`)}
          className="w-28 text-primary-4 text-sm font-semibold bg-transparent border border-primary-4 rounded-full px-6 py-2"
        >
          Ver más
        </button>
      </div>
    </div>
  );
};
