"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, X, Upload, Plus, Trash2, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { modelService } from "@/services/modelService";
import { useToast } from "@/context/ToastContext";

// Schema definition
const modelSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  age: z.string().min(1, "La edad es requerida"),
  phone: z.string().min(9, "El teléfono es requerido"),
  category: z.string().min(1, "La categoría es requerida"),
  location: z.string().min(1, "La ubicación es requerida"),
  description: z.string().min(10, "La descripción es requerida"),
  services: z.string().min(1, "Los servicios son requeridos (separados por comas)"),
  rates: z.array(z.object({
    duration: z.string(),
    price: z.string()
  })).min(1, "Al menos una tarifa es requerida"),
  photos: z.array(z.string()).min(1, "Al menos una foto es requerida"),
  status: z.enum(["active", "pending", "inactive"]),
});

type ModelFormValues = z.infer<typeof modelSchema>;

export default function CreateModelPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [rates, setRates] = useState<{duration: string, price: string}[]>([{ duration: "1 Hora", price: "150" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [customService, setCustomService] = useState("");

  const COMMON_SERVICES = [
    "Masaje Relajante", "Francés natural", "Francés completo", 
    "Trato de novios", "Besos con lengua", "Garganta profunda",
    "Lluvia dorada", "Sado suave", "Duplex", "Trios",
    "Anal", "Fiestas", "Cena", "Viajes"
  ];

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ModelFormValues>({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      status: "active",
      rates: [{ duration: "1 Hora", price: "150" }],
      photos: [],
      services: ""
    }
  });

  // Sync services when selectedServices changes
  useEffect(() => {
    setValue("services", selectedServices.join(", "));
  }, [selectedServices, setValue]);

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const addCustomService = () => {
    if (customService.trim() && !selectedServices.includes(customService.trim())) {
      setSelectedServices([...selectedServices, customService.trim()]);
      setCustomService("");
    }
  };

  const onSubmit = async (data: ModelFormValues) => {
    try {
      setIsSubmitting(true);
      // Remove photos array from data as we handle files separately in service
      const { photos: _, ...modelData } = data;
      
      // Pass photos: [] as initial value, service will replace it with urls
      await modelService.create({ ...modelData, photos: [] }, photoFiles);
      
      addToast("Modelo creado exitosamente", "success");
      router.push("/admin/modelos");
    } catch (error) {
      console.error("Error creating model:", error);
      addToast("Error al crear el modelo. Por favor intente nuevamente.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addRate = () => {
    const newRates = [...rates, { duration: "", price: "" }];
    setRates(newRates);
    setValue("rates", newRates);
  };

  const removeRate = (index: number) => {
    const newRates = rates.filter((_, i) => i !== index);
    setRates(newRates);
    setValue("rates", newRates);
  };

  const updateRate = (index: number, field: "duration" | "price", value: string) => {
    const newRates = [...rates];
    newRates[index][field] = value;
    setRates(newRates);
    setValue("rates", newRates);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Store file for upload
      setPhotoFiles(prev => [...prev, file]);

      // Preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newPhotos = [...photos, event.target.result as string];
          setPhotos(newPhotos);
          setValue("photos", newPhotos);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setValue("photos", newPhotos);
    
    const newFiles = photoFiles.filter((_, i) => i !== index);
    setPhotoFiles(newFiles);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Modelo</h1>
          <p className="text-gray-500">Completa la información para registrar un nuevo perfil.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/admin/modelos" 
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancelar
          </Link>
          <button 
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Guardar Modelo
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Información Personal</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Nombre Completo</label>
                <input 
                  {...register("name")}
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="Ej. Ana García"
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Edad</label>
                <input 
                  {...register("age")}
                  type="number" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="Ej. 24"
                />
                {errors.age && <p className="text-xs text-red-500">{errors.age.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Teléfono</label>
                <input 
                  {...register("phone")}
                  type="tel" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="+34 600 000 000"
                />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Ubicación</label>
                <input 
                  {...register("location")}
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="Ej. Madrid Centro"
                />
                {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Descripción</label>
              <textarea 
                {...register("description")}
                rows={4} 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Describe el perfil..."
              ></textarea>
              {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
            </div>
          </div>

          {/* Services & Rates */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Servicios y Tarifas</h2>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Servicios</label>
              
              {/* Selected Services Tags */}
              <div className="flex flex-wrap gap-2 mb-3 min-h-[40px] p-2 bg-gray-50 rounded-lg border border-gray-100">
                {selectedServices.length > 0 ? (
                  selectedServices.map((service, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                    >
                      {service}
                      <button 
                        type="button"
                        onClick={() => toggleService(service)}
                        className="ml-1.5 text-red-600 hover:text-red-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400 italic">No hay servicios seleccionados</span>
                )}
              </div>

              {/* Common Services Selection */}
              <div className="flex flex-wrap gap-2">
                {COMMON_SERVICES.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                      selectedServices.includes(service)
                        ? "bg-red-50 border-red-200 text-red-700 font-medium"
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>

              {/* Custom Service Input */}
              <div className="flex gap-2 mt-2">
                <input 
                  type="text" 
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomService();
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none text-sm"
                  placeholder="Agregar otro servicio..."
                />
                <button 
                  type="button"
                  onClick={addCustomService}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              {/* Hidden input for form registration */}
              <input 
                {...register("services")}
                type="hidden" 
              />
              {errors.services && <p className="text-xs text-red-500">{errors.services.message}</p>}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 block">Tarifas</label>
              {rates.map((rate, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input 
                    type="text" 
                    placeholder="Duración (ej. 1 Hora)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    value={rate.duration}
                    onChange={(e) => updateRate(index, "duration", e.target.value)}
                  />
                  <input 
                    type="text" 
                    placeholder="Precio (ej. 150€)"
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    value={rate.price}
                    onChange={(e) => updateRate(index, "price", e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => removeRate(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button 
                type="button"
                onClick={addRate}
                className="text-sm text-red-600 font-medium hover:text-red-700 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Añadir Tarifa
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Status & Category */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Clasificación</h2>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Estado</label>
              <select 
                {...register("status")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="active">Activo</option>
                <option value="pending">Pendiente</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Categoría</label>
              <select 
                {...register("category")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                <option value="">Seleccionar...</option>
                <option value="Escort">Escort</option>
                <option value="Masajista">Masajista</option>
                <option value="Dominatrix">Dominatrix</option>
                <option value="Trans">Trans</option>
              </select>
              {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Galería</h2>
            
            <div className="grid grid-cols-2 gap-2">
              {photos.map((photo, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                  <Image 
                    src={photo} 
                    alt={`Foto ${index + 1}`} 
                    fill 
                    className="object-cover"
                  />
                  <button 
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              
              <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-500 hover:bg-red-50 transition-colors">
                <Upload className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">Subir Foto</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
