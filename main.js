 // Navbar scroll effect
    window.addEventListener('scroll', () => {
      document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 50);
    });

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero text fade + slide
    gsap.from(".hero-content > *", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Section headings
    gsap.utils.toArray("h2").forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
        },
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out"
      });
    });

    // Skills cards stagger
    gsap.utils.toArray(".skill-item").forEach((el, i) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
        },
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: i * 0.07,
        ease: "power3.out"
      });
    });

    // Project cards stagger
    gsap.utils.toArray(".project-card").forEach((el, i) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        delay: i * 0.12,
        ease: "power4.out"
      });
    });

    // Simple active link (optional improvement)
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (scrollY >= sectionTop) current = section.getAttribute("id");
      });

      document.querySelectorAll(".nav-links a").forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === `#${current}`) {
          a.classList.add("active");
        }
      });
    });
    // Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});