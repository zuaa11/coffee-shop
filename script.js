
// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const formGroups = document.querySelectorAll('.form-group');

const validateField = (field) => {
    const errorMessage = field.parentElement.querySelector('.error-message');
    
    if (field.validity.valid) {
        errorMessage.textContent = '';
        errorMessage.classList.remove('active');
        return true;
    } else {
        showError(field, errorMessage);
        return false;
    }
};

const showError = (field, errorMessage) => {
    if (field.validity.valueMissing) {
        errorMessage.textContent = 'This field is required';
    } else if (field.validity.typeMismatch) {
        errorMessage.textContent = `Please enter a valid ${field.type}`;
    } else if (field.validity.patternMismatch) {
        errorMessage.textContent = 'Please enter a 10-digit phone number';
    }
    errorMessage.classList.add('active');
};

// Real-time Validation
formGroups.forEach(group => {
    const input = group.querySelector('input, select, textarea');
    if (input) {
        input.addEventListener('input', () => {
            validateField(input);
        });
    }
});

// Form Submission
contactForm.addEventListener('submit', (e) => {
    let formValid = true;
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        if (input && !validateField(input)) {
            formValid = false;
        }
    });

    if (!formValid) {
        e.preventDefault();
    } else {
        e.preventDefault();
        alert('Thank you for your message! Well respond within 24 hours.');
        contactForm.reset();
    }
});


// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.closest('.faq-item');
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        
        // Toggle active class
        faqItem.classList.toggle('active');
        
        // Update ARIA attributes
        button.setAttribute('aria-expanded', !isExpanded);
        
        // Close other items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== faqItem) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }
        });
    });
});