
document.addEventListener('DOMContentLoaded', function () {
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', validateSignUpForm);
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', validateLoginForm);
    }
});

function validateSignUpForm(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const phoneNumber = document.getElementById('phone').value.trim();

    let isValid = true;
    
    document.getElementById('usernameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';
    document.getElementById('confirmPasswordError').innerText = '';
    document.getElementById('phoneError').innerText = '';

    if (username === '') {
        document.getElementById('usernameError').innerText = 'Username is required.';
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').innerText = 'Email is required.';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerText = 'Invalid email format.';
        isValid = false;
    }

    const phonePattern = /^\d{10}$/;
    if (phoneNumber === '') {
        document.getElementById('phoneError').innerText = 'Phone number is required.';
        isValid = false;
    } else if (!phonePattern.test(phoneNumber)) {
        document.getElementById('phoneError').innerText = 'Invalid phone number format. Must be 10 digits.';
        isValid = false;
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (password === '') {
        document.getElementById('passwordError').innerText = 'Password is required.';
        isValid = false;
    } else if (!passwordPattern.test(password)) {
        document.getElementById('passwordError').innerText = 'Password must be at least 6 characters long, contain at least one letter, one number, and one special character.';
        isValid = false;
    }

    if (confirmPassword === '') {
        document.getElementById('confirmPasswordError').innerText = 'Confirming password is required.';
        isValid = false;
    } else if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').innerText = 'Passwords do not match.';
        isValid = false;
    }

    if (isValid) {
        const userData = {
            username: username,
            email: email,
            password: password,
            phone: phoneNumber,
        };

        localStorage.setItem(email, JSON.stringify(userData));
        window.location.href = 'login.html';
    }

}

function validateLoginForm(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    let isValid = true;

    if (email === '') {
        document.getElementById('loginError').innerText = 'Email is required.';
        isValid = false;
    }

    if (password === '') {
        document.getElementById('loginError').innerText = 'Password is required.';
        isValid = false;
    }

    if (isValid) {
        const storedUserData = JSON.parse(localStorage.getItem(email));
        if (storedUserData && storedUserData.email === email) {
            if (storedUserData.password === password) {
                sessionStorage.setItem('loggedInUser', email);
                window.location.href = 'Profile.html'; 
            } else {
                document.getElementById('loginError').innerText = 'Invalid email or password.';
            }
        } else {
            document.getElementById('loginError').innerText = 'No user found. Please register.';
        }
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById('toggle-theme');

    // Проверяем сохраненную тему при загрузке страницы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    toggleButton.addEventListener('click', function () {
        // Переключаем тему
        document.body.classList.toggle('dark-mode');

        // Сохраняем текущую тему
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const contactUsText = document.querySelector(".nav-link[href='#']");
    const contactUsContent = document.getElementById("contactUsContent");

    if (contactUsText && contactUsContent) {
        contactUsText.addEventListener("click", function(event) {
            event.preventDefault();
            contactUsContent.classList.toggle("d-none");
            document.getElementById('carouselSound')?.play();
        });

        const closePopup = document.getElementById("closePopup");
        if (closePopup) {
            closePopup.addEventListener("click", function() {
                contactUsContent.classList.add("d-none");
            });
        }
    }

    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert('Contact form submitted!');
            contactUsContent.classList.add("d-none");
        });
    }

    const showTimeBtn = document.getElementById('showTimeBtn');
    const currentTimeDisplay = document.getElementById('currentTime');

    showTimeBtn.addEventListener('click', function() {
        const currentTime = new Date().toLocaleTimeString();
        currentTimeDisplay.textContent = `Current Time: ${currentTime}`;
        document.getElementById('carouselSound').play(); 
    });
});
function initAccordion() {
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;

            const isActive = content.style.display === 'block';

            document.querySelectorAll('.accordion-content').forEach(content => {
                content.style.display = 'none';
            });

            content.style.display = isActive ? 'none' : 'block';
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initAccordion();
});
const readMoreBtn = document.getElementById('read-more-btn');
const moreText = document.getElementById('more-text');

readMoreBtn.addEventListener('click', function() {
    if (moreText.style.display === 'none') {
        moreText.style.display = 'block';
        this.textContent = 'Read Less';
    } else {
        moreText.style.display = 'none';
        this.textContent = 'Read More';
    }
});


document.getElementById("back-btn").addEventListener("click", function() {
    document.getElementById("form-step").classList.add("hidden");
});
document.getElementById("next-btn").addEventListener("click", function() {
    document.getElementById("form-step").classList.remove("hidden");
});

document.getElementById("animate-btn").addEventListener("click", function() {
    this.style.transform = "scale(1.5) rotate(180deg)";
    setTimeout(() => {
        this.style.transform = "scale(1) rotate(0deg)";
    }, 1000); 
});

document.addEventListener("DOMContentLoaded", function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;

            document.querySelectorAll('.accordion-content').forEach(item => {
                if (item !== content) {
                    item.style.display = 'none';
                }
            });

            const isActive = content.style.display === 'block';
            content.style.display = isActive ? 'none' : 'block';
        });
    });
});
