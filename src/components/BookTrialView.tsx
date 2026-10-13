import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Logo } from './Logo';
import { PROGRAMS, STUDIO_INFO } from '../data/studioData';
import {
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Clock,
  MapPin,
  ArrowRight,
  Phone,
  User,
  Calendar,
  ArrowUpRight,
  Heart,
  Building2,
} from 'lucide-react';

interface BookTrialViewProps {
  initialProgram?: string;
  onNavigate: (tab: string, extra?: any) => void;
}

export const BookTrialView: React.FC<BookTrialViewProps> = ({
  initialProgram,
  onNavigate,
}) => {
  const [formData, setFormData] = useState({
    studentName: '',
    phone: '',
    email: '',
    age: '',
    classOfInterest: initialProgram || PROGRAMS[0].title,
    preferredSlot: 'Morning (9:00 AM – 11:30 AM)',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const slotOptions = [
    'Morning (7:00 AM – 8:30 AM) • Yoga & Pranayama',
    'Morning (7:00 AM – 8:15 AM) • SOULSYNC (Pilates & Zen)',
    'Morning (9:00 AM – 10:30 AM) • SOULSYNC Online / Studio (Dance & Fitness)',
    'Morning (10:30 AM – 11:30 AM) • SOULSYNC Core Reset',
    'Morning (11:30 AM – 12:45 PM) • Ladies Choreo',
    'Afternoon (4:30 PM – 5:30 PM) • SOULSYNC Mind-Body',
    'Evening (5:00 PM – 6:00 PM) • Kids Open Style',
    'Evening (6:00 PM – 7:30 PM) • Open Style Choreo',
    'Evening (6:30 PM – 7:30 PM) • SOULSYNC Sunset Sync',
    'Evening (7:00 PM – 8:00 PM) • Bollywood Grooves',
    'Night (7:30 PM – 8:30 PM) • SOULSYNC Night Reset & Meditation',
    'Weekend (Sat/Sun 10:00 AM) • Toddlers Movement',
    'Weekend (Sat/Sun 6:30 PM) • Intensive Training',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.studentName.trim() || !formData.phone.trim()) {
      setErrorMsg('Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/trials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit trial booking');
      }

      setWhatsappLink(data.whatsappConfirmationUrl || '');
      setIsSuccess(true);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff5a1f', '#ffffff', '#10b981'],
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#141416] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSuccess ? (
          // Confirmation Screen
          <div className="bg-[#1c1c20] rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">
                Free Trial Pass Confirmed
              </span>
              <h2
                className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
              >
                Welcome, {formData.studentName}! 🎉
              </h2>
              <p className="text-neutral-300 text-sm font-light leading-relaxed">
                We’ve reserved your trial spot for <strong>{formData.classOfInterest}</strong> in Bidhannagar, Durgapur. Our team will verify your slot and send a quick confirmation.
              </p>
            </div>

            {/* Booking Summary Card */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-left text-xs space-y-2.5 text-neutral-300">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-neutral-400">Class of Interest:</span>
                <strong className="text-white font-mono">{formData.classOfInterest}</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-neutral-400">Preferred Slot:</span>
                <span className="text-white font-medium">{formData.preferredSlot}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-neutral-400">Contact Mobile:</span>
                <span className="text-[#ff5a1f] font-mono font-bold">+91 {formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Studio Location:</span>
                <span className="text-white font-medium">Bidhannagar, Durgapur</span>
              </div>
            </div>

            {/* Action CTAs: Notify WhatsApp + Orientation Checklist */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all uppercase tracking-wider"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Notify Studio on WhatsApp</span>
                </a>
              )}

              <button
                onClick={() => onNavigate('orientation')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs shadow-md transition-all cursor-pointer uppercase tracking-wider"
              >
                <span>View First-Day Orientation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-neutral-400 font-mono">
              Need directions or running late? Call us anytime at {STUDIO_INFO.contact.phone}.
            </p>
          </div>
        ) : (
          // Lead Capture Form
          <div className="bg-[#1c1c20] rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl space-y-8">
            <div className="space-y-4 text-center max-w-xl mx-auto flex flex-col items-center">
              <Logo size="sm" layout="stacked" showTagline={false} className="mb-2" />
              
              {/* Interactive Segment Picker */}
              <div className="p-1 rounded-2xl bg-[#141416] border border-white/10 flex flex-wrap justify-center gap-1.5 w-full">
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, classOfInterest: 'Open Style Choreo' }))}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                    formData.classOfInterest !== 'SOULSYNC' && !formData.classOfInterest.includes('SOULSYNC')
                      ? 'bg-[#ff5a1f] text-neutral-950 font-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Dance Trial</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, classOfInterest: 'SOULSYNC', preferredSlot: 'Morning (9:00 AM – 10:30 AM) • SOULSYNC Online / Studio (Dance & Fitness)' }))}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                    formData.classOfInterest === 'SOULSYNC' || formData.classOfInterest.includes('SOULSYNC')
                      ? 'bg-[#ddf300] text-neutral-950 font-black'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Heart className="w-3 h-3" />
                  <span>SOULSYNC Pass</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('programs', { segment: 'corporate' })}
                  className="px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 flex items-center gap-1.5 transition-colors cursor-pointer border border-cyan-500/30"
                >
                  <Building2 className="w-3 h-3" />
                  <span>Corporate Soul Retreat →</span>
                </button>
              </div>

              <span className="text-[#ff5a1f] font-mono font-bold text-xs tracking-wider uppercase">
                Free 45-Minute Trial Pass
              </span>
              <h1
                className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight"
                style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
              >
                STEP ONTO THE FLOOR
              </h1>
              <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                Experience the atmosphere, meet our choreographers, and discover your rhythm. Zero payment or membership pressure.
              </p>
            </div>

            {errorMsg && (
              <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                    Full Name / Student Name <span className="text-orange-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suman Sen"
                      value={formData.studentName}
                      onChange={(e) =>
                        setFormData({ ...formData, studentName: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                    WhatsApp Mobile Number <span className="text-orange-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 text-xs text-orange-400 font-mono font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="98321 00000"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Age */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                    Student Age (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 7 (Kids) or 24 (Adult)"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                  />
                </div>

                {/* Email (Optional) */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                  />
                </div>
              </div>

              {/* Class of Interest */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                  Class of Interest <span className="text-orange-400">*</span>
                </label>
                <select
                  value={formData.classOfInterest}
                  onChange={(e) =>
                    setFormData({ ...formData, classOfInterest: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                >
                  {PROGRAMS.map((p) => (
                    <option key={p.id} value={p.title} className="bg-[#1c1c20] text-white">
                      {p.title} ({p.level} • {p.ageGroup})
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Time Slot */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                  Preferred Batch Timing <span className="text-orange-400">*</span>
                </label>
                <select
                  value={formData.preferredSlot}
                  onChange={(e) =>
                    setFormData({ ...formData, preferredSlot: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                >
                  {slotOptions.map((opt, i) => (
                    <option key={i} value={opt} className="bg-[#1c1c20] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                  Notes or Questions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any prior dance experience or specific goals (e.g. fitness cardio, shy child, stage performance)?"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                />
              </div>

              <button
                id="trial-form-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] active:scale-98 text-neutral-950 font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-4"
              >
                {isSubmitting ? (
                  <span>Reserving Trial Pass...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-neutral-950" />
                    <span>Confirm My Free Trial Pass</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-400 pt-2 font-mono">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Zero fee or card needed
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Instant WhatsApp pass
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
