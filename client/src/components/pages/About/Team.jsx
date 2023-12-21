import React, { useState } from "react";
import { BiSolidChevronLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import { TeamMembers } from "./teamData";
import TeamMemberPopup from "./TeamMemberPopup";


const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const handleClosePopup = () => {
    setSelectedMember(null);
  };

  
  return (
    <div className="relative">
      <div className="flex items-center">
        <Link
          to="/"
          className="fixed text-4xl text-white bg-secondary-2 w-8 h-8 flex items-center justify-center rounded-lg m-4"
        >
          <BiSolidChevronLeft />
        </Link>
        <h2 className="text-3xl extrabold font-bold mt-4 mb-2 w-full text-center text-secondary-1">
          Nuestro Equipo de Desarrollo
        </h2>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        style={{ margin: "2rem" }}
      >
        {TeamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-gray-100 p-4 shadow-xl rounded-xl transition transform hover:scale-105 cursor-pointer m-4"
            onClick={() => handleMemberClick(member)}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 object-cover rounded-full border-4 border-gray-500 mx-auto my-auto"
            />
            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.title}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedMember && (
        <TeamMemberPopup member={selectedMember} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default Team;
