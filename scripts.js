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
    buttonAdd.addEventListener("click",() => { addTask() });
}

// Clic sur le bouton "Supprimer" => suppression des tâches sélectionnées
const buttonRemove = document.getElementById("button_remove");
if (buttonRemove == null) {
    console.log("Bouton ajouter manquant");
} else {
    buttonRemove.addEventListener("click",() => { 
        if (confirm("Supprimer la tâche?")) {
            removeCheckedTasks();
        }
    });
}

// Clic sur la croix à droite d'une tâche => suppression de la tâche
function onCrossClicked(liElement) {
    if (liElement == null) {
        console.log("onCrossClicked(): liElement null");
        return;
    }
    if (confirm("Supprimer la tâche?")) {
        liElement.remove();
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
    newLiElement.appendChild(newCheckboxElement);

    const newLabelElement = document.createElement("label");
    newLabelElement.setAttribute("for",lastId); // permet d'agir sur la checkbox quand on clique sur le texte
    newLabelElement.innerText = userInput.value;
    newLiElement.appendChild(newLabelElement);

    const newCrossElement = document.createElement("img");
    newCrossElement.setAttribute("src","cross.svg");
    newCrossElement.setAttribute("class","img_cross");
    newCrossElement.addEventListener("click",() => { onCrossClicked(newLiElement)});
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