import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import capitalize from "../../../utils/capitalizeFirstLetter";
import orderedByDate from "../../../utils/orderByDate";

import { Card } from "../../atoms/eventCard";

const ShowFilter = () => {
  const [eventsRes, eventsStatus, getEvents] = useFetch();

  const { category } = useParams();
  const { query } = useParams();

  useEffect(() => {
    if (query != 'All') {
      getEvents({ method: "GET", path: `/event?${category}=${query}` });
    } else if (category === "ByDate" && query === 'All') {
      getEvents({ method: "GET", path: "event" });
    }
  }, []);

  const renderHeader = () => {
    let title;
    if (category === "category") {
      const categoria = capitalize(query);
      title = `Eventos en la Categoría: ${categoria}`;
    } else if (category === "location.province") {
      title = `Eventos en: ${query}`;
    } else if (category === "modality") {
      if (query === "en-linea") {
        title = `Eventos en la modalidad: En linea`;
      } else {
        title = `Eventos en la modalidad: ${capitalize(query)}`;
      }
    }else if(category === 'ByDate'){
      title = 'Proximos eventos'
    }
    return title;
  };

  return (
    <main className="w-full grid place-items-center p-3 md:p-5 lg:p-7">
      <div className="w-full">
        <h1 className="text-start mb-3 text-4xl p-3 border-b-2">
          {renderHeader()}
        </h1>
        {eventsStatus.success && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2  justify-center gap-3 md:gap-4 xl:gap-7 flex-wrap">
            {eventsRes.data.document.length > 0 ? (
              orderedByDate(eventsRes.data.document).map((event) => (
                <div key={event._id} className="w-full regular md:max-h-96">
                  <Card className={"long"} info={event} />
                </div>
              ))
            ) : (
              <p className="font-semibold rounded-lg text-xl text-primary-1 bg-secondary-2 w-full p-3 block">
                No tenemos eventos en esta categoría
              </p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default ShowFilter;
