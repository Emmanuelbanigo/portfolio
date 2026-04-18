 // ─── Year ───
    document.getElementById('year').textContent = new Date().getFullYear();

    // ─── Navbar scroll ───
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // ─── Active nav link on scroll ───
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => sectionObserver.observe(s));

    // ─── Hamburger ───
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navLinks');

    function toggleMenu(state) {
      const open = state ?? !hamburger.classList.contains('open');
      hamburger.classList.toggle('open', open);
      navMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => toggleMenu());
    hamburger.addEventListener('keydown', e => e.key === 'Enter' && toggleMenu());
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

    // ─── Scroll reveal ───
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .skill-item, .project-card').forEach((el, i) => {
      el.style.transitionDelay = el.matches('.skill-item, .project-card') ? `${(i % 8) * 60}ms` : '0ms';
      revealObserver.observe(el);
    });

    // Hero content reveals immediately
    setTimeout(() => {
      document.querySelector('.hero-content')?.classList.add('visible');
    }, 100);

    // ─── Canvas particle background ───
    const canvas = document.getElementById('bg-canvas');
    const ctx    = canvas.getContext('2d');
    let W, H, particles = [];
    const mouse = { x: -9999, y: -9999, r: 160 };

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    }, { passive: true });

    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.x = mouse.y = -9999;
    });

    class Particle {
      constructor() { this.init(); }
      init() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.r  = Math.random() * 1.8 + 0.4;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }
      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.r) {
          const f = (mouse.r - dist) / mouse.r * 0.035;
          this.vx -= dx * f;
          this.vy -= dy * f;
        }

        this.vx *= 0.99;
        this.vy *= 0.99;
        this.x  += this.vx;
        this.y  += this.vy;

        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(167,139,250,0.6)';
        ctx.fill();
      }
    }

    function initParticles() {
      const count = Math.min(Math.floor(W * H / 9000), 160);
      particles = Array.from({ length: count }, () => new Particle());
    }

    const MAX_DIST = 130;

    function animate() {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(110,106,240,${(1 - dist / MAX_DIST) * 0.18})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();