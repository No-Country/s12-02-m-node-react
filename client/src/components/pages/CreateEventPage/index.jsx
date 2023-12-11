import UserIcon from "../../atoms/userIcon";

function CreateEventPage() {
  return (
    <div className="w-full">
      <div className="bg-secondary-4 h-72 flex items-center justify-start px-16">
        <div className="text-white text-7xl text-center">Crear evento</div>
      </div>
      <div className=" w-11/12 bg-primary-6">
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
            className="border rounded px-2 py-1 w-6/12"
            defaultValue="Nombre del evento"
            onFocus={(e) => e.target.value = ""}
            onBlur={(e) => e.target.value = e.target.value || "Nombre del evento"}
          />
        </div>
        <div className="p-6">
          <input
            data-test="event-description"
            type="text"
            className="border rounded px-2 py-1 w-10/12 h-48 "
            defaultValue="Descripcion del evento"
            onFocus={(e) => e.target.value = ""}
            onBlur={(e) => e.target.value = e.target.value || "Descripcion del evento"}
          />
        </div>
        <div className="p-6">
        <select
          data-test="event-modality"
          className="border rounded px-2 py-1 w-6/12"
          id="modalidadSelect">
          <option value="">Selecciona una modalidad</option>
          <option value="online">Online</option>
          <option value="presencial">Presencial</option>
        </select>
        </div>
        <div className="p-6">
        <select
          data-test="event-category"
          className="border rounded px-2 py-1 w-6/12">
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
          data-test="event-clasification"
          className="border rounded px-2 py-1 w-6/12">
          <option value="">Selecciona una clasificacion</option>
          <option value="allPublic">Apta para todo publico</option>
          <option value="plusEighteen">Mayores de edad</option>
        </select>
        </div>
        <div className="p-6">
          <input
            data-test="event-capacity"
            type="text"
            className="border rounded px-2 py-1 w-6/12"
            defaultValue="Capacidad"
            onFocus={(e) => e.target.value = ""}
            onBlur={(e) => e.target.value = e.target.value || "Capacidad"}
          />
        </div>
        <div className="p-6">
        </div>
      </div>
    </div>
  );
}

export default CreateEventPage;

