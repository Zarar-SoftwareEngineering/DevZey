const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Smooth Scrolling with Debounce
const navItems = document.querySelectorAll('.nav-links a');

let scrollTimeout;
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        }, 100);
    });
});

// Intersection Observer for Section Animations
const sections = document.querySelectorAll('section');
const observerOptions = { threshold: 0.05 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Contact Form Validation + Popup
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

const popup = document.createElement('div');
popup.classList.add('popup');
popup.innerHTML = `
    <div class="popup-content">
        <i class="fas fa-check-circle"></i>
        <h3>Message Sent!</h3>
        <p>Thank you for contacting ZK Technologies. We’ll get back to you soon.</p>
        <button id="closePopup">OK</button>
    </div>
`;
document.body.appendChild(popup);

const closePopup = popup.querySelector('#closePopup');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    if (nameInput.value.trim() === "") {
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    if (messageInput.value.trim() === "") {
        messageError.style.display = 'block';
        isValid = false;
    } else {
        messageError.style.display = 'none';
    }

    if (isValid) {
        popup.classList.add('show');
        contactForm.reset();
    }
});

closePopup.addEventListener('click', () => {
    popup.classList.remove('show');
});