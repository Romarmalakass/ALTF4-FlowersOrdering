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

    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: `Thank you, ${name}! Your inquiry has been sent to our floral team.`,
        timer: 2000,
        showConfirmButton: false,
        width: '340px',
        customClass: { popup: 'compact-swal-popup' }
      });
    } else if (typeof showToast === 'function') {
      showToast(`Thank you, ${name}! Your inquiry has been sent to our floral team.`, "success");
    }

    form.reset();
    form.classList.remove('was-validated');
  });
}
