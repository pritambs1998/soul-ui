import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Logo } from './Logo';
import { Student, ClassProgram, PaymentRecord } from '../types';
import { PROGRAMS, STUDIO_INFO } from '../data/studioData';
import { generateAndDownloadReceipt } from '../utils/pdfReceipt';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Download,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Info,
  Lock,
  Clock,
  Phone,
  User,
  ArrowUpRight,
} from 'lucide-react';

interface FeePaymentViewProps {
  currentStudent: Student | null;
  initialProgramId?: string;
  initialCycle?: 'Monthly' | 'Quarterly' | 'One-Time';
  onPaymentSuccess: (student: Student, payment: PaymentRecord) => void;
  onNavigate: (tab: string) => void;
  onOpenLogin: () => void;
}

export const FeePaymentView: React.FC<FeePaymentViewProps> = ({
  currentStudent,
  initialProgramId,
  initialCycle = 'Monthly',
  onPaymentSuccess,
  onNavigate,
  onOpenLogin,
}) => {
  // If student is logged in with active due, default to that
  const hasActiveDue = currentStudent && currentStudent.currentDue.status !== 'Paid';

  const [paymentType, setPaymentType] = useState<'due' | 'program'>(
    hasActiveDue ? 'due' : 'program'
  );

  const [selectedProgramId, setSelectedProgramId] = useState<string>(
    initialProgramId || PROGRAMS[0].id
  );
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Quarterly'>('Monthly');

  // Contact details for receipt
  const [payerName, setPayerName] = useState(currentStudent?.name || '');
  const [payerPhone, setPayerPhone] = useState(currentStudent?.phone || '');
  const [payerEmail, setPayerEmail] = useState(currentStudent?.email || '');

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [completedPayment, setCompletedPayment] = useState<PaymentRecord | null>(null);

  // Sync if student changes
  useEffect(() => {
    if (currentStudent) {
      setPayerName(currentStudent.name);
      setPayerPhone(currentStudent.phone);
      setPayerEmail(currentStudent.email || '');
      if (currentStudent.currentDue.status !== 'Paid') {
        setPaymentType('due');
      }
    }
  }, [currentStudent]);

  const selectedProgram =
    PROGRAMS.find((p) => p.id === selectedProgramId) || PROGRAMS[0];

  // Calculate amount
  const calculatedAmount =
    paymentType === 'due' && currentStudent && hasActiveDue
      ? currentStudent.currentDue.amount
      : billingCycle === 'Monthly'
      ? selectedProgram.feeMonthly
      : selectedProgram.feeQuarterly;

  const paymentTitle =
    paymentType === 'due' && currentStudent && hasActiveDue
      ? currentStudent.currentDue.title
      : `${selectedProgram.title} - ${billingCycle} Membership`;

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!payerName.trim() || !payerPhone.trim()) {
      setErrorMessage('Please provide student name and mobile number.');
      return;
    }

    const cleanPhone = payerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create Server-Side Razorpay Order
      const orderRes = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: currentStudent?.id,
          studentName: payerName,
          phone: cleanPhone,
          email: payerEmail,
          programId: paymentType === 'program' ? selectedProgram.id : undefined,
          billingCycle,
          description: paymentTitle,
          isDuePayment: paymentType === 'due',
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || 'Failed to create payment order.');
      }

      // Check if Razorpay Checkout script is loaded
      const Razorpay = (window as any).Razorpay;

      if (typeof Razorpay === 'undefined' || orderData.isTestMode) {
        // Fallback or Test simulation flow if keys aren't configured or test mode
        console.log('Using simulated test verification flow:', orderData);
        await handleVerificationSuccess({
          razorpay_order_id: orderData.orderId,
          razorpay_payment_id: `pay_test_${Date.now()}`,
          razorpay_signature: 'test_signature_valid',
          studentId: currentStudent?.id || orderData.studentId,
          amount: orderData.amount,
          description: paymentTitle,
          studentName: payerName,
          phone: cleanPhone,
          email: payerEmail,
        });
        return;
      }

      // Open Real Razorpay Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.order.amount,
        currency: orderData.currency || 'INR',
        name: 'Soul Dance Studio',
        description: paymentTitle,
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=120&q=80',
        order_id: orderData.orderId,
        prefill: {
          name: payerName,
          contact: cleanPhone,
          email: payerEmail || 'student@souldancestudio.in',
        },
        theme: {
          color: '#ff5a1f',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
        handler: async (response: any) => {
          await handleVerificationSuccess({
            ...response,
            studentId: currentStudent?.id || orderData.studentId,
            amount: orderData.amount,
            description: paymentTitle,
            studentName: payerName,
            phone: cleanPhone,
            email: payerEmail,
          });
        },
      };

      const rzp = new Razorpay(options);
      rzp.on('payment.failed', (failRes: any) => {
        setIsProcessing(false);
        setErrorMessage(
          failRes.error?.description || 'Payment was declined. Please try again.'
        );
      });
      rzp.open();
    } catch (err: any) {
      console.error('Payment initialization error:', err);
      setErrorMessage(err.message || 'Payment system error. Please contact studio desk.');
      setIsProcessing(false);
    }
  };

  const handleVerificationSuccess = async (payload: any) => {
    try {
      const verifyRes = await fetch('/api/razorpay/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        throw new Error(verifyData.error || 'Payment signature verification failed.');
      }

      // Success
      setCompletedPayment(verifyData.payment);
      if (verifyData.student) {
        onPaymentSuccess(verifyData.student, verifyData.payment);
      }

      // Fire confetti
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff5a1f', '#10b981', '#ffffff'],
        });
      } catch (e) {}
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not verify payment. Please contact studio.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-[#141416] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {completedPayment ? (
          // Payment Success Receipt Screen
          <div className="bg-[#1c1c20] rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <span className="text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">
                Payment Received
              </span>
              <h2
                className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
              >
                THANK YOU! 🎉
              </h2>
              <p className="text-neutral-300 text-sm font-light">
                Your payment for <strong>{completedPayment.description}</strong> has been confirmed.
              </p>
            </div>

            {/* Receipt Info Box */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-left text-xs space-y-2 text-neutral-300 font-mono">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-neutral-400">Receipt No:</span>
                <strong className="text-white">
                  {completedPayment.receiptNumber}
                </strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-neutral-400">Razorpay Payment ID:</span>
                <span className="text-neutral-200">
                  {completedPayment.razorpayPaymentId}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-neutral-400">Student Name:</span>
                <strong className="text-white">{payerName}</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-neutral-400">Amount Paid:</span>
                <strong className="text-emerald-400 font-bold text-sm">
                  ₹{completedPayment.amount.toLocaleString('en-IN')}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Date & Time:</span>
                <span className="text-neutral-300">
                  {new Date(completedPayment.date).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Actions: Download PDF & View Dashboard */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (currentStudent) {
                    generateAndDownloadReceipt(completedPayment, currentStudent);
                  } else {
                    generateAndDownloadReceipt(completedPayment, {
                      id: 'std_guest',
                      name: payerName,
                      phone: payerPhone,
                      email: payerEmail,
                      enrolledClasses: [selectedProgram.title],
                      batchTimings: ['Regular Batch'],
                      joinDate: new Date().toISOString().split('T')[0],
                      currentDue: {
                        amount: 0,
                        dueDate: '',
                        billingCycle: 'Monthly',
                        status: 'Paid',
                        title: completedPayment.description,
                      },
                    });
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Official PDF Receipt</span>
              </button>

              <button
                onClick={() => onNavigate('dashboard')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-white/15"
              >
                <span>Go to Student Portal</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          // Main Payment Form
          <div className="bg-[#1c1c20] rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl space-y-8">
            <div className="space-y-3 text-center max-w-xl mx-auto flex flex-col items-center">
              <Logo size="sm" layout="stacked" showTagline={false} className="mb-2" />
              <span className="text-[#ff5a1f] font-mono font-bold text-xs tracking-wider uppercase">
                Online Fee Portal
              </span>
              <h1
                className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight"
                style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
              >
                SECURE FEE PAYMENT
              </h1>
              <p className="text-neutral-400 text-xs sm:text-sm font-light">
                Pay monthly or quarterly studio dues via UPI (GPay, PhonePe, Paytm), RuPay, Credit/Debit Cards, or Netbanking.
              </p>
            </div>

            {/* Student Status banner if not logged in */}
            {!currentStudent && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-[#ff5a1f] shrink-0" />
                  <div className="text-xs text-neutral-300">
                    <span className="font-bold block text-white font-mono">Enrolled Student or Parent?</span>
                    <span className="font-light">Sign in with your mobile number to view specific pending dues.</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="shrink-0 px-4 py-2 rounded-xl bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Sign In
                </button>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handlePayNow} className="space-y-6 max-w-2xl mx-auto">
              {/* Payment Type Selection (if logged in with due) */}
              {hasActiveDue && (
                <div className="p-1 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-2 text-xs font-bold uppercase tracking-wider">
                  <button
                    type="button"
                    onClick={() => setPaymentType('due')}
                    className={`py-2.5 rounded-xl transition-all cursor-pointer ${
                      paymentType === 'due'
                        ? 'bg-[#ff5a1f] text-neutral-950 shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Clear Current Due (₹{currentStudent.currentDue.amount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentType('program')}
                    className={`py-2.5 rounded-xl transition-all cursor-pointer ${
                      paymentType === 'program'
                        ? 'bg-[#ff5a1f] text-neutral-950 shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Other Program / Renewal
                  </button>
                </div>
              )}

              {/* Program & Cycle Selectors (when not paying specific active due) */}
              {paymentType === 'program' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                      Select Program / Class
                    </label>
                    <select
                      value={selectedProgramId}
                      onChange={(e) => setSelectedProgramId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                    >
                      {PROGRAMS.map((p) => (
                        <option key={p.id} value={p.id} className="bg-[#1c1c20] text-white">
                          {p.title} — ₹{p.feeMonthly.toLocaleString('en-IN')}/mo ({p.level})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Billing Cycle Radio */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                      Billing Cycle
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setBillingCycle('Monthly')}
                        className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                          billingCycle === 'Monthly'
                            ? 'border-[#ff5a1f] bg-[#ff5a1f]/10 ring-1 ring-[#ff5a1f]'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                          Monthly
                        </span>
                        <span className="text-lg font-black font-mono text-[#ff5a1f] mt-1 block">
                          ₹{selectedProgram.feeMonthly.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">Renewed every 30 days</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBillingCycle('Quarterly')}
                        className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                          billingCycle === 'Quarterly'
                            ? 'border-[#ff5a1f] bg-[#ff5a1f]/10 ring-1 ring-[#ff5a1f]'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                            Quarterly (3 Mo)
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                            Save ₹{selectedProgram.feeMonthly * 3 - selectedProgram.feeQuarterly}
                          </span>
                        </div>
                        <span className="text-lg font-black font-mono text-orange-400 mt-1 block">
                          ₹{selectedProgram.feeQuarterly.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">Best value for consistency</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Payer Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                    Student / Payer Name <span className="text-orange-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                    WhatsApp Mobile Number <span className="text-orange-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="text-xs text-orange-400 font-mono font-bold absolute left-3.5 top-3.5">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="98321 00000"
                      maxLength={10}
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                  Email for Tax Invoice (Optional)
                </label>
                <input
                  type="email"
                  placeholder="student@example.com"
                  value={payerEmail}
                  onChange={(e) => setPayerEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                />
              </div>

              {/* Total Summary Box */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400 font-mono uppercase tracking-wider block">
                    Total Payable Amount
                  </span>
                  <span className="text-2xl font-mono font-bold text-white">
                    ₹{calculatedAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="text-right text-[11px] text-neutral-400 font-mono">
                  <span className="block font-bold text-emerald-400">
                    Zero Surcharge
                  </span>
                  <span>Automated GST invoice</span>
                </div>
              </div>

              {/* Submit Pay Button */}
              <button
                id="razorpay-checkout-submit-btn"
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] active:scale-98 text-neutral-950 font-black text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isProcessing ? (
                  <span>Connecting to Razorpay Gateway...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-neutral-950" />
                    <span>Proceed to Pay ₹{calculatedAmount.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-neutral-400 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Razorpay 256-Bit SSL Encrypted
                </span>
                <span>•</span>
                <span>UPI (GPay / PhonePe / Paytm)</span>
                <span>•</span>
                <span>RuPay & Cards</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
