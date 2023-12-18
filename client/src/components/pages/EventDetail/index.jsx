import { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEventDetails } from "../../../redux/slices/detailEventSlice";

import { GoHeart, GoHeartFill } from "react-icons/go";

import Comments from "../../organisms/comments";
import LoadingSkeleton from "../../atoms/loadingSkeleton";

import useFetch from "../../../hooks/useFetch";

import renderDate from "../../../utils/formatDate";

export default function Detail() {
  const [favorited, setFavorited] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  const [eventRes, eventStatus, fetchEvent] = useFetch();
  const [commentsRes, commentsStatus, fetchComments] = useFetch();
  const [bookingRes, bookingStatus, fetchBooking] = useFetch();
  const [userBookingsRes, UserBookingsStatus, fetchUserBookings] = useFetch();


  useEffect(() => {
    fetchEvent({ path: `/event/${id}`, method: "GET" });
    fetchComments({ path: `/comments/all`, method: "GET" });
  }, []);

  useEffect(() => {
    if (eventStatus.success) {
      dispatch(setEventDetails(eventRes.data));
      console.log(eventRes);
    }
    if (commentsStatus.success) {
      console.log(commentsRes);
    }
  }, [eventStatus]);

  useEffect(() => {
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, []);

  const toggleFavorite = () => {
    setFavorited((prev) => !prev);
  };

  useEffect(()=>{
    fetchUserBookings({path:`/bookings/all?email=${user.email}`, method: 'GET'})
  },[])

  const renderData = ({
    dataTorender,
    typeOfSkeleton,
    customSkeletonClass = "",
  }) =>
    eventStatus.success ? (
      dataTorender()
    ) : (
      <LoadingSkeleton className={customSkeletonClass} type={typeOfSkeleton} />
    );

  const handleBook = (e) => {
    e.preventDefault();
    const data = {
      email: user.email,
      event_ID: id,
    };
    fetchBooking({ path: "/bookings", method: "POST", data: data });
  };
  return (
    <main className="w-full grid p-3 gap-7 md:p-7 lg:p-10 lg:gap-10 xl:grid-cols-3">
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
          <div className="flex gap-2 items-center justify-between md:items-start">
            <p className="text-start mt-2 self-end">
              {renderData({
                dataTorender: () => renderDate(eventRes?.data.dates),
                typeOfSkeleton: "line",
              })}
            </p>
            <button
              data-test="toggle_favorite"
              className="text-2xl text-secondary-2 outline-none"
              onClick={toggleFavorite}
            >
              <span className="block w-6 h-6 md:w-8 md:h-8">
                {favorited ? (
                  <GoHeartFill className="w-full h-full" />
                ) : (
                  <GoHeart className="w-full h-full" />
                )}
              </span>
            </button>
          </div>
        </div>
        <button
          onClick={handleBook}
          data-test="book_event"
          className="w-full rounded-full outline-none bg-primary-500 hover:bg-primary-600 shadow-md p-3 text-white md:my-3"
        >
          Reservar Ahora
        </button>
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
      <section className="flex flex-col items-center gap-3 md:flex-row md:items-start lg:gap-7 xl:flex-col">
        <div className="flex flex-col gap-4 bg-primary-1 rounded-xl p-3 w-full lg:max-w-sm xl:max-w-md">
          <h3 className="font-bold py-2 text-xl rounded-xl xl:px-5 xl:py-3">
            Tickets
          </h3>
          <Accordion variant="splitted">
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="Puntos de venta"
              className=""
            >
              Los tickets para el show se pueden adquirir únicamente a través de
              www.movistararena.com.ar.
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col bg-primary-1 rounded-xl">
          <h3 className="font-bold text-xl px-5 pt-5">Ubicacion</h3>
          <p className="px-5 pb-3 ">
            Avenida Corrientes 857 1043 Ciudad Autónoma De Buenos Aires ,Teatro
            Gran Rex
          </p>
          <img className="p-2" src="/image 10.png" alt="" />
        </div>
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
