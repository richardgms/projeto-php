document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    const menuIconOpen = document.getElementById("menu-icon-open");
    const menuIconClose = document.getElementById("menu-icon-close");
    const content = document.getElementById("content");
    const taskCreate = document.getElementById("task-create");
    const closeTask = document.getElementById("taskCreate-icon-close");
    const buttonAddTask = document.getElementById("add-task");

    menuIconClose.addEventListener("click", function () {
        menu.style.display = "none";
        content.style.paddingLeft = "150px";
        menuIconOpen.style.display = "block"; // Mostra o ícone de abrir
    });

    menuIconOpen.addEventListener("click", function () {
        menu.style.display = "flex";
        content.style.paddingLeft = "20px";
        menuIconOpen.style.display = "none"; // Esconde o ícone de abrir
    });

    closeTask.addEventListener("click", function () {
        taskCreate.style.display = "none";
    });

    buttonAddTask.addEventListener("click", function () {
        taskCreate.style.display = "flex";
    });
});
