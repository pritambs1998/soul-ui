import React from 'react';
import { STUDIO_VALUES, STUDIO_INFO } from '../data/studioData';
import { Heart, Sparkles, ShieldCheck, MapPin, ArrowUpRight, Check } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (tab: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#141416] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
        {/* Intro Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-[#ff5a1f] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse" />
            <span>Our Origin & Philosophy</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight"
            style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
          >
            MOVEMENT, MINDFULNESS & COMMUNITY
          </h1>
          <p className="text-neutral-300 text-base sm:text-lg font-light leading-relaxed">
            “Create healthier, happier human beings through movement, mindfulness, and community.”
          </p>
        </div>

        {/* The Story */}
        <div className="bg-[#1c1c20] rounded-3xl border border-white/10 p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-4 text-neutral-300 font-light leading-relaxed text-sm sm:text-base">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Why We Founded Soul Dance Studio in Durgapur
            </h2>
            <p>
              For many years, aspiring dancers and fitness lovers in Durgapur had to either travel to Kolkata or settle for crowded gym corners where movement was treated like a chore.
            </p>
            <p>
              In Bidhannagar, we envisioned something completely different: a warm, light-filled creative sanctuary where dancers of all backgrounds—whether a 4-year-old child taking their first rhythmic steps, a busy IT professional blowing off steam at 7:30 PM, or a college student dreaming of the stage—could feel genuinely seen and celebrated.
            </p>
            <p>
              At Soul Dance Studio, movement isn't about rigid perfection. It's about self-expression, mental clarity, physical stamina, and belonging to a positive community that lifts you up.
            </p>
          </div>

          {/* Studio Space Standards */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2 p-5 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-white text-sm flex items-center gap-2 font-serif">
                <span className="w-2 h-2 rounded-full bg-[#ff5a1f]" />
                Sprung Wooden Floors
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Absorbs landing impact to protect knees, ankles, and spinal joints during jumps and choreography.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-white text-sm flex items-center gap-2 font-serif">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Strict Cleanliness Policy
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Indoor-shoes-only rule, daily sanitized surfaces, and fresh air circulation throughout all batches.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-2xl bg-white/5 border border-white/5">
              <h3 className="font-bold text-white text-sm flex items-center gap-2 font-serif">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                Controlled Capacities
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Every student has ample floor space to move freely and receives direct, constructive instructor attention.
              </p>
            </div>
          </div>
        </div>

        {/* 7 Core Values */}
        <div className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[#ff5a1f] font-mono text-xs uppercase tracking-wider">
              Everyday Culture
            </span>
            <h2
              className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
            >
              OUR CORE VALUES
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-light">
              Not corporate jargon—these are the principles we live by on the dance floor every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {STUDIO_VALUES.map((val, idx) => (
              <div
                key={val.title}
                className="p-6 sm:p-7 rounded-3xl bg-[#1c1c20] border border-white/10 hover:border-white/20 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 font-serif">
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white/10 text-orange-400 border border-white/10">
                      0{idx + 1}
                    </span>
                    {val.title}
                  </h3>
                </div>
                <p className="text-xs font-mono text-[#ff5a1f] italic">
                  "{val.tagline}"
                </p>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl bg-[#1a1a1e] border border-white/10 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Experience the Floor Yourself
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              Come attend any batch as our guest. Try 45 minutes with zero commitment.
            </p>
          </div>

          <button
            onClick={() => onNavigate('book-trial')}
            className="px-6 py-3.5 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer shadow-md flex items-center gap-2"
          >
            <span>Book Your Free Trial</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
