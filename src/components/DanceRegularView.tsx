import React, { useState, useEffect } from 'react';
import { PROGRAMS, INSTRUCTORS, STUDIO_INFO } from '../data/studioData';
import { ClassProgram } from '../types';
import {
  Sparkles,
  ArrowRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Clock,
  CheckCircle2,
  Users,
  Flame,
  Volume2,
  VolumeX,
  CreditCard,
  ChevronRight,
  Calendar,
  Zap,
  ArrowUpRight,
  Music,
} from 'lucide-react';

interface DanceRegularViewProps {
  onNavigate: (tab: string, extra?: any) => void;
  onSelectProgram: (program: ClassProgram) => void;
}

export const DanceRegularView: React.FC<DanceRegularViewProps> = ({
  onNavigate,
  onSelectProgram,
}) => {
  // Page Zoom-Out Animation Trigger
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const [isPosterExpanded, setIsPosterExpanded] = useState(false);
  const [activeLevel, setActiveLevel] = useState<string>('All');
  const [activeBpm, setActiveBpm] = useState<number>(105);
  const [isPlayingBeat, setIsPlayingBeat] = useState(false);
  const [beatCount, setBeatCount] = useState<number>(1);

  // Trigger the dramatic smooth zoom-out on initial load
  useEffect(() => {
    // Start zoomed in, then zoom out to standard scale
    const timer = setTimeout(() => {
      setIsZoomedOut(true);
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  // Metronome / Repeat the beat pulse effect
  useEffect(() => {
    if (!isPlayingBeat) return;
    const intervalMs = Math.round(60000 / activeBpm);
    const timer = setInterval(() => {
      setBeatCount((prev) => (prev >= 8 ? 1 : prev + 1));
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlayingBeat, activeBpm]);

  // Filter only regular dance academy programs (excluding fitness/wellness)
  const dancePrograms = PROGRAMS.filter(
    (p) => p.id !== 'soulsync' && p.id !== 'yoga-mindfulness'
  );

  const filteredDancePrograms = dancePrograms.filter((p) => {
    if (activeLevel === 'All') return true;
    return p.level === activeLevel;
  });

  return (
    <div className="bg-[#0b0c0e] text-white min-h-screen selection:bg-[#ff5a1f] selection:text-black overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. CINEMATIC EDITORIAL HERO: "MOVE" POSTER WITH ZOOM-OUT ANIMATION
      ────────────────────────────────────────────────────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-12 pt-6 sm:pt-10 pb-12 sm:pb-16 max-w-[1440px] mx-auto">
        {/* Top Breadcrumb & Segment Quick Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs font-mono">
          <div className="flex items-center gap-2 text-neutral-400">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#ff5a1f] font-bold">Dance Academy (Regular Batches)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('soulsync')}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#ddf300]/20 hover:text-[#ddf300] border border-white/10 text-neutral-300 transition-all cursor-pointer text-[11px]"
            >
              Switch to SOULSYNC →
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
            THE EDITORIAL POSTER CONTAINER
            Applies smooth transform zoom-out transition: scale-110 -> scale-100 on load
        */}
        <div
          className={`relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl transition-all duration-1000 ease-out ${
            isZoomedOut
              ? 'scale-100 opacity-100'
              : 'scale-110 opacity-70 blur-xs'
          } ${
            isPosterExpanded
              ? 'fixed inset-4 z-50 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.9)] max-w-none'
              : 'aspect-[16/9] min-h-[520px] sm:min-h-[640px]'
          }`}
          style={{
            background: 'linear-gradient(180deg, #0265c2 0%, #1783e4 45%, #e1effc 100%)',
          }}
        >
          {/* Subtle noise and light leak textures */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

          {/* 
              GIANT TYPOGRAPHIC BACKDROP: "M O V E"
              Matches exact typography of uploaded K.png poster in creamy off-white (#f7ecd4)
          */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between select-none pointer-events-none px-2 sm:px-6 z-0">
            <span
              className="text-[#f7ecd4] font-black tracking-tighter leading-none text-[22vw] sm:text-[23vw] drop-shadow-sm uppercase opacity-95"
              style={{
                fontFamily: "'Syne', 'Impact', 'Arial Black', sans-serif",
                letterSpacing: '-0.04em',
              }}
            >
              MOVE
            </span>
          </div>

          {/* 
              DYNAMIC MID-AIR STREET DANCER VISUAL
              Positioned leaping across the letters with outdoor court floor & blue duffle bag
          */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            {/* Outdoor court concrete ground line */}
            <div className="absolute bottom-0 inset-x-0 h-2/5 bg-gradient-to-t from-[#c4ced9] via-[#d4dde7]/90 to-transparent" />
            
            {/* Athletic street dancer freeze image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1400&q=85"
                alt="Dance Movement"
                className="w-full h-full object-cover object-center filter contrast-110 brightness-105 mix-blend-multiply opacity-85 transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Translucent Electric Blue Bag on concrete floor (matching K.png) */}
            <div className="absolute bottom-6 sm:bottom-12 left-6 sm:left-24 z-20 pointer-events-auto group">
              <div className="relative w-28 sm:w-44 h-20 sm:h-28 rounded-3xl bg-blue-600/70 backdrop-blur-md border-2 border-cyan-300/60 shadow-[0_15px_35px_rgba(0,102,255,0.4)] flex items-center justify-center p-3 transform -rotate-6 transition-transform group-hover:rotate-0">
                <div className="text-center">
                  <span className="text-[10px] sm:text-xs font-mono font-black text-white uppercase tracking-wider block">
                    SDS GEAR
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-mono text-cyan-200">
                    Bidhannagar Hub
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 
              TOP-LEFT EDITORIAL COPY (Directly from K.png)
          */}
          <div className="absolute top-6 sm:top-10 left-6 sm:left-10 z-20 max-w-xs sm:max-w-sm space-y-3 pointer-events-auto">
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-mono font-bold tracking-tight text-[#f7ecd4] uppercase leading-tight drop-shadow-md">
                practice hour /
              </p>
              <p className="text-xs sm:text-sm font-mono font-bold tracking-tight text-[#f7ecd4] uppercase leading-tight drop-shadow-md">
                motion record /
              </p>
              <p className="text-xs sm:text-sm font-mono font-bold tracking-tight text-[#f7ecd4] uppercase leading-tight drop-shadow-md">
                repeat the beat
              </p>
            </div>

            <div className="w-12 h-0.5 bg-[#f7ecd4]/60" />

            <p className="text-[11px] sm:text-xs text-[#f7ecd4]/90 font-sans font-light leading-relaxed drop-shadow-md">
              This session is built for people who move with purpose. Track your rhythm, refine your flow, and build a record you can be proud of. Show up. Stay consistent. Make it count.
            </p>

            <div className="pt-1 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-mono text-[#f7ecd4] border border-white/20 uppercase font-bold">
                Founder Pritam Biswas
              </span>
              <span className="px-2 py-1 rounded-md bg-[#ff5a1f] text-neutral-950 text-[10px] font-mono uppercase font-black">
                Open Batches 2026
              </span>
            </div>
          </div>

          {/* 
              BOTTOM-LEFT EDITORIAL TITLE: "KEEP MOVING" (From K.png)
          */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 z-20 pointer-events-auto">
            <div
              className="text-[#f7ecd4] font-black uppercase tracking-tighter leading-none text-3xl sm:text-6xl drop-shadow-lg"
              style={{ fontFamily: "'Syne', 'Impact', sans-serif" }}
            >
              KEEP <br />
              MOVING
            </div>
          </div>

          {/* 
              BOTTOM-CENTER MICRO-ANNOTATION: Chinese Characters from K.png
          */}
          <div className="absolute bottom-6 sm:bottom-8 inset-x-0 flex justify-center z-20 pointer-events-none">
            <span className="text-xs sm:text-sm font-mono text-[#f7ecd4]/90 tracking-[0.3em] font-medium drop-shadow">
              练习 · 记录 · 重复节奏
            </span>
          </div>

          {/* 
              BOTTOM-RIGHT: "NO. 03 PRACTICE SERIES" + EXPAND/ZOOM TOGGLE (From K.png)
          */}
          <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 z-20 flex flex-col items-end gap-3 pointer-events-auto">
            <div className="text-right">
              <div
                className="text-4xl sm:text-7xl font-black text-[#f7ecd4] font-mono tracking-tighter leading-none drop-shadow-lg"
                style={{ fontFamily: "'Syne', 'Impact', sans-serif" }}
              >
                NO. 03
              </div>
              <div
                className="text-sm sm:text-xl font-black text-[#f7ecd4] uppercase tracking-wider font-mono leading-tight drop-shadow-md"
              >
                PRACTICE SERIES
              </div>
              <div className="text-[10px] sm:text-xs text-[#f7ecd4]/80 font-mono">
                Bidhannagar Studio, Durgapur
              </div>
            </div>

            {/* Interactive Zoom / Expand Controls (matching icon on bottom right of K.png) */}
            <div className="flex items-center gap-2">
              <button
                id="interactive-zoom-toggle-btn"
                onClick={() => setIsPosterExpanded(!isPosterExpanded)}
                className="p-3 rounded-2xl bg-black/70 hover:bg-black/90 text-[#f7ecd4] border border-white/20 backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-110 flex items-center gap-2 text-xs font-mono"
                title={isPosterExpanded ? 'Zoom Out / Normal View' : 'Zoom In / Fullscreen Poster'}
              >
                {isPosterExpanded ? (
                  <>
                    <Minimize2 className="w-4 h-4" />
                    <span>Zoom Out</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4" />
                    <span>Zoom In View</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. INTERACTIVE RHYTHM CONTROLLER: "REPEAT THE BEAT" METRONOME
        ────────────────────────────────────────────────────────────── */}
        <div className="mt-8 rounded-3xl bg-[#16171b] border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlayingBeat(!isPlayingBeat)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                isPlayingBeat
                  ? 'bg-[#ff5a1f] text-neutral-950 scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isPlayingBeat ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-[#ff5a1f] font-bold">
                  Repeat The Beat • 8-Count Metronome
                </span>
                {isPlayingBeat && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </div>
              <h3 className="text-lg font-serif font-bold text-white">
                Rhythm & Flow Practice Track
              </h3>
              <p className="text-xs text-neutral-400 font-light">
                Groove alongside our signature dance bpm counts
              </p>
            </div>
          </div>

          {/* 8-Count Visual Indicators */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((c) => (
              <div
                key={c}
                className={`w-8 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition-all ${
                  isPlayingBeat && beatCount === c
                    ? 'bg-[#ff5a1f] text-neutral-950 scale-110 shadow-lg shadow-orange-950/60'
                    : 'bg-white/5 text-neutral-400 border border-white/5'
                }`}
              >
                {c}
              </div>
            ))}
          </div>

          {/* BPM Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-neutral-400 uppercase">Tempo:</span>
            {[92, 105, 120].map((bpm) => (
              <button
                key={bpm}
                onClick={() => setActiveBpm(bpm)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeBpm === bpm
                    ? 'bg-white/20 text-[#ddf300] border border-[#ddf300]/40'
                    : 'bg-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                {bpm} BPM
              </button>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. REGULAR DANCE ACADEMY CURRICULUM & BATCHES
        ────────────────────────────────────────────────────────────── */}
        <div className="mt-16 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5a1f]/15 text-xs font-mono text-[#ff5a1f] uppercase tracking-wider font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>Foundations • Choreography • Freestyle</span>
              </div>
              <h2
                className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight"
                style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
              >
                WEEKLY DANCE BATCHES
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-light">
                Sprung wooden dance floors, high-end sound reinforcement, and encouraging instructors.
              </p>
            </div>

            {/* Level Filter */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveLevel(lvl)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeLevel === lvl
                      ? 'bg-[#ff5a1f] text-neutral-950 shadow-md font-black'
                      : 'bg-white/5 text-neutral-400 hover:text-white border border-white/5'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Dance Cards Grid with Hover Zoom Effect */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDancePrograms.map((prog) => (
              <div
                key={prog.id}
                className="bg-[#16171b] rounded-3xl border border-white/10 overflow-hidden hover:border-[#ff5a1f]/60 transition-all flex flex-col justify-between group shadow-xl hover:-translate-y-1 duration-300"
              >
                <div>
                  {/* Image with zoom-on-hover effect */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16171b] via-transparent to-black/30" />

                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider">
                        {prog.level}
                      </span>
                      {prog.badge && (
                        <span className="px-2.5 py-1 rounded-lg bg-[#ff5a1f] text-neutral-950 text-[10px] font-black uppercase tracking-wider">
                          {prog.badge}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/80 backdrop-blur-xs text-white text-xs font-mono font-bold border border-white/10">
                      ₹{prog.feeMonthly.toLocaleString('en-IN')} / mo
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff5a1f]">
                        {prog.category} • {prog.ageGroup}
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-white mt-1 group-hover:text-orange-200 transition-colors">
                        {prog.title}
                      </h3>
                    </div>

                    <p className="text-xs text-neutral-300 font-light leading-relaxed">
                      {prog.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-1">
                      {prog.benefits.map((b, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>

                    {/* Schedule Pill */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-neutral-200">
                        <span className="flex items-center gap-1.5 font-mono">
                          <Clock className="w-3.5 h-3.5 text-[#ff5a1f]" />
                          Weekly Schedule
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {prog.batchCapacity}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-neutral-300 font-light">
                        {prog.timings.map((t, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#ff5a1f] font-bold">•</span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer CTAs */}
                <div className="p-6 pt-0 flex gap-3">
                  <button
                    onClick={() => onNavigate('book-trial', { program: prog.title })}
                    className="flex-1 py-3 rounded-xl bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <span>Book Floor Trial</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      onSelectProgram(prog);
                      onNavigate('pay', { programId: prog.id, cycle: 'Monthly' });
                    }}
                    className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#ff5a1f]" />
                    <span>Enroll</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. FOUNDER & DANCE DIRECTORS
        ────────────────────────────────────────────────────────────── */}
        <div className="mt-16 rounded-3xl bg-[#16171b] border border-white/10 p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#ff5a1f] font-bold">
              Artistic Leadership
            </span>
            <h3
              className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
            >
              TRAIN UNDER PRITAM BISWAS
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Founder & Artistic Director Pritam Biswas leads our advanced open style choreography and battle workshops, breaking down musicality, micro-textures, and emotional storytelling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="text-2xl font-black font-mono text-[#ff5a1f]">11+ Years</div>
              <h4 className="text-base font-bold text-white">Choreography Pedagogy</h4>
              <p className="text-xs text-neutral-400 font-light">
                Trained under leading Indian & global street choreographers, crafting competitive dance crews in Durgapur.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="text-2xl font-black font-mono text-[#ddf300]">Sprung Floors</div>
              <h4 className="text-base font-bold text-white">Anatomy Safe Training</h4>
              <p className="text-xs text-neutral-400 font-light">
                Custom shock-absorbing sprung wooden subfloors protect dancer knees and ankles during high-impact jumps.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="text-2xl font-black font-mono text-cyan-400">Reels & Recitals</div>
              <h4 className="text-base font-bold text-white">Performance Experience</h4>
              <p className="text-xs text-neutral-400 font-light">
                Every batch gets high-definition video documentation and stage showcase opportunities in seasonal recitals.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
            <p className="text-xs font-mono text-neutral-400">
              Ready to take the floor? Free first trial class available for all new students.
            </p>

            <button
              onClick={() => onNavigate('book-trial', { program: 'Open Style Choreo' })}
              className="px-6 py-3.5 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
            >
              Book Your Free Dance Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
