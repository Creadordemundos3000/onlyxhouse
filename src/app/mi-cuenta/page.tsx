"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/FormElements";
import { Edit2, Eye, BarChart2, Plus, AlertCircle, Trash2, Power } from "lucide-react";
import { cn } from "@/components/ui/FormElements";

// Tipos simulados para los anuncios
type AdStatus = "active" | "paused" | "review" | "expired";

interface Ad {
  id: string;
  title: string;
  category: string;
  views: number;
  contacts: number;
  status: AdStatus;
  expiresAt: string;
  image: string;
}

// Datos de ejemplo
const MOCK_ADS: Ad[] = [
  {
    id: "1",
    title: "Masajes relajantes en el centro de Alicante",
    category: "Masajes",
    views: 1245,
    contacts: 48,
    status: "active",
    expiresAt: "2026-04-15",
    image: "https://placehold.co/400x300/pink/white?text=Foto+1",
  },
  {
    id: "2",
    title: "Escort VIP servicios exclusivos",
    category: "Escorts",
    views: 890,
    contacts: 22,
    status: "paused",
    expiresAt: "2026-05-01",
    image: "https://placehold.co/400x300/purple/white?text=Foto+2",
  },
];

const StatusBadge = ({ status }: { status: AdStatus }) => {
  const styles = {
    active: "bg-green-100 text-green-800 border-green-200",
    paused: "bg-yellow-100 text-yellow-800 border-yellow-200",
    review: "bg-blue-100 text-blue-800 border-blue-200",
    expired: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const labels = {
    active: "Activo",
    paused: "Pausado",
    review: "En revisión",
    expired: "Caducado",
  };

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", styles[status])}>
      {labels[status]}
    </span>
  );
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [ads, setAds] = useState<Ad[]>(MOCK_ADS);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/mi-cuenta");
    }
  }, [user, loading, router]);

  const toggleStatus = (id: string) => {
    setAds(ads.map(ad => {
      if (ad.id === id) {
        return { ...ad, status: ad.status === 'active' ? 'paused' : 'active' };
      }
      return ad;
    }));
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header del Dashboard */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mi Cuenta</h1>
              <p className="text-gray-500 mt-1">Gestiona tus anuncios y revisa tus estadísticas.</p>
            </div>
            <Link href="/publicar">
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                <Plus className="mr-2 h-5 w-5" /> Publicar nuevo anuncio
              </Button>
            </Link>
          </div>

          {/* Resumen de Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-100 text-pink-600 rounded-lg">
                  <Eye size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Visualizaciones totales</p>
                  <p className="text-2xl font-bold text-gray-900">2,135</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                  <BarChart2 size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Contactos recibidos</p>
                  <p className="text-2xl font-bold text-gray-900">70</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Anuncios activos</p>
                  <p className="text-2xl font-bold text-gray-900">{ads.filter(a => a.status === 'active').length} / {ads.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Anuncios */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Mis Anuncios</h2>
              <span className="text-sm text-gray-500">{ads.length} anuncios encontrados</span>
            </div>

            <div className="divide-y divide-gray-100">
              {ads.map((ad) => (
                <div key={ad.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-6">
                  {/* Imagen */}
                  <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Contenido */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{ad.title}</h3>
                        <StatusBadge status={ad.status} />
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Categoría: <span className="font-medium text-gray-700">{ad.category}</span> • Caduca: {ad.expiresAt}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1"><Eye size={16} /> {ad.views} Vistas</span>
                        <span className="flex items-center gap-1"><BarChart2 size={16} /> {ad.contacts} Contactos</span>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-wrap gap-3 mt-4 md:mt-0 pt-4 md:pt-0">
                      <Link href={`/mi-cuenta/editar/${ad.id}`}>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Edit2 size={14} /> Editar
                        </Button>
                      </Link>
                      
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className={cn("flex items-center gap-2", ad.status === 'active' ? "text-yellow-700 bg-yellow-50 hover:bg-yellow-100" : "text-green-700 bg-green-50 hover:bg-green-100")}
                        onClick={() => toggleStatus(ad.id)}
                      >
                        <Power size={14} /> {ad.status === 'active' ? 'Pausar' : 'Activar'}
                      </Button>

                      <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2 ml-auto md:ml-0">
                        <Trash2 size={14} /> Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {ads.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  <p>No tienes anuncios publicados.</p>
                  <Link href="/publicar" className="text-pink-600 font-medium hover:underline mt-2 inline-block">
                    ¡Publica tu primer anuncio ahora!
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
