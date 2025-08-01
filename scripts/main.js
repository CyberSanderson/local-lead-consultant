// main.js

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

// Optional: Button pulse effect on hover (CTA)
document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.classList.add('pulse');
  });
  button.addEventListener('mouseleave', () => {
    button.classList.remove('pulse');
  });
});

// 🔹 Google Analytics Event Tracking
window.addEventListener('DOMContentLoaded', () => {
  const ctaBtn = document.getElementById('ctaSeeHow');
  const demoLink = document.getElementById('demoSiteLink');
  const emailCTA = document.getElementById('emailCTA');

  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      gtag('event', 'cta_click', {
        event_category: 'Engagement',
        event_label: 'See How I Can Help You',
        value: 1
      });
    });
  }

  if (demoLink) {
    demoLink.addEventListener('click', () => {
      gtag('event', 'demo_site_visit', {
        event_category: 'Engagement',
        event_label: 'PlumbinPros Demo Link',
        value: 1
      });
    });
  }

  if (emailCTA) {
    emailCTA.addEventListener('click', () => {
      gtag('event', 'contact_click', {
        event_category: 'Lead',
        event_label: 'Email CTA Button',
        value: 1
      });
    });
  }
});
