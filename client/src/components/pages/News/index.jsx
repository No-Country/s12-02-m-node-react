import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";

function News() {
  const urlImagenPrincipal =
    "https://s3-alpha-sig.figma.com/img/1e3b/3c2b/d2d6795afca6125da85427291c29ad80?Expires=1704067200&Signature=AV7d4vxGZeZBRwm~l8L5ucG6YU-lr9bv9B6M98C6cjBX0mdQKv9G80y2mTlPWWWNaF0~hak8Qmo35vxg2zcEItpQ1kFW7Co4BTi~vBFpM8Dd70uu0zvIWH~O1X7TUS8CheEIFICLIvxClWEntyHBPoeI19iLYiVsTWio6tCZtpRicZt3EAE68nwlooWR0MsZOLLzXS8WrH6Y~IJu-WRQOGfM9XgGVFTpjA6pNfOVm5qzbrn7z3tKU~54LqUyrdKXMTQWejDePgcYFhBlOWt-E1sPkhw6k~HGvGY1f998l1pECh-hNETeNX2iWAzBCgFilgCk2Gjr4IB0y4TIQNAqDw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";
  const urlImagenGastronomia =
    "https://s3-alpha-sig.figma.com/img/e6d0/717f/b977e35eda0e7631c0ad2161f9d3fced?Expires=1704067200&Signature=fShrMuIhPdUB5jci~nuLh0m4COH4X6r-fqmXwthFRU6HsUGRIHyWJzwD7UNToHuRE~zmkSkB8mZ9sUhsAnrgbBGOqAEioAlwSaDurCvih0BQnaZRmW1XERLVKR7k-MmFbCvOsnFbnGbvxYunxphzbpNxlE7KJGFXUixWSRiQVdhOjXu-WWjaSO0uNkxnF6KALyS~xa2E3dA22r3QRH1sQUh-LJT5J5Mp9OsbMvBQ~-gvSA5hPBjsEOCmauEvlSjDNRBc8ejC40WeLTSEAcOl6Fx-~VLEpyByCtu8yy8GicOyBkKFomHJBUWHQqIs0LXcmQstRsa1FQ2xjYSQpRw6eg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";
  const urlImagenDeportes =
    "https://s3-alpha-sig.figma.com/img/56fd/4431/d4aefcdc9aaad5639aa088b3cab26df3?Expires=1704067200&Signature=CvHwQ6Nahnc4xAF5V2EgobfQteUY92D5YM3RPCZWZehwrg5FTaBJDOaz5XIFCMwNCnLxxJmFWrK7NQts~DV41o6oo~3b3VcINJoZoAMyc4TcgQyfifY-VXisPZaqv8XZJ9ralTA5Fhd33EDyxauzDGkk9uYlLgW94U9z6pHopqtmK6PQunXrJivCUssNnYgu7gWqzftQVsJvEC6wvCpvvr3yegTrY2k7ocjFUpa7E5X74K-NbnESvMctLSNratKpAvRiFyLCpdWuhTqRIVAWxJ6LnL3W9xEa9Cg1K0qx0cHrT3F54~F0THMaCfuCjQA6bilPBpv2Wp0L-qrYxiq2vA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";
  const urlImagenSalud =
    "https://s3-alpha-sig.figma.com/img/7b86/d882/0d7be7bb1f4e3860b0ec12894842f3cb?Expires=1704067200&Signature=GR2~~ky-~gbI3MVo~eyR-qy6xJhvLZ2Zo43ohWsrxbMRxzQl54MpSSU9S72tcOSih3lv5nOByZko43c9GYbrgZ6JhUbtfFsuf94RdtfOXDLi3MCRmf2Zrhp8UMdAgaoF7JWUwCGQNHBLHCyMVdBQ3QWov-Z9iWmtOcxNOdFsFmLvsP0dynLmSIwyPXbIJK5ONraLd3TfTkGZ-0aL0E7XlzjkVOkdTZUYXgRTgF84CgrV8caRlvIhi~~eGZqmv2XLe8EG-XFX466sZPkVSwJUoOc8pgp~RLKKlwAx8aXWT1y6t6gRgIhMiNel~tzamsDlvdJi-qw~mRvFof5Ra0I7CQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";
  const urlImagenNegocios =
    "https://s3-alpha-sig.figma.com/img/fa1b/d656/3f861820be26a6a01e1297043b2bb684?Expires=1704067200&Signature=H5~wmsuSjeKFz-AQXSQ4InSLFJ8R9YWbgQPaH1C~O3v2Vv~r2bWg~M-4cNg6JVsRIzzSPj5Ve4HxfzjT16xPk834jyDXKSs4Rl6dQVLobcwIm9SaLXbwl0HVW5hxXy1c8TI0vXhli-3rtHkkjlNnM2DzY-x41fDF7P4b-zpaOaZrocEAFgmQmZeTGOCo1rcEgc4x2PEwHczQ2KRYnceW77uSMHuBp-OzNcb1gRL3uerHr9o6kMPlKIqQaSKf4nU3e97EY1zBmgWLjkEtSTtdtGAUnUUTSw9n8FKsOUiKqJseiTnV1aV3cvF8pW0HB3zMptY59j5DpyZE2gGVuqvmPQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4";

  return (
    <main className="grid place-items-center mb-10">
      <header className="bg-secondary-4 h-fit py-10 w-full">
        <h2 className="text-white text-5xl text-center font-semibold px-2">
          Novedades
        </h2>
      </header>
      <div className="pt-4 px-16 flex flex-col gap-3 max-w-5xl">
        <div className="p-4 pb-8 flex gap-3 items-center justify-between">
          <label className="grow flex items-center gap-2 rounded-3xl bg-gray-200">
            <span className=" left-2 top-3 text-gray-500 mx-2">
              <IoSearchOutline className="w-6 h-6" />
            </span>
            <input
              type="text"
              className="p-2 w-full outline-none bg-transparent "
              placeholder="Buscar evento"
            />
          </label>
          <button className="relative grow-0 w-fit bg-blue-500 rounded-3xl text-white py-2 px-4 flex items-center gap-2">
            <CiFilter className="w-6 h-6" />
            Filtros
          </button>
        </div>
        <picture className="block overflow-hidden rounded-xl h-fit">
          <img
            src={urlImagenPrincipal}
            alt="Descripción de la imagen"
            className="w-full h-auto object-cover"
          />
        </picture>
        <p className="bg-primary-4 text-white py-2 px-4 rounded-3xl w-fit">
          Música
        </p>
        <p className="text-4xl pt-12">
          Diego Torres confirmó su show en Buenos Aires: cómo conseguir las
          entradas
        </p>
        <p className="text-xl pt-12">
          El concierto tendrá lugar el 2 de diciembre en el Movistar Arena, en
          donde presentará su último trabajo, Atlántico a pie, y sus históricos
          hits
        </p>
        <p className="text-sm pt-12 pb-8">17/11/23 - JOSE HERRERA</p>
        <hr className="my-4 border-t-3" />

        <div className="flex gap-2">
          <picture className="max-h-80 max-w-sm overflow-hidden">
            <img
              src={urlImagenGastronomia}
              alt="Descripción de la imagen"
              className="object-cover w-full h-auto"
            />
          </picture>
          <div className="p-1 flex flex-col justify-between items-start">
            <button className="mb-4 bg-primary-4 text-white p-2 rounded-3xl">
              Gastronomia
            </button>
            <p className="mb-4 text-xl ">
              El concierto tendrá lugar el 2 de diciembre en el Movistar Arena,
              en donde presentará su último trabajo, Atlántico a pie, y sus
              históricos hits
            </p>
            <p className="text-sm">17/11/23 - JOSE HERRERA</p>
          </div>
        </div>
        <hr className="my-4 border-t-3" />
        <div className="flex gap-2">
          <picture className="max-h-80 max-w-sm overflow-hidden">
            <img
              src={urlImagenDeportes}
              alt="Descripción de la imagen"
              className="object-cover w-full h-auto"
            />
          </picture>
          <div className="p-1 flex flex-col justify-between items-start">
            <button className="mb-4 bg-primary-4 text-white p-2 rounded-3xl">
              Deportes
            </button>
            <p className="mb-4 text-xl mt-6">
              Agenda deportiva: dónde y cuándo ver todos los eventos del fin de
              semanal
            </p>
            <p className="text-sm">02/12/23 - LUCAS HERNANDEZ</p>
          </div>
        </div>
        <hr className="my-4 border-t-3" />
        <div className="flex gap-2">
          <picture className="max-h-80 max-w-sm overflow-hidden">
            <img
              src={urlImagenSalud}
              alt="Descripción de la imagen"
              className="object-cover w-full h-auto"
            />
          </picture>
          <div className="p-1 flex flex-col justify-between items-start">
            <button className="mb-4 bg-primary-4 text-white p-2 rounded-3xl">
              Salud
            </button>
            <p className="text-xl mb-8 mt-6">
              La Ciudad de Buenos Aires celebra el Mes de las Personas Mayores
            </p>
            <p className="text-sm">06/12/23 - LUCIANA FERRERO</p>
          </div>
        </div>
        <hr className="my-4 border-t-3" />
        <div className="flex gap-2">
          <picture className="max-h-80 max-w-sm overflow-hidden">
            <img
              src={urlImagenNegocios}
              alt="Descripción de la imagen"
              className="object-cover w-full h-auto"
            />
          </picture>
          <div className="p-1 flex flex-col justify-between items-start">
            <button className="mb-4 bg-primary-4 text-white p-2 rounded-3xl w-fit px-4 py-2">
              Negocios
            </button>
            <p className="mb-4 text-xl ">
              Más de 300 marcas participarán del mayor evento de negocios B2B de
              electrodomésticos, celulares e informática de Argentina
            </p>
            <p className="text-sm">10/12/23 - STEFANO FLORES</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default News;
