import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/studioData';
import { Star, Camera, Heart, Sparkles, ArrowUpRight } from 'lucide-react';

interface GalleryViewProps {
  onNavigate: (tab: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const galleryItems = [
    {
      id: 1,
      title: 'Annual Recital Showcase',
      category: 'Recital',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      caption: 'Main stage performance at Durgapur Srijani Auditorium.',
    },
    {
      id: 2,
      title: 'Open Style Urban Workshop',
      category: 'Choreo',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=800&q=80',
      caption: 'Guest masterclass exploring musical textures and popping.',
    },
    {
      id: 3,
      title: 'Morning 9:00 AM SOULSYNC Tribe',
      category: 'SOULSYNC',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      caption: 'Move your body. Reset your mind. Dance, fitness, pilates, and meditation in Bidhannagar.',
    },
    {
      id: 4,
      title: 'Kids Rhythm & Stage Play',
      category: 'Kids',
      image: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=800&q=80',
      caption: 'Our junior dancers performing their seasonal hip-hop piece.',
    },
    {
      id: 5,
      title: 'Ladies Grace & Contemporary',
      category: 'Choreo',
      image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&w=800&q=80',
      caption: 'Graceful lines and fluid transitions in the daytime ladies batch.',
    },
    {
      id: 6,
      title: 'First Steps into Movement',
      category: 'Kids',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
      caption: 'Ages 4–7 discovering rhythm, balance, and joy through games.',
    },
  ];

  const filters = ['All', 'Choreo', 'SOULSYNC', 'Kids', 'Recital'];

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === 'All' || item.category === activeFilter
  );

  return (
    <div className="bg-[#141416] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-[#ff5a1f] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse" />
            <span>Moments & Memories</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight"
            style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
          >
            LIFE ON THE SOUL FLOOR
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            Glimpses from daily rehearsals, seasonal student showcases, and our vibrant movement community in Bidhannagar, Durgapur.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-[#ff5a1f] text-neutral-950 shadow-md'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {f === 'All' ? 'All Photos' : f}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-white/30 shadow-xl aspect-[4/3]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1">
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-orange-400">
                  {item.category}
                </span>
                <h4 className="text-lg font-bold font-serif">{item.title}</h4>
                <p className="text-xs text-neutral-300 font-light line-clamp-2">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Review Wall */}
        <div className="pt-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[#ff5a1f] font-mono text-xs uppercase tracking-wider">
              Reviews & Stories
            </span>
            <h2
              className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
            >
              VOICES FROM THE FLOOR
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 sm:p-8 rounded-3xl bg-[#1c1c20] border border-white/10 hover:border-white/20 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#ff5a1f]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#ff5a1f] text-[#ff5a1f]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400">
                      Verified Member • {t.classTaken}
                    </span>
                  </div>

                  <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed italic font-light">
                    “{t.quote}”
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${t.avatarBg} font-black text-xs flex items-center justify-center text-neutral-950`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <p className="text-[11px] text-neutral-400 font-mono">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
