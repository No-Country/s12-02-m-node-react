import React, { useState } from 'react';

export default function Input () {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        location: '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Datos guardados:", formData);
        try {
          const response = await axios.post("/user", formData);
          console.log(response);
        } catch (error) {
          console.error("Error al guardar los cambios:", error);
        }
      };

      return (
        <div className='flex flex-col gap-4 w-full'>
          <div>
            <label className="text-black font-poppins text-lg" htmlFor="firstName">Nombre</label>
            <input
              className="bg-white py-3 px-6 block rounded-xl outline-2 outline-secondary-2 focus:outline hover:outline focus:shadow-lg shadow-secondary-1 w-full mt-1"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-black font-poppins text-lg" htmlFor="lastName">Apellido</label>
            <input
              className="bg-white py-3 px-6 block rounded-xl outline-2 outline-secondary-2 focus:outline hover:outline focus:shadow-lg shadow-secondary-1 w-full mt-1"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
    
          <div>
            <label className="text-black font-poppins text-lg" htmlFor="email">Email</label>
            <input
              className="bg-white py-3 px-6 block rounded-xl outline-2 outline-secondary-2 focus:outline hover:outline focus:shadow-lg shadow-secondary-1 w-full mt-1"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
    
          <div>
            <label className="text-black font-poppins text-lg" htmlFor="location">Ubicación</label>
            <input
              className="bg-white py-3 px-6 block rounded-xl outline-2 outline-secondary-2 focus:outline hover:outline focus:shadow-lg shadow-secondary-1 w-full mt-1"
              type="text"
              id="location"
              name="location"
              value={formData.location}
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
  };
