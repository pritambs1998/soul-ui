import React, { useState } from 'react';
import { PROGRAMS, STUDIO_INFO } from '../data/studioData';
import { ClassProgram } from '../types';
import { CorporateWellnessSection } from './CorporateWellnessSection';
import {
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Calendar,
  Users,
  ShieldCheck,
  CreditCard,
  ArrowUpRight,
  Heart,
  Building2,
  Compass,
  Smile,
  Zap,
  Activity,
} from 'lucide-react';

interface ProgramsViewProps {
  initialSegment?: 'dance' | 'soulsync' | 'corporate';
  onNavigate: (tab: string, extra?: any) => void;
  onSelectProgram: (program: ClassProgram) => void;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({
  initialSegment = 'dance',
  onNavigate,
  onSelectProgram,
}) => {
  // Master Interactive Segment State: 'dance' | 'soulsync' | 'corporate'
  const [activeSegment, setActiveSegment] = useState<'dance' | 'soulsync' | 'corporate'>(initialSegment);

  // Dance Filter State
  const [selectedDanceCategory, setSelectedDanceCategory] = useState<string>('All');
  const [selectedDanceLevel, setSelectedDanceLevel] = useState<string>('All');

  // SOULSYNC Interactive Slot Picker
  const [activeSoulSyncSlot, setActiveSoulSyncSlot] = useState<number>(0);

  // Filter regular dance batches (excludes pure fitness if in dance mode)
  const dancePrograms = PROGRAMS.filter((prog) => prog.id !== 'soulsync' && prog.id !== 'yoga-mindfulness');

  const filteredDancePrograms = dancePrograms.filter((prog) => {
    const matchCategory =
      selectedDanceCategory === 'All' || prog.category === selectedDanceCategory;
    const matchLevel =
      selectedDanceLevel === 'All' || prog.level === selectedDanceLevel;
    return matchCategory && matchLevel;
  });

  const soulSyncProgram = PROGRAMS.find((p) => p.id === 'soulsync') || PROGRAMS[0];

  const soulSyncBatches = [
    {
      time: '7:00 AM – 8:15 AM',
      name: 'Morning Awakening (Pilates & Zen)',
      type: 'Studio In-Person',
      focus: 'Spinal mobility, core alignment & guided breath meditation',
      tag: 'Gentle & Centering',
    },
    {
      time: '9:00 AM – 10:15 AM',
      name: 'Studio & Online Sync (Dance & Fitness)',
      type: 'Hybrid (Studio & Live Zoom)',
      focus: 'High-burn dance cardio, Latin/Urban grooves & strength intervals',
      tag: 'High Energy',
    },
    {
      time: '10:30 AM – 11:30 AM',
      name: 'Morning Flow & Core Reset',
      type: 'Studio In-Person',
      focus: 'Deep pilates matwork, pelvic stability & postural strengthening',
      tag: 'Core Sculpt',
    },
    {
      time: '4:30 PM – 5:30 PM',
      name: 'Afternoon Mind-Body Energy',
      type: 'Studio In-Person',
      focus: 'Midday fatigue buster, joint mobility, cardio intervals',
      tag: 'Afternoon Boost',
    },
    {
      time: '6:30 PM – 7:30 PM',
      name: 'Sunset Sync Burn',
      type: 'Studio In-Person',
      focus: 'Full body sweat, mood elevating choreography, endorphin release',
      tag: 'Most Popular',
    },
    {
      time: '7:30 PM – 8:30 PM',
      name: 'Night Reset & Guided Meditation',
      type: 'Studio In-Person',
      focus: 'Nervous system downshift, acoustic sound healing & deep rest',
      tag: 'Deep Restoration',
    },
  ];

  return (
    <div className="bg-[#141416] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        {/* ─────────────────────────────────────────────────────────────
            1. TOP HEADER & INTERACTIVE SEGMENT SWITCHER
        ────────────────────────────────────────────────────────────── */}
        <div className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-[#ff5a1f] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse" />
              <span>Interactive Segment Explorer</span>
            </div>

            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
            >
              CHOOSE YOUR MOVEMENT PATH
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
              Explore our regular dance academy training batches, or step into our holistic fitness, pilates, and corporate wellness retreat ecosystem.
            </p>
          </div>

          {/* Master 3-Segment Interactive Tab Switcher */}
          <div className="p-1.5 rounded-2xl bg-[#1c1c20] border border-white/15 inline-flex flex-wrap gap-2 shadow-2xl">
            {/* Segment 1: Dance Batches */}
            <button
              id="segment-dance-btn"
              onClick={() => setActiveSegment('dance')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
                activeSegment === 'dance'
                  ? 'bg-[#ff5a1f] text-neutral-950 shadow-lg shadow-orange-950/60 scale-[1.02]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>1. DANCE ACADEMY (Regular Batches)</span>
            </button>

            {/* Segment 2A: SOULSYNC */}
            <button
              id="segment-soulsync-btn"
              onClick={() => setActiveSegment('soulsync')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
                activeSegment === 'soulsync'
                  ? 'bg-[#ddf300] text-neutral-950 shadow-lg shadow-lime-950/60 scale-[1.02]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>2. SOULSYNC (Fitness & Meditation)</span>
            </button>

            {/* Segment 2B: SOUL RETREAT (Corporate Wellness) */}
            <button
              id="segment-corporate-btn"
              onClick={() => setActiveSegment('corporate')}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
                activeSegment === 'corporate'
                  ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-neutral-950 shadow-lg shadow-sky-950/60 scale-[1.02]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4 fill-current" />
              <span>3. SOUL RETREAT (Corporate Wellness)</span>
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            SEGMENT 1: DANCE ACADEMY (Regular Batches)
        ────────────────────────────────────────────────────────────── */}
        {activeSegment === 'dance' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Editorial Poster Page Callout */}
            <div
              onClick={() => onNavigate('dance')}
              className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0265c2] via-[#1783e4] to-[#2563eb] border border-white/20 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl cursor-pointer hover:scale-[1.01] transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-xl text-[#f7ecd4]">
                  MOVE
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-200 font-bold block">
                    Cinematic Animated Experience
                  </span>
                  <h4 className="text-base sm:text-lg font-bold font-serif text-[#f7ecd4]">
                    Open Full Animated "MOVE" Dance Series Page
                  </h4>
                  <p className="text-xs text-white/80 font-light">
                    Dramatic zoom-out entrance, 8-count audio metronome, editorial streetwear visuals & Founder Pritam Biswas.
                  </p>
                </div>
              </div>

              <span className="shrink-0 px-4 py-2.5 rounded-xl bg-[#f7ecd4] text-neutral-950 font-black text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <span>Launch Animated View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* Filter Bar for Dance Batches */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex flex-wrap items-center gap-2">
                {['All', 'Dance', 'Kids', 'Specialty'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedDanceCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedDanceCategory === cat
                        ? 'bg-[#ff5a1f] text-neutral-950 shadow-md'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {cat === 'All' ? 'All Dance Styles' : cat}
                  </button>
                ))}
              </div>

              {/* Level Filter */}
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="font-mono uppercase tracking-wider">Experience Level:</span>
                <select
                  value={selectedDanceLevel}
                  onChange={(e) => setSelectedDanceLevel(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-white/15 bg-[#1c1c20] text-neutral-200 text-xs font-medium focus:ring-2 focus:ring-[#ff5a1f] outline-none cursor-pointer"
                >
                  {['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'].map((lvl) => (
                    <option key={lvl} value={lvl} className="bg-[#1c1c20] text-white">
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Programs Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDancePrograms.map((prog) => (
                <div
                  key={prog.id}
                  id={`program-card-${prog.id}`}
                  className="bg-[#1c1c20] rounded-3xl border border-white/10 overflow-hidden hover:border-white/30 transition-all flex flex-col justify-between group shadow-xl"
                >
                  <div>
                    {/* Image Banner */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c20] via-transparent to-black/30" />

                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider">
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

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff5a1f]">
                          {prog.category} • {prog.ageGroup}
                        </span>
                        <h3 className="text-2xl font-serif font-bold text-white mt-1">
                          {prog.title}
                        </h3>
                      </div>

                      <p className="text-xs text-neutral-300 font-light leading-relaxed">
                        {prog.description}
                      </p>

                      {/* Benefits */}
                      <div className="space-y-1.5 pt-1">
                        {prog.benefits.map((b, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300 font-light">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>

                      {/* Batch Timings */}
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-neutral-200">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#ff5a1f]" />
                            Batch Timings
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

                  {/* Actions */}
                  <div className="p-6 pt-0 flex gap-3">
                    <button
                      onClick={() => onNavigate('book-trial', { program: prog.title })}
                      className="flex-1 py-3 rounded-xl bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <span>Book Free Trial</span>
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
        )}

        {/* ─────────────────────────────────────────────────────────────
            SEGMENT 2: SOULSYNC (Fitness, Pilates & Meditation)
        ────────────────────────────────────────────────────────────── */}
        {activeSegment === 'soulsync' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Animated SOULSYNC Experience Banner */}
            <div
              onClick={() => onNavigate('soulsync')}
              className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-950 via-violet-900 to-indigo-950 border border-purple-400/40 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl cursor-pointer hover:scale-[1.01] transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-xl text-[#ddf300]">
                  <Activity className="w-6 h-6 text-[#ddf300] animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#ddf300] font-bold block">
                    Animated Biometric Experience
                  </span>
                  <h4 className="text-base sm:text-lg font-bold font-serif text-white">
                    Open Full Animated SOULSYNC Experience ("Move Better Live Better")
                  </h4>
                  <p className="text-xs text-neutral-300 font-light">
                    Multi-color blurred gradient slats, running motion animation, live calorie & heart rate telemetry.
                  </p>
                </div>
              </div>

              <span className="shrink-0 px-4 py-2.5 rounded-xl bg-[#ddf300] text-neutral-950 font-black text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <span>Launch Experience</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>

            {/* SOULSYNC Signature Hero Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#242429] via-[#1c1c20] to-[#141416] border border-[#ddf300]/30 p-8 sm:p-12 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#ddf300]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ddf300]/15 border border-[#ddf300]/30 text-xs font-mono font-bold text-[#ddf300] uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Signature Mind-Body Discipline</span>
                </div>

                <h2
                  className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tight"
                  style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
                >
                  SOULSYNC
                </h2>

                <p className="text-xl sm:text-2xl font-serif italic text-[#ddf300] font-bold">
                  “Move your body. Reset your mind.”
                </p>

                <p className="text-xs sm:text-sm font-mono text-neutral-300 uppercase tracking-widest pt-1">
                  Dance • Fitness • Pilates • Meditation
                </p>

                <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed pt-2">
                  {soulSyncProgram.description}
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onNavigate('book-trial', { program: 'SOULSYNC' })}
                    className="px-6 py-3.5 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl cursor-pointer"
                  >
                    <span>Book Free SOULSYNC Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('pay', { programId: 'soulsync', cycle: 'Monthly' })}
                    className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider border border-white/15 cursor-pointer"
                  >
                    Join Monthly (₹1,600 / mo)
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive 6 Daily Batches Explorer */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#ff5a1f] font-bold">
                  Interactive Daily Schedule
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  6 Daily Batches: Morning to Night Reset
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light">
                  Click any slot to review its physical and mental focus area.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {soulSyncBatches.map((batch, index) => {
                  const isSelected = activeSoulSyncSlot === index;
                  return (
                    <div
                      key={index}
                      onClick={() => setActiveSoulSyncSlot(index)}
                      className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-4 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#222226] border-[#ddf300] shadow-xl shadow-lime-950/30 scale-[1.02]'
                          : 'bg-[#1c1c20] border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono font-bold text-[#ddf300]">
                            {batch.tag}
                          </span>
                          <span className="text-xs font-mono text-neutral-400">
                            {batch.type}
                          </span>
                        </div>

                        <div className="text-lg font-bold font-mono text-white flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#ff5a1f]" />
                          {batch.time}
                        </div>

                        <h4 className="text-base font-serif font-bold text-white">
                          {batch.name}
                        </h4>

                        <p className="text-xs text-neutral-300 font-light leading-relaxed">
                          {batch.focus}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('book-trial', { program: `SOULSYNC (${batch.name})` });
                        }}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#ddf300] text-neutral-950 font-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        <span>Select & Book Trial</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mind-Body Pillars Grid */}
            <div className="rounded-3xl bg-[#1c1c20] border border-white/10 p-8 sm:p-12 space-y-6">
              <h3 className="text-2xl font-serif font-bold text-white">
                The 4 Pillars of SOULSYNC
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2 p-5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">1. Dance Cardio</h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Joyful movement and high-tempo musical grooves that burn 500+ calories without feeling like a chore.
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-[#ff5a1f] flex items-center justify-center font-bold">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">2. Functional Fitness</h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Full-body stamina, agility drills, and lean muscle conditioning to power through demanding days.
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-lime-500/20 text-[#ddf300] flex items-center justify-center font-bold">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">3. Sculpting Pilates</h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Clinical core activation, pelvic floor stabilization, and postural realignment for desk workers.
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                    <Smile className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white">4. Sound & Meditation</h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    Centering breathwork, Tibetan singing bowl frequencies, and guided mental stillness to soothe anxiety.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            SEGMENT 3: SOUL RETREAT (Corporate Wellness)
        ────────────────────────────────────────────────────────────── */}
        {activeSegment === 'corporate' && (
          <CorporateWellnessSection onNavigate={onNavigate} />
        )}
      </div>
    </div>
  );
};
