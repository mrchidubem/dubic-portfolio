(() => {
  const ready = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  };

  ready(() => {
    const themeToggle = document.getElementById('theme-toggle');
    const navToggle = document.getElementById('nav-toggle');
    const allHashLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
    const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    const contactForm = document.getElementById('contact-form');

    // Theme persistence
    const applyThemeFromPreference = () => {
      const stored = localStorage.getItem('theme');
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      const useLight = stored ? stored === 'light' : prefersLight;
      if (themeToggle) {
        themeToggle.checked = !!useLight;
      }
    };

    applyThemeFromPreference();
    if (themeToggle) {
      themeToggle.addEventListener('change', () => {
        localStorage.setItem('theme', themeToggle.checked ? 'light' : 'dark');
      });
    }

    // Mobile nav behaviors
    const closeNav = () => {
      if (navToggle && navToggle.checked) navToggle.checked = false;
    };

    navLinks.forEach((link) => {
      link.addEventListener('click', () => closeNav());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });

    document.addEventListener('click', (e) => {
      if (!navToggle || !navToggle.checked) return;
      const nav = e.target.closest('nav');
      if (!nav) closeNav();
    });

    // Smooth scrolling for internal links
    allHashLinks.forEach((link) => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Active section highlighting
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinkById = new Map(
      navLinks.map((a) => [a.getAttribute('href').slice(1), a])
    );

    const setActive = (id) => {
      navLinks.forEach((a) => {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      });
      const active = navLinkById.get(id);
      if (active) {
        active.classList.add('active');
        active.setAttribute('aria-current', 'page');
      }
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { root: null, threshold: 0.55 }
    );

    sections.forEach((sec) => sectionObserver.observe(sec));

    // Lazy-load background images for elements with data-bg
    const lazyBackgrounds = Array.from(
      document.querySelectorAll('.project-image[data-bg], .lazy-bg[data-bg]')
    );

    if ('IntersectionObserver' in window) {
      const bgObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const bg = el.getAttribute('data-bg');
              if (bg) {
                el.style.backgroundImage = `url('${bg}')`;
                el.classList.add('loaded');
                el.removeAttribute('data-bg');
              }
              obs.unobserve(el);
            }
          });
        },
        { rootMargin: '200px 0px', threshold: 0.01 }
      );
      lazyBackgrounds.forEach((el) => bgObserver.observe(el));
    } else {
      lazyBackgrounds.forEach((el) => {
        const bg = el.getAttribute('data-bg');
        if (bg) {
          el.style.backgroundImage = `url('${bg}')`;
          el.classList.add('loaded');
          el.removeAttribute('data-bg');
        }
      });
    }

    // Ensure security on external links
    document.querySelectorAll('a[target="_blank"]').forEach((a) => {
      const rel = (a.getAttribute('rel') || '').toLowerCase();
      if (!rel.includes('noopener')) a.setAttribute('rel', `${rel} noopener`.trim());
      if (!rel.includes('noreferrer')) a.setAttribute('rel', `${a.getAttribute('rel')} noreferrer`.trim());
    });

    // Contact form handler
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (document.getElementById('name')?.value || '').trim();
        const email = (document.getElementById('email')?.value || '').trim();
        const message = (document.getElementById('message')?.value || '').trim();

        const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
        if (!name || !isValidEmail || !message) {
          alert('Please provide a valid name, email, and message.');
          return;
        }

        const subject = encodeURIComponent(`Portfolio Contact: ${name}`);
        const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
        const mailto = `mailto:mrchidubem8@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailto;
      });
    }
  });
})();

