import React, { useState } from 'react';
import { STUDIO_INFO } from '../data/studioData';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Car,
  Compass,
  ArrowUpRight,
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [inquiry, setInquiry] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.name || !inquiry.phone) return;

    // Build direct WhatsApp link
    const waText = `Hi Soul Dance Studio! My name is ${inquiry.name} (+91 ${inquiry.phone}). ${
      inquiry.message ? `Inquiry: ${inquiry.message}` : 'I would like more information on classes.'
    }`;
    const url = `https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
      waText
    )}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#141416] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-[#ff5a1f] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse" />
            <span>Studio Location & Inquiries</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight"
            style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
          >
            VISIT OUR STUDIO IN BIDHANNAGAR
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            Drop by to meet our choreographers, view the sprung dance floor in person, or chat with our desk team about batch enrollment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1c1c20] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-serif font-bold text-white border-b border-white/10 pb-3">
                Studio Details
              </h2>

              <div className="space-y-5 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-[#ff5a1f] flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                    <MapPin className="w-4 h-4 text-[#ff5a1f]" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm font-serif">
                      Studio Address
                    </span>
                    <p className="text-neutral-400 mt-1 leading-relaxed font-light">
                      {STUDIO_INFO.location.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm font-serif">
                      WhatsApp & Phone
                    </span>
                    <p className="text-neutral-400 mt-1 font-light">
                      Call: <a href={`tel:${STUDIO_INFO.contact.phone.replace(/\s+/g, '')}`} className="font-semibold text-white hover:text-[#ff5a1f]">{STUDIO_INFO.contact.phone}</a>
                    </p>
                    <p className="text-neutral-400 font-light">
                      WhatsApp: <a href={`https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-emerald-400 font-semibold hover:underline">{STUDIO_INFO.contact.whatsapp}</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                    <Clock className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm font-serif">
                      Operating Timings
                    </span>
                    <p className="text-neutral-400 mt-1 font-light">
                      Monday – Saturday: 7:00 AM – 8:30 PM
                    </p>
                    <p className="text-neutral-400 font-light">
                      Sunday: 8:00 AM – 1:00 PM (Toddlers & Masterclasses)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-purple-400 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                    <Car className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm font-serif">
                      Parking & Accessibility
                    </span>
                    <p className="text-neutral-400 mt-1 leading-relaxed font-light">
                      Spacious parking for 2-wheelers and cars outside. 5 minutes from Bidhannagar market circle.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Inquiry Form */}
            <div className="bg-[#18181b] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#ff5a1f] uppercase tracking-wider">
                  Instant Response
                </span>
                <h3 className="text-xl font-serif font-bold text-white">
                  Send a Message to Studio WhatsApp
                </h3>
              </div>

              {submitted ? (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Opening WhatsApp conversation with Soul Dance Studio...</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-xs text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                  />

                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Mobile Number"
                    value={inquiry.phone}
                    onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-xs text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                  />

                  <textarea
                    rows={2}
                    placeholder="What would you like to ask or know about our batches?"
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-xs text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Start WhatsApp Conversation</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Interactive Map */}
          <div className="lg:col-span-7 bg-[#1c1c20] rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-white">
                Interactive Studio Map
              </h3>
              <p className="text-xs text-neutral-400 font-light">
                Navigate directly to Soul Dance Studio in Bidhannagar, Durgapur.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 h-96 w-full relative">
              <iframe
                title="Soul Dance Studio Location Map"
                src={STUDIO_INFO.location.embedMapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-white/10">
              <span className="text-xs text-neutral-400 font-light">
                Conveniently located near major transit hubs in Bidhannagar
              </span>

              <a
                href={STUDIO_INFO.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer border border-white/10"
              >
                <Compass className="w-3.5 h-3.5 text-[#ff5a1f]" />
                <span>Open in Google Maps App</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
