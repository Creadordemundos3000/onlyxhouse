import React from "react";
import Image from "next/image";
import { CheckCircle, MessageCircle } from "lucide-react";

interface PremiumProfile {
  id: number;
  name: string;
  location: string;
  imageUrl: string;
  isVerified: boolean;
  phone?: string;
}

const MOCK_PREMIUM_PROFILES: PremiumProfile[] = [
  { id: 1, name: "MASAJISTA ANDALUZA", location: "Alicante", imageUrl: "https://placehold.co/300x450/pink/white?text=Maria", isVerified: true },
  { id: 2, name: "MASAJES RELAJANTES", location: "Alicante", imageUrl: "https://placehold.co/300x450/orange/white?text=Ana", isVerified: true },
  { id: 3, name: "Gentlemen, if what you...", location: "Alicante", imageUrl: "https://placehold.co/300x450/green/white?text=Sofia", isVerified: true },
  { id: 4, name: "Gentlemen, would you...", location: "Alicante", imageUrl: "https://placehold.co/300x450/blue/white?text=Lucia", isVerified: true },
  { id: 5, name: "En Alicante centro Elegant...", location: "Alicante", imageUrl: "https://placehold.co/300x450/purple/white?text=Elena", isVerified: true, phone: "663412616" },
  { id: 6, name: "Masajes con LISSA", location: "Alicante", imageUrl: "https://placehold.co/300x450/red/white?text=Lissa", isVerified: false },
];

export function PremiumGrid() {
  return (
    <div className="py-4">
      <h2 className="text-red-600 text-xl font-bold mb-4 uppercase">Premium</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {MOCK_PREMIUM_PROFILES.map((profile) => (
          <div key={profile.id} className="relative group cursor-pointer overflow-hidden rounded-md shadow-sm hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="aspect-[2/3] w-full relative bg-gray-200">
               <Image 
                 src={profile.imageUrl} 
                 alt={profile.name}
                 fill
                 className="object-cover"
                 sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
               />
               
               {/* Verified Badge */}
               {profile.isVerified && (
                 <div className="absolute top-1 left-1 bg-green-500 rounded-full p-0.5">
                   <CheckCircle size={12} className="text-white" />
                 </div>
               )}

               {/* WhatsApp Icon */}
               <div className="absolute bottom-12 left-1 bg-green-500 rounded-full p-1 opacity-80">
                 <MessageCircle size={14} className="text-white" />
               </div>

               {/* Phone Overlay if present */}
               {profile.phone && (
                 <div className="absolute bottom-16 left-0 right-0 text-center">
                    <span className="text-white font-bold text-lg drop-shadow-md">{profile.phone}</span>
                 </div>
               )}
            </div>

            {/* Bottom Info */}
            <div className="bg-blue-50/80 p-2 text-center h-16 flex flex-col justify-center items-center">
              <h3 className="text-blue-700 font-bold text-xs line-clamp-2 leading-tight">
                {profile.name}
              </h3>
              <p className="text-gray-500 text-[10px] mt-1">{profile.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
