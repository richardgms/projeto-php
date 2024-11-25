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
    });

    // Abrir modal de criação de tarefa
    buttonAddTask.addEventListener("click", function () {
        taskCreate.style.display = "flex";
    });

    // Criar uma nova tarefa
    buttonCreateTask.addEventListener("click", function () {
        const taskTitle = document.getElementById("task-title").value.trim();
        const taskDueDate = document.getElementById("due-date").value;

        // Obter a lista selecionada
        const taskListSelect = document.getElementById("task-list");
        const taskList = taskListSelect.value;

        // Validação do título da tarefa
        if (!taskTitle) {
            alert("Por favor, insira um título para a tarefa.");
            return;
        }

        // Criar o elemento de tarefa
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        const taskTagBackground =
            taskList === "Pessoal" ? "#ffb677" : taskList === "Trabalho" ? "#8AB6D6" : "#007bff"; // Define o fundo com base no valor


        taskItem.innerHTML = `
            <div class="task-item-left">
                <input type="checkbox">
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

        // Adicionar a nova tarefa ao contêiner
        if (taskContainer) {
            taskContainer.appendChild(taskItem);
        } else {
            console.error("Erro: O contêiner de tarefas não foi encontrado.");
        }

        // Limpar os campos do formulário
        document.getElementById("task-title").value = "";
        taskListSelect.selectedIndex = 0; // Resetar o select para o primeiro item
        document.getElementById("due-date").value = "";
        document.getElementById("task-desc").value = ""; // Limpar a descrição

        // Fechar o modal de criação de tarefa
        taskCreate.style.display = "none";
    });
});