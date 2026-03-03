"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button, Input, Label, Textarea, Select } from "@/components/ui/FormElements";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Upload, X, CheckCircle } from "lucide-react";

const publishSchema = z.object({
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  category: z.string().min(1, "Selecciona una categoría"),
  location: z.string().min(1, "Selecciona una ubicación"),
  description: z.string().min(20, "La descripción debe tener al menos 20 caracteres"),
  age: z.string().refine((val) => {
    const n = Number(val);
    return !isNaN(n) && n >= 18 && n <= 99;
  }, "Debes tener al menos 18 años"),
  phone: z.string().min(9, "Teléfono inválido"),
  email: z.string().email("Email inválido"),
  terms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

type PublishFormValues = z.infer<typeof publishSchema>;

export default function PublishPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [photos, setPhotos] = useState<string[]>([]);
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/publicar");
    }
  }, [user, loading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PublishFormValues>({
    resolver: zodResolver(publishSchema),
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Evitar renderizado mientras redirige
  }

  const onSubmit = async (data: PublishFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Publish data:", { ...data, photos });
    alert("¡Anuncio publicado con éxito! (Simulación)");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotos((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
             <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
               Publicar anuncio gratis
             </h1>
             <p className="mt-2 text-gray-600">
               Completa los detalles de tu anuncio para llegar a miles de personas.
             </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-pink-50 px-6 py-4 border-b border-pink-100 flex items-center gap-2">
               <CheckCircle className="text-pink-600" size={20} />
               <span className="text-pink-800 font-medium text-sm">Tu anuncio será revisado antes de ser publicado.</span>
            </div>
            
            <form className="p-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
              {/* Sección Principal */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Detalles del anuncio</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <Label htmlFor="category">Categoría</Label>
                     <Select id="category" {...register("category")} error={errors.category?.message}>
                       <option value="">Selecciona una categoría</option>
                       <option value="masajes">Masajes relajantes</option>
                       <option value="escorts">Escorts</option>
                       <option value="trans">Trans</option>
                       <option value="chicos">Chicos</option>
                     </Select>
                   </div>
                   <div>
                     <Label htmlFor="location">Ubicación</Label>
                     <Select id="location" {...register("location")} error={errors.location?.message}>
                       <option value="">Selecciona una ciudad</option>
                       <option value="Alicante">Alicante</option>
                       <option value="Madrid">Madrid</option>
                       <option value="Barcelona">Barcelona</option>
                       <option value="Valencia">Valencia</option>
                     </Select>
                   </div>
                </div>

                <div>
                  <Label htmlFor="title">Título del anuncio</Label>
                  <Input 
                    id="title" 
                    placeholder="Ej. Masajes relajantes en el centro de Alicante" 
                    {...register("title")} 
                    error={errors.title?.message}
                  />
                  <p className="text-xs text-gray-500 mt-1">Sé claro y directo. Atrae más visitas con un buen título.</p>
                </div>

                <div>
                  <Label htmlFor="description">Descripción detallada</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe tus servicios, horarios, tarifas, etc..." 
                    rows={6}
                    {...register("description")} 
                    error={errors.description?.message}
                  />
                </div>
              </div>

              {/* Sección Fotos */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Fotos</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-gray-200 group">
                      <img src={photo} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  
                  {photos.length < 8 && (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-all aspect-[3/4]">
                      <Upload className="text-gray-400 mb-2" size={24} />
                      <span className="text-xs text-gray-500 font-medium">Subir foto</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500">Puedes subir hasta 8 fotos. Formatos: JPG, PNG.</p>
              </div>

              {/* Sección Contacto */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Datos de contacto</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div>
                     <Label htmlFor="age">Edad</Label>
                     <Input 
                       id="age" 
                       type="number" 
                       placeholder="25" 
                       {...register("age")} 
                       error={errors.age?.message}
                     />
                   </div>
                   <div>
                     <Label htmlFor="phone">Teléfono / WhatsApp</Label>
                     <Input 
                       id="phone" 
                       type="tel" 
                       placeholder="600 000 000" 
                       {...register("phone")} 
                       error={errors.phone?.message}
                     />
                   </div>
                   <div>
                     <Label htmlFor="email">Email (privado)</Label>
                     <Input 
                       id="email" 
                       type="email" 
                       placeholder="tu@email.com" 
                       {...register("email")} 
                       error={errors.email?.message}
                     />
                   </div>
                </div>
              </div>

              {/* Términos y Submit */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-start mb-6">
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
                      Declaro que tengo derecho a usar las fotos y acepto las <Link href="/legal/condiciones" className="text-pink-600 hover:underline">condiciones de uso</Link>.
                    </label>
                    {errors.terms && (
                      <p className="text-xs text-red-500 mt-1">{errors.terms.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="secondary" onClick={() => window.history.back()}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="px-8 py-3 font-bold text-base shadow-lg hover:shadow-xl transform transition-all active:scale-95"
                    disabled={isSubmitting}
                  >
                     {isSubmitting ? "Publicando..." : "Publicar anuncio ahora"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
