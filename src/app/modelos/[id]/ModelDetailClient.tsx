"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { modelService, Model } from "@/services/modelService";
import { MapPin, Phone, MessageCircle, Clock, Heart, Share2, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ModelDetailClientProps {
  initialModel: Model | null;
  error?: string | null;
}

export default function ModelDetailClient({ initialModel, error: initialError }: ModelDetailClientProps) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState<string | null>(
    initialModel && initialModel.photos && initialModel.photos.length > 0 ? initialModel.photos[0] : null
  );

  useEffect(() => {
    if (initialModel && initialModel.id) {
      // Increment views on client side mount
      modelService.incrementViews(initialModel.id);
    }
  }, [initialModel]);

  if (initialError || !initialModel) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{initialError || "Perfil no encontrado"}</h1>
          <p className="text-gray-600 mb-6">El perfil que buscas no existe o ha sido eliminado.</p>
          <Link 
            href="/"
            className="px-6 py-3 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-700 transition-colors"
          >
            Volver al inicio
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow pb-12">
        {/* Breadcrumb & Navigation */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl">
            <button 
              onClick={() => router.back()} 
              className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              <span>Volver</span>
            </button>
            <div className="flex gap-4">
              <button className="text-gray-400 hover:text-pink-500 transition-colors">
                <Heart size={24} />
              </button>
              <button className="text-gray-400 hover:text-blue-500 transition-colors">
                <Share2 size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Gallery */}
            <div className="lg:col-span-2 space-y-4">
              {/* Main Image */}
              <div className="aspect-[3/4] md:aspect-[4/3] relative rounded-xl overflow-hidden shadow-lg bg-gray-200">
                {activeImage ? (
                  <Image 
                    src={activeImage}
                    alt={initialModel.name}
                    fill
                    className="object-contain bg-black/5"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No hay imágenes disponibles
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {initialModel.photos && initialModel.photos.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {initialModel.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(photo)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === photo ? "border-pink-500 scale-105" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image 
                        src={photo}
                        alt={`${initialModel.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Description Section */}
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                  Sobre mí
                </h2>
                <div className="prose prose-pink max-w-none text-gray-600 whitespace-pre-line">
                  {initialModel.description}
                </div>
              </div>

              {/* Services Section */}
              {initialModel.services && (
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">
                    Servicios
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {initialModel.services.split(',').map((service, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-medium border border-pink-100"
                      >
                        {service.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Info & Contact */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 border border-gray-100">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">{initialModel.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                      <MapPin size={16} /> {initialModel.location}
                    </span>
                    <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium">
                      {initialModel.age} años
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-700">
                      {initialModel.category}
                    </span>
                  </div>
                </div>

                {/* Rates - Mock Data for now */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Tarifas</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-600 flex items-center gap-2"><Clock size={16} /> 1 Hora</span>
                      <span className="font-bold text-gray-900">100€</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-600 flex items-center gap-2"><Clock size={16} /> 30 Minutos</span>
                      <span className="font-bold text-gray-900">60€</span>
                    </div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <a 
                    href={`https://wa.me/${initialModel.phone?.replace(/\s+/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                  >
                    <MessageCircle size={20} />
                    WhatsApp
                  </a>
                  <a 
                    href={`tel:${initialModel.phone}`}
                    className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <Phone size={20} />
                    Llamar
                  </a>
                </div>

                <div className="mt-6 text-center text-xs text-gray-400">
                  Referencia: #{initialModel.id?.slice(0, 8).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}