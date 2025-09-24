class Task {
    constructor(text, completed = false) {
        this.text = text;
        this.completed = completed;
    }

    toggle() {
        this.completed = !this.completed;
    }

    edit(newText) {
        this.text = newText;
    }
}

class TodoApp {
    constructor(userEmail) {
        this.userEmail = userEmail;
        this.tasks = this.loadTasks(); 
        this.taskInput = document.getElementById("input-task");
        this.taskList = document.getElementById("tasksList");
        this.addBtn = document.getElementById("task-add-btn");
        this.msgBox = document.getElementById("task-msg");
        this.currentMessageKey = null;

        this.renderTasks();
        this.addListeners();

        const langSelector = document.getElementById("langSelect");
        if (langSelector) {
            langSelector.addEventListener("change", (e) => {
                localStorage.setItem("lang", e.target.value);
                this.updateErrorMessage();
            });
        }
    }

    loadTasks() {
        const allTasks = JSON.parse(localStorage.getItem("tasks")) || {};
        const userTasks = allTasks[this.userEmail] || [];
        return userTasks.map(task => new Task(task.text, task.completed));
    }

    saveTasks() {
        const allTasks = JSON.parse(localStorage.getItem("tasks")) || {};
        allTasks[this.userEmail] = this.tasks.map(task => ({
            text: task.text,
            completed: task.completed
        }));
        localStorage.setItem("tasks", JSON.stringify(allTasks));
    }

    addTask(text) {
        if (!text.trim()) {
            this.showMessage("emptyTask");
            return;
        }
        this.clearMessage();

        this.tasks.push(new Task(text));
        this.saveTasks();
        this.renderTasks();
        this.taskInput.value = "";
    }

    editTask(index, newText) {
        this.tasks[index].edit(newText); 
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.renderTasks();
    }

    toggleComplete(index) {
        this.tasks[index].toggle();
        this.saveTasks();
        this.renderTasks();
    }

    renderTasks() {
        this.taskList.innerHTML = "";
        this.tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.style.display = "flex";
            li.style.alignItems = "center";
            li.style.justifyContent = "space-between";
            li.style.background = "var(--seconsaryBackground)";
            li.style.padding = "10px 15px";
            li.style.borderRadius = "10px";
            li.style.margin = "8px 0";

            const leftSection = document.createElement("div");
            leftSection.style.display = "flex";
            leftSection.style.alignItems = "center";
            leftSection.style.gap = "10px";

            const completeBtn = document.createElement("button");
            completeBtn.innerHTML = task.completed 
                ? '<i class="fa-solid fa-check-circle" style="color:var(--teal);"></i>' 
                : '<i class="fa-solid fa-circle" style="color:var(--fill);"></i>';

            completeBtn.style.cursor = "pointer";
            completeBtn.style.border = "none";
            completeBtn.style.background = "transparent";
            completeBtn.style.fontSize = "18px";
            completeBtn.onclick = () => this.toggleComplete(index);

            const textSpan = document.createElement("span");
            textSpan.textContent = task.text;
            textSpan.style.fontSize = "16px";
            if (task.completed) textSpan.style.textDecoration = "line-through";

            leftSection.appendChild(completeBtn);
            leftSection.appendChild(textSpan);

            const rightSection = document.createElement("div");
            rightSection.style.display = "flex";
            rightSection.style.gap = "10px";

            const editBtn = document.createElement("button");
            editBtn.innerHTML = '<i class="fa-solid fa-pen" style= "color:var(--purple)"></i>';
            editBtn.style.cursor = "pointer";
            editBtn.style.border = "none";
            editBtn.style.background = "transparent";
            editBtn.style.fontSize = "16px";
            editBtn.onclick = () => {
                const newText = prompt("Edit task:", task.text);
                if (newText !== null) this.editTask(index, newText);
            };

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash" style= "color:var(--red)"></i>';
            deleteBtn.style.cursor = "pointer";
            deleteBtn.style.border = "none";
            deleteBtn.style.background = "transparent";
            deleteBtn.style.fontSize = "16px";
            deleteBtn.onclick = () => this.deleteTask(index);

            rightSection.appendChild(editBtn);
            rightSection.appendChild(deleteBtn);

            li.appendChild(leftSection);
            li.appendChild(rightSection);

            this.taskList.appendChild(li);
        });
    }

    addListeners() {
        this.addBtn.addEventListener("click", (e) => {
            e.preventDefault();
            this.addTask(this.taskInput.value);
        });

        this.taskInput.addEventListener("input", () => this.clearMessage());
    }

    showMessage(key) {
        this.currentMessageKey = key;
        this.updateErrorMessage();
    }

    updateErrorMessage() {
        if (!this.currentMessageKey) return;
        const currentLang = localStorage.getItem("lang") || "en";

        if (typeof translations !== "undefined" && translations[currentLang]) {
            this.msgBox.textContent = translations[currentLang][this.currentMessageKey] 
                || `[${this.currentMessageKey}]`;
        } else {
            this.msgBox.textContent = "Please enter a task before adding!";
        }
    }

    clearMessage() {
        this.msgBox.textContent = "";
        this.currentMessageKey = null;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUserEmail");
    if (!currentUser) {
        alert("Please login first!");
        window.location.href = "login.html";
    } else {
        new TodoApp(currentUser);
    }
});

document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("currentUserEmail");
    window.location.href = "login.html";
});
