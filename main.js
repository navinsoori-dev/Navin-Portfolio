const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = nav ? nav.querySelectorAll("a") : [];

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen.toString());
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealTargets = document.querySelectorAll("[data-reveal]");
if (revealTargets.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
}

const sections = Array.from(document.querySelectorAll("section[id]"));
const navMap = new Map();
navLinks.forEach((link) => {
  const id = link.getAttribute("href");
  if (id && id.startsWith("#")) {
    navMap.set(id.slice(1), link);
  }
});

const setActiveNav = () => {
  let currentId = sections[0] ? sections[0].id : "";
  const scrollPosition = window.scrollY + 140;

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => link.classList.remove("active"));
  const activeLink = navMap.get(currentId);
  if (activeLink) {
    activeLink.classList.add("active");
  }
};

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);
