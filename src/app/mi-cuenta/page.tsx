"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/FormElements";
import { Edit2, Eye, BarChart2, Plus, AlertCircle, Trash2, Power } from "lucide-react";
import { cn } from "@/components/ui/FormElements";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { modelService, Model } from "@/services/modelService";
import { useToast } from "@/context/ToastContext";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    active: "bg-green-100 text-green-800 border-green-200",
    paused: "bg-yellow-100 text-yellow-800 border-yellow-200",
    review: "bg-blue-100 text-blue-800 border-blue-200",
    expired: "bg-gray-100 text-gray-800 border-gray-200",
    inactive: "bg-red-100 text-red-800 border-red-200",
    pending: "bg-orange-100 text-orange-800 border-orange-200",
  };

  const labels: Record<string, string> = {
    active: "Activo",
    paused: "Pausado",
    review: "En revisión",
    expired: "Caducado",
    inactive: "Inactivo",
    pending: "Pendiente",
  };

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", styles[status] || styles.review)}>
      {labels[status] || status}
    </span>
  );
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [ads, setAds] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAds = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const userModels = await modelService.getByUserId(user.uid);
        setAds(userModels);
      } catch (error) {
        console.error("Error fetching user ads:", error);
        addToast("Error al cargar tus anuncios", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAds();
  }, [user, addToast]);

  const toggleStatus = async (model: Model) => {
    try {
      const newStatus = model.status === 'active' ? 'inactive' : 'active';
      // In a real app, we would update this in Firebase
      // await modelService.update(model.id!, { status: newStatus });
      
      setAds(ads.map(ad => {
        if (ad.id === model.id) {
          return { ...ad, status: newStatus };
        }
        return ad;
      }));
      
      addToast(`Anuncio ${newStatus === 'active' ? 'activado' : 'pausado'} correctamente`, "success");
    } catch (error) {
      addToast("Error al actualizar el estado", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este anuncio?")) return;
    
    try {
      await modelService.delete(id);
      setAds(ads.filter(ad => ad.id !== id));
      addToast("Anuncio eliminado correctamente", "success");
    } catch (error) {
      addToast("Error al eliminar el anuncio", "error");
    }
  };

  return (
    <ProtectedRoute requireAdmin={false}>
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
                    <p className="text-2xl font-bold text-gray-900">
                      {ads.reduce((acc, curr) => acc + (curr.views || 0), 0)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                    <BarChart2 size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Anuncios totales</p>
                    <p className="text-2xl font-bold text-gray-900">{ads.length}</p>
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
                    <p className="text-2xl font-bold text-gray-900">{ads.filter(a => a.status === 'active').length}</p>
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

              {loading ? (
                <div className="p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
                  <p className="mt-4 text-gray-500">Cargando tus anuncios...</p>
                </div>
              ) : ads.length === 0 ? (
                <div className="p-12 text-center flex flex-col items-center">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No tienes anuncios publicados</h3>
                  <p className="text-gray-500 mt-2 mb-6 max-w-sm">
                    Publica tu primer anuncio para empezar a recibir contactos y visualizaciones.
                  </p>
                  <Link href="/publicar">
                    <Button>Publicar ahora</Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {ads.map((ad) => (
                    <div key={ad.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-6">
                      {/* Imagen */}
                      <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <Image 
                          src={ad.photos && ad.photos.length > 0 ? ad.photos[0] : "https://placehold.co/400x300/gray/white?text=No+Foto"} 
                          alt={ad.name} 
                          fill 
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 200px"
                        />
                      </div>

                      {/* Contenido */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{ad.name}</h3>
                            <StatusBadge status={ad.status} />
                          </div>
                          <p className="text-sm text-gray-500 mb-4">
                            Categoría: <span className="font-medium text-gray-700">{ad.category}</span> • Edad: {ad.age} • Ubicación: {ad.location}
                          </p>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-600">
                            <span className="flex items-center gap-1"><Eye size={16} /> {ad.views || 0} Vistas</span>
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="flex items-center gap-3 mt-4 md:mt-0 md:self-end">
                           <Link href={`/admin/modelos/${ad.id}/editar`}>
                            <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                              <Edit2 size={16} className="mr-1" /> Editar
                            </Button>
                           </Link>
                           
                           <Button 
                             variant="outline" 
                             size="sm" 
                             onClick={() => toggleStatus(ad)}
                             className={cn(
                               "border-gray-200", 
                               ad.status === 'active' ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50"
                             )}
                           >
                             <Power size={16} className="mr-1" /> 
                             {ad.status === 'active' ? "Pausar" : "Activar"}
                           </Button>

                           <Button 
                             variant="outline" 
                             size="sm" 
                             onClick={() => handleDelete(ad.id!)}
                             className="text-red-600 border-red-200 hover:bg-red-50"
                           >
                             <Trash2 size={16} className="mr-1" /> Eliminar
                           </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
