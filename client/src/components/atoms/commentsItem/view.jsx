import { useEffect, useState } from "react";
import UserIcon from "../userIcon";
import useFetch from "../../../hooks/useFetch";

const View = ({ data }) => {
  const [userData, userDataStatus, getUserData] = useFetch();
  const [fullUserName, setFullUserName] = useState("");

  useEffect(() => {
    getUserData({ path: `/user/${data.email}`, method: "GET" });
  }, []);
  useEffect(() => {
    if (userDataStatus.success) {
      const fullname = `${userData.data.names} ${userData.data.lastname}`;
      setFullUserName(fullname);
    }
  }, [userDataStatus]);

  return (
    <div className="flex flex-col rounded-md bg-gray-100 p-4 mb-4">
      <div className="flex flex-row gap-4 items-center">
        <UserIcon imgUrl={userData?.data.picture} />
        <p className="text-black font-poppins text-16 font-semibold leading-normal tracking-tighter">
          {fullUserName}
        </p>
      </div>
      <div className="w-full h-auto pt-2 pl-1">
        <p className="text-black font-poppins text-20 font-normal leading-normal tracking-tighter">
          {data.text}
        </p>
      </div>
    </div>
  );
};

export default View;
