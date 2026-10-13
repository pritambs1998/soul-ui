import React, { useState } from 'react';
import { STUDIO_INFO } from '../data/studioData';
import {
  Sparkles,
  CheckCircle2,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Shirt,
  Footprints,
  Droplets,
  Heart,
  Smile,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

interface OrientationViewProps {
  onNavigate: (tab: string, extra?: any) => void;
}

export const OrientationView: React.FC<OrientationViewProps> = ({ onNavigate }) => {
  const [checklist, setChecklist] = useState({
    earlyArrival: true,
    indoorShoes: false,
    waterBottle: false,
    openMindset: true,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist({ ...checklist, [key]: !checklist[key] });
  };

  return (
    <div className="bg-[#141416] text-white selection:bg-[#ff5a1f] selection:text-black min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
        {/* ─────────────────────────────────────────────────────────────
            1. HERO / ORIENTATION BANNER (Matches Pinterest Hero)
        ────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/10 pb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono tracking-wider text-orange-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse" />
              <span>Soul Dance Studio • Student Welcome Guide</span>
            </div>

            <h1
              className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.88] text-white"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
            >
              STUDIO <br />
              ORIENTATION
            </h1>

            <p className="text-neutral-300 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              Step into an encouraging, zero-judgment movement space. Whether this is your very first dance class or your tenth year training, here is everything you need for a joyful, smooth first day.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate('book-trial')}
                className="px-6 py-3.5 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Book Your Free Trial</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('programs')}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer border border-white/10"
              >
                View Batch Schedule
              </button>
            </div>
          </div>

          {/* Right Hero Image Card with Circular Stamp */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80"
                alt="New Student Orientation at Soul Dance Studio"
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest">
                  Safe Sanctuary
                </span>
                <p className="text-sm text-neutral-200 font-light">
                  Sprung wooden floors, clean ventilation, and respectful, encouraging teachers.
                </p>
              </div>
            </div>

            {/* Circular Stamp */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 w-32 h-32 rounded-full bg-[#ff5a1f] text-neutral-950 flex flex-col items-center justify-center p-3 text-center font-extrabold shadow-2xl transform rotate-12">
              <span className="text-[10px] tracking-widest uppercase font-black leading-tight">
                ZERO EGO <br /> SANCTUARY
              </span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. WHAT TO WEAR & WHAT TO BRING (Asymmetrical Bento Cards)
        ────────────────────────────────────────────────────────────── */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h2
              className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
            >
              PREPARE FOR CLASS
            </h2>
            <span className="text-neutral-400 text-xs sm:text-sm font-light">
              Simple studio etiquette for maximum comfort and safety
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-3xl bg-[#1c1c20] border border-white/10 p-6 sm:p-8 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#ff5a1f]/20 text-[#ff5a1f] flex items-center justify-center">
                  <Shirt className="w-6 h-6 text-[#ff5a1f]" />
                </div>
                <h3 className="text-xl font-bold text-white font-serif">What to Wear</h3>
                <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
                  Wear flexible, breathable athletic wear. Sweatpants, tracksuits, oversized cotton tees, leggings, or gym gear that lets you stretch, squat, and jump freely.
                </p>
              </div>
              <span className="text-[11px] text-orange-400 font-mono block pt-2 border-t border-white/10">
                Tip: Avoid stiff jeans or restrictive tight belts
              </span>
            </div>

            {/* Card 2: Indoor Shoes Policy (Highlighted) */}
            <div className="rounded-3xl bg-[#222226] border border-[#ff5a1f]/70 p-6 sm:p-8 space-y-4 shadow-xl shadow-orange-950/30 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#ff5a1f] text-neutral-950 flex items-center justify-center">
                  <Footprints className="w-6 h-6 text-neutral-950" />
                </div>
                <h3 className="text-xl font-bold text-white font-serif">Indoor Shoes Only</h3>
                <p className="text-neutral-200 text-xs sm:text-sm font-light leading-relaxed">
                  To protect our imported sprung wooden dance floor, please carry a separate pair of clean-soled sneakers in your bag. Wipe down or change into them in our shoe cubbies before stepping onto the floor.
                </p>
              </div>
              <span className="text-[11px] text-[#ff5a1f] font-mono font-bold block pt-2 border-t border-white/10">
                Crucial for floor hygiene & grip
              </span>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl bg-[#1c1c20] border border-white/10 p-6 sm:p-8 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white font-serif">Hydration & Towel</h3>
                <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
                  Bring a reusable water bottle and a small sweat towel. We provide filtered RO drinking water refills and clean changing restrooms inside the studio.
                </p>
              </div>
              <span className="text-[11px] text-neutral-400 font-mono block pt-2 border-t border-white/10">
                Filtered cold & normal water available
              </span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. INTERACTIVE FIRST DAY CHECKLIST
        ────────────────────────────────────────────────────────────── */}
        <div className="rounded-3xl bg-[#1a1a1e] border border-white/10 p-6 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-[#ff5a1f] font-mono text-xs uppercase tracking-wider block">
                Interactive Pre-Class Prep
              </span>
              <h2
                className="text-2xl sm:text-4xl font-bold text-white uppercase tracking-tight mt-1"
                style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
              >
                First Day Checklist
              </h2>
            </div>

            <span className="text-xs text-neutral-400 font-light">
              Tap items to check off before heading out
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Item 1 */}
            <div
              onClick={() => toggleCheck('earlyArrival')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                checklist.earlyArrival
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                  : 'bg-[#222226] border-white/10 text-neutral-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                  checklist.earlyArrival
                    ? 'bg-emerald-500 border-emerald-400 text-black'
                    : 'border-white/30'
                }`}
              >
                {checklist.earlyArrival && <CheckCircle2 className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Arrive 10 Minutes Early</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Allows time to locate parking, swap into indoor sneakers, and warm up gently.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div
              onClick={() => toggleCheck('indoorShoes')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                checklist.indoorShoes
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                  : 'bg-[#222226] border-white/10 text-neutral-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                  checklist.indoorShoes
                    ? 'bg-emerald-500 border-emerald-400 text-black'
                    : 'border-white/30'
                }`}
              >
                {checklist.indoorShoes && <CheckCircle2 className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Clean Indoor Sneakers Packed</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Keep street dust outside so our wooden floors remain pristine for everyone.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div
              onClick={() => toggleCheck('waterBottle')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                checklist.waterBottle
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                  : 'bg-[#222226] border-white/10 text-neutral-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                  checklist.waterBottle
                    ? 'bg-emerald-500 border-emerald-400 text-black'
                    : 'border-white/30'
                }`}
              >
                {checklist.waterBottle && <CheckCircle2 className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Water Bottle & Hand Towel</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Stay hydrated between choreo sets and cardio bursts.
                </p>
              </div>
            </div>

            {/* Item 4 */}
            <div
              onClick={() => toggleCheck('openMindset')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                checklist.openMindset
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                  : 'bg-[#222226] border-white/10 text-neutral-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border ${
                  checklist.openMindset
                    ? 'bg-emerald-500 border-emerald-400 text-black'
                    : 'border-white/30'
                }`}
              >
                {checklist.openMindset && <CheckCircle2 className="w-4 h-4" />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Open Heart & Positive Mindset</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Nobody gets every step right on day one. Have fun and laugh through the mistakes!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. STUDIO LOCATION & CONTACT QUICK STRIP
        ────────────────────────────────────────────────────────────── */}
        <div className="rounded-3xl bg-[#1c1c20] border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-mono text-orange-400 uppercase">Have questions before coming?</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
              Our studio desk is here to help
            </h3>
            <p className="text-xs text-neutral-400">
              {STUDIO_INFO.location.address} • Mon–Sat 7:00 AM – 8:30 PM
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                "Hello Soul Dance Studio! I'm coming for orientation and have a quick question."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Studio</span>
            </a>

            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-colors border border-white/10 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#ff5a1f]" />
              <span>Get Directions</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
