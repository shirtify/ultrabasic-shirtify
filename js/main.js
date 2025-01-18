// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Image loading optimization
    const productImages = document.querySelectorAll('img');
    productImages.forEach(img => {
        // Add loading="lazy" for better performance
        img.loading = 'lazy';
        
        // Add error handling for images
        img.onerror = function() {
            this.src = 'placeholder.jpg';
            this.alt = 'Imagen no disponible';
        };
    });

    // WhatsApp link handling
    const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add basic analytics if needed
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'product_name': this.closest('.product-card')?.querySelector('h2')?.textContent || 'General Contact'
                });
            }
        });
    });

    // Simple form validation for contact section (if needed)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = this.querySelector('textarea')?.value || '';
            const whatsappNumber = 'YOUR_NUMBER_HERE'; // Replace with actual number
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        });
    }

    // Basic responsive navigation (if needed)
    const menuButton = document.querySelector('#menu-button');
    const mobileMenu = document.querySelector('#mobile-menu');
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Helper function to format prices (if needed)
function formatPrice(price) {
    return new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC',
        minimumFractionDigits: 0
    }).format(price);
}

// Helper function to validate WhatsApp messages
function sanitizeWhatsAppMessage(message) {
    return message
        .trim()
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .substring(0, 1000); // Limit message length
}

// Detect if user is on mobile for WhatsApp deep linking
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Update WhatsApp links based on device
function updateWhatsAppLinks() {
    const isMobile = isMobileDevice();
    const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
    
    whatsappLinks.forEach(link => {
        const currentHref = link.href;
        if (isMobile && !currentHref.includes('api.whatsapp.com')) {
            link.href = currentHref.replace('wa.me', 'api.whatsapp.com/send');
        }
    });
}