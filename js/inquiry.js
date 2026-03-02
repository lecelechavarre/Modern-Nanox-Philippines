// Inquiry System - Microsoft Forms Integration
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inquiry System Initialized');
    
    // Configuration - Replace with your actual Microsoft Forms URL
    const MS_FORM_URL = 'https://forms.office.com/your-form-id-here';
    
    // Elements
    const inquiryBtn = document.getElementById('inquiryBtn');
    const modal = document.getElementById('inquiryModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const privacyCheck = document.getElementById('privacyConsent');
    const msFormContainer = document.getElementById('msFormContainer');
    const msFormWrapper = document.getElementById('msFormWrapper');
    
    if (!inquiryBtn || !modal) return;
    
    // Open modal
    inquiryBtn.addEventListener('click', function() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset state
        if (privacyCheck) {
            privacyCheck.checked = false;
        }
        if (msFormContainer) {
            msFormContainer.classList.remove('active');
        }
        if (msFormWrapper) {
            msFormWrapper.innerHTML = '';
        }
    });
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Click overlay to close
    const overlay = modal.querySelector('.modal__overlay');
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }
    
    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Handle privacy checkbox
    if (privacyCheck && msFormContainer && msFormWrapper) {
        privacyCheck.addEventListener('change', function() {
            if (this.checked) {
                // Show loading
                msFormWrapper.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 16px;">
                        <div style="width: 40px; height: 40px; border: 3px solid #E8F3F0; border-top-color: #2A7F6E; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        <p style="color: #64748B;">Loading form...</p>
                    </div>
                `;
                msFormContainer.classList.add('active');
                
                // Load Microsoft Form
                setTimeout(() => {
                    const iframe = document.createElement('iframe');
                    iframe.src = MS_FORM_URL;
                    iframe.title = 'Quotation Request Form';
                    iframe.setAttribute('aria-label', 'Microsoft Form for quotation requests');
                    
                    msFormWrapper.innerHTML = '';
                    msFormWrapper.appendChild(iframe);
                }, 1000);
                
            } else {
                msFormContainer.classList.remove('active');
                msFormWrapper.innerHTML = '';
            }
        });
    }
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});