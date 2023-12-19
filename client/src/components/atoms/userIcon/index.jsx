import React from "react";

function UserIcon({ imgUrl, className }) {
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
  return (
    <picture className={`${className} block rounded-full w-10 h-10 overflow-hidden`}>
      <img
        className="w-full h-full object-cover"
        src={imgUrl || defaultImage}
        alt="User image profile"
      />
    </picture>
  );
}

export default UserIcon;
