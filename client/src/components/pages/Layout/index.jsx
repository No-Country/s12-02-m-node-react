import Header from "../../organisms/header";
import Footer from "../../organisms/footer";
import { Outlet } from "react-router-dom";

import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLocations } from "../../../redux/slices/locationsSlice";

function Layout() {
  const dispatch = useDispatch();
  const argentinaProvincias = "https://apis.datos.gob.ar/georef/api/provincias";

  useEffect(() => {
    axios.get(argentinaProvincias).then((res) => {
      const locations = res.data.provincias;
      dispatch(setLocations(locations));
      console.log(locations);
    });
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
