const menuBtn = document.getElementById('menuBtn'); // Menu button element
const navLinks = document.getElementById('navLinks');   // Navigation links container

if (menuBtn && navLinks) { // Only add if both elements exist
  menuBtn.addEventListener('click', (e) => {
    // Prevent the click from propagating to the document listener
    e.stopPropagation();
    navLinks.classList.toggle('nav-open');
    menuBtn.innerHTML = navLinks.classList.contains('nav-open')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
}





const navItems = document.querySelectorAll("nav a");

navItems.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    // Set active class on clicked link
    navItems.forEach((otherLink) => otherLink.classList.remove("active"));
    this.classList.add("active");

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }

    // Close the menu after clicking a nav link
    if (navLinks && menuBtn) {
      navLinks.classList.remove('nav-open');
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
});

// New: Close the menu if a click occurs outside of navLinks and menuBtn
document.addEventListener('click', function (event) {
  // Check if the menu is open and the click target is outside navLinks and the menu button
  if (
    navLinks.classList.contains('nav-open') &&
    !navLinks.contains(event.target) &&
    !menuBtn.contains(event.target)
  ) {
    navLinks.classList.remove('nav-open');
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// FOR THE PRELOADER 
const imageUrls = [
  "././img/logo/shree_panchayat_logo.jpg",
  "./img/background/panchayat_background.jpeg",
 "./img/about/aboutus1.jpg",
 "./img/events/sport1.jpg",
 "./img/events/sport2.jpg",
 "./img/events/lecture1.jpg",
 "./img/resources/e_libary.png",
 "./img/faculty/science1.png",
 "./img/faculty/civil1.png",
 "./img/faculty/law1.png"
];

const totalImages = imageUrls.length;
let imagesLoaded = 0;

// 2. Function to update progress bar and text
function updateProgress() {
  imagesLoaded++;
  const percentage = Math.round((imagesLoaded / totalImages) * 100);
  document.getElementById("progressBar").style.width = percentage + "%";
  document.getElementById("loadingText").textContent = percentage + "%";

  // 3. Once all images are loaded, hide the preloader and show content
  if (imagesLoaded === totalImages) {
    // Optional small delay for a smooth finish
    setTimeout(() => {
      // Fade out preloader (using a CSS class)
      document.getElementById("preloader").classList.add("hidden");
      // After fade, set display: none
      setTimeout(() => {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("content").style.display = "block";
      }, 500); // match the transition duration in CSS
    }, 300);
  }
}

// 4. Preload images programmatically
function preloadImages() {
  imageUrls.forEach(url => {
    const img = new Image();
    // On each successful load or error, we consider the asset "done"
    img.onload = updateProgress;
    img.onerror = updateProgress;
    img.src = url;
  });
}

// 5. Start preloading once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  preloadImages();
});


//FOR THE ABOUT US SECTION
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
      root: null,
      threshold: 0.2,
  };
  
  const revealOnScroll = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("about-visible");
          }
      });
  };
  
  const observer = new IntersectionObserver(revealOnScroll, observerOptions);
  document.querySelectorAll(".about-text, .about-image-container").forEach(el => observer.observe(el));
});

// FOR THE NEWS ITEMS HIDE AND SEEK
function toggleNews(element) {
    const allNewsItems = document.querySelectorAll('.news-item');
    allNewsItems.forEach(item => {
        if (item !== element) {
            item.classList.remove('active');
        }
    });
    element.classList.toggle('active');
}

// FOR THE EVENTS ANIMATIONS 
document.addEventListener("DOMContentLoaded", function () {
    const eventItems = document.querySelectorAll(".event-item");
  
    function checkScroll() {
      const triggerBottom = window.innerHeight * 0.85;
  
      eventItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
  
        if (itemTop < triggerBottom) {
          setTimeout(() => {
            item.classList.add("show");
          }, index * 300);
        }
      });
    }
  
    window.addEventListener("scroll", checkScroll);
    checkScroll();
  });
  


// FOR THE RESOURCES SECTION SCROLL TRIGGER 

document.addEventListener('DOMContentLoaded', function() {
  const resourcesSection = document.getElementById('resources');
  const resourceItems = document.querySelectorAll('.resource-item');
  const learnMoreButton = document.querySelector('.learn-more');
  
  const options = {
    threshold: 0.5  // Adjust this value as needed
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let delay = 200; // Initial delay in milliseconds
        resourceItems.forEach(item => {
          setTimeout(() => {
            item.classList.add('show');
          }, delay);
          delay += 200; // Increase delay for each subsequent item
        });

        // Show the "Learn in Details" button after the resource items
        setTimeout(() => {
          learnMoreButton.classList.add('show');
        }, delay);

        // Unobserve after triggering the animation once
        observer.unobserve(resourcesSection);
      }
    });
  }, options);

  observer.observe(resourcesSection);
});

// FOR THE FACULTY SECTION 
document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer to animate boxes on scroll
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optionally, stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const facultyBoxes = document.querySelectorAll(".faculty-box");
  facultyBoxes.forEach((box) => {
    observer.observe(box);

    // Toggle extra information on click
    box.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });
}); 


// FOR THE SCHOLARSHIPS SECTION
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
  };

  // Animate the scholarship table when it enters the viewport
  const scholarshipTable = document.getElementById("scholarshipTable");
  if (scholarshipTable) {
    const tableObserver = new IntersectionObserver(
      (entries, tableObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scholarship-visible");
            tableObserver.unobserve(entry.target);
          }
        });
      },
      observerOptions
    );
    tableObserver.observe(scholarshipTable);
  }
});


// FOR THE RULSE SECTION 
document.addEventListener("DOMContentLoaded", function () {
  // Select all rule items
  const ruleItems = document.querySelectorAll(".rule-item");

  // Intersection Observer Options
  const observerOptions = {
    threshold: 0.1,
  };

  // Create an Intersection Observer to animate items on scroll
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optionally unobserve to prevent re-triggering the animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe each rule item and add click listener for toggling details
  ruleItems.forEach((item) => {
    observer.observe(item);

    // Toggle details on click
    item.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });

  // More Rules Toggle Button
  const moreRulesBtn = document.querySelector(".more-rules-btn");
  const moreRulesContainer = document.querySelector(".more-rules");

  moreRulesBtn.addEventListener("click", () => {
    if (moreRulesContainer.style.display === "block") {
      moreRulesContainer.style.display = "none";
      moreRulesBtn.textContent = "Show More Rules";
    } else {
      moreRulesContainer.style.display = "block";
      // For each extra rule item, add scroll animation if needed
      const extraRuleItems = moreRulesContainer.querySelectorAll(".rule-item");
      extraRuleItems.forEach((item) => {
        observer.observe(item);
      });
      moreRulesBtn.textContent = "Hide More Rules";
    }
  });
});