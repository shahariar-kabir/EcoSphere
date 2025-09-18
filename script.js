const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

// Toggle between sign-in and sign-up forms
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Show toast notification
function showToast(message, isSuccess = false) {
    const toast = document.createElement('div');
    toast.className = `toast ${isSuccess ? 'success' : ''}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Register form submission
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const dob = document.getElementById('regDob').value;
    const password = document.getElementById('regPassword').value;
    
    // Validate inputs
    if (!name || !email || !dob || !password) {
        showToast('Please fill all fields');
        return;
    }
    
    // Save user to localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.find(user => user.email === email)) {
        showToast('User already exists with this email');
        return;
    }
    
    // Add new user
    users.push({
        name,
        email,
        dob,
        password // In a real app, this would be hashed
    });
    
    localStorage.setItem('users', JSON.stringify(users));
    showToast('Registration successful! Please login.', true);
    
    // Switch to login form
    container.classList.remove("active");
    registerForm.reset();
});

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Validate inputs
    if (!email || !password) {
        showToast('Please fill all fields');
        return;
    }
    
    // Check user credentials
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Store current user session
        localStorage.setItem('currentUser', JSON.stringify(user));
        showToast('Login successful!', true);
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showToast('Invalid email or password');
    }
});

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'dashboard.html';
    }
    
    // Add animation to form elements
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input, index) => {
        input.style.animationDelay = `${index * 0.1}s`;
        input.classList.add('animate__animated', 'animate__fadeInUp');
    });
});