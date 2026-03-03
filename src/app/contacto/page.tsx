"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Input, Label, Textarea } from "@/components/ui/FormElements";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(5, "El asunto es requerido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactoPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact data:", data);
    alert("¡Mensaje enviado correctamente!");
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Información de Contacto */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Contacta con <span className="text-pink-600">nosotros</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              ¿Tienes alguna duda, sugerencia o incidencia? Estamos aquí para ayudarte. Rellena el formulario o utiliza nuestros canales directos.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-pink-100 p-3 rounded-full text-pink-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Correo Electrónico</h3>
                  <p className="text-gray-600">soporte@onlyxhouse.com</p>
                  <p className="text-gray-600">info@onlyxhouse.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Teléfono (Soporte)</h3>
                  <p className="text-gray-600">+34 900 000 000</p>
                  <p className="text-xs text-gray-500">Lunes a Viernes de 9:00 a 18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Oficinas Centrales</h3>
                  <p className="text-gray-600">Calle Ejemplo 123, Planta 4</p>
                  <p className="text-gray-600">03001 Alicante, España</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  error={errors.name?.message}
                  {...register("name")}
                />
              </div>

              <div>
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  error={errors.email?.message}
                  {...register("email")}
                />
              </div>

              <div>
                <Label htmlFor="subject">Asunto</Label>
                <Input
                  id="subject"
                  placeholder="Motivo de tu consulta"
                  error={errors.subject?.message}
                  {...register("subject")}
                />
              </div>

              <div>
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="Escribe aquí tu mensaje..."
                  rows={5}
                  error={errors.message?.message}
                  {...register("message")}
                />
              </div>

              <Button
                type="submit"
                className="w-full py-3 font-bold text-lg shadow-md hover:shadow-lg transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
