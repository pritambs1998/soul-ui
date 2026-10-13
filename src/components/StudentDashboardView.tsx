import React, { useState } from 'react';
import { Student, PaymentRecord } from '../types';
import { generateAndDownloadReceipt } from '../utils/pdfReceipt';
import { SoulEmblemBadge } from './Logo';
import {
  CreditCard,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  LogOut,
  Bell,
  RefreshCw,
  ArrowUpRight,
} from 'lucide-react';

interface StudentDashboardViewProps {
  student: Student;
  onLogout: () => void;
  onPayDues: () => void;
  onRefreshStudent: () => void;
}

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({
  student,
  onLogout,
  onPayDues,
  onRefreshStudent,
}) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (payment: PaymentRecord) => {
    setDownloadingId(payment.id);
    try {
      generateAndDownloadReceipt(payment, student);
    } catch (err) {
      console.error('PDF generation error:', err);
    } finally {
      setTimeout(() => setDownloadingId(null), 600);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Fees Paid
          </span>
        );
      case 'Due':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950 text-amber-400 border border-amber-500/40 animate-pulse">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Payment Due
          </span>
        );
      case 'Overdue':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-950 text-rose-400 border border-rose-500/40">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            Payment Overdue
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#141416] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
        {/* Top Welcome Card */}
        <div className="bg-[#1c1c20] rounded-3xl border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <SoulEmblemBadge className="w-14 h-14" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {student.name}
                </h1>
                {getStatusBadge(student.currentDue.status)}
              </div>
              <p className="text-xs text-neutral-400 mt-1 flex flex-wrap items-center gap-3 font-mono">
                <span className="flex items-center gap-1 text-[#ff5a1f]">
                  <Phone className="w-3 h-3" /> +91 {student.phone}
                </span>
                {student.guardianName && (
                  <span>• Guardian: {student.guardianName}</span>
                )}
                <span>• Enrolled: {student.enrolledClasses.join(', ')}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onRefreshStudent}
              title="Refresh Account Data"
              className="p-2.5 rounded-xl border border-white/15 text-neutral-300 hover:bg-white/10 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">Refresh</span>
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2.5 rounded-xl border border-white/15 text-neutral-300 hover:bg-white/10 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5 text-neutral-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Grid: Current Fee Dues Card & Enrolled Batches */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Due Box */}
          <div
            id="current-due-box"
            className="lg:col-span-2 rounded-3xl p-6 sm:p-8 border border-white/10 bg-[#1c1c20] flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#ff5a1f]">
                  Current Fee Schedule
                </span>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-neutral-300 border border-white/10">
                  {student.currentDue.billingCycle} Cycle
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h3
                    className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white"
                    style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
                  >
                    ₹{student.currentDue.amount.toLocaleString('en-IN')}
                  </h3>
                  <p className="text-sm text-neutral-300 mt-1 font-light">
                    {student.currentDue.title}
                  </p>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <span className="text-xs text-neutral-400 block uppercase">Due Date</span>
                  <span className="text-sm font-bold text-white">
                    {new Date(student.currentDue.dueDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {student.currentDue.status === 'Paid' ? (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Your fees are fully up to date for this period! Thank you for staying consistent on the floor.
                  </span>
                </div>
              ) : student.currentDue.status === 'Overdue' ? (
                <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>
                    This payment was due on {student.currentDue.dueDate}. Please clear dues to avoid batch pause.
                  </span>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Upcoming fee cycle due on {student.currentDue.dueDate}. Clear online via UPI or Cards in seconds.
                  </span>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              {student.currentDue.status !== 'Paid' ? (
                <button
                  id="pay-current-dues-btn"
                  onClick={onPayDues}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs uppercase tracking-wider shadow-lg active:scale-98 transition-all cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay ₹{student.currentDue.amount.toLocaleString('en-IN')} Online Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onPayDues}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 text-[#ff5a1f]" />
                  <span>Pay Upcoming Advance / Workshop Fee</span>
                </button>
              )}

              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Razorpay 256-bit Secure</span>
              </div>
            </div>
          </div>

          {/* Enrolled Classes & Batch Times */}
          <div className="bg-[#1c1c20] rounded-3xl border border-white/10 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#ff5a1f]" />
                <span>Enrolled Batches</span>
              </h3>

              <div className="space-y-2.5">
                {student.enrolledClasses.map((cls, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-xs font-bold text-white block">{cls}</span>
                    <p className="text-[11px] text-neutral-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-[#ff5a1f]" />
                      <span>{student.batchTimings[idx] || 'Regular Studio Batch'}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-neutral-300 space-y-1">
              <strong className="block font-mono text-[#ff5a1f] uppercase tracking-wider">Studio Etiquette:</strong>
              <p className="text-neutral-400 font-light">
                Indoor non-marking shoes on the wooden floor. Arrive 10 minutes early to warm up.
              </p>
            </div>
          </div>
        </div>

        {/* Payment History & Downloadable Receipts */}
        <div className="bg-[#1c1c20] rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-white">
                Payment History & Invoices
              </h2>
              <p className="text-xs text-neutral-400 font-light mt-0.5">
                Download GST-compliant PDF receipts for all past online & studio payments.
              </p>
            </div>

            <span className="text-xs text-neutral-400 font-mono">
              {student.paymentHistory?.length || 0} Transactions
            </span>
          </div>

          {student.paymentHistory && student.paymentHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider">
                    <th className="pb-3 pr-4 font-normal">Receipt No</th>
                    <th className="pb-3 pr-4 font-normal">Date</th>
                    <th className="pb-3 pr-4 font-normal">Description</th>
                    <th className="pb-3 pr-4 font-normal">Amount</th>
                    <th className="pb-3 pr-4 font-normal">Method</th>
                    <th className="pb-3 pr-4 font-normal">Status</th>
                    <th className="pb-3 text-right font-normal">Invoice PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {student.paymentHistory.map((p) => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 pr-4 text-white font-bold">
                        {p.receiptNumber || `SDS-${p.id}`}
                      </td>
                      <td className="py-3.5 pr-4 text-neutral-300">
                        {new Date(p.date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3.5 pr-4 text-neutral-200">
                        {p.description}
                      </td>
                      <td className="py-3.5 pr-4 font-bold text-[#ff5a1f]">
                        ₹{p.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                          {p.method}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4">
                        {p.status === 'captured' ? (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Paid
                          </span>
                        ) : (
                          <span className="text-neutral-400 capitalize">{p.status}</span>
                        )}
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => handleDownload(p)}
                          disabled={downloadingId === p.id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors cursor-pointer disabled:opacity-50 border border-white/15"
                        >
                          <Download className="w-3.5 h-3.5 text-[#ff5a1f]" />
                          <span>{downloadingId === p.id ? 'Generating...' : 'PDF'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 space-y-2 text-neutral-400">
              <FileText className="w-10 h-10 mx-auto text-neutral-600" />
              <p className="text-xs font-mono">No previous payment receipts found for this account.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
