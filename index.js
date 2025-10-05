document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }

  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    ["mouseenter", "focus"].forEach(evt =>
      item.addEventListener(evt, () => item.classList.add("hover"))
    );
    ["mouseleave", "blur"].forEach(evt =>
      item.addEventListener(evt, () => item.classList.remove("hover"))
    );
  });

  const slides = document.querySelectorAll(".news-card");
  const dots = document.querySelectorAll(".news-controls .dot");

  if (slides.length === 0 || dots.length === 0) return; 

  let current = 0;
  let autoSlideTimer = null;

  const showSlide = i => {
    slides.forEach((slide, idx) => slide.classList.toggle("active", idx === i));
    dots.forEach((dot, idx) => dot.classList.toggle("active", idx === i));
    current = i;
  };

  const nextSlide = () => {
    const next = (current + 1) % slides.length;
    showSlide(next);
  };

  const startAutoSlide = () => {
    stopAutoSlide(); 
    autoSlideTimer = setInterval(nextSlide, 5000);
  };

  const stopAutoSlide = () => {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  };

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      startAutoSlide(); 
    });
  });

  const carousel = document.querySelector(".carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);
  }

  showSlide(current);
  startAutoSlide();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoSlide();
    else startAutoSlide();
  });
});
