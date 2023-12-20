// TeamMemberPopup.jsx
import React from "react";
import { BiSolidChevronLeft } from "react-icons/bi";
import { Link } from "react-router-dom";

const TeamMemberPopup = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 max-w-md mx-auto rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={onClose}
        >
          X
        </button>
        <div className="flex flex-col items-center">
          <img
            src={member.image}
            alt={member.name}
            className="w-64 h-64 rounded-full border-4 border-gray-500 mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">{member.name}</h2>
          <p className="text-gray-600">{member.title}</p>
          <p className="mt-4 text-blue-600">{member.stack}</p>
          <p className="mt-4 font-bold text-gray-600">{member.city}</p>
          <div className="flex mt-4">
            {member.github && member.linkedin && (
              <>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block p-1 bg-black text-white flex items-center justify-center mr-2"
                >
                  GitHub
                </a>
                <span className="text-gray-900 p-1">|</span>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block p-1 bg-blue-900 text-white flex items-center justify-center ml-2"
                >
                  LinkedIn
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberPopup;
