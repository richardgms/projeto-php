document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    const menuIconOpen = document.getElementById("menu-icon-open");
    const menuIconClose = document.getElementById("menu-icon-close");
    const content = document.getElementById("content");
    const taskCreate = document.getElementById("task-create");
    const closeTask = document.getElementById("taskCreate-icon-close");
    const buttonAddTask = document.getElementById("add-task");
    const buttonCreateTask = document.querySelector("#task-create button");
    const taskContainer = document.getElementById("task-container");

    let isEditing = false;
    let taskBeingEdited = null;

    // Ocultar o menu
    menuIconClose.addEventListener("click", function () {
        menu.style.display = "none";
        content.style.paddingLeft = "150px";
        menuIconOpen.style.display = "block";
    });

    // Mostrar o menu
    menuIconOpen.addEventListener("click", function () {
        menu.style.display = "flex";
        content.style.paddingLeft = "20px";
        menuIconOpen.style.display = "none";
    });

    // Fechar modal de criação de tarefa
    closeTask.addEventListener("click", function () {
        taskCreate.style.display = "none";
        isEditing = false;
        taskBeingEdited = null;
    });

    // Abrir modal de criação de tarefa
    buttonAddTask.addEventListener("click", function () {
        taskCreate.style.display = "flex";
        resetForm();
        isEditing = false;
    });

    // Criar uma nova tarefa
    buttonCreateTask.addEventListener("click", function () {
        const taskTitle = document.getElementById("task-title").value.trim();
        const taskDueDate = document.getElementById("due-date").value;
        const taskDesc = document.getElementById("task-desc").value.trim();
        const taskListSelect = document.getElementById("task-list");
        const taskList = taskListSelect.value;

        if (!taskTitle) {
            alert("Por favor, insira um título para a tarefa.");
            return;
        }

        if (isEditing && taskBeingEdited) {
            taskBeingEdited.querySelector(".task-item-content h3").textContent = taskTitle;
            taskBeingEdited.querySelector(".task-item-due-date span").textContent = taskDueDate || "Sem prazo";
            taskBeingEdited.querySelector(".task-item-tag").textContent = taskList;
            taskBeingEdited.querySelector(".task-item-tag").style.backgroundColor =
                taskList === "Pessoal" ? "#F4A259" : "#8AB6D6";

            taskBeingEdited.dataset.description = taskDesc;
            taskBeingEdited.dataset.dueDate = taskDueDate;
        } else {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");

            const taskTagBackground =
                taskList === "Pessoal" ? "#F4A259" : taskList === "Trabalho" ? "#8AB6D6" : "#007bff";

            taskItem.innerHTML = `
                <div class="task-item-left">
                    <input type="checkbox" class="task-checkbox">
                    <div class="task-item-content">
                        <h3>${taskTitle}</h3>
                    </div>
                </div>
                <div class="task-item-right">
                    <div class="task-item-due-date">
                        <img src="./assets/calendar.svg" width="15px" alt="Data">
                        <span>${taskDueDate || "Sem prazo"}</span>
                    </div>
                    <div class="task-item-tag" style="background-color: ${taskTagBackground};">${taskList}</div>
                </div>
            `;

            taskItem.dataset.description = taskDesc;
            taskItem.dataset.dueDate = taskDueDate;

            const checkbox = taskItem.querySelector(".task-checkbox");
            const taskTitleElement = taskItem.querySelector(".task-item-content h3");

            checkbox.addEventListener("change", function (event) {
                if (checkbox.checked) {
                    taskTitleElement.style.textDecoration = "line-through";
                    taskTitleElement.style.color = "#999";
                } else {
                    taskTitleElement.style.textDecoration = "none";
                    taskTitleElement.style.color = "#000";
                }
                event.stopPropagation();
            });

            taskItem.addEventListener("click", function () {
                openEditModal(taskItem);
            });

            if (taskContainer) {
                taskContainer.appendChild(taskItem);
            } else {
                console.error("Erro: O contêiner de tarefas não foi encontrado.");
            }
        }

        resetForm();
        taskCreate.style.display = "none";
    });

    function openEditModal(taskItem) {
        isEditing = true;
        taskBeingEdited = taskItem;

        const taskTitle = taskItem.querySelector(".task-item-content h3").textContent;
        const taskDesc = taskItem.dataset.description || "";
        const taskDueDate = taskItem.dataset.dueDate || "";
        const taskList = taskItem.querySelector(".task-item-tag").textContent;

        document.getElementById("task-title").value = taskTitle;
        document.getElementById("task-desc").value = taskDesc;
        document.getElementById("due-date").value = taskDueDate;

        const taskListSelect = document.getElementById("task-list");
        taskListSelect.value = taskList;

        const buttonArea = document.querySelector("#task-create button");
        buttonArea.textContent = "Salvar Alterações";
        buttonArea.id = "save-changes";

        let buttonContainer = document.getElementById("task-create-buttons");
        if (!buttonContainer) {
            buttonContainer = document.createElement("div");
            buttonContainer.id = "task-create-buttons";
            buttonArea.parentNode.appendChild(buttonContainer);
        }

        buttonContainer.innerHTML = "";
        buttonContainer.appendChild(buttonArea);

        const deleteButton = document.createElement("button");
        deleteButton.id = "delete-task";
        deleteButton.textContent = "Excluir Tarefa";
        deleteButton.addEventListener("click", function () {
            showConfirmModal();
        });
        buttonContainer.appendChild(deleteButton);

        taskCreate.style.display = "flex";
    }

    function showConfirmModal() {
        const confirmModal = document.getElementById("confirm-modal");
        const confirmDeleteButton = document.getElementById("confirm-delete");
        const cancelDeleteButton = document.getElementById("cancel-delete");

        confirmModal.style.display = "flex";

        confirmDeleteButton.onclick = function () {
            taskBeingEdited.remove();
            taskCreate.style.display = "none";
            resetForm();
            confirmModal.style.display = "none";
        };

        cancelDeleteButton.onclick = function () {
            confirmModal.style.display = "none";
        };
    }

    function resetForm() {
        document.getElementById("task-title").value = "";
        document.getElementById("task-desc").value = "";
        document.getElementById("due-date").value = "";
        document.getElementById("task-list").selectedIndex = 0;
    }

    const personalFilter = document.querySelector('a[href="#personal"]');
    const workFilter = document.querySelector('a[href="#work"]');
    const todayFilter = document.querySelector('a[href="#today"]');
    const upcomingFilter = document.querySelector('a[href="#upcoming"]');

    personalFilter.addEventListener("click", function (event) {
        event.preventDefault();
        filterTasks("Pessoal");
    });

    workFilter.addEventListener("click", function (event) {
        event.preventDefault();
        filterTasks("Trabalho");
    });

    todayFilter.addEventListener("click", function (event) {
        event.preventDefault();
        filterTodayTasks();
    });

    upcomingFilter.addEventListener("click", function (event) {
        event.preventDefault();
        sortTasksByDate();
    });

    function filterTasks(tag) {
        const tasks = taskContainer.querySelectorAll(".task-item");
        tasks.forEach((task) => {
            const taskTag = task.querySelector(".task-item-tag").textContent;
            if (taskTag === tag) {
                task.style.display = "flex";
            } else {
                task.style.display = "none";
            }
        });
        removeNoTasksMessage();
    }

    function filterTodayTasks() {
        const tasks = taskContainer.querySelectorAll(".task-item");
        const today = new Date().toISOString().split("T")[0];
        let hasTasks = false;

        tasks.forEach((task) => {
            const taskDueDate = task.dataset.dueDate || "";
            if (taskDueDate === today) {
                task.style.display = "flex";
                hasTasks = true;
            } else {
                task.style.display = "none";
            }
        });

        if (!hasTasks) {
            showNoTasksMessage("Não há tarefas para o dia de hoje.");
        } else {
            removeNoTasksMessage();
        }
    }

    function showNoTasksMessage(message) {
        let noTasksMessage = document.getElementById("no-tasks-message");
        if (!noTasksMessage) {
            noTasksMessage = document.createElement("div");
            noTasksMessage.id = "no-tasks-message";
            noTasksMessage.textContent = message;
            noTasksMessage.style.textAlign = "center";
            noTasksMessage.style.marginTop = "20px";
            noTasksMessage.style.fontSize = "16px";
            noTasksMessage.style.color = "#555";
            taskContainer.appendChild(noTasksMessage);
        }
    }

    function removeNoTasksMessage() {
        const noTasksMessage = document.getElementById("no-tasks-message");
        if (noTasksMessage) {
            noTasksMessage.remove();
        }
    }

    function sortTasksByDate() {
        const tasks = Array.from(taskContainer.querySelectorAll(".task-item"));

        tasks.forEach((task) => {
            task.style.display = "flex";
        });

        tasks.sort((a, b) => {
            const dateA = new Date(a.dataset.dueDate || Infinity);
            const dateB = new Date(b.dataset.dueDate || Infinity);
            return dateA - dateB;
        });

        tasks.forEach((task) => taskContainer.appendChild(task));
        removeNoTasksMessage();
    }
});
