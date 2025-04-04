// JavaScript for DocZHub demo
document.addEventListener('DOMContentLoaded', function() {
    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Add animation classes with delay
    featureCards.forEach((card, index) => {
        card.classList.add('animate-fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    testimonialCards.forEach((card, index) => {
        card.classList.add('animate-fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Search functionality
    const searchButton = document.querySelector('.bg-blue-600.hover\\:bg-blue-700.text-white.px-6.py-2');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            alert('Search functionality would connect to the DocZHub database in the full version. This is a demo showcase.');
        });
    }

    // Sign in and register buttons
    const signInButton = document.querySelector('.bg-blue-600.hover\\:bg-blue-700.text-white.px-4.py-2');
    if (signInButton) {
        signInButton.addEventListener('click', function() {
            alert('The full version would include secure authentication with role-based access for patients and providers.');
        });
    }

    const registerButton = document.querySelector('.ml-4.bg-white.hover\\:bg-gray-100.text-blue-600');
    if (registerButton) {
        registerButton.addEventListener('click', function() {
            alert('The full version would include separate registration flows for patients and healthcare providers.');
        });
    }

    // Find a Doctor button
    const findDoctorButton = document.querySelector('.bg-white.text-blue-600.hover\\:bg-gray-100.px-6.py-3');
    if (findDoctorButton) {
        findDoctorButton.addEventListener('click', function() {
            document.getElementById('specialty').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // For Providers button
    const forProvidersButton = document.querySelector('.bg-transparent.hover\\:bg-blue-700.text-white.border.border-white.px-6.py-3');
    if (forProvidersButton) {
        forProvidersButton.addEventListener('click', function() {
            alert('The full version would include a dedicated provider portal with practice management tools.');
        });
    }

    // CTA buttons
    const getStartedButton = document.querySelector('.text-blue-600.bg-white.hover\\:bg-blue-50');
    if (getStartedButton) {
        getStartedButton.addEventListener('click', function() {
            alert('The full version would guide users through account creation and onboarding.');
        });
    }

    const learnMoreButton = document.querySelector('.text-white.bg-blue-700.hover\\:bg-blue-800');
    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', function() {
            alert('The full version would include detailed information about DocZHub features and pricing.');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Mobile menu toggle (for smaller screens)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'sm:hidden block p-2 text-blue-600';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    
    const nav = document.querySelector('nav .flex-shrink-0');
    if (nav) {
        nav.appendChild(mobileMenuButton);
    }
    
    // Add responsive behavior
    const handleResize = () => {
        if (window.innerWidth < 640) {
            document.querySelectorAll('nav .sm\\:flex').forEach(el => {
                el.style.display = 'none';
            });
        } else {
            document.querySelectorAll('nav .sm\\:flex').forEach(el => {
                el.style.display = 'flex';
            });
        }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
});
