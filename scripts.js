// Evènements

const inputElement = document.querySelector("input");
inputElement.addEventListener("keyup", function(event) {
    console.log("Event");
    if (event.key === "Enter") {
        addTask();
        inputElement.value = "";
    }
    const messageElement = document.getElementById("message");
    if (message != null) {
        message.innerHTML = "";
    }
})


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