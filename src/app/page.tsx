import React from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { PremiumGrid } from "@/components/PremiumGrid";
import { ListingCard } from "@/components/ListingCard";
import { Footer } from "@/components/Footer";
import { LayoutGrid, Filter, ArrowUpDown } from "lucide-react";

export default function Home() {
  const listings = [
    {
      id: 1,
      name: "MASAJISTA ESPAÑOLA PROFESIONAL",
      age: 37,
      nationality: "Española",
      location: "Alicante",
      category: "Masajes relajantes",
      description: "Soy SILVIA, Pura. Mi trato único y elusivo te llevaran a otro nivel.. Hermosa, divertida, llena de y energia...para tu disfrute... Experta en masajes para que puedas desconectar y dejas atrás el estrés del día...para despertar todos tus sentidos...dejate llevar... Regalate momentos de...",
      imageUrl: "https://placehold.co/400x600/black/white?text=Silvia",
      isTop: true,
      isAutoSubida: true,
      isVerified: true,
      photosCount: 5,
      videosCount: 1,
    },
    {
      id: 2,
      name: "Isa en Alicante",
      age: 27,
      nationality: "Española",
      location: "Alicante",
      category: "Masajes relajantes",
      description: "Imagina mis manos suaves lentamente tu espalda... Cada movimiento preciso, cada para llevarte entre el y la relajación. La luz tenue, el aroma a aceites esenciales, el calor de mi piel contra la tuya... Soy más que una masajista. Soy una experiencia. Delicada envolvente....",
      imageUrl: "https://placehold.co/400x600/pink/white?text=Isa",
      isTop: true,
      isAutoSubida: false,
      isVerified: true,
      photosCount: 8,
    },
    {
      id: 3,
      name: "MASAJES TÁNTRICOS",
      age: 25,
      nationality: "Colombiana",
      location: "Alicante",
      category: "Masajes relajantes",
      description: "Hola amores, soy una chica dulce, cariñosa y muy complaciente. Realizo masajes relajantes, descontracturantes y sensitivos. Final feliz. Lugar discreto y acogedor. Ducha disponible. No te arrepentirás.",
      imageUrl: "https://placehold.co/400x600/purple/white?text=Tantric",
      isTop: false,
      isAutoSubida: true,
      isVerified: false,
      photosCount: 3,
    },
    {
      id: 4,
      name: "SENSUALIDAD Y RELAX",
      age: 22,
      nationality: "Brasileña",
      location: "Alicante",
      category: "Escorts",
      description: "Ven a disfrutar de un momento único. Soy una chica joven, educada y con muchas ganas de hacerte pasar un rato inolvidable. Mis masajes son la combinación perfecta entre relajación y placer. Te espero en mi apartamento privado.",
      imageUrl: "https://placehold.co/400x600/red/white?text=Ana",
      isTop: false,
      isAutoSubida: false,
      isVerified: true,
      photosCount: 12,
      videosCount: 2,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      
      <main className="flex-grow bg-gray-50 pb-12">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Breadcrumb / Title Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 border-b border-gray-200 pb-4 gap-4">
            <div>
               <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Masajes relajantes en Alicante</h1>
               <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                 <span className="font-semibold text-gray-700">580 perfiles</span>
                 <span className="text-gray-300">|</span>
                 <button className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 font-medium transition-colors">
                   <LayoutGrid size={16} /> Ver galería de fotos
                 </button>
               </div>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm">
                <ArrowUpDown size={16} /> Ordenar
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm md:hidden">
                <Filter size={16} /> Filtrar
              </button>
            </div>
          </div>

          {/* Premium Section */}
          <div className="mb-10">
            <PremiumGrid />
          </div>

          {/* Listings Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-700 mb-4 px-1 border-l-4 border-pink-500 pl-3">
              Anuncios destacados
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing.id} profile={listing} />
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="mt-10 text-center">
              <button className="bg-white border border-gray-300 text-gray-600 font-bold py-3 px-8 rounded-full hover:bg-gray-50 hover:text-pink-600 hover:border-pink-300 transition-all shadow-sm">
                Cargar más anuncios
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
