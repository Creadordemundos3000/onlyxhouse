import React from "react";
import Image from "next/image";
import { Heart, Phone, MapPin, CheckCircle, Star } from "lucide-react";

interface ListingProfile {
  id: number;
  name: string;
  age: number;
  nationality: string;
  location: string;
  category: string;
  description: string;
  imageUrl: string;
  isTop?: boolean;
  isAutoSubida?: boolean;
  isVerified?: boolean;
  photosCount?: number;
  videosCount?: number;
}

export function ListingCard({ profile }: { profile: ListingProfile }) {
  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-0 sm:gap-4 overflow-hidden group">
      {/* Image Section */}
      <div className="w-full sm:w-56 md:w-64 flex-shrink-0 relative bg-gray-100">
        <div className="aspect-[3/4] sm:aspect-[4/5] relative overflow-hidden">
           <Image 
             src={profile.imageUrl} 
             alt={profile.name}
             fill
             className="object-cover group-hover:scale-105 transition-transform duration-500"
             sizes="(max-width: 640px) 100vw, (max-width: 768px) 224px, 256px"
           />
           {/* Image Overlays */}
           <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent text-white flex justify-between items-end">
              <div className="flex gap-2 text-xs font-bold">
                 {profile.photosCount && <span>📷 {profile.photosCount}</span>}
                 {profile.videosCount && <span>🎥 {profile.videosCount}</span>}
              </div>
           </div>
           
           {profile.isVerified && (
             <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
               <CheckCircle size={10} /> VERIFICADA
             </div>
           )}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow flex flex-col p-4 sm:py-4 sm:pr-4 sm:pl-0">
        <div className="flex-grow">
          {/* Header & Badges */}
          <div className="flex justify-between items-start mb-2">
             <div className="flex flex-wrap gap-2 items-center">
                {profile.isTop && (
                  <span className="bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> TOP
                  </span>
                )}
                {profile.isAutoSubida && (
                  <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                    Autosubidas
                  </span>
                )}
                <span className="text-gray-400 text-xs uppercase font-medium tracking-wide">{profile.category}</span>
                <span className="text-gray-300 mx-1">|</span>
                <span className="text-gray-400 text-xs font-medium flex items-center gap-1">
                  <MapPin size={12} /> {profile.location}
                </span>
             </div>
             <button className="text-gray-300 hover:text-pink-500 transition-colors">
               <Heart size={22} />
             </button>
          </div>

          {/* Title */}
          <h3 className="text-blue-600 text-xl font-bold mb-2 hover:underline cursor-pointer leading-tight">
            {profile.name}
          </h3>

          {/* Details Line */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-4">
             <div className="flex items-center gap-1 text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-100">
               <Phone size={14} fill="currentColor" className="text-green-500" />
               <span>Contactar</span>
             </div>
             <div className="flex items-center gap-1 text-gray-700 font-medium">
               <span className="font-bold text-blue-600">{profile.age} años</span>
             </div>
             <div className="text-gray-500 text-xs px-2 py-0.5 bg-gray-100 rounded border border-gray-200 uppercase font-bold tracking-wider">
               {profile.nationality}
             </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 group-hover:text-gray-900 transition-colors">
            {profile.description}
          </p>
        </div>
        
        {/* Footer / Actions */}
        <div className="mt-2 pt-3 border-t border-gray-100 flex justify-end gap-3">
           <button className="text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors">
             Ver detalles
           </button>
           <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-sm hover:shadow transition-all flex items-center gap-2">
             <Phone size={16} /> Llamar
           </button>
        </div>
      </div>
    </div>
  );
}
