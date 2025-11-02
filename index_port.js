
// Personalized greeting prompt when site loads
/*window.addEventListener('load', () => {
  const userName = prompt("Welcome! What's your name?");
  if (userName && userName.trim() !== "") {
    alert(`Hello, ${userName.trim()}! 👋 Welcome to Nova Christiana's portfolio.`);
  } else {
    alert("Welcome to Nova Christiana's portfolio! 👋");
  }
});*/



// =========================
// Menu toggle animation
// =========================
const menuBtn = document.getElementById('menu-button');
const navbar = document.getElementById('navbar');
const logo = document.querySelector('.logo-di-menu');

menuBtn.addEventListener('click', () => {
  navbar.classList.toggle('show');
  menuBtn.textContent = navbar.classList.contains('show') ? '✕' : '☰';
});

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && e.target !== menuBtn) {
    navbar.classList.remove('show');
    menuBtn.textContent = '☰';
  }
});

const neonLinks = document.querySelectorAll('#navbar a');
const colors = ['#aa1303ff', '#242324ff'];
let colorIndex = 0;

setInterval(() => {
  colorIndex = (colorIndex + 1) % colors.length;
  neonLinks.forEach(link => {
    link.style.textShadow = `0 0 10px ${colors[colorIndex]},
                             0 0 20px ${colors[colorIndex]},
                             0 0 40px ${colors[colorIndex]}`;
    link.style.color = colors[colorIndex];
  });
  logo.style.filter = `drop-shadow(0 0 8px ${colors[colorIndex]})
                       drop-shadow(0 0 20px ${colors[colorIndex]})
                       drop-shadow(0 0 40px ${colors[colorIndex]})`;
}, 1000);


// =========================
// Header Slideshow
// =========================
let slideIndex = 0;
let slides, captions, timer;

function initSlideshow() {
  slides = document.querySelectorAll(".slide-img");
  captions = document.querySelectorAll(".caption");
  showSlide(slideIndex);
  startAutoSlide();
}

function showSlide(n) {
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  slides.forEach(slide => slide.classList.remove("active"));
  captions.forEach(cap => (cap.style.opacity = 0));

  slides[slideIndex].classList.add("active");
  setTimeout(() => {
    captions[slideIndex].style.opacity = 1;
  }, 400);
}

function changeSlide(n) {
  clearTimeout(timer);
  slideIndex += n;
  showSlide(slideIndex);
  startAutoSlide();
}

function startAutoSlide() {
  timer = setTimeout(() => {
    slideIndex++;
    showSlide(slideIndex);
    startAutoSlide();
  }, 5000);
}

window.addEventListener("DOMContentLoaded", initSlideshow);


// =========================
// Close menu when clicking links
// =========================
document.querySelectorAll('#navbar a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('show');
    menuBtn.textContent = '☰';
  });
});


// =========================
// Portfolio Carousel (Infinite Loop)
// =========================
window.addEventListener("load", () => {
  const carousel = document.querySelector('.carousel');
  const container = document.querySelector('.galery-container');
  const slides = Array.from(document.querySelectorAll('.slide-por'));
  if (!carousel || slides.length === 0) return;

  let indexSlide = 1;
  let interval;
  let slideWidth;

  // Clone first + last slides for seamless loop
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.id = 'first-clone';
  lastClone.id = 'last-clone';
  carousel.appendChild(firstClone);
  carousel.insertBefore(lastClone, slides[0]);

  const allSlides = Array.from(document.querySelectorAll('.slide-por'));
  slideWidth = slides[0].clientWidth;
  carousel.style.transform = `translateX(-${slideWidth * indexSlide}px)`;

  function moveToSlide() {
    carousel.style.transition = 'transform 0.6s ease-in-out';
    carousel.style.transform = `translateX(-${slideWidth * indexSlide}px)`;
  }

  function nextSlide() {
    indexSlide++;
    moveToSlide();
  }

  function prevSlide() {
    indexSlide--;
    moveToSlide();
  }

  carousel.addEventListener('transitionend', () => {
    if (allSlides[indexSlide].id === 'first-clone') {
      carousel.style.transition = 'none';
      indexSlide = 1;
      carousel.style.transform = `translateX(-${slideWidth * indexSlide}px)`;
      void carousel.offsetWidth; // reflow
      carousel.style.transition = 'transform 1s ease-in-out';
    } else if (allSlides[indexSlide].id === 'last-clone') {
      carousel.style.transition = 'none';
      indexSlide = allSlides.length - 2;
      carousel.style.transform = `translateX(-${slideWidth * indexSlide}px)`;
      void carousel.offsetWidth;
      carousel.style.transition = 'transform 1s ease-in-out';
    }
  });

  // Button controls
  const nextBtn = document.querySelector('.next-por');
  const prevBtn = document.querySelector('.prev-por');
  if (nextBtn) nextBtn.addEventListener('click', () => {
    clearInterval(interval);
    nextSlide();
    interval = setInterval(nextSlide, 5000);
  });
  if (prevBtn) prevBtn.addEventListener('click', () => {
    clearInterval(interval);
    prevSlide();
    interval = setInterval(nextSlide, 5000);
  });

  // Auto slide control
  function startAuto() {
    interval = setInterval(nextSlide, 5000);
  }

  container.addEventListener('mouseenter', () => clearInterval(interval));
  container.addEventListener('mouseleave', startAuto);

  startAuto();
});
