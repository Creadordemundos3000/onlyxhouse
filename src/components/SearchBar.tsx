"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  // Initialize from URL params
  useEffect(() => {
    setTerm(searchParams.get("term") || "");
    setCategory(searchParams.get("category") || "");
    setLocation(searchParams.get("location") || "");
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (term) params.set("term", term);
    if (category) params.set("category", category);
    if (location) params.set("location", location);
    
    router.push(`/?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-gray-100 p-4 border-b border-gray-200">
      <div className="container mx-auto max-w-5xl flex flex-col md:flex-row gap-2 items-center">
        {/* Search Input */}
        <div className="relative flex-grow w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar por nombre, descripción..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative w-full md:w-auto min-w-[200px]">
          <select 
            className="w-full appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            <option value="Masajes relajantes">Masajes relajantes</option>
            <option value="Escorts">Escorts</option>
            <option value="Trans">Trans</option>
            <option value="BDSM">BDSM</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
        </div>

        {/* Location Dropdown */}
        <div className="relative w-full md:w-auto min-w-[150px]">
          <select 
            className="w-full appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Todas las ubicaciones</option>
            <option value="Alicante">Alicante</option>
            <option value="Madrid">Madrid</option>
            <option value="Barcelona">Barcelona</option>
            <option value="Valencia">Valencia</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded flex items-center justify-center flex-grow md:flex-grow-0"
            aria-label="Buscar"
          >
            <Search size={20} />
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 font-medium justify-center flex-grow md:flex-grow-0">
            Filtros
            <Filter size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
