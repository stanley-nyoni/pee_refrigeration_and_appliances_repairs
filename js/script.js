// js/script.js

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize all popovers
    initPopovers();
    
    // Initialize contact form handling
    initContactForm();
    
    // Initialize service cards animation
    initServiceCards();
    
    // Initialize WhatsApp button tracking
    initWhatsAppTracking();
    
    // Initialize call tracking
    initCallTracking();
    
    // Initialize testimonials slider
    initTestimonialsSlider();
});


// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// Initialize Bootstrap popovers
function initPopovers() {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!name || !phone || !message) {
                showAlert('Please fill in all required fields.', 'danger');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = `New Contact Form Submission:%0A%0AName: ${name}%0APhone: ${phone}%0AEmail: ${email || 'Not provided'}%0AService: ${service || 'Not specified'}%0AMessage: ${message}`;
            
            // Show success message
            showAlert('Thank you! You will now be directed to WhatsApp to complete your inquiry.', 'success');
            
            // Open WhatsApp after delay
            setTimeout(function() {
                window.open(`https://wa.me/27731556489?text=${whatsappMessage}`, '_blank');
            }, 1500);
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Show alert message
function showAlert(message, type) {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Add to page
    const container = document.querySelector('.container') || document.querySelector('main');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(function() {
            const alert = bootstrap.Alert.getOrCreateInstance(alertDiv);
            alert.close();
        }, 5000);
    }
}

// Service cards animation on scroll
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length > 0) {
        // Create intersection observer
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    // Add delay for staggered animation
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Set initial state and observe each card
        serviceCards.forEach(function(card, index) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }
}

// WhatsApp button tracking
function initWhatsAppTracking() {
    document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Get service context if available
            const serviceName = this.closest('.service-card') ? 
                this.closest('.service-card').querySelector('h4').textContent : 
                'General Inquiry';
            
            // Log to console (in real app, send to analytics)
            console.log(`WhatsApp initiated for: ${serviceName} from ${window.location.pathname}`);
            
            // Add slight delay for tracking
            setTimeout(() => {
                // Allow the link to proceed normally
                return true;
            }, 100);
        });
    });
}

// Call tracking
function initCallTracking() {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Log to console (in real app, send to analytics)
            console.log(`Call initiated to: ${this.href} from ${window.location.pathname}`);
            
            // Add slight delay for tracking
            setTimeout(() => {
                // Allow the link to proceed normally
                return true;
            }, 100);
        });
    });
}

// Testimonials slider
function initTestimonialsSlider() {
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        // Initialize Bootstrap carousel
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000,
            wrap: true
        });
        
        // Pause on hover
        testimonialCarousel.addEventListener('mouseenter', function() {
            carousel.pause();
        });
        
        testimonialCarousel.addEventListener('mouseleave', function() {
            carousel.cycle();
        });
    }
}

// Service filtering (for services page)
function filterServices(category) {
    const serviceCards = document.querySelectorAll('.service-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        }
    });
    
    // Show/hide service cards
    serviceCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 25px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-red);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 999;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s;
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide button on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    });
}

// Initialize back to top button
setTimeout(initBackToTop, 1000);

// Page specific initialization
function initPageSpecific() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'services.html':
            initServiceFiltering();
            break;
        case 'contact.html':
            initMap();
            break;
        case 'index.html':
            initHeroAnimation();
            break;
    }
}

// Initialize service filtering
function initServiceFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-filter');
                filterServices(category);
            });
        });
    }
}

// Initialize Google Map
function initMap() {
    // This function would initialize a Google Map
    // For now, we're using an iframe embed
    console.log('Map initialized for Centurion area');
}

// Initialize hero animation
function initHeroAnimation() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        // Add typing effect
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        // ✅ START the animation
        typeWriter();
    }
}

// Initialize page specific features
setTimeout(initPageSpecific, 500);