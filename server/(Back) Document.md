# inicio
# EventWave (BackEnd)
**servidor**:  Express

**BD**: MongoDB

**URL Local**: http://localhost:3031/api

**URL Deploy**:https://event-wave-server.vercel.app/api

**Mensajes/Respuesta**: {<br>
			data: {}, //Objeto con los datos<br>
			status: 0 o 1, //0 caso correcto - 1 Error<br>
			message: 'mensaje', //mensaje de error<br>
		}<br>
- [Rutas](#rutas)
  - [/user](#user)
    - [Crear usuario](#crear-usuario)
    - [Traer un usuario](#traer-usuario)
    - [Traer todos los usuarios](#traer-todos-los-usuarios)
    - [Actualizar datos de un usuario](#actualizar-datos-usuario)
  - [/events](#events)
    - [Crear un evento](#crear-evento)
    - [Traer un evento](#traer-un-evento)
    - [Traer todos los eventos](#traer-todos-los-eventos)
	- [Eliminar un evento](#eliminar-datos-evento)
	- [Actualizar un evento](#actualizar-datos-evento)
  - [/bookings](#bookings)
    - [Crear una reserva](#crear-reserva)
    - [Traer una reserva](#traer-una-reserva)
    - [Traer todas las reservas](#traer-todas-las-reservas)
	- [Eliminar una reserva](#eliminar-datos-reserva)
	- [Actualizar una reserva](#actualizar-datos-reserva)
  - [/comments](#comments)
    - [Crear un comentario](#crear-comentario)
    - [Traer todos los comentarios](#traer-todos-los-comentarios)
	- [Eliminar un comentario](#eliminar-datos-comentario)
	- [Actualizar datos de un comentario](#actualizar-datos-comentario)
- [Modelos/Tablas](#modelos)
  - [User (usuarios)](#users-model)
  - [Events (eventos)](#events-model)
  - [Bookings (reservas)](#bookings-model)
  - [Comments (comentarios)](#comments-model)


# Rutas

## /user 
### crear-usuario
**POST**:  /user (CREAR USUARIO)
	Descripción: Se encarga de registrar el usuario previamente autenticado por firebase en nuestra BD.<br>
	*URL*: /user/<br>
	*Respuesta (200)*: {<br>
  "status": 0,<br>
  "message": "Usuario creado correctamente"<br>
}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "Error al crear un usuario"<br>
	}<br>
|Params|Body  |
|--|--|
|  | names|
|  | lastnames |
|  | birthDate |
|  | email |
|  | country |
|  | picture |
|  | rol |
---
[<¬ Menú](#inicio)

### traer-usuario
**GET**:  /user/:email (TRAER UN USUARIO)
	Descripción: Se encarga de traer los datos de un usuario que coincida con el email pasado como parametro.<br>
	*URL*: /user/email@email.com<br>
	*Respuesta (200)*: {<br>
	data: {names,country,lastname,birthDate,email,picture,role},<br>
  		"status": 0,<br>
  		"message": "Usuario encontrado exitosamente."<br>
	}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "Error al crear un usuario"<br>
	}<br>

|Params|Body  |
|--|--|
| email |  |
---
[<¬ Menú](#inicio)

### traer-todos-los-usuarios
**GET**:  /user/ (TRAE TODOS LOS USUARIO)
	Descripción: Se encarga de traer todos los usuarios.<br>
	*URL*: /user/
	*Respuesta (200)*: {<br>
	data: [{names,country,lastname,birthDate,email,picture,role}],<br>
  		"status": 0,<br>
  		"message": "Se han encontrado los siguientes usuarios"<br>
	}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "No hay usuarios para mostrar."<br>
	}<br>

|Params|Body  |
|--|--|
|  |  |
---
[<¬ Menú](#inicio)

### actualizar-datos-usuario
**PUT**:  /update/:email (ACTUALIZACION DATOS USUARIO)
	Descripción: Se encarga de actualizar los datos de un usuario que coinciden con el email pasado por parametro.<br>
	*URL*: /user/email@email.com
	*Respuesta (200)*: {<br>
	data: [{names,country,lastname,birthDate,email,picture,role}],<br>
  		"status": 0,<br>
  		"message": "La actualización de datos fue exitosa."<br>
	}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "No se pudo realizar la actualización."<br>
	}<br>

|Params|Body  |
|--|--|
| email | names|
|  | lastnames |
|  | birthDate |
|  | email |
|  | country |
|  | picture |
|  | rol |
---
[<¬ Menú](#inicio)

## /event
### crear-evento
**POST**:  /event (CREAR UN EVENTO)
	Descripción: Se encarga de crear un evento en la BD.<br>
	*URL*: /event/<br>
	*Respuesta (200)*: {<br>
  "data: response",	<br>
  "status": 0,<br>
  "message": "Evento creado con éxito"<br>
}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "Error al crear un evento"<br>
	}<br>
|Params|Body  |
|--|--|
|  | email |
|  | title |
|  | description |
|  | capacity |
|  | dates |
|  | startHour |
|  | endHour |
|  | ubication |
|  | category |
|  | price |
|  | minimumAge |
---
[<¬ Menú](#inicio)

### traer-un-evento
**GET**:  /event/:id (TRAER UN EVENTO)
	Descripción: Se encarga de traer los datos de un evento que coincida con el id pasado como parametro.<br>
	*URL*: /event/6570bd4572c6d504382d4b1e<br>
	*Respuesta (200)*: {<br>
	data: {email,title,description,capacity,dates,startHour,endHour,modality,ubication,category,	price,minimumAge},<br>
  		"status": 0,<br>
  		"message": "Evento encontrado."<br>
	}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "Evento no encontrado"<br>
	}<br>

|Params|Body  |
|--|--|
| id |  |
---
[<¬ Menú](#inicio)

### traer-todos-los-eventos
**GET**:  /event/ (TRAE TODOS LOS EVENTOS)
	Descripción: Se encarga de traer todos los eventos.<br>
	*URL*: /event/
	*Respuesta (200)*: {<br>
	data: [{email,title,description,capacity,dates,startHour,endHour,modality,ubication,category,	price,minimumAge}],<br>
  		"status": 0,<br>
  		"message": ""<br>
	}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "error"<br>
	}<br>

|Params|Body  |
|--|--|
|  |  |
---
[<¬ Menú](#inicio)

### eliminar-datos-evento
**DELETE**:  /event/:id (ELIMINA UN EVENTO)
	Descripción: Se encarga de eliminar un evento que coincida con el id proporcionado.<br>
	*URL*: /event/6570bd4572c6d504382d4b1e<br>
	*Respuesta (200)*: {<br>
	data: [{names,country,lastname,birthDate,email,picture,role}],<br>
		"data: response,<br>
  		"status": 0,<br>
  		"message": "Evento eliminado con éxito"<br>
	}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "No se pudo realizar la eliminacion."<br>
	}<br>

|Params|Body  |
|--|--|
| id |  |
---
[<¬ Menú](#inicio)

### actualizar-datos-evento
**PUT**:  /event/:id (ACTUALIZA UN EVENTO)
	Descripción: Se encarga de actualizar los datos de un evento que coincida con el id proporcionado.<br>
	*URL*: /event/6570bd4572c6d504382d4b1e<br>
	*Respuesta (200)*: {<br>
		"data": [{names,country,lastname,birthDate,email,picture,role}],<br>
  		"status": 0,<br>
  		"message": "Evento eliminado con éxito"<br>
	}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "No se pudo realizar la actualización."<br>
	}<br>

|Params|Body  |
|--|--|
| id  | email |
|  | title |
|  | description |
|  | capacity |
|  | dates |
|  | startHour |
|  | endHour |
|  | ubication |
|  | category |
|  | price |
|  | minimumAge |
---
ACLARACION: POR BODY PUEDE PASAR UNO, DOS O LOS DATOS QUE QUIERA.
[<¬ Menú](#inicio)

## /bookings
### crear-reserva
**POST**:  /bookings (CREAR UNA RESERVA)
	Descripción: Se encarga de crear una reserva en la BD.<br>
	*URL*: /bookings/<br>
	*Respuesta (200)*: {<br>
  "data: {}",	<br>
  "status": 0,<br>
  "message": "Se han guardado con éxito la reserva."<br>
}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "Error"<br>
	}<br>
|Params|Body  |
|--|--|
|  | email |
|  | event_ID |
---
[<¬ Menú](#inicio)

### traer-una-reserva
**GET**:  /bookings/one/:id (TRAER UNA RESERVA)
	Descripción: Se encarga de traer los datos de una reserva que coincida con el parametro pasado, puede ser un id o un email.<br>
	*URL*: /bookings/one/6570bd4572c6d504382d4b1e<br>
	*URL*: /bookings/one/email@email.com<br>
	*Respuesta (200)*: {<br>
	data: {email,event_ID},<br>
  		"status": 0,<br>
  		"message": "Se han encontrado la siguiente reserva."<br>
	}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "No hay reserva para mostrar que coincidan con sus criterios de búsqueda."<br>
	}<br>

|Params|Body  |
|--|--|
| id |  |
| email |  |
---
[<¬ Menú](#inicio)

### traer-todas-las-reservas
**GET**:  /bookings/all (TRAE TODAS LAS RESERVAS)
	Descripción: Se encarga de traer todos los eventos.<br>
	*URL*: /bookings/all
	*Respuesta (200)*: {<br>
	data: [{email,event_ID},],<br>
  		"status": 0,<br>
  		"message": "Se han encontrado las siguientes reservas."<br>
	}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "error"<br>
	}<br>

|Params|Body  |
|--|--|
|  |  |
---
[<¬ Menú](#inicio)

### eliminar-datos-reserva
**DELETE**:  /bookings/delete/:mode/:id (ELIMINA UNA RESERVA)
	Descripción: Se encarga de eliminar una reserva que coincida con el id o email proporcionado. Ademas se debe pasar por parametro el modo de eliminacion (0-Físico / 1-Lógico)<br>
	*URL*: /delete/0/6570bd4572c6d504382d4b1e<br>
	*URL*: /delete/1/6570bd4572c6d504382d4b1e<br>
	*URL*: /delete/1/email@email.com<br>
	*Respuesta (200)*: {<br>
	data: [{names,country,lastname,birthDate,email,picture,role}],<br>
		"data: response,<br>
  		"status": 0,<br>
  		"message": "La publicación ha sido eliminada exitosamente. (Fisica o Logica)"<br>
	}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "No se encontró ninguna publicación para eliminar con ese filtro."<br>
	}<br>

|Params|Body  |
|--|--|
| id |  |
| email |  |
---
[<¬ Menú](#inicio)

### actualizar-datos-evento
**PUT**:  /bookings/update/ (ACTUALIZA UN EVENTO)
	Descripción: Se encarga de actualizar los datos de una reserva que coincida con el id proporcionado por body.<br>
	*URL*: /bookings/update<br>
	*Respuesta (200)*: {<br>
		"data": {email,event_ID},<br>
  		"status": 0,<br>
  		"message": "Reserva actualizada con éxito"<br>
	}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "No se pudo realizar la actualización."<br>
	}<br>

|Params|Body  |
|--|--|
| id |  |
---
[<¬ Menú](#inicio)

## /comments
### crear-comentario
**POST**:  /comments (CREAR UN COMENTARIO)
	Descripción: Se encarga de crear un comentario en la BD. Recibe la informacion por body.<br>
	*URL*: /comments/<br>
	*Respuesta (200)*: {<br>
  "data: {text,email,event_ID"
  }",	<br>
  "status": 0,<br>
  "message": "Se han guardado con éxito el comentario."<br>
}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "Error"<br>
	}<br>
|Params|Body  |
|--|--|
|  | text |
|  | email |
|  | event_id |
---
[<¬ Menú](#inicio)

### traer-todos-los-comentarios
**GET**:  /comments/all (TRAE TODOS LOS COMENTARIOS)
	Descripción: Se encarga de traer todos los comentarios. Se le puede pasar por params una query para filtrar por ej todos los comentarios pertenecientes a una publicacion.<br>
	*URL*: /comments/all
	*Respuesta (200)*: {<br>
	data: [{id,text,email,date,active,event_ID},],<br>
  		"status": 0,<br>
  		"message": "Se han encontrado los siguientes comentarios."<br>
	}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "No hay comentarios para mostrar"<br>
	}<br>

|Params|Body  |
|--|--|
|  |  |
---
[<¬ Menú](#inicio)

### eliminar-datos-comentario
**DELETE**:  /comments/:mode/:id (ELIMINA UN COMENTARIO)
	Descripción: Se encarga de eliminar un comentario que coincida con el id proporcionado. Ademas se debe pasar por parametro el modo de eliminacion (0-Físico / 1-Lógico)<br>
	*URL*: /0/6570bd4572c6d504382d4b1e<br>
	*URL*: /1/6570bd4572c6d504382d4b1e<br>
	*Respuesta (200)*: {<br>
		"data: response,<br>
  		"status": 0,<br>
  		"message": "El comentario ha sido eliminado (Fisicamente o Logicamente)"<br>
	}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "No se encontró ningun comentario para eliminar con ese filtro."<br>
	}<br>

|Params|Body  |
|--|--|
| mode |  |
| id |  |
---
[<¬ Menú](#inicio)

### actualizar-datos-comentario
**PUT**:  /comments/update/ (ACTUALIZA UN EVENTO)
	Descripción: Se encarga de actualizar los datos de una reserva que coincida con el id proporcionado por params, los datos llegan por body pueden ser uno, dos o todos.<br>
	*URL*: /comments/:id<br>
	*Respuesta (200)*: {<br>
		"data": {datos actualizados},<br>
  		"status": 0,<br>
  		"message": "comentario actualizado con éxito"<br>
	}<br>
	*Respuesta (400)*: {<br>
	"status": 1,<br>
	"message": "No se pudo realizar la actualización."<br>
	}<br>

|Params|Body  |
|--|--|
| id | text |
|  | email |
|  | event_id |
---
[<¬ Menú](#inicio)

# modelos
## users-model

| Campo      | Tipo   | Requerido | Validación                               |
|------------|--------|-----------|------------------------------------------|
| _id        | ObjId  | Auto      |										 |
| names      | String | Sí        |                                      |
| lastname   | String | Sí        |                                      |
| birthDate  | Date   | Sí        |                                      |
| email      | String | Sí        | Formato de correo electrónico válido     |
| country    | String | Sí        |                                      |
| picture    | String | Sí        |                                      |
| rol        | String | No        | Enum: ['admin', 'user'] (por defecto: 'user') y Trim |

[<¬ Menú](#inicio)

## events-model

| Campo       | Tipo      | Requerido | Validación                                               |
|-------------|-----------|-----------|----------------------------------------------------------|
| _id        | ObjId  | Auto      |										 |
| email       | String    | Sí        |                                                      |
| title       | String    | Sí        | Máximo 100 caracteres                               |
| description | String    | Sí        | Máximo 500 caracteres                               |
| capacity    | Number    | Sí        | Mínimo 1                                              |
| dates       | [String]  | Sí        | Formato de fecha válido (aaaa-mm-dd)                      |
| startHour   | String    | Sí        | Formato de hora válido (hh:mm)                            |
| endHour     | String    | Sí        | Formato de hora válido (hh:mm)                            |
| modality    | String    | Sí        | Enum: ['en-linea', 'presencial'] y Trim                   |
| ubication   | String    | Sí        |                                                      |
| category    | String    | Sí        | Enum: ['música', 'vida nocturna', 'gastronomia', 'arte', 'feriados', 'salud', 'pasatiempos', 'negocios'] y Trim |
| price       | Number    | Sí        | Mínimo 0                                                 |
| pictures    | [String]  | No        |                                                      |
| minimumAge  | Number    | Sí        | Mínimo 0                                                 |

[<¬ Menú](#inicio)

## Bookings Model

| Campo    | Tipo   | Requerido | Validación                                                                  |
|----------|--------|-----------|-----------------------------------------------------------------------------|
| _id        | ObjId  | Auto      |										 |
| email    | String | Sí        | Validación de formato de correo electrónico                           |
| event_ID | String | Sí        | Validación de ObjectId válido (debe ser un ID válido de MongoDB)      |

[<¬ Menú](#inicio)

## Comments Model

| Campo      | Tipo      | Requerido | Validación                                                    |
|------------|-----------|-----------|---------------------------------------------------------------|
| text       | String    | Sí        | Longitud mínima: 5 caracteres, Longitud máxima: 60 caracteres                                   |
| email      | String    | Sí        | Validación de formato de correo electrónico                                                    |
| date       | Date      | Sí        | Valor predeterminado: Fecha actual actual                                                              |
| active     | Boolean   | No        | Valor predeterminado: true                                                                           |
| event_ID   | String    | Sí        | Validación de ObjectId válido (debe ser un ID válido de MongoDB)                                |

[<¬ Menú](#inicio)
