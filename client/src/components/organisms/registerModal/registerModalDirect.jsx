// RegisterModalDirect.jsx
import React, { useRef,useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import WithGoogleLogin from "../../molecules/registerElements/registerWithGoogle";
import axios from "axios";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';
import { validate } from "../../molecules/registerElements/validations";
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';


const RegisterModalDirect = () => {
  const [formData, setFormData] = useState({
    names: "",
    lastname: "",
    email: "",
    country: "",
    birthDate: "2000-01-01",
    picture: null,
    password: "",
    showPassword: true,
  });

  const navigate = useNavigate();
  const [firebaseConfig, setFirebaseConfig] = useState(null);
  const [user, setUser] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlertMessage, setshowAlertMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const [editor, setEditor] = useState(null);
  const dropzoneRef = useRef();
  const videoRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditorVisible, setIsEditorVisible] = useState(true);
  const [scaleValue, setScaleValue] = useState(1.2);
  const [showCamera, setShowCamera] = useState(false);
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validate(user||formData));
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

        const response = await axios.post("/user", formData);
        if (response.data.status === 0) {
          setFirebaseConfig(response.data);
          toHome();
        }
      } catch (error) {
        if (error.response && error.response.data.status === 2) {
          setAlertMessage(
            "El correo electrónico ya fue registrado, utilice otro para registrarse o inicie sesión."
          );
          setshowAlertMessage(true);
          setTimeout(() => {
            setshowAlertMessage(false);
          }, 5000);
        }
        console.error(
          'Error during registration:',
          error.response ? error.response.data.message : error.message
        );
      }
    };
  }

  const toHome = () => {
    navigate("/");
  };
 
  const handleFileChange = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        picture: reader.result,
        croppedPicture: null, 
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleScaleChange = (e) => {
    setScaleValue(parseFloat(e.target.value));
    if (editor) {
      editor.setScale(parseFloat(e.target.value));
    }
  };

  const handleToggleCamera = () => {
    setShowCamera(!showCamera);
  };

  const handleElegir = async (e) => {
    e.preventDefault();
    setIsEditorVisible(false)
    setShowCamera(true);
    if (showCamera===true) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("videoRef.current:", videoRef.current);
  
        videoRef.current.srcObject = stream;
        videoRef.current.play()
    .then(() => console.log("Camera access successful"))
    .catch(error => console.error("Error accessing camera:", error));
  
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };
  }

  const handleCameraCapture = async (e) => {
    e.preventDefault();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("videoRef.current:", videoRef.current);

      videoRef.current.srcObject = stream;
      videoRef.current.play()
  .then(() => console.log("Camera access successful"))
  .catch(error => console.error("Error accessing camera:", error));

    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleCaptureSnapshot = (e) => {
    e.preventDefault();
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    const dataURL = canvas.toDataURL("image/png");
    setFormData({
      ...formData,
      picture: dataURL,
      croppedPicture: null,
    });

    tracks.forEach((track) => {
      track.stop();
    });

    videoRef.current.srcObject = null;
    setIsEditorVisible(true);
    setShowCamera(false)
  };

  const handleCameraClose = (e) => {
    e.preventDefault();
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    videoRef.current.srcObject = null;
    setIsEditorVisible(true);
    setShowCamera(false)
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editor) {
      const croppedImage = editor.getImageScaledToCanvas().toDataURL();
      setFormData({
        ...formData,
        croppedPicture: croppedImage,
      });
      setIsEditorVisible(false);
    }
  };

  
  return (
    <div className="relative flex flex-col bg-white rounded-lg border-none w-3.5/5 justify-between items-center p-8 pb-10 mt-12">
      <IoMdClose
        className="absolute top-4 right-4 text-gray-600 cursor-pointer"
        size={24}
        onClick={toHome}
      />
      <h1 className="text-black text-center font-poppins text-5xl font-semibold leading-tight mb-4">
        Regístrate
      </h1>
      <div className="flex-1">
        <WithGoogleLogin
          onGoogleLogin={handleGoogleLoginCallback}
          mostrarError={setshowAlertMessage}
          alertMessageError={setAlertMessage}
        />
      </div>
      <form className="flex flex-col max-w-6xl w-full pl-10 pt-5">
        <p className="text-1xl text-center mr-8">o</p>
        <h2 className="text-1xl font-bold mb-10 mr-8 text-center">
          Completa los datos para registrarte
        </h2>
        {showCamera &&
        <div>
          <video ref={videoRef}/>
          <div className="flex items-center mt-2">

              <button
                onClick={handleCaptureSnapshot}
                className="bg-green-500 text-white py-2 px-4 rounded-full mr-2"
              >
                Capturar
              </button>
              <button
                onClick={handleCameraClose}
                className="bg-red-500 text-white py-2 px-4 rounded-full"
              >
                Cerrar Cámara
              </button>
            </div>
        </div>}
        {isEditorVisible && (
          <div className="w-full sm:w-1/2 px-2 mb-10">
            <Dropzone
              ref={dropzoneRef || videoRef}
              onDrop={handleFileChange}
              accept="image/*"
              noClick={formData.picture}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className={`mt-1 w-40 h-40 overflow-hidden cursor-pointer relative ${
                    isDragging ? "border-dashed border-4 border-blue-500" : ""
                  }`}
                >
                  <input {...getInputProps()} />
                  {formData.picture ? (
                    <>
                      <img
                        src={formData.picture}
                        alt="Foto de Perfil"
                        className="w-full h-full object-cover rounded-full"
                        style={{ width: "100%", height: "100%" }}
                      />
                      <AvatarEditor
                        ref={(ref) => setEditor(ref)}
                        image={formData.picture}
                        width={160}
                        height={160}
                        border={3}
                        borderRadius={100}
                        scale={scaleValue}
                        style={{ position: "absolute", top: 0, left: 0 }}
                      />
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                      ¡Arrastra y suelta una imagen aquí o haz clic para
                      seleccionar una!
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
            {formData.picture && (
              <div>
                <div className="flex items-center mt-2 ml-4">
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={scaleValue}
                    onChange={handleScaleChange}
                  />
                </div>
                <div className="flex items-center mt-2">
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full ml-2"
                  >
                    Guardar Recorte
                  </button>
                </div>
              </div>
            )}
            
          </div>
        )}

        <div className="w-full sm:w-1/2 px-2 mb-10">
          {!isEditorVisible && formData.croppedPicture && (
            <>
              <img
                src={formData.croppedPicture}
                alt="Foto de Perfil"
                className="mt-2 max-h-40 max-w-40 rounded-full"
              />
              <button
                onClick={() => setIsEditorVisible(true)}
                className="ml-2 mt-2 bg-blue-500 text-white py-2 px-4 rounded-full"
              >
                Editar Recorte
              </button>
            </>
          )}
        </div>
        <div className="w-full sm:w-1/2 px-2 mb-2">
          <button
            onClick={handleElegir}
            className="bg-blue-500 text-white py-2 px-4 rounded-full ml-2"
          >
            Abrir cam
          </button>
        </div>
        
        <div className="flex flex-wrap w-full">
          <div className="w-full sm:w-1/2 px-2 mb-10">
            <input
              className={`border-b w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black ${
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
            <p className="text-xls italic text-red-500">{errors.names}</p>
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-10">
            <input
              className={`border-b w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black ${
                errors.lastname ? "border-red-500" : "border-gray-500"
              }`}
              id="lastname"
              type="text"
              placeholder="Apellido"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
            <p className="text-xls italic text-red-500">{errors.lastname}</p>
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-10">
            <input
              className={`border-b w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black ${
                errors.birthDate ? "border-red-500" : "border-gray-500"
              }`}
              id="birthDate"
              type="date"
              placeholder="Fecha de Nacimiento"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
            <p className="text-xls italic text-red-500">{errors.birthDate}</p>
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-10">
            <input
              className={`border-b w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black ${
                errors.country ? "border-red-500" : "border-gray-500"
              }`}
              id="country"
              type="text"
              placeholder="País"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            <p className="text-xls italic text-red-500">{errors.country}</p>
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-10">
            <input
              className={`border-b w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black ${
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
            <p className="text-xls italic text-red-500">{errors.email}</p>
          </div>
          <div className="w-full sm:w-1/2 px-2 mb-10">
            <div className="flex items-center">
              <input
                className={`border-b w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 placeholder-black ${
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
            <p className="text-xls italic text-red-500">{errors.password}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Registrarse
          </button>
          {showAlertMessage && (
            <div>
              <p className="bg-red-500 hover:bg-gray-700 text-white font-medium py-2 px-5 rounded-full focus:outline-none focus:shadow-outline">
                {alertMessage}
              </p>
            </div>
          )}
        </div>
      </form>
      <div className="text-gray-600 text-xs mt-4">
        <p className="border-b border-gray-300 pb-2 mb-2">
          *Al registrarte, aceptas nuestras Condiciones de Servicio y reconoces
          que has leído nuestra Política de Privacidad{" "}
        </p>
        <p>
          Este sitio está protegido por Eventeware int. Se aplican la Política
          de Privacidad y las Condiciones de Servicio de Google.
        </p>
      </div>
    </div>
  );
};

export default RegisterModalDirect;
