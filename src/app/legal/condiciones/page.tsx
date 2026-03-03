import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function CondicionesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Condiciones de Uso</h1>
        <div className="prose prose-pink max-w-none text-gray-700">
          <p>
            Bienvenido a onlyXhouse. Al acceder y utilizar este sitio web, aceptas cumplir con los siguientes términos y condiciones de uso.
          </p>
          
          <h3>1. Edad Mínima</h3>
          <p>
            El acceso y uso de este sitio web está estrictamente reservado a mayores de 18 años. Al acceder a este sitio, declaras bajo tu responsabilidad que eres mayor de edad.
          </p>

          <h3>2. Responsabilidad del Usuario</h3>
          <p>
            El usuario se compromete a utilizar el sitio web, sus contenidos y servicios de conformidad con la ley, el presente aviso legal, las buenas costumbres y el orden público. Del mismo modo, el usuario se obliga a no utilizar el sitio web con fines o efectos ilícitos o contrarios al contenido de estas condiciones.
          </p>

          <h3>3. Contenidos</h3>
          <p>
            onlyXhouse actúa como mero intermediario en la publicación de anuncios. No nos hacemos responsables de la veracidad, exactitud o licitud de los contenidos publicados por los usuarios.
          </p>
          
          <h3>4. Modificaciones</h3>
          <p>
            Nos reservamos el derecho de efectuar sin previo aviso las modificaciones que consideremos oportunas en nuestro sitio web, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados.
          </p>

          <h3>5. Legislación Aplicable</h3>
          <p>
            La relación entre onlyXhouse y el usuario se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y tribunales de la ciudad de Madrid.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
