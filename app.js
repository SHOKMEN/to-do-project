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
function addTodoItem(taskText) {
    const todoList = document.querySelector('.todo-list'); // Ищем уже существующий список

    const li = document.createElement('li');
    li.classList.add('list-group-item', 'todo-item');

    const text = document.createElement('span');
    text.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', function () {
        li.remove();
        saveTodoList(); // Сохраняем задачи после удаления
    });

    li.appendChild(text);
    li.appendChild(deleteButton);

    todoList.appendChild(li);
}

// Функция для сохранения списка задач в localStorage
function saveTodoList() {
    const todoItems = document.querySelectorAll('.todo-item span');
    const tasks = Array.from(todoItems).map(item => item.textContent);
    localStorage.setItem('todoList', JSON.stringify(tasks)); // Сохраняем список задач
}

// Функция для загрузки списка задач из localStorage
function loadTodoList() {
    const savedTasks = JSON.parse(localStorage.getItem('todoList'));
    if (savedTasks && savedTasks.length > 0) {
        savedTasks.forEach(task => addTodoItem(task)); // Загружаем все сохранённые задачи
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
