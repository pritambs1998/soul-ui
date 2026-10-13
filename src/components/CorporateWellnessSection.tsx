import React, { useState } from 'react';
import { CORPORATE_RETREATS, STUDIO_INFO } from '../data/studioData';
import { CorporatePackage } from '../types';
import {
  Sparkles,
  Building2,
  Users,
  Clock,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Compass,
  Heart,
  TrendingUp,
  Award,
  ChevronRight,
  Mail,
  Phone,
} from 'lucide-react';

interface CorporateWellnessSectionProps {
  onNavigate: (tab: string, extra?: any) => void;
  onRequestQuote?: (packageName?: string) => void;
}

export const CorporateWellnessSection: React.FC<CorporateWellnessSectionProps> = ({
  onNavigate,
}) => {
  // Interactive Calculator State
  const [teamSize, setTeamSize] = useState<number>(35);
  const [selectedFormat, setSelectedFormat] = useState<'onsite' | 'studio' | 'hybrid' | 'retreat'>('onsite');
  const [selectedFrequency, setSelectedFrequency] = useState<'single' | 'monthly' | 'quarterly'>('monthly');
  const [selectedPackageId, setSelectedPackageId] = useState<string>(CORPORATE_RETREATS[0].id);

  // Corporate Inquiry Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    workEmail: '',
    phone: '',
    teamSize: '35',
    preferredFormat: 'Onsite at Office',
    selectedPackage: CORPORATE_RETREATS[0].title,
    preferredDate: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamic estimate calculation
  const calculateEstimate = () => {
    let basePerPerson = 220;
    if (selectedFormat === 'retreat') basePerPerson = 850;
    if (selectedFormat === 'studio') basePerPerson = 280;
    if (selectedFormat === 'hybrid') basePerPerson = 180;

    let discount = 1;
    if (selectedFrequency === 'monthly') discount = 0.85; // 15% partner discount
    if (selectedFrequency === 'quarterly') discount = 0.75; // 25% long-term partner discount

    const totalEstimate = Math.round(teamSize * basePerPerson * discount);
    return totalEstimate;
  };

  const handlePackageClick = (pkg: CorporatePackage) => {
    setSelectedPackageId(pkg.id);
    setFormData((prev) => ({
      ...prev,
      selectedPackage: pkg.title,
    }));
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const generateWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `Hello Soul Dance Studio! I am inquiring about Soul Retreat Corporate Wellness for our company ${formData.companyName || '[Company Name]'}.\n\nTeam Size: ${teamSize} employees\nFormat: ${selectedFormat.toUpperCase()}\nPreferred Package: ${formData.selectedPackage}\nFrequency: ${selectedFrequency}\n\nPlease share availability and a corporate proposal.`
    );
    window.open(`https://wa.me/91${STUDIO_INFO.contact.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO HEADER: SOUL RETREAT CORPORATE WELLNESS
      ────────────────────────────────────────────────────────────── */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#1c1c20] via-[#161619] to-[#121214] border border-white/10 p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#ff5a1f]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff5a1f]/15 border border-[#ff5a1f]/30 text-xs font-mono font-bold text-[#ff5a1f] uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>SOUL RETREAT • Corporate Wellness & Executive Offsites</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-tight"
            style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
          >
            REVITALIZE YOUR TEAM'S MIND & BODY
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
            Long desk hours, urgent sprint deadlines, and screen fatigue degrade focus and morale. 
            <strong className="text-white font-medium"> Soul Retreat</strong> delivers high-impact movement workshops, 
            ergonomic posture recovery, team rhythm icebreakers, and acoustic sound meditation tailored for leading organizations.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Onsite at Your Office
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Private Studio Buyouts
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Offsite Immersion Retreats
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. INTERACTIVE CORPORATE WELLNESS ESTIMATOR / CALCULATOR
      ────────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-[#1c1c20] border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#ff5a1f] font-bold">
              Interactive Estimator
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Custom Corporate Wellness Proposal Builder
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1">
              Select your team size, preferred format, and cadence for an instant tailored cost estimate.
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer self-start md:self-auto"
          >
            {isFormOpen ? 'Close Form' : 'Request Official RFP / Proposal'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Team Size Slider */}
            <div className="space-y-3 p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#ff5a1f]" />
                  <span>Team Size (Employees)</span>
                </label>
                <span className="px-3 py-1 rounded-lg bg-[#ff5a1f] text-neutral-950 font-mono font-black text-sm">
                  {teamSize} People
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                step="5"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#ff5a1f]"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                <span>10 (Executive Squad)</span>
                <span>50 (Department)</span>
                <span>120 (Townhall)</span>
                <span>250+ (All Hands)</span>
              </div>
            </div>

            {/* Delivery Format Selector */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold block">
                Session Location & Format
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'onsite', label: 'Onsite at Office', sub: 'Conference Room' },
                  { id: 'studio', label: 'In Studio Buyout', sub: 'Bidhannagar Hub' },
                  { id: 'hybrid', label: 'Virtual Zoom / Meet', sub: 'Live Broadcast' },
                  { id: 'retreat', label: 'Offsite Resort', sub: 'Full Day Immersion' },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormat(fmt.id as any)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      selectedFormat === fmt.id
                        ? 'bg-[#ff5a1f]/20 border-[#ff5a1f] text-white shadow-lg shadow-orange-950/40'
                        : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-bold leading-tight">{fmt.label}</div>
                    <div className="text-[10px] font-mono text-neutral-400 mt-1">{fmt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cadence / Frequency */}
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-300 font-bold block">
                Engagement Frequency
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'single', label: 'One-Time Workshop', desc: 'Single Event' },
                  { id: 'monthly', label: 'Monthly Series', desc: '15% Partner Benefit' },
                  { id: 'quarterly', label: 'Quarterly Cadence', desc: '25% Partner Benefit' },
                ].map((freq) => (
                  <button
                    key={freq.id}
                    type="button"
                    onClick={() => setSelectedFrequency(freq.id as any)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                      selectedFrequency === freq.id
                        ? 'bg-[#ddf300]/15 border-[#ddf300] text-white'
                        : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{freq.label}</div>
                    <div className="text-[10px] font-mono text-[#ddf300] mt-0.5">{freq.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Proposal Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#242429] to-[#1a1a1e] rounded-3xl border border-white/15 p-6 sm:p-7 space-y-6 shadow-xl relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff5a1f] font-bold">
                Live Package Estimation
              </span>
              <h4 className="text-xl font-serif font-bold text-white">
                Soul Retreat Estimate
              </h4>
            </div>

            <div className="space-y-3 text-xs border-y border-white/10 py-4 font-mono text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-400">Team Headcount:</span>
                <span className="text-white font-bold">{teamSize} Employees</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Format:</span>
                <span className="text-[#ff5a1f] font-bold capitalize">{selectedFormat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Engagement:</span>
                <span className="text-white capitalize">{selectedFrequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Instructor Lead:</span>
                <span className="text-white">Founder Pritam Biswas & Faculty</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] font-mono text-neutral-400 uppercase">Estimated Budget</div>
              <div className="text-3xl sm:text-4xl font-black font-mono text-[#ddf300]">
                ₹{calculateEstimate().toLocaleString('en-IN')}{' '}
                <span className="text-xs font-normal text-neutral-400">/ session</span>
              </div>
              <p className="text-[10px] text-neutral-400 font-light">
                *Includes sound equipment, custom music curation, breathing tools & post-session guidance.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={generateWhatsAppInquiry}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Discuss on WhatsApp Desk</span>
              </button>

              <button
                onClick={() => setIsFormOpen(true)}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Submit Written RFP Form</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MODAL / INLINE FORM: CORPORATE RFP SUBMISSION
      ────────────────────────────────────────────────────────────── */}
      {isFormOpen && (
        <div className="rounded-3xl bg-[#1c1c20] border border-white/20 p-8 sm:p-10 shadow-2xl space-y-6 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#ff5a1f] font-bold">
                Official Corporate Inquiry
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-0.5">
                Soul Retreat Wellness Proposal Request
              </h3>
            </div>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-xs text-neutral-400 hover:text-white font-mono uppercase cursor-pointer"
            >
              [Close]
            </button>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-serif font-bold text-white">
                Proposal Request Received!
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto font-light leading-relaxed">
                Thank you for contacting Soul Dance Studio. Our corporate wellness director will review your requirements for{' '}
                <strong className="text-white">{formData.companyName}</strong> and share a customized agenda within 24 business hours.
              </p>
              <button
                onClick={generateWhatsAppInquiry}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Follow up instantly on WhatsApp</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-neutral-300">Company / Organization *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Infosys Durgapur / Tata Steel"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-neutral-300">HR / Contact Person *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Debabrata Sen"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-neutral-300">Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="hr@company.com"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-neutral-300">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="98XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-neutral-300">Preferred Package</label>
                <select
                  value={formData.selectedPackage}
                  onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white focus:ring-2 focus:ring-[#ff5a1f] outline-none cursor-pointer"
                >
                  {CORPORATE_RETREATS.map((pkg) => (
                    <option key={pkg.id} value={pkg.title} className="bg-neutral-900 text-white">
                      {pkg.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-neutral-300">Target Date / Month</label>
                <input
                  type="text"
                  placeholder="e.g. Next Friday / Mid November"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3 space-y-1.5">
                <label className="text-xs font-mono uppercase text-neutral-300">Specific Team Goals & Challenges</label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your team (e.g. desk stiffness, high stress, celebrating milestone, team ice-breaker)..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3 pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg transition-all"
                >
                  Submit Corporate RFP Proposal Request
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. 4 SIGNATURE CORPORATE PACKAGES
      ────────────────────────────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#ff5a1f] font-bold">
            Curated Corporate Formats
          </span>
          <h3
            className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight"
            style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
          >
            SOUL RETREAT CURRICULUM
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CORPORATE_RETREATS.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                onClick={() => handlePackageClick(pkg)}
                className={`rounded-3xl border p-6 sm:p-8 flex flex-col justify-between transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-[#222226] border-[#ff5a1f] shadow-xl shadow-orange-950/30'
                    : 'bg-[#1c1c20] border-white/10 hover:border-white/30'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      {pkg.badge && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#ff5a1f]/20 text-[#ff5a1f] text-[10px] font-mono font-bold uppercase tracking-wider">
                          {pkg.badge}
                        </span>
                      )}
                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                        {pkg.title}
                      </h4>
                      <p className="text-xs text-[#ddf300] font-mono italic">
                        "{pkg.tagline}"
                      </p>
                    </div>

                    <span className="shrink-0 px-2.5 py-1 rounded-xl bg-white/10 text-neutral-300 font-mono text-xs flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#ff5a1f]" />
                      {pkg.duration}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Modules included */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Core Modules Included:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {pkg.modules.map((mod, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4 mt-6">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">Starting At</span>
                    <p className="text-base font-bold font-mono text-white">{pkg.startingPrice}</p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePackageClick(pkg);
                      setIsFormOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
                  >
                    <span>Request Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. WHY CORPORATE MOVEMENT MATTERS: 4 PILLARS
      ────────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-[#1c1c20] border border-white/10 p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#ff5a1f] font-bold">
            The Science of Workplace Movement
          </span>
          <h3
            className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight"
            style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
          >
            MEASURABLE IMPACT ON TEAM WELL-BEING
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-light">
            Backed by physical therapy fundamentals and mindfulness science.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-[#ff5a1f] flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-base font-serif font-bold text-white">40% Less Fatigue</h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Targeted desk-side thoracic decompression reoxygenates tissues, reducing the afternoon 3:00 PM mental slump.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="text-base font-serif font-bold text-white">Silo-Busting Camaraderie</h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Shared rhythm and accessible dance choreography dissolve awkward corporate hierarchies faster than formal dinners.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-base font-serif font-bold text-white">Spinal Posture Health</h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Prevent chronic repetitive strain, carpal tunnel symptoms, and cervical disc compression with guided alignment.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#ddf300] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-serif font-bold text-white">Burnout Prevention</h4>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Acoustic sound baths and guided Pranayama breathwork reset the autonomic nervous system into restorative rest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
