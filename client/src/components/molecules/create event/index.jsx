import React from 'react';
import CreateEventButton from '../../atoms/createEventButton';

function CreateEvent() {


    return (
        <div className="w-full bg-primary-1 p-20">
            <div className="text-center text-black text-5xl font-semibold font-poppins leading-10 mb-4 p-4">Crea tu propio evento</div>
            <div className="text-center text-black text-base font-normal font-poppins leading-normal mb-4">Organiza tus propios eventos de forma rápida y sencilla. </div>
            <CreateEventButton/>
        </div>
    );
}

export default CreateEvent;


