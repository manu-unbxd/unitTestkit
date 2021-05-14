import TodoApp from "../src/index";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#000000">
    <title>todo app </title>
</head>
<body>
    <h1>📝 To Do App</h1>
    <div id="inputTodo" class="input-wrapper">
        <input type="text" placeholder="Please enter the task..." />
        <button id="createBtn" type="button">+</button>
    </div>
    <div class="todoApp">
        <div id="todoWrapper">
        </div>

    </div>
</body>
</html>`);
const {
    document,
    window
} = dom;
describe('unbxd core sdk', () => {
    beforeAll(done => {
        const appElem = document.getElementById("app");
        const appInputWrapper = document.getElementById("inputTodo");
        const input = appInputWrapper.querySelector("input");
        const createBtn = document.getElementById("createBtn");

        global.todoApp = new TodoApp({
            todoWrapper:document.getElementById("todoWrapper"),
            input:input,
            createButton:createBtn,
            storeId:"todoListTasks"
        });
        global.todoApp.initialize().then(function(state){
            console.log("initialised")
        });
        global.todoApp.initialize().then(function(state){
            done();
        });
    });
    it('get the instance', (done) => {
        expect(global.todoApp).not.toBeNull();
        done()
    });
     
 });