import UserIcon from "../../atoms/userIcon";
import { useEffect, useState } from "react";
import TimeInput from "../../atoms/timeInput";

import Calendar from "@demark-pro/react-booking-calendar";

import { BsFillPlusSquareFill } from "react-icons/bs";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";

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
    const times = { start: selectedDates[0], end: selectedDates[1] }
    dataObj.dates = times;

    console.log(dataObj);
  };
  return (
    <main className="w-full flex flex-col items-center">
      <header className="bg-secondary-4 h-72 flex items-center justify-start px-16 w-full">
        <h2 className="text-white text-7xl text-center">Crear evento</h2>
      </header>
      <form onSubmit={handleSubmit} className=" w-11/12 bg-primary-6 p-20">
        <div className="flex items-center gap-2 p-10">
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
        <div className="p-6 flex items-center">
          <input
            data-test="event-name"
            type="text"
            name="eventName"
            className="ml-4 relative bg-white p-5 block rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1 w-6/12"
            defaultValue="Nombre del evento"
            onFocus={(e) => (e.target.value = "")}
            onBlur={(e) =>
              (e.target.value = e.target.value || "Nombre del evento")
            }
          />

          <label className="ml-4 relative bg-white p-5 block rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1 w-4/12">
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
            <picture className="ml-4 block rounded-xl overflow-hidden max-w-xs h-auto">
              <img
                src={fileImageURL}
                className="w-full h-full object-cover"
                alt="image"
                onLoad={() => URL.revokeObjectURL(fileImageURL)}
              />
            </picture>
          )}
        </div>

        <div className="p-10 flex items-center">
          <div className="relative bg-white p-5 block rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1 w-4/12">
            <Calendar
              data-test="calendar"
              selected={selectedDates}
              onChange={handleCalendarChange}
              range={true}
              variant="booking"
              components={{ DayCellFooter: handleFooters }}
              classNamePrefix="eventCalendar"
            />
          </div>
          <div className="ml-4 flex flex-col items-center">
            <TimeInput data-test="start-time" label='Hora de Inicio' propertyName={'startingTime'} className=""/>
            <TimeInput data-test="end-time" label='Hora de Finalizacion' propertyName={'endingTime'} className=""/>
          </div>
        </div>
        <div className="p-6">
          <textarea
            data-test="event-description"
            type="text"
            name="description"
            className="ml-4 relative bg-white p-5 block rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1 w-11/12 h-48 "
            defaultValue="Descripcion del evento"
            onFocus={(e) => (e.target.value = "")}
            onBlur={(e) =>
              (e.target.value = e.target.value || "Descripcion del evento")
            }
          />
        </div>
        <div className="p-6 flex items-center">
          <select
            name="modality"
            data-test="event-modality"
            className="ml-4 relative bg-white p-5 block rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1 w-6/12"
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
          <div className="px-4">
            <label className="bg-white p-6 rounded-xl flex items-center">
              <FaLocationDot className="w-6 h-6" />
              <input type="text" name="location" placeholder="Ubicacion" className="outline-white w-11/12" />
            </label>
          </div>
        </div>
        <div className="p-6">
          <select
            name="category"
            data-test="event-category"
            className="ml-4 relative bg-white p-5 block rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1 w-6/12"
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
            className="ml-4 relative bg-white p-5 block rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1 w-6/12"
          >
            <option value="">Selecciona una clasificacion</option>
            <option value="allPublic">Apta para todo publico</option>
            <option value="plusEighteen">Mayores de edad</option>
          </select>
        </div>
        <div className="p-6 flex items-center">
          <input
            name="capacity"
            data-test="event-capacity"
            type="number"
            className="ml-4 relative bg-white p-5 block rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1 w-6/12"
            placeholder="Capacidad"
          />
          <div className="px-4">
            <label className="bg-white p-6 rounded-xl flex items-center">
              <RiMoneyDollarBoxFill className="w-6 h-6" />
              <input data-test="input-price" type="number" name="price" placeholder="Precio" className="outline-white w-11/12" />
            </label>
          </div>
        </div>
        <div className="p-6"></div>
        <div className="flex justify-center p-4">
          <button data-test="button-create-event-form" className="text-lg font-medium bg-secondary-2 text-primary-1 p-3 rounded-full hover:scale-110 focus:scale-110 transform transition-transform duration-200 ease-out-expo shadow-md shadow-secondary-3 w-52" type="submit">crear evento</button>
        </div>
      </form>
    </main>
  );
}

export default CreateEventPage;
