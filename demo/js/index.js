import TodoApp from "../../src/index";
const appElem = document.getElementById("app");
const appInputWrapper = document.getElementById("inputTodo");
const input = appInputWrapper.querySelector("input");
const createBtn = document.getElementById("createBtn");

window.todoApp = new TodoApp({
    todoWrapper:document.getElementById("todoWrapper"),
    input:input,
    createButton:createBtn,
    storeId:"todoListTasks"
});
window.todoApp.initialize().then(function(state){
    console.log("initialised")
});

