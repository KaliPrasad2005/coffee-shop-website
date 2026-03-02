const tiltElements = document.querySelectorAll("[data-tilt]");

tiltElements.forEach((el) => {
  const strength = el.classList.contains("hero-card-main") ? 24 : 12;

  const handleMove = (event) => {
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -strength;
    const rotateY = ((x - rect.width / 2) / rect.width) * strength;

    el.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(0)
    `;
  };

  const handleLeave = () => {
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  el.addEventListener("mousemove", handleMove);
  el.addEventListener("mouseleave", handleLeave);
});

const heroOrbit = document.querySelector(".hero-orbit");

if (heroOrbit) {
  window.addEventListener("mousemove", (event) => {
    const { innerWidth, innerHeight } = window;
    const xNorm = (event.clientX / innerWidth - 0.5) * 2;
    const yNorm = (event.clientY / innerHeight - 0.5) * 2;

    const rotateX = yNorm * -4;
    const rotateY = xNorm * 4;

    heroOrbit.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
}

const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("reveal-visible"));
}

const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

