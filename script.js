// Éléments de l'interface utilisés par les différentes actions.
const inputText = document.querySelector(".inputtext")
const btnAdd = document.querySelector(".add")
const btnClear = document.querySelector(".clear")
const taskToDo = document.querySelector(".tasktodo")
const taskFinished = document.querySelector(".taskfinished")
const days = document.querySelectorAll("p")

// Chaque jour possède ses propres listes de tâches à faire et terminées.
// À améliorer : stocker des références DOM couple les données à l'interface ; préférer des objets {text, completed} et générer l'affichage à partir de ces données.
const TasksListDay = {
  courently: {taskstodo:[],tasksfinished:[]},
  monday: {taskstodo:[],tasksfinished:[]},
  tuesday: {taskstodo:[],tasksfinished:[]},
  wednesday: {taskstodo:[],tasksfinished:[]},
  thurday: {taskstodo:[],tasksfinished:[]},
  friday: {taskstodo:[],tasksfinished:[]},
  saturday: {taskstodo:[],tasksfinished:[]},
  sunday: {taskstodo:[],tasksfinished:[]}
}



// Affichage et mise à jour des listes de tâches.

// Affiche les tâches du jour sélectionné et ajoute une tâche si elle est fournie.
function addTaskDay(htmlString = ""){
  let choice
  days.forEach(day =>{
    if(day.className.includes("choice")){
      // À améliorer : déduire une clé de données depuis une classe CSS est fragile ; utiliser un identifiant ou un attribut data-day dédié.
      choice = day.className.slice(0, day.className.indexOf("y") + 1)
      pushOrAddTasksToDoInDOM(TasksListDay[choice].taskstodo,htmlString)
    }
  })
}

// Met à jour l'affichage des tâches à faire et ajoute une nouvelle tâche à la liste.
function pushOrAddTasksToDoInDOM(list, str){
  taskToDo.innerHTML = ""
  if(inputText.value !== "" || str){
        list.push(str)
    }
  if (list.length !== 0) {
    list.forEach(task => taskToDo.append(task))
  }
}

// Met à jour l'affichage des tâches terminées et enregistre la tâche reçue.
function addFinishedTask(list, str){
  taskFinished.innerHTML = ""
  if(str !== ""){
    list.push(str)
  }
  if (list.length !== 0) {
    list.forEach(task => taskFinished.append(task))
  }
}

// Affiche les tâches terminées du jour actuellement sélectionné.
function addFinishedTaskToListDay(htmlString = ""){
  let choice
  days.forEach(day =>{
    if(day.className.includes("choice")){
      // À améliorer : déduire une clé de données depuis une classe CSS est fragile ; utiliser un identifiant ou un attribut data-day dédié.
      choice = day.className.slice(0, day.className.indexOf("y") + 1)
      
      addFinishedTask(TasksListDay[choice].tasksfinished,htmlString)
    }
  })
}

// Retire de la liste l'element DOM exact, ou la tache parente si une case est fournie.
function deleteTask(list, str){
  const task = str.className === "task" ? str : str.parentElement
  const taskIndex = list.indexOf(task)
  if(taskIndex !== -1){
    list.splice(taskIndex, 1)
  }
}

// Récupère le jour actif, puis lance la mise à jour de sa liste de tâches à faire.
function deleteTaskFinished(element){
  let choice
  days.forEach(day =>{
    if(day.className.includes("choice")){
      // À améliorer : déduire une clé de données depuis une classe CSS est fragile ; utiliser un identifiant ou un attribut data-day dédié.
      choice = day.className.slice(0, day.className.indexOf("y") + 1)
      deleteTask(TasksListDay[choice].tasksfinished, element)
    }
  })
}

// Récupère le jour actif, puis lance la mise à jour de sa liste de tâches à faire.
function deleteTaskToDo(element){
  let choice
  days.forEach(day =>{
    if(day.className.includes("choice")){
      // À améliorer : déduire une clé de données depuis une classe CSS est fragile ; utiliser un identifiant ou un attribut data-day dédié.
      choice = day.className.slice(0, day.className.indexOf("y") + 1)
      deleteTask(TasksListDay[choice].taskstodo,element)
    }
  })
}


// Actions déclenchées par l'utilisateur.

// Crée une tâche à partir du texte saisi, puis vide le champ.
function add(e){
  if(inputText.value !== ""){
    const div = document.createElement("div")
    // À améliorer : innerHTML interprète le texte saisi comme du HTML ; construire les éléments DOM et utiliser textContent pour les données utilisateur.
    div.innerHTML = `        
              <p>${inputText.value}</p>
              <input class="inputcheckbox" type="checkbox">`
    div.classList = "task"
    addTaskDay(div)

    inputText.value = ""
  }

  const inputCheckbox = document.querySelectorAll(".inputcheckbox")
  // À améliorer : réabonner toutes les cases à chaque ajout crée des gestionnaires en double ; écouter le changement à la création de chaque case.
  inputCheckbox.forEach(checkbox => checkbox.addEventListener("change", finishedTask))
}

// Met à jour l'apparence de la tâche et les listes selon l'état de sa case.
function finishedTask(e){
  if(e.target.checked){
    taskFinished.innerHTML = ""
    // À améliorer : les styles inline mélangent logique et présentation ; utiliser des classes CSS pour représenter l'état terminé.
    e.target.previousElementSibling.style.textDecoration = "line-through"
    e.target.parentElement.id = "mustRemove";
    addFinishedTaskToListDay(e.target.parentElement)
    deleteTaskToDo(e.target.parentElement)

  }else{
    e.target.previousElementSibling.style.textDecoration = "none"
    e.target.parentElement.id = "";
    addTaskDay(e.target.parentElement)
    deleteTaskFinished(e.target.parentElement)
    taskToDo.prepend(e.target.parentElement)

  }
  console.log(e.target.checked)
}

// Change le jour actif et affiche ses deux listes.
function handleClick(e){
  days.forEach(day => day.style.background = "none")
  days.forEach(day => day.classList.remove("choice"))
  e.target.classList.add("choice")
  e.target.style.background = "rgb(21, 203, 197)";
  taskToDo.innerHTML = ""
  addTaskDay()
  addFinishedTaskToListDay()
}

// Supprime de l'écran et de la liste conserné les tâches dont la case est cochée.
function clear(e){
  function clearElement(el){
    if(el.checked){
      el.parentElement.remove()
      deleteTaskFinished(el)
    }
  }

  const inputCheckbox = document.querySelectorAll(".inputcheckbox")
  // À améliorer : retirer seulement les éléments du DOM laisse les listes en mémoire incohérentes ; synchroniser aussi les données.
  inputCheckbox.forEach(el => clearElement(el))
}


// Branchement des événements, regroupé ici pour repérer facilement les interactions.
btnAdd.addEventListener("click", add)
days.forEach(day => day.addEventListener("click",handleClick))
btnClear.addEventListener("click", clear)
