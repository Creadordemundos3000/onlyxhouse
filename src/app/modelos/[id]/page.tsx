import { Metadata } from "next";
import { modelService, Model } from "@/services/modelService";
import ModelDetailClient from "./ModelDetailClient";

// Force dynamic rendering since we are fetching specific IDs
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const model = await modelService.getById(id);
    
    if (!model) {
      return {
        title: "Modelo no encontrada - OnlyXHouse",
        description: "El perfil que buscas no existe."
      };
    }

    return {
      title: `${model.name} - ${model.category} en ${model.location} | OnlyXHouse`,
      description: model.description ? model.description.slice(0, 160) : `Conoce a ${model.name}, ${model.category} en ${model.location}.`,
      openGraph: {
        title: `${model.name} - ${model.category} en ${model.location}`,
        description: model.description ? model.description.slice(0, 160) : undefined,
        images: model.photos && model.photos.length > 0 ? [model.photos[0]] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "OnlyXHouse - Perfil de Modelo",
    };
  }
}

export default async function ModelDetailPage({ params }: Props) {
  const { id } = await params;
  
  let model: Model | null = null;
  let error: string | null = null;

  try {
    const rawModel = await modelService.getById(id);
    if (rawModel) {
      // Strip timestamps to avoid serialization error
      const { createdAt, updatedAt, ...rest } = rawModel;
      model = rest as Model;
    } else {
      error = "Modelo no encontrada";
    }
  } catch (err) {
    console.error("Error fetching model server-side:", err);
    error = "Error al cargar el perfil";
  }

  return <ModelDetailClient initialModel={model} error={error} />;
}
