// ===== COMPTEUR DE VISITES =====
document.addEventListener('DOMContentLoaded', function() {
    const visitCountElement = document.getElementById('visitCount');
    
    if (visitCountElement) {
        // Récupérer le nombre de visites depuis le stockage
        let visitCount = getVisitCount();
        
        // Incrémenter le compteur
        visitCount++;
        
        // Sauvegarder le nouveau compte
        saveVisitCount(visitCount);
        
        // Afficher avec animation
        animateCounter(visitCountElement, visitCount);
    }
});

// Récupérer le compteur (simulé avec une variable)
let globalVisitCount = 1247; // Valeur initiale simulée

function getVisitCount() {
    // Incrémenter à chaque chargement de page
    globalVisitCount++;
    return globalVisitCount;
}

function saveVisitCount(count) {
    globalVisitCount = count;
}

// Animation du compteur
function animateCounter(element, targetValue) {
    let currentValue = 0;
    const increment = Math.ceil(targetValue / 50);
    const duration = 1500; // 1.5 secondes
    const stepTime = duration / (targetValue / increment);
    
    const timer = setInterval(function() {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = formatNumber(currentValue);
    }, stepTime);
}

// Formater le nombre avec des espaces
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Ajouter une petite animation au compteur
document.addEventListener('DOMContentLoaded', function() {
    const counter = document.querySelector('.visit-counter');
    if (counter) {
        // Animation d'entrée
        setTimeout(function() {
            counter.style.opacity = '1';
            counter.style.transform = 'scale(1)';
        }, 500);
        
        counter.style.opacity = '0';
        counter.style.transform = 'scale(0.8)';
        counter.style.transition = 'all 0.5s ease';
    }
});