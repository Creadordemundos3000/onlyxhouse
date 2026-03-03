import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Política de Privacidad</h1>
          
          <div className="prose prose-pink max-w-none text-gray-600">
            <p className="mb-4">
              En OnlyXHouse nos tomamos muy en serio la privacidad de nuestros usuarios. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos su información personal.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">1. Responsable del Tratamiento</h3>
            <p className="mb-4">
              El responsable del tratamiento de sus datos es OnlyXHouse S.L., con domicilio en Calle Ejemplo 123, 03001, Alicante, España.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">2. Datos que Recopilamos</h3>
            <p className="mb-4">
              Podemos recopilar los siguientes datos personales:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Datos de identificación (nombre, alias).</li>
              <li>Datos de contacto (correo electrónico, número de teléfono).</li>
              <li>Datos de conexión y navegación (dirección IP, cookies).</li>
              <li>Imágenes y contenido multimedia subido por el usuario.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">3. Finalidad del Tratamiento</h3>
            <p className="mb-4">
              Utilizamos sus datos para:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Gestionar su registro y cuenta de usuario.</li>
              <li>Publicar y gestionar sus anuncios en la plataforma.</li>
              <li>Facilitar el contacto entre usuarios interesados.</li>
              <li>Enviar comunicaciones comerciales (si ha dado su consentimiento).</li>
              <li>Mejorar nuestros servicios y prevenir el fraude.</li>
            </ul>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">4. Legitimación</h3>
            <p className="mb-4">
              La base legal para el tratamiento de sus datos es la ejecución del contrato de prestación de servicios (publicación de anuncios) y su consentimiento explícito para determinadas finalidades.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">5. Destinatarios</h3>
            <p className="mb-4">
              Sus datos públicos (nombre, teléfono, fotos) serán visibles para otros usuarios de la web. No cedemos sus datos privados a terceros salvo obligación legal.
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-3">6. Sus Derechos</h3>
            <p className="mb-4">
              Tiene derecho a acceder, rectificar, suprimir y oponerse al tratamiento de sus datos, así como otros derechos detallados en la normativa vigente (RGPD), enviando un correo a privacidad@onlyxhouse.com.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
