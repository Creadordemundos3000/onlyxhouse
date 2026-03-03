import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacidadPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Política de Privacidad</h1>
        <div className="prose prose-pink max-w-none text-gray-700">
          <p>
            En onlyXhouse nos tomamos muy en serio la privacidad de tus datos. Esta Política de Privacidad describe cómo recopilamos, utilizamos y compartimos tu información personal cuando visitas o utilizas nuestros servicios.
          </p>
          
          <h3>1. Responsable del Tratamiento</h3>
          <p>
            Los datos personales que nos facilites serán tratados por onlyXhouse, con domicilio en Calle Ejemplo, 123, 28001 Madrid, España.
          </p>

          <h3>2. Finalidad del Tratamiento</h3>
          <p>
            Tratamos la información que nos facilitas con el fin de prestarte el servicio solicitado, realizar la facturación del mismo y enviarte comunicaciones relacionadas con nuestros servicios.
          </p>

          <h3>3. Legitimación</h3>
          <p>
            La base legal para el tratamiento de tus datos es la ejecución del contrato de prestación de servicios y el consentimiento que nos otorgas al contactar con nosotros o registrarte.
          </p>
          
          <h3>4. Destinatarios</h3>
          <p>
            Los datos no se cederán a terceros salvo en los casos en que exista una obligación legal.
          </p>

          <h3>5. Derechos</h3>
          <p>
            Tienes derecho a obtener confirmación sobre si en onlyXhouse estamos tratando tus datos personales, por tanto tienes derecho a acceder a tus datos personales, rectificar los datos inexactos o solicitar su supresión cuando los datos ya no sean necesarios.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
