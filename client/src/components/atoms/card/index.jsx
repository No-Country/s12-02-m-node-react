const dataCard = {
    photo: 'https://th.bing.com/th/id/OIP.zF_astuhx1EG7SVCpqar2gHaEo?rs=1&pid=ImgDetMain',
    title: 'Congreso de Ciberseguridad',
    date: '3 de febrero de 2024',
    location: 'Virtual',
  }

export const Card = ({cardInfo}) => {
    return (
      <div className="snap-start flex flex-col gap-3 p-3 shadow-md rounded-lg min-w-fit lg:mb-5">
        <img
          className="w-full h-[200px] object-cover rounded-lg"
          src={dataCard.photo}
          alt="Imagen evento"
        />
        <div>
          <h1 className="text-primary-4 text-xl">{dataCard.title}</h1>
          <div className="flex flex-row items-center gap-2 text-primary-5 text-xs min-w-fit">
            <p className="inline-block">{dataCard.date}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
              <circle cx="2.5" cy="2.5" r="2.5" fill="#828D9E" />
            </svg>
            <p>{dataCard.location}</p>
          </div>
        </div>
        <button className="w-28 text-primary-4 text-sm font-semibold bg-transparent border border-primary-4 rounded-full px-6 py-2">
          Ver más
        </button>
      </div>
    );
  };
  