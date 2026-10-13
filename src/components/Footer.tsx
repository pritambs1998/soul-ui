import React from 'react';
import { Logo } from './Logo';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Instagram,
  ShieldCheck,
  CheckCircle2,
  Heart,
} from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const navigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#101012] text-neutral-300 border-t border-white/10">
      {/* Upper Footer: Mission & Newsletter / WhatsApp banner */}
      <div className="border-b border-white/10 py-12 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <span className="text-[#ff5a1f] font-mono text-xs tracking-wider uppercase">
              Our Core Mission
            </span>
            <blockquote className="mt-2 text-xl sm:text-2xl font-serif text-neutral-100 font-medium leading-snug">
              “Create healthier, happier human beings through movement, mindfulness, and community.”
            </blockquote>
            <p className="mt-3 text-neutral-400 text-sm">
              Soul Dance Studio • Serving dancers, fitness enthusiasts, kids, and families across Bidhannagar and Durgapur.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
            <a
              href={`https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
                "Hello Soul Dance Studio! I'm interested in joining a batch."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>

            <button
              onClick={() => navigate('book-trial')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <span>Book a Free Trial Class</span>
            </button>
          </div>
        </div>
      </div>

      {/* Middle Footer: Links & Info Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Studio Brand & Motto */}
          <div className="space-y-4">
            <Logo variant="dark" size="md" layout="stacked" />
            <p className="text-xs text-neutral-400 leading-relaxed pt-1">
              Durgapur’s dedicated movement space for urban choreography, high-burn dance cardio, Bollywood grooves, yoga breathwork, and kids creative development.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`tel:${STUDIO_INFO.contact.phone.replace(/\s+/g, '')}`}
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                aria-label="Call Studio"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-emerald-400 hover:border-emerald-400/40 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Programs */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase font-sans">
              Programs & Batches
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => navigate('programs')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  SOULSYNC (Dance • Fitness • Pilates • Meditation)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('programs')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Open Style Choreo (Intermediate)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('programs')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Bollywood Grooves & Expressive
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('programs')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Ladies Choreo (Grace & Semi-Classical)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('programs')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Kids Open Style (Ages 6–12)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('programs')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Toddlers Movement & Rhythm (Ages 3–5)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('programs')}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  Yoga & Breathwork Pranayama
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase font-sans">
              Student Center
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => navigate('dashboard')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Student & Parent Portal (Login)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('pay')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Online Fee Payment (Razorpay UPI/Cards)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('orientation')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  New Student Orientation & Dress Code
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('about')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Studio Values & Philosophy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('instructors')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Teaching Faculty & Bios
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('contact')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Studio Directions & Map
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase font-sans">
              Studio Location
            </h4>
            <div className="flex items-start gap-2 text-xs text-neutral-400">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{STUDIO_INFO.location.address}</span>
            </div>

            <div className="flex items-start gap-2 text-xs text-neutral-400">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p>Mon – Sat: 7:00 AM – 8:30 PM</p>
                <p>Sunday: 8:00 AM – 1:00 PM</p>
              </div>
            </div>

            <div className="pt-2">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Razorpay Verified Payment Gateway</span>
                </div>
                <p className="text-[10px] text-neutral-400">
                  Secured 256-bit SSL encryption. Supports UPI (GPay, PhonePe, Paytm), RuPay, Visa, Mastercard & Netbanking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-900 py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <p>© {new Date().getFullYear()} Soul Dance Studio. All rights reserved.</p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('orientation')}
            className="hover:text-neutral-300 transition-colors cursor-pointer"
          >
            Orientation Guide
          </button>
          <span>•</span>
          <button
            onClick={() => navigate('admin')}
            className="text-amber-400/90 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Studio Owner Billing View</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
