import { useEffect, useState } from "react";
import { MdArrowRight } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { Card } from "../../atoms/eventCard";
import { UseGeolocalization } from "../../../hooks/geolocalization";
import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const DependingOnLocation = () => {
  const navigate = useNavigate();

  const [locationSelected, setLocationSelected] = useState("Buenos Aires");
  const [isLocationMenuOn, setIsLocationMenuOn] = useState(false);
  const [userLocation, fetchStatus, getUserLocation] = UseGeolocalization();
  const [eventsByLocation, eventsByLocationStatus, getEventsByLocation] =
    useFetch();

  let timeout;
  const locations = useSelector((state) => state.locations.data);

  useEffect(() => {
    // getUserLocation()
  }, []);

  useEffect(() => {
    getEventsByLocation({
      path: `/event?location.province=${locationSelected}`,
      method: "GET",
    });
  }, [locationSelected]);

  useEffect(() => {
    if (eventsByLocationStatus.success) {
      // console.log("eventos por lugar: ", eventsByLocation.data.document);
    }
  }, [eventsByLocationStatus]);

  const handleLocationSelected = (e) => {
    e.preventDefault();
    const cityValue = e.target.elements.city.value;
    setLocationSelected(cityValue);
    setIsLocationMenuOn(false);
  };

  const handleFocus = () => {
    clearTimeout(timeout);
    setIsLocationMenuOn(true);
  };
  const handleBlur = () => {
    timeout = setTimeout(() => {
      setIsLocationMenuOn(false);
    }, 1000);
  };

  const handleViewAll = (e) => {
    e.preventDefault();
    navigate(`/filtro/location.province/${locationSelected}`);
  };
  return (
    <section className="p-5 lg:p-10">
      <div>
        <h2 className="text-2xl font-bold mb-2">Según tu ubicación</h2>
        <p className="mb-4">
          Estos son los eventos más cercanos a tu ubicación:
        </p>
        <div className="relative">
          <button
            onClick={() => setIsLocationMenuOn((prev) => !prev)}
            onBlur={handleBlur}
            data-test="toggle-location-menu"
            className="text-secondary-2 flex items-center mb-4 px-2  py-1 rounded-full hover:scale-105 transform transition-transform duration-100 ease-out-expo"
          >
            <FaChevronDown className="mr-2" />
            <span className="font-medium">
              {userLocation || locationSelected}
            </span>
          </button>
          {isLocationMenuOn && (
            <form
              onSubmit={handleLocationSelected}
              className="absolute inset-0 top-10 bg-white border-primary-1 border-small w-fit h-fit rounded-xl shadow-lg shadow-secondary-1 flex flex-col overflow-hidden"
            >
              <fieldset className="flex flex-col p-2">
                {locations.map((city) => (
                  <label
                    key={city.id}
                    className={`focus-within:text-secondary-2 focus-within:scale-105 transform transition-transform duration-150 hover:text-secondary-2 cursor-pointer ${
                      city.nombre === locationSelected
                        ? "text-secondary-3 underline underline-offset-2"
                        : "text-secondary-1"
                    }`}
                  >
                    <span>{city.nombre}</span>
                    <input
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="absolute -left-96"
                      data-test={`select_${city.nombre}_as_location`}
                      type="radio"
                      name="city"
                      value={city.nombre}
                    />
                  </label>
                ))}
              </fieldset>
              <button
                type="submit"
                onFocus={handleFocus}
                onBlur={handleBlur}
                data-test="select-location"
                className="bg-secondary-3 w-full py-1 text-secondary-1 font-medium hover:bg-secondary-2 hover:text-primary-1 focus:bg-secondary-2 focus:text-primary-1"
              >
                Seleccionar
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="flex justify-end mb-4 font-poppins font-medium">
        <button
          data-test="go_to_events_by_location"
          className="flex items-center px-2 py-1 rounded-full"
          onClick={handleViewAll}
        >
          Ver todo <MdArrowRight size={20} />
        </button>
      </div>

      <div className="group regular snap-x snap-mandatory w-full flex gap-3 overflow-scroll xl:overflow-hidden xl:columns-2xs xl:grid xl:grid-cols-4">
        {eventsByLocation?.data.document.map((card, i) => (
          <div key={i} className="bg-white rounded-lg shadow-lg mb-3">
            <Card info={card} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DependingOnLocation;
