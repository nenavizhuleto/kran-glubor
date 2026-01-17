// Modern JavaScript for website functionality

(function() {
    'use strict';

    // Mobile Menu Toggle
    const initMobileMenu = () => {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.main-nav');
        
        if (!toggle || !nav) return;
        
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    };

    // Sidebar Menu Toggle
    const initSidebarMenu = () => {
        const menuItems = document.querySelectorAll('.sidebar-menu > li');
        
        menuItems.forEach(item => {
            const menuItem = item.querySelector('.menu-item');
            const submenu = item.querySelector('.submenu');
            
            if (!submenu) return;
            
            menuItem.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Close other submenus
                menuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current submenu
                item.classList.toggle('active');
            });
        });
    };

    // Smooth Scroll for Anchor Links
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // Image Lazy Loading (if not supported natively)
    const initLazyLoading = () => {
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading is supported
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        } else {
            // Fallback for browsers without native lazy loading
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img.lazy').forEach(img => {
                imageObserver.observe(img);
            });
        }
    };

    // Active Navigation Highlighting
    const initActiveNav = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a, .sidebar-menu a');
        
        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath || 
                (currentPath === '/' && linkPath.includes('index.html'))) {
                link.classList.add('active');
                
                // Also highlight parent menu item if in sidebar
                const parentLi = link.closest('li');
                if (parentLi && parentLi.parentElement.classList.contains('sidebar-menu')) {
                    parentLi.classList.add('active');
                    const submenu = parentLi.querySelector('.submenu');
                    if (submenu) {
                        submenu.style.display = 'block';
                    }
                }
            }
        });
    };

    // Form Validation (if forms exist)
    const initFormValidation = () => {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                if (!form.checkValidity()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated');
            });
        });
    };

    // Gallery Lightbox (simple implementation)
    const initGallery = () => {
        const galleryImages = document.querySelectorAll('.gallery img, .featured-image img');
        
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                // Simple lightbox implementation
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    cursor: pointer;
                `;
                
                const fullImg = document.createElement('img');
                fullImg.src = this.src;
                fullImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                `;
                
                lightbox.appendChild(fullImg);
                document.body.appendChild(lightbox);
                
                lightbox.addEventListener('click', () => {
                    document.body.removeChild(lightbox);
                });
                
                // Close on Escape key
                const closeOnEscape = (e) => {
                    if (e.key === 'Escape') {
                        document.body.removeChild(lightbox);
                        document.removeEventListener('keydown', closeOnEscape);
                    }
                };
                document.addEventListener('keydown', closeOnEscape);
            });
        });
    };

    // Initialize all functionality when DOM is ready
    const init = () => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        initMobileMenu();
        initSidebarMenu();
        initSmoothScroll();
        initLazyLoading();
        initActiveNav();
        initFormValidation();
        initGallery();
    };

    // Start initialization
    init();

    // Export functions for potential external use
    window.siteFunctions = {
        initMobileMenu,
        initSidebarMenu,
        initSmoothScroll,
        initLazyLoading,
        initActiveNav,
        initFormValidation,
        initGallery
    };
})();