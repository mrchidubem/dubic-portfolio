// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    this.reset();
  });
}

// Notification system
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add scroll reveal animation
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

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Add hover effects to portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 150);
  }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Add counter animation to stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent);
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + '+';
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target + '+';
      }
    };
    
    updateCounter();
  });
}

// Trigger counter animation when hero section is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        heroObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  heroObserver.observe(heroSection);
}

// Add floating animation to floating card
const floatingCard = document.querySelector('.floating-card');
if (floatingCard) {
  // The CSS animation is already handling this, but we can add some interactivity
  floatingCard.addEventListener('mouseenter', function() {
    this.style.animationPlayState = 'paused';
  });
  
  floatingCard.addEventListener('mouseleave', function() {
    this.style.animationPlayState = 'running';
  });
}

// Add skill item hover effects
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateX(5px)';
    this.style.background = '#f1f5f9';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateX(0)';
    this.style.background = '#f8fafc';
  });
});

// Add smooth reveal for portfolio overlay
document.querySelectorAll('.portfolio-item').forEach(item => {
  const overlay = item.querySelector('.portfolio-overlay');
  if (overlay) {
    item.addEventListener('mouseenter', function() {
      overlay.style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', function() {
      overlay.style.opacity = '0';
    });
  }
});

// Add form input focus effects
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.transform = 'scale(1.02)';
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.style.transform = 'scale(1)';
  });
});

// Add scroll-triggered animations for service cards
const serviceCards = document.querySelectorAll('.service-card');
if (serviceCards.length > 0) {
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });
  
  serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    serviceObserver.observe(card);
  });
}

// Add navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = 'none';
  }
});

// Add smooth reveal for about features
const features = document.querySelectorAll('.feature');
if (features.length > 0) {
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 150);
      }
    });
  }, { threshold: 0.1 });
  
  features.forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateX(-30px)';
    feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    featureObserver.observe(feature);
  });
}
