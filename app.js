// Функция создания заголовка
function createAppTitle() {
    const title = document.createElement('h1');
    title.classList.add('text-center');
    title.textContent = 'Todo List';
    return title;
}

// Функция создания формы для добавления задачи
function createTodoItemForm() {
    const form = document.createElement('form');
    form.classList.add('input-group', 'mb-3');

    const input = document.createElement('input');
    input.classList.add('form-control');
    input.placeholder = 'Введите новое дело';

    const appendDiv = document.createElement('div');
    appendDiv.classList.add('input-group-append');

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.type = 'submit';

    appendDiv.appendChild(button);
    form.appendChild(input);
    form.appendChild(appendDiv);

    // Обработчик добавления нового дела
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskText = input.value.trim();
        if (taskText) {
            addTodoItem(taskText);
            input.value = ''; // Очистить поле ввода
            saveTodoList();  // Сохраняем задачи
        }
    });

    return form;
}

// Функция создания списка дел
function createTodoList() {
    const ul = document.createElement('ul');
    ul.classList.add('list-group');
    return ul;
}

// Функция добавления нового элемента в список дел
function addTodoItem(taskText, completed = false) {
    const todoList = document.querySelector('.todo-list'); // Ищем уже существующий список

    const li = document.createElement('li');
    li.classList.add('list-group-item', 'todo-item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('form-check-input', 'me-2');
    checkbox.checked = completed;
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            text.classList.add('completed');
            li.classList.add('completed-item');
            todoList.appendChild(li); // Переместить в конец списка
        } else {
            text.classList.remove('completed');
            li.classList.remove('completed-item');
            todoList.prepend(li); // Переместить в начало списка
        }
        saveTodoList(); // Сохраняем задачи после изменения
    });

    const text = document.createElement('span');
    text.textContent = taskText;
    if (completed) {
        text.classList.add('completed');
        li.classList.add('completed-item');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.classList.add('btn', 'btn-danger', 'ms-2');
    deleteButton.addEventListener('click', function () {
        li.remove();
        saveTodoList(); // Сохраняем задачи после удаления
    });

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteButton);

    if (completed) {
        todoList.appendChild(li); // Добавить в конец списка если выполнено
    } else {
        todoList.prepend(li); // Добавить в начало списка если не выполнено
    }
}

// Функция для сохранения списка задач в localStorage
function saveTodoList() {
    const todoItems = document.querySelectorAll('.todo-item');
    const tasks = Array.from(todoItems).map(item => {
        const text = item.querySelector('span').textContent;
        const completed = item.querySelector('input[type="checkbox"]').checked;
        return { text, completed };
    });
    localStorage.setItem('todoList', JSON.stringify(tasks)); // Сохраняем список задач
}

// Функция для загрузки списка задач из localStorage
function loadTodoList() {
    const savedTasks = JSON.parse(localStorage.getItem('todoList'));
    if (savedTasks && savedTasks.length > 0) {
        savedTasks.forEach(task => addTodoItem(task.text, task.completed)); // Загружаем все сохранённые задачи
    }
}

// Функция инициализации приложения
document.addEventListener('DOMContentLoaded', function () {
    const appContainer = document.getElementById('todoApp');

    // Создание основных элементов
    const title = createAppTitle();
    const form = createTodoItemForm();
    const todoList = createTodoList();
    todoList.classList.add('todo-list'); // Добавляем класс для дальнейшего поиска

    // Добавление элементов на страницу
    appContainer.appendChild(title);
    appContainer.appendChild(form);
    appContainer.appendChild(todoList);

    // Загружаем список задач из localStorage при старте
    loadTodoList();
});
