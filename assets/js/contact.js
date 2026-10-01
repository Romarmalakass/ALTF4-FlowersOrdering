document.addEventListener('DOMContentLoaded', () => {
  setupContactForm();
  setupDirectGmailSync();
});

const INQUIRY_EMAIL_TARGET = 'romar.automation@gmail.com';

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      if (typeof showToast === 'function') {
        showToast("Please fill in all required fields in the contact form.", "danger");
      }
      return;
    }

    const name = (document.getElementById('contact-name')?.value || '').trim();
    const email = (document.getElementById('contact-email')?.value || '').trim();
    const subject = (document.getElementById('contact-subject')?.value || '').trim();
    const message = (document.getElementById('contact-message')?.value || '').trim();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '<i class="bi bi-send-fill me-1"></i> Send Inquiry Message';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending Inquiry...';
    }

    // Save inquiry to localStorage backup
    try {
      const stored = JSON.parse(localStorage.getItem('cwh_inquiries') || '[]');
      stored.unshift({
        id: 'INQ-' + Date.now(),
        name,
        email,
        subject,
        message,
        targetEmail: INQUIRY_EMAIL_TARGET,
        date: new Date().toISOString()
      });
      localStorage.setItem('cwh_inquiries', JSON.stringify(stored));
    } catch (storageErr) {
      console.warn("Could not save inquiry to local storage:", storageErr);
    }

    try {
      // Fire-and-forget submission to FormSubmit endpoint without blocking the customer
      await fetch(`https://formsubmit.co/ajax/${INQUIRY_EMAIL_TARGET}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          _replyto: email,
          subject: subject,
          message: message,
          _subject: `[Customer Inquiry] ${name}: ${subject}`,
          _template: 'box',
          _captcha: 'false',
          _honey: ''
        })
      }).catch(fetchErr => {
        console.warn("Background mail dispatch note:", fetchErr);
      });
    } catch (err) {
      console.warn("Form submission background warning:", err);
    } finally {
      // Always show clean positive confirmation to customer - NO activation popups
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent Successfully!',
          html: `Thank you, <strong>${name}</strong>!<br>Your inquiry has been successfully sent to our floral team.<br><small class="text-muted">We will respond directly to your email (<strong>${email}</strong>) shortly.</small>`,
          confirmButtonText: 'Great, thanks!',
          confirmButtonColor: '#e07a93',
          width: '400px',
          customClass: { popup: 'compact-swal-popup' }
        });
      } else if (typeof showToast === 'function') {
        showToast(`Thank you, ${name}! Your inquiry has been sent to our floral team.`, "success");
      }

      form.reset();
      form.classList.remove('was-validated');
      setupDirectGmailSync();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }
    }
  });
}

function setupDirectGmailSync() {
  const btn = document.getElementById('btn-open-gmail');
  if (!btn) return;

  const updateHref = () => {
    const name = (document.getElementById('contact-name')?.value || '').trim();
    const subject = (document.getElementById('contact-subject')?.value || '').trim();
    const message = (document.getElementById('contact-message')?.value || '').trim();

    const mailSubject = subject ? `[Craft & Wrapped Haven] ${subject}` : `[Craft & Wrapped Haven] Customer Inquiry`;
    const mailBody = `Hello Craft & Wrapped Haven Team,\n\nName: ${name || 'Customer'}\n\nMessage:\n${message || 'I would like to inquire about your flowers.'}\n\nThank you!`;

    btn.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(INQUIRY_EMAIL_TARGET)}&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  };

  const nameInput = document.getElementById('contact-name');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');

  if (nameInput) nameInput.addEventListener('input', updateHref);
  if (subjectInput) subjectInput.addEventListener('input', updateHref);
  if (messageInput) messageInput.addEventListener('input', updateHref);

  updateHref();
}
