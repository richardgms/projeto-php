<?php
    session_start();
    include_once('config.php');
   
    if((!isset($_SESSION['email']) == true) and (!isset($_SESSION['senha']) == true))
    {
        unset($_SESSION['email']);
        unset($_SESSION['senha']);
        header('Location: login.php');
    }
    $logado = $_SESSION['email'];
    if(!empty($_GET['search']))
    {
        $data = $_GET['search'];
        $sql = "SELECT * FROM usuarios WHERE id LIKE '%$data%' or nome LIKE '%$data%' or email LIKE '%$data%' ORDER BY id DESC";
    }
    else
    {
        $sql = "SELECT * FROM usuarios ORDER BY id DESC";
    }
    $result = $conexao->query($sql);
?>
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
                <img id="menu-icon-close" src="./assets/menu.svg" alt="Fechar Menu" width="25px">
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

            <img id="menu-icon-open" src="./assets/menu.svg" alt="Abrir Menu" width="25px" style="display: none;">

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

            <div id="task-container">
                <!-- Novas tarefas serão adicionadas aqui -->
            </div>

        </div>

        <div id="task-create" style="display: none;">

            <div id="top-task-create">
                <h2>Tarefa:</h2>
                <img id="taskCreate-icon-close" src="./assets/close.svg" alt="Fechar Menu" width="25px">
            </div>

            <div id="task-form">
                <input type="text" id="task-title" placeholder="Título da Tarefa">
                <textarea id="task-desc" name="task-desc" placeholder="Descrição"></textarea>

                <label for="choose-list">Lista:</label>
                <select name="Lista" id="task-list">
                    <option value="Pessoal" selected>Pessoal</option>
                    <option value="Trabalho">Trabalho</option>
                </select>



                <label for="due-date">Prazo:</label>
                <input type="date" id="due-date">
            </div>

            <button type="submit">Criar</button>

        </div>

        <div id="confirm-modal" style="display: none;">
            <div class="modal-content">
                <p>Tem certeza de que deseja excluir esta tarefa?</p>
                <div class="modal-buttons">
                    <button id="confirm-delete">Confirmar</button>
                    <button id="cancel-delete">Cancelar</button>
                </div>
            </div>
        </div>


    </main>

    <script src="./js/main.js"></script>
</body>
</html>