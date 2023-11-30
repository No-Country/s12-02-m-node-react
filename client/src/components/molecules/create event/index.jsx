import React from "react";

function CreateEvent() {
  return (
    <div className="w-full bg-primary-1 p-8">
      <div className="text-center text-black text-5xl font-semibold font-poppins leading-10 mb-4">
        Crea tu propio evento
      </div>
      <div className="text-center text-black text-base font-normal font-poppins leading-normal mb-4">
        Organiza tus propios eventos de forma rápida y sencilla.{" "}
      </div>
      <div className="flex justify-center">
        {" "}
        {/* Contenedor para centrar el botón */}
        <button className="bg-neutral-200 rounded-3xl p-2.5 inline-flex hover:bg-neutral-300 focus:outline-none">
          <div className="text-black text-base font-medium font-poppins tracking-tight">
            Crear evento
          </div>
        </button>
      </div>
    </div>
  );
}

export default CreateEvent;
