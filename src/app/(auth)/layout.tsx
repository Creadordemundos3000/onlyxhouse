import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors font-medium mb-8"
        >
          <ArrowLeft size={20} />
          Volver al inicio
        </Link>
        
        <div className="flex justify-center items-center flex-grow">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {children}
          </div>
        </div>
        
        <div className="text-center mt-8 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} onlyXhouse. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
}
