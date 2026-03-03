import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CondicionesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Condiciones de Uso</h1>
          
          <div className="prose prose-pink max-w-none text-gray-600">
            <p className="mb-4">
              Las presentes Condiciones Generales de Uso regulan el acceso y la utilización del sitio web OnlyXHouse.com.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">1. Aceptación de las condiciones</h3>
            <p className="mb-4">
              El mero acceso y/o utilización del portal, de todos o parte de sus contenidos y/o servicios significa la plena aceptación de las presentes Condiciones Generales de Uso.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">2. Normas de publicación</h3>
            <p className="mb-4">
              Para publicar anuncios en OnlyXHouse, el usuario debe cumplir las siguientes normas:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Ser mayor de 18 años.</li>
              <li>No publicar contenido ilegal, amenazante, difamatorio o que vulnere derechos de terceros.</li>
              <li>Las fotografías deben corresponder a la realidad y el usuario debe tener los derechos sobre ellas.</li>
              <li>No se permite la publicación de anuncios repetidos o spam.</li>
              <li>Está prohibido publicar datos de contacto de terceras personas sin su consentimiento.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">3. Responsabilidad del usuario</h3>
            <p className="mb-4">
              El usuario es el único responsable de la información contenida en su anuncio y de la veracidad de la misma. OnlyXHouse no verifica la identidad de los anunciantes ni la veracidad de los contenidos publicados.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">4. Modificación de las condiciones</h3>
            <p className="mb-4">
              OnlyXHouse se reserva el derecho de modificar, en cualquier momento, la presentación y configuración del Sitio Web, así como las presentes Condiciones Generales.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">5. Legislación aplicable</h3>
            <p className="mb-4">
              Estas Condiciones Generales se rigen por la ley española. Las partes se someten, a su elección, para la resolución de los conflictos y con renuncia a cualquier otro fuero, a los juzgados y tribunales del domicilio del usuario.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
