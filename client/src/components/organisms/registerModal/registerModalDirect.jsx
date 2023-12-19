// RegisterModalDirect.jsx
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import WithGoogleLogin from "../../molecules/registerElements/registerWithGoogle";
import axios from "axios";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';
import { validate } from "../../molecules/registerElements/validations";
import Condiciones from "../../atoms/atomsRegisterModal/condiciones";
import ShowCamera from "../../atoms/atomsRegisterModal/showCamera";


const RegisterModalDirect = () => {
  const [formData, setFormData] = useState({
    names: "",
    lastname: "",
    email: "",
    country: "",
    birthDate: "2000-01-01",
    password: "",
    showPassword: true,
    picture: null,
  });
  const [imageData, setImageData] = useState(null);

  const navigate = useNavigate();
  const [firebaseConfig, setFirebaseConfig] = useState(null);
  const [user, setUser] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleShowPassword = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        names: user.displayName,
        email: user.email,
        password: "********",
      });
      setIsEnabled(false);
    }
  }, [user]); 

  const handleGoogleLoginCallback = (userData) => {
    setUser(userData);
  };

  const updateProfilePicture = (picture) => {
    setFormData((prevData) => ({
      ...prevData,
      picture: picture,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(formData));
    if (errors) {
      try {
        const firebaseCFG = await axios.get("/login");
        if (!firebaseCFG.data) {
          throw new Error("Empty response from server");
        }
        setFirebaseConfig(firebaseCFG.data);
        const app = initializeApp(firebaseCFG.data); 
        const auth = getAuth(app);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        
        const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await axios.post("/user", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
        if (response.data.status === 0) {
          setFirebaseConfig(response.data);
          toHome();
        }
      } catch (error) {
        if (error.response && error.response.data.status === 2) {
          setAlertMessage(
            "El correo electrónico ya fue registrado, utilice otro para registrarse o inicie sesión."
          );
          setShowAlertMessage(true);
          setTimeout(() => {
            setShowAlertMessage(false);
          }, 5000);
        }
        console.error(
          'Error during registration:',
          error.response ? error.response.data.message : error.message
        );
      }
    };
  }
  useEffect(() => {
    if (showAlertMessage) {
      const timeoutId = setTimeout(() => {
        setShowAlertMessage(false);
      }, 5000);
  
      return () => clearTimeout(timeoutId); 
    }
  }, [showAlertMessage]);
  
  const toHome = () => {
    navigate("/");
  };

  return (

    <div className="relative flex flex-col bg-white rounded-lg border-none w-4/5 justify-between items-center p-10 pb-10 mt-12">
      <IoMdClose className="absolute top-4 right-4 text-gray-600 cursor-pointer" size={24} onClick={toHome} />

      <h1 className="text-black text-center font-poppins text-5xl font-semibold leading-tight mb-4">
        Regístrate
      </h1>

      <div className="flex-1">
        <h2 className="text-1xl font-bold text-center">
          Completa los datos para registrarte
        </h2>
        <p className="text-1xl text-center">o</p>
        <WithGoogleLogin
          onGoogleLogin={handleGoogleLoginCallback}
          setShowAlertMessage={setShowAlertMessage}
          setAlertMessage={setAlertMessage}
        />
        
      </div>
      <div className="flex-1"> 
      {showAlertMessage && (
            <div>
              <p className="bg-red-500 text-white font-medium py-2 px-5 mt-2 focus:outline-none focus:shadow-outline">
                {alertMessage}
              </p>
            </div>
          )}
      </div>
      <form className="flex flex-col max-w-6xl w-full mt-8 pt-8 items-center justify-center border-t" encType="multipart/form-data">
        <div className="flex flex-row items-start">
        <ShowCamera updateProfilePicture={updateProfilePicture}/>
          <div className="flex flex-col w-5/5 items-">
            <div className="flex flex-wrap w-4/5 ">

              <div className="w-full px-2 mb-10">
                <input
                  className={`border-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black ${
                    errors.names ? "border-red-500" : "border-gray-500"
                  }`}
                  id="names"
                  type="text"
                  placeholder="Nombre"
                  name="names"
                  value={formData.names}
                  onChange={handleChange}
                  title={errors.names}
                />
                <p className="text-sm italic text-red-500">{errors.names}</p>
              </div>

              <div className="w-full px-2 mb-10">
                <input
                  className={`border-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black ${
                    errors.lastname ? "border-red-500" : "border-gray-500"
                  }`}
                  id="lastname"
                  type="text"
                  placeholder="Apellido"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                <p className="text-sm italic text-red-500">{errors.lastname}</p>
              </div>

              <div className="w-full px-2 mb-10">
                <input
                  className={`border-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black ${
                    errors.birthDate ? "border-red-500" : "border-gray-500"
                  }`}
                  id="birthDate"
                  type="date"
                  placeholder="Fecha de Nacimiento"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
                <p className="text-sm italic text-red-500">{errors.birthDate}</p>
              </div>

              <div className="w-full px-2 mb-10">
                <input
                  className={`border-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black ${
                    errors.country ? "border-red-500" : "border-gray-500"
                  }`}
                  id="country"
                  type="text"
                  placeholder="País"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
                <p className="text-sm italic text-red-500">{errors.country}</p>
              </div>

              <div className="w-full px-2 mb-10">
                <input
                  className={`border-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black ${
                    errors.email ? "border-red-500" : "border-gray-500"
                  }`}
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEnabled}
                />
                <p className="text-sm italic text-red-500">{errors.email}</p>
              </div>

              <div className="w-full px-2 mb-10">
                <div className="flex items-center">
                  <input
                    className={`border-b w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black ${
                      errors.password ? "border-red-500" : "border-gray-500"
                    }`}
                    id="password"
                    type={formData.showPassword ? "password" : "text"}
                    placeholder="Contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={!isEnabled}
                  />
                </div>
                  <p className="text-sm italic text-red-500">{errors.password}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mb-8 mt-2 w-full">
          <button
            className="w-2/5 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Registrarse
          </button>
          
        </div>

      </form>

      <Condiciones/>

    </div>
  );
};

export default RegisterModalDirect;
