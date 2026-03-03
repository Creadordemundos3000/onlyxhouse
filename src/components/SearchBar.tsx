import React from "react";
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";

export function SearchBar() {
  return (
    <div className="bg-gray-100 p-4 border-b border-gray-200">
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row gap-2 items-center">
        {/* Search Input */}
        <div className="relative flex-grow w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full md:w-auto min-w-[200px]">
          <select className="w-full appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Masajes relajantes</option>
            <option>Escorts</option>
            <option>Trans</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
        </div>

        {/* Location Dropdown */}
        <div className="relative w-full md:w-auto min-w-[150px]">
          <select className="w-full appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Alicante</option>
            <option>Madrid</option>
            <option>Barcelona</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full md:w-auto">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded flex items-center justify-center flex-grow md:flex-grow-0">
            <Search size={20} />
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 font-medium justify-center flex-grow md:flex-grow-0">
            Filtros
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
