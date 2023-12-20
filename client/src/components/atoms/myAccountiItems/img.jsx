import React, { useEffect, useState, useRef } from 'react';
import { FaRegImage } from 'react-icons/fa';

const Img = ({ picture }) => {
  const [image, setImage] = useState();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Verificar si es la primera renderización
    if (isFirstRender.current) {
      setImage(picture);
      isFirstRender.current = false;
    }
  }, [picture]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
        onChange={handleImageChange}
        className="hidden"
      />
      <span className="text-black text-center text-sm">
        Se recomienda: JPG, PNG o GIF, al menos 1.000 píxeles por lado.
      </span>
    </div>
  );
};

export default Img;
