import React from "react";
import { Search } from "lucide-react";

function Searcher({ onSearch }) {
  return (
    <label className="rounded-xl bg-primary-1 flex items-center overflow-hidden">
      <Search className="text-primary-2 block  w-auto h-auto py-1 px-2 border-r-2 border-primary-2 hover:bg-secondary-3 hover:bg-opacity-20 transition-colors duration-500"/>
      <input type="text" className="text-primary-2 bg-transparent p-1 rounded-xl focus:outline-secondary-3 ml-1"/>
    </label>
  );
}

export default Searcher;
