// Evènements
// -------------------------------------------------------------------------------------

// Touche "Entrée" => ajout d'une tâche à partir de user_input
const userInput = document.getElementById("user_input");
if (userInput == null) {
    console.log("Champ de saisie manquant");
} else {
    userInput.addEventListener("keyup", (event) => {
        console.log("Event");
        if (event.key === "Enter") {
            addTaskFromUserInput();
            userInput.value = "";
        }
        const messageElement = document.getElementById("message");
        if (messageElement != null) {
            messageElement.innerHTML = "";
        }
    });
}

// Clic sur le bouton "Ajouter" => ajout d'une tâche à partir de user_input
const buttonAdd = document.getElementById("button_add");
if (buttonAdd == null) {
    console.log("Bouton ajouter manquant");
} else {
    buttonAdd.addEventListener("click",() => { 
        addTaskFromUserInput();
        userInput.value = "";
    });
}

// Clic sur le bouton "Supprimer" => suppression des tâches sélectionnées
const buttonRemove = document.getElementById("button_remove");
if (buttonRemove == null) {
    console.log("Bouton ajouter manquant");
} else {
    buttonRemove.addEventListener("click",() => {
        if (confirm("Supprimer la ou les tâches sélectionnées ?")) {
            removeCheckedTasks();
        }
    });
}

// Clic sur la croix à droite d'une tâche => suppression de la tâche
// taskId : number (position de la tâche dans "taskList")
function onCrossClicked(taskId) {
    if (taskId < 0 || taskId >= tasksList.length) {
        console.log("onCrossClicked(): taskId invalide");
        return;
    }
    if (confirm("Supprimer la tâche ?")) {
        removeTask(taskId)
    }
}

// Clic sur la checkbox à gauche d'une tâche => toogle texte barré
// taskId : number (position de la tâche dans "taskList")
function onCheckboxClicked(taskId) {
    if (taskId < 0 || taskId >= tasksList.length) {
        console.log("onCheckboxClicked(): taskId invalide");
        return;
    }
    tasksList[taskId].isChecked = !tasksList[taskId].isChecked;
    updateList();
}

// taskId : number (position de la tâche dans "taskList")
function onUpArrowClicked(taskId) {
    if (taskId < 0 || taskId >= tasksList.length) {
        console.log("onUpArrowClicked(): taskId invalide");
        return;
    }
    if (taskId == 0) {
        return;
    }

    const taskToMoveUp = tasksList[taskId];
    const taskToMoveDown = tasksList[taskId-1];
    tasksList[taskId-1] = taskToMoveUp;
    tasksList[taskId] = taskToMoveDown;
    updateList();
}

// taskId : number (position de la tâche dans "taskList")
function onDownArrowClicked(taskId) {
    if (taskId < 0 || taskId >= tasksList.length) {
        console.log("onUpArrowClicked(): taskId invalide");
        return;
    }
    if (taskId == tasksList.length-1) {
        return;
    }

    const taskToMoveUp = tasksList[taskId+1];
    const taskToMoveDown = tasksList[taskId];
    tasksList[taskId] = taskToMoveUp;
    tasksList[taskId+1] = taskToMoveDown;
    updateList();
}

// Fonctions
// -------------------------------------------------------------------------------------

// taksList : Array<task_new()>
let tasksList = [];

// text : string (texte de la tâche)
// checked : boolean (tâche cochée ou pas)
function task_new(text,checked) {
    return {
        text : text,
        isChecked : checked
    };
}

function addTaskFromUserInput() {
    const userInput = document.getElementById("user_input");
    if (userInput == null) {
        console.log("Champe de saisie manquant");
        return;
    }

    tasksList.push(task_new(userInput.value,false));
    updateList();    
}

function removeTask(taskId) {
    tasksList.splice(taskId,1);
    updateList();
}

function removeCheckedTasks() {
    tasksList = tasksList.filter((task) => !task.isChecked)
    updateList();
}

// A chaque appel, on efface toute la liste contenue dans le DOM
// et on recrée à partir de la liste contenue dans la variable globale "taskList"
function updateList() {
    const listElement = document.getElementById("task_list");
    if (listElement == null) {
        console.log("Liste des tâches manquante");
        return;
    }

    listElement.innerHTML = "";

    let id = 0;
    tasksList.forEach((task) => {
        // Obligé de faire une copie "currentId" de "id" 
        // avec un scope limité à une itération de la boucle forEach
        // sinon quand les event listeners sont appellés avec "id" en argument
        // on dirait que c'est la référence de la variable qui est prise 
        // et non pas la valeur numérique qu'elle contient au moment de l'appel dans cette boucle.
        // à creuser...
        let currentId = id; 

        const newLiElement = document.createElement("li");
        listElement.appendChild(newLiElement);
        
        const newCheckboxElement = document.createElement("input");
        newCheckboxElement.setAttribute("id",currentId);
        newCheckboxElement.setAttribute("type","checkbox");
        newCheckboxElement.checked = task.isChecked;
        newCheckboxElement.addEventListener("click",() => { onCheckboxClicked(currentId); });
        newLiElement.appendChild(newCheckboxElement);

        const newLabelElement = document.createElement("label");
        newLabelElement.setAttribute("for",currentId); // permet d'agir sur la checkbox quand on clique sur le texte
        if (task.isChecked) {
            const crossedElement = document.createElement("s");
            crossedElement.innerText = task.text;
            newLabelElement.appendChild(crossedElement);
        } else {
            newLabelElement.innerHTML = task.text;
        }
        newLiElement.appendChild(newLabelElement);

        const newCrossElement = document.createElement("img");
        newCrossElement.setAttribute("src","cross.svg");
        newCrossElement.setAttribute("class","img_cross");
        newCrossElement.addEventListener("click",() => { onCrossClicked(currentId); });
        newLiElement.appendChild(newCrossElement);

        const upArrowElement = document.createElement("img");
        upArrowElement.setAttribute("src","up_arrow.svg");
        upArrowElement.setAttribute("class","img_up_arrow");
        upArrowElement.addEventListener("click", () => {onUpArrowClicked(currentId); });
        newLiElement.appendChild(upArrowElement);

        const downArrowElement = document.createElement("img");
        downArrowElement.setAttribute("src","down_arrow.svg");
        downArrowElement.setAttribute("class","img_down_arrow");
        downArrowElement.addEventListener("click", () => {onDownArrowClicked(currentId); });
        newLiElement.appendChild(downArrowElement);

        id++;
    });
}