"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button, Input, Label } from "@/components/ui/FormElements";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Login data:", data);
    alert("¡Inicio de sesión exitoso! (Simulación)");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center">
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">
              Bienvenido de nuevo
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <Link href="/registro" className="font-medium text-pink-600 hover:text-pink-500 hover:underline transition-all">
                Regístrate gratis
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
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
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="password" className="mb-0">Contraseña</Label>
                  <a href="#" className="text-xs text-pink-600 hover:underline font-medium">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  error={errors.password?.message}
                  {...register("password")}
                />
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
                  Iniciando sesión...
                </span>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
            
            <p className="text-xs text-gray-500 mt-4 leading-relaxed text-center">
              Al entrar confirmas que has leído y estás de acuerdo con nuestros{" "}
              <Link href="/legal/condiciones" className="text-pink-600 hover:underline">términos, condiciones</Link>,{" "}
              <Link href="/legal/condiciones" className="text-pink-600 hover:underline">condiciones de contratación</Link>,{" "}
              <Link href="/legal/cookies" className="text-pink-600 hover:underline">políticas de cookies</Link>,{" "}
              <Link href="/legal/privacidad" className="text-pink-600 hover:underline">privacidad</Link> y{" "}
              <Link href="/legal/condiciones" className="text-pink-600 hover:underline">contenidos</Link>.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
