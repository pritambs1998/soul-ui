export type FeeStatus = 'Paid' | 'Due' | 'Overdue';

export type PaymentMethod = 'UPI' | 'Card' | 'Netbanking' | 'Wallet' | 'Cash/Manual' | 'Razorpay';

export interface PaymentRecord {
  id: string;
  orderId?: string;
  paymentId: string;
  amount: number;
  date: string;
  method: PaymentMethod;
  status: 'captured' | 'refunded' | 'failed' | 'pending';
  receiptNumber: string;
  description: string;
  studentName: string;
  studentPhone: string;
  className?: string;
  refundId?: string;
  refundAmount?: number;
  refundReason?: string;
}

export interface Student {
  id: string;
  name: string;
  phone: string;
  email: string;
  age?: number;
  guardianName?: string;
  enrolledClasses: string[];
  batchTimings: string[];
  joinDate: string;
  currentDue: {
    amount: number;
    dueDate: string;
    billingCycle: 'Monthly' | 'Quarterly' | 'One-Time';
    status: FeeStatus;
    title: string;
  };
  lastReminderSent?: string;
  paymentHistory: PaymentRecord[];
}

export interface ClassProgram {
  id: string;
  title: string;
  tagline?: string;
  disciplines?: string;
  category: 'Dance' | 'Fitness' | 'Kids' | 'Specialty';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  ageGroup: string;
  timings: string[];
  description: string;
  benefits: string[];
  feeMonthly: number;
  feeQuarterly: number;
  batchCapacity: string;
  badge?: string;
  accentColor: string;
  image: string;
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  experience: string;
  bio: string;
  favoriteQuote: string;
  photo: string;
  instagram?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  classTaken: string;
  image?: string;
  avatarBg: string;
}

export interface TrialBooking {
  id: string;
  studentName: string;
  phone: string;
  email?: string;
  age: string;
  classOfInterest: string;
  preferredSlot: string;
  notes?: string;
  status: 'confirmed' | 'contacted' | 'attended';
  createdAt: string;
}

export interface WebhookLog {
  id: string;
  event: string;
  timestamp: string;
  paymentId?: string;
  orderId?: string;
  amount?: number;
  status: string;
  payloadSnippet: string;
}

export interface CorporatePackage {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  idealFor: string;
  modules: string[];
  description: string;
  features: string[];
  startingPrice: string;
  badge?: string;
  image: string;
}
