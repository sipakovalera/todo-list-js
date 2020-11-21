// For todo
let inputTask =  document.querySelector('#new-task')
let activeTasks = document.querySelector('#active-tasks')
let completedTasks = document.querySelector('#completed-tasks')
let deletedTasks = document.querySelector('#deleted-tasks')
let inputDescription = document.querySelector('.describe-point')

//for Modal 
let addButton = document.querySelector('.add')
let activeModal = document.querySelector('.modal')
let pushTask = document.querySelector('.ok')


//Modal active
addButton.addEventListener('click', function(){
    activeModal.classList.add('active');
});

document.addEventListener('click', function(event){

    if(event.target.classList.contains('modal') || event.target.classList.contains('close')){ 
        clearForm();
    }

    if(event.target.classList.contains('ok')){
        addTask();
        clearForm();
    }
});
function clearForm() {

    let inputs = document.querySelectorAll('input');

    for (const $input of inputs) {
        $input.value = '';
    }

    activeModal.classList.remove('active');  
}


//New elem

    function createNewElement (task, descrip, load){
        let listItem = document.createElement('li');
        let checkbox = document.createElement('button');

        if(load){
            checkbox.className = "material-icons checkbox";
            checkbox.innerHTML = "<i class='material-icons'>check_box</i>";
        }else {
            checkbox.className = "material-icons checkbox";
            checkbox.innerHTML = "<i class='material-icons'>check_box_outline_blank</i>";
        }

        let label = document.createElement('label');
        label.innerText = task;

        let input = document.createElement('input');
        input.type = 'text';

        
        let importantButton = document.createElement('button');
        importantButton.className = "material-icons exclamation";
        importantButton.innerHTML ='<i class="fas fa-exclamation"></i>';

        let editButton = document.createElement('button');
        editButton.className = "material-icons edit";
        editButton.innerHTML ='<i class="material-icons">edit</i>';

        let deleteButton = document.createElement('button');
        deleteButton.className = "material-icons delete";
        deleteButton.innerHTML ='<i class="material-icons">delete</i>';

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(input);
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
        listItem.appendChild(importantButton);


        return listItem;

    }

//Ections with tasks
    function addTask(){
        if(inputTask.value){
            let listItem = createNewElement (inputTask.value, false);
            activeTasks.appendChild(listItem);
            taskEvents(listItem, completedTask)
            inputTask.value = "";
        } 

        save();
    }



    function deleteTask(){
       let listItem = this.parentNode;
       let checkbox = listItem.querySelector('button.checkbox');
       checkbox.className = "material-icons checkbox";
       checkbox.innerHTML = '';
       deletedTasks.appendChild(listItem);
       taskEvents(listItem, activeTask);
       save();
    }


    function editTask(){
        let editButton = this;
        let listItem = this.parentNode;
        let label = listItem.querySelector('label');
        let input = listItem.querySelector('input[type = text]');

        let containsClass = listItem.classList.contains('editMode');

        if(containsClass){
            label.innerText = input.value;
            editButton.className = "material-icons edit";
            editButton.innerHTML = '<i class="material-icons">edit</i>';
            save();
        } else{
            input.value = label.innerText;
            editButton.className = "material-icons save";
            editButton.innerHTML = '<i class="material-icons">save</i>';
        }

        listItem.classList.toggle('editMode');
        
    }

    function importantTask() {
        let listItem = this.parentNode;
        listItem.querySelector('button.exclamation').classList.toggle('important');   
    }

    function completedTask(){
        let listItem = this.parentNode;
        let checkbox = listItem.querySelector('button.checkbox');
        checkbox.className = "material-icons checkbox";
       checkbox.innerHTML = '<i class="material-icons">check_box</i>';

       completedTasks.appendChild(listItem);
       taskEvents(listItem, activeTask);
       save();
    }


    function activeTask(){
        let listItem = this.parentNode;
        let checkbox = listItem.querySelector('button.checkbox');
        checkbox.className = "material-icons checkbox";
        checkbox.innerHTML = '<i class="material-icons">check_box_outline_blank</i>';

        activeTasks.appendChild(listItem);
        taskEvents(listItem,completedTask);
        save();
    }

//Events with tasks

    function taskEvents(listItem, checkboxEvent){
        let checkbox = listItem.querySelector('button.checkbox') 
        let editButton = listItem.querySelector('button.edit') 
        let deleteButton = listItem.querySelector('button.delete')
        let importantButton = listItem.querySelector('button.exclamation')

        checkbox.onclick = checkboxEvent;
        editButton.onclick = editTask;
        deleteButton.onclick  = deleteTask;
        importantButton.onclick = importantTask;

    }

//LocalStorage    

    function save(){

        let activeTasksArr = [];
        

        for (let i = 0; i < activeTasks.children.length; i++ ){
            activeTasksArr.push(activeTasks.children[i].getElementsByTagName('label')[0].innerText)
        }

        let completedTasksArr = [];
        for (let i = 0; i < completedTasks.children.length; i++ ){
            completedTasksArr.push(completedTasks.children[i].getElementsByTagName('label')[0].innerText);
        }

        let deletedTasksArr = [];
        for (let i = 0; i < deletedTasks.children.length; i++ ){
            deletedTasksArr.push(deletedTasks.children[i].getElementsByTagName('label')[0].innerText);
        }

    
    localStorage.removeItem('todolist');
    localStorage.setItem('todolist', JSON.stringify({
        activeTasks: activeTasksArr,
        completedTasks: completedTasksArr,
        deletedTasks: deletedTasksArr        

    }));
    }

    function loading(){
        return JSON.parse(localStorage.getItem('todolist'));
    }

    let data = loading();
    for(let i = 0; i < data.activeTasks.length; i++){
        let listItem = createNewElement(data.activeTasks[i], false);
        activeTasks.appendChild(listItem);
        taskEvents(listItem, completedTask);
    }

    for(let i = 0; i < data.completedTasks.length; i++){
        let listItem = createNewElement(data.completedTasks[i], true);
        completedTasks.appendChild(listItem);
        taskEvents(listItem, activeTask);
    }
