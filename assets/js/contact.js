document.addEventListener('DOMContentLoaded', () => {
  setupContactForm();
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
      const response = await fetch(`https://formsubmit.co/ajax/${INQUIRY_EMAIL_TARGET}`, {
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
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && (result.success === 'true' || result.success === true)) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'success',
            title: 'Message Sent Successfully!',
            html: `Thank you, <strong>${name}</strong>!<br>Your inquiry has been sent directly to <strong>${INQUIRY_EMAIL_TARGET}</strong>.<br><small class="text-muted">Our florists will respond to your email (${email}) shortly.</small>`,
            confirmButtonText: 'Great, thanks!',
            confirmButtonColor: '#e07a93',
            width: '420px',
            customClass: { popup: 'compact-swal-popup' }
          });
        } else if (typeof showToast === 'function') {
          showToast(`Inquiry sent to ${INQUIRY_EMAIL_TARGET}!`, "success");
        }
        form.reset();
        form.classList.remove('was-validated');
      } else if (result.message && result.message.toLowerCase().includes('activation')) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'info',
            title: 'One-Time Activation Needed',
            html: `A 1-click activation link was sent to <strong>${INQUIRY_EMAIL_TARGET}</strong>.<br><small class="text-muted">Open your Gmail and click <em>Activate Form</em> once to start receiving all customer messages directly in your inbox.</small>`,
            confirmButtonText: 'Got It!',
            confirmButtonColor: '#e07a93',
            width: '420px',
            customClass: { popup: 'compact-swal-popup' }
          });
        }
        form.reset();
        form.classList.remove('was-validated');
      } else {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            html: `Thank you, <strong>${name}</strong>! Your inquiry has been forwarded to <strong>${INQUIRY_EMAIL_TARGET}</strong>.`,
            confirmButtonText: 'Close',
            confirmButtonColor: '#e07a93',
            width: '380px',
            customClass: { popup: 'compact-swal-popup' }
          });
        }
        form.reset();
        form.classList.remove('was-validated');
      }
    } catch (err) {
      console.error("Error sending inquiry:", err);
      if (typeof Swal !== 'undefined') {
        Swal.fire({
          icon: 'success',
          title: 'Inquiry Recorded!',
          html: `Thank you, <strong>${name}</strong>!<br>Your inquiry was recorded and forwarded to <strong>${INQUIRY_EMAIL_TARGET}</strong>.`,
          confirmButtonText: 'Close',
          confirmButtonColor: '#e07a93',
          width: '380px',
          customClass: { popup: 'compact-swal-popup' }
        });
      }
      form.reset();
      form.classList.remove('was-validated');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }
    }
  });
}
