<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/main.css">
    <title>Lista de Tarefas</title>
</head>
<body>
    <main>

        <section id="menu">

            <div id="top-menu">
                <h2>Menu</h2>
                <img src="./assets/menu.svg" alt="" width="25px">
            </div>

            <section id="tasks">
                <h2>Tarefas</h2>
                <ul>
                    <li>
                        <img src="./assets/double-arrow.svg" alt="Ícone" class="icon">
                        <a href="#upcoming">Próximas</a>
                    </li>
                    <li>
                        <img src="./assets/list.svg" alt="Ícone" class="icon">
                        <a href="#today">Hoje</a>
                    </li>
                    <li>
                        <img src="./assets/calendar.svg" alt="Ícone" class="icon">
                        <a href="#calendar">Calendário</a>
                    </li>
                    <li>
                        <img src="./assets/sticky-note.svg" alt="Ícone" class="icon">
                        <a href="#sticky-wall">Mural</a>
                    </li>
                </ul>
            </section>


            <hr class="divider">

            <section id="list">
                <h2>Listas</h2>
                <ul>
                    <li>
                        <img src="./assets/square.svg" alt="Ícone" class="icon">
                        <a href="#personal">Pessoal</a>
                    </li>
                    <li>
                        <img src="./assets/square2.svg" alt="Ícone" class="icon">
                        <a href="#work">Trabalho</a>
                    </li>
                    <li class="add-new">
                        <img src="./assets/add.svg" alt="Ícone de adicionar" class="icon">
                        <a href="#add-new-list">Adicionar Nova Lista</a>
                    </li>
                </ul>
            </section>


            <section id="others">
                <ul>
                    <li>
                        <img src="./assets/configuration.svg" alt="Ícone de configurações" class="icon">
                        <a href="#settings">Configurações</a>
                    </li>
                    <li>
                        <img src="./assets/logout.svg" alt="Ícone de sair" class="icon">
                        <a href="#signout">Sair</a>
                    </li>
                </ul>
            </section>


        </section>

        

        <div id="content">

            <div id="content-header">
                <h1>Hoje</h1>
                <h2>
                    <?php
                    echo date("d");
                    ?>
                </h2>
            </div>

            <div id="button-new-task">
                <button id="add-task">+ Adicionar Nova Tarefa</button>
            </div>

        </div>

    </main>
</body>
</html>