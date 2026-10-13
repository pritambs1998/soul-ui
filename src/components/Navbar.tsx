import React, { useState } from 'react';
import { Logo } from './Logo';
import {
  Menu,
  X,
  Sparkles,
  User,
  CreditCard,
  MessageCircle,
  Phone,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';
import { Student } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentStudent: Student | null;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentStudent,
  onOpenLogin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'dance', label: 'Dance Batches' },
    { id: 'soulsync', label: 'SOULSYNC' },
    { id: 'corporate', label: 'Soul Retreat (Corporate)' },
    { id: 'instructors', label: 'Faculty' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#141416]/90 backdrop-blur-md border-b border-white/10 text-white transition-all">
      {/* Top micro bar for location & quick WhatsApp */}
      <div className="bg-black/60 text-neutral-400 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#ff5a1f] animate-pulse" />
          <span className="font-medium text-neutral-200">
            Admissions Open for New Batches
          </span>
          <span className="hidden sm:inline text-neutral-400">
            • Bidhannagar, Durgapur
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <a
            href={`https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
              "Hi Soul Dance Studio, I'd like more information about classes!"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 transition-colors font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp: {STUDIO_INFO.contact.phone}</span>
          </a>

          <button
            id="nav-admin-quick-link"
            onClick={() => handleNavClick('admin')}
            className="hidden md:flex items-center gap-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Studio Admin</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo - Official Soul Dance Studio Brand */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left focus:outline-none cursor-pointer py-1 group transition-transform active:scale-95"
          aria-label="Soul Dance Studio Home"
        >
          <Logo size="xs" layout="stacked" showTagline={false} className="sm:hidden" />
          <Logo size="sm" layout="stacked" showTagline={false} className="hidden sm:inline-flex" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white bg-white/10 border border-white/10'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Area */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Student Portal / Pay Fees Button */}
          {currentStudent ? (
            <button
              id="nav-dashboard-active-btn"
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'bg-[#ff5a1f] text-neutral-950 border-[#ff5a1f] shadow-sm font-bold'
                  : 'border-white/20 text-neutral-200 bg-white/5 hover:bg-white/10'
              }`}
            >
              <User className="w-4 h-4 text-[#ff5a1f]" />
              <span>{currentStudent.name.split(' ')[0]}'s Portal</span>
              {currentStudent.currentDue.status !== 'Paid' && (
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </button>
          ) : (
            <button
              id="nav-student-login-btn"
              onClick={() => {
                onOpenLogin();
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-white/10 transition-colors border border-white/10 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-neutral-400" />
              <span>Student Login</span>
            </button>
          )}

          {/* Quick Pay Dues CTA */}
          <button
            id="nav-quick-pay-btn"
            onClick={() => handleNavClick('pay')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/15 transition-colors cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-orange-400" />
            <span>Pay Dues</span>
          </button>

          {/* Book Free Trial Button */}
          <button
            id="nav-book-trial-cta"
            onClick={() => handleNavClick('book-trial')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black text-neutral-950 bg-[#ff5a1f] hover:bg-[#ff6d37] active:scale-98 transition-all shadow-md cursor-pointer uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-neutral-950 fill-neutral-950" />
            <span>Book Free Trial</span>
          </button>
        </div>

        {/* Mobile menu hamburger button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            id="nav-mobile-book-trial-cta"
            onClick={() => handleNavClick('book-trial')}
            className="px-3 py-1.5 rounded-lg text-xs font-black text-neutral-950 bg-[#ff5a1f] hover:bg-[#ff6d37]"
          >
            Trial
          </button>
          <button
            id="nav-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-neutral-300 hover:bg-white/10 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-white/10 bg-[#18181b] px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => handleNavClick('book-trial')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#ff5a1f] text-neutral-950 font-bold text-xs shadow-sm"
            >
              <Sparkles className="w-4 h-4 fill-neutral-950" />
              <span>Book Free Trial</span>
            </button>

            <button
              onClick={() => handleNavClick('pay')}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 border border-white/10 text-neutral-200 font-bold text-xs"
            >
              <CreditCard className="w-4 h-4 text-orange-400" />
              <span>Pay Fees</span>
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === link.id
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => {
                if (currentStudent) {
                  handleNavClick('dashboard');
                } else {
                  onOpenLogin();
                  setMobileMenuOpen(false);
                }
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-orange-300 bg-orange-950/40 border border-orange-500/30 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-orange-400" />
                {currentStudent ? `Student Portal (${currentStudent.name})` : 'Student / Parent Login'}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-orange-500 text-black font-mono">
                OTP
              </span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white flex items-center gap-2 pt-2"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Studio Owner Billing View (Admin)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
