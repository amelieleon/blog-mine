/* ==========================================
           ✨ HERO SECTION ANIMATIONS
           ========================================== */

/**
 * Efecto parallax para iconos flotantes del hero
 * Por qué: Crea una experiencia visual inmersiva y moderna
 * Funcionamiento: Los iconos se mueven sutilmente siguiendo el cursor
 */
function initializeIconParallax() {
  window.addEventListener("mousemove", (e) => {
    const icons = document.querySelectorAll(".icon");
    const x = e.clientX / window.innerWidth; // Posición X normalizada (0-1)
    const y = e.clientY / window.innerHeight; // Posición Y normalizada (0-1)

    icons.forEach((icon, index) => {
      // Velocidad diferente para cada icono (crear profundidad)
      const speed = ((index % 3) + 1) * 0.5;
      const xPos = (x - 0.5) * 20 * speed; // Centrar y aplicar velocidad
      const yPos = (y - 0.5) * 20 * speed;

      icon.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
  });
}

/**
 * Navegación simple para el hero
 * Por qué: Permite cambiar entre secciones y mantener estado visual activo
 * Funcionamiento: Al hacer clic, remueve 'active' de todos y lo agrega al clickeado
 */
function initializeNavigation() {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // Remover clase activa de todos los elementos
      document.querySelectorAll(".nav-item").forEach((nav) => {
        nav.classList.remove("active");
      });

      // Agregar clase activa al elemento clickeado
      this.classList.add("active");
    });
  });
}

/**
 * Intersection Observer para animaciones de scroll en la sección About Me
 * Por qué: Crea una experiencia fluida cuando el usuario hace scroll
 * Funcionamiento: Observa cuando los elementos entran en el viewport y los anima
 */
function initializeAboutMeAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Una vez visible, no necesitamos seguir observando
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elementos a animar
  const animatedElements = [
    ".about-content",
    ".interests-section",
    ".about-intro-text",
    ".about-languages-text",
    ".about-creativity-text",
    ".about-passion-text",
  ];

  animatedElements.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      el.classList.add("about-fade-in");
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });
  });
}

/**
 * Efectos interactivos para las fotos del collage
 * Por qué: Añade personalidad y dinamismo a las imágenes
 * Funcionamiento: Hover effects y parallax sutil con el mouse
 */
function initializePhotoEffects() {
  const photoItems = document.querySelectorAll(".photo-item");

  photoItems.forEach((photo, index) => {
    // Efecto hover mejorado
    photo.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";

      // Rotación adicional en hover
      const currentRotation = this.style.transform.match(/rotate\(([^)]+)\)/);
      if (currentRotation) {
        const baseRotation = parseFloat(currentRotation[1]);
        const newRotation = baseRotation + (baseRotation > 0 ? 5 : -5);
        this.style.transform = this.style.transform.replace(
          /rotate\([^)]+\)/,
          `rotate(${newRotation}deg)`
        );
      }
    });

    photo.addEventListener("mouseleave", function () {
      // Reset z-index después de la transición
      setTimeout(() => {
        this.style.zIndex = "";
      }, 400);

      // Restaurar rotación original
      const currentRotation = this.style.transform.match(/rotate\(([^)]+)\)/);
      if (currentRotation) {
        const baseRotation = parseFloat(currentRotation[1]);
        const originalRotation =
          baseRotation > 0 ? baseRotation - 5 : baseRotation + 5;
        this.style.transform = this.style.transform.replace(
          /rotate\([^)]+\)/,
          `rotate(${originalRotation}deg)`
        );
      }
    });
  });
}

/**
 * Parallax sutil para las fotos en scroll
 * Por qué: Crea profundidad y dinamismo durante el scroll
 * Funcionamiento: Mueve las fotos a diferentes velocidades según su posición
 */
function initializeAboutParallax() {
  let isScrolling = false;

  function handleAboutScroll() {
    if (!isScrolling) {
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const aboutSection = document.querySelector(".about-me-section");

        if (!aboutSection) return;

        const rect = aboutSection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
          const photoItems = aboutSection.querySelectorAll(".photo-item");

          photoItems.forEach((photo, index) => {
            // Velocidad diferente para cada foto
            const speed = 0.05 + index * 0.02;
            const yPos = scrolled * speed;

            // Aplicar transform manteniendo la rotación existente
            const currentTransform = photo.style.transform || "";
            const rotateMatch = currentTransform.match(/rotate\([^)]+\)/);
            const rotation = rotateMatch ? rotateMatch[0] : "rotate(0deg)";

            photo.style.transform = `translateY(${yPos}px) ${rotation}`;
          });
        }

        isScrolling = false;
      });
    }
    isScrolling = true;
  }

  // Throttled scroll handler
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleAboutScroll, 10);
  });
}

/**
 * Animación para los iconos de banderas
 * Por qué: Pequeños detalles que añaden personalidad
 * Funcionamiento: Rotación suave en hover
 */
function initializeFlagAnimations() {
  const flagIcons = document.querySelectorAll(".flag-icon");

  flagIcons.forEach((flag) => {
    flag.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.2) rotate(360deg)";
    });

    flag.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  });
}

/**
 * Animación inicial suave para toda la sección
 * Por qué: Entrada elegante cuando se carga la página
 * Funcionamiento: Fade in gradual de toda la sección
 */
function initializeAboutSectionReveal() {
  const aboutSection = document.querySelector(".about-me-section");
  if (!aboutSection) return;

  // Estado inicial
  aboutSection.style.opacity = "0";
  aboutSection.style.transform = "translateY(30px)";

  // Revelar después de un pequeño delay
  setTimeout(() => {
    aboutSection.style.transition =
      "opacity 1.2s ease-out, transform 1.2s ease-out";
    aboutSection.style.opacity = "1";
    aboutSection.style.transform = "translateY(0)";
  }, 200);
}

/* ==========================================
           🚀 INICIALIZACIÓN ACTUALIZADA
   ========================================== */

/**
 * Inicialización cuando el DOM está listo
 * Ahora incluye las funciones de About Me
 */
document.addEventListener("DOMContentLoaded", function () {
  // Funciones existentes del hero
  initializeIconParallax();
  initializeNavigation();

  // Nuevas funciones de About Me
  initializeAboutMeAnimations();
  initializePhotoEffects();
  initializeAboutParallax();
  initializeFlagAnimations();
  initializeAboutSectionReveal();

  console.log("🎉 Hero section initialized!");
  console.log("✨ About Me section initialized!");
});

