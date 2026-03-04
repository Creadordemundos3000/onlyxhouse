import React from "react";
import Image from "next/image";
import { CheckCircle, MessageCircle } from "lucide-react";
import { Model } from "@/services/modelService";

interface PremiumGridProps {
  models: Model[];
}

export function PremiumGrid({ models }: PremiumGridProps) {
  // Take first 6 models or random ones for premium
  const premiumModels = models.slice(0, 6);

  if (premiumModels.length === 0) {
    return null;
  }

  return (
    <div className="py-4">
      <h2 className="text-red-600 text-xl font-bold mb-4 uppercase">Premium</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {premiumModels.map((model) => (
          <div key={model.id} className="relative group cursor-pointer overflow-hidden rounded-md shadow-sm hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="aspect-[2/3] w-full relative bg-gray-200">
               {model.photos && model.photos.length > 0 ? (
                 <Image 
                   src={model.photos[0]} 
                   alt={model.name}
                   fill
                   className="object-cover"
                   sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                 />
               ) : (
                 <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs">
                   Sin foto
                 </div>
               )}
               
               {/* Verified Badge - Mocking for now as it's not in Model yet, or maybe assume all active are verified? */}
               <div className="absolute top-1 left-1 bg-green-500 rounded-full p-0.5">
                 <CheckCircle size={12} className="text-white" />
               </div>

               {/* WhatsApp Icon */}
               <div className="absolute bottom-12 left-1 bg-green-500 rounded-full p-1 opacity-80">
                 <MessageCircle size={14} className="text-white" />
               </div>

               {/* Phone Overlay */}
               {model.phone && (
                 <div className="absolute bottom-16 left-0 right-0 text-center">
                    <span className="text-white font-bold text-lg drop-shadow-md">{model.phone}</span>
                 </div>
               )}
            </div>

            {/* Bottom Info */}
            <div className="bg-blue-50/80 p-2 text-center h-16 flex flex-col justify-center items-center">
              <h3 className="text-blue-700 font-bold text-xs line-clamp-2 leading-tight">
                {model.name}
              </h3>
              <p className="text-gray-500 text-[10px] mt-1">{model.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
