let todo = [];


async function loadTodos() {
    try {

        let Tasks = document.getElementById('Tasks_value');
        let Task_in_Progress = document.getElementById('Task-in-Progress_value');
        let Awaiting_feedback = document.getElementById('Awaiting-feedback_value');
        let Task_Done = document.getElementById('Task-Done_value');
        let Task_in_Board = document.getElementById('Task-in-Board_value');


        todo = JSON.parse(await getItem('todos'));

        let Tasks_value = todo.filter(t => t['status'] == 'to-do');
        let Task_in_Progress_value = todo.filter(t => t['status'] == 'in-progress');
        let Awaiting_feedback_value = todo.filter(t => t['status'] == 'await-feedback');
        let Task_Done_value = todo.filter(t => t['status'] == 'done');

        let Tasks_Length = Tasks_value.length;
        let Task_in_Progress_Length = Task_in_Progress_value.length;
        let Awaiting_feedback_Length = Awaiting_feedback_value.length;
        let Task_Done_Length = Task_Done_value.length;
        let Task_in_Board_Length = todo.length;

        Tasks.innerHTML = Tasks_Length;
        Task_in_Progress.innerHTML = Task_in_Progress_Length;
        Awaiting_feedback.innerHTML = Awaiting_feedback_Length;
        Task_Done.innerHTML = Task_Done_Length;
        Task_in_Board.innerHTML = Task_in_Board_Length;

        console.log(Task_in_Board);

    } catch (e) {
        console.error('Loading error:', e);
    }
}

