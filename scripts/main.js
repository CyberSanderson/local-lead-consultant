document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            menuBtn.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                menuBtn.classList.remove('active');
            });
        });
    }

    // --- ROI Calculator ---
    const avgJobInput = document.getElementById('avgJobValue');
    const extraLeadsInput = document.getElementById('extraLeadsPerWeek');
    const monthlyROIOutput = document.getElementById('monthlyROI');
    const roiPercentOutput = document.getElementById('roiPercent');
    const investment = 149;

    function updateROI() {
        if (!avgJobInput || !extraLeadsInput || !monthlyROIOutput || !roiPercentOutput) return;

        const avgJob = parseInt(avgJobInput.value) || 0;
        const extraLeads = parseInt(extraLeadsInput.value) || 0;

        const monthlyRevenue = avgJob * extraLeads * 4; // 4 weeks per month
        const roi = monthlyRevenue > 0 ? ((monthlyRevenue - investment) / investment * 100) : 0;

        monthlyROIOutput.textContent = '$' + monthlyRevenue.toLocaleString();
        roiPercentOutput.textContent = roi.toFixed(0) + '%';
    }

    if (avgJobInput && extraLeadsInput) {
        avgJobInput.addEventListener('input', updateROI);
        extraLeadsInput.addEventListener('input', updateROI);
        // Initial calculation
        updateROI();
    }
    
    // --- FAQ Accordion (Updated for Accessibility) ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer'); // Get the answer element

        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close other open accordions
            document.querySelectorAll('.faq-item.active').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle the clicked accordion's state
            if (isExpanded) {
                item.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // --- Analytics Event Tracking (Enhanced) ---
    function trackEvent(eventName, category, label) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, {
                'event_category': category,
                'event_label': label,
            });
        }
    }

    // Track CTA clicks
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('cta_click', 'Conversion', button.textContent.trim());
        });
    });

    // Track Stripe buy button click
    const stripeButton = document.querySelector('stripe-buy-button');
    if (stripeButton) {
        stripeButton.addEventListener('click', () => {
            trackEvent('begin_checkout', 'Conversion', 'Stripe Buy Button');
        });
    }

    // Track calculator interactions
    if (avgJobInput) {
        avgJobInput.addEventListener('change', () => {
            trackEvent('calculator_use', 'Engagement', 'Adjusted Job Value');
        });
    }
    if (extraLeadsInput) {
        extraLeadsInput.addEventListener('change', () => {
            trackEvent('calculator_use', 'Engagement', 'Adjusted Leads Per Week');
        });
    }
    
    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.step, .testimonial, .problem-card, .about-me-content, .calculator-widget');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => observer.observe(el));

});