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
            addTask();
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
        addTask();
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
// liElement : HTMLLiElement
function onCrossClicked(liElement) {
    if (liElement == null) {
        console.log("onCrossClicked(): liElement null");
        return;
    }
    if (confirm("Supprimer la tâche ?")) {
        liElement.remove();
    }
}

// Clic sur la checkbox à gauche d'une tâche => toogle texte barré
// liElement : HTMLLiElement
function onCheckboxClicked(liElement) {
    if (liElement == null) {
        console.log("onCheckboxClicked(): liElement null");
        return;
    }
    const taskLabelElement = liElement.querySelector("label");
    if (taskLabelElement == null) {
        console.log("onCheckboxClicked(): label manquant");
        return;
    }
    if (taskLabelElement.childNodes.lenght < 1) {
        console.log("onCheckboxClicked(): label vide");
        return;
    }

    // simple texte, il n'est pas barré => on barre le texte
    if (taskLabelElement.childNodes[0].nodeType == 3 /*TEXT_NODE*/) {
        const crossedTextElement = document.createElement("s");
        crossedTextElement.innerText = taskLabelElement.innerHTML;
        taskLabelElement.innerHTML = "";
        taskLabelElement.appendChild(crossedTextElement);

    // il y a une balise dedans (<s>) => on remplace par du texte simple
    } else if (taskLabelElement.childNodes[0].nodeType == 1 /* ELEMENT_NODE */) {
        const crossedTextElement = taskLabelElement.childNodes[0].innerText;
        taskLabelElement.innerHTML = crossedTextElement;
    }
}


// Fonctions
// -------------------------------------------------------------------------------------

var lastId = -1;

function addTask() {

    const listElement = document.getElementById("task_list");
    if (listElement == null) {
        console.log("Liste des tâches manquante");
        return;
    }

    const userInput = document.getElementById("user_input");
    if (userInput == null) {
        console.log("Champe de saisie manquant");
        return;
    }
    
    lastId++;

    const newLiElement = document.createElement("li");
    listElement.appendChild(newLiElement);
    
    const newCheckboxElement = document.createElement("input");
    newCheckboxElement.setAttribute("id",lastId);
    newCheckboxElement.setAttribute("type","checkbox");
    newCheckboxElement.addEventListener("click",() => { onCheckboxClicked(newLiElement); });
    newLiElement.appendChild(newCheckboxElement);

    const newLabelElement = document.createElement("label");
    newLabelElement.setAttribute("for",lastId); // permet d'agir sur la checkbox quand on clique sur le texte
    newLabelElement.innerText = userInput.value;
    newLiElement.appendChild(newLabelElement);

    const newCrossElement = document.createElement("img");
    newCrossElement.setAttribute("src","cross.svg");
    newCrossElement.setAttribute("class","img_cross");
    newCrossElement.addEventListener("click",() => { onCrossClicked(newLiElement); });
    newLiElement.appendChild(newCrossElement);
}

function removeCheckedTasks() {

    const listElement = document.getElementById("task_list");
    if (listElement == null) {
        console.log("Liste de tâches manquantes");
        return;
    }

    // Si on supprime un child de childNodes, childNodes est modifié,
    // donc on parcours une copie de childNodes.
    const listItemsElements = Array.from(listElement.childNodes);
    listItemsElements.forEach(
        item => {
            const checkboxElement = item.querySelector("input");
            if (checkboxElement != null && checkboxElement.checked) {
                item.remove();
            }
        }
    );
}