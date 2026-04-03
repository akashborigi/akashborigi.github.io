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
    const finalValue = card.textContent;
    const isAnimated = card.dataset.animated === 'true';

    if (!isAnimated && isInViewport(card)) {
      card.dataset.animated = 'true';
      animateValue(card, 0, parseFloat(finalValue), 2000);
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

function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    
    // Format based on original value
    if (element.textContent.includes('%')) {
      element.textContent = value + '%';
    } else if (element.textContent.includes('×')) {
      element.textContent = value + ' ×';
    } else if (element.textContent.includes('R²')) {
      element.textContent = value + ' R²';
    } else {
      element.textContent = value;
    }

    if (progress < 1) {
      requestAnimationFrame(step);
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
