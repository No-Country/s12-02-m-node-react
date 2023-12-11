import axios from "axios";
import { useState } from "react";

function UseGeolocalization() {
  const [location, setLocation] = useState("");
  const [fetchStatus, setFetchStatus] = useState({
    success: false,
    loading: false,
    error: false,
  });

  let available = false;
  try {
    if (navigator.geolocation) {
      available = true;
      const getLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
          setFetchStatus({ success: false, loading: true, error: false });
          const { latitude, longitude } = position.coords;
          const apiKey = "5423a98191d94146968b2d9d2544bd12";
          const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

          const response = await axios.get(apiUrl);
          const data = response.data.results[0].components;
          let userLocation = data.city || data.town || data.county;
          if (userLocation) {
            setLocation(userLocation);
            setFetchStatus({ success: true, loading: false, error: false });
          }
        });
      };
      return [location, fetchStatus, getLocation];
    } else {
      alert(
        "permitenos acceder a tu ubicacion para personalizar tu feed segun tu localizacion"
      );
    }
  } catch (error) {
    console.error("Error al obtener la ubicacion o la ciudad:", error.message);
  }
}

export { UseGeolocalization };
