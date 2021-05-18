
const TOGGLE_TODO_ACTION = "TOGGLE_TODO";
const TOGGLE_DELETE_ACTION = "DELETE_TODO";
import htmlParser from "./modules/htmlParser";
import generateATodo from "./modules/generateATodo";
import render from "./modules/render";
import addTodo from "./modules/addTodo";

class TodoApp {
    constructor(props) {
        this.options = {
            todoWrapper:props.todoWrapper,
            input:props.input,
            createButton:props.createButton,
            storeId:props.storeId
        };
        this.state = {
            todoList:[]
        };
        this.initialize.bind(this);
        this.render = render.bind(this);
        this.htmlParser = htmlParser.bind(this);
        this.generateATodo = generateATodo.bind(this);
        this.addTodo = addTodo.bind(this);
    }
    initialize() {
        return new Promise((resolve)=>{
            return this.getTodosFromLocal().then((todos)=>{
                this.state.todoList = todos;
                return this.render().then(status => {
                    this.bindEvents();
                    resolve(true);
                })
            });
        });
    }
    bindEvents(){
        const {
            todoWrapper,
            createButton,
            input
        } = this.options;
        todoWrapper.addEventListener("click", this.checkTodoAction.bind(this));
        createButton.addEventListener("click", this.addTodo.bind(this));
    }
    checkTodoAction(e) {
        const {
            dataset
        } = e.target;
        const {
            id,
            action
        } = dataset;

        return new Promise((resolve)=>{
            if(action === TOGGLE_TODO_ACTION) {
                return this.completeTodo(id).then(status => resolve(true))
            }
            if(action === TOGGLE_DELETE_ACTION) {
                return this.deleteTodo(id).then(status => resolve(true))
            }
        })

    }
    deleteTodo(id) {
        let todos = this.state.todoList.filter(todo => todo.id !== id);
        this.state.todoList = todos;
        return Promise.resolve().then(()=>{
            const todoItem = document.getElementById(id);
            todoItem.parentNode.removeChild(todoItem);
            return this.updateLocalStorage().then(function() {
                return true
            })
        });

    }
    
    completeTodo(id) {
        let checkedTodo = this.state.todoList.find(todo => todo.id === id);
        checkedTodo.isCompleted = !checkedTodo.isCompleted;
        return Promise.resolve().then(()=>{
            const todoItem = document.getElementById(id);
            const newTodoUi = this.htmlParser(this.generateATodo(checkedTodo));
            todoItem.parentNode.replaceChild(newTodoUi, todoItem);
            return this.updateLocalStorage().then(function() {
                return true
            })
        });
    }
    
    getTodosState() {
        const {
            todoList
        } = this.state;
        return todoList;
    }

    getTodosFromLocal() {
        const {
            storeId
        } = this.options;
        return Promise.resolve().then(function () {
            return (typeof window.localStorage !== "undefined" && window.localStorage.getItem(storeId)) ? JSON.parse(window.localStorage.getItem(storeId)) : [];
        });
    }
    updateLocalStorage () {
        const {
            storeId
        } = this.options;
        const {
            todoList
        } = this.state;
        const stateTodo = this.getTodosState();
        return Promise.resolve().then(function () {
            if(typeof window.localStorage !== "undefined"){
                window.localStorage.setItem(storeId, JSON.stringify(todoList));
            }
            return stateTodo;
        });
    }
}

export default TodoApp;