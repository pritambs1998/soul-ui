import React, { useState, useEffect } from 'react';
import { PROGRAMS, INSTRUCTORS, STUDIO_INFO } from '../data/studioData';
import { ClassProgram } from '../types';
import {
  Flame,
  Heart,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Zap,
  Activity,
  Compass,
  Smile,
  ShieldCheck,
  Calendar,
  Play,
  RotateCcw,
  Sliders,
  User,
  CreditCard,
  Building2,
} from 'lucide-react';

interface SoulSyncViewProps {
  onNavigate: (tab: string, extra?: any) => void;
  onSelectProgram: (program: ClassProgram) => void;
}

export const SoulSyncView: React.FC<SoulSyncViewProps> = ({
  onNavigate,
  onSelectProgram,
}) => {
  // Blur & Scale Entrance Transition State
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeMode, setActiveMode] = useState<'cardio' | 'pilates' | 'fitness' | 'meditation'>('cardio');
  const [selectedBatchIndex, setSelectedBatchIndex] = useState<number>(4); // Default to 6:30 PM Sunset Burn
  const [liveCalories, setLiveCalories] = useState<number>(550);
  const [liveHeartRate, setLiveHeartRate] = useState<number>(138);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Trigger smooth blur-out-to-sharp entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 60);

    return () => clearTimeout(timer);
  }, []);

  // Live fitness animation stats counter
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setLiveCalories((prev) => (prev >= 680 ? 520 : prev + 3));
      setLiveHeartRate((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const target = activeMode === 'cardio' ? 142 : activeMode === 'pilates' ? 115 : activeMode === 'fitness' ? 135 : 78;
        const next = prev + delta;
        return Math.max(target - 10, Math.min(target + 10, next));
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isSimulating, activeMode]);

  // Mode-based dynamics
  const modeData = {
    cardio: {
      title: 'High-Burn Dance Cardio',
      tagline: 'High calorie burn, Latin & Bollywood beats, endorphin release',
      calories: '550–650 kcal',
      heartRate: '138–155 bpm',
      pillColor1: 'from-purple-500/30 to-violet-600/30 border-purple-400/40 text-purple-200',
      pillColor2: 'from-amber-400/30 to-yellow-500/30 border-yellow-400/40 text-yellow-200',
      pillColor3: 'from-emerald-400/30 to-teal-500/30 border-emerald-400/40 text-emerald-200',
      pillColor4: 'from-sky-400/30 to-cyan-500/30 border-sky-400/40 text-sky-200',
    },
    pilates: {
      title: 'Sculpting Mat Pilates',
      tagline: 'Clinical core toning, posture realignment & pelvic alignment',
      calories: '320–420 kcal',
      heartRate: '110–125 bpm',
      pillColor1: 'from-pink-500/30 to-rose-600/30 border-pink-400/40 text-pink-200',
      pillColor2: 'from-amber-400/30 to-orange-500/30 border-orange-400/40 text-orange-200',
      pillColor3: 'from-emerald-400/30 to-green-500/30 border-green-400/40 text-green-200',
      pillColor4: 'from-sky-400/30 to-blue-500/30 border-blue-400/40 text-blue-200',
    },
    fitness: {
      title: 'Functional Full-Body Conditioning',
      tagline: 'Full-body stamina, athletic agility & joint mobility drills',
      calories: '480–580 kcal',
      heartRate: '130–145 bpm',
      pillColor1: 'from-indigo-500/30 to-purple-600/30 border-indigo-400/40 text-indigo-200',
      pillColor2: 'from-yellow-400/30 to-amber-500/30 border-amber-400/40 text-amber-200',
      pillColor3: 'from-teal-400/30 to-emerald-500/30 border-teal-400/40 text-teal-200',
      pillColor4: 'from-cyan-400/30 to-sky-500/30 border-cyan-400/40 text-cyan-200',
    },
    meditation: {
      title: 'Sound Immersion & Breath Reset',
      tagline: 'Singing bowl acoustics, vagal nerve downshift & deep calm',
      calories: '150–220 kcal',
      heartRate: '68–78 bpm (Rest)',
      pillColor1: 'from-violet-500/30 to-indigo-600/30 border-violet-400/40 text-violet-200',
      pillColor2: 'from-lime-400/30 to-green-500/30 border-lime-400/40 text-lime-200',
      pillColor3: 'from-teal-400/30 to-cyan-500/30 border-teal-400/40 text-teal-200',
      pillColor4: 'from-blue-400/30 to-sky-500/30 border-blue-400/40 text-blue-200',
    },
  };

  const soulSyncBatches = [
    {
      time: '7:00 AM – 8:15 AM',
      name: 'Morning Awakening (Pilates & Zen)',
      mode: 'pilates',
      desc: 'Gentle spinal decompression, core activation & breath centering.',
      badge: 'Sunrise Flow',
    },
    {
      time: '9:00 AM – 10:15 AM',
      name: 'Studio & Online Sync (Dance & Fitness)',
      mode: 'cardio',
      desc: 'High-tempo cardio grooves streamed live & in Bidhannagar studio.',
      badge: 'Hybrid Live',
    },
    {
      time: '10:30 AM – 11:30 AM',
      name: 'Morning Flow & Core Reset',
      mode: 'pilates',
      desc: 'Mat pilates alignment, pelvic floor conditioning & back relief.',
      badge: 'Core Sculpt',
    },
    {
      time: '4:30 PM – 5:30 PM',
      name: 'Afternoon Mind-Body Energy',
      mode: 'fitness',
      desc: 'Recharge midday fatigue with dynamic joint mobility & cardio.',
      badge: 'Energy Boost',
    },
    {
      time: '6:30 PM – 7:30 PM',
      name: 'Sunset Sync Burn (Most Popular)',
      mode: 'cardio',
      desc: 'Signature full-body calorie torch with high-vibe music playlist.',
      badge: 'Most Popular',
    },
    {
      time: '7:30 PM – 8:30 PM',
      name: 'Night Reset & Guided Sound Meditation',
      mode: 'meditation',
      desc: 'Tibetan singing bowls, restorative stretch & somatic downshift.',
      badge: 'Deep Zen',
    },
  ];

  return (
    <div className="bg-[#0b0c10] text-white min-h-screen selection:bg-[#ddf300] selection:text-black overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO CONTAINER WITH BLURRED MULTI-COLOR GRADIENT STRIPES
             Directly inspired by KKI.png
      ────────────────────────────────────────────────────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-12 pt-6 sm:pt-8 pb-16 max-w-[1440px] mx-auto">
        {/* Navigation Breadcrumb / Quick Segment Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-400">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#ddf300] font-bold">SOULSYNC (Mind • Body • Movement)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('dance')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#ff5a1f]/20 hover:text-[#ff5a1f] border border-white/10 text-neutral-300 transition-all cursor-pointer text-[11px]"
            >
              Switch to Dance Batches →
            </button>
            <button
              onClick={() => onNavigate('corporate')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 text-neutral-300 transition-all cursor-pointer text-[11px]"
            >
              Soul Retreat Corporate →
            </button>
          </div>
        </div>

        {/* 
            MAIN EDITORIAL POSTER WITH BLURRED MULTI-COLOR GRADIENT SLATS
            Applies smooth transition from blurred scale-105 to crisp scale-100 on load
        */}
        <div
          className={`relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl transition-all duration-1000 ease-out ${
            isLoaded
              ? 'scale-100 opacity-100 blur-0'
              : 'scale-105 opacity-60 blur-md'
          }`}
          style={{
            minHeight: '620px',
            background: 'linear-gradient(135deg, #0e0f14 0%, #15161e 100%)',
          }}
        >
          {/* 
              VERTICAL MULTI-COLOR GRADIENT SLATS / STRIPES (Exact backdrop of KKI.png)
              Pastel lime, yellow, peach, soft pink, lavender, and rich purple ribbons
          */}
          <div className="absolute inset-0 flex items-stretch pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
            <div className="w-[12%] h-full bg-gradient-to-b from-lime-300/40 via-yellow-200/20 to-transparent blur-xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="w-[14%] h-full bg-gradient-to-b from-yellow-300/40 via-amber-200/20 to-transparent blur-xl animate-pulse" style={{ animationDuration: '5s' }} />
            <div className="w-[15%] h-full bg-gradient-to-b from-orange-300/40 via-rose-300/20 to-transparent blur-xl animate-pulse" style={{ animationDuration: '4.5s' }} />
            <div className="w-[15%] h-full bg-gradient-to-b from-pink-400/40 via-fuchsia-300/20 to-transparent blur-xl animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="w-[16%] h-full bg-gradient-to-b from-purple-400/50 via-violet-400/25 to-transparent blur-xl animate-pulse" style={{ animationDuration: '5.2s' }} />
            <div className="w-[14%] h-full bg-gradient-to-b from-indigo-400/50 via-purple-500/30 to-transparent blur-xl animate-pulse" style={{ animationDuration: '4.8s' }} />
            <div className="w-[14%] h-full bg-gradient-to-b from-violet-500/60 via-purple-600/30 to-transparent blur-xl animate-pulse" style={{ animationDuration: '5.5s' }} />
          </div>

          {/* Radial soft lighting vignette */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80 pointer-events-none" />

          {/* 
              ATHLETIC FITNESS MODEL IN MID-STRIDE MOTION (Right side, from KKI.png)
          */}
          <div className="absolute top-0 right-0 bottom-0 w-full md:w-3/5 pointer-events-none flex items-center justify-end z-10 overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-end">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85"
                alt="SOULSYNC Movement in Motion"
                className="w-full h-full object-cover object-right md:object-center filter contrast-125 brightness-105 opacity-90 transition-transform duration-1000 hover:scale-105"
              />
              {/* Soft gradient edge fade into the left editorial side */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent" />
            </div>
          </div>

          {/* 
              LEFT EDITORIAL COLUMN: TYPOGRAPHY & STAT PILL BARS (From KKI.png)
          */}
          <div className="relative z-20 p-8 sm:p-14 lg:p-16 max-w-2xl space-y-8 flex flex-col justify-between h-full">
            {/* Top Brand Tag */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono font-bold text-[#ddf300] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SOULSYNC • Dance • Fitness • Pilates • Meditation</span>
              </div>

              {/* Headline matching "Move Better Live Better" typography */}
              <h1
                className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-[1.05]"
                style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
              >
                Move Better <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ddf300] via-white to-purple-300">
                  Live Better
                </span>
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed max-w-lg">
                Move your body. Reset your mind. Join hundreds of Durgapur members achieving their stamina, core strength, and emotional calm through our daily holistic sessions.
              </p>

              {/* Action Buttons: Sleek Dark Pill from KKI.png */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('book-trial', { program: 'SOULSYNC' })}
                  className="px-7 py-4 rounded-full bg-black hover:bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-white/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <span>Join Now / Book Free Pass</span>
                  <ArrowRight className="w-4 h-4 text-[#ddf300]" />
                </button>

                <button
                  onClick={() => onNavigate('pay', { programId: 'soulsync', cycle: 'Monthly' })}
                  className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider backdrop-blur-md border border-white/15 transition-all cursor-pointer"
                >
                  Monthly Pass (₹1,600/mo)
                </button>
              </div>
            </div>

            {/* 
                THE 4 STAGGERED HORIZONTAL STAT TRACK PILLS (Direct from KKI.png)
                Positioned horizontally staggered, extending towards the runner
            */}
            <div className="space-y-3 pt-4 w-full">
              {/* Pill 1: Calories (Lavender) */}
              <div className="w-full max-w-md transform translate-x-4 sm:translate-x-8 transition-transform hover:translate-x-10 duration-300">
                <div className="p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-purple-500/30 via-violet-600/30 to-purple-800/40 backdrop-blur-md border border-purple-400/40 shadow-lg flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-white">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-full bg-purple-500/40 text-purple-200">
                      <Flame className="w-4 h-4 text-purple-300" />
                    </span>
                    <span>Calories</span>
                  </div>
                  <span className="text-[#ddf300] font-black text-sm sm:text-base">
                    {liveCalories} <span className="text-[10px] text-neutral-300">/ 650 kcal</span>
                  </span>
                </div>
              </div>

              {/* Pill 2: Pilates & Core (Yellow / Barbell from KKI.png) */}
              <div className="w-full max-w-sm transform translate-x-2 sm:translate-x-4 transition-transform hover:translate-x-6 duration-300">
                <div className="p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-amber-400/30 via-yellow-500/30 to-orange-600/30 backdrop-blur-md border border-yellow-400/40 shadow-lg flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-white">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-full bg-yellow-400/40 text-yellow-100">
                      <Compass className="w-4 h-4 text-yellow-200" />
                    </span>
                    <span>Pilates Alignment</span>
                  </div>
                  <span className="text-yellow-200 text-xs">Core & Spine Fix</span>
                </div>
              </div>

              {/* Pill 3: Steps / Heart Rate (Mint Green from KKI.png) */}
              <div className="w-full max-w-md transform translate-x-6 sm:translate-x-12 transition-transform hover:translate-x-14 duration-300">
                <div className="p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-emerald-400/30 via-teal-500/30 to-emerald-700/40 backdrop-blur-md border border-emerald-400/40 shadow-lg flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-white">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-full bg-emerald-400/40 text-emerald-100">
                      <Activity className="w-4 h-4 text-emerald-200 animate-pulse" />
                    </span>
                    <span>Heart Rate Zone</span>
                  </div>
                  <span className="text-emerald-300 font-black text-xs sm:text-sm flex items-center gap-1">
                    <span>{liveHeartRate} BPM</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 font-sans">
                      Optimal
                    </span>
                  </span>
                </div>
              </div>

              {/* Pill 4: Time / Meditation Reset (Sky Blue from KKI.png) */}
              <div className="w-full max-w-xs transform translate-x-0 transition-transform hover:translate-x-3 duration-300">
                <div className="p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-sky-400/30 via-cyan-500/30 to-blue-600/30 backdrop-blur-md border border-sky-400/40 shadow-lg flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-white">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2 rounded-full bg-sky-400/40 text-sky-100">
                      <Smile className="w-4 h-4 text-sky-200" />
                    </span>
                    <span>Guided Zen</span>
                  </div>
                  <span className="text-sky-200 text-xs">20 Min Reset</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. INTERACTIVE WORKOUT MODE CONTROLLER
        ────────────────────────────────────────────────────────────── */}
        <div className="mt-8 rounded-3xl bg-[#14151a] border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-[#ddf300] font-bold">
                Interactive Mind-Body Disciplines
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                Explore the 4 Pillars of SOULSYNC
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Biometric Simulator Active</span>
            </div>
          </div>

          {/* 4 Mode Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'cardio', label: '1. Dance Cardio', icon: Flame, color: 'text-purple-400' },
              { id: 'pilates', label: '2. Mat Pilates', icon: Compass, color: 'text-amber-400' },
              { id: 'fitness', label: '3. Functional Fitness', icon: Zap, color: 'text-emerald-400' },
              { id: 'meditation', label: '4. Sound & Zen', icon: Smile, color: 'text-sky-400' },
            ].map((m) => {
              const Icon = m.icon;
              const isSelected = activeMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMode(m.id as any)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-white/15 border-white/40 shadow-xl scale-[1.02]'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`w-5 h-5 ${m.color}`} />
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#ddf300] animate-ping" />
                    )}
                  </div>
                  <span className="font-bold text-sm text-white">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Mode Highlight Banner */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-base font-bold text-white font-serif">
                {modeData[activeMode].title}
              </div>
              <p className="text-xs text-neutral-300 font-light">
                {modeData[activeMode].tagline}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono shrink-0">
              <div className="text-right">
                <span className="text-[10px] text-neutral-400 uppercase block">Calorie Output</span>
                <span className="text-white font-bold">{modeData[activeMode].calories}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-400 uppercase block">Target Heart Rate</span>
                <span className="text-[#ddf300] font-bold">{modeData[activeMode].heartRate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. 6 DAILY BATCHES: INTERACTIVE SCHEDULE EXPLORER
        ────────────────────────────────────────────────────────────── */}
        <div className="mt-16 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#ddf300] uppercase tracking-wider font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>6 Daily Batches • Morning to Night</span>
              </div>
              <h2
                className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight"
                style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
              >
                CHOOSE YOUR DAILY TIMING
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-light">
                Join our morning studio or online livestream, or drop into our high-energy evening batches in Bidhannagar, Durgapur.
              </p>
            </div>

            <button
              onClick={() => onNavigate('book-trial', { program: 'SOULSYNC' })}
              className="px-6 py-3 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg self-start sm:self-auto"
            >
              Book Free Trial Pass
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {soulSyncBatches.map((batch, idx) => {
              const isSelected = selectedBatchIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedBatchIndex(idx)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#1e1f26] border-[#ddf300] shadow-2xl scale-[1.02]'
                      : 'bg-[#14151a] border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono font-bold text-[#ddf300]">
                        {batch.badge}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400">
                        Batch {idx + 1} of 6
                      </span>
                    </div>

                    <div className="text-lg font-bold font-mono text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#ff5a1f]" />
                      <span>{batch.time}</span>
                    </div>

                    <h4 className="text-base font-serif font-bold text-white">
                      {batch.name}
                    </h4>

                    <p className="text-xs text-neutral-300 font-light leading-relaxed">
                      {batch.desc}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('book-trial', { program: `SOULSYNC (${batch.name})` });
                    }}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#ddf300] text-neutral-950 font-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <span>Reserve Free Pass</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. LEAD COACH SHOWCASE & STUDIO VALUES
        ────────────────────────────────────────────────────────────── */}
        <div className="mt-16 rounded-3xl bg-[#14151a] border border-white/10 p-8 sm:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#ddf300] font-bold">
                Guided by Expert Movement Coaches
              </span>
              <h3
                className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight"
                style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
              >
                HOLISTIC WELLNESS FACULTY
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                Led by Ananya Mukherjee (Lead SOULSYNC & Fitness Coach) and Riya Sengupta (Yoga & Meditation Practitioner), each session ensures correct spinal ergonomics, positive community encouragement, and zero judgment.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sprung Wooden Floors
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Central Air Purified Studio
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Live Stream Option
                </span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 shrink-0 space-y-4 max-w-sm">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400">Membership Structure</span>
                <div className="text-3xl font-black font-mono text-[#ddf300] mt-1">
                  ₹1,600 <span className="text-xs font-normal text-neutral-400">/ month</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Access to all 6 daily batches + online live stream.
                </p>
              </div>

              <button
                onClick={() => onNavigate('pay', { programId: 'soulsync', cycle: 'Monthly' })}
                className="w-full py-3 rounded-xl bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
              >
                <CreditCard className="w-4 h-4" />
                <span>Join Monthly Membership</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
