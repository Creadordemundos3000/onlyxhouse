"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { PremiumGrid } from "@/components/PremiumGrid";
import { ListingCard, ListingProfile } from "@/components/ListingCard";
import { Footer } from "@/components/Footer";
import { LayoutGrid, Filter, ArrowUpDown } from "lucide-react";
import { modelService, Model } from "@/services/modelService";
import { useSearchParams, useRouter } from "next/navigation";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await modelService.getAll();
        setModels(data);
      } catch (error) {
        console.error("Error loading models:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  // Filter models based on search params
  const term = searchParams.get("term")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";
  const location = searchParams.get("location") || "";

  const filteredModels = models.filter((model) => {
    const matchesTerm = term
      ? model.name.toLowerCase().includes(term) ||
        (model.description && model.description.toLowerCase().includes(term))
      : true;
    const matchesCategory = category ? model.category === category : true;
    const matchesLocation = location ? model.location === location : true;

    return matchesTerm && matchesCategory && matchesLocation;
  });

  // Map to ListingProfile format
  const listings: ListingProfile[] = filteredModels.map((model) => ({
    id: model.id!,
    name: model.name,
    age: model.age,
    nationality: "Internacional", // Default for now
    location: model.location,
    category: model.category,
    description: model.description,
    imageUrl:
      model.photos && model.photos.length > 0
        ? model.photos[0]
        : "https://placehold.co/400x600/gray/white?text=No+Photo",
    isTop: Math.random() > 0.8, // Simulate random top status
    isAutoSubida: Math.random() > 0.7,
    isVerified: true,
    photosCount: model.photos ? model.photos.length : 0,
    videosCount: 0,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      
      <main className="flex-grow bg-gray-50 pb-12">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Breadcrumb / Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 border-b border-gray-200 pb-4 gap-4">
            <div>
               <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                 {category || "Masajes relajantes"} en {location || "Alicante"}
               </h1>
               <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                 <span className="font-semibold text-gray-700">{loading ? "..." : listings.length} perfiles</span>
                 <span className="text-gray-300">|</span>
                 <button className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 font-medium transition-colors">
                   <LayoutGrid size={16} /> Ver galería de fotos
                 </button>
               </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm">
                <ArrowUpDown size={16} /> Ordenar
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm md:hidden">
                <Filter size={16} /> Filtrar
              </button>
            </div>
          </div>

          {/* Premium Section */}
          <div className="mb-10">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-gray-200 rounded w-32"></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-[2/3] bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : (
              <PremiumGrid models={filteredModels} /> 
            )}
          </div>

          {/* Listings Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-700 mb-4 px-1 border-l-4 border-pink-500 pl-3">
              Anuncios destacados
            </h2>
            
            {loading ? (
              <div className="grid grid-cols-1 gap-6">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="bg-white p-4 rounded shadow animate-pulse flex gap-4 h-64">
                     <div className="w-64 bg-gray-200 h-full rounded"></div>
                     <div className="flex-1 space-y-4 py-2">
                       <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                       <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                       <div className="h-20 bg-gray-200 rounded w-full"></div>
                     </div>
                   </div>
                 ))}
              </div>
            ) : listings.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} profile={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded shadow">
                <p className="text-gray-500 text-lg">No hay modelos que coincidan con tu búsqueda.</p>
                <button 
                  onClick={() => router.push('/')}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Ver todos los modelos
                </button>
              </div>
            )}
            
            {/* Load More Button */}
            {listings.length > 0 && (
              <div className="mt-10 text-center">
                <button className="bg-white border border-gray-300 text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-50 hover:text-pink-600 hover:border-pink-300 transition-all shadow-sm">
                  Cargar más anuncios
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Cargando...</div>}>
      <HomeContent />
    </Suspense>
  );
}
