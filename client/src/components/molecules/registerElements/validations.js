export const validate = (user) => {
  let errors = {};

  if (!user.names) { 
    errors.names = "El nombre es requerido";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s¨']*$/u.test(user.names)) {
          errors.names = "El nombre solo puede contener letras.";
        } else if (user.names.length > 20) {
                errors.names = "La longitud máxima 20 caracteres";
              }

  if (!user.lastname) { 
    errors.lastname = "El apellido es requerido";
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s¨']*$/u.test(user.lastname)) {
          errors.lastname = "El apellido solo puede contener letras.";
        } else if (user.lastname.length > 20) {
                errors.lastname = "La longitud máxima 20 caracteres";
              }

  if (!user.email) {
    errors.email = "El email es requerido";
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(user.email)) {
          errors.email = "El email no tiene un formato válido";
        }
  
  if (!user.country) {
    errors.country = "El país es requerido";
  } else if (!/^[a-zA-Z\s'-]+$/.test(user.country)) {
          errors.country = "El país no tiene un formato válido";
        }

  if (!user.birthDate) {
    errors.birthDate = "La fecha de nacimiento es requerida";
  } else {
    const birthDate = new Date(user.birthDate);
    const currentDate = new Date();
  
    if (isNaN(birthDate.getTime())) {
      errors.birthDate = "La fecha de nacimiento no tiene un formato válido (use el formato YYYY-MM-DD)";
    } else if (currentDate.getFullYear() - birthDate.getFullYear() > 120) {
            errors.birthDate = "La persona no puede tener más de 120 años";
          } else if (birthDate >= currentDate) {
                  errors.birthDate = "La fecha de nacimiento no puede ser igual o posterior a la fecha actual";
                }
              }
  
  if (!user.password) {
    errors.password = "La contraseña es requerida";
  } else if (user.password.length() < 6) {
          errors.password = "La contraseña debe tener al menos 6 caracteres.";
        }
  
  return errors;
};