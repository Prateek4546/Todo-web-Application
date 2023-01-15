
const form = document.getElementById('form');
const textInput = document.getElementById('textInput');
const msg = document.getElementById('msg');
const dateInput = document.getElementById('dateInput');
const textarea = document.getElementById('textarea');
const tasks = document.getElementById('tasks');
const add = document.getElementById('add');

form.addEventListener('submit' , (e) =>{
   e.preventDefault();
   formValidation();
});

const formValidation = () =>{
    if(textInput.value === ""){
        console.log('failuer');
        msg.innerHTML = "Task Cannot be Blank"
    }
    else{
        console.log('success');
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss" , "modal");
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss" , "")
        })()
    }
};


let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

const createTasks = ()=>{
    tasks.innerHTML  = "";
    data.map((x, y) => {
        return (tasks.innerHTML += `
        <div id=${y}>
              <span class="fw-bold">${x.text}</span>
              <span class="small text-secondary">${x.date}</span>
              <p>${x.description}</p>
      
              <span class="options">
                <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick ="deleteTask(this); createTasks()" class="fas fa-trash-alt"></i>
              </span>
            </div>
        `);
      });
       resetForm();
};

const deleteTask = (e) =>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id , 1); 
    localStorage.setItem("data", JSON.stringify(data));
   
};


const editTask = (e) => {
      let selecteTask =  e.parentElement.parentElement;

      textInput.value = selecteTask.children[0].innerHTML;
      dateInput.value = selecteTask.children[1].innerHTML;
      textarea.value = selecteTask.children[2].innerHTML;
      deleteTask(e);
};

const resetForm = () =>{
     textInput.value = "";
     dateInput.value = "";
     textarea.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("data"))||[];
    createTasks();
})(); 

