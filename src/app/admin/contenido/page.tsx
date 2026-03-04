"use client";

import { useState } from "react";
import { 
  FileText, 
  Save, 
  Check, 
  AlertCircle,
  Link as LinkIcon,
  Image as ImageIcon
} from "lucide-react";
import { useToast } from "@/context/ToastContext";

// Mock service for content management (replace with actual Firebase implementation later)
const contentService = {
  get: async (key: string) => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return localStorage.getItem(`content_${key}`) || "";
  },
  save: async (key: string, content: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    localStorage.setItem(`content_${key}`, content);
    return true;
  }
};

export default function ContentPage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<"legal" | "banners" | "seo">("legal");
  const [loading, setLoading] = useState(false);
  
  // Content States
  const [terms, setTerms] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [bannerText, setBannerText] = useState("Encuentra tu compañía ideal");
  const [bannerSubtext, setBannerSubtext] = useState("Miles de anuncios clasificados de contactos en España");

  const handleSave = async (key: string, content: string) => {
    setLoading(true);
    try {
      await contentService.save(key, content);
      addToast("Contenido guardado exitosamente", "success");
    } catch (error) {
      console.error(error);
      addToast("Error al guardar el contenido", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Contenido</h1>
        <p className="text-gray-500">Administra los textos legales, banners y configuración SEO.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("legal")}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === "legal" 
                ? "border-red-500 text-red-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
            `}
          >
            <FileText className="w-4 h-4 inline-block mr-2" />
            Textos Legales
          </button>
          <button
            onClick={() => setActiveTab("banners")}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === "banners" 
                ? "border-red-500 text-red-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
            `}
          >
            <ImageIcon className="w-4 h-4 inline-block mr-2" />
            Banners y Portada
          </button>
          <button
            onClick={() => setActiveTab("seo")}
            className={`
              whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
              ${activeTab === "seo" 
                ? "border-red-500 text-red-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
            `}
          >
            <LinkIcon className="w-4 h-4 inline-block mr-2" />
            SEO y Metadatos
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {activeTab === "legal" && (
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Términos y Condiciones</h3>
                <button
                  onClick={() => handleSave("terms", terms)}
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> : <Save className="w-4 h-4 mr-2" />}
                  Guardar
                </button>
              </div>
              <textarea
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className="w-full h-64 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm"
                placeholder="Escribe aquí los términos y condiciones..."
              />
              <p className="mt-2 text-xs text-gray-500">Soporta formato Markdown básico.</p>
            </div>

            <div className="border-t border-gray-100 pt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Política de Privacidad</h3>
                <button
                  onClick={() => handleSave("privacy", privacy)}
                  disabled={loading}
                  className="flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
                >
                  {loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> : <Save className="w-4 h-4 mr-2" />}
                  Guardar
                </button>
              </div>
              <textarea
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
                className="w-full h-64 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent font-mono text-sm"
                placeholder="Escribe aquí la política de privacidad..."
              />
            </div>
          </div>
        )}

        {activeTab === "banners" && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal (H1)</label>
              <input
                type="text"
                value={bannerText}
                onChange={(e) => setBannerText(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
              <input
                type="text"
                value={bannerSubtext}
                onChange={(e) => setBannerSubtext(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={() => handleSave("banner", JSON.stringify({ title: bannerText, subtitle: bannerSubtext }))}
                disabled={loading}
                className="flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> : <Save className="w-4 h-4 mr-2" />}
                Actualizar Portada
              </button>
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="text-center py-12">
            <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg inline-flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Próximamente</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Configuración SEO Avanzada</h3>
            <p className="text-gray-500 mt-2">Esta funcionalidad estará disponible en la próxima actualización.</p>
          </div>
        )}
      </div>
    </div>
  );
}
