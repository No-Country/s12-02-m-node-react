import { Accordion, AccordionItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Comments from "../../organisms/comments";

export default function Detail() {
  const [favorited, setFavorited] = useState(false);
  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);

  const toggleFavorite = () => {
    setFavorited((prev) => !prev);
  };
  return (
    <div className="w-full flex">
      <div className="w-2/3 flex flex-col px-5 py-3">
        <div>
          <img
            src="/image 2.png"
            className="w-full h-96 object-cover rounded-lg"
            alt=""
          />
        </div>
        <div className="mt-4 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h3 className="font-poppins font-bold text-3xl">
              Nombre del artista
            </h3>
            <p>02 y 03 de diciembre</p>
          </div>
          <div>
            <button className="text-2xl" onClick={toggleFavorite}>
              {favorited ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
        <div className="mt-8">
          <button className="w-full rounded-full border-none border-primary-600 bg-primary-500 hover:bg-primary-600 shadow-md p-3 text-white">
            Reservar Ahora
          </button>
        </div>
        <div className="mt-7 flex flex-col">
          <h3 className="font-bold text-xl font-poppins">Acerca del evento</h3>
          <p className="font-poppins mt-2">
            Tras el lanzamiento de su último single, “Parece Mentira”, ya
            impuesto entre sus fans como un himno al fin del amor, Diego Torres
            puso fecha para el reencuentro con sus seguidores en su Buenos Aires
            natal. Luego de un 2022 muy fructífero en el que presentó su último
            disco “Atlántico a Pie”, el músico dio una muestra de lo nuevo con
            “Parece Mentira”. Ahora prepara un show espectacular que es la
            ocasión de presenciar en vivo todo el abanico de géneros y emociones
            que nadie sabe desplegar como lo hace Diego Torres.
          </p>
        </div>
        <div className="mt-7 flex flex-col">
          <h3 className="font-bold text-xl font-poppins">Comentarios</h3>
          <div>
            <Comments />
          </div>
        </div>
      </div>
      <div className="w-1/3 flex flex-col mr-7 items-center">
        <div className="flex flex-col flex-wrap md:flex-nowrap gap-4 bg-primary-1 mt-4 w-4/5 rounded-xl">
          <div className="mt-3">
            <h3 className="font-bold px-5 pt-5 text-xl rounded-xl">Tickets</h3>
          </div>
          <div className="pb-3 px-3">
            <Accordion variant="splitted" className="my-3">
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                title="Puntos de venta"
                className="mt-1"
              >
                Los tickets para el show se pueden adquirir únicamente a través
                de www.movistararena.com.ar.
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="flex flex-col m-3 w-4/5 bg-primary-1 mt-10 rounded-xl">
          <h3 className="font-bold text-xl px-5 pt-5">Ubicacion</h3>
          <p className="px-5 pb-3 font-poppins">
            Avenida Corrientes 857 1043 Ciudad Autónoma De Buenos Aires ,Teatro
            Gran Rex
          </p>
          <img className="p-2" src="/image 10.png" alt="" />
        </div>
      </div>
    </div>
  );
}
