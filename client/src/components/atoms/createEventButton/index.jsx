import React from "react";

function CreateEventButton() {
  return (
    <div className="flex justify-center pt-10">
      <button
        data-test="button-create-event"
        className="bg-neutral-200 rounded-3xl p-2.5 inline-flex items-center justify-center hover:bg-neutral-300 focus:outline-none w-1/6"
      >
        <div className="text-black text-base font-medium tracking-tight text-center">
          Crear evento
        </div>
      </button>
    </div>
  );
}

export default CreateEventButton;
