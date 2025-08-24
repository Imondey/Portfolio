document.addEventListener("DOMContentLoaded", () => {
  const words = [
    "Hi, I’m Imon Dey",
    "B.Tech in Information Technology",
    "Problem Solver",
    "Tech Enthusiast",
  ];
  let i = 0, j = 0, isDeleting = false, currentWord = "";
  const typingElement = document.querySelector(".typing");

  function type() {
    if (!typingElement) return;
    currentWord = words[i];
    typingElement.textContent = isDeleting
      ? currentWord.substring(0, j--)
      : currentWord.substring(0, j++);

    if (!isDeleting && j === currentWord.length + 1) {
      isDeleting = true;
      setTimeout(type, 1200);
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % words.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, isDeleting ? 50 : 80);
    }
  }

  if (typingElement) {
    type();
  }

  // Intersection Observer for reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });

  // Theme toggle with localStorage
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;
  const savedTheme = localStorage.getItem("theme") || "light";
  html.dataset.theme = savedTheme;
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const newTheme = html.dataset.theme === "light" ? "dark" : "light";
      html.dataset.theme = newTheme;
      localStorage.setItem("theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (themeToggle) {
      themeToggle.innerHTML = theme === "light" ? 
        '<i class="fas fa-moon"></i>' : 
        '<i class="fas fa-sun"></i>';
    }
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Modal functionality
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalImage');
  const closeModal = document.querySelector('.close-modal');

  // Close modal when clicking the close button
  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
  }

  // Close modal when clicking outside the image
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Close modal with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Open modal function
  window.openModal = function(cardElement) {
    const imgSrc = cardElement.querySelector('img').src;
    const imgAlt = cardElement.querySelector('img').alt;
    
    modalImg.src = imgSrc;
    modalImg.alt = imgAlt;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
});