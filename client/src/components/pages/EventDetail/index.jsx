import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "../../atoms/map";
import { NavLink } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {
  setEventDetails,
  setEventBookings,
  setIsFull,
} from "../../../redux/slices/detailEventSlice";
import { setUserBookings } from "../../../redux/slices/userSlice";

import Comments from "../../organisms/comments";
import LoadingSkeleton from "../../atoms/loadingSkeleton";
import DetailInfoBlock from "../../atoms/detailInfoBlock";
import UserIcon from "../../atoms/userIcon";

import useFetch from "../../../hooks/useFetch";

import renderDate from "../../../utils/formatDate";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bookButton = useRef(null);
  const [isEventBooked, setIsEventBooked] = useState(false);

  const { data: user, isLogged } = useSelector((state) => state.user);
  const {
    data: eventData,
    bookings: eventBookings,
    freeSlots,
  } = useSelector((state) => state.eventDetail);

  const [eventRes, eventStatus, getEvent] = useFetch();
  const [eventHostRes, eventHostStatus, getEventHost] = useFetch();
  const [bookingRes, bookingStatus, postBooking] = useFetch();
  const [userBookingsRes, userBookingsStatus, getUserBookings] = useFetch();
  const [eventBookingsRes, eventBookingsStatus, getEventBookings] = useFetch();

  useEffect(() => {
    getEvent({ path: `/event/${id}`, method: "GET" });
    getEventBookings({ path: `/bookings/all?event_ID=${id}`, method: "GET" });
  }, []);

  useEffect(() => {
    if (isLogged) {
      getUserBookings({
        path: `/bookings/all?email=${user.email}`,
        method: "GET",
      });
    }
  }, [isLogged]);

  useEffect(() => {
    if (eventStatus.success) {
      dispatch(setEventDetails(eventRes.data));
      getEventHost({ path: `/user/${eventRes.data.email}`, method: "GET" });
      console.log("eventDetail: ", eventRes);
    }
  }, [eventStatus]);

  useEffect(() => {
    if (eventBookingsStatus.success) {
      dispatch(setEventBookings(eventBookingsRes.data.document));
      console.log("EventBooks: ", eventBookingsRes);
    }
  }, [eventBookingsStatus]);

  useEffect(() => {
    if (bookingStatus.success) {
      toast.success("Evento reservado");
      getEventBookings({ path: `/bookings/all?event_ID=${id}`, method: "GET" });
      getUserBookings({
        path: `/bookings/all?email=${user.email}`,
        method: "GET",
      });
    }
  }, [bookingStatus]);

  useEffect(() => {
    if (userBookingsStatus.success) {
      const booked = userBookingsRes.data.document.some(
        (book) => book.event_ID === id
      );
      if (booked) {
        setIsEventBooked(true);
        bookButton.current.disabled = true;
      } else {
        setIsEventBooked(false);
        bookButton.current.disabled = false;
      }
      console.log("reservado: ", booked);
      dispatch(setUserBookings(userBookingsRes.data.document));
    }
  }, [userBookingsStatus]);

  /* Reset Screen scroll */
  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);

  const renderData = ({
    dataTorender,
    typeOfSkeleton,
    customSkeletonClass = "",
    status = eventStatus,
  }) =>
    status.success ? (
      dataTorender()
    ) : (
      <LoadingSkeleton className={customSkeletonClass} type={typeOfSkeleton} />
    );

  const renderFreeEventSlots = () => {
    const { capacity } = eventData;
    const bookedQuantity = eventBookings.length;
    const freeSlots = capacity - bookedQuantity;
    if (capacity == bookedQuantity) {
      dispatch(setIsFull(true));
      bookButton.disabled = true;
      return "Ya no quedan lugares";
    }
    console.log(`slots libres: ${freeSlots}`);
    return freeSlots;
  };

  const mapCoordinates = () => {
    const latitude = eventRes?.data.location?.coordinates.latitude;
    const longitude = eventRes?.data.location?.coordinates.longitude;
    if (latitude && longitude) {
      return [latitude, longitude];
    }
		return null
  };

  const handleBook = (e) => {
    e.preventDefault();
    const data = {
      email: user.email,
      event_ID: id,
    };
    postBooking({ path: "/bookings", method: "POST", data: data });
    toast.loading("Reservando evento", { duration: 1000 });
  };

  return (
    <main className="w-full grid p-3 gap-7 grid-cols-1 md:p-7 lg:p-10 lg:gap-10 xl:grid-cols-3">
      <Toaster />
      <section className="flex flex-col gap-3 md:gap-5 lg:gap-7 xl:col-span-2">
        <picture className="w-full h-fit rounded-lg overflow-hidden">
          {renderData({
            dataTorender: () => (
              <img
                src={eventRes.data.pictures}
                className="w-full h-auto object-cover"
                alt={`${eventRes.data.title} event banner`}
              />
            ),
            typeOfSkeleton: "img",
          })}
        </picture>
        <div className="flex flex-col">
          <h2 className="font-bold text-3xl text-start md:text-start">
            {renderData({
              dataTorender: () => eventRes?.data.title,
              typeOfSkeleton: "title",
            })}
          </h2>
          <p className="text-start mt-2">
            {renderData({
              dataTorender: () => renderDate(eventRes?.data.dates),
              typeOfSkeleton: "line",
            })}
          </p>
        </div>
        {isLogged ? (
          <button
            ref={bookButton}
            onClick={handleBook}
            data-test="book_event"
            className="w-full rounded-full outline-none bg-primary-500 hover:bg-primary-600 shadow-md p-3 text-white md:my-3 cursor-pointer disabled:bg-teal-800 disabled:cursor-default"
          >
            {freeSlots
              ? "Ya no hay espacios libres"
              : isEventBooked
              ? "Evento Reservado"
              : "Reservar Ahora"}
          </button>
        ) : (
          <NavLink
            id="link_to_login"
            className="w-full rounded-full outline-none bg-primary-500 hover:bg-primary-600 shadow-md p-3 text-white md:my-3 cursor-pointer text-center"
            to="/login"
          >
            Inicia Sesión para reservar
          </NavLink>
        )}
        <div className="flex flex-col gap-3 items-center  md:items-start">
          <h3 className="font-bold text-2xl text-secondary-1">
            Acerca del evento
          </h3>
          <p className="w-full">
            {renderData({
              dataTorender: () => eventRes?.data.description,
              typeOfSkeleton: "block",
            })}
          </p>
        </div>
      </section>
      <section className="grid gap-3 md:grid-cols-2 md:items-start lg:gap-7 xl:grid-cols-1">
        <div className="flex flex-col gap-3 md:gap-5">
          {renderData({
            status: eventHostStatus,
            dataTorender: () => (
              <DetailInfoBlock title={"Organiza"}>
                <div className="flex items-center justify-center gap-3">
                  <UserIcon
                    className="w-12 h-12"
                    imgUrl={eventHostRes.data.picture || null}
                  />
                  <div>
                    <p className="font-semibold text-xl">
                      {eventHostRes.data.names.toUpperCase()}
                    </p>
                    <p className="text-gray-600">{eventHostRes.data.email}</p>
                  </div>
                </div>
              </DetailInfoBlock>
            ),
            typeOfSkeleton: "block",
          })}

          {renderData({
            dataTorender: () => (
              <DetailInfoBlock title={"Capacidad"}>
                <p>
                  <strong>Total: </strong>
                  {eventRes.data.capacity} Lugares
                </p>
                <p>
                  <strong>Restantes: </strong>
                  {renderFreeEventSlots()}
                </p>
              </DetailInfoBlock>
            ),
            status: eventStatus,
            typeOfSkeleton: "block",
          })}

          {renderData({
            dataTorender: () => (
              <DetailInfoBlock title={"Modalidad"}>
                <p>{eventRes.data.modality.split("-").join(" ")}</p>
              </DetailInfoBlock>
            ),
            status: eventStatus,
            typeOfSkeleton: "block",
          })}
        </div>
        {renderData({
          dataTorender: () => (
            <DetailInfoBlock title={"Ubicación"}>
              <p className="pb-3 whitespace-nowrap w-full overflow-hidden text-ellipsis">{eventRes?.data.location?.streets}</p>
              <Map coordinates={mapCoordinates()} />
            </DetailInfoBlock>
          ),
          status: eventStatus,
          typeOfSkeleton: "block",
        })}
      </section>
      <section className="flex flex-col col-span-full">
        <h3 className="font-bold text-2xl text-secondary-1">Comentarios</h3>
        <div className="xl:max-w-4xl">
          <Comments eventId={id} />
        </div>
      </section>
    </main>
  );
}
