document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('project-form');
    if (!form) return;

    const successMessage = document.getElementById('form-success');
    const configs = {
        firstName: { required: 'Please enter your first name.' },
        lastName: { required: 'Please enter your last name.' },
        email: {
            required: 'Please enter your email address.',
            format: 'Enter a valid email address.'
        },
        phone: {
            pattern: 'Use numbers, spaces, parentheses, or dashes (7 or more characters).'
        },
        service: { required: 'Select the service you are interested in.' },
        message: { required: 'Tell us a bit about your project.' }
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9()+\-\s]{7,}$/;

    const toggleError = (input, message = '') => {
        const errorEl = document.getElementById(`${input.id}-error`);
        if (!errorEl) return;
        if (message) {
            errorEl.textContent = message;
            errorEl.classList.remove('hidden');
            input.setAttribute('aria-invalid', 'true');
        } else {
            errorEl.textContent = '';
            errorEl.classList.add('hidden');
            input.removeAttribute('aria-invalid');
        }
    };

    const validateField = (input) => {
        const config = configs[input.id];
        if (!config) return true;
        const value = input.value.trim();

        if (config.required && !value) {
            toggleError(input, config.required);
            return false;
        }

        if (input.type === 'email' && value && !emailPattern.test(value)) {
            toggleError(input, config.format);
            return false;
        }

        // Generic pattern validation based on config
        if (config.pattern && value) {
            let pattern;
            // Map config keys to their patterns
            if (input.id === 'phone') {
                pattern = phonePattern;
            }
            // Add more patterns here if needed
            if (pattern && !pattern.test(value)) {
                toggleError(input, config.pattern);
                return false;
            }
        }

        toggleError(input);
        return true;
    };

    Object.keys(configs).forEach((fieldId) => {
        const field = form.querySelector(`#${fieldId}`);
        if (!field) return;
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.hasAttribute('aria-invalid')) {
                validateField(field);
            }
        });
    });

    form.addEventListener('submit', (event) => {
        let isValid = true;
        Object.keys(configs).forEach((fieldId) => {
            const field = form.querySelector(`#${fieldId}`);
            if (field && !validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault();
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            return;
        }

        event.preventDefault();
        if (successMessage) {
            successMessage.textContent = 'Thanks! Your message is on its way. We will reach out within one business day.';
            successMessage.classList.remove('hidden');
            successMessage.focus();
        }
        form.reset();
    });
});
