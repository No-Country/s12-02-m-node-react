import { useEffect, useState } from "react";
import NavbarButton from "../../atoms/navbarButton";
import { useNavigate } from 'react-router-dom'

function Hero({ events }) {
  const [idSelected, setIdSelected] = useState(0);
  const navigate = useNavigate()

  useEffect(()=> {
    const intervaloHero = setInterval(()=> {
      setIdSelected((prevId) => {
        let newId = prevId + 1; 
        if(newId == events.length){
          newId = 0;
          return newId;
        }
        return newId;
      })
    }, 7000)

    return () => {
      clearInterval(intervaloHero);
    }
  },[idSelected])

  return (
    <section className="w-screen h-[500px] text-primary-1 relative">
      <div className="absolute h-full flex flex-col justify-evenly pl-10 z-20">
        <h3 className="text-6xl font-bold">{events[idSelected].title}</h3>
        <footer className="flex-col flex items-start gap-5 w-fit">
          <div className="flex gap-2 w-full justify-center">
            {events.map((event, i) => (
              <button
              onClick={() => setIdSelected(i)}
              className={`focus:outline-none group bg-primary-1 h-4 block rounded-full relative overflow-hidden ${idSelected === i ? 'active w-14': 'w-7 inactive'}`}
              key={event.id}
              aria-label={`show slide ${i+1} of ${events.length}`}
              aria-current={idSelected == i}
              >
                <span className="w-full h-full rounded-full bg-secondary-2 absolute inset-0 transform -translate-x-full group-[.active]:animate-loadIn"></span>
              </button>
            ))}
          </div>
          <NavbarButton
            text="Reservar Ahora"
            filled
            color="primary-1"
            line="black"
            handler={() => navigate(`/event/${events[idSelected].id}`)}
          />
        </footer>
      </div>
      <picture
        className="
      w-full h-full overflow-hidden relative"
      >
        <div className="inset-0 after:bg-gradient-to-r absolute after:from-secondary-1  after:w-f after:h-full after:content-[''] after:block"></div>
        <img
          className="w-full h-full object-cover"
          src={events[idSelected].banner_img}
          alt="event banner image"
        />
      </picture>
    </section>
  );
}

export default Hero;
