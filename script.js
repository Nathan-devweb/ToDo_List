const inputText = document.querySelector(".inputtext")
const btnAdd = document.querySelector(".add")
const btnClear = document.querySelector(".clear")
const fTasks = document.querySelector(".ftasks")
const taskFinished = document.querySelector("details")

btnAdd.addEventListener("click", add)
function add(){
  if(inputText.value != ""){
    const div = document.createElement("div")
    div.innerHTML = `        
              <p>${inputText.value}</p>
              <input class="inputcheckbox" type="checkbox">`
    div.classList = "task"
    fTasks.appendChild(div)
    inputText.value = ""
  }

  const inputCheckbox = document.querySelectorAll(".inputcheckbox")
  inputCheckbox.forEach(checkbox => checkbox.addEventListener("change", finishedTask))
}


btnClear.addEventListener("click", clear)
function clear(){
  function clearElement(el){
    if(el.checked){
      el.parentElement.remove()
    }
  }

  const inputCheckbox = document.querySelectorAll(".inputcheckbox")
  inputCheckbox.forEach(el => clearElement(el))
}


function finishedTask(e){
  if(e.target.checked){
    e.target.previousElementSibling.style.textDecoration = "line-through"
    e.target.parentElement.classList.add("mustRemove");
    taskFinished.appendChild(e.target.parentElement)
  }else{
    e.target.previousElementSibling.style.textDecoration = "none"
    e.target.parentElement.classList.remove("mustRemove");
    fTasks.prepend(e.target.parentElement)
  }
}