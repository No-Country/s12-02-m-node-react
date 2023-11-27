import React from "react";

export default function footer() {
  return (
    <div className="bg-black w-full flex flex-col text-white items-center">
      <div className="flex">
        <div></div>
        <div className="flex flex-col items-start justify-center m-2">
          <h3>Descubrir</h3>
          <button>Eventos en linea</button>
          <button>Cursos y talleres</button>
          <button>Recitales y conciertos</button>
          <button>Guías locales</button>
          <button>Puntos de venta</button>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="flex w-4/5 justify-between items-center p-2 border-t-2 border-white">
        <div>
          <p className="m-1">EventWare© 2023. Todos los derechos reservados </p>
        </div>
        <div className="">
          <button className="m-1">Español </button>
          <button className="m-1">English </button>
          <button className="m-1">Portugues </button>
        </div>
      </div>
    </div>
  );
}
