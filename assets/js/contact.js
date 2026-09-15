document.addEventListener('DOMContentLoaded', () => {
  setupContactForm();
});

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      if (typeof showToast === 'function') {
        showToast("Please fill in all required fields in the contact form.", "danger");
      }
      return;
    }

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const phone = document.getElementById('contact-phone')?.value.trim() || 'Not provided';
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    const ticketId = 'INQ-2026-' + Math.floor(1000 + Math.random() * 9000);

    const inquiryRecord = {
      ticketId: ticketId,
      name: name,
      email: email,
      phone: phone,
      subject: subject,
      message: message,
      submittedAt: new Date().toISOString(),
      status: 'Open'
    };

    try {
      const existingInquiries = JSON.parse(localStorage.getItem('cwh_customer_inquiries') || '[]');
      existingInquiries.unshift(inquiryRecord);
      localStorage.setItem('cwh_customer_inquiries', JSON.stringify(existingInquiries));
    } catch (err) {
      console.error("Error saving inquiry:", err);
    }

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'Inquiry Submitted!',
        html: `
          <div class="text-start p-3 rounded-3 border" style="font-size: 0.88rem; border-color: #eedde4 !important; background-color: #fffbfc;">
            <div class="d-flex justify-content-between py-1 border-bottom" style="border-color: #f4e8ed !important;">
              <span class="text-muted">Ticket ID:</span>
              <span class="fw-bold text-dark-rose font-monospace">${ticketId}</span>
            </div>
            <div class="d-flex justify-content-between py-1 border-bottom" style="border-color: #f4e8ed !important;">
              <span class="text-muted">Sender:</span>
              <span class="fw-semibold text-dark">${name}</span>
            </div>
            <div class="d-flex justify-content-between py-1 border-bottom" style="border-color: #f4e8ed !important;">
              <span class="text-muted">Subject:</span>
              <span class="fw-semibold text-dark text-truncate ms-2" style="max-width: 210px;">${subject}</span>
            </div>
            <div class="pt-2 text-muted small" style="line-height: 1.4;">
              Our floral support team will contact you shortly via <strong>${email}</strong> or phone.
            </div>
          </div>
        `,
        confirmButtonText: 'Got It',
        confirmButtonColor: '#e8839b',
        customClass: { popup: 'compact-swal-popup' },
        width: '380px'
      });
    } else {
      alert(`Thank you, ${name}! Your inquiry (Ticket #${ticketId}) has been received.`);
    }

    form.reset();
    form.classList.remove('was-validated');
  });
}
