// ===========================
// MOBILE MENU TOGGLE
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('a[href^="#"]');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for hash links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===========================
    // SCROLL ANIMATIONS
    // ===========================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and other elements
    document.querySelectorAll('.service-card, .gallery-item, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===========================
    // GALLERY IMAGE PLACEHOLDER
    // ===========================
    
    // Function to create placeholder images
    function createPlaceholderImage(canvas, color, text) {
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 400;
        
        // Fill background with gradient
        const gradient = ctx.createLinearGradient(0, 0, 400, 400);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, adjustColor(color, 20));
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 400);
        
        // Add text
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 200, 200);
        
        return canvas.toDataURL();
    }

    function adjustColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255))
            .toString(16).slice(1);
    }

    // Replace gallery images with placeholders if missing
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const placeholderColors = [
        { color: '#1e40af', text: 'Barbed Wire Installation' },
        { color: '#0284c7', text: 'Chainlink Fencing' },
        { color: '#16a34a', text: 'Garden Fencing' },
        { color: '#dc2626', text: 'Slab Wall' },
        { color: '#7c3aed', text: 'Fence Gate' },
        { color: '#ea580c', text: 'Professional Work' }
    ];

    galleryImages.forEach((img, index) => {
        img.addEventListener('error', function() {
            // Create placeholder on image load error
            const canvas = document.createElement('canvas');
            const placeholder = createPlaceholderImage(
                canvas,
                placeholderColors[index % placeholderColors.length].color,
                placeholderColors[index % placeholderColors.length].text
            );
            this.src = placeholder;
        });

        // Set timeout to show placeholder if image doesn't load within 2 seconds
        setTimeout(() => {
            if (img.naturalWidth === 0) {
                const canvas = document.createElement('canvas');
                const placeholder = createPlaceholderImage(
                    canvas,
                    placeholderColors[index % placeholderColors.length].color,
                    placeholderColors[index % placeholderColors.length].text
                );
                img.src = placeholder;
            }
        }, 2000);
    });

    // ===========================
    // WHATSAPP LINK ENHANCEMENT
    // ===========================
    
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow the link to work normally
            // Message will be sent directly through WhatsApp
        });
    });

    // ===========================
    // ANALYTICS (OPTIONAL)
    // ===========================
    
    // Track button clicks
    const primaryButtons = document.querySelectorAll('.btn');
    primaryButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            try {
                if (window.gtag) {
                    gtag('event', 'button_click', {
                        'button_text': this.textContent
                    });
                }
            } catch (e) {
                // Analytics not available
            }
        });
    });

    // ===========================
    // SCROLL TO TOP ON HASH CHANGE
    // ===========================
    
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash;
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = element.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });

    // ===========================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ===========================
    
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ===========================
    // LAZY LOAD IMAGES (if needed)
    // ===========================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Smooth scroll to element
 */
function smoothScrollToElement(element) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = element.offsetTop - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Format phone number for WhatsApp
 */
function formatWhatsAppNumber(number) {
    // Remove all non-digits
    const cleaned = number.replace(/\D/g, '');
    // Return formatted number
    return cleaned;
}

/**
 * Open WhatsApp with pre-filled message
 */
function openWhatsApp(message) {
    const phoneNumber = '919645484001'; // Replace with your number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}
