"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Loader2,
  Check
} from "lucide-react";
import { modelService, Model } from "@/services/modelService";
import { useToast } from "@/context/ToastContext";

export default function AdminModelsList() {
  const { addToast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = modelService.subscribe((data) => {
      setModels(data);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este modelo? Esta acción no se puede deshacer.")) {
      try {
        await modelService.delete(id);
        // No need to manually update state, subscription will handle it
        addToast("Modelo eliminado exitosamente", "success");
      } catch (error) {
        console.error("Error deleting model:", error);
        addToast("Error al eliminar el modelo", "error");
      }
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await modelService.update(id, { status: "active" });
      addToast("Modelo aprobado exitosamente", "success");
    } catch (error) {
      console.error("Error approving model:", error);
      addToast("Error al aprobar el modelo", "error");
    }
  };

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          model.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || model.category === filterCategory;
    const matchesStatus = filterStatus === "all" || model.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Modelos</h1>
          <p className="text-gray-500">Administra todos los perfiles registrados en la plataforma.</p>
        </div>
        <Link 
          href="/admin/modelos/crear" 
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Modelo</span>
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o ubicación..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-500" />
          <select 
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm w-full sm:w-auto"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="pending">Pendientes</option>
            <option value="inactive">Inactivos</option>
          </select>

          <select 
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm w-full sm:w-auto"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">Todas las categorías</option>
            <option value="Escort">Escort</option>
            <option value="Masajista">Masajista</option>
            <option value="Dominatrix">Dominatrix</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Perfil</th>
                <th className="px-6 py-4">Ubicación</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Visitas</th>
                <th className="px-6 py-4 text-right" aria-label="Acciones">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredModels.map((model) => (
                <tr key={model.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
                        <Image 
                          src={model.photos[0] || "https://placehold.co/150x150"} 
                          alt={model.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{model.name}</div>
                        <div className="text-xs text-gray-500">{model.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{model.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                      {model.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      model.status === "active" ? "bg-green-100 text-green-700" :
                      model.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {model.status === "active" ? "Activo" : model.status === "pending" ? "Pendiente" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {model.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      {model.status === "pending" && (
                        <button 
                          className="p-1 text-green-500 hover:text-green-700 transition-colors bg-green-50 hover:bg-green-100 rounded-md" 
                          title="Aprobar"
                          onClick={() => handleApprove(model.id!)}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <Link 
                        href={`/admin/modelos/${model.id}/editar`}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors" 
                        title="Ver/Editar detalle"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link 
                        href={`/admin/modelos/${model.id}/editar`}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors" 
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button 
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors" 
                        title="Eliminar"
                        onClick={() => handleDelete(model.id!)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Mock */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Mostrando <span className="font-medium">1</span> a <span className="font-medium">{filteredModels.length}</span> de <span className="font-medium">{models.length}</span> resultados</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 disabled:opacity-50" disabled>Anterior</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-500 hover:bg-gray-50">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}
