import axios from "axios";
import { useState } from "react";

const useFetch = () => {
//http://localhost:3031/api //Local
//https://event-wave-server.vercel.app/api //deployada

  const connection = axios.create({
    baseURL: 'http://localhost:3031/api'
  });

  const [infoApi, setInfoApi] = useState();
  const [fetchStatus, setFetchStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const handleSuccess = (data) => {
    setFetchStatus({ loading: false, success: true, error: null });
    setInfoApi(data);
  };

  const handleError = (error) => {
    setFetchStatus({ loading: false, success: false, error });
  };

  const fetchData = ({path = "", data = {}, config = {}, method = "POST"}) => {
    setFetchStatus({ loading: true, success: false, error: null });

    connection({
      method,
      url: `${path}`,
      data,
      ...config,
    })
      .then((res) => {
        handleSuccess(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  return [infoApi, fetchStatus, fetchData];
};

export default useFetch;
