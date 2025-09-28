class Register {
    constructor() {
        this.form = document.querySelector("form");
        this.firstName = document.getElementById("firstName");
        this.lastName = document.getElementById("lasttName");
        this.email = document.getElementById("email");
        this.password = document.getElementById("password");
        this.msg = document.getElementById("msg");
        this.currentMessageKey = null;

        const langSelector = document.getElementById("langSelect");
        if (langSelector) {
            langSelector.addEventListener("change", () => {
                this.updateErrorMessage();
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const lang = localStorage.getItem("lang") || "en";
        const firstName = this.firstName.value.trim();
        const lastName = this.lastName.value.trim();
        const email = this.email.value.trim();
        const password = this.password.value.trim();

        if (!firstName || !lastName || !email || !password) {
            this.showMessage("fillAllFields");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find(u => u.email === email)) {
            this.showMessage("emailExists");
            return;
        }

        users.push({ firstName, lastName, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("currentUserEmail", email);

        let allTasks = JSON.parse(localStorage.getItem("tasks")) || {};
        if (!allTasks[email]) {
            allTasks[email] = [];
        }
        localStorage.setItem("tasks", JSON.stringify(allTasks));

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
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        const registerInstance = new Register();
        registerInstance.handleSubmit(e);
    });
});
