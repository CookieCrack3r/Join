let todos = [];

async function addTodo() {
    let todo = 'to-do';

    create.disabled = true;
    todos.push({
        title: title.value,
        description: descritpion.value,
        category: category.value,
        subtasks: subtasks.value,
        status: todo
    })
    await setItem('todo', JSON.stringify(todo));
    createTask();
}

function createTask(){
    create.disabled = false;
    window.location.href = '/Board/board.html';
}