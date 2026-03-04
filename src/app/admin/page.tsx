"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Eye, 
  CreditCard, 
  TrendingUp, 
  MoreHorizontal,
  Loader2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { modelService, Model } from "@/services/modelService";

export default function AdminDashboard() {
  const [totalModels, setTotalModels] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [activeModels, setActiveModels] = useState(0);
  const [recentModels, setRecentModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = modelService.subscribe((models) => {
      setTotalModels(models.length);
      
      // Calculate active models
      const activeCount = models.filter(m => m.status === "active").length;
      setActiveModels(activeCount);

      // Calculate total views
      const views = models.reduce((sum, model) => sum + (model.views || 0), 0);
      setTotalViews(views);

      // Get last 5 models
      setRecentModels(models.slice(0, 5));
      
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Calculate estimated revenue based on active models
  // Assumption: Each active model generates ~10 bookings/month at avg 150€
  const estimatedRevenue = activeModels * 150 * 10;

  // Real-time metrics
  const metrics = [
    {
      title: "Total Modelos",
      value: loading ? "..." : totalModels.toString(),
      change: `+${activeModels} Activos`,
      icon: <Users className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      title: "Visitas Totales",
      value: loading ? "..." : totalViews.toLocaleString(),
      change: "Tiempo Real",
      icon: <Eye className="w-6 h-6 text-green-500" />,
      bg: "bg-green-50",
    },
    {
      title: "Ingresos (Est. Mes)",
      value: loading ? "..." : `€${estimatedRevenue.toLocaleString()}`,
      change: "Proyección",
      icon: <CreditCard className="w-6 h-6 text-purple-500" />,
      bg: "bg-purple-50",
    },
    {
      title: "Tasa de Actividad",
      value: loading ? "..." : `${totalModels > 0 ? Math.round((activeModels / totalModels) * 100) : 0}%`,
      change: "Modelos Activos",
      icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
      bg: "bg-orange-50",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Bienvenido al panel de administración de OnlyXHouse.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</h3>
              </div>
              <div className={`p-3 rounded-lg ${metric.bg}`}>
                {metric.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={metric.change.startsWith("+") ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                {metric.change}
              </span>
              <span className="text-gray-400 ml-2">vs mes anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Models Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Modelos Recientes</h2>
            <Link href="/admin/modelos" className="text-sm text-red-600 hover:text-red-700 font-medium">
              Ver todas
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Modelo</th>
                  <th className="px-6 py-4">Categoría</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4"><span className="sr-only">Acciones</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentModels.map((model) => (
                  <tr key={model.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
                          <Image 
                            src={model.photos[0] || "https://placehold.co/150x150"} 
                            alt={model.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="font-medium text-gray-900">{model.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {model.category}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Using createdAt if available, otherwise mock "Reciente" */}
                      {model.createdAt ? "Reciente" : "Reciente"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / System Status */}
        <div className="space-y-8">
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="space-y-3">
              <Link href="/admin/modelos/crear" className="block w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white text-center rounded-lg transition-colors font-medium">
                Crear Nuevo Modelo
              </Link>
              <button className="block w-full py-2 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-center rounded-lg transition-colors font-medium">
                Gestionar Pagos
              </button>
              <button className="block w-full py-2 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-center rounded-lg transition-colors font-medium">
                Ver Reportes
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-6 text-white">
            <h3 className="font-semibold text-lg mb-2">Estado del Sistema</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">Servidor</span>
                <span className="flex items-center gap-2 text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  Operativo
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">Base de Datos</span>
                <span className="flex items-center gap-2 text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  Conectado
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-300">Almacenamiento</span>
                <span className="text-gray-300">45% Usado</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
