"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image"; // Importar Image de Next.js
import Link from "next/link";
import { useRouter, useParams } from "next/navigation"; // Importar useRouter y useParams
import { useAuth } from "@/context/AuthContext";
import { Button, Input, Label, Textarea, Select } from "@/components/ui/FormElements";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Upload, X, Save, ArrowLeft } from "lucide-react";

// Esquema de validación (reutilizado de Publicar pero sin términos obligatorios para editar si ya aceptó)
const editSchema = z.object({
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
});

type EditFormValues = z.infer<typeof editSchema>;

// Datos simulados para pre-llenar (en una app real vendrían de una API usando el ID)
const MOCK_DATA = {
  title: "Masajes relajantes en el centro de Alicante",
  category: "masajes",
  location: "Alicante",
  description: "Ofrezco masajes relajantes y descontracturantes en gabinete privado. Ambiente climatizado, ducha disponible. Horario de 10 a 20h.",
  age: "25",
  phone: "600123456",
  email: "contacto@ejemplo.com",
  photos: [
    "https://placehold.co/400x300/pink/white?text=Foto+1",
    "https://placehold.co/400x300/purple/white?text=Foto+2"
  ]
};

export default function EditAdPage() {
  const router = useRouter(); // Inicializar router
  const { user, loading } = useAuth();
  const { id } = useParams(); // ID del anuncio (podría usarse para cargar datos reales)

  const [photos, setPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/mi-cuenta");
    }
  }, [user, loading, router]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
  });

  // Simular carga de datos
  useEffect(() => {
    if (!user) return; // Esperar a que haya usuario

    const loadData = async () => {
      console.log("Loading ad:", id); // Simulate using ID
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Cargar datos en el formulario
      setValue("title", MOCK_DATA.title);
      setValue("category", MOCK_DATA.category);
      setValue("location", MOCK_DATA.location);
      setValue("description", MOCK_DATA.description);
      setValue("age", MOCK_DATA.age);
      setValue("phone", MOCK_DATA.phone);
      setValue("email", MOCK_DATA.email);
      setPhotos(MOCK_DATA.photos);
      
      setIsLoading(false);
    };
    loadData();
  }, [setValue, user, id]);

  const onSubmit = async (data: EditFormValues) => {
    // Simular guardado
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Updated data:", { ...data, photos });
    alert("¡Anuncio actualizado correctamente!");
    router.push("/mi-cuenta"); // Redirigir al dashboard
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
           <div className="text-center">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
             <p className="text-gray-500">Cargando datos del anuncio...</p>
           </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link href="/mi-cuenta" className="text-gray-500 hover:text-pink-600 flex items-center gap-1 text-sm font-medium mb-4 transition-colors">
              <ArrowLeft size={16} /> Volver a mis anuncios
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Editar anuncio</h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <form className="p-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
              {/* Sección Principal */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Información general</h3>
                
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
                </div>

                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe tus servicios..." 
                    rows={6}
                    {...register("description")} 
                    error={errors.description?.message}
                  />
                </div>
              </div>

              {/* Sección Fotos */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Gestionar Fotos</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-gray-200 group">
                      <Image 
                        src={photo} 
                        alt={`Foto ${index + 1}`} 
                        fill 
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
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
                      <span className="text-xs text-gray-500 font-medium">Añadir foto</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                    </label>
                  )}
                </div>
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
                     <Label htmlFor="phone">Teléfono</Label>
                     <Input 
                       id="phone" 
                       type="tel" 
                       placeholder="600 000 000" 
                       {...register("phone")} 
                       error={errors.phone?.message}
                     />
                   </div>
                   <div>
                     <Label htmlFor="email">Email</Label>
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

              {/* Submit */}
              <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
                <Link href="/mi-cuenta">
                  <Button type="button" variant="secondary">
                    Cancelar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="px-8 font-bold shadow-lg hover:shadow-xl transform transition-all active:scale-95 flex items-center gap-2"
                  disabled={isSubmitting}
                >
                   {isSubmitting ? "Guardando..." : <><Save size={18} /> Guardar cambios</>}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
