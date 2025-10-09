// ===== GESTION DU DIAPORAMA =====
let slideIndex = 1;
let slideTimer;

// Initialiser le diaporama
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.slideshow-container')) {
        showSlides(slideIndex);
        startAutoSlide();
    }
});

// Afficher une slide spécifique
function showSlides(n) {
    const slides = document.getElementsByClassName('slide');
    const dots = document.getElementsByClassName('dot');
    
    if (slides.length === 0) return;
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Cacher toutes les slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
        slides[i].style.display = 'none';
    }
    
    // Désactiver tous les dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    // Afficher la slide active
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = 'block';
        slides[slideIndex - 1].classList.add('active');
    }
    
    // Activer le dot correspondant
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Changer de slide (précédent/suivant)
function changeSlide(n) {
    clearInterval(slideTimer);
    slideIndex += n;
    showSlides(slideIndex);
    startAutoSlide();
}

// Aller à une slide spécifique
function currentSlide(n) {
    clearInterval(slideTimer);
    slideIndex = n;
    showSlides(slideIndex);
    startAutoSlide();
}

// Défilement automatique
function startAutoSlide() {
    slideTimer = setInterval(function() {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000); // Changer toutes les 5 secondes
}

// Arrêter le défilement automatique au survol
document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', function() {
            clearInterval(slideTimer);
        });
        
        slideshowContainer.addEventListener('mouseleave', function() {
            startAutoSlide();
        });
    }
});

// Support tactile pour mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slideshowContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe vers la gauche
        changeSlide(1);
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe vers la droite
        changeSlide(-1);
    }
}