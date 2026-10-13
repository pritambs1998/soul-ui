import React, { useState } from 'react';
import { Student } from '../types';
import { Logo } from './Logo';
import {
  Phone,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  User,
  ArrowUpRight,
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (student: Student) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [demoCodeHint, setDemoCodeHint] = useState('');

  if (!isOpen) return null;

  // Demo Presets for convenient reviewer testing
  const demoAccounts = [
    { name: 'Priya Sharma (Pending Due)', phone: '9832154720' },
    { name: 'Rahul Mukherjee (Paid)', phone: '9876543210' },
    { name: 'Ananya Das (Upcoming Due)', phone: '9123456780' },
  ];

  const handleSelectDemo = (p: string) => {
    setPhone(p);
    setErrorMsg('');
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP.');
      }

      setStep('otp');
      setDemoCodeHint(data.code || '123456');
      setOtp(data.code || '123456'); // Convenient auto-fill for testing
    } catch (err: any) {
      setErrorMsg(err.message || 'Error communicating with authentication server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!otp.trim()) {
      setErrorMsg('Please enter the 6-digit OTP.');
      return;
    }

    setIsSubmitting(true);
    try {
      const cleanPhone = phone.replace(/\D/g, '');
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, otp: otp.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid OTP code.');
      }

      // Successful login
      sessionStorage.setItem('sds_student_id', data.student.id);
      onLoginSuccess(data.student);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'OTP verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1c1c20] text-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-white/10 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <Logo size="xs" showTagline={false} />
          <div>
            <span className="text-[#ff5a1f] font-mono font-bold text-[10px] uppercase tracking-wider">
              Member Portal Access
            </span>
          </div>
          <h2
            className="text-2xl font-black uppercase tracking-tight text-white"
            style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
          >
            {step === 'phone' ? 'STUDENT & PARENT SIGN IN' : 'ENTER OTP CODE'}
          </h2>
          <p className="text-xs text-neutral-400 font-light">
            {step === 'phone'
              ? 'Access your fee schedule, download receipts, and view batch updates.'
              : `We sent a 6-digit verification code to +91 ${phone}.`}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                Registered Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-xs text-orange-400 font-mono font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="98321 00000"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] active:scale-98 text-neutral-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Sending OTP...</span>
              ) : (
                <>
                  <span>Send One-Time Password</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            {/* Demo Student Fast-Select Pills */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <span className="text-[11px] font-mono text-neutral-400 block uppercase tracking-wider">
                Demo Accounts (Quick Sign-In):
              </span>
              <div className="space-y-1.5">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.phone}
                    type="button"
                    onClick={() => handleSelectDemo(acc.phone)}
                    className="w-full text-left px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-white">{acc.name}</span>
                    <span className="font-mono text-neutral-400">+91 {acc.phone}</span>
                  </button>
                ))}
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                6-Digit Verification Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-widest font-mono text-xl py-3 rounded-xl bg-[#222226] border border-white/15 text-white focus:ring-2 focus:ring-[#ff5a1f] outline-none"
              />
              <p className="text-[11px] text-emerald-300 bg-emerald-950/60 p-2 rounded-xl border border-emerald-500/40 mt-1 font-mono">
                Demo code: <strong>{demoCodeHint || '123456'}</strong> (pre-filled for testing)
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] active:scale-98 text-neutral-950 font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Verifying Code...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify & Open Student Portal</span>
                </>
              )}
            </button>

            <div className="flex justify-between items-center text-xs pt-1 font-mono">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                ← Change Number
              </button>
              <button
                type="button"
                onClick={handleSendOtp}
                className="text-orange-400 hover:underline cursor-pointer"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
