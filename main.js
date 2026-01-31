// Professional Enterprise Website with Advanced Animations
document.addEventListener('DOMContentLoaded', function() {
  console.log('Nanox Philippines - Professional Website Initializing...');

  // Loading Screen 
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.remove();
      }, 600);
    }, 500);
  }

  // Enhanced Mobile Navigation
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
      
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
    });

    // Close mobile nav when clicking outside or on links
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && !navToggle.contains(e.target) && !mainNav.contains(e.target)) {
        navToggle.classList.remove('active');
        mainNav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile nav when clicking on nav links
    const navLinks = mainNav.querySelectorAll('.nav-link');
    if (navLinks.length > 0) {
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            navToggle.classList.remove('active');
            mainNav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }
  }

  // Enhanced Header Scroll Effect
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        header.classList.add('scrolled');
        
        // Hide header on scroll down, show on scroll up
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

  // Enhanced Smooth Scroll with Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
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

  // Enhanced Back to Top Button
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

  // Animated Counter for Stats
  const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const updateCounter = () => {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    updateCounter();
  };

  // Initialize counters when they come into view
  const initCounters = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count')) || 0;
      animateCounter(stat, target);
    });
  };

  // Intersection Observer for Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Initialize counters when stats section is visible
        if (entry.target.classList.contains('hero-stats')) {
          initCounters();
        }
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.service-card, .contact-card, .floating-card, .hero-stats');
  animatedElements.forEach(el => {
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    }
  });

  // Add animation class when elements come into view
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Enhanced Form Handling
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.submit-btn');
      if (!submitBtn) return;
      
      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      
      try {
        // Simulate API call - replace with actual form submission
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
          status.style.color = '#EF4444';
          status.classList.add('error');
        }
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
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

  // Particle Background for Hero
  function createParticleBackground() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * 4 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 10;
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(13, 71, 161, ${Math.random() * 0.3});
        border-radius: 50%;
        left: ${posX}%;
        top: ${posY}%;
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
      `;
      
      container.appendChild(particle);
    }
  }

  // Initialize particle background
  createParticleBackground();

  // Parallax Effect for Hero
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });

  // Enhanced Hover Effects for Service Cards
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Typing Animation for Hero Title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const lines = heroTitle.querySelectorAll('.title-line');
    lines.forEach((line, index) => {
      line.style.opacity = '0';
      line.style.transform = 'translateY(20px)';
      line.style.transition = `all 0.6s ease ${index * 0.2}s`;
    });
    
    setTimeout(() => {
      lines.forEach(line => {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      });
    }, 500);
  }

  // Enhanced Floating Cards Animation
  document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
      this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
      this.style.transform = '';
    });
  });

  // Add ripple effect to buttons
  document.querySelectorAll('.btn, .submit-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 600ms linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for animations
  const dynamicStyles = `
    @keyframes floatParticle {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
      25% { transform: translate(20px, -20px) scale(1.1); opacity: 0.6; }
      50% { transform: translate(-15px, 15px) scale(0.9); opacity: 0.4; }
      75% { transform: translate(-20px, -15px) scale(1.05); opacity: 0.5; }
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .form-status.success {
      padding: 12px;
      background: #D1FAE5;
      border: 1px solid #10B981;
      border-radius: 8px;
      margin-top: 16px;
    }
    
    .form-status.error {
      padding: 12px;
      background: #FEE2E2;
      border: 1px solid #EF4444;
      border-radius: 8px;
      margin-top: 16px;
    }
  `;

  const styleSheet = document.createElement('style');
  styleSheet.textContent = dynamicStyles;
  document.head.appendChild(styleSheet);

  console.log('Nanox Philippines - Professional Website Successfully Initialized');
});

// Error handling for the entire script
window.addEventListener('error', function(e) {
  console.error('Script error:', e.error);
});

