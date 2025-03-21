// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Navigation menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navBar = document.querySelector('.nav-bar');
  
  hamburger.addEventListener('click', function() {
    navBar.classList.toggle('active');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navBar.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navBar.classList.contains('active')) {
      navBar.classList.remove('active');
    }
  });
  
  // Active navigation link based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-bar ul li a');
  
  function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Initial call to set active link
  setActiveLink();
  
  // Set active link on scroll
  window.addEventListener('scroll', setActiveLink);
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Close mobile menu after clicking a link
      if (navBar.classList.contains('active')) {
        navBar.classList.remove('active');
      }
    });
  });
  
  // Animate elements on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.card, .skill-card, .project-card, .contact-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.animation = 'fadeInUp 0.6s ease-out forwards';
      }
    });
  };
  
  // Initial call to animate elements
  animateOnScroll();
  
  // Animate elements on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Form submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      // For demonstration, we'll just log it and show an alert
      console.log({
        name,
        email,
        subject,
        message
      });
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }
});