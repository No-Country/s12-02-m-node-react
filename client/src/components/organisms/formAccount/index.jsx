import Img from "../../atoms/myAccountiItems/img";
import Form from "../../atoms/myAccountiItems/form";
import { useState } from "react";

export default function FormAccount () {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));
  console.log(userData)
  return (
    <div className="flex flex-col my-10 gap-10 items-start pt-5 pb-16">
        {/* <Img picture={userData.picture}/> */}
        <Form userData={userData}/>
    </div>
  );
};