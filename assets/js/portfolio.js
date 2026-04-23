/* ============================================
   AKASH BORIGI - PORTFOLIO JAVASCRIPT
   Dark/Light Mode Toggle & Interactivity
   ============================================ */

// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  updateThemeToggleIcon('dark');
}

// Theme toggle event listener
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateThemeToggleIcon(isDarkMode ? 'dark' : 'light');
  });
}

function updateThemeToggleIcon(theme) {
  if (themeToggle) {
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Active navigation highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe cards and elements for fade-in effect
document.querySelectorAll('.card, .publication-card, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Animate metrics on scroll
const animateMetrics = () => {
  const metricCards = document.querySelectorAll('.metric-number');
  metricCards.forEach(card => {
    // Store original text once so animation never corrupts it
    if (!card.dataset.original) {
      card.dataset.original = card.textContent.trim();
    }
    const isAnimated = card.dataset.animated === 'true';
    if (!isAnimated && isInViewport(card)) {
      card.dataset.animated = 'true';
      animateValue(card, 2000);
    }
  });
};

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function animateValue(element, duration) {
  const original = element.dataset.original;
  let startTimestamp = null;

  const isCross   = original.includes('×');
  const isPercent = original.includes('%');
  const isR2      = original.includes('R²');

  let targetA, targetB, decimals;
  if (isCross) {
    const parts = original.split('×');
    targetA = parseFloat(parts[0]);
    targetB = parseFloat(parts[1]);
  } else if (isPercent) {
    targetA = parseFloat(original);
    decimals = ((original.match(/\.(\d+)%/) || [, ''])[1] || '').length;
  } else {
    targetA = parseFloat(original);
  }

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    if (isCross) {
      element.textContent = Math.floor(progress * targetA) + '×' + Math.floor(progress * targetB);
    } else if (isPercent) {
      element.textContent = (progress * targetA).toFixed(decimals) + '%';
    } else if (isR2) {
      element.textContent = Math.floor(progress * targetA) + '%';
    } else {
      element.textContent = Math.floor(progress * targetA);
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = original; // restore exact original at end
    }
  };
  requestAnimationFrame(step);
}

window.addEventListener('scroll', animateMetrics);
document.addEventListener('DOMContentLoaded', animateMetrics);

// Copy email to clipboard
function copyEmail(email) {
  navigator.clipboard.writeText(email).then(() => {
    alert('Email copied to clipboard!');
  });
}

// Add scroll progress indicator
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;
  
  // You can use this for a progress bar if needed
  document.documentElement.style.setProperty('--scroll-percent', scrollPercent);
});

console.log('Portfolio JS loaded successfully!');
