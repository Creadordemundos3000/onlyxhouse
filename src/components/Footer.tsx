import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand & About */}
          <div>
            <h3 className="text-2xl font-bold text-pink-600 italic mb-4">onlyXhouse</h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              La plataforma líder en anuncios clasificados de contactos en España. 
              Encuentra lo que buscas con la máxima discreción y seguridad.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-pink-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-pink-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Column 2: Legal */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/legal/aviso-legal" className="hover:text-white transition-colors">Aviso Legal</Link></li>
              <li><Link href="/legal/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/legal/cookies" className="hover:text-white transition-colors">Política de Cookies</Link></li>
              <li><Link href="/legal/condiciones" className="hover:text-white transition-colors">Condiciones de Uso</Link></li>
            </ul>
          </div>

          {/* Column 3: Comunidad */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Comunidad</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Consejos de Seguridad</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Ayuda / FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Mapa Web</Link></li>
            </ul>
          </div>

          {/* Column 4: Contacto */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contacto" className="hover:text-white transition-colors flex items-center gap-2"><Mail size={16} /> Formulario de Contacto</Link></li>
              <li className="flex items-center gap-2 mt-2">
                <Mail size={16} />
                <a href="mailto:soporte@onlyxhouse.com" className="hover:text-white transition-colors">soporte@onlyxhouse.com</a>
              </li>
              <li className="mt-4 text-xs text-gray-500">
                Atención al cliente L-V de 9:00 a 18:00
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <div className="text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} onlyXhouse. Todos los derechos reservados.</p>
            <p className="mt-2">
              Este sitio está destinado exclusivamente a mayores de 18 años. 
            </p>
          </div>
          <div className="flex gap-4 items-center">
             {/* Payment Icons Simulation */}
             <div className="flex gap-2 opacity-70 grayscale hover:grayscale-0 transition-all">
                <div className="bg-white px-2 py-1 rounded shadow-sm text-gray-800 font-bold italic tracking-tighter">VISA</div>
                <div className="bg-white px-2 py-1 rounded shadow-sm text-gray-800 font-bold tracking-tight">MasterCard</div>
                <div className="bg-white px-2 py-1 rounded shadow-sm text-gray-800 font-bold">RTA</div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
