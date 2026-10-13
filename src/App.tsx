import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ProgramsView } from './components/ProgramsView';
import { DanceRegularView } from './components/DanceRegularView';
import { SoulSyncView } from './components/SoulSyncView';
import { AboutView } from './components/AboutView';
import { InstructorsView } from './components/InstructorsView';
import { GalleryView } from './components/GalleryView';
import { BookTrialView } from './components/BookTrialView';
import { OrientationView } from './components/OrientationView';
import { StudentDashboardView } from './components/StudentDashboardView';
import { FeePaymentView } from './components/FeePaymentView';
import { AdminBillingView } from './components/AdminBillingView';
import { ContactView } from './components/ContactView';
import { LoginModal } from './components/LoginModal';
import { Student, ClassProgram, PaymentRecord } from './types';
import { PROGRAMS, STUDIO_INFO } from './data/studioData';
import { MessageCircle, Sparkles, X } from 'lucide-react';

export default function App() {
  // Navigation tabs: 'home' | 'programs' | 'about' | 'instructors' | 'gallery' | 'orientation' | 'contact' | 'book-trial' | 'dashboard' | 'pay' | 'admin'
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<ClassProgram>(PROGRAMS[0]);
  const [bookTrialInitialProgram, setBookTrialInitialProgram] = useState<string>('');
  const [payInitialCycle, setPayInitialCycle] = useState<'Monthly' | 'Quarterly' | 'One-Time'>('Monthly');
  const [programsInitialSegment, setProgramsInitialSegment] = useState<'dance' | 'soulsync' | 'corporate'>('dance');

  // Banner notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Restore session / sync hash
  useEffect(() => {
    // Check url hash
    const hash = window.location.hash.replace('#', '');
    if (hash === 'dance') {
      setCurrentTab('dance');
    } else if (hash === 'soulsync') {
      setCurrentTab('soulsync');
    } else if (hash === 'corporate' || hash === 'retreat') {
      setProgramsInitialSegment('corporate');
      setCurrentTab('programs');
    } else if (hash) {
      setCurrentTab(hash);
    }

    // Try restoring logged in student
    const savedStudentId = sessionStorage.getItem('sds_student_id');
    if (savedStudentId) {
      fetchStudent(savedStudentId);
    }
  }, []);

  // Sync tab with URL hash
  const navigateTo = (tab: string, extra?: any) => {
    if (tab === 'dance') {
      setCurrentTab('dance');
      window.location.hash = 'dance';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (tab === 'soulsync') {
      setCurrentTab('soulsync');
      window.location.hash = 'soulsync';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (tab === 'corporate' || tab === 'retreat' || tab === 'soul-retreat') {
      setProgramsInitialSegment('corporate');
      setCurrentTab('programs');
      window.location.hash = 'corporate';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (extra?.segment) {
      setProgramsInitialSegment(extra.segment);
    }
    if (extra?.program) {
      setBookTrialInitialProgram(extra.program);
    }
    if (extra?.programId) {
      const found = PROGRAMS.find((p) => p.id === extra.programId);
      if (found) setSelectedProgram(found);
    }
    if (extra?.cycle) {
      setPayInitialCycle(extra.cycle);
    }

    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchStudent = async (studentId: string) => {
    try {
      const res = await fetch(`/api/students/${studentId}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentStudent(data.student);
      }
    } catch (err) {
      console.error('Error fetching student:', err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('sds_student_id');
    setCurrentStudent(null);
    setCurrentTab('home');
    setToastMessage('Signed out successfully.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePaymentSuccess = (student: Student, payment: PaymentRecord) => {
    setCurrentStudent(student);
    setToastMessage(`Payment of ₹${payment.amount} confirmed! Receipt generated.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#141416] text-white font-sans selection:bg-[#ff5a1f] selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 right-4 z-50 p-4 rounded-2xl bg-neutral-900 text-white shadow-xl text-xs font-semibold flex items-center gap-3 border border-white/20 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-[#ff5a1f] fill-[#ff5a1f] shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-neutral-400 hover:text-white cursor-pointer ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={navigateTo}
        currentStudent={currentStudent}
        onOpenLogin={() => setIsLoginModalOpen(true)}
      />

      {/* Page Content View Switcher */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={navigateTo}
            onSelectProgram={(prog) => setSelectedProgram(prog)}
          />
        )}

        {currentTab === 'dance' && (
          <DanceRegularView
            onNavigate={navigateTo}
            onSelectProgram={(prog) => setSelectedProgram(prog)}
          />
        )}

        {currentTab === 'soulsync' && (
          <SoulSyncView
            onNavigate={navigateTo}
            onSelectProgram={(prog) => setSelectedProgram(prog)}
          />
        )}

        {currentTab === 'programs' && (
          <ProgramsView
            initialSegment={programsInitialSegment}
            onNavigate={navigateTo}
            onSelectProgram={(prog) => setSelectedProgram(prog)}
          />
        )}

        {currentTab === 'about' && <AboutView onNavigate={navigateTo} />}

        {currentTab === 'instructors' && (
          <InstructorsView onNavigate={navigateTo} />
        )}

        {currentTab === 'gallery' && <GalleryView onNavigate={navigateTo} />}

        {currentTab === 'book-trial' && (
          <BookTrialView
            initialProgram={bookTrialInitialProgram}
            onNavigate={navigateTo}
          />
        )}

        {currentTab === 'orientation' && (
          <OrientationView onNavigate={navigateTo} />
        )}

        {currentTab === 'dashboard' && (
          <>
            {currentStudent ? (
              <StudentDashboardView
                student={currentStudent}
                onLogout={handleLogout}
                onPayDues={() => navigateTo('pay')}
                onRefreshStudent={() => {
                  if (currentStudent) fetchStudent(currentStudent.id);
                }}
              />
            ) : (
              <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ff5a1f]/20 text-[#ff5a1f] flex items-center justify-center mx-auto border border-[#ff5a1f]/40">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">
                  Student & Parent Portal
                </h2>
                <p className="text-xs text-neutral-400">
                  Please log in with your registered WhatsApp mobile number to access your dues and receipts.
                </p>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-6 py-3 rounded-xl bg-[#ff5a1f] hover:bg-[#ff6d37] text-neutral-950 font-bold text-xs cursor-pointer shadow-md uppercase tracking-wider"
                >
                  Open Login
                </button>
              </div>
            )}
          </>
        )}

        {currentTab === 'pay' && (
          <FeePaymentView
            currentStudent={currentStudent}
            initialProgramId={selectedProgram.id}
            initialCycle={payInitialCycle}
            onPaymentSuccess={handlePaymentSuccess}
            onNavigate={navigateTo}
            onOpenLogin={() => setIsLoginModalOpen(true)}
          />
        )}

        {currentTab === 'admin' && (
          <AdminBillingView
            onRefreshGlobal={() => {
              if (currentStudent) fetchStudent(currentStudent.id);
            }}
          />
        )}

        {currentTab === 'contact' && <ContactView />}
      </main>

      {/* Floating WhatsApp Quick-Chat Action */}
      <aside aria-label="Quick WhatsApp assistance" className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${STUDIO_INFO.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
            "Hello Soul Dance Studio! I have a question about classes and admissions."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          aria-label="Direct WhatsApp Chat"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-medium">
            Chat with Studio
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
        </a>
      </aside>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(student) => {
          setCurrentStudent(student);
          navigateTo('dashboard');
        }}
      />

      {/* Global Footer */}
      <Footer setCurrentTab={navigateTo} />
    </div>
  );
}
