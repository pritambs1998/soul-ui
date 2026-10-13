import React, { useState, useEffect } from 'react';
import { Student, PaymentRecord } from '../types';
import { STUDIO_INFO } from '../data/studioData';
import {
  ShieldCheck,
  Lock,
  Search,
  Filter,
  Download,
  Printer,
  Plus,
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Users,
  RefreshCw,
  Eye,
  Calendar,
  ArrowUpRight,
} from 'lucide-react';

interface AdminBillingViewProps {
  onRefreshGlobal?: () => void;
}

export const AdminBillingView: React.FC<AdminBillingViewProps> = ({ onRefreshGlobal }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard state
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [summary, setSummary] = useState({
    totalCollected: 0,
    totalPending: 0,
    paidCount: 0,
    overdueCount: 0,
    dueCount: 0,
    totalStudents: 0,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Due' | 'Overdue'>('All');

  // Manual Payment Modal
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualForm, setManualForm] = useState({
    studentId: '',
    amount: '',
    method: 'Cash',
    description: 'Monthly Studio Fee',
    notes: 'Paid at Bidhannagar studio desk',
  });
  const [manualSubmitting, setManualSubmitting] = useState(false);

  // Check saved session
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('sds_admin_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchBillingData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'soul2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('sds_admin_auth', 'true');
      setAuthError('');
      fetchBillingData();
    } else {
      setAuthError('Incorrect passcode. Enter demo code: soul2026');
    }
  };

  const fetchBillingData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/billing-summary');
      const data = await res.json();
      if (res.ok) {
        setStudents(data.students || []);
        setPayments(data.payments || []);
        setSummary(data.summary || summary);
      }
    } catch (err) {
      console.error('Failed to load admin billing data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.studentId || !manualForm.amount) return;

    setManualSubmitting(true);
    try {
      const res = await fetch('/api/admin/record-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: manualForm.studentId,
          amount: Number(manualForm.amount),
          method: manualForm.method,
          description: manualForm.description,
          notes: manualForm.notes,
        }),
      });

      if (res.ok) {
        setShowManualModal(false);
        setManualForm({
          studentId: '',
          amount: '',
          method: 'Cash',
          description: 'Monthly Studio Fee',
          notes: 'Paid at Bidhannagar studio desk',
        });
        await fetchBillingData();
        if (onRefreshGlobal) onRefreshGlobal();
      }
    } catch (err) {
      console.error('Failed to submit manual payment:', err);
    } finally {
      setManualSubmitting(false);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'Student ID',
      'Name',
      'Phone',
      'Enrolled Classes',
      'Due Amount',
      'Due Date',
      'Fee Status',
    ];
    const rows = students.map((s) => [
      s.id,
      `"${s.name}"`,
      s.phone,
      `"${s.enrolledClasses.join('; ')}"`,
      s.currentDue.amount,
      s.currentDue.dueDate,
      s.currentDue.status,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Soul_Dance_Studio_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.includes(searchQuery) ||
      s.enrolledClasses.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'All' || s.currentDue.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="bg-[#141416] text-white min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-[#1c1c20] rounded-3xl border border-white/10 p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#ff5a1f]/10 border border-[#ff5a1f]/30 flex items-center justify-center text-[#ff5a1f] mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div className="text-center space-y-1">
            <span className="text-xs font-mono text-[#ff5a1f] uppercase tracking-wider">Internal Studio Tools</span>
            <h2
              className="text-2xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
            >
              ADMIN BILLING DESK
            </h2>
            <p className="text-xs text-neutral-400 font-light">
              Restricted to Soul Dance Studio management and accounts desk.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-medium">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Enter password (default: soul2026)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#222226] border border-white/15 text-sm text-white focus:ring-2 focus:ring-[#ff5a1f] outline-none font-mono"
              />
              <p className="text-[10px] text-neutral-500 font-mono pt-1">
                Demo access hint: <strong className="text-orange-400">soul2026</strong>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Access Billing Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#141416] text-white min-h-screen py-10 sm:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 space-y-8 print:p-0">
        {/* Top Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 print:hidden">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#ff5a1f]" />
              <h1
                className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
              >
                STUDIO BILLING DESK
              </h1>
            </div>
            <p className="text-xs text-neutral-400 mt-1 font-light">
              Real-time fee tracking, automated WhatsApp reminders, and desk cash collection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={fetchBillingData}
              title="Refresh Data"
              className="p-2.5 rounded-xl border border-white/15 hover:bg-white/10 text-neutral-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Sync</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2.5 rounded-xl border border-white/15 hover:bg-white/10 text-neutral-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#ff5a1f]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2.5 rounded-xl border border-white/15 hover:bg-white/10 text-neutral-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#ff5a1f]" />
              <span>Print Ledger</span>
            </button>

            <button
              onClick={() => setShowManualModal(true)}
              className="px-4 py-2.5 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4 text-neutral-950" />
              <span>Record Offline Fee</span>
            </button>
          </div>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Total Collected */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#1c1c20] border border-white/10 shadow-lg space-y-1">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              Total Collections
            </span>
            <h3 className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">
              ₹{summary.totalCollected.toLocaleString('en-IN')}
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">Razorpay + Studio Cash</p>
          </div>

          {/* Total Pending / Overdue */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#1c1c20] border border-white/10 shadow-lg space-y-1">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              Pending / Overdue
            </span>
            <h3 className="text-2xl sm:text-3xl font-mono font-bold text-rose-400">
              ₹{summary.totalPending.toLocaleString('en-IN')}
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">
              {summary.overdueCount} overdue • {summary.dueCount} upcoming
            </p>
          </div>

          {/* Paid Students Count */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#1c1c20] border border-white/10 shadow-lg space-y-1">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              Active Paid Members
            </span>
            <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white">
              {summary.paidCount}{' '}
              <span className="text-sm font-normal text-neutral-500">
                / {summary.totalStudents}
              </span>
            </h3>
            <p className="text-[11px] text-emerald-400 font-mono">
              {Math.round((summary.paidCount / (summary.totalStudents || 1)) * 100)}% on schedule
            </p>
          </div>

          {/* Overdue Alert Count */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#1c1c20] border border-white/10 shadow-lg space-y-1">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
              Requires Follow-Up
            </span>
            <h3 className="text-2xl sm:text-3xl font-mono font-bold text-[#ff5a1f]">
              {summary.overdueCount} Students
            </h3>
            <p className="text-[11px] text-neutral-500 font-mono">Send 1-click WhatsApp note</p>
          </div>
        </div>

        {/* Student Fees Table & Search / Filter Controls */}
        <div className="bg-[#1c1c20] rounded-3xl border border-white/10 shadow-xl overflow-hidden space-y-4 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by student, phone, or class..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#222226] border border-white/15 text-xs text-white placeholder-neutral-500 focus:ring-2 focus:ring-[#ff5a1f] outline-none font-mono"
              />
            </div>

            {/* Status Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {(['All', 'Overdue', 'Due', 'Paid'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-colors ${
                    statusFilter === status
                      ? 'bg-[#ff5a1f] text-neutral-950'
                      : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider">
                  <th className="pb-3 pr-4 font-normal">Student</th>
                  <th className="pb-3 pr-4 font-normal">Mobile & Batches</th>
                  <th className="pb-3 pr-4 font-normal">Cycle</th>
                  <th className="pb-3 pr-4 font-normal">Due Amount</th>
                  <th className="pb-3 pr-4 font-normal">Due Date</th>
                  <th className="pb-3 pr-4 font-normal">Fee Status</th>
                  <th className="pb-3 text-right font-normal">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredStudents.map((s) => {
                  const isOverdue = s.currentDue.status === 'Overdue';
                  const isDue = s.currentDue.status === 'Due';

                  const reminderMsg = `Hi ${s.name}, warm greetings from Soul Dance Studio, Bidhannagar! Your fee of Rs. ${s.currentDue.amount} for "${s.currentDue.title}" was due on ${s.currentDue.dueDate}. Kindly pay online or visit the studio desk. Let's keep grooving!`;
                  const whatsappUrl = `https://wa.me/91${s.phone.replace(/\D/g, '')}?text=${encodeURIComponent(reminderMsg)}`;

                  return (
                    <tr key={s.id} className="hover:bg-white/5 transition-colors">
                      {/* Student Name */}
                      <td className="py-3.5 pr-4">
                        <div className="font-bold text-white">{s.name}</div>
                        {s.guardianName && (
                          <div className="text-[10px] text-neutral-400">
                            Guardian: {s.guardianName}
                          </div>
                        )}
                      </td>

                      {/* Phone & Batches */}
                      <td className="py-3.5 pr-4">
                        <div className="text-neutral-300">+91 {s.phone}</div>
                        <div className="text-[10px] text-neutral-400">
                          {s.enrolledClasses.join(', ')}
                        </div>
                      </td>

                      {/* Billing Cycle */}
                      <td className="py-3.5 pr-4 text-neutral-400">
                        {s.currentDue.billingCycle}
                      </td>

                      {/* Amount */}
                      <td className="py-3.5 pr-4 font-bold text-[#ff5a1f]">
                        ₹{s.currentDue.amount.toLocaleString('en-IN')}
                      </td>

                      {/* Due Date */}
                      <td className="py-3.5 pr-4 text-neutral-300">
                        {s.currentDue.dueDate || 'N/A'}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 pr-4">
                        {s.currentDue.status === 'Paid' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Paid
                          </span>
                        ) : isOverdue ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-400 text-[11px] font-bold border border-rose-500/30">
                            <AlertCircle className="w-3 h-3 text-rose-400" /> Overdue
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-400 text-[11px] font-bold border border-amber-500/30">
                            <Clock className="w-3 h-3 text-amber-400" /> Due
                          </span>
                        )}
                      </td>

                      {/* Owner Actions */}
                      <td className="py-3.5 text-right space-x-2">
                        {s.currentDue.status !== 'Paid' ? (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-[11px] font-bold border border-emerald-500/40 transition-colors"
                            title="Send pre-filled WhatsApp reminder"
                          >
                            <MessageCircle className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                            <span>WhatsApp</span>
                          </a>
                        ) : (
                          <span className="text-[11px] text-neutral-500 italic">
                            Settled
                          </span>
                        )}

                        <button
                          onClick={() => {
                            setManualForm({
                              studentId: s.id,
                              amount: String(s.currentDue.amount),
                              method: 'Cash',
                              description: s.currentDue.title || 'Studio Fee',
                              notes: `Manual settlement for ${s.name}`,
                            });
                            setShowManualModal(true);
                          }}
                          className="inline-flex items-center px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium transition-colors cursor-pointer border border-white/15"
                          title="Record payment"
                        >
                          + Record
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Manual Payment Recording Modal */}
        {showManualModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#1c1c20] text-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-white/10 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif font-bold text-lg text-white">
                  Record Offline / Cash Fee
                </h3>
                <button
                  onClick={() => setShowManualModal(false)}
                  className="text-neutral-400 hover:text-white text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleManualPaymentSubmit} className="space-y-4 font-mono text-xs">
                <div className="space-y-1">
                  <label className="block text-neutral-300 uppercase tracking-wider">
                    Select Student
                  </label>
                  <select
                    required
                    value={manualForm.studentId}
                    onChange={(e) => {
                      const selected = students.find((s) => s.id === e.target.value);
                      setManualForm({
                        ...manualForm,
                        studentId: e.target.value,
                        amount: selected ? String(selected.currentDue.amount) : manualForm.amount,
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#222226] border border-white/15 text-white focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                  >
                    <option value="" className="bg-[#1c1c20]">-- Choose Student --</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id} className="bg-[#1c1c20]">
                        {s.name} (+91 {s.phone}) — Due: ₹{s.currentDue.amount}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-neutral-300 uppercase tracking-wider">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={manualForm.amount}
                      onChange={(e) =>
                        setManualForm({ ...manualForm, amount: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#222226] border border-white/15 text-white focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-neutral-300 uppercase tracking-wider">
                      Payment Mode
                    </label>
                    <select
                      value={manualForm.method}
                      onChange={(e) =>
                        setManualForm({ ...manualForm, method: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#222226] border border-white/15 text-white focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                    >
                      <option value="Cash" className="bg-[#1c1c20]">Cash at Desk</option>
                      <option value="UPI" className="bg-[#1c1c20]">Direct UPI QR</option>
                      <option value="Bank Transfer" className="bg-[#1c1c20]">NEFT / Bank</option>
                      <option value="Cheque" className="bg-[#1c1c20]">Cheque</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-neutral-300 uppercase tracking-wider">
                    Description
                  </label>
                  <input
                    type="text"
                    value={manualForm.description}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, description: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#222226] border border-white/15 text-white focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-neutral-300 uppercase tracking-wider">
                    Notes
                  </label>
                  <input
                    type="text"
                    value={manualForm.notes}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, notes: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#222226] border border-white/15 text-white focus:ring-2 focus:ring-[#ff5a1f] outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowManualModal(false)}
                    className="px-4 py-2.5 rounded-full border border-white/15 text-neutral-300 hover:bg-white/10 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={manualSubmitting}
                    className="px-5 py-2.5 rounded-full bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-bold uppercase tracking-wider shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {manualSubmitting ? 'Recording...' : 'Save & Update Due'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
