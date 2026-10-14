/**
 * ====================================================================
 * Craft & Wrapped Haven - Buyer Account Management (account.js)
 * ====================================================================
 * Handles buyer profile display, avatar upload, credential updates,
 * phone number edits, password changes, and account sign-out.
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initAccountPage();
});

/**
 * Initialize account page details from active buyer session
 */
function initAccountPage() {
  const buyer = getActiveBuyer();
  if (!buyer) {
    window.location.href = 'index.html';
    return;
  }

  const avatarEl = document.getElementById('buyer-avatar-display');
  const nameEl = document.getElementById('buyer-name-display');

  if (avatarEl) {
    if (buyer.avatar) {
      avatarEl.innerHTML = `<img src="${buyer.avatar}" alt="${buyer.name || 'User'}" class="account-avatar-img">`;
    } else {
      avatarEl.textContent = (buyer.name || 'User').charAt(0).toUpperCase();
    }
  }

  if (nameEl) {
    nameEl.textContent = buyer.name || 'Maria Santos';
  }
}

/**
 * Triggers hidden file input for photo upload
 */
function triggerAvatarUpload() {
  const fileInput = document.getElementById('buyer-avatar-file-input');
  if (fileInput) {
    fileInput.click();
  }
}

/**
 * Handles avatar image selection, validates file type, and saves to buyer profile
 * @param {Event} event 
 */
function handleAvatarFileChosen(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid File',
      text: 'Please select an image file (PNG, JPG, JPEG, WebP).',
      confirmButtonColor: '#e8839b'
    });
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    updateBuyerRecord({ avatar: dataUrl });
    initAccountPage();
    updateNavbarAuth();
    Swal.fire({
      icon: 'success',
      title: 'Profile Photo Updated!',
      text: 'Your new avatar has been saved successfully.',
      timer: 1500,
      showConfirmButton: false,
      width: '320px'
    });
  };
  reader.readAsDataURL(file);
}

/**
 * Modal to edit profile full name and change/remove avatar
 */
function handleEditProfile() {
  const buyer = getActiveBuyer();
  if (!buyer) return;

  Swal.fire({
    title: 'Edit Profile',
    html: `
      <div class="text-start font-sans">
        <div class="mb-3">
          <label class="form-label small fw-bold text-muted mb-1">Full Name</label>
          <input type="text" id="swal-profile-name" class="form-control rounded-3" value="${buyer.name || ''}" placeholder="Enter full name">
        </div>
        <div class="mb-2">
          <label class="form-label small fw-bold text-muted mb-1">Profile Photo</label>
          <div class="d-flex gap-2 align-items-center">
            <button type="button" class="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1.5 fw-semibold" onclick="triggerAvatarUpload(); Swal.close();">
              <i class="bi bi-camera me-1"></i> Upload Photo
            </button>
            ${buyer.avatar ? `
              <button type="button" class="btn btn-sm btn-outline-danger rounded-pill px-2.5 py-1.5" onclick="removeAvatar(); Swal.close();">
                <i class="bi bi-trash"></i> Remove
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Save Changes',
    confirmButtonColor: '#e8839b',
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#64748b',
    preConfirm: () => {
      const name = document.getElementById('swal-profile-name')?.value.trim();
      if (!name || name.length < 3) {
        Swal.showValidationMessage('Please enter a valid name (at least 3 characters).');
        return false;
      }
      return name;
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      updateBuyerRecord({ name: result.value });
      initAccountPage();
      updateNavbarAuth();
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile has been saved successfully.',
        timer: 1500,
        showConfirmButton: false,
        width: '320px'
      });
    }
  });
}

/**
 * Removes custom avatar and reverts to initial letter
 */
function removeAvatar() {
  updateBuyerRecord({ avatar: null });
  initAccountPage();
  updateNavbarAuth();
  Swal.fire({
    icon: 'success',
    title: 'Avatar Removed',
    text: 'Default initial avatar restored.',
    timer: 1500,
    showConfirmButton: false,
    width: '320px'
  });
}

/**
 * Quick inline edit full name modal
 */
function handleEditName() {
  const buyer = getActiveBuyer();
  if (!buyer) return;

  Swal.fire({
    title: 'Edit Full Name',
    input: 'text',
    inputValue: buyer.name || '',
    inputPlaceholder: 'Enter your full name',
    showCancelButton: true,
    confirmButtonText: 'Save Changes',
    confirmButtonColor: '#e8839b',
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#64748b',
    inputValidator: (value) => {
      if (!value || value.trim().length < 3) {
        return 'Please enter a valid name (at least 3 letters).';
      }
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const newName = result.value.trim();
      updateBuyerRecord({ name: newName });
      initAccountPage();
      updateNavbarAuth();
      Swal.fire({
        icon: 'success',
        title: 'Name Updated!',
        text: 'Your full name has been saved successfully.',
        timer: 1500,
        showConfirmButton: false,
        width: '320px'
      });
    }
  });
}

/**
 * Modal to update Philippine mobile contact number
 */
function handleEditPhone() {
  const buyer = getActiveBuyer();
  if (!buyer) return;

  Swal.fire({
    title: 'Edit Phone Number',
    input: 'tel',
    inputValue: buyer.mobile || '',
    inputPlaceholder: '09171234567',
    showCancelButton: true,
    confirmButtonText: 'Save Phone',
    confirmButtonColor: '#e8839b',
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#64748b',
    inputValidator: (value) => {
      const phoneRegex = /^09\d{9}$/;
      if (!value || !phoneRegex.test(value.trim())) {
        return 'Please enter a valid 11-digit Philippine mobile number starting with 09.';
      }
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      const newPhone = result.value.trim();
      updateBuyerRecord({ mobile: newPhone });
      initAccountPage();
      updateNavbarAuth();
      Swal.fire({
        icon: 'success',
        title: 'Phone Number Saved!',
        text: 'Your contact number has been updated.',
        timer: 1500,
        showConfirmButton: false,
        width: '320px'
      });
    }
  });
}

/**
 * Modal to change account password securely
 */
function handleEditSecurity() {
  const buyer = getActiveBuyer();
  if (!buyer) return;

  Swal.fire({
    title: 'Change Password',
    html: `
      <div class="text-start font-sans">
        <div class="mb-3">
          <label class="form-label small fw-bold text-muted mb-1">New Password</label>
          <input type="password" id="swal-new-pass" class="form-control rounded-3" placeholder="At least 6 characters">
        </div>
        <div class="mb-2">
          <label class="form-label small fw-bold text-muted mb-1">Confirm New Password</label>
          <input type="password" id="swal-confirm-pass" class="form-control rounded-3" placeholder="Re-type new password">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Update Password',
    confirmButtonColor: '#e8839b',
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#64748b',
    preConfirm: () => {
      const newPass = document.getElementById('swal-new-pass').value;
      const confirmPass = document.getElementById('swal-confirm-pass').value;
      if (!newPass || newPass.length < 6) {
        Swal.showValidationMessage('Password must be at least 6 characters long.');
        return false;
      }
      if (newPass !== confirmPass) {
        Swal.showValidationMessage('New passwords do not match.');
        return false;
      }
      return newPass;
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      updateBuyerRecord({ password: result.value });
      Swal.fire({
        icon: 'success',
        title: 'Password Updated!',
        text: 'Your account security credentials have been changed.',
        timer: 1600,
        showConfirmButton: false,
        width: '320px'
      });
    }
  });
}

/**
 * Prompts user to confirm sign-out and clears session
 */
function handleAccountLogout() {
  Swal.fire({
    title: 'Sign Out?',
    text: 'Are you sure you want to log out from your account?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, Log Out',
    confirmButtonColor: '#dc2626',
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#64748b',
    width: '360px',
    customClass: { popup: 'compact-swal-popup' }
  }).then((result) => {
    if (result.isConfirmed) {
      logoutBuyer();
      window.location.href = 'index.html';
    }
  });
}

/**
 * Synchronizes updated buyer fields across active session and registered users list
 * @param {Object} updatedFields 
 */
function updateBuyerRecord(updatedFields) {
  const buyer = getActiveBuyer();
  if (!buyer) return;

  const updatedBuyer = { ...buyer, ...updatedFields };
  setActiveBuyer(updatedBuyer);

  const buyers = getRegisteredBuyers();
  const idx = buyers.findIndex(b => (b.id && b.id === buyer.id) || (b.email && buyer.email && b.email.toLowerCase() === buyer.email.toLowerCase()));
  if (idx !== -1) {
    buyers[idx] = { ...buyers[idx], ...updatedFields };
    saveRegisteredBuyers(buyers);
  }
}
