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

    // Novo: Identificar o modal de edição
    let isEditing = false;
    let taskBeingEdited = null; // Tarefa que está sendo editada

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
        isEditing = false; // Reseta o estado de edição
        taskBeingEdited = null;
    });

    // Abrir modal de criação de tarefa
    buttonAddTask.addEventListener("click", function () {
        taskCreate.style.display = "flex";
        resetForm(); // Limpar o formulário
        isEditing = false; // Garantir que não é edição
    });

    // Criar uma nova tarefa
    buttonCreateTask.addEventListener("click", function () {
        const taskTitle = document.getElementById("task-title").value.trim();
        const taskDueDate = document.getElementById("due-date").value;
        const taskDesc = document.getElementById("task-desc").value.trim();

        // Obter a lista selecionada
        const taskListSelect = document.getElementById("task-list");
        const taskList = taskListSelect.value;

        // Validação do título da tarefa
        if (!taskTitle) {
            alert("Por favor, insira um título para a tarefa.");
            return;
        }

        if (isEditing && taskBeingEdited) {
            // Atualizar a tarefa existente
            taskBeingEdited.querySelector(".task-item-content h3").textContent = taskTitle;
            taskBeingEdited.querySelector(".task-item-due-date span").textContent = taskDueDate || "Sem prazo";
            taskBeingEdited.querySelector(".task-item-tag").textContent = taskList;
            taskBeingEdited.querySelector(".task-item-tag").style.backgroundColor =
                taskList === "Pessoal" ? "#F4A259" : "#8AB6D6";
        } else {
            // Criar um novo elemento de tarefa
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");

            const taskTagBackground =
                taskList === "Pessoal" ? "#F4A259" : taskList === "Trabalho" ? "#8AB6D6" : "#007bff";

            taskItem.innerHTML = `
                <div class="task-item-left">
                    <input type="checkbox">
                    <div class="task-item-content">
                        <h3>${taskTitle}</h3>
                        <small>${taskDesc}</small>
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

            // Adicionar evento para editar a tarefa
            taskItem.addEventListener("click", function () {
                openEditModal(taskItem);
            });

            // Adicionar a nova tarefa ao contêiner
            if (taskContainer) {
                taskContainer.appendChild(taskItem);
            } else {
                console.error("Erro: O contêiner de tarefas não foi encontrado.");
            }
        }

        // Limpar os campos do formulário
        resetForm();

        // Fechar o modal de criação/edição de tarefa
        taskCreate.style.display = "none";
    });

    // Função para abrir o modal de edição
    function openEditModal(taskItem) {
        isEditing = true;
        taskBeingEdited = taskItem;

        // Preencher o formulário com os dados da tarefa
        const taskTitle = taskItem.querySelector(".task-item-content h3").textContent;
        const taskDesc = taskItem.querySelector(".task-item-content small").textContent;
        const taskDueDate = taskItem.querySelector(".task-item-due-date span").textContent;
        const taskList = taskItem.querySelector(".task-item-tag").textContent;

        document.getElementById("task-title").value = taskTitle;
        document.getElementById("task-desc").value = taskDesc;
        document.getElementById("due-date").value = taskDueDate === "Sem prazo" ? "" : taskDueDate;

        const taskListSelect = document.getElementById("task-list");
        taskListSelect.value = taskList;

        // Substituir botão "Criar" por "Salvar Alterações" e "Excluir Tarefa"
        const buttonArea = document.querySelector("#task-create button");
        buttonArea.textContent = "Salvar Alterações";
        buttonArea.id = "save-changes";

        // Criar contêiner para botões se não existir
        let buttonContainer = document.getElementById("task-create-buttons");
        if (!buttonContainer) {
            buttonContainer = document.createElement("div");
            buttonContainer.id = "task-create-buttons";
            buttonArea.parentNode.appendChild(buttonContainer);
        }

        // Limpar contêiner de botões para evitar duplicação
        buttonContainer.innerHTML = "";

        // Adicionar botão "Salvar Alterações"
        buttonContainer.appendChild(buttonArea);

        // Adicionar botão "Excluir Tarefa"
        const deleteButton = document.createElement("button");
        deleteButton.id = "delete-task";
        deleteButton.textContent = "Excluir Tarefa";
        deleteButton.addEventListener("click", function () {
            showConfirmModal();
        });
        buttonContainer.appendChild(deleteButton);

        taskCreate.style.display = "flex";
    }

    // Função para mostrar o modal de confirmação
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

    // Função para limpar o formulário
    function resetForm() {
        document.getElementById("task-title").value = "";
        document.getElementById("task-desc").value = "";
        document.getElementById("due-date").value = "";
        document.getElementById("task-list").selectedIndex = 0;
    }
});
