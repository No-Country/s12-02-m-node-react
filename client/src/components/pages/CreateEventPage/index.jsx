import UserIcon from "../../atoms/userIcon";
import { FaPlus } from 'react-icons/fa';
import DatePicker from "tailwind-datepicker-react";
import Datepicker from "tailwind-datepicker-react"

function CreateEventPage() {
  return (
    <div className="w-full items-center justify-center">
      <div className="bg-secondary-4 h-72 flex items-center justify-start px-16">
        <div className="text-white text-7xl text-center">Crear evento</div>
      </div>
      <div className=" w-11/12 bg-primary-6">
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0">
            <UserIcon />
          </div>
          <div className="flex-grow">
            <h1 className="text-secondary-5">capipop</h1>
            <div className="flex flex-col items-start gap-2 text-primary-5 text-sm">
              <p>Organizador - Ir al perfil</p>
            </div>
          </div>
        </div>
        <div>
          <input
            type="text"
            className="border rounded px-2 py-1 w-6/12"
            defaultValue="Nombre del evento"
            onFocus={(e) => e.target.value = ""}
            onBlur={(e) => e.target.value = e.target.value || "Nombre del evento"}
          />
        </div>
        
        <div inline-datepicker data-date="02/25/2022"><DatePicker/></div>
      </div>
    </div>
  );
}

export default CreateEventPage;

