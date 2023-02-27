const todoText = document.querySelector("#todoText");
const todoSubmit = document.querySelector("#todoSubmit");
const todoList = document.querySelector("#todoList");
const finishedTodo = document.querySelector("#finishedToDO");

// localStorage.setItem("savedToDos", JSON.stringify(["meow", "why"]));
// localStorage.setItem("finishedToDos", JSON.stringify(["البحرين", "bro"]));

let savedToDos = JSON.parse(window.localStorage.getItem("savedToDos")) || [];
let savedFinisheds =
  JSON.parse(window.localStorage.getItem("finishedToDos")) || [];

if (savedToDos.length == 0) {
  savedToDos.push("welcome");
  localStorage.setItem("savedToDos", JSON.stringify(savedToDos));
}
if (savedFinisheds.length == 0) {
  savedFinisheds.push("hello");
  localStorage.setItem("finishedToDos", JSON.stringify(savedFinisheds));
}

// local storage saved need to finish

savedToDos.forEach((ele) => {
  const todoDom = document.createElement("li");
  const todoSpan = document.createElement("span");
  const trash = document.createElement("i");
  const check = document.createElement("i");
  const trashContainer = document.createElement("div");
  const checkContainer = document.createElement("div");

  addClasses(
    todoDom,
    trash,
    todoSpan,
    check,
    ele,
    trashContainer,
    checkContainer
  );
  appendChildToDO(
    todoDom,
    trash,
    todoSpan,
    check,
    trashContainer,
    checkContainer,
    false
  );
  trashEventListener(trashContainer, todoSpan, todoDom);
  checkEventListener(checkContainer, todoSpan, todoDom);
});

//__________________________________________________________________
// local storage saved checked
//__________________________________________________________________
savedFinisheds.forEach((ele) => {
  const todoDom = document.createElement("li");
  const todoSpan = document.createElement("span");
  const trash = document.createElement("i");
  const trashContainer = document.createElement("div");

  addClassesTrash(todoDom, trash, todoSpan, ele, trashContainer);

  // append elements to the dom
  trashContainer.appendChild(trash);
  todoDom.appendChild(trashContainer);
  todoDom.appendChild(todoSpan);
  finishedTodo.appendChild(todoDom);

  trashEventListener(trashContainer, todoSpan, todoDom);
});

// _______________________________________________________________________________
// When button clicked add the element to the dom and add all the classes its needs
// _______________________________________________________________________________
todoSubmit.addEventListener("click", () => {
  let todo = returnTodoText();
  if (todo == "") {
  } else {
    savedToDos.push(todo);
    localStorage.setItem("savedToDos", JSON.stringify(savedToDos));

    const todoDom = document.createElement("li");
    const todoSpan = document.createElement("span");
    const trash = document.createElement("i");
    const check = document.createElement("i");
    const trashContainer = document.createElement("div");
    const checkContainer = document.createElement("div");

    addClasses(
      todoDom,
      trash,
      todoSpan,
      check,
      todo,
      trashContainer,
      checkContainer
    );
    appendChildToDO(
      todoDom,
      trash,
      todoSpan,
      check,
      trashContainer,
      checkContainer,
      false
    );

    trashEventListener(trashContainer, todoSpan, todoDom);
    checkEventListener(checkContainer, todoSpan, todoDom);
  }
});

//
// ==============================================
//  clear all
// ==============================================
//

const clearToDo = document.querySelector("#clear-todo");
const clearFinsished = document.querySelector("#clear-finished");

clearToDo.addEventListener("dblclick", () => {
  savedToDos = [];
  localStorage.setItem("savedToDos", JSON.stringify(savedToDos));
  todoList.innerHTML = "";
});
clearFinsished.addEventListener("dblclick", () => {
  savedFinisheds = [];
  localStorage.setItem("finishedToDos", JSON.stringify(savedFinisheds));
  finishedTodo.innerHTML = "";
});
//
// ==============================================
//  ooga booga -- dodo magic
// ==============================================
//
const ooga = document.querySelector("#ooga-radio");
const dodo = document.querySelector("#dodo-radio");
ooga.addEventListener("click", () => {
  todoList.innerHTML = "";
  savedToDos = mixer(savedToDos);
  localStorage.setItem("savedToDos", JSON.stringify(savedToDos));
  savedToDosAddOoga();
});

dodo.addEventListener("click", () => {
  console.log("dodo");
  todoList.childNodes.forEach((ele, index) => {
    if (index == 0) {
      ele.classList.remove("bg-emerald-600");
      ele.children[2].classList.remove("text-white");
    }
    ele.children[0].classList.remove("pointer-events-none");
    ele.children[1].classList.remove("pointer-events-none");
  });
});

// ____________________________ ____________________________ ____________________________ ____________________________ ____________________________
// ============================ ============================ ============================ ============================ ============================
// functions
// ============================ ============================ ============================ ============================ ============================
// ____________________________ ____________________________ ____________________________ ____________________________ ____________________________

function returnTodoText() {
  let todo = todoText.value;
  todoText.value = "";
  return todo;
}

// for each element add the classes of it
function addClasses(
  todoDom,
  trash,
  todoSpan,
  check,
  todo,
  trashContainer,
  checkContainer
) {
  trash.classList.add(
    "fa-solid",
    "fa-trash",
    "hover:text-green-500",
    "mr-1",
    "mt-1",
    "transition",
    "duration-200",
    "ml-2"
  );
  check.classList.add(
    "fa-solid",
    "fa-check",
    "hover:text-green-500",
    "mt-1",
    "transition",
    "duration-200"
  );

  todoDom.classList.add("flex");
  todoSpan.innerText = todo;
  todoSpan.classList.add("ml-1");
  todoDom.classList.add("mt-1");
}
function addClassesTrash(todoDom, trash, todoSpan, todo, trashContainer) {
  trash.classList.add(
    "fa-solid",
    "fa-trash",
    "hover:text-green-500",
    "mr-1",
    "mt-1",
    "transition",
    "duration-200",
    "ml-2"
  );
  todoDom.classList.add("flex", "rounded");
  todoSpan.innerText = todo;
  todoSpan.classList.add("ml-1");
  todoDom.classList.add("mt-1");
  trashContainer.classList.add("clickableTrash", "inline-block");
}
// append the elements to the dom
function appendChildToDO(
  todoDom,
  trash,
  todoSpan,
  check,
  trashContainer,
  checkContainer,
  finished
) {
  trashContainer.appendChild(trash);
  checkContainer.appendChild(check);

  todoDom.appendChild(trashContainer);
  todoDom.appendChild(checkContainer);

  todoDom.appendChild(todoSpan);
  if (finished) {
    finishedTodo.appendChild(todoDom);
  } else {
    todoList.appendChild(todoDom);
  }
}

function checkEventListener(checkContainer, todoSpan, todoDom) {
  checkContainer.addEventListener("click", () => {
    savedToDos.splice(savedToDos.indexOf(todoSpan), 1);
    localStorage.setItem("savedToDos", JSON.stringify(savedToDos));

    savedFinisheds.push(todoSpan.innerText);

    localStorage.setItem("finishedToDos", JSON.stringify(savedFinisheds));

    todoDom.removeChild(todoDom.children[1]);
    if (todoDom.classList.contains("bg-emerald-600")) {
      todoDom.classList.remove("bg-emerald-600");
      todoSpan.classList.remove("text-white");
      finishedTodo.append(todoDom);

      const nextTodo = todoList.children[0];
      nextTodo.classList.add("bg-emerald-600");
      nextTodo.children[0].classList.remove("pointer-events-none");
      nextTodo.children[1].classList.remove("pointer-events-none");
    } else {
      finishedTodo.append(todoDom);
    }
  });
}

function trashEventListener(trashContainer, todoSpan, todoDom) {
  trashContainer.addEventListener("click", () => {
    todoDom.remove();
    savedFinisheds.splice(savedFinisheds.indexOf(todoSpan), 1);
    localStorage.setItem("finishedToDos", JSON.stringify(savedFinisheds));
  });
}
var mixer = (array) => {
  for (let i = array.length; i; i--) {
    let randomized = Math.floor(Math.random() * i);
    [array[i - 1], array[randomized]] = [array[randomized], array[i - 1]];
  }
  return array; //here
};

function savedToDosAddOoga() {
  savedToDos.forEach((ele, index) => {
    const todoDom = document.createElement("li");
    const todoSpan = document.createElement("span");
    const trash = document.createElement("i");
    const check = document.createElement("i");
    const trashContainer = document.createElement("div");
    const checkContainer = document.createElement("div");

    addClasses(
      todoDom,
      trash,
      todoSpan,
      check,
      ele,
      trashContainer,
      checkContainer
    );
    if (index == 0) {
      todoDom.classList.add("bg-emerald-600");
      todoSpan.classList.add("text-white");
    } else {
      trashContainer.classList.add("pointer-events-none");
      checkContainer.classList.add("pointer-events-none");
    }

    appendChildToDO(
      todoDom,
      trash,
      todoSpan,
      check,
      trashContainer,
      checkContainer,
      false
    );
    trashEventListener(trashContainer, todoSpan, todoDom);
    checkEventListener(checkContainer, todoSpan, todoDom);
  });
}
