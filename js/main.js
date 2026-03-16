// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initMobileMenu();
  initSmoothScroll();
  initNavbarScroll();
  initActiveLink();
  initFormHandling();
  initStaggeredAnimations();
});

// Scroll reveal for sections
function initScrollReveal() {
  const sections = document.querySelectorAll('.section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  sections.forEach(section => observer.observe(section));
}

// Mobile menu toggle
function initMobileMenu() {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links a');

  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }
}

// Smooth scroll for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      
      if (target) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Active link highlighting
function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY;
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.classList.add('active');
      }
    });
  });
}

// Form handling
function initFormHandling() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  
  // Add loading state
  submitBtn.classList.add('loading');
  submitBtn.textContent = 'Sending...';
  
  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    // Remove loading state
    submitBtn.classList.remove('loading');
    submitBtn.textContent = 'Send Inquiry';
    
    // Show success message
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    
    // Reset form
    form.reset();
  }, 1500);
}

// Notification system
function showNotification(message, type = 'success') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: var(--bg-secondary);
      border-left: 4px solid ${type === 'success' ? 'var(--accent-crimson)' : 'var(--tech-blue)'};
      border-radius: 8px;
      padding: 1rem 1.5rem;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      z-index: 9999;
      animation: slideIn 0.3s ease-out forwards;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: white;
    }
    
    .notification i {
      font-size: 1.5rem;
      color: ${type === 'success' ? 'var(--accent-crimson)' : 'var(--tech-blue)'};
    }
    
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(notification);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out forwards';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Staggered animations for tools and studio nodes
function initStaggeredAnimations() {
  const toolsCategories = document.querySelectorAll('.tools-category');
  const studioModel = document.querySelector('.studio-model');
  const toolsItems = document.querySelectorAll('.tool-item');
  const modelNodes = document.querySelectorAll('.core-node, .team-node, .network-node');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        
        // Stagger tools items
        if (entry.target.classList.contains('tools-category')) {
          const categoryTools = entry.target.querySelectorAll('.tool-item');
          categoryTools.forEach((item, index) => {
            setTimeout(() => item.classList.add('visible'), 150 * index);
          });
        }
        
        // Stagger studio nodes
        if (entry.target.classList.contains('studio-model')) {
          modelNodes.forEach((node, index) => {
            setTimeout(() => node.classList.add('visible'), 200 * index);
          });
        }
      }
    });
  }, { threshold: 0.15 });

  toolsCategories.forEach(category => observer.observe(category));
  if (studioModel) observer.observe(studioModel);
}

// Parallax effect for hero (optional)
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.scrollY;
  
  if (hero && scrolled < window.innerHeight) {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = 1 - (scrolled * 0.002);
    }
  }
});

// Preloader (optional)
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
  initGallery();
});

function initGallery() {
  // Gallery data - Updated with all projects
  // Gallery data - Updated with shorter descriptions
const galleries = {
  '3d-cars': {
    images: [
      'assets/3dvisualization/1.jpg',
      'assets/3dvisualization/2.jpg',
      'assets/3dvisualization/3.jpg'
    ],
    title: 'Power & Speed: Veneno meets Aventador',
    behance: 'https://www.behance.net/13dimensionsstudio'
  },
  '3d-architecture': {
    images: [
      'assets/3darchitecture/1.jpeg',
      'assets/3darchitecture/2.jpeg',
      'assets/3darchitecture/3.jpeg',
      'assets/3darchitecture/4.jpeg'
    ],
    title: 'Precision Unveiled: 3D Architectural Walkthrough',
    behance: 'https://www.behance.net/13dimensionsstudio'
  },
  '3d-product': {
    images: [
      'assets/3dproduct/1.jpg',
      'assets/3dproduct/2.jpg',
      'assets/3dproduct/3.jpg',
      'assets/3dproduct/4.jpg'
    ],
    title: 'Tropical Oasis: Elevating Skincare Presentation',
    behance: 'https://www.behance.net/13dimensionsstudio'
  },
  'uiux': {
    images: [
      'assets/uiuxdesign/1.jpeg',
      'assets/uiuxdesign/2.jpeg',
      'assets/uiuxdesign/3.jpeg',
      'assets/uiuxdesign/4.jpeg'
    ],
    title: 'Verdantix: Smart Biogas Monitoring App',
    behance: 'https://www.behance.net/13dimensionsstudio'
  },
  'software': {
    images: [
      'assets/software/1.jpg',
      'assets/software/2.png',
      'assets/software/3.png',
      'assets/software/4.png'
    ],
    title: 'LogAI — Log Monitoring Dashboard',
    behance: 'https://www.behance.net/13dimensionsstudio'
  },
  '3d-modeling': {
    images: [
      'assets/3dmodeling/1.jpg',
      'assets/3dmodeling/2.jpg',
      'assets/3dmodeling/3.jpg',
      'assets/3dmodeling/4.jpg',
      'assets/3dmodeling/5.jpg',
      'assets/3dmodeling/6.jpg',
      'assets/3dmodeling/7.jpg'
    ],
    title: 'Precision Engineering: Military Collection',
    behance: 'https://www.behance.net/13dimensionsstudio'
  }
};

  const modal = document.getElementById('galleryModal');
  const modalImage = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const modalDescription = document.getElementById('modalDescription');
  const modalCounter = document.getElementById('modalCounter');
  const behanceLink = document.getElementById('behanceLink');
  const closeBtn = document.querySelector('.modal-close');
  const prevBtn = document.querySelector('.modal-nav.prev');
  const nextBtn = document.querySelector('.modal-nav.next');
  
  let currentGallery = null;
  let currentIndex = 0;

  // Open modal when clicking on project cards with gallery data
  document.querySelectorAll('.project-card[data-gallery]').forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't open if clicking on a link inside the card
      if (e.target.tagName === 'A') return;
      
      const galleryId = this.dataset.gallery;
      const index = parseInt(this.dataset.index) || 0;
      
      openGallery(galleryId, index);
    });
  });

  function openGallery(galleryId, index) {
    if (!galleries[galleryId]) return;
    
    currentGallery = galleryId;
    currentIndex = index;
    
    updateModalImage();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    // Add escape key listener
    document.addEventListener('keydown', handleKeyDown);
  }

  function updateModalImage() {
    if (!currentGallery || !galleries[currentGallery]) return;
    
    const gallery = galleries[currentGallery];
    const imagePath = gallery.images[currentIndex];
    
    modalImage.src = imagePath;
    modalCaption.textContent = gallery.title;
    
    // Update description if element exists
    if (modalDescription) {
      modalDescription.textContent = gallery.description;
    }
    
    behanceLink.href = gallery.behance;
    
    // Update counter
    modalCounter.textContent = `${currentIndex + 1} / ${gallery.images.length}`;
    
    // Update navigation buttons
    prevBtn.classList.toggle('disabled', currentIndex === 0);
    nextBtn.classList.toggle('disabled', currentIndex === gallery.images.length - 1);
  }

  function nextImage() {
    if (!currentGallery || !galleries[currentGallery]) return;
    
    const gallery = galleries[currentGallery];
    if (currentIndex < gallery.images.length - 1) {
      currentIndex++;
      updateModalImage();
    }
  }

  function prevImage() {
    if (!currentGallery || !galleries[currentGallery]) return;
    
    if (currentIndex > 0) {
      currentIndex--;
      updateModalImage();
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    currentGallery = null;
    currentIndex = 0;
    
    // Remove escape key listener
    document.removeEventListener('keydown', handleKeyDown);
  }

  function handleKeyDown(e) {
    if (!modal.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
    }
  }

  // Event listeners
  closeBtn.addEventListener('click', closeModal);
  
  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    prevImage();
  });
  
  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    nextImage();
  });

  // Click outside to close
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// EmailJS Integration
document.addEventListener("DOMContentLoaded", function () {
  initEmailJS();
});

function initEmailJS() {
  // Initialize EmailJS with your Public Key
  emailjs.init("aIyiuPtxeT8MW0fM_");

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    // Remove any existing listeners first to prevent duplicates
    contactForm.removeEventListener("submit", handleEmailSubmit);
    contactForm.addEventListener("submit", handleEmailSubmit);
  }
}

// Flag to prevent double submission
let isSubmitting = false;

function handleEmailSubmit(event) {
  event.preventDefault();
  event.stopPropagation(); // Stop event bubbling
  
  // Prevent double submission
  if (isSubmitting) {
    console.log('Already submitting, ignoring...');
    return;
  }
  
  const form = event.target;
  const submitBtn = document.getElementById("submitBtn");
  const originalText = "Send Message"; // Use hardcoded string instead of DOM text
  
  // Collect form data
  const formData = {
    name: document.getElementById("name")?.value.trim() || "",
    email: document.getElementById("email")?.value.trim() || "",
    company: document.getElementById("company")?.value.trim() || "Not provided",
    project_type: document.getElementById("project_type")?.value || "",
    message: document.getElementById("message")?.value.trim() || "",
    submitted_at: new Date().toLocaleString()
  };

  // Validate required fields
  if (!formData.name || !formData.email || !formData.project_type || !formData.message) {
    showNotification("Please fill in all required fields.", "error");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    showNotification("Please enter a valid email address.", "error");
    return;
  }

  // Set submitting flag
  isSubmitting = true;
  
  // Show loading state
  submitBtn.classList.add("loading");
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Send email via EmailJS
  emailjs.send(
    "service_thkc0gb",
    "template_f69bnjv",
    {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      project_type: formData.project_type,
      message: formData.message,
      submitted_at: formData.submitted_at,
      reply_to: formData.email,
      to_email: "13dimensionsgraphics@gmail.com"
    }
  )
  .then(function (response) {
    console.log("SUCCESS!", response.status, response.text);
    
    // Show success message
    showNotification(
      "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.",
      "success"
    );

    // Reset form
    form.reset();
    
    // Reset button
    submitBtn.classList.remove("loading");
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Reset submitting flag AFTER everything is done
    setTimeout(() => {
      isSubmitting = false;
    }, 1000); // 1 second cooldown

  })
  .catch(function (error) {
    console.error("FAILED...", error);

    showNotification(
      "Oops! Something went wrong. Please try again or email us directly at 13dimensionsgraphics@gmail.com.",
      "error"
    );

    // Reset button
    submitBtn.classList.remove("loading");
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Reset submitting flag
    isSubmitting = false;
  });
}

// Optional: Add this to ensure any leftover event listeners are removed
window.addEventListener('load', function() {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    // Clone and replace the form to remove all listeners
    const newForm = contactForm.cloneNode(true);
    contactForm.parentNode.replaceChild(newForm, contactForm);
    
    // Reinitialize with new form
    initEmailJS();
  }
});

// Enhanced notification system
function showNotification(message, type = 'success') {
  // Remove any existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  // Choose icon based on type
  let icon = 'fa-check-circle';
  if (type === 'error') {
    icon = 'fa-exclamation-circle';
  } else if (type === 'warning') {
    icon = 'fa-exclamation-triangle';
  }
  
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${icon}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}