// ===== BARRE DE PROGRESSION =====
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = scrollPercentage + '%';
    }
});

// ===== SMOOTH SCROLL POUR LES ANCRES =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== ANIMATION AU SCROLL =====
function revealOnScroll() {
    const elements = document.querySelectorAll('.card, .feature-card, .formule-card, .offer-card, .product-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialiser les éléments pour l'animation
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.card, .feature-card, .formule-card, .offer-card, .product-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== MENU MOBILE RESPONSIVE =====
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('header nav');
    
    // Créer le bouton hamburger si on est sur mobile
    if (window.innerWidth <= 768 && !document.querySelector('.hamburger')) {
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.style.cssText = 'display: none; font-size: 2rem; cursor: pointer; color: white;';
        
        const header = document.querySelector('header .container');
        header.appendChild(hamburger);
        
        hamburger.addEventListener('click', function() {
            const navUl = nav.querySelector('ul');
            if (navUl.style.display === 'flex') {
                navUl.style.display = 'none';
            } else {
                navUl.style.display = 'flex';
            }
        });
    }
});

// ===== GESTION RESPONSIVE DU MENU =====
function handleResponsiveMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('header nav ul');
    
    if (window.innerWidth <= 768) {
        if (hamburger) {
            hamburger.style.display = 'block';
        }
    } else {
        if (hamburger) {
            hamburger.style.display = 'none';
        }
        if (navUl) {
            navUl.style.display = 'flex';
        }
    }
}

window.addEventListener('resize', handleResponsiveMenu);
window.addEventListener('load', handleResponsiveMenu);

// ===== CONSOLE LOG POUR DEBUG =====
console.log('Vaisselle & Co - Site chargé avec succès ✓');