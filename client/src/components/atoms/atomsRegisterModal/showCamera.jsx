import React, { useEffect, useRef,useState } from "react";
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';

export default function ShowCamera ({ updateProfilePicture }){

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

  const [editor, setEditor] = useState(null);
  const dropzoneRef = useRef();
  const videoRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isEditorVisible, setIsEditorVisible] = useState(true);
  const [scaleValue, setScaleValue] = useState(1.2);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    const openCamera = async () => {
      if (showCamera) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
  
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current
              .play()
              .then(() => console.log("Camera access successful"))
              .catch((error) => console.error("Error accessing camera:", error));
          }
        } catch (error) {
          console.error("Error accessing camera:", error);
        }
      }
    };
  
    openCamera();
  
    return () => {
      const stream = videoRef.current?.srcObject;
      const tracks = stream?.getTracks() || [];
  
      tracks.forEach((track) => {
        track.stop();
      });
  
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [showCamera]);

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
    setIsEditorVisible(!isEditorVisible)
    setShowCamera(!showCamera);
    
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

    updateProfilePicture(convertDataUrlToFile(dataURL,'foto'))
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

  const convertDataUrlToFile = (dataUrl, fileName) => {
    const base64String = dataUrl.split(',')[1];
    const byteCharacters = window.atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });
    const file = new File([blob], fileName, { type: 'image/png' });
  
    return file;
  };
  
  
  const handleSave = (e) => {
    e.preventDefault();
    if (editor) {
      const croppedImage = editor.getImageScaledToCanvas().toDataURL();
      setFormData({
        ...formData,
        croppedPicture: croppedImage,
      });
      updateProfilePicture(convertDataUrlToFile(croppedImage,'foto'))
      setIsEditorVisible(false);
    }
  };

    return(
      <div className="flex flex-col justify-center items-center w-full">
        {showCamera &&
          <div>
            <video className="w-48 rounded-full flex justify-center items-center" ref={videoRef}/>
            <div className="flex flex-col gap-2 items-center mt-2 w-full">
              <button
                onClick={handleCaptureSnapshot}
                className="bg-green-500 text-white py-2 px-4 rounded-full w-full"
              >
                Capturar
              </button>
              <button
                onClick={handleCameraClose}
                className="bg-red-500 text-white py-2 px-4 rounded-full w-full"
              >
                Cerrar Cámara
              </button>
            </div>
          </div>}

          {isEditorVisible && (
            <div className="flex flex-col justify-center items-center w-full">
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
                    className={`w-40 h-40 cursor-pointer relative ${
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
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-center text-sm p-4">
                        ¡Arrastra y suelta una imagen aquí o haz clic para
                        seleccionar una!
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
              {formData.picture && (
                <div>
                  <div className="flex items-center justify-center mt-4">
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.1"
                      value={scaleValue}
                      onChange={handleScaleChange}
                    />
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <button
                      onClick={handleSave}
                      className="text-black text-base"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col justify-center">
            {!isEditorVisible && formData.croppedPicture && (
              <>
                <img
                  src={formData.croppedPicture}
                  alt="Foto de Perfil"
                  className="max-h-40 max-w-40 rounded-full"
                />
                <button
                  onClick={() => setIsEditorVisible(true)}
                  className="mt-4 text-black text-base"
                >
                  Editar
                </button>
              </>
            )}
          </div>
          <div className="w-3/5 px-2 flex justify-center">
            <button
              onClick={handleElegir}
              className="bg-blue-500 text-white mt-2 py-2 px-4 rounded-full w-full"
            >
              {!showCamera ? "Abrir camara" : "Archivo PC"}
            </button>
          </div>
      </div>
    );
}