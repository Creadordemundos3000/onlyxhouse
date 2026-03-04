"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Eye, 
  TrendingUp, 
  Calendar,
  BarChart2,
  PieChart,
  Activity,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { modelService, Model } from "@/services/modelService";

export default function MetricsPage() {
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState<Model[]>([]);
  
  // Computed Metrics
  const [totalViews, setTotalViews] = useState(0);
  const [avgViewsPerModel, setAvgViewsPerModel] = useState(0);
  const [topModels, setTopModels] = useState<Model[]>([]);
  const [categoryDistribution, setCategoryDistribution] = useState<Record<string, number>>({});
  const [statusDistribution, setStatusDistribution] = useState<Record<string, number>>({});

  useEffect(() => {
    // Subscribe to real-time data
    const unsubscribe = modelService.subscribe((data) => {
      setModels(data);
      
      // Calculate Metrics
      const views = data.reduce((sum, m) => sum + (m.views || 0), 0);
      setTotalViews(views);
      
      setAvgViewsPerModel(data.length > 0 ? Math.round(views / data.length) : 0);
      
      // Top 5 Models by Views
      const sortedByViews = [...data].sort((a, b) => (b.views || 0) - (a.views || 0));
      setTopModels(sortedByViews.slice(0, 5));
      
      // Category Distribution
      const cats: Record<string, number> = {};
      data.forEach(m => {
        const cat = m.category || "Sin categoría";
        cats[cat] = (cats[cat] || 0) + 1;
      });
      setCategoryDistribution(cats);

      // Status Distribution
      const stats: Record<string, number> = {};
      data.forEach(m => {
        const stat = m.status || "unknown";
        stats[stat] = (stats[stat] || 0) + 1;
      });
      setStatusDistribution(stats);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Métricas y Análisis</h1>
        <p className="text-gray-500">Visión detallada del rendimiento de la plataforma.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Visitas</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalViews.toLocaleString()}</h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <Eye className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
            <ArrowUp className="w-4 h-4 mr-1" />
            <span>Tiempo Real</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Modelos Activos</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{statusDistribution["active"] || 0}</h3>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <Users className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>De un total de {models.length}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Promedio Visitas</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{avgViewsPerModel.toLocaleString()}</h3>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <Activity className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Por perfil</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Tasa de Conversión</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">~3.2%</h3>
            </div>
            <div className="p-3 rounded-lg bg-orange-50">
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Estimado sector</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Models Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Top 5 Modelos Más Visitados</h3>
            <BarChart2 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4">Categoría</th>
                  <th className="px-6 py-4 text-right">Visitas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topModels.map((model, index) => (
                  <tr key={model.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-2">
                      <span className={`
                        w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                        ${index === 0 ? "bg-yellow-100 text-yellow-700" : 
                          index === 1 ? "bg-gray-100 text-gray-700" : 
                          index === 2 ? "bg-orange-100 text-orange-700" : "bg-blue-50 text-blue-700"}
                      `}>
                        {index + 1}
                      </span>
                      {model.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{model.category}</td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">{model.views?.toLocaleString()}</td>
                  </tr>
                ))}
                {topModels.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      No hay datos suficientes
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Distribución por Categoría</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="p-6 space-y-4">
            {Object.entries(categoryDistribution).map(([category, count]) => {
              const percentage = Math.round((count / models.length) * 100) || 0;
              return (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{category}</span>
                    <span className="text-gray-500">{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
            {Object.keys(categoryDistribution).length === 0 && (
              <p className="text-center text-gray-500 py-4">No hay datos suficientes</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
