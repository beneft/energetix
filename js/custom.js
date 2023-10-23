
window.addEventListener('load',()=> {
    const container = document.querySelector("#list");  //the whole div
    const input = document.querySelector("#input");
    const list = document.querySelector("#todoul");
    container.addEventListener("submit", (e) => {
        e.preventDefault();
        const task = input.value;       //get field string
        if (!task) {
            alert('The field is empty!');
        } else {
            const newTask = document.createElement("li");   //create new list item with bootstrap classes
            newTask.classList.add("list-group-item");
            newTask.classList.add("d-flex");
            newTask.classList.add("justify-content-between");
            const newTaskContent = document.createElement("span");  //add text
            newTaskContent.innerHTML = task;
            newTaskContent.classList.add("text");
            newTaskContent.classList.add('text-break');
            newTask.appendChild(newTaskContent);
            const newTaskActions = document.createElement("span");      //button span
            newTaskActions.classList.add("ms-auto");
            const newTaskDelete = document.createElement("button");
            const newTaskDone = document.createElement("button");
            newTaskDone.classList.add("btn-done");
            newTaskDone.innerHTML = "&#9989";
            newTaskDelete.classList.add("btn-delete");
            newTaskDelete.innerHTML = "🗑️";
            newTaskActions.appendChild(newTaskDone);
            newTaskActions.appendChild(newTaskDelete);
            newTask.appendChild(newTaskActions);
            list.appendChild(newTask);                  //create new entry
            input.value = "";
            newTaskDelete.addEventListener('click', () => {     //delete button event
                list.removeChild(newTask);
            });
            newTaskDone.addEventListener('click', () => {       //mark as done button event
                if (newTaskDone.innerHTML.charCodeAt(0) === 9989) {     //change the button appearance and add style class
                    newTaskDone.innerHTML = "&#10062";
                    newTaskContent.classList.add('donetask');
                } else {
                    newTaskDone.innerHTML = "&#9989";
                    newTaskContent.classList.remove('donetask');
                }
            })
        }
    });

    const deletebtns = document.querySelectorAll(".btn-delete");
    deletebtns.forEach((button) => {                //set event listener for all buttons
        button.addEventListener('click', () => {
            const candidate = button.closest('.list-group-item');
            list.removeChild(candidate);
        });
    });
    const donebtns = document.querySelectorAll(".btn-done");
    donebtns.forEach((button) => {      //set event listener for all buttons
        button.addEventListener('click', () => {
            const candidate = button.closest('.list-group-item');
            const text = candidate.querySelector('.text');
            if (button.innerText.charCodeAt(0) === 9989) {
                button.innerText = "&#10062";
                text.classList.add('donetask');
            } else {
                button.innerText = "&#9989";
                text.classList.remove('donetask');
            }
        })
    });
});
