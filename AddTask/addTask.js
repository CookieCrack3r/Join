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

function priorityUrgent() {
    document.getElementById('urgent').style.backgroundColor = '#FF3D00';
    document.getElementById('urgent').style.color = 'white';
    document.getElementById('urgent-img').src = 'imgAddTask/urgent.svg';

    document.getElementById('medium').style.backgroundColor = 'white';
    document.getElementById('medium').style.color = 'black';
    document.getElementById('medium-img').src = 'imgAddTask/medium.svg';

    document.getElementById('low').style.backgroundColor = 'white';
    document.getElementById('low').style.color = 'black';
    document.getElementById('low-img').src = 'imgAddTask/low.png';
}

function priorityMedium() {
    document.getElementById('urgent').style.backgroundColor = 'white';
    document.getElementById('urgent').style.color = 'black';
    document.getElementById('urgent-img').src = 'imgAddTask/urgent.png';

    document.getElementById('medium').style.backgroundColor = '#FFA800';
    document.getElementById('medium').style.color = 'white';
    document.getElementById('medium-img').src = 'imgAddTask/medium.png';

    document.getElementById('low').style.backgroundColor = 'white';
    document.getElementById('low').style.color = 'black';
    document.getElementById('low-img').src = 'imgAddTask/low.png';
}

function priorityLow() {
    document.getElementById('low').style.backgroundColor = '#7BE129';
    document.getElementById('low').style.color = 'white';
    document.getElementById('low-img').src = 'imgAddTask/low.svg';

    document.getElementById('medium').style.backgroundColor = 'white';
    document.getElementById('medium').style.color = 'black';
    document.getElementById('medium-img').src = 'imgAddTask/medium.svg';

    document.getElementById('urgent').style.backgroundColor = 'white';
    document.getElementById('urgent').style.color = 'black';
    document.getElementById('urgent-img').src = 'imgAddTask/urgent.png';
}