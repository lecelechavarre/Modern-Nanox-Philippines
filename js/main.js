// main.js - Core Website Functionality
document.addEventListener('DOMContentLoaded', function() {
  console.log('Nanox Philippines - Professional Website Initializing...');

  // Loading Screen - Preserved
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.remove();
      }, 600);
    }, 500);
  }

  // Mobile Navigation
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
      
      const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
      this.setAttribute('aria-expanded', expanded);
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && 
          !navToggle.contains(e.target) && 
          !mainNav.contains(e.target)) {
        navToggle.classList.remove('active');
        mainNav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on link click
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navToggle.classList.remove('active');
          mainNav.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Header Scroll Effect - Preserved
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        header.classList.add('scrolled');
        
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
      } else {
        header.classList.remove('scrolled');
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollY = currentScrollY;
    });
  }

  // Smooth Scroll with Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to Top Button - Preserved
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe cards for animation
  document.querySelectorAll('.service-card, .product-card, .recognition-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });

  // Contact Form Handling
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.submit-btn');
      if (!submitBtn) return;
      
      // Basic validation
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('error');
          isValid = false;
          
          // Add error message if not exists
          let errorMsg = input.parentNode.querySelector('.error-message');
          if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'This field is required';
            input.parentNode.appendChild(errorMsg);
          }
        } else {
          input.classList.remove('error');
          const errorMsg = input.parentNode.querySelector('.error-message');
          if (errorMsg) errorMsg.remove();
        }
      });
      
      if (!isValid) return;
      
      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="spinner"></span>
        <span>Sending...</span>
      `;
      
      try {
        // Simulate API call - Replace with actual form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (status) {
          status.textContent = 'Thank you for your inquiry! Our team will contact you within 24 hours.';
          status.style.color = '#10B981';
          status.classList.add('success');
        }
        
        form.reset();
      } catch (error) {
        if (status) {
          status.textContent = 'There was an error sending your message. Please try again.';
          status.style.color = '#DC2626';
          status.classList.add('error');
        }
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <span>Send Message</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2"/>
          </svg>
        `;
        
        // Clear status message after 5 seconds
        setTimeout(() => {
          if (status) {
            status.textContent = '';
            status.classList.remove('success', 'error');
          }
        }, 5000);
      }
    });
  }

  // Ripple Effect for Buttons
  document.querySelectorAll('.btn, .submit-btn, .inquiry-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(20);
        opacity: 0;
      }
    }
    
    .animate-in {
      animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  console.log('Nanox Philippines - Professional Website Successfully Initialized');
});

// Error Handling
window.addEventListener('error', function(e) {
  console.error('Script error:', e.error);
});