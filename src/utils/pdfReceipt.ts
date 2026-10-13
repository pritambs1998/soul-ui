import { jsPDF } from 'jspdf';
import { PaymentRecord, Student } from '../types';
import { STUDIO_INFO } from '../data/studioData';

export function generateAndDownloadReceipt(payment: PaymentRecord, student?: Partial<Student>) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Color Palette
  const primaryCharcoal = [20, 20, 22]; // #141416
  const primaryIndigo = primaryCharcoal;
  const accentOrange = [255, 90, 31]; // #ff5a1f
  const accentLime = [221, 243, 0]; // #ddf300
  const slateDark = [51, 65, 85];
  const slateLight = [148, 163, 184];

  // Header Banner
  doc.setFillColor(primaryCharcoal[0], primaryCharcoal[1], primaryCharcoal[2]);
  doc.rect(0, 0, 210, 42, 'F');

  // Decorative Accent bar (Brand Orange)
  doc.setFillColor(accentOrange[0], accentOrange[1], accentOrange[2]);
  doc.rect(0, 42, 210, 3, 'F');

  // Studio Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('SOUL DANCE STUDIO', 16, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(accentLime[0], accentLime[1], accentLime[2]);
  doc.text("Let's grow together", 16, 27);

  doc.setFontSize(8.5);
  doc.setTextColor(226, 232, 240);
  doc.text(STUDIO_INFO.location.address, 16, 34);
  doc.text(`Phone / WhatsApp: ${STUDIO_INFO.contact.phone} | Email: ${STUDIO_INFO.contact.email}`, 16, 39);

  // Document Title & Receipt Info Box
  doc.setTextColor(primaryIndigo[0], primaryIndigo[1], primaryIndigo[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('PAYMENT RECEIPT / INVOICE', 16, 56);

  // Status Badge
  const isCaptured = payment.status === 'captured';
  if (isCaptured) {
    doc.setFillColor(236, 253, 245);
    doc.setDrawColor(16, 185, 129);
    doc.roundedRect(150, 48, 44, 11, 2, 2, 'FD');
    doc.setTextColor(5, 150, 105);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('PAID (VERIFIED)', 154, 55);
  } else {
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(239, 68, 68);
    doc.roundedRect(150, 48, 44, 11, 2, 2, 'FD');
    doc.setTextColor(220, 38, 38);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(payment.status.toUpperCase(), 154, 55);
  }

  // Metadata Grid
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(16, 62, 178, 36, 3, 3, 'FD');

  // Left column: Student Details
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('STUDENT / BILLED TO:', 22, 70);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(payment.studentName || student?.name || 'Enrolled Student', 22, 77);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Phone: +91 ${payment.studentPhone || student?.phone || 'N/A'}`, 22, 83);
  if (student?.email) {
    doc.text(`Email: ${student.email}`, 22, 89);
  }

  // Right column: Receipt & Transaction details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('RECEIPT NO:', 110, 70);
  doc.setFont('helvetica', 'normal');
  doc.text(payment.receiptNumber || `SDS-${payment.id}`, 142, 70);

  doc.setFont('helvetica', 'bold');
  doc.text('DATE:', 110, 76);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date(payment.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), 142, 76);

  doc.setFont('helvetica', 'bold');
  doc.text('PAYMENT ID:', 110, 82);
  doc.setFont('helvetica', 'normal');
  doc.text(payment.paymentId, 142, 82);

  doc.setFont('helvetica', 'bold');
  doc.text('METHOD:', 110, 88);
  doc.setFont('helvetica', 'normal');
  doc.text(payment.method, 142, 88);

  // Line Items Table Header
  doc.setFillColor(primaryIndigo[0], primaryIndigo[1], primaryIndigo[2]);
  doc.rect(16, 105, 178, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('#', 22, 111.5);
  doc.text('DESCRIPTION & PROGRAM', 36, 111.5);
  doc.text('AMOUNT (INR)', 160, 111.5);

  // Line Item Row
  doc.setFillColor(255, 255, 255);
  doc.rect(16, 115, 178, 16, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(16, 131, 194, 131);

  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.setFont('helvetica', 'normal');
  doc.text('1', 22, 124);

  doc.setFont('helvetica', 'bold');
  doc.text(payment.description || 'Dance Studio Membership / Training Fee', 36, 122);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(slateLight[0], slateLight[1], slateLight[2]);
  doc.text(`Class: ${payment.className || 'General Enrollment'} | Soul Dance Studio Bidhannagar`, 36, 127);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(`₹ ${payment.amount.toLocaleString('en-IN')}`, 162, 124);

  // Total Summary
  doc.setFillColor(248, 250, 252);
  doc.rect(110, 135, 84, 24, 'F');
  doc.rect(110, 135, 84, 24, 'S');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Subtotal:', 116, 142);
  doc.text(`₹ ${payment.amount.toLocaleString('en-IN')}`, 164, 142);

  doc.text('Convenience / Tax:', 116, 147);
  doc.text('₹ 0.00', 164, 147);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryIndigo[0], primaryIndigo[1], primaryIndigo[2]);
  doc.text('Total Paid:', 116, 154);
  doc.text(`₹ ${payment.amount.toLocaleString('en-IN')}`, 164, 154);

  // Razorpay / Payment Gateway Stamp Note
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 116, 139);
  doc.text(
    `Verified via Razorpay Payment Gateway (Order ID: ${payment.orderId || 'Direct-Terminal'}). Funds received into Soul Dance Studio account.`,
    16,
    170
  );

  // Studio Notes & Policy
  doc.setDrawColor(241, 245, 249);
  doc.line(16, 180, 194, 180);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('STUDIO GUIDELINES & REMINDERS:', 16, 188);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('1. Please carry clean indoor sneakers or socks for studio floor hygiene.', 16, 194);
  doc.text('2. Fee payments are for designated monthly/quarterly batches and non-transferable.', 16, 199);
  doc.text('3. In case of medical emergencies or scheduled travel, notify management 3 days in advance.', 16, 204);
  doc.text('4. For queries or schedule adjustments, contact us at +91 98321 54720.', 16, 209);

  // Signature Block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryIndigo[0], primaryIndigo[1], primaryIndigo[2]);
  doc.text('SOUL DANCE STUDIO', 140, 235);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Authorized Signatory & Accounts', 140, 240);
  doc.text('Bidhannagar, Durgapur, WB', 140, 245);

  // Footer Note
  doc.setFillColor(primaryIndigo[0], primaryIndigo[1], primaryIndigo[2]);
  doc.rect(0, 282, 210, 15, 'F');
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('"Create healthier, happier human beings through movement, mindfulness, and community."', 28, 290);

  // Save/Download PDF
  const filename = `${payment.receiptNumber || 'Receipt'}_SoulDance_${payment.studentName?.replace(/\s+/g, '_') || 'Student'}.pdf`;
  doc.save(filename);
}
