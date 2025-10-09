// ===== VALIDATION DU FORMULAIRE DE CONTACT =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation des champs
            if (validateForm()) {
                // Afficher un message de confirmation
                showConfirmation();
                
                // Réinitialiser le formulaire après 2 secondes
                setTimeout(function() {
                    contactForm.reset();
                }, 2000);
            }
        });
        
        // Validation en temps réel
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
});

// Valider le formulaire complet
function validateForm() {
    let isValid = true;
    const form = document.getElementById('contactForm');
    
    // Nom
    const nom = form.querySelector('#nom');
    if (nom && nom.value.trim().length < 2) {
        showError(nom, 'Le nom doit contenir au moins 2 caractères');
        isValid = false;
    } else if (nom) {
        removeError(nom);
    }
    
    // Email
    const email = form.querySelector('#email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.value)) {
        showError(email, 'Veuillez entrer une adresse email valide');
        isValid = false;
    } else if (email) {
        removeError(email);
    }
    
    // Téléphone (optionnel mais si rempli, doit être valide)
    const telephone = form.querySelector('#telephone');
    const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
    if (telephone && telephone.value && !phoneRegex.test(telephone.value.replace(/\s/g, ''))) {
        showError(telephone, 'Numéro de téléphone invalide (format: 06 12 34 56 78)');
        isValid = false;
    } else if (telephone) {
        removeError(telephone);
    }
    
    // Type d'événement
    const type = form.querySelector('#type');
    if (type && !type.value) {
        showError(type, 'Veuillez sélectionner un type d\'événement');
        isValid = false;
    } else if (type) {
        removeError(type);
    }
    
    // Services (au moins un coché)
    const services = form.querySelectorAll('input[name="services"]:checked');
    if (services.length === 0) {
        const checkboxGroup = form.querySelector('.checkbox-group');
        showError(checkboxGroup, 'Veuillez sélectionner au moins un service');
        isValid = false;
    } else {
        const checkboxGroup = form.querySelector('.checkbox-group');
        removeError(checkboxGroup);
    }
    
    // Message
    const message = form.querySelector('#message');
    if (message && message.value.trim().length < 10) {
        showError(message, 'Le message doit contenir au moins 10 caractères');
        isValid = false;
    } else if (message) {
        removeError(message);
    }
    
    // RGPD
    const rgpd = form.querySelector('input[name="rgpd"]');
    if (rgpd && !rgpd.checked) {
        showError(rgpd.parentElement, 'Vous devez accepter l\'utilisation de vos données');
        isValid = false;
    } else if (rgpd) {
        removeError(rgpd.parentElement);
    }
    
    return isValid;
}

// Valider un champ individuel
function validateField(field) {
    if (field.hasAttribute('required') && !field.value) {
        showError(field, 'Ce champ est obligatoire');
        return false;
    } else {
        removeError(field);
        return true;
    }
}

// Afficher une erreur
function showError(element, message) {
    removeError(element);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    if (element.parentElement) {
        element.parentElement.appendChild(errorDiv);
        element.style.borderColor = '#e74c3c';
    }
}

// Retirer une erreur
function removeError(element) {
    if (element.parentElement) {
        const existingError = element.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        element.style.borderColor = '';
    }
}

// Afficher un message de confirmation
function showConfirmation() {
    const form = document.getElementById('contactForm');
    
    const confirmDiv = document.createElement('div');
    confirmDiv.className = 'confirmation-message';
    confirmDiv.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        margin-top: 20px;
        animation: slideIn 0.5s ease;
    `;
    confirmDiv.innerHTML = `
        <h4 style="margin: 0 0 10px 0;">✓ Message envoyé avec succès !</h4>
        <p style="margin: 0;">Nous vous répondrons dans les plus brefs délais.</p>
    `;
    
    form.parentElement.insertBefore(confirmDiv, form);
    
    // Ajouter l'animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Retirer le message après 5 secondes
    setTimeout(function() {
        confirmDiv.style.transition = 'all 0.5s ease';
        confirmDiv.style.opacity = '0';
        setTimeout(function() {
            confirmDiv.remove();
        }, 500);
    }, 5000);
}

// Formater le numéro de téléphone automatiquement
document.addEventListener('DOMContentLoaded', function() {
    const telInput = document.getElementById('telephone');
    if (telInput) {
        telInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formatted = '';
            
            for (let i = 0; i < value.length && i < 10; i++) {
                if (i > 0 && i % 2 === 0) {
                    formatted += ' ';
                }
                formatted += value[i];
            }
            
            e.target.value = formatted;
        });
    }
});