import React, { useState } from 'react';
import {
  ArrowUpRight,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Flame,
  Star,
  Users,
  MessageCircle,
  Heart,
  Building2,
} from 'lucide-react';
import { Logo } from './Logo';
import { PROGRAMS, INSTRUCTORS, TESTIMONIALS, STUDIO_INFO } from '../data/studioData';
import { ClassProgram } from '../types';

interface HomeViewProps {
  onNavigate: (tab: string, extra?: any) => void;
  onSelectProgram: (program: ClassProgram) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectProgram }) => {
  // Day filter for Class Schedule
  const [selectedDay, setSelectedDay] = useState<string>('Tue');
  const [selectedInstructorIndex, setSelectedInstructorIndex] = useState<number>(0);
  const [scheduleSegment, setScheduleSegment] = useState<'dance' | 'soulsync' | 'corporate'>('dance');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Schedule slots matching the Pinterest layout
  const scheduleSlots = [
    {
      time: '4:00 – 5:00PM',
      title: "Kids' Creative Movement",
      level: 'Ages 4–7',
      instructor: 'Debjit Paul',
      image: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=600&q=80',
      programName: 'Kids Open Style',
      fee: '₹1,400/mo',
    },
    {
      time: '5:00 – 6:00PM',
      title: 'Contemporary Flow',
      level: 'Intermediate',
      instructor: 'Riya Sengupta',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
      programName: 'Open Style Choreo',
      fee: '₹1,800/mo',
    },
    {
      time: '7:00 – 8:00PM',
      title: 'Hip-Hop & Urban Grooves',
      level: 'Beginner / Intermediate',
      instructor: 'Pritam Biswas',
      image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=600&q=80',
      programName: 'Open Style Choreo',
      fee: '₹1,800/mo',
    },
    {
      time: '8:00 – 9:00PM',
      title: 'SOULSYNC (Dance • Pilates • Reset)',
      level: 'All Levels',
      instructor: 'Ananya Mukherjee',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
      programName: 'SOULSYNC',
      fee: '₹1,600/mo',
    },
  ];

  const soulSyncSlots = [
    {
      time: '7:00 – 8:15AM',
      title: 'Morning Awakening (Pilates & Zen)',
      level: 'All Levels',
      instructor: 'Ananya Mukherjee',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
      programName: 'SOULSYNC',
      fee: '₹1,600/mo',
      badge: 'Pilates & Zen',
    },
    {
      time: '9:00 – 10:15AM',
      title: 'Studio & Online Sync (Dance & Cardio)',
      level: 'All Levels',
      instructor: 'Ananya Mukherjee',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
      programName: 'SOULSYNC',
      fee: '₹1,600/mo',
      badge: 'High Energy',
    },
    {
      time: '6:30 – 7:30PM',
      title: 'Sunset Sync Burn (Core & HIIT)',
      level: 'All Levels',
      instructor: 'Ananya Mukherjee',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80',
      programName: 'SOULSYNC',
      fee: '₹1,600/mo',
      badge: 'Sunset Burn',
    },
    {
      time: '7:30 – 8:30PM',
      title: 'Night Reset & Sound Meditation',
      level: 'Restorative',
      instructor: 'Riya Sengupta',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
      programName: 'SOULSYNC',
      fee: '₹1,600/mo',
      badge: 'Deep Rest',
    },
  ];

  const corporateSlots = [
    {
      time: '45–60 Mins',
      title: 'Desk Ergonomics & Spinal Mobility',
      level: 'IT & Desk Teams',
      instructor: 'Studio Wellness Team',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
      programName: 'Soul Retreat',
      fee: 'From ₹4,500',
      badge: 'Onsite / Zoom',
    },
    {
      time: '60–90 Mins',
      title: 'High-Energy Team Dance & Groove Break',
      level: 'All Departments',
      instructor: 'Pritam Biswas & Faculty',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
      programName: 'Soul Retreat',
      fee: 'From ₹7,500',
      badge: 'Icebreaker',
    },
    {
      time: '60–75 Mins',
      title: 'Executive Pilates & Sound Meditation',
      level: 'Leadership & Managers',
      instructor: 'Ananya & Riya',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
      programName: 'Soul Retreat',
      fee: 'From ₹8,500',
      badge: 'Burnout Reset',
    },
    {
      time: 'Half / Full Day',
      title: 'Soul Retreat: Complete Mind-Body Immersion',
      level: 'Offsites & All-Hands',
      instructor: 'Full Faculty',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
      programName: 'Soul Retreat',
      fee: 'From ₹18,000',
      badge: 'Flagship Buyout',
    },
  ];

  // Instructor photos matching Pinterest photo strip: 3 black & white + 1 vibrant orange
  const instructorStrip = [
    {
      id: 'inst-1',
      name: 'Pritam Biswas',
      role: 'Founder & Artistic Director • Urban & Open Style',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      isColor: false,
      tag: 'Urban Choreography',
      quote: 'Dance is honesty in motion. Every groove tells your truth.',
    },
    {
      id: 'inst-2',
      name: 'Ananya Mukherjee',
      role: 'Lead SOULSYNC & Holistic Coach',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      isColor: false,
      tag: 'SOULSYNC (Dance • Pilates • Meditation)',
      quote: 'Move your body. Reset your mind. The rhythm carries you through.',
    },
    {
      id: 'inst-3',
      name: 'Debjit Paul',
      role: 'Kids & Bollywood Specialist',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      isColor: false,
      tag: 'Kids Development',
      quote: 'Children do not just learn steps—they discover courage.',
    },
    {
      id: 'inst-4',
      name: 'Riya Sengupta',
      role: 'Yoga & Ladies Choreo Instructor',
      photo: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
      isColor: true, // Vibrant orange pop!
      tag: 'Mindful Movement',
      quote: 'When breath meets movement, healing and grace unfold.',
    },
  ];

  return (
    <div className="bg-[#141416] text-white selection:bg-[#ff5a1f] selection:text-black min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (Matches Pinterest Screenshot)
      ────────────────────────────────────────────────────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-12 pt-8 pb-16 lg:pt-14 lg:pb-24 max-w-[1440px] mx-auto overflow-hidden">
        {/* Top Header Row: Quote & Sub-description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-6 lg:mb-10">
          <div className="lg:col-span-4 space-y-3">
            <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed tracking-wide">
              Where passion meets movement <br className="hidden sm:inline" />
              — and every step tells a story.
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 space-y-2">
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
              Discover the joy of dance in a vibrant, inclusive, and professional environment. At Soul Dance Studio, we offer classes for all ages and experience levels — from absolute beginners to aspiring professionals.
            </p>
          </div>
        </div>

        {/* Hero Body: Giant Stacked Typography + Overlapping Breakdance Visual + Circular Orange CTA */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Monumental Official Soul Dance Studio Brand Identity */}
          <div className="lg:col-span-7 z-10 select-none py-2 lg:py-4">
            <Logo size="hero" layout="stacked" showTagline={true} />
          </div>

          {/* Overlapping Visual: Breakdancer in Orange Jacket + Inset Stage Photo + Circular Orange CTA */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Breakdancer Main Frame */}
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl group">
              {/* Street Breakdancer Image */}
              <img
                src="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=1200&q=80"
                alt="Soul Dance Studio Breakdancer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Floating Smaller Red/Orange Neon Stage Photo Card (as in screenshot) */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-28 sm:w-36 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-orange-500/80 shadow-2xl shadow-orange-950/80 -rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80"
                  alt="Stage Lighting"
                  className="w-full h-full object-cover filter saturate-150 brightness-95"
                />
                <div className="absolute inset-0 bg-orange-600/30 mix-blend-color" />
              </div>
            </div>

            {/* Circular Orange CTA Button (Pinterest signature element) */}
            <button
              id="hero-circular-explore-btn"
              onClick={() => onNavigate('book-trial')}
              className="absolute -bottom-6 -left-4 sm:-bottom-10 sm:-left-8 z-30 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-extrabold flex flex-col items-center justify-center p-4 text-center cursor-pointer shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-300 group"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
            >
              <ArrowUpRight className="w-7 h-7 sm:w-9 sm:h-9 mb-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <span className="text-xs sm:text-sm tracking-widest uppercase font-black leading-tight">
                EXPLORE <br /> CLASSES
              </span>
            </button>
          </div>
        </div>

        {/* Under Hero: Asymmetrical Explanatory Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mt-12 lg:mt-16 pt-8 border-t border-white/10">
          <div className="lg:col-span-5 space-y-2">
            <h2 className="text-sm sm:text-base font-medium text-white tracking-wide">
              Your journey begins today — let your movement speak.
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              At Soul Dance Studio, we believe dance is more than just movement — it’s a way to express, connect, and grow.
            </p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              Whether you’re just starting out or aiming for the stage, we have a place for you.
            </p>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. FLOATING BENTO CARDS & "WHY CHOOSE US?"
        ────────────────────────────────────────────────────────────── */}
        <div className="mt-16 sm:mt-24 space-y-12">
          {/* Asymmetrical Bento Cards (with glowing orange dot & tilted card) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
            {/* Card 1 */}
            <div className="rounded-2xl bg-[#1c1c20] border border-white/10 p-6 sm:p-7 space-y-4 hover:border-white/20 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-white/70 block" />
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                Take part in exciting events, seasonal showcases, and international masterclasses.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-[#1c1c20] border border-white/10 p-6 sm:p-7 space-y-4 hover:border-white/20 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-white/70 block" />
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                Find your confidence, express yourself, and become part of our dance family.
              </p>
            </div>

            {/* Card 3: Distinctively Tilted with glowing orange dot (Signature Pinterest touch) */}
            <div className="rounded-2xl bg-[#222226] border border-[#ff5a1f]/60 p-6 sm:p-7 space-y-4 transform lg:-rotate-3 lg:scale-105 shadow-xl shadow-orange-950/30 hover:rotate-0 transition-transform">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5a1f] block shadow-[0_0_8px_#ff5a1f]" />
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                Choose from a wide range of styles: Jazz Funk, Hip-Hop, Bollywood, Latin, and more.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl bg-[#1c1c20] border border-white/10 p-6 sm:p-7 space-y-4 hover:border-white/20 transition-all">
              <span className="w-2.5 h-2.5 rounded-full bg-white/70 block" />
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                Learn from world class instructors who are passionate about teaching and performance.
              </p>
            </div>
          </div>

          {/* Bold Header: WHY CHOOSE US? + Link */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pt-4">
            <h2
              className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
            >
              WHY CHOOSE US?
            </h2>

            <button
              onClick={() => onNavigate('programs')}
              className="inline-flex items-center gap-1.5 text-[#ff5a1f] hover:text-[#ff7a45] text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>EXPLORE CLASSES</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. MEET OUR INSTRUCTORS (Horizontal Photo Strip)
      ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 py-16 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h2
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white"
            style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
          >
            MEET OUR INSTRUCTORS
          </h2>

          <button
            onClick={() => onNavigate('instructors')}
            className="inline-flex items-center gap-1 text-neutral-400 hover:text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            <span>View Faculty Profiles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Column Photo Gallery Strip: 3 Monochrome + 1 Orange Color Pop (Exact Pinterest match) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {instructorStrip.map((inst, index) => {
            const isSelected = selectedInstructorIndex === index;
            return (
              <div
                key={inst.id}
                onClick={() => setSelectedInstructorIndex(index)}
                className={`relative rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-900 border transition-all cursor-pointer group ${
                  isSelected ? 'border-[#ff5a1f] ring-2 ring-[#ff5a1f]/30' : 'border-white/10 hover:border-white/30'
                }`}
              >
                <img
                  src={inst.photo}
                  alt={inst.name}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                    inst.isColor ? 'filter saturate-150 contrast-110' : 'filter grayscale contrast-125'
                  }`}
                />

                {/* Subtle Orange Glow on Hover or if vibrant */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent ${
                    inst.isColor ? 'bg-orange-600/20 mix-blend-screen' : ''
                  }`}
                />

                {/* Overlay Text */}
                <div className="absolute bottom-0 inset-x-0 p-4 space-y-1">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                      inst.isColor ? 'bg-[#ff5a1f] text-black' : 'bg-white/20 text-white backdrop-blur-xs'
                    }`}
                  >
                    {inst.tag}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white font-serif">{inst.name}</h3>
                  <p className="text-[11px] text-neutral-300 line-clamp-1">{inst.role}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Underneath Minimal Banner Quote */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-neutral-400 text-xs sm:text-sm font-light border-b border-white/10 pb-8">
          <p className="italic">
            "{instructorStrip[selectedInstructorIndex].quote}" —{' '}
            <span className="text-white font-medium not-italic">
              {instructorStrip[selectedInstructorIndex].name}
            </span>
          </p>

          <span className="text-neutral-500 text-xs">
            Urban vibes and creative edge — Learn, groove, and find your voice. Joyful and unforgettable.
          </span>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. UPCOMING EVENTS SECTION (Pinterest Layout)
      ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 py-16 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h2
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white"
            style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
          >
            UPCOMING EVENTS
          </h2>

          <span className="text-xs sm:text-sm text-neutral-400 font-light">
            Season 2026 Workshops & Student Recitals
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Event Card 1: Annual Showcase */}
          <div className="md:col-span-5 rounded-3xl overflow-hidden bg-[#1a1a1e] border border-white/10 flex flex-col justify-between group">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80"
                alt="Annual Dance Showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-110"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs text-[11px] font-mono text-neutral-200 border border-white/10">
                OCT 18, 2026
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                Annual Dance Showcase
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                Join us for a night of pure performance featuring all our students — from tiny dancers to advanced artists.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="pt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ff5a1f] hover:underline cursor-pointer"
              >
                <span>Reserve Tickets & Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Event Card 2: Minimalist Dark Circle CTA (Pinterest signature element) */}
          <div className="md:col-span-3 rounded-3xl bg-[#1a1a1e] border border-white/10 p-8 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-32 h-32 rounded-full border border-white/20 flex flex-col items-center justify-center p-4 hover:border-[#ff5a1f] transition-colors group cursor-pointer"
              onClick={() => onNavigate('book-trial')}
            >
              <span className="w-2 h-2 rounded-full bg-[#ff5a1f] mb-2 animate-ping" />
              <span className="text-[11px] font-black uppercase tracking-widest text-neutral-200 group-hover:text-white">
                SUBSCRIBE <br /> NOW
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-xs font-light">
              Get notified of guest masterclasses, battle dates, and early bird studio passes.
            </p>
          </div>

          {/* Event Card 3: Summer Masterclass */}
          <div className="md:col-span-4 rounded-3xl overflow-hidden bg-[#1a1a1e] border border-white/10 flex flex-col justify-between group">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509670811275-742301384460?auto=format&fit=crop&w=800&q=80"
                alt="Summer Masterclass"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs text-[11px] font-mono text-neutral-200 border border-white/10">
                NOV 12–14, 2026
              </div>
            </div>

            <div className="p-6 space-y-2">
              <h3 className="text-xl font-bold text-white font-serif">
                Urban Masterclass Series
              </h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Guest instructors from Mumbai and Kolkata in lyrical contemporary, popping, and hip-hop technique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. CLASS SCHEDULE (Horizontal Time Slots Grid with Interactive Segments)
      ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10 py-16 sm:py-24 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#ff5a1f] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse" />
              <span>Interactive Segment Timings</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
            >
              CLASS SCHEDULE
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm font-light">
              Explore regular dance academy batches, holistic SOULSYNC fitness, or Soul Retreat corporate wellness
            </p>
          </div>

          {/* Interactive Segment Buttons */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#1c1c20] border border-white/10">
            <button
              onClick={() => setScheduleSegment('dance')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                scheduleSegment === 'dance'
                  ? 'bg-[#ff5a1f] text-neutral-950 shadow-md font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dance Academy</span>
            </button>

            <button
              onClick={() => setScheduleSegment('soulsync')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                scheduleSegment === 'soulsync'
                  ? 'bg-[#ddf300] text-neutral-950 shadow-md font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>SOULSYNC</span>
            </button>

            <button
              onClick={() => setScheduleSegment('corporate')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                scheduleSegment === 'corporate'
                  ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-neutral-950 shadow-md font-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Soul Retreat</span>
            </button>
          </div>
        </div>

        {/* Days Pill Selector (shown for Dance) */}
        {scheduleSegment === 'dance' && (
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#1c1c20] border border-white/10 w-fit">
            <span className="text-[10px] font-mono uppercase text-neutral-400 px-2">Days:</span>
            {daysOfWeek.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedDay === d
                    ? 'bg-[#ff5a1f] text-neutral-950 shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        )}

        {/* Horizontal Time Slot Cards (Dynamic based on selected segment) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(scheduleSegment === 'dance'
            ? scheduleSlots
            : scheduleSegment === 'soulsync'
            ? soulSyncSlots
            : corporateSlots
          ).map((slot, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden bg-[#1c1c20] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between group shadow-lg"
            >
              {/* Header with Time */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#ff5a1f]" />
                  <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide">
                    {slot.time}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-neutral-300 font-mono">
                  {slot.fee}
                </span>
              </div>

              {/* Class Thumbnail Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={slot.image}
                  alt={slot.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] uppercase tracking-wider text-orange-400 font-bold block">
                    {slot.level}
                  </span>
                  <h4 className="text-base font-bold text-white font-serif">{slot.title}</h4>
                  <p className="text-[11px] text-neutral-300">Guide: {slot.instructor}</p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-[#17171a] flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    if (scheduleSegment === 'corporate') {
                      onNavigate('programs', { segment: 'corporate' });
                    } else {
                      onNavigate('book-trial', { program: slot.programName });
                    }
                  }}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors text-center cursor-pointer ${
                    scheduleSegment === 'corporate'
                      ? 'bg-gradient-to-r from-cyan-400 to-sky-500 text-neutral-950 font-black'
                      : scheduleSegment === 'soulsync'
                      ? 'bg-[#ddf300] text-neutral-950 font-black'
                      : 'bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950'
                  }`}
                >
                  {scheduleSegment === 'corporate' ? 'Explore Corporate Proposal' : 'Book Free Trial'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Full schedule link */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-400 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Studio open 7:00 AM – 8:30 PM • Bidhannagar, Durgapur</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('programs', { segment: 'soulsync' })}
              className="text-[#ddf300] hover:underline font-mono uppercase tracking-wider text-xs cursor-pointer"
            >
              SOULSYNC Batches →
            </button>
            <button
              onClick={() => onNavigate('programs', { segment: 'corporate' })}
              className="text-cyan-400 hover:underline font-mono uppercase tracking-wider text-xs cursor-pointer"
            >
              Corporate Retreat Calculator →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
