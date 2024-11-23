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
            <h2>Menu</h2>
            <img src="./assets/menu.svg" alt="" width="25px">

            <section id="tasks">
                <h2>Tarefas</h2>
                <ul>
                    <li><a href="#upcoming">Próximas</a></li>
                    <li><a href="#today">Hoje</a></li>
                    <li><a href="#calendar">Calendário</a></li>
                    <li><a href="#sticky-wall">Mural</a></li>
                </ul>
            </section>

            <section id="list">
                <h2>List</h2>
                <ul>
                    <li><a href="#personal">Pessoal</a></li>
                    <li><a href="#work">Trabalho</a></li>
                    <!-- Botão para adicionar nova lista -->
                    <li class="add-new">
                        <a href="#add-new-list">+ Adicionar Nova Lista</a>
                    </li>
                </ul>
            </section>

            <section id="others">
                <ul>
                    <li><a href="#settings">Configurações</a></li>
                    <li><a href="#signout">Sair</a></li>
                </ul>
            </section>

        </section>

        

        <div id="content">
            <h1>Hoje</h1>
            <h2>
                <?php
                echo date("d");
                ?>
            </h2>

            <button id="add-task">+ Adicionar Nova Tarefa</button>
        </div>

        <section>
            <h3>Adicionar Nova Tarefa</h3>
        </section>

        

    </main>
</body>
</html>