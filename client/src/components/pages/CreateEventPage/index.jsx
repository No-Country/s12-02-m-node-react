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
  const [formatedSelectedDates, setFormatedSelectedDates] = useState([]);

  const handleCalendarChange = (e) => {
    // const firstDate = String(e[0]).split(' ').splice(1, 3).join(' ')
    // const formatedDates = formatDates(firstDate)
    const arrayDates = e.map((date) => {
      const stringDate = String(date).split(" ").splice(1, 3).join(" ");
      return formatDates(stringDate);
    });
    console.log(arrayDates);
    setSelectedDates(e)
    setFormatedSelectedDates(arrayDates);

    // console.log(formatedDates);
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
      // console.log(e);
      return (
        <span className="text-xs text-secondary-1 z-10 absolute bottom-1">
          Final
        </span>
      );
    }
  };

  const handleFile = (e) => {
    const fileUrl = URL.createObjectURL(e.target.files[0]);
    setFileImageUrl(fileUrl);
  };
  const formatDates = (date) => {
    const initialDate = new Date(date);
    const formatedDate = new Intl.DateTimeFormat("es", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(initialDate)
      .split("/")
      .reverse()
      .join("-");

    return formatedDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const times = formatedSelectedDates;
  
    formData.append('dates', formatedSelectedDates )
    
    const dataObj = Object.fromEntries(formData);
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
            name="title"
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
              name="img"
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

        <div className="p-6 flex items-center">
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
            <TimeInput data-test="start-time" label='Hora de Inicio' propertyName={'startHour'} className=""/>
            <TimeInput data-test="end-time" label='Hora de Finalizacion' propertyName={'endHour'} className=""/>
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
            <option value="">Selecciona una modalidad</option>
            <option value="en-linea">Online</option>
            <option value="presencial">Presencial</option>
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
            <option value="música">Música</option>
            <option value="arte">Arte</option>
            <option value="vida nocturna">Vida nocturna</option>
            <option value="gastronomia">Gastronomía</option>
            <option value="feriados">Feriados</option>
            <option value="salud">Salud</option>
            <option value="pasatiempos">Pasatiempos</option>
            <option value="negocios">Negocios</option>
          </select>
        </div>
        <div className="p-6">
          <input type="number" name="minimumAge" placeholder="Edad minima" />
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
