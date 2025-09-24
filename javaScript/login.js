class LoginApp {
    constructor() {
        this.form = document.getElementById("loginForm");
        this.emailInput = document.getElementById("email");
        this.passwordInput = document.getElementById("password");
        this.msg = document.getElementById("msg");
        this.currentMessageKey = null;

        const langSelector = document.getElementById("langSelect");
        if (langSelector) {
            langSelector.addEventListener("change", () => {
                this.updateErrorMessage();
            });
        }
    }

    loginUser() {
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value.trim();

        if (!email || !password) {
            this.showMessage("fillAllFields");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            this.showMessage("userNotFound");
            return;
        }

        localStorage.setItem("currentUserEmail", email);
        window.location.href = "home.html";
    }

    showMessage(key) {
        this.currentMessageKey = key;
        this.updateErrorMessage();
    }

    updateErrorMessage() {
        if (!this.currentMessageKey) return;
        const currentLang = localStorage.getItem("lang") || "en";
        this.msg.textContent = translations[currentLang][this.currentMessageKey];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const loginApp = new LoginApp();
        loginApp.loginUser();
    });
});
