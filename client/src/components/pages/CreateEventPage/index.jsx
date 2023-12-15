import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useFetch from "../../../hooks/useFetch";

import UserIcon from "../../atoms/userIcon";
import Calendar from "@demark-pro/react-booking-calendar";
import TimeInput from "../../atoms/timeInput";

import toast, { Toaster } from "react-hot-toast";

import { BsFillPlusSquareFill } from "react-icons/bs";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";

function CreateEventPage() {
  const [fileImageURL, setFileImageUrl] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [formatedSelectedDates, setFormatedSelectedDates] = useState({});
  const form = useRef(null);

  const [eventResponse, eventStatus, eventPost] = useFetch();

  /*   useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []); */

  useEffect(() => {
    if (eventStatus.success) {
      toast.success("Evento creado exitosamente");
      resetForm();
      console.log(eventResponse);
    } else if (eventStatus.loading) {
      toast.loading("...Creando Evento", { duration: 2000 });
    } else if (eventStatus.error) {
      toast.error("No se logro crear el evento");
    }
  }, [eventStatus]);

  const resetForm = () => {
    form.current.reset();
    setFileImageUrl(null);
    setSelectedDates([]);
    setStartTime("");
    setEndTime("");
  };

  const handleCalendarChange = (e) => {
    const datesObj = {};
    const arrayDates = e.map((date) => {
      const stringDate = String(date).split(" ").splice(1, 3).join(" ");
      return formatDates(stringDate);
    });
    arrayDates.forEach((date, i) => {
      if (i === 0) {
        datesObj.start = date;
      } else {
        datesObj.end = date;
      }
    });
    // console.log(datesObj);
    setSelectedDates(e);
    setFormatedSelectedDates(datesObj);
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
    console.log("fechas: ", formatedSelectedDates);
    formData.append("dates", JSON.stringify(formatedSelectedDates));
    formData.append("email", "pedro@example.com");

    // const dataObj = Object.fromEntries(formData);
    const myrequest = eventPost({
      path: "/event",
      data: formData,
      method: "POST",
    });

    // axios.post("http://localhost:3031/api/event", formData);
  };
  return (
    <main className="w-full flex flex-col items-center">
      <Toaster />
      <header className="bg-secondary-4 h-fit py-10 w-full">
        <h2 className="text-white text-5xl text-center font-semibold px-2">Crear evento</h2>
      </header>
      <form
        ref={form}
        onSubmit={handleSubmit}
        className=" w-11/12 bg-primary-6 p-3 grid justify-center pb-10 gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5 md:p-5 lg:p-7 lg:gap-7 xl:p-10 xl:gap-10 2xl:p-20"
      >
        <div className="flex justify-center items-center gap-2 my-5 md:col-span-full md:justify-self-start">
          <UserIcon />
          <p>
            <span className="text-secondary-5 text-lg font-medium">Capipop</span>
            <span className="flex flex-col items-start gap-2 text-primary-5 text-sm">
              Organizador - Ir al perfil
            </span>
          </p>
        </div>
        <label aria-label="event Name" className="lg:col-span-2">
          <input
            data-test="event-name"
            type="text"
            name="title"
            className="bg-white py-5 px-3 block rounded-xl outline-2 outline-secondary-2 focus:outline hover:outline focus:shadow-lg shadow-secondary-1 w-full"
            placeholder="Nombre del evento"
          />
        </label>
        <label className="relative bg-white p-5 block rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1">
          <p className="flex items-center gap-2">
            <BsFillPlusSquareFill className="w-7 h-7" />
            <span>Agregar foto de portada</span>
          </p>
          <input
            data-test="event-banner"
            type="file"
            name="img"
            onChange={handleFile}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
          />
        </label>

        {fileImageURL && (
          <picture className=" block rounded-xl overflow-hidden max-w-sm w-full h-auto justify-self-center md:col-span-2 lg:col-start-3 lg:col-span-1 aspect-video">
            <img
              src={fileImageURL}
              className="w-full h-full object-cover"
              alt="image"
              onLoad={() => URL.revokeObjectURL(fileImageURL)}
            />
          </picture>
        )}

        <div className="bg-white block rounded-xl overflow-hidden outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1 max-w-sm justify-self-center lg:row-start-3">
          <Calendar
            id="calendar"
            selected={selectedDates}
            onChange={handleCalendarChange}
            range={true}
            variant="booking"
            components={{ DayCellFooter: handleFooters }}
          />
        </div>
        <div className="flex flex-col gap-2 mr-0 items-center md:justify-evenly lg:row-start-3">
          <TimeInput
            dataTest="start-hour"
            label="Hora Inicio"
            propertyName={"startHour"}
            className=""
            state={[startTime, setStartTime]}
          />
          <TimeInput
            dataTest="end-hour"
            label="Hora Cierre"
            propertyName={"endHour"}
            className=""
            state={[endTime, setEndTime]}
          />
        </div>
        <label className="col-span-full">
          <textarea
            data-test="event-description"
            type="text"
            rows={"5"}
            name="description"
            className="bg-white p-3 block rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1 w-full"
            placeholder="Descripción del evento"
          />
        </label>
        <label aria-label="select a modality" className="md:col-span-2">
          <select
            name="modality"
            data-test="event-modality"
            className="bg-white px-3 py-5 block rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1 w-full"
          >
            <option value="">Selecciona una modalidad</option>
            <option value="en-linea">Online</option>
            <option value="presencial">Presencial</option>
          </select>
        </label>
        
        <label aria-label="select a category" className="md:col-span-2">
          <select
            name="category"
            data-test="event-category"
            className="bg-white px-3 py-5 block rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1 w-full"
          >
            <option value="">Selecciona una categoría</option>
            <option value="música">Música</option>
            <option value="arte">Arte</option>
            <option value="vida nocturna">Vida nocturna</option>
            <option value="gastronomia">Gastronomía</option>
            <option value="feriados">Feriados</option>
            <option value="salud">Salud</option>
            <option value="pasatiempos">Pasatiempos</option>
            <option value="negocios">Negocios</option>
          </select>
        </label>
        <label className="bg-white p-5 rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1 flex items-center gap-2 lg:row-start-5 lg:col-start-3">
          <FaLocationDot className="w-6 h-6" />
          <input
            data-test="location"
            type="text"
            name="location"
            placeholder="Ubicacion"
            className="outline-none flex-grow"
          />
        </label>
        <label className="lg:row-start-7">
          <input
            type="number"
            name="minimumAge"
            placeholder="Edad minima"
            data-test="minimum-age"
            className="bg-white p-5 block rounded-xl outline-2 outline-secondary-2 focus:outline hover:outline focus:shadow-lg shadow-secondary-1 w-full"
          />
        </label>
        <label className="lg:row-start-7">
          <input
            name="capacity"
            data-test="event-capacity"
            type="number"
            className="bg-white p-5 block rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1 w-full"
            placeholder="Capacidad"
          />
        </label>
        <label className="bg-white px-5 rounded-xl outline-2 outline-secondary-2 focus-within:outline hover:outline focus-within:shadow-lg shadow-secondary-1ounded-xl flex items-center lg:row-start-7">
          <HiCurrencyDollar className="w-7 h-7" />
          <input
            data-test="input-price"
            type="number"
            name="price"
            placeholder="Precio"
            className="py-5 px-2 outline-none flex-grow"
          />
        </label>
        <button
          data-test="button-create-event-form"
          className="mt-5 text-lg font-medium bg-secondary-2 text-primary-1 p-3 rounded-full hover:scale-110 focus:scale-110 transform transition-transform duration-200 ease-out-expo shadow-md shadow-secondary-3 w-full md:col-span-2 lg:col-span-1 lg:col-start-2 xl:mt-10"
          type="submit"
        >
          crear evento
        </button>
      </form>
    </main>
  );
}

export default CreateEventPage;
