
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
      showToast("Please fill in all required fields in the contact form.", "danger");
      return;
    }

    const name = document.getElementById('contact-name').value.trim();

    // Show success toast
    showToast(`Thank you, ${name}! Your inquiry has been sent to our floral team.`, "success");

    // Reset Form
    form.reset();
    form.classList.remove('was-validated');
  });
}
