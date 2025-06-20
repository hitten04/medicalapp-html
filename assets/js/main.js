// Navigation scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    const mainNav = document.getElementById('mainNav');
    
    // Change navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            mainNav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            mainNav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            mainNav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            mainNav.style.boxShadow = 'none';
        }
    });

    // Handle dropdown submenus
    const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');
    
    dropdownSubmenus.forEach(submenu => {
        const dropdownToggle = submenu.querySelector('.dropdown-toggle');
        const dropdownMenu = submenu.querySelector('.dropdown-menu');
        
        // For desktop: show submenu on hover
        if (window.innerWidth >= 992) {
            submenu.addEventListener('mouseenter', function() {
                dropdownMenu.classList.add('show');
            });
            
            submenu.addEventListener('mouseleave', function() {
                dropdownMenu.classList.remove('show');
            });
        }
        
        // For mobile: toggle submenu on click
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isShown = dropdownMenu.classList.contains('show');
            
            // Hide all other submenus
            document.querySelectorAll('.dropdown-submenu .dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
            
            if (!isShown) {
                dropdownMenu.classList.add('show');
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Remove any existing validation classes
            const inputs = contactForm.querySelectorAll('.form-control');
            inputs.forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            });

            let isValid = true;

            // Validate each required field
            inputs.forEach(input => {
                if (input.hasAttribute('required')) {
                    if (input.value.trim() === '') {
                        input.classList.add('is-invalid');
                        isValid = false;
                    } else {
                        // Additional validation for email
                        if (input.type === 'email') {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(input.value.trim())) {
                                input.classList.add('is-invalid');
                                isValid = false;
                            } else {
                                input.classList.add('is-valid');
                            }
                        } 
                        // Additional validation for phone
                        else if (input.type === 'tel') {
                            const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
                            if (!phoneRegex.test(input.value.trim())) {
                                input.classList.add('is-invalid');
                                isValid = false;
                            } else {
                                input.classList.add('is-valid');
                            }
                        }
                        else {
                            input.classList.add('is-valid');
                        }
                    }
                }
            });

            if (isValid) {
                // Add loading state to submit button
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';

                // Simulate form submission (replace with actual form submission logic)
                setTimeout(() => {
                    // Reset form and show success message
                    contactForm.reset();
                    inputs.forEach(input => {
                        input.classList.remove('is-valid');
                    });
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    // Show success alert
                    const successAlert = document.createElement('div');
                    successAlert.className = 'alert alert-success alert-dismissible fade show mt-3';
                    successAlert.role = 'alert';
                    successAlert.innerHTML = `
                        <strong>Thank you!</strong> Your message has been sent successfully.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    `;
                    contactForm.insertAdjacentElement('beforebegin', successAlert);

                    // Auto dismiss alert after 5 seconds
                    setTimeout(() => {
                        successAlert.remove();
                    }, 5000);
                }, 1500);
            }
        });

        // Real-time validation on input
        contactForm.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.remove('is-invalid');
                }
            });
        });
    }
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (mobileMenuToggle && navbarCollapse) {
    mobileMenuToggle.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbarCollapse.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navbarCollapse.classList.remove('show');
        }
    });
}

// Dynamic year in footer
const yearElement = document.querySelector('.current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
} 