

// Evènements

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

const buttonAdd = document.getElementById("button_add");
if (buttonAdd == null) {
    console.log("Bouton ajouter manquant");
} else {
    buttonAdd.addEventListener("click",() => { addTask() });
}

const buttonRemove = document.getElementById("button_remove");
if (buttonRemove == null) {
    console.log("Bouton ajouter manquant");
} else {
    buttonRemove.addEventListener("click",() => { removeCheckedTasks() });
}


// Fonctions

var lastId = -1;

function addTask() {
    const listElement = document.querySelector("ol#list");
    const userInput = document.querySelector("input");

    if (listElement != null && userInput != null) {
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
        newCrossElement.addEventListener("click",() => { newLiElement.remove(); });
        newLiElement.appendChild(newCrossElement);
    }
}

function removeCheckedTasks() {

    const listElement = document.querySelector("ol#list");
    if (listElement == null) {
        console.log("ol#list inexistant");
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