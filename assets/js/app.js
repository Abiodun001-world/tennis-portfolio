document.addEventListener('DOMContentLoaded', function() {
    // Define rate limit variables
    const RATE_LIMIT = 60; // Maximum number of requests allowed per minute
    const RATE_LIMIT_PERIOD = 60000; // Period in milliseconds (1 minute)
  
    let requestCount = 0; // Counter for requests
    let lastResetTime = Date.now(); // Timestamp of last rate limit reset
  
    // Nav hamburgerburger selections
    const burger = document.querySelector("#burger-menu");
    const ul = document.querySelector("nav ul");
    const nav = document.querySelector("nav");
    const abiodunAdekunleHeading = document.querySelector("h1");
  
    // Scroll to top selection
    const scrollUp = document.querySelector("#scroll-up");
  
    // Select nav links
    const navLink = document.querySelectorAll(".nav-link");
  
    // Ensure elements exist before adding event listeners
    if (burger && ul && nav && abiodunAdekunleHeading && scrollUp) {
      // Hamburger menu function
      burger.addEventListener("click", () => {
        if (!isRateLimited()) {
          ul.classList.toggle("show");
        } else {
          alert("Rate limit exceeded. Please try again later.");
        }
      });
  
      // Close hamburger menu when a link is clicked
      navLink.forEach((link) =>
        link.addEventListener("click", () => {
          ul.classList.remove("show");
        })
      );
  
      // scroll to top functionality
      scrollUp.addEventListener("click", () => {
        if (!isRateLimited()) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else {
          alert("Rate limit exceeded. Please try again later.");
        }
      });
  
      // Redirect to homepage when the <h1> element is clicked
      abiodunAdekunleHeading.addEventListener("click", () => {
        if (!isRateLimited()) {
          window.location.href = "/"; // Replaced "/" with the actual path to the homepage
        } else {
          alert("Rate limit exceeded. Please try again later.");
        }
      });
    } else {
      console.error('One or more elements not found.');
    }
  
    // Function to check if rate limit exceeded
    function isRateLimited() {
      const currentTime = Date.now();
      if (currentTime - lastResetTime > RATE_LIMIT_PERIOD) {
        // Reset request count if period has elapsed
        requestCount = 0;
        lastResetTime = currentTime;
      }
      requestCount++;
      return requestCount > RATE_LIMIT;
    }
  });
  