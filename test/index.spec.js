import {describe, it, before, after} from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';
import TodoApp from "../src/index";
import { JSDOM } from 'jsdom';

const jsdom = new  JSDOM(`<!DOCTYPE html>
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
const { window } = jsdom;

global.window = window;
global.document = window.document;
const appInputWrapper = document.getElementById("inputTodo");
const input = appInputWrapper.querySelector("input");
const createBtn = document.getElementById("createBtn");
const firstTodo = "Todo 1";
 before(done => {
        global.todoApp = new TodoApp({
            todoWrapper:document.getElementById("todoWrapper"),
            input:input,
            createButton:createBtn,
            storeId:"todoListTasks"
        });
        done();
    });
 describe('Todo App', () => {
    it('should be true', function() {
        expect(true).equal(true);
    });
    it('respond with matching records', function(done) {
        global.todoApp.initialize().then(function(state){
            done();
        });
    });
    it('add a todo', function(done) {
        global.todoApp.options.input.value = firstTodo;
        todoApp.options.createButton.click();
        const todoL = global.todoApp.state.todoList.length;
        expect(todoL).equal(1);
        done();
    });
    it('complete a todo', function(done) {
        const firstTodo = global.todoApp.options.todoWrapper.querySelector(".finish-btn");
        firstTodo.click();
        done();
    });
    it('check for the complete class', function() {
        const firstTodo = global.todoApp.options.todoWrapper.querySelector(".finish-btn");
        const firstTodoItem = global.todoApp.options.todoWrapper.querySelector(".todo-item");
        const isUndo = firstTodo.classList.contains("undo");
        const isFirstTodo = firstTodoItem.classList.contains("done");
        expect(isUndo).equal(true);
        expect(isFirstTodo).equal(true);
    });
    it('undo a todo', function(done) {
        const firstTodo = global.todoApp.options.todoWrapper.querySelector(".finish-btn");
        firstTodo.click();
        done();
    });
    it('check for the undo class', function() {
        const firstTodo = global.todoApp.options.todoWrapper.querySelector(".finish-btn");
        const firstTodoItem = global.todoApp.options.todoWrapper.querySelector(".todo-item");
        const isUndo = firstTodo.classList.contains("undo");
        console.log(firstTodoItem.classList.contains("progress"),"firstTodoItem.classListfirstTodoItem.classList")
        const isFirstTodo = firstTodoItem.classList.contains("progress");
        expect(isUndo).equal(true);
        expect(isFirstTodo).equal(true);
    });
    
  
  });