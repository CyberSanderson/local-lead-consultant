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