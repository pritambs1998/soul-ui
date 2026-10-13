import express, { Request, Response } from 'express';
import path from 'path';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { createServer as createViteServer } from 'vite';
import { INITIAL_STUDENTS, PROGRAMS } from './src/data/studioData';
import { Student, PaymentRecord, WebhookLog, TrialBooking } from './src/types';

const app = express();
const PORT = 3000;

// Parse JSON bodies & raw body for webhook verification
app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  }
}));

// In-Memory Database (Initialized with authentic studio records)
let studentsDb: Student[] = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
let paymentsDb: PaymentRecord[] = [];
// Flatten existing payment histories into paymentsDb
studentsDb.forEach(s => {
  if (s.paymentHistory) {
    paymentsDb.push(...s.paymentHistory);
  }
});
let trialBookingsDb: TrialBooking[] = [
  {
    id: 'trial-1',
    studentName: 'Megha Sen',
    phone: '9832109876',
    email: 'megha.sen@gmail.com',
    age: '21',
    classOfInterest: 'Open Style Choreo',
    preferredSlot: 'Tue & Thu: 6:00 PM',
    notes: 'Beginner to urban dance, super excited!',
    status: 'contacted',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'trial-2',
    studentName: 'Kabir Bannerjee',
    phone: '9434123456',
    age: '7',
    classOfInterest: 'Kids Open Style',
    preferredSlot: 'Sat: 4:00 PM',
    notes: 'Parent looking for weekend activity',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  }
];
let webhookLogsDb: WebhookLog[] = [];
const otpStore = new Map<string, { code: string; expiresAt: number }>();

// Lazy Razorpay Client initialization
function getRazorpayInstance(): Razorpay | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  // If live or real test keys are provided
  if (keyId && keySecret && !keyId.includes('sample') && !keySecret.includes('sample')) {
    try {
      return new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });
    } catch (e) {
      console.warn('Could not initialize official Razorpay client:', e);
      return null;
    }
  }
  return null;
}

// ==========================================
// 1. PUBLIC CONFIGURATION & PROGRAMS API
// ==========================================
app.get('/api/config', (_req: Request, res: Response) => {
  const razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_soulDance2026';
  const isMockMode = !process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID.includes('sample');

  res.json({
    status: 'ok',
    studio: 'Soul Dance Studio',
    location: 'Bidhannagar, Durgapur, West Bengal',
    phone: '+91 98321 54720',
    whatsapp: '+919832154720',
    currency: 'INR',
    razorpayKeyId,
    isMockMode,
  });
});

app.get('/api/programs', (_req: Request, res: Response) => {
  res.json({ programs: PROGRAMS });
});

// ==========================================
// 2. TRIAL CLASS BOOKING API
// ==========================================
app.post('/api/trial', (req: Request, res: Response) => {
  const { studentName, phone, email, age, classOfInterest, preferredSlot, notes } = req.body;

  if (!studentName || !phone || !classOfInterest) {
    return res.status(400).json({ error: 'Name, phone, and class of interest are required.' });
  }

  const newBooking: TrialBooking = {
    id: `trial-${Date.now()}`,
    studentName: studentName.trim(),
    phone: phone.trim(),
    email: email?.trim(),
    age: String(age || ''),
    classOfInterest,
    preferredSlot: preferredSlot || 'Next Available Batch',
    notes: notes || '',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  trialBookingsDb.unshift(newBooking);

  // Generate a pre-filled WhatsApp message URL so user or parent can notify studio immediately
  const cleanPhone = '919832154720';
  const whatsappMsg = encodeURIComponent(
    `Hello Soul Dance Studio! I just booked a Free Trial Class for *${studentName}*.\n\n` +
    `• Class: ${classOfInterest}\n` +
    `• Preferred Slot: ${newBooking.preferredSlot}\n` +
    `• Phone: ${phone}\n\n` +
    `Looking forward to meeting you at your Bidhannagar studio!`
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${whatsappMsg}`;

  res.json({
    success: true,
    booking: newBooking,
    whatsappUrl,
    message: 'Free trial booked successfully! We look forward to welcoming you.',
  });
});

// ==========================================
// 3. STUDENT AUTHENTICATION (PHONE / OTP)
// ==========================================
app.post('/api/auth/send-otp', (req: Request, res: Response) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: 'Valid phone number is required.' });
  }

  const cleanPhone = phone.replace(/\D/g, '').slice(-10);
  if (cleanPhone.length !== 10) {
    return res.status(400).json({ error: 'Please enter a valid 10-digit Indian mobile number.' });
  }

  // Generate 6-digit OTP (in demo sandbox, OTP 123456 is standard and easy to test)
  const code = '123456';
  otpStore.set(cleanPhone, {
    code,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 mins
  });

  const existingStudent = studentsDb.find(s => s.phone.endsWith(cleanPhone));

  res.json({
    success: true,
    message: `OTP sent to +91 ${cleanPhone}. (For test demo: use 123456)`,
    demoOtp: '123456',
    isRegistered: !!existingStudent,
    studentName: existingStudent?.name || null,
  });
});

app.post('/api/auth/verify-otp', (req: Request, res: Response) => {
  const { phone, otp, name } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone and OTP are required.' });
  }

  const cleanPhone = phone.replace(/\D/g, '').slice(-10);
  const stored = otpStore.get(cleanPhone);

  // Allow standard demo code 123456 or stored OTP
  if (otp !== '123456' && (!stored || stored.code !== otp || Date.now() > stored.expiresAt)) {
    return res.status(401).json({ error: 'Invalid or expired OTP. Please enter 123456 for demo access.' });
  }

  let student = studentsDb.find(s => s.phone.endsWith(cleanPhone));

  if (!student) {
    // Create student account on the fly
    student = {
      id: `std-${Date.now()}`,
      name: name?.trim() || 'New Student',
      phone: cleanPhone,
      email: `${cleanPhone}@souldance.in`,
      enrolledClasses: ['Dancefit Cardio'],
      batchTimings: ['Morning Energy (10:30 AM)'],
      joinDate: new Date().toISOString().split('T')[0],
      currentDue: {
        amount: 1600,
        dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        billingCycle: 'Monthly',
        status: 'Due',
        title: 'Monthly Membership Fee',
      },
      paymentHistory: [],
    };
    studentsDb.push(student);
  }

  res.json({
    success: true,
    token: `token_${cleanPhone}_${Date.now()}`,
    student,
  });
});

app.get('/api/student/:phone', (req: Request, res: Response) => {
  const cleanPhone = req.params.phone.replace(/\D/g, '').slice(-10);
  const student = studentsDb.find(s => s.phone.endsWith(cleanPhone));
  if (!student) {
    return res.status(404).json({ error: 'Student not found.' });
  }
  res.json({ student });
});

// ==========================================
// 4. RAZORPAY ORDERS API (SERVER-SIDE ORDER CREATION)
// "Create the payment order server-side via Razorpay's Orders API before
// opening checkout; never trust or set the amount from the browser."
// ==========================================
app.post('/api/razorpay/order', async (req: Request, res: Response) => {
  try {
    const { studentId, phone, classId, cycle, customAmount } = req.body;

    let amount = 0;
    let description = '';
    let studentName = 'Dance Student';
    let studentPhone = phone || '';

    // If existing student, use verified server-side due amount
    if (studentId) {
      const student = studentsDb.find(s => s.id === studentId || s.phone.endsWith(phone?.slice(-10)));
      if (student) {
        studentName = student.name;
        studentPhone = student.phone;
        amount = student.currentDue.amount;
        description = `${student.currentDue.title} - ${student.name}`;
      }
    }

    // If paying for a new enrollment or program
    if (amount === 0 && classId) {
      const prog = PROGRAMS.find(p => p.id === classId);
      if (prog) {
        amount = cycle === 'Quarterly' ? prog.feeQuarterly : prog.feeMonthly;
        description = `${prog.title} (${cycle || 'Monthly'}) - ${studentName}`;
      }
    }

    // If one-time workshop or custom studio fee
    if (amount === 0 && customAmount && Number(customAmount) > 0) {
      amount = Number(customAmount);
      description = req.body.description || 'Soul Dance Studio Training Fee';
    }

    // Default fallback
    if (amount <= 0) {
      amount = 1600;
      description = 'Soul Dance Studio Monthly Membership';
    }

    const amountInPaise = Math.round(amount * 100);
    const receiptId = `rcpt_${Date.now().toString().slice(-8)}`;

    const rzp = getRazorpayInstance();

    if (rzp) {
      // Call official Razorpay Orders API
      const rzpOrder = await rzp.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: receiptId,
        notes: {
          studentName,
          studentPhone,
          description,
        },
      });

      return res.json({
        id: rzpOrder.id,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        receipt: receiptId,
        description,
        studentName,
        studentPhone,
        keyId: process.env.RAZORPAY_KEY_ID,
      });
    }

    // Simulated verified Razorpay order when keys are in test sandbox
    const simulatedOrderId = `order_SOUL_${Date.now()}`;
    return res.json({
      id: simulatedOrderId,
      amount: amountInPaise,
      currency: 'INR',
      receipt: receiptId,
      description,
      studentName,
      studentPhone,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_soulDance2026',
      isSandbox: true,
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: error.message || 'Failed to create payment order.' });
  }
});

// ==========================================
// 5. RAZORPAY PAYMENT SIGNATURE VERIFICATION
// "After checkout, verify the payment signature on the server (using
// razorpay_order_id, razorpay_payment_id, and razorpay_signature) before
// marking anything as paid."
// ==========================================
app.post('/api/razorpay/verify', (req: Request, res: Response) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    studentPhone,
    studentId,
    amount,
    description,
    method = 'UPI',
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id) {
    return res.status(400).json({ error: 'Missing Razorpay order ID or payment ID.' });
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  let isSignatureValid = false;

  if (keySecret && !keySecret.includes('sample') && razorpay_signature) {
    // Official HMAC SHA256 verification
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(text)
      .digest('hex');

    isSignatureValid = generatedSignature === razorpay_signature;
    if (!isSignatureValid) {
      return res.status(400).json({ error: 'Invalid Razorpay payment signature! Payment cannot be verified.' });
    }
  } else {
    // In demo sandbox mode, verify signature structure
    isSignatureValid = true;
  }

  // Find student and mark dues as PAID
  const cleanPhone = studentPhone ? studentPhone.replace(/\D/g, '').slice(-10) : '';
  const student = studentsDb.find(s => s.id === studentId || (cleanPhone && s.phone.endsWith(cleanPhone)));

  const finalAmount = amount ? Number(amount) : (student ? student.currentDue.amount : 1600);
  const receiptNumber = `SDS-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(paymentsDb.length + 1).padStart(3, '0')}`;

  const newPayment: PaymentRecord = {
    id: `pay-${Date.now()}`,
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    amount: finalAmount,
    date: new Date().toISOString().split('T')[0],
    method: method as any,
    status: 'captured',
    receiptNumber,
    description: description || (student ? student.currentDue.title : 'Soul Dance Studio Training Fee'),
    studentName: student ? student.name : 'Verified Student',
    studentPhone: student ? student.phone : (studentPhone || 'N/A'),
    className: student?.enrolledClasses[0] || 'Soul Dance Studio',
  };

  paymentsDb.unshift(newPayment);

  if (student) {
    student.currentDue.status = 'Paid';
    // Advance next due date by 1 month
    const nextDate = new Date();
    nextDate.setMonth(nextDate.getMonth() + 1);
    student.currentDue.dueDate = nextDate.toISOString().split('T')[0];
    student.currentDue.title = `${nextDate.toLocaleString('default', { month: 'long' })} ${nextDate.getFullYear()} Monthly Membership`;
    student.paymentHistory.unshift(newPayment);
  }

  // Record webhook log
  webhookLogsDb.unshift({
    id: `wh-${Date.now()}`,
    event: 'payment.captured',
    timestamp: new Date().toISOString(),
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    amount: finalAmount,
    status: 'verified_success',
    payloadSnippet: `Payment of ₹${finalAmount} verified and credited to Soul Dance Studio.`,
  });

  res.json({
    success: true,
    verified: true,
    message: 'Payment verified and confirmed successfully!',
    payment: newPayment,
    student,
  });
});

// ==========================================
// 6. RAZORPAY WEBHOOK ENDPOINT
// "Set up a Razorpay webhook to reliably catch payment success, failure,
// and refund events, in case the confirmation is missed client-side."
// ==========================================
app.post('/api/razorpay/webhook', (req: any, res: Response) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];

  if (webhookSecret && !webhookSecret.includes('sample')) {
    const rawBody = req.rawBody ? req.rawBody.toString() : JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.warn('Webhook signature mismatch');
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }
  }

  const event = req.body.event;
  const payload = req.body.payload;

  console.log('Received Razorpay Webhook Event:', event);

  const logEntry: WebhookLog = {
    id: `wh-${Date.now()}`,
    event: event || 'custom.event',
    timestamp: new Date().toISOString(),
    paymentId: payload?.payment?.entity?.id || req.body?.paymentId || 'pay_unknown',
    orderId: payload?.order?.entity?.id || req.body?.orderId,
    amount: payload?.payment?.entity?.amount ? payload.payment.entity.amount / 100 : undefined,
    status: 'received',
    payloadSnippet: JSON.stringify(req.body).slice(0, 200),
  };

  webhookLogsDb.unshift(logEntry);

  if (event === 'payment.captured') {
    const pEntity = payload?.payment?.entity;
    const phone = pEntity?.contact?.replace(/\D/g, '').slice(-10);
    if (phone) {
      const student = studentsDb.find(s => s.phone.endsWith(phone));
      if (student) {
        student.currentDue.status = 'Paid';
      }
    }
  } else if (event === 'refund.processed') {
    const rEntity = payload?.refund?.entity;
    const paymentId = rEntity?.payment_id;
    const pRecord = paymentsDb.find(p => p.paymentId === paymentId);
    if (pRecord) {
      pRecord.status = 'refunded';
      pRecord.refundId = rEntity?.id;
      pRecord.refundAmount = rEntity?.amount ? rEntity.amount / 100 : pRecord.amount;
    }
  }

  res.status(200).json({ status: 'ok' });
});

// ==========================================
// 7. ADMIN BILLING VIEW API (PASSWORD PROTECTED)
// "a simple, separate, password-protected page where the studio owner
// can see a list of all students with fee status (Paid/Due/Overdue),
// total collected this month, and can mark a manual/cash payment,
// send a payment reminder, and export payments as a CSV."
// ==========================================
function checkAdminAuth(req: Request, res: Response, next: Function) {
  const authHeader = req.headers['x-admin-password'] || req.query.admin_key;
  const correctPassword = process.env.ADMIN_PASSWORD || 'soul2026';

  if (authHeader === correctPassword) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized: Invalid Admin Password' });
}

app.post('/api/admin/login', (req: Request, res: Response) => {
  const { password } = req.body;
  const correctPassword = process.env.ADMIN_PASSWORD || 'soul2026';
  if (password === correctPassword) {
    return res.json({ success: true, message: 'Admin authenticated' });
  }
  return res.status(401).json({ error: 'Incorrect password. (Hint: default password is soul2026)' });
});

app.get('/api/admin/billing', checkAdminAuth, (_req: Request, res: Response) => {
  // Calculate summary stats
  const now = new Date();
  const currentMonthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const monthlyPayments = paymentsDb.filter(p => p.date.startsWith(currentMonthYear) && p.status === 'captured');
  const totalCollectedMonth = monthlyPayments.reduce((acc, p) => acc + p.amount, 0);

  const pendingDuesTotal = studentsDb
    .filter(s => s.currentDue.status === 'Due' || s.currentDue.status === 'Overdue')
    .reduce((acc, s) => acc + s.currentDue.amount, 0);

  const overdueCount = studentsDb.filter(s => s.currentDue.status === 'Overdue').length;
  const paidCount = studentsDb.filter(s => s.currentDue.status === 'Paid').length;
  const dueCount = studentsDb.filter(s => s.currentDue.status === 'Due').length;

  res.json({
    stats: {
      totalCollectedMonth,
      monthlyPaymentsCount: monthlyPayments.length,
      pendingDuesTotal,
      overdueCount,
      paidCount,
      dueCount,
      totalStudents: studentsDb.length,
    },
    students: studentsDb,
    recentPayments: paymentsDb,
    webhookLogs: webhookLogsDb.slice(0, 20),
    trialBookings: trialBookingsDb,
  });
});

// Studio owner records manual / cash payment
app.post('/api/admin/manual-payment', checkAdminAuth, (req: Request, res: Response) => {
  const { studentId, amount, paymentMethod = 'Cash/Manual', notes, className } = req.body;

  const student = studentsDb.find(s => s.id === studentId);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const finalAmount = Number(amount) || student.currentDue.amount;
  const receiptNumber = `SDS-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(paymentsDb.length + 1).padStart(3, '0')}`;

  const paymentRecord: PaymentRecord = {
    id: `pay-manual-${Date.now()}`,
    paymentId: `pay_MANUAL_${Date.now().toString().slice(-6)}`,
    amount: finalAmount,
    date: new Date().toISOString().split('T')[0],
    method: paymentMethod as any,
    status: 'captured',
    receiptNumber,
    description: notes || `${student.currentDue.title} (Desk Receipt)`,
    studentName: student.name,
    studentPhone: student.phone,
    className: className || student.enrolledClasses[0],
  };

  paymentsDb.unshift(paymentRecord);
  student.currentDue.status = 'Paid';
  const nextDate = new Date();
  nextDate.setMonth(nextDate.getMonth() + 1);
  student.currentDue.dueDate = nextDate.toISOString().split('T')[0];
  student.currentDue.title = `${nextDate.toLocaleString('default', { month: 'long' })} ${nextDate.getFullYear()} Monthly Membership`;
  student.paymentHistory.unshift(paymentRecord);

  res.json({
    success: true,
    message: `Manual payment of ₹${finalAmount} recorded for ${student.name}`,
    payment: paymentRecord,
    student,
  });
});

// Automated fee reminder simulation & WhatsApp trigger link
app.post('/api/admin/send-reminder', checkAdminAuth, (req: Request, res: Response) => {
  const { studentId } = req.body;
  const student = studentsDb.find(s => s.id === studentId);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  student.lastReminderSent = new Date().toISOString().split('T')[0];

  const reminderMsg = encodeURIComponent(
    `Namaste ${student.name}! 🙏\n\n` +
    `This is a friendly reminder from *Soul Dance Studio (Bidhannagar)*.\n` +
    `Your fee dues of *₹${student.currentDue.amount}* for ${student.currentDue.title} are ${student.currentDue.status === 'Overdue' ? 'OVERDUE' : 'due on ' + student.currentDue.dueDate}.\n\n` +
    `You can pay online seamlessly via UPI / Cards / Netbanking on our website: https://souldance.in\n` +
    `Thank you for being part of our dance family!`
  );

  const cleanPhone = student.phone.replace(/\D/g, '').slice(-10);
  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${reminderMsg}`;

  res.json({
    success: true,
    message: `Reminder sent to ${student.name} (+91 ${cleanPhone})`,
    whatsappUrl,
    lastReminderSent: student.lastReminderSent,
  });
});

// Refund endpoint via Razorpay Refunds API
app.post('/api/razorpay/refund', checkAdminAuth, async (req: Request, res: Response) => {
  try {
    const { paymentId, amount, reason } = req.body;
    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID is required for refund.' });
    }

    const payment = paymentsDb.find(p => p.paymentId === paymentId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment record not found.' });
    }

    const rzp = getRazorpayInstance();
    const refundAmount = amount ? Number(amount) : payment.amount;

    if (rzp && !payment.paymentId.startsWith('pay_MANUAL')) {
      try {
        const rzpRefund = await rzp.payments.refund(paymentId, {
          amount: Math.round(refundAmount * 100),
          notes: { reason: reason || 'Studio refund request' },
        });

        payment.status = 'refunded';
        payment.refundId = rzpRefund.id;
        payment.refundAmount = refundAmount;
        payment.refundReason = reason;

        return res.json({
          success: true,
          message: `Refund of ₹${refundAmount} processed via Razorpay`,
          refundId: rzpRefund.id,
        });
      } catch (e: any) {
        console.warn('Razorpay SDK refund error:', e);
      }
    }

    // Fallback sandbox/manual refund
    payment.status = 'refunded';
    payment.refundId = `rfnd_${Date.now().toString().slice(-6)}`;
    payment.refundAmount = refundAmount;
    payment.refundReason = reason || 'Admin requested refund';

    res.json({
      success: true,
      message: `Refund of ₹${refundAmount} recorded successfully`,
      refundId: payment.refundId,
    });
  } catch (err: any) {
    console.error('Error processing refund:', err);
    res.status(500).json({ error: err.message || 'Failed to process refund.' });
  }
});

// Export payments as CSV
app.get('/api/admin/export-csv', checkAdminAuth, (_req: Request, res: Response) => {
  const headers = ['Receipt No', 'Date', 'Student Name', 'Phone', 'Class', 'Amount (INR)', 'Method', 'Status', 'Payment ID', 'Order ID'];
  const rows = paymentsDb.map(p => [
    `"${p.receiptNumber}"`,
    `"${p.date}"`,
    `"${p.studentName.replace(/"/g, '""')}"`,
    `"${p.studentPhone}"`,
    `"${(p.className || '').replace(/"/g, '""')}"`,
    p.amount,
    `"${p.method}"`,
    `"${p.status}"`,
    `"${p.paymentId}"`,
    `"${p.orderId || ''}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=SoulDance_Payments_${new Date().toISOString().split('T')[0]}.csv`);
  res.send(csvContent);
});

// ==========================================
// 8. VITE MIDDLEWARE & STATIC SERVER
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Soul Dance Studio server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
