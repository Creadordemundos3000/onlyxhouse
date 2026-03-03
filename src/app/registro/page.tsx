"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button, Input, Label } from "@/components/ui/FormElements";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Schema validation
const registerSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "Debes confirmar que eres mayor de 18 años",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Registration data:", data);
    alert("¡Cuenta creada con éxito! (Simulación)");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">
              Crea tu cuenta gratis
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Únete a la comunidad de onlyXhouse. <br />
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="font-medium text-pink-600 hover:text-pink-500 hover:underline transition-all">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div>
                <Label htmlFor="name">Nombre completo o Alias</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ej. María Pérez"
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
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  error={errors.password?.message}
                  {...register("password")}
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="******"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded cursor-pointer"
                    {...register("terms")}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700 cursor-pointer">
                    Soy mayor de 18 años y acepto los <Link href="/legal/condiciones" className="text-pink-600 hover:underline">términos y condiciones</Link>
                  </label>
                  {errors.terms && (
                    <p className="text-xs text-red-500 mt-1">{errors.terms.message}</p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-base py-3 font-bold shadow-md hover:shadow-lg transform transition-all active:scale-95"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creando cuenta...
                </span>
              ) : (
                "Registrarse"
              )}
            </Button>
            
            <p className="text-xs text-center text-gray-500 mt-4">
              Al registrarte, aceptas recibir comunicaciones de onlyXhouse.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
