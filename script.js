// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
}

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Waitlist form — submit then redirect to success page
const waitlistForm = document.getElementById('waitlistForm');

if (waitlistForm) {
  waitlistForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = waitlistForm.querySelector('.submit-btn');
    const formMessage = document.getElementById('formMessage');

    // Button loading state
    btn.textContent = 'Submitting…';
    btn.disabled = true;
    btn.style.opacity = '0.75';

    const formData = new FormData(waitlistForm);

    try {
      const response = await fetch('https://formspree.io/f/formspree.io/f/xwvjpljk', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        // Redirect to success page
        window.location.href = 'success.html';
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      // If Formspree isn't set up yet, still redirect for demo purposes
      // Remove the line below once your Formspree ID is live
      window.location.href = 'success.html';

      // Once Formspree is live, replace the line above with:
      // formMessage.textContent = 'Something went wrong. Please try again.';
      // formMessage.style.color = '#e53e3e';
      // btn.textContent = 'Join the Waitlist →';
      // btn.disabled = false;
      // btn.style.opacity = '1';
    }
  });
}

// Scroll reveal animation for sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.why-card, .how-step, .service-tile, .waitlist-copy, .waitlist-form-wrap').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});