"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button, Input, Label, Textarea, Select } from "@/components/ui/FormElements";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Upload, X, CheckCircle, Loader2 } from "lucide-react";
import { modelService, Model } from "@/services/modelService";
import { useToast } from "@/context/ToastContext";

const publishSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  category: z.string().min(1, "Selecciona una categoría"),
  location: z.string().min(1, "Selecciona una ubicación"),
  description: z.string().min(20, "La descripción debe tener al menos 20 caracteres"),
  age: z.string().refine((val) => {
    const n = Number(val);
    return !isNaN(n) && n >= 18 && n <= 99;
  }, "Debes tener al menos 18 años"),
  phone: z.string().min(9, "Teléfono inválido"),
  services: z.string().min(1, "Selecciona al menos un servicio"),
  price: z.string().min(1, "Indica un precio base"),
  terms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

type PublishFormValues = z.infer<typeof publishSchema>;

const COMMON_SERVICES = [
  "Masaje Relajante", "Masaje Terapéutico", "Final Feliz", "Francés Natural",
  "Francés Completo", "Garganta Profunda", "Besos con Lengua", "Lluvia Dorada",
  "Sado Suave", "Disfraces", "Juguetes", "Dúplex", "Tríos"
];

const LOCATIONS = [
  "Alicante", "Elche", "Benidorm", "Torrevieja", "Orihuela", "San Vicente", "Alcoy", "Elda"
];

const CATEGORIES = [
  "Masajes", "Escorts", "Trans", "Chicos"
];

export default function PublishPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { addToast } = useToast();
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/publicar");
    }
  }, [user, loading, router]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PublishFormValues>({
    resolver: zodResolver(publishSchema),
    defaultValues: {
      terms: false,
    }
  });
  
  const selectedServices = watch("services") ? watch("services").split(", ").filter(Boolean) : [];

  const toggleService = (service: string) => {
    const current = selectedServices;
    const updated = current.includes(service)
      ? current.filter(s => s !== service)
      : [...current, service];
    setValue("services", updated.join(", "));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-pink-600 animate-spin" />
          <p className="text-gray-500 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Evitar renderizado mientras redirige
  }

  const onSubmit = async (data: PublishFormValues) => {
    if (photoFiles.length === 0) {
      addToast("Debes subir al menos una foto", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const newModel: Omit<Model, "id" | "views" | "createdAt" | "updatedAt"> = {
        userId: user.uid,
        name: data.name,
        age: data.age,
        phone: data.phone,
        category: data.category,
        location: data.location,
        description: data.description,
        services: data.services,
        rates: [{ duration: "1 Hora", price: data.price }], // Default rate
        photos: [], // Will be handled by service
        status: "pending", // Default to pending for user submissions
      };

      await modelService.create(newModel, photoFiles);
      
      addToast("¡Anuncio publicado con éxito! Pendiente de aprobación.", "success");
      router.push("/mi-cuenta");
    } catch (error) {
      console.error("Error publishing ad:", error);
      addToast("Error al publicar el anuncio. Inténtalo de nuevo.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setPhotoFiles(prev => [...prev, ...newFiles]);

      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setPhotoPreviews(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotoFiles(prev => prev.filter((_, i) => i !== index));
    setPhotoPreviews(prev => prev.filter((_, i) => i !== index));
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

          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
            <div className="p-8 sm:p-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Sección 1: Información Básica */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">
                    Información Básica
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Nombre / Alias</Label>
                      <Input
                        id="name"
                        placeholder="Ej. Ana, Sweet Massage..."
                        {...register("name")}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="age">Edad</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Ej. 25"
                        {...register("age")}
                        className={errors.age ? "border-red-500" : ""}
                      />
                      {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="category">Categoría</Label>
                      <select
                        id="category"
                        {...register("category")}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm transition-colors"
                      >
                        <option value="">Selecciona una categoría</option>
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="location">Ubicación</Label>
                      <select
                        id="location"
                        {...register("location")}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm transition-colors"
                      >
                        <option value="">Selecciona una ciudad</option>
                        {LOCATIONS.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                      {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Teléfono de contacto</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Ej. 600 123 456"
                      {...register("phone")}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Sección 2: Detalles del Servicio */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">
                    Detalles del Servicio
                  </h2>

                  <div>
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      rows={5}
                      placeholder="Describe tus servicios, horarios y cualquier detalle importante..."
                      {...register("description")}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                  </div>

                  <div>
                    <Label>Servicios Ofrecidos</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                      {COMMON_SERVICES.map((service) => (
                        <div 
                          key={service}
                          onClick={() => toggleService(service)}
                          className={`
                            cursor-pointer px-3 py-2 rounded-lg border text-sm font-medium transition-all text-center
                            ${selectedServices.includes(service)
                              ? "bg-pink-50 border-pink-500 text-pink-700 shadow-sm"
                              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}
                          `}
                        >
                          {service}
                        </div>
                      ))}
                    </div>
                    {errors.services && <p className="text-red-500 text-xs mt-1">{errors.services.message}</p>}
                    <input type="hidden" {...register("services")} />
                  </div>

                  <div>
                    <Label htmlFor="price">Precio desde (€)</Label>
                    <Input
                      id="price"
                      type="text"
                      placeholder="Ej. 50"
                      {...register("price")}
                      className={errors.price ? "border-red-500" : ""}
                    />
                    <p className="text-xs text-gray-500 mt-1">Precio base por 1 hora (puedes añadir más tarifas después)</p>
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                  </div>
                </div>

                {/* Sección 3: Fotos */}
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2">
                    Galería de Fotos
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photoPreviews.map((src, index) => (
                      <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
                        <Image src={src} alt={`Preview ${index}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    
                    <label className="aspect-[3/4] rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-all group">
                      <div className="p-4 bg-white rounded-full shadow-sm group-hover:shadow-md mb-2 transition-all">
                        <Upload className="w-6 h-6 text-gray-400 group-hover:text-pink-500" />
                      </div>
                      <span className="text-sm font-medium text-gray-500 group-hover:text-pink-600">Añadir foto</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        className="hidden" 
                        onChange={handlePhotoUpload} 
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Sube fotos de alta calidad para destacar. La primera foto será la principal.
                  </p>
                </div>

                {/* Términos y Envío */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-start gap-3 mb-6">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        {...register("terms")}
                        className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                    </div>
                    <div className="text-sm">
                      <label htmlFor="terms" className="font-medium text-gray-700">
                        Acepto los términos y condiciones
                      </label>
                      <p className="text-gray-500">
                        Confirmo que soy mayor de edad y que tengo los derechos sobre el contenido publicado.
                      </p>
                      {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full text-lg h-12 shadow-lg hover:shadow-xl transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Publicando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" /> Publicar Anuncio
                      </>
                    )}
                  </Button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
