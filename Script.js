      // Loading screen
      window.addEventListener("load", () => {
        const loading = document.getElementById("loading");
        setTimeout(() => {
          loading.classList.add("hidden");
          setTimeout(() => {
            loading.style.display = "none";
          }, 500);
        }, 1000);
      });

      // Mobile menu toggle
      const menuToggle = document.getElementById("menuToggle");
      const navLinks = document.getElementById("navLinks");

      menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
      });

      // Close mobile menu when clicking on links
      navLinks.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          menuToggle.classList.remove("active");
          navLinks.classList.remove("active");
        }
      });

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      // Enhanced Intersection Observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      }, observerOptions);

      // Observe all animated elements
      document
        .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
        .forEach((el) => {
          observer.observe(el);
        });

      // Enhanced navbar background on scroll
      let lastScrollY = 0;
      const navbar = document.getElementById("navbar");

      window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        if (scrollY > 100) {
          navbar.style.background = "rgba(0, 0, 0, 0.95)";
          navbar.style.backdropFilter = "blur(20px)";
          navbar.style.padding = "10px 0";
        } else {
          navbar.style.background = "rgba(255, 255, 255, 0.1)";
          navbar.style.backdropFilter = "blur(20px)";
          navbar.style.padding = "15px 0";
        }

        // Hide/show navbar on scroll
        if (scrollY > lastScrollY && scrollY > 500) {
          navbar.style.transform = "translateY(-100%)";
        } else {
          navbar.style.transform = "translateY(0)";
        }
        lastScrollY = scrollY;
      });

      // Scroll to top button
      const scrollToTop = document.getElementById("scrollToTop");

      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          scrollToTop.classList.add("visible");
        } else {
          scrollToTop.classList.remove("visible");
        }
      });

      scrollToTop.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      // Animated counters for stats
      function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(start).toLocaleString();
          }
        }, 16);
      }

      // Trigger counter animation when stats section is visible
      const statsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const counters = entry.target.querySelectorAll(".stat-number");
              counters.forEach((counter) => {
                const target = parseInt(counter.getAttribute("data-count"));
                animateCounter(counter, target);
              });
              statsObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      const statsSection = document.querySelector(".stats-section");
      if (statsSection) {
        statsObserver.observe(statsSection);
      }

      // Enhanced button interactions with ripple effect
      document.querySelectorAll(".cta-button").forEach((button) => {
        button.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-3px) scale(1.02)";
        });

        button.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(0) scale(1)";
        });

        button.addEventListener("click", function (e) {
          e.preventDefault();

          // Create ripple effect
          const ripple = document.createElement("span");
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;

          ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                    z-index: 10;
                `;

          this.appendChild(ripple);

          // Simulate action based on button text
          const buttonText = this.textContent.trim().toLowerCase();
          if (buttonText.includes("trial") || buttonText.includes("free")) {
            showNotification(
              "🎉 Free trial started! Check your email for next steps.",
              "success"
            );
          } else if (
            buttonText.includes("demo") ||
            buttonText.includes("watch")
          ) {
            showNotification(
              "🎬 Demo video will open in a new window.",
              "info"
            );
          } else if (
            buttonText.includes("sales") ||
            buttonText.includes("contact")
          ) {
            showNotification(
              "📞 Sales team will contact you within 24 hours.",
              "info"
            );
          } else {
            showNotification("✨ Action completed successfully!", "success");
          }

          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      });

      // Notification system
      function showNotification(message, type = "info") {
        const notification = document.createElement("div");
        notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${
                  type === "success"
                    ? "linear-gradient(135deg, #4CAF50, #45a049)"
                    : type === "error"
                    ? "linear-gradient(135deg, #f44336, #da190b)"
                    : "linear-gradient(135deg, #2196F3, #0b7dda)"
                };
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 300px;
                font-weight: 500;
                backdrop-filter: blur(10px);
            `;
        notification.innerHTML = message;

        document.body.appendChild(notification);

        setTimeout(() => {
          notification.style.transform = "translateX(0)";
        }, 100);

        setTimeout(() => {
          notification.style.transform = "translateX(400px)";
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification);
            }
          }, 300);
        }, 4000);
      }

      // Parallax effect for floating elements
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const elements = document.querySelectorAll(".floating-element");

        elements.forEach((element, index) => {
          const speed = 0.3 + index * 0.1;
          const yPos = -(scrolled * speed);
          element.style.transform = `translateY(${yPos}px) rotate(${
            scrolled * 0.05
          }deg)`;
        });
      });

      // Enhanced form validation (if forms are added later)
      function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }

      // Lazy loading for images
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });

      // Add keyboard navigation support
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          // Close mobile menu if open
          if (navLinks.classList.contains("active")) {
            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");
          }
        }
      });

      // Performance optimization: Throttle scroll events
      let ticking = false;

      function updateOnScroll() {
        // Any scroll-based updates go here
        ticking = false;
      }

      function requestTick() {
        if (!ticking) {
          requestAnimationFrame(updateOnScroll);
          ticking = true;
        }
      }

      // Add mouse trail effect (subtle)
      let mouseTrail = [];
      const maxTrailLength = 5;

      document.addEventListener("mousemove", (e) => {
        mouseTrail.push({
          x: e.clientX,
          y: e.clientY,
          time: Date.now(),
        });

        if (mouseTrail.length > maxTrailLength) {
          mouseTrail.shift();
        }

        // Remove old trail points
        mouseTrail = mouseTrail.filter(
          (point) => Date.now() - point.time < 500
        );
      });

      // Add focus styles for accessibility
      document.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          document.body.classList.add("using-keyboard");
        }
      });

      document.addEventListener("mousedown", () => {
        document.body.classList.remove("using-keyboard");
      });

      // Add CSS for keyboard focus
      const focusStyle = document.createElement("style");
      focusStyle.textContent = `
            .using-keyboard *:focus {
                outline: 2px solid #4ecdc4 !important;
                outline-offset: 2px !important;
            }
        `;
      document.head.appendChild(focusStyle);

      // Add ripple animation CSS
      const rippleStyle = document.createElement("style");
      rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            .lazy {
                filter: blur(5px);
                transition: filter 0.3s;
            }
            
            .lazy.loaded {
                filter: blur(0px);
            }
        `;
      document.head.appendChild(rippleStyle);

      // Initialize everything when DOM is loaded
      document.addEventListener("DOMContentLoaded", () => {
        // Add stagger animation to feature cards
        const featureCards = document.querySelectorAll(".feature-card");
        featureCards.forEach((card, index) => {
          card.style.animationDelay = `${index * 0.1}s`;
        });

        // Add stagger animation to review cards
        const reviewCards = document.querySelectorAll(".review-card");
        reviewCards.forEach((card, index) => {
          card.style.animationDelay = `${index * 0.15}s`;
        });

        // Add stagger animation to pricing cards
        const pricingCards = document.querySelectorAll(".pricing-card");
        pricingCards.forEach((card, index) => {
          card.style.animationDelay = `${index * 0.2}s`;
        });

        console.log("TaskFlow landing page loaded successfully! 🚀");
      });

      // Error handling for images
      document.querySelectorAll("img").forEach((img) => {
        img.addEventListener("error", function () {
          this.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
          this.style.display = "flex";
          this.style.alignItems = "center";
          this.style.justifyContent = "center";
          this.innerHTML =
            '<i class="fas fa-image" style="font-size: 3rem; color: white; opacity: 0.5;"></i>';
        });
      });
 