import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Aviso Legal</h1>
          
          <div className="prose prose-pink max-w-none text-gray-600">
            <p className="mb-4">
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), se exponen a continuación los datos identificativos del titular del sitio web.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">1. Titular del Sitio Web</h3>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li><strong>Denominación Social:</strong> OnlyXHouse S.L. (Nombre ficticio para demo)</li>
              <li><strong>NIF:</strong> B-12345678</li>
              <li><strong>Domicilio Social:</strong> Calle Ejemplo 123, 03001, Alicante, España</li>
              <li><strong>Correo electrónico:</strong> legal@onlyxhouse.com</li>
              <li><strong>Inscripción Registral:</strong> Inscrita en el Registro Mercantil de Alicante, Tomo 1234, Folio 56, Hoja A-7890.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">2. Objeto</h3>
            <p className="mb-4">
              El presente Aviso Legal regula el acceso y la utilización del sitio web onlyXhouse.com (en adelante, el "Sitio Web"), que pone a disposición de los usuarios de Internet interesados en sus servicios y contenidos.
            </p>
            <p className="mb-4">
              El acceso al sitio web implica la aceptación sin reservas del presente Aviso Legal.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">3. Uso del Sitio Web</h3>
            <p className="mb-4">
              El Usuario se compromete a utilizar el Sitio Web, los contenidos y servicios de conformidad con la Ley, el presente Aviso Legal, las buenas costumbres y el orden público. Del mismo modo, el Usuario se obliga a no utilizar el Sitio Web o los servicios que se presten a través de él con fines o efectos ilícitos o contrarios al contenido del presente Aviso Legal.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">4. Propiedad Intelectual e Industrial</h3>
            <p className="mb-4">
              Todos los contenidos del Sitio Web, entendiendo por estos a título meramente enunciativo los textos, fotografías, gráficos, imágenes, iconos, tecnología, software, así como su diseño gráfico y códigos fuente, constituyen una obra cuya propiedad pertenece a OnlyXHouse, sin que puedan entenderse cedidos al Usuario ninguno de los derechos de explotación sobre los mismos más allá de lo estrictamente necesario para el correcto uso de la web.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">5. Exclusión de Responsabilidad</h3>
            <p className="mb-4">
              OnlyXHouse no se hace responsable de los contenidos de los enlaces a otras páginas web que no sean titularidad suya y que, por tanto, no pueden ser controladas por ésta.
            </p>
            <p className="mb-4">
              OnlyXHouse actúa como mero intermediario en la publicación de anuncios y no se hace responsable de la veracidad, exactitud o legalidad de los contenidos publicados por los usuarios.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
