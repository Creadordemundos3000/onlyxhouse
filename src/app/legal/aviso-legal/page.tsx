import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AvisoLegalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Aviso Legal</h1>
        <div className="prose prose-pink max-w-none text-gray-700">
          <p>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSICE), a continuación se exponen los datos identificativos de la entidad propietaria del sitio web.
          </p>
          
          <h3>1. Datos Identificativos</h3>
          <p>
            <strong>Nombre Comercial:</strong> onlyXhouse<br />
            <strong>Domicilio Social:</strong> Calle Ejemplo, 123, 28001 Madrid, España<br />
            <strong>Email de contacto:</strong> contacto@onlyxhouse.com
          </p>

          <h3>2. Objeto</h3>
          <p>
            El presente Aviso Legal regula el acceso y la utilización del sitio web, incluyendo los contenidos y servicios puestos a disposición de los usuarios en el mismo.
          </p>

          <h3>3. Uso del Sitio Web</h3>
          <p>
            El acceso y navegación en este sitio web supone aceptar y conocer las advertencias legales, condiciones y términos de uso contenidas en ella. El usuario se compromete a hacer un uso adecuado de los contenidos y servicios que se ofrecen.
          </p>
          
          <h3>4. Propiedad Intelectual e Industrial</h3>
          <p>
            Todos los contenidos del sitio web (textos, fotografías, gráficos, imágenes, tecnología, software, así como su diseño gráfico y códigos fuente) constituyen una obra cuya propiedad pertenece a onlyXhouse, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación sobre los mismos más allá de lo estrictamente necesario para el correcto uso de la web.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
