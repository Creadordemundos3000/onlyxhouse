import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Política de Cookies</h1>
          
          <div className="prose prose-pink max-w-none text-gray-600">
            <p className="mb-4">
              OnlyXHouse utiliza cookies propias y de terceros para mejorar la experiencia del usuario, analizar el tráfico y personalizar el contenido y los anuncios.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">1. ¿Qué son las cookies?</h3>
            <p className="mb-4">
              Una cookie es un pequeño archivo de texto que se almacena en su navegador cuando visita casi cualquier página web. Su utilidad es que la web sea capaz de recordar su visita cuando vuelva a navegar por esa página.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">2. Tipos de cookies que utilizamos</h3>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li><strong>Cookies técnicas:</strong> Son aquellas necesarias para la navegación y el buen funcionamiento de nuestra página web.</li>
              <li><strong>Cookies de personalización:</strong> Permiten acceder al servicio con características predefinidas (idioma, tipo de navegador, etc.).</li>
              <li><strong>Cookies de análisis:</strong> Permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio.</li>
              <li><strong>Cookies publicitarias:</strong> Permiten la gestión de los espacios publicitarios en base a criterios como el contenido editado o la frecuencia en la que se muestran los anuncios.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">3. Gestión de cookies</h3>
            <p className="mb-4">
              Puede usted permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li><a href="#" className="text-pink-600 hover:underline">Google Chrome</a></li>
              <li><a href="#" className="text-pink-600 hover:underline">Mozilla Firefox</a></li>
              <li><a href="#" className="text-pink-600 hover:underline">Safari</a></li>
              <li><a href="#" className="text-pink-600 hover:underline">Microsoft Edge</a></li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">4. Actualizaciones</h3>
            <p className="mb-4">
              Esta Política de Cookies puede ser modificada en función de exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
