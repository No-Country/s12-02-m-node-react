import { Card } from "./cards";
import { MdArrowRight } from "react-icons/md";

export default function DivCards() {
  return (
    <>
      <div className="flex justify-end mb-4 font-poppins font-medium">
        <button className="flex items-center ">
          Ver todo <MdArrowRight size={20} />
        </button>
      </div>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex gap-4">
          <div className="w-3/5 bg-white overflow-hidden rounded-lg shadow-md">
            <Card />
          </div>
          <div className="w-2/5 bg-white overflow-visible rounded-lg shadow-md">
            <Card />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-2/5 flex flex-col gap-4">
            <div className="flex-1 bg-white overflow-visible rounded-lg shadow-md">
              <Card />
            </div>
            <div className="flex-1 bg-white overflow-visible rounded-lg shadow-md">
              <Card />
            </div>
          </div>
          <div className="w-3/5 bg-white overflow-visible rounded-lg shadow-md">
            <Card customImageSize="h-[555px]" />
          </div>
        </div>
      </div>
    </>
  );
}
