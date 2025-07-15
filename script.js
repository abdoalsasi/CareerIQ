// script.js
document.addEventListener('DOMContentLoaded', function() {
    // إدارة حالة تسجيل الدخول
    const user = JSON.parse(localStorage.getItem('user'));
    updateAuthUI(user);
    
    // إدارة الروابط بين الصفحات
    setupNavigationLinks();
    
    // إدارة إظهار أزرار "إضافة" للمستخدمين المناسبين
    setupAddButtons(user);
});

// تحديث واجهة المستخدم بناءً على حالة تسجيل الدخول
function updateAuthUI(user) {
    const authButtons = document.querySelector('.auth-buttons');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (user) {
        // إذا كان المستخدم مسجل دخول
        if (authButtons) {
            authButtons.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-primary">
                        <i class="fas fa-user"></i> ${user.name}
                    </button>
                    <div class="dropdown-content">
                        <a href="#" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</a>
                    </div>
                </div>
            `;
            
            document.getElementById('logoutBtn').addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            });
        }
        
        // إخفاء أزرار تسجيل الدخول/التسجيل
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
    } else {
        // إذا لم يكن مسجل دخول
        if (authButtons) {
            authButtons.innerHTML = `
                <button class="btn btn-primary" id="loginBtn">
                    <i class="fas fa-sign-in-alt"></i> تسجيل دخول
                </button>
            `;
            
            document.getElementById('loginBtn').addEventListener('click', function() {
                window.location.href = 'login.html';
            });
        }
    }
}

// إعداد الروابط بين الصفحات
function setupNavigationLinks() {
    // ربط صفحة كيفية الحجز
    const howToBookLinks = document.querySelectorAll('a[href="#howtobooking"]');
    howToBookLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'howtobooking.html';
        });
    });
    
    // ربط صفحة المهندسين
    const engineersLinks = document.querySelectorAll('a[href="#engineers"]');
    engineersLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'engineer.html';
        });
    });
    
    // ربط صفحة الأطباء
    const doctorsLinks = document.querySelectorAll('a[href="#doctors"]');
    doctorsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'medic.html';
        });
    });
}

// إدارة أزرار "إضافة" للمستخدمين المناسبين
function setupAddButtons(user) {
    const addEngineerBtn = document.getElementById('addEngineerBtn');
    const addDoctorBtn = document.getElementById('addDoctorBtn');
    
    // إظهار الأزرار فقط إذا كان المستخدم عميلاً
    if (user && user.userType === 'client') {
        if (addEngineerBtn) addEngineerBtn.style.display = 'block';
        if (addDoctorBtn) addDoctorBtn.style.display = 'block';
    } else {
        if (addEngineerBtn) addEngineerBtn.style.display = 'none';
        if (addDoctorBtn) addDoctorBtn.style.display = 'none';
    }
}

// وظيفة مساعدة للتحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}