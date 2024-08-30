// Update the login function
function login() {
    const identifier = document.getElementById('login-identifier').value;
    const password = document.getElementById('login-password').value;

    const storedUser = JSON.parse(localStorage.getItem(identifier));

    if (storedUser && storedUser.password === password) {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', storedUser.username);
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('welcome-page').style.display = 'block';
        displayUsername();
    } else {
        alert("Invalid login credentials. Please try again.");
    }
}

function displayUsername() {
    const username = sessionStorage.getItem('username');
    if (username) {
        document.getElementById('welcome-username').innerText = `Welcome, ${username}!`;
    }
}

// Update the logout function
function logout() {
    sessionStorage.removeItem('loggedIn');
    document.getElementById('auth-container').style.display = 'flex';
    document.getElementById('welcome-page').style.display = 'none';
}

// Check login state on page load
document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('loggedIn') === 'true') {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('welcome-page').style.display = 'block';
        displayUsername();
    } else {
        document.getElementById('auth-container').style.display = 'flex';
        document.getElementById('welcome-page').style.display = 'none';
    }
    displayTodos();
});

function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
}

function register() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const mobile = document.getElementById('register-mobile').value;
    const password = document.getElementById('register-password').value;

    // Validate form data (basic validation)
    if (!username || !email || !mobile || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Save user data in localStorage
    const userData = { username, email, mobile, password };
    localStorage.setItem(email, JSON.stringify(userData));
    localStorage.setItem(mobile, JSON.stringify(userData));

    alert("Registration successful! You can now login.");
    showLoginForm();
}
// Initialize the to-do list on page load
document.addEventListener('DOMContentLoaded', function () {
    displayTodos();
});

function addTodo() {
    const todoInput = document.getElementById('new-todo');
    const taskText = todoInput.value.trim();

    if (!taskText) {
        alert('Please enter a task.');
        return;
    }

    const todos = getTodos();
    todos.push({ text: taskText, completed: false });
    saveTodos(todos);
    todoInput.value = '';
    displayTodos();
}

function editTodo(index) {
    const newText = prompt('Edit task:', getTodos()[index].text);

    if (newText !== null && newText.trim() !== '') {
        const todos = getTodos();
        todos[index].text = newText.trim();
        saveTodos(todos);
        displayTodos();
    }
}

function deleteTodo(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        const todos = getTodos();
        todos.splice(index, 1);
        saveTodos(todos);
        displayTodos();
    }
}

function toggleTodoCompleted(index) {
    const todos = getTodos();
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    displayTodos();
}

function getTodos() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function displayTodos() {
    const todoList = document.getElementById('todo-list');
    const todos = getTodos();
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class = check>
            <input type="checkbox"  ${todo.completed ? 'checked' : ''} onclick="toggleTodoCompleted(${index})">
            
            ${todo.text} 
            </div>
            
            <div class="btn">
            <button onclick="editTodo(${index})">Edit</button>
            <button onclick="deleteTodo(${index})">Delete</button>
            </div>
        `;
        todoList.appendChild(listItem);
    });
}
