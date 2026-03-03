import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CookiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Política de Cookies</h1>
        <div className="prose prose-pink max-w-none text-gray-700">
          <p>
            Este sitio web utiliza cookies para mejorar la experiencia del usuario y analizar el uso del sitio web.
          </p>
          
          <h3>1. ¿Qué son las cookies?</h3>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web pueden usar para hacer que la experiencia del usuario sea más eficiente.
          </p>

          <h3>2. Tipos de cookies que utilizamos</h3>
          <ul>
            <li><strong>Cookies necesarias:</strong> Ayudan a hacer una página web utilizable activando funciones básicas como la navegación en la página y el acceso a áreas seguras de la página web. La página web no puede funcionar adecuadamente sin estas cookies.</li>
            <li><strong>Cookies de preferencias:</strong> Permiten a la página web recordar información que cambia la forma en que la página se comporta o el aspecto que tiene, como tu idioma preferido o la región en la que te encuentras.</li>
            <li><strong>Cookies estadísticas:</strong> Ayudan a los propietarios de páginas web a comprender cómo interactúan los visitantes con las páginas web reuniendo y proporcionando información de forma anónima.</li>
            <li><strong>Cookies de marketing:</strong> Se utilizan para rastrear a los visitantes en las páginas web. La intención es mostrar anuncios relevantes y atractivos para el usuario individual.</li>
          </ul>

          <h3>3. Gestión de cookies</h3>
          <p>
            Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador instalado en tu ordenador.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
