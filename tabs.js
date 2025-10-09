// ===== GESTION DES ONGLETS =====
function showTab(tabName) {
    // Cacher tous les contenus d'onglets
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
        tabContents[i].style.display = 'none';
    }
    
    // Désactiver tous les boutons d'onglets
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // Afficher le contenu de l'onglet sélectionné
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.style.display = 'block';
        selectedTab.classList.add('active');
        
        // Animation d'apparition
        selectedTab.style.opacity = '0';
        setTimeout(function() {
            selectedTab.style.transition = 'opacity 0.3s ease';
            selectedTab.style.opacity = '1';
        }, 10);
    }
    
    // Activer le bouton cliqué
    const clickedButton = event.target;
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Initialiser les onglets au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Afficher le premier onglet par défaut
    const firstTab = document.querySelector('.tab-content');
    if (firstTab) {
        firstTab.classList.add('active');
        firstTab.style.display = 'block';
    }
    
    // Activer le premier bouton
    const firstButton = document.querySelector('.tab-button');
    if (firstButton) {
        firstButton.classList.add('active');
    }
});

// Support des raccourcis clavier pour naviguer entre onglets
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey) {
        const tabButtons = document.querySelectorAll('.tab-button');
        const activeButton = document.querySelector('.tab-button.active');
        
        if (!activeButton || tabButtons.length === 0) return;
        
        const currentIndex = Array.from(tabButtons).indexOf(activeButton);
        
        // Ctrl + Flèche droite : onglet suivant
        if (e.key === 'ArrowRight' && currentIndex < tabButtons.length - 1) {
            e.preventDefault();
            tabButtons[currentIndex + 1].click();
        }
        
        // Ctrl + Flèche gauche : onglet précédent
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            e.preventDefault();
            tabButtons[currentIndex - 1].click();
        }
    }
});