let todo = [];


 async function init(){
  await includeHTML();
        loadTodos(); 
  await getInitials();
  await displayOptions();
  greetingOnDailyTime();
  getCurrentDate();
}

async function loadTodos() {
    try {

        let Tasks = document.getElementById('Tasks_ToDo_value');
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


    } catch (e) {
        console.error('Loading error:', e);
    }
}

//this function is to get the user initials 

async function getInitials(){
    UserInitials = await getItem('userInitial');
    UserName = await getItem('userName');
    const kanban = document.getElementById("kanban");
    kanban.innerHTML += `<div onclick="displayOptions()" id="initials">
      ${UserInitials}
      </div>`;
}

//this function is to open the submenu for the logout

async function displayOptions() {
  const options = document.getElementById("options");
  const isDisplayed = options.classList.toggle("dNone");
 
  if (isDisplayed) {
    document.getElementById('d_none_svg').style.display = 'none';
  }

  if (isDisplayed && !options.innerHTML.trim()) {
    options.innerHTML = /*html*/`
      <div class="option"><a href="/PrivacyPolicy/privacypolicy.html">Privacy Policy</a></div>
      <div class="option"><a href="/LegalNotice/legalnotice.html">Legal Notice</a></div>
      <div class="option" onclick="goToLogin()">Log out</div>
    
    `;
  }
}

  function goToLogin(){
    window.location.pathname = '/Login/login.html';
  }


  //this function is to greet the user based on daily time

  function greetingOnDailyTime(){
      const timeOfDay = getTimeOfDay();
      const userNameFlex = `<span style="color: #4589FF; font-weight: bold; font-size: 60px;">${UserName}</span>`;
      const greetingMessage = `${timeOfDay}, ${userNameFlex}`;
      document.getElementById("timezone").innerHTML = greetingMessage;

    }
    

    function getTimeOfDay(){

      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) return "Guten Morgen";
      if (currentHour >= 12 && currentHour < 18) return "Guten Tag";
      if (currentHour >= 18 && currentHour < 22) return "Guten Abend";
      return "Gute Nacht";
    }
  
    //this function is to get the current date

    function getCurrentDate(){
      let currentDateElement = document.getElementById("currentDate");
      let currentDate = new Date();
      let options = { year: 'numeric', month: 'long', day: 'numeric' };
      currentDateElement.textContent = currentDate.toLocaleDateString('de-DE', options);
    }
