const overrideStyles = document.createElement('link');
overrideStyles.rel = 'stylesheet';
overrideStyles.href = 'myportfolio/overrides.css?v=3';
document.head.appendChild(overrideStyles);

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const scrollTopButton = document.getElementById('scrollTop');
const reveals = document.querySelectorAll('.reveal');
const typingText = document.getElementById('typingText');
const profileImage = document.querySelector('.image-shell img');

if (profileImage) {
  profileImage.src = 'myportfolio/ProfessionalPotrait.PNG?v=1';
  profileImage.alt = 'Aashish Singh portrait';
}

const roles = [
  'Aspiring Data Scientist',
  'MIS Student',
  'Student Researcher',
  'Data Analytics Enthusiast',
  'Developer'
];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

if (navMenu) {
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 280) {
    scrollTopButton.classList.add('show');
  } else {
    scrollTopButton.classList.remove('show');
  }
});

if (scrollTopButton) {
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.15 }
);

reveals.forEach(item => observer.observe(item));

function typeLoop() {
  if (!typingText) return;
  const current = roles[roleIndex];
  if (!deleting) {
    typingText.textContent = current.slice(0, charIndex + 1);
    charIndex += 1;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typingText.textContent = current.slice(0, charIndex - 1);
    charIndex -= 1;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}

typeLoop();
