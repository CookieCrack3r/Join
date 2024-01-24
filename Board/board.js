let todos = [{
    'category': 'User Story',
    'title': 'Kochwelt Page & Recipe Recommender',
    'description': 'Build start page with recipe recommendation...',
    'subtasks': '1/2 Subtasks',
    'status': 'In Progress'
},
{
    'category': 'Technical Task',
    'title': 'HTML Base Template Creation',
    'description': 'Create reusable HTML bas templates',
    'subtasks': '',
    'status': 'Await feedback'
},
{
    'category': 'Technical Task',
    'title': 'CSS Architecture Planning',
    'description': 'Build start page with recipe recommendation...',
    'subtasks': '2/2 Subtasks',
    'status': 'Done'
},
{
    'category': 'User Story',
    'title': 'Daily Kochwelt Recipe',
    'description': 'Implement daily recipe and portion calculator',
    'subtasks': '',
    'status': 'Await feedback'
}];


function init() {
    renderKanbanboard();
}

function renderKanbanboard() {
    let board = document.getElementById('in-progress');
    board.innerHTML = '';

    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        let category = todo.category;
        let title = todo.title;
        let description = todo.description;
        let subtasks = todo.subtasks;
        let status = todo.status;

        board.innerHTML += /*html*/`
        <td>
                            <div class="card">
                                <span id="category" class="label">${category}</span>
                                <span class="description">
                                    <h3>${title}</h3><br>${description}
                                </span>
                                <div class="progress-section">
                                    <div class="progress-bar">
                                        <div class="progress"></div>
                                    </div>
                                    <div>${subtasks}</div>
                                </div>
                                <div class="members-and-priority">
                                    <div class="members">
                                        <img src="img/profile.svg">
                                        <img src="img/profile1.svg">
                                        <img src="img/profile2.svg">
                                    </div>
                                    <div class="priority">
                                        <img src="img/medium.svg">
                                    </div>
                                </div>
                            </div>
                        </td>
        `;
    }
}

function addTask() {
    window.location.href = '/AddTask/addTask.html';
}

