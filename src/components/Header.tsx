import React from "react";
import Link from "next/link";
import { Heart, EyeOff, Menu, User, PlusCircle } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl font-extrabold text-pink-600 italic tracking-tighter group-hover:text-pink-700 transition-colors">
              onlyXhouse
            </span>
            <span className="text-[10px] text-gray-500 hidden lg:block leading-tight border-l border-gray-300 pl-2 ml-2">
              Tu web de citas, <br />compañía y masajes
            </span>
          </Link>
        </div>

        {/* Middle Section: Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            href="/publicar" 
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-bold text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2 transform hover:-translate-y-0.5"
          >
            <PlusCircle size={16} />
            Publicar anuncio gratis
          </Link>
          
          <div className="h-6 w-px bg-gray-200"></div>

          <Link href="/mi-cuenta" className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors">
            Mis Anuncios
          </Link>
          
          <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-pink-600 transition-colors p-2 hover:bg-pink-50 rounded-full" title="Favoritos">
              <Heart size={20} />
            </button>
            <button className="text-gray-400 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full" title="Ocultos">
              <EyeOff size={20} />
            </button>
          </div>
        </div>

        {/* Right Section: Login */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="flex items-center gap-2 text-gray-700 font-bold hover:text-blue-600 transition-colors px-3 py-1 rounded-md hover:bg-blue-50">
            <User size={20} />
            <span className="hidden sm:inline">Entrar</span>
          </Link>
          <button className="md:hidden text-gray-700 hover:text-black p-1">
            <Menu size={28} />
          </button>
        </div>
      </div>
      
      {/* Mobile Action Bar (visible on small screens) */}
      <div className="md:hidden bg-gray-50 border-t border-gray-200 p-3 flex justify-center shadow-inner">
         <Link 
            href="/publicar" 
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-full font-bold text-sm w-full text-center flex items-center justify-center gap-2 shadow-sm"
          >
            <PlusCircle size={18} />
            Publicar anuncio gratis
          </Link>
      </div>
    </header>
  );
}
