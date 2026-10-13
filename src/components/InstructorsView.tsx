import React from 'react';
import { INSTRUCTORS } from '../data/studioData';
import { Instructor } from '../types';
import { Instagram, Award, Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';

interface InstructorsViewProps {
  onNavigate: (tab: string, extra?: any) => void;
}

export const InstructorsView: React.FC<InstructorsViewProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#141416] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-[#ff5a1f] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse" />
            <span>Faculty & Choreographers</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight"
            style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
          >
            MEET OUR INSTRUCTORS
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            Our educators don’t just demonstrate steps from the front of the room—they break down anatomical mechanics, foster creative confidence, and ensure every student progresses in a safe, encouraging space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INSTRUCTORS.map((inst: Instructor) => (
            <div
              key={inst.id}
              className="bg-[#1c1c20] rounded-3xl border border-white/10 overflow-hidden hover:border-white/30 transition-all flex flex-col sm:flex-row group"
            >
              {/* Instructor Photo */}
              <div className="sm:w-2/5 relative min-h-[280px] sm:min-h-full overflow-hidden">
                <img
                  src={inst.photo}
                  alt={inst.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              </div>

              {/* Instructor Bio & Details */}
              <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#ff5a1f] uppercase tracking-wider">
                      {inst.experience}
                    </span>
                    {inst.instagram && (
                      <span className="text-xs text-neutral-400 font-medium flex items-center gap-1">
                        <Instagram className="w-3.5 h-3.5 text-orange-400" />
                        {inst.instagram}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-white">
                    {inst.name}
                  </h3>
                  <p className="text-xs font-mono text-orange-300">
                    {inst.role}
                  </p>

                  <p className="text-xs text-neutral-300 font-light leading-relaxed pt-1">
                    {inst.bio}
                  </p>

                  {/* Specialties Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {inst.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-300 text-[11px] font-mono"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quote & CTA */}
                <div className="pt-3 border-t border-white/10 space-y-3">
                  <p className="text-xs text-neutral-400 italic">
                    “{inst.favoriteQuote}”
                  </p>

                  <button
                    onClick={() => onNavigate('book-trial', { instructor: inst.name })}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Book Trial with {inst.name.split(' ')[0]}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
