const inputEle = document.querySelector('.js-input-section');
const btnEle = document.querySelector('.js-btn');
const numberOfTaskEle = document.querySelector('.task-remaining');
const uncompleteTaskContainerEle = document.querySelector('.js-uncomplete-tasks');

const errorEle = document.querySelector('.js-error');

const taskSection = document.querySelector('.js-tasks');

let uncompletedTask = 0;
let taskHTML = ``;

function saveToStorage() {
    localStorage.setItem('data' , taskSection);
}

function getFromStorage() {
    console.log('data')
    localStorage.getItem('data');
}

function updateRemainingTaskNumber(){
    if(uncompletedTask >= 0){
        numberOfTaskEle.innerText = uncompletedTask;
    } else {
        numberOfTaskEle.innerText = 0;
    }
    saveToStorage();
}

function addTask(taskMsg){
    const task = document.createElement('li');
    task.innerHTML = `
            <span class="task-data">
                <img src="https://cdn-icons-png.flaticon.com/512/15476/15476717.png" alt="unchecked" class="unchecked task-status">

                <span class="task-msg">${taskMsg}</span>
            </span>
            
            <span class="options">
                <img src="https://cdn-icons-png.flaticon.com/512/1160/1160515.png" alt="edit" class="edit-icon">

                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="delete" class="delete-icon">
            </span>
        `;

        uncompleteTaskContainerEle.appendChild(task);
        uncompletedTask++;
        updateRemainingTaskNumber();
        saveToStorage();
}


function deleteTask(deleteTaskEle) {
    const liToDelete = deleteTaskEle.parentNode.parentNode;
    liToDelete.remove();
    uncompletedTask--;
    updateRemainingTaskNumber();
    saveToStorage();
}

function editTask(taskMsgEle) {
    const taskMsg = taskMsgEle.innerText;
    // const liContainer = taskMsgEle.parentNode.parentNode;
    inputEle.value = taskMsg;
    btnEle.innerText = 'Edit';
    btnEle.addEventListener('click' , (e) => {
        let newMsg = inputEle.value;
        console.log(`new value is: '${newMsg}'`);
        // taskMsg.innerText = newMsg;
    })
    saveToStorage();
}

function checkMarkToggle(checkmarkImage, taskMsgEle) {
    
    // console.log(checkmark);
    if(checkmarkImage.classList.contains('unchecked')){
        checkmarkImage.setAttribute('src' , 'https://cdn-icons-png.flaticon.com/512/14090/14090371.png');
        taskMsgEle.style.textDecoration = 'line-through';
        uncompletedTask--;
        updateRemainingTaskNumber();
    } else{
        checkmarkImage.setAttribute('src' , 'https://cdn-icons-png.flaticon.com/512/15476/15476717.png');
        taskMsgEle.style.textDecoration = 'none';
        uncompletedTask++;
        updateRemainingTaskNumber();
    }
    checkmarkImage.classList.toggle('unchecked');
    // console.log(checkmark.className)
    saveToStorage();
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

// btnEle.addEventListener('click', (e) => {
//     e.preventDefault();
//     let taskmsg = inputEle.value;

//     if(taskmsg === '' || taskmsg === ' '){
//         errorEle.style.display = 'block';
//         errorEle.classList.add('shake-animation');
//         setTimeout( () => {
//             errorEle.classList.remove('shake-animation');
//         }, 600);
//     } else{
//         addTask(taskmsg);
//         errorEle.style.display = 'none';
//     }
//     inputEle.value = '';
// })

uncompleteTaskContainerEle.addEventListener('click' , (e) => {

    /* NOTES
    console.log(element.parentNode.children[0]); // click on msg and this is image html
    console.log(element.parentNode.children[1]); // click on checkmark and get msg
    console.log(element.parentNode.parentNode) // use in delete and get entire li
    console.log(element.parentNode.parentNode.children[0].children[1]) // click on edit and get msg
    */

    let element = e.target;
    
    let checkmarkImage , taskMsgEle;
    if(element.classList.contains('task-msg')){
        taskMsgEle = element.parentNode.children[1];
        checkmarkImage = element.parentNode.children[0];
        checkMarkToggle(checkmarkImage , taskMsgEle);
    } 
    else if( element.classList.contains('task-status')){
        taskMsgEle = element.parentNode.children[1];
        checkmarkImage = element.parentNode.children[0];
        checkMarkToggle(checkmarkImage , taskMsgEle);
    } 
    else if ( element.classList.contains('edit-icon') ){
        editTask(element.parentNode.parentNode.children[0].children[1]);
    } 
    else if(element.classList.contains('delete-icon')){
        deleteTask(element);
    }

});


getFromStorage();

// function clickHandleTaskArea() {
//     const taskDataContainer = document.querySelectorAll('.task-data');
//     taskDataContainer.forEach((taskDataEle) => {
//         taskDataEle.addEventListener('click' , (e) => {
//             console.log('clicked');
//         })
//     });
// }

// clickHandleTaskArea();

// const taskDataContainer = document.querySelectorAll('.task-data');

// taskDataContainer.forEach(
//     (container) => {
//         container.addEventListener('click' , (e) => {
//             console.log('container clicked');
//         })
//     } 
// );