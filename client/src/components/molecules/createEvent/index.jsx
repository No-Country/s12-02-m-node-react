import React from "react";
import { NavLink } from "react-router-dom";

function CreateEvent() {
  return (
    <div className="w-full bg-primary-1 p-16">
      <h2 className="text-center text-black text-4xl font-semibold pt-5 mb-4">
        Crea tu propio evento
      </h2>
      <div className="text-center text-black text-base font-normal leading-normal mb-4">
        Organiza tus propios eventos de forma rápida y sencilla.  
      </div>
      <div className="flex justify-center">
        <button className="bg-neutral-200 rounded-3xl p-2.5 inline-flex hover:bg-neutral-300 focus:outline-none">
          <NavLink to='/createEvent' className="text-base font-medium bg-secondary-2 text-primary-1 p-2 rounded-full hover:scale-110 focus:scale-110 transform transition-transform duration-200 ease-out-expo shadow-md shadow-secondary-3">
            Crear evento
          </NavLink>
        </button>
      </div>
    </div>
  );
}

export default CreateEvent;
