import React, { useEffect, useState, useRef } from "react";
import { FaRegImage } from "react-icons/fa";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";

export default function Form({ userData }) {
  const [image, setImage] = useState();
  const isFirstRender = useRef(true);
  const [formData, setFormData] = useState({
    names: userData.names,
    lastname: userData.lastname,
    birthDate: userData.birthDate.slice(0, 10),
    country: userData.country,
    picture: userData.picture,
  });
  const navigate = useNavigate()

  useEffect(() => {
    if (isFirstRender.current) {
      setImage(userData.picture);
      isFirstRender.current = false;
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "picture") {
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
          setFormData((prevData) => ({
            ...prevData,
            picture: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
  
    // Agregar campos de texto al formulario
    formDataToSend.append("names", formData.names);
    formDataToSend.append("lastname", formData.lastname);
    formDataToSend.append("birthDate", formData.birthDate);
    formDataToSend.append("country", formData.country);
  
    // Agregar archivo al formulario
    if (image) {
      const blob = await fetch(image).then((res) => res.blob());
      formDataToSend.append("picture", blob, "profile.jpg");
    }
  
    try {
      console.log("estos datos se vana enviar", formDataToSend.get("picture"));

      const response = await axios.put(`user/${userData.email}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const newDataUser = await axios.get(`/user/${userData.email}`);
        if (newDataUser.data.status === 0) {
          localStorage.setItem("user", JSON.stringify(newDataUser.data.data));
          navigate("/");
        }
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };
  
  
  

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative inline-block flex flex-row justify-center items-center gap-6">
        {image ? (
          <div className="relative inline-block">
            <img src={image} className="w-40 h-40 rounded-lg" alt="Profile" />
            <label
              htmlFor="fileInput"
              className="absolute bottom-1 right-1 cursor-pointer bg-white bg-opacity-70 p-1 rounded-full"
            >
              <FaRegImage />
            </label>
          </div>
        ) : (
          <label
            htmlFor="fileInput"
            className="relative w-40 h-40 border border-dashed border-gray-300 flex items-center justify-center rounded-lg cursor-pointer bg-white"
          >
            <span className="text-gray-500 text-center text-sm">
              Seleccione una imagen
            </span>
            <label
              htmlFor="fileInput"
              className="absolute bottom-1 right-1 cursor-pointer bg-white bg-opacity-70 p-1 rounded-full"
            >
              <FaRegImage />
            </label>
          </label>
        )}
        <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        name="picture"  
      />
        <span className="text-black text-center text-sm">
          Se recomienda: JPG, PNG o GIF, al menos 1.000 píxeles por lado.
        </span>
      </div>
      <div>
        <label className="text-black font-poppins text-lg" htmlFor="firstName">
          Nombre
        </label>
        <input
          className="bg-white py-3 px-6 block rounded-xl outline-2 outline-secondary-2 focus:outline hover:outline focus:shadow-lg shadow-secondary-1 w-full mt-1"
          type="text"
          id="names"
          name="names"
          value={formData.names}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="text-black font-poppins text-lg" htmlFor="lastName">
          Apellido
        </label>
        <input
          className="bg-white py-3 px-6 block rounded-xl outline-2 outline-secondary-2 focus:outline hover:outline focus:shadow-lg shadow-secondary-1 w-full mt-1"
          type="text"
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="text-black font-poppins text-lg" htmlFor="email">
          Fecha de Nacimiento
        </label>
        <input
          className="bg-white py-3 px-6 block rounded-xl outline-2 outline-secondary-2 focus:outline hover:outline focus:shadow-lg shadow-secondary-1 w-full mt-1"
          type="date"
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="text-black font-poppins text-lg" htmlFor="location">
          País
        </label>
        <input
          className="bg-white py-3 px-6 block rounded-xl outline-2 outline-secondary-2 focus:outline hover:outline focus:shadow-lg shadow-secondary-1 w-full mt-1"
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full focus:outline-none focus:shadow-outline w-full mt-6"
          type="button"
          onClick={handleSubmit}
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
