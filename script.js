const inputEle = document.querySelector('.js-input-section');
const btnEle = document.querySelector('.js-btn');
// const tasksEle = document.querySelector('.js-tasks');
const numberOfTaskEle = document.querySelector('.task-remaining');
const uncompleteTaskEle = document.querySelector('.js-uncomplete-tasks');
const errorEle = document.querySelector('.js-error');
// console.log(errorEle);

let uncompletedTask = 0;
let taskHTML = ``;

function saveToStorage() {
    // localStorage.setItem('data' , )
}

function getFromStorage() {
    //
}


function addTask(taskmsg){
    // console.log('inside add Task',taskmsg);
    taskHTML += 
    `
        <li>
            <span class="task-data">
                <span class="task-status">
                    <img src="https://cdn-icons-png.flaticon.com/512/15476/15476717.png" alt="uncheched" class="unchecked">
                </span>
                <span class="task-msg">${taskmsg}</span>
            </span>
            
            <span class="options">
                <span class="edit-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/1160/1160515.png" alt="edit">
                </span>
                <span class="delete-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="delete">
                </span>
            </span>
        </li>
    `;
    uncompleteTaskEle.innerHTML = taskHTML;
    uncompletedTask++;
    numberOfTaskEle.innerText = uncompletedTask;
}

function deleteTask() {

}

function editTask() {

}

function checkMark() {

}

function clickHandle(){
    btnEle.addEventListener('click', (e) => {
        e.preventDefault();
        let taskmsg = inputEle.value;

        if(taskmsg === '' || taskmsg === ' '){
            errorEle.style.display = 'block';
            errorEle.classList.add('shake-animation');
            setTimeout( () => {
                errorEle.classList.remove('shake-animation');
            }, 600);
        } else{
            addTask(taskmsg);
            errorEle.style.display = 'none';
        }
        inputEle.value = '';
    })
}

clickHandle();



