import UserIcon from "../../atoms/userIcon";
import { useEffect, useState } from "react";
import TimeInput from "../../atoms/timeInput";

import Calendar from "@demark-pro/react-booking-calendar";

import { BsFillPlusSquareFill } from "react-icons/bs";
import { RiMoneyDollarBoxFill } from "react-icons/ri";

function CreateEventPage() {
  /*   useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []); */

  const [fileImageURL, setFileImageUrl] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);

  const handleCalendarChange = (e) => {
    console.log(e);
    setSelectedDates(e);
  };

  const handleFooters = (e) => {
    // console.log(e);
    if (e.state.isSelectedStart) {
      return (
        <span className="text-xs text-secondary-1 z-10 absolute bottom-1">
          Inicio
        </span>
      );
    }
    if (e.state.isSelectedEnd) {
      console.log(e);
      return (
        <span className="text-xs text-secondary-1 z-10 absolute bottom-1">
          Final
        </span>
      );
    }
  };

  const handleFile = (e) => {
    // console.log(e.target.files);
    const fileUrl = URL.createObjectURL(e.target.files[0]);
    setFileImageUrl(fileUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataObj = Object.fromEntries(formData)
    const times = {start: selectedDates[0], end: selectedDates[1]}
    dataObj.dates = times;

    console.log(dataObj);
  };
  return (
    <main className="w-full flex flex-col items-center">
      <header className="bg-secondary-4 h-72 flex items-center justify-start px-16 w-full">
        <h2 className="text-white text-7xl text-center">Crear evento</h2>
      </header>
      <form onSubmit={handleSubmit} className=" w-11/12 bg-primary-6">
        <div className="flex items-center gap-2 p-12">
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
        <div className="p-6">
          <input
            data-test="event-name"
            type="text"
            name="eventName"
            className="border rounded px-2 py-1 w-6/12"
            defaultValue="Nombre del evento"
            onFocus={(e) => (e.target.value = "")}
            onBlur={(e) =>
              (e.target.value = e.target.value || "Nombre del evento")
            }
          />
        </div>
        <label className="mb-2 relative bg-white p-5 block max-w-sm rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1">
          <p className="flex items-center gap-2">
            <BsFillPlusSquareFill className="w-7 h-7" />
            <span>Agregar foto de portada</span>
          </p>
          <input
            type="file"
            name="image"
            onChange={handleFile}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
          />
        </label>
        {fileImageURL && (
          <picture className="block rounded-xl overflow-hidden max-w-xs h-auto">
            <img
              src={fileImageURL}
              className="w-full h-full object-cover"
              alt="image"
              onLoad={() => URL.revokeObjectURL(fileImageURL)}
            />
          </picture>
        )}
        <div className="max-w-sm rounded-xl overflow-hidden">
          <Calendar
            selected={selectedDates}
            onChange={handleCalendarChange}
            range={true}
            variant="booking"
            components={{ DayCellFooter: handleFooters }}
            classNamePrefix="eventCalendar"
          />
        </div>
        <TimeInput label='Hora de Inicio' propertyName={'startingTime'}/>
        <TimeInput label='Hora de Finalizacion' propertyName={'endingTime'}/>
        <div className="p-6">
          <textarea
            data-test="event-description"
            type="text"
            name="description"
            className="border rounded px-2 py-1 w-10/12 h-48 "
            placeholder="Descripcion del evento"
            // defaultValue="Descripcion del evento"
            /* onFocus={(e) => (e.target.value = "")}
            onBlur={(e) =>
              (e.target.value = e.target.value || "Descripcion del evento")
            } */
          />
        </div>
        <div className="p-6">
          <select
            name="modality"
            data-test="event-modality"
            className="border rounded px-2 py-1 w-6/12"
            id="modalidadSelect"
          >
            <option value="">
              Selecciona una modalidad
            </option>
            <option value="online">
              Online
            </option>
            <option value="presencial">
              Presencial
            </option>
          </select>
        </div>
        <div className="p-6">
          <select
          name="category"
            data-test="event-category"
            className="border rounded px-2 py-1 w-6/12"
          >
            <option value="">Selecciona una categoria</option>
            <option value="music">Musica</option>
            <option value="art">Arte</option>
            <option value="nightLife">Vida nocturna</option>
            <option value="gastronomy">Gastronomia</option>
            <option value="holidays">Feriados</option>
            <option value="healt">Salud</option>
            <option value="hobbies">Pasatiempos</option>
            <option value="business">Negocios</option>
          </select>
        </div>
        <div className="p-6">
          <select
          name="class"
            data-test="event-clasification"
            className="border rounded px-2 py-1 w-6/12"
          >
            <option value="">Selecciona una clasificacion</option>
            <option value="allPublic">Apta para todo publico</option>
            <option value="plusEighteen">Mayores de edad</option>
          </select>
        </div>
        <div className="p-6">
          <input
            name="capacity"
            data-test="event-capacity"
            type="text"
            className="border rounded px-2 py-1 w-6/12"
            defaultValue="Capacidad"
            onFocus={(e) => (e.target.value = "")}
            onBlur={(e) => (e.target.value = e.target.value || "Capacidad")}
          />
        </div>
        <div className="p-6"></div>
        <label className="bg-white p-2 rounded-xl flex items-center max-w-xs">
          <RiMoneyDollarBoxFill className="w-6 h-6" />
          <input type="number" name="price" placeholder="Price" />
        </label>
        <button type="submit">crear evento</button>
      </form>
    </main>
  );
}

export default CreateEventPage;
